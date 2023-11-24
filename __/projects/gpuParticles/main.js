"use strict";
const SQRT_PARTICLE_COUNT = 32;
const PARTICLE_COUNT = SQRT_PARTICLE_COUNT * SQRT_PARTICLE_COUNT;
const PARTICLE_SIZE = .025;
const fGl = document.getElementById("fParticles").getContext("webgl");
function createShader(gl, type, src) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const prettySrc = src.split(/\n/).map((e, i) => `${i + 1} ${e}`).join("\n");
        console.group((type === gl.VERTEX_SHADER ? "Vertex" : "Fragment") + " Shader:\n" + prettySrc);
        console.log(gl.getShaderInfoLog(shader));
        console.groupEnd();
    }
    return shader;
}
function createProgram(gl, vSrc, fSrc) {
    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vSrc));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fSrc));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(gl.getProgramInfoLog(program));
    }
    return program;
}
const aLocs = Symbol();
function getAttribLoc(gl, attribName) {
    const program = gl.getParameter(gl.CURRENT_PROGRAM);
    program[aLocs] ??= [];
    program[aLocs][attribName] ??= gl.getAttribLocation(program, attribName);
    return program[aLocs][attribName];
}
const uLocs = Symbol();
function getUniformLoc(gl, uniformName) {
    const program = gl.getParameter(gl.CURRENT_PROGRAM);
    program[uLocs] ??= [];
    program[uLocs][uniformName] ??= gl.getUniformLocation(program, uniformName);
    return program[uLocs][uniformName];
}
function randClampUint8() {
    return Math.random() * 256 - .5;
}
function createParticleTexture(gl) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, SQRT_PARTICLE_COUNT * 2, SQRT_PARTICLE_COUNT, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8ClampedArray(([...new Array(PARTICLE_COUNT).keys()]).flatMap(() => [randClampUint8(), randClampUint8(), randClampUint8(), randClampUint8(), randClampUint8(), randClampUint8()])));
    return texture;
}
const fGl_renderProg = createProgram(fGl, `
uniform sampler2D u_particles;

attribute float a_idx;

varying vec2 v_off;

const float W = ${SQRT_PARTICLE_COUNT}.;
const float H = ${SQRT_PARTICLE_COUNT}.;

void main() {
	float pIdx = floor(a_idx * .25);
	vec2 pIdx2D = vec2(mod(pIdx, W) * 2. + .5, pIdx / W + .5);
	
	vec2 toNorm = 1. / vec2(W * 2., H);
	vec4 sample0 = texture2DLod(u_particles, pIdx2D * toNorm, 0.);
	vec4 sample1 = texture2DLod(u_particles, (pIdx2D + vec2(1., 0.)) * toNorm, 0.);

	vec2 pPos = (sample0.xy + vec2(sample0.z, sample1.z)/256.) * 2. - 1.;
	// pPos = sample0.xy * 2. - 1.;

	v_off = vec2(mod(a_idx, 2.) < .5 ? -1. : 1., mod(a_idx, 4.) < 1.5 ? -1. : 1.);

	gl_Position = vec4(pPos + v_off * ${PARTICLE_SIZE}, 0., 1.);
}
`, `
uniform sampler2D u_particles;

varying highp vec2 v_off;

void main() {
	lowp float intensity = 1. - sqrt(length(v_off));
	if (intensity <= 0.) discard;

	gl_FragColor = vec4(intensity, intensity, intensity, 1.);
}
`);
const fGl_internalsProg = createProgram(fGl, `
attribute vec2 a_pos;

void main() {
	gl_Position = vec4(a_pos, 0., 1.);
}
`, `
uniform sampler2D u_particles;

void main() {
	gl_FragColor = vec4(texture2D(u_particles, gl_FragCoord.xy / vec2(${SQRT_PARTICLE_COUNT * 2}., ${SQRT_PARTICLE_COUNT}.) / 4., 0.).xyz, 1.);
}
`);
fGl.bindAttribLocation(fGl_internalsProg, 0, "a_pos");
const fGl_particleProg = createProgram(fGl, `
attribute vec2 a_pos;

void main() {
	gl_Position = vec4(a_pos, 0., 1.);
}
`, `
precision highp float;

uniform highp sampler2D u_particles;

const float SQRT_PARTICLE_COUNT = ${SQRT_PARTICLE_COUNT}.;

void main() {
	float odd = floor(mod(gl_FragCoord.x, 2.));
	vec2 coord = vec2(gl_FragCoord.x - odd, gl_FragCoord.y);

	vec2 toNorm = 1. / vec2(SQRT_PARTICLE_COUNT * 2., SQRT_PARTICLE_COUNT);
	vec4 sample0 = texture2D(u_particles, coord * toNorm, 0.);
	vec4 sample1 = texture2D(u_particles, (coord + vec2(1., 0.)) * toNorm, 0.);

	vec4 pv = vec4(sample0.xy + vec2(sample0.z, sample1.z) / 256., sample1.xy);
	vec2 vel = pv.zw * 2. - 1.;
	pv.xy += vel / 256.;
	if (pv.x > 1.) pv.z = .5 - abs(pv.z - .5);
	if (pv.y > 1.) pv.w = .5 - abs(pv.w - .5);
	if (pv.x < 0.) pv.z = .5 + abs(pv.z - .5);
	if (pv.y < 0.) pv.w = .5 + abs(pv.w - .5);
	pv.xy = clamp(pv.xy, 0., 1.);
	
	vec2 highPos = floor(pv.xy * 255.) / 255.;
	vec2 lowPos = (pv.xy - highPos) * 256.;
	gl_FragColor = vec4(highPos.xy, lowPos.x, 1.) * (1. - odd) + vec4(pv.zw, lowPos.y, 1.) * odd;
}
`);
fGl.bindAttribLocation(fGl_particleProg, 0, "a_pos");
const screenVertBuff = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
const fParticleBuff = fGl.createBuffer();
fGl.bindBuffer(fGl.ARRAY_BUFFER, fParticleBuff);
fGl.bufferData(fGl.ARRAY_BUFFER, screenVertBuff, fGl.STATIC_DRAW);
fGl.useProgram(fGl_particleProg);
fGl.enableVertexAttribArray(getAttribLoc(fGl, "a_pos"));
fGl.vertexAttribPointer(getAttribLoc(fGl, "a_pos"), 2, fGl.FLOAT, false, 0, 0);
const fIdxBuff = fGl.createBuffer();
fGl.bindBuffer(fGl.ARRAY_BUFFER, fIdxBuff);
fGl.bufferData(fGl.ARRAY_BUFFER, new Float32Array([...new Array(PARTICLE_COUNT).keys()].flatMap((_e, i) => { i *= 4; return [i, i + 1, i + 2, i + 2, i + 1, i + 3]; })), fGl.STATIC_DRAW);
fGl.useProgram(fGl_renderProg);
fGl.enableVertexAttribArray(getAttribLoc(fGl, "a_idx"));
fGl.vertexAttribPointer(getAttribLoc(fGl, "a_idx"), 1, fGl.FLOAT, false, 0, 0);
const fGl_texs = [];
const fGl_fbos = [];
let fGl_tick = 0;
for (const i of [0, 1]) {
    const texture = createParticleTexture(fGl);
    fGl_texs[i] = texture;
    const fbo = fGl.createFramebuffer();
    fGl_fbos[i] = fbo;
    fGl.bindFramebuffer(fGl.FRAMEBUFFER, fbo);
    fGl.framebufferTexture2D(fGl.FRAMEBUFFER, fGl.COLOR_ATTACHMENT0, fGl.TEXTURE_2D, texture, 0);
}
fGl.clearColor(0, 0, 0, 1);
function fGlLoop() {
    fGl.bindFramebuffer(fGl.FRAMEBUFFER, fGl_fbos[fGl_tick % fGl_fbos.length]);
    fGl.viewport(0, 0, SQRT_PARTICLE_COUNT * 2, SQRT_PARTICLE_COUNT);
    fGl.useProgram(fGl_particleProg);
    fGl.bindTexture(fGl.TEXTURE_2D, fGl_texs[(fGl_tick + 1) % fGl_texs.length]);
    fGl.bindBuffer(fGl.ARRAY_BUFFER, fParticleBuff);
    fGl.enableVertexAttribArray(getAttribLoc(fGl, "a_pos"));
    fGl.vertexAttribPointer(getAttribLoc(fGl, "a_pos"), 2, fGl.FLOAT, false, 0, 0);
    fGl.drawArrays(fGl.TRIANGLE_STRIP, 0, 4);
    fGl.bindFramebuffer(fGl.FRAMEBUFFER, null);
    fGl.viewport(0, 0, fGl.canvas.width, fGl.canvas.height);
    fGl.clear(fGl.COLOR_BUFFER_BIT);
    fGl.enable(fGl.BLEND);
    fGl.blendEquation(fGl.FUNC_ADD);
    fGl.blendFunc(fGl.ONE, fGl.ONE);
    fGl.useProgram(fGl_renderProg);
    fGl.bindTexture(fGl.TEXTURE_2D, fGl_texs[fGl_tick % fGl_texs.length]);
    fGl.bindBuffer(fGl.ARRAY_BUFFER, fIdxBuff);
    fGl.enableVertexAttribArray(getAttribLoc(fGl, "a_idx"));
    fGl.vertexAttribPointer(getAttribLoc(fGl, "a_idx"), 1, fGl.FLOAT, false, 0, 0);
    fGl.drawArrays(fGl.TRIANGLES, 0, PARTICLE_COUNT * 6);
    fGl.disable(fGl.BLEND);
    fGl.bindFramebuffer(fGl.FRAMEBUFFER, null);
    fGl.viewport(0, 0, SQRT_PARTICLE_COUNT * 2 * 4, SQRT_PARTICLE_COUNT * 4);
    fGl.useProgram(fGl_internalsProg);
    fGl.bindBuffer(fGl.ARRAY_BUFFER, fParticleBuff);
    fGl.enableVertexAttribArray(getAttribLoc(fGl, "a_pos"));
    fGl.vertexAttribPointer(getAttribLoc(fGl, "a_pos"), 2, fGl.FLOAT, false, 0, 0);
    fGl.bindTexture(fGl.TEXTURE_2D, fGl_texs[fGl_tick % fGl_texs.length]);
    fGl.drawArrays(fGl.TRIANGLE_STRIP, 0, 4);
    ++fGl_tick;
    requestAnimationFrame(fGlLoop);
}
fGlLoop();
