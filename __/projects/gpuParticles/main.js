"use strict";
/** The square root of {@link PARTICLE_COUNT}. */
const SQRT_PARTICLE_COUNT = 32;
/** The number of particles to process and draw. */
const PARTICLE_COUNT = SQRT_PARTICLE_COUNT * SQRT_PARTICLE_COUNT;
/** The size of each particle as a multiplier of screen length. */
const PARTICLE_SIZE = .025;
/** The WebGL context. */
const gl = document.getElementById("particles").getContext("webgl");
/**
 * Creates a WebGL shader.
 *
 * @param gl The WebGL context to create the shader for.
 * @param type The shader's type ({@link WebGLRenderingContext.VERTEX_SHADER} or {@link WebGLRenderingContext.FRAGMENT_SHADER}).
 * @param src The shader's glsl source code.
 * @return A shader for {@link gl}.
*/
function createShader(gl, type, src) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    // Check if compilation succeeded
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        // Log the source code with line numbers
        const prettySrc = src.split(/\n/).map((e, i) => `${i + 1} ${e}`).join("\n");
        console.group((type === gl.VERTEX_SHADER ? "Vertex" : "Fragment") + " Shader:\n" + prettySrc);
        // Log the error
        console.log(gl.getShaderInfoLog(shader));
        console.groupEnd();
    }
    return shader;
}
/**
 * Creates a WebGL program.
 *
 * @param gl The WebGL context to create the program for.
 * @param vSrc The glsl source code for the vertex shader.
 * @param fSrc The glsl source code for the fragment shader.
 * @return A program for {@link gl}.
 */
function createProgram(gl, vSrc, fSrc) {
    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vSrc));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fSrc));
    gl.linkProgram(program);
    // Check if linking succeeded
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        // Log the error
        console.log(gl.getProgramInfoLog(program));
    }
    return program;
}
/**
 * Attribute locations are cached onto {@link WebGLProgram} objects themselves
 * through this symbol.
 */
const attribLocationSymbol = Symbol();
/**
 * Gets the location of an attribute from the current program.
 *
 * @param gl The WebGL context whose current program we'll get the location
 * from.
 * @param attribName The name of the attribute to get.
 * @returns The attribute's location.
 */
function getAttribLoc(gl, attribName) {
    const program = gl.getParameter(gl.CURRENT_PROGRAM);
    // Ensure cache exists on the program:
    program[attribLocationSymbol] ??= [];
    // Ensure location exists within the cache, otherwise look it up:
    program[attribLocationSymbol][attribName] ??= gl.getAttribLocation(program, attribName);
    // Return cached location
    return program[attribLocationSymbol][attribName];
}
/**
 * Uniform locations are cached onto {@link WebGLProgram} objects themselves
 * through this symbol.
 */
const uniformLocationSymbol = Symbol();
/**
 * Gets the location of a uniform from the current program.
 *
 * @param gl The WebGL context whose current program we'll get the location
 * from.
 * @param uniformName The name of the uniform to get.
 * @returns The uniform's location.
 */
function getUniformLoc(gl, uniformName) {
    const program = gl.getParameter(gl.CURRENT_PROGRAM);
    // Ensure cache exists on the program:
    program[uniformLocationSymbol] ??= [];
    // Ensure location exists within the cache, otherwise look it up:
    program[uniformLocationSymbol][uniformName] ??= gl.getUniformLocation(program, uniformName);
    // Return cached location
    return program[uniformLocationSymbol][uniformName];
}
/**
 * Creates a random value for a {@link Uint8ClampedArray}.
 */
function randClampUint8() {
    // Rounding/clamping will occur when the value is stored in the array:
    return Math.random() * 256 - .5;
}
/**
 * Creates a texture suitable for storing particle data.
 *
 * @param gl The WebGL context to create the texture for.
 */
function createParticleTexture(gl) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Set texture parameters (wrapping, filtering)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    // Generate random data
    const texelData = [];
    for (let i = 0; i < PARTICLE_COUNT; ++i) {
        // Every particle needs 6 random numbers
        texelData.push(...[randClampUint8(), randClampUint8(), randClampUint8(), randClampUint8(), randClampUint8(), randClampUint8()]);
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, SQRT_PARTICLE_COUNT * 2, SQRT_PARTICLE_COUNT, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8ClampedArray(texelData));
    return texture;
}
/**
 * The WebGL program for drawing the particles.
 */
const renderProgram = createProgram(gl, `
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
/**
 * A helper WebGL program which draws the internal state of the particle data
 * texture.
 */
const renderInternalsProgram = createProgram(gl, `
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
gl.bindAttribLocation(renderInternalsProgram, 0, "a_pos");
/**
 * The WebGL program for updating the particles.
 */
const updateProgram = createProgram(gl, `
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
gl.bindAttribLocation(updateProgram, 0, "a_pos");
/** A buffer of "triangle strip" vertex data which covers the entire texture. */
// Every pair of numbers is a coordinate on the texture. The order starts
// counter-clockwise in case backface culling is ever enabled.
// (-1, -1): Bottom left
// ( 1, -1): Bottom right
// (-1,  1): Top left
// ( 1,  1): Top right
// When rendering as a triangle strip, we end up with these triangles:
// Bottom left, bottom right, top left (with counter-clockwise "winding")
// Bottom right, top left, top right (with clockwise "winding")
const fullTextureVertexData = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
/**
 * The VBO for rendering to the particle data.
 */
const updateVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, updateVertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, fullTextureVertexData, gl.STATIC_DRAW);
gl.useProgram(updateProgram);
gl.enableVertexAttribArray(getAttribLoc(gl, "a_pos"));
gl.vertexAttribPointer(getAttribLoc(gl, "a_pos"), 2, gl.FLOAT, false, 0, 0);
/**
 * The VBO for rendering particles to the screen.
 *
 * Every particle has 2 triangles, so 6 entries each.
 * The actual data in every vertex is just the particle's index * 4, plus the
 * index of that vertex's corner within the particle.
 */
const particleVertexIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, particleVertexIndexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([...new Array(PARTICLE_COUNT).keys()].flatMap((_e, i) => { i *= 4; return [i, i + 1, i + 2, i + 2, i + 1, i + 3]; })), gl.STATIC_DRAW);
gl.useProgram(renderProgram);
gl.enableVertexAttribArray(getAttribLoc(gl, "a_idx"));
gl.vertexAttribPointer(getAttribLoc(gl, "a_idx"), 1, gl.FLOAT, false, 0, 0);
/** The textures used for storing particle data. */
const particleDataTextures = [];
/** The frame buffers for {@link particleDataTextures}. */
const particleDataFrameBuffers = [];
let tickCount = 0;
for (const i of [0, 1]) {
    const texture = createParticleTexture(gl);
    particleDataTextures[i] = texture;
    const fbo = gl.createFramebuffer();
    particleDataFrameBuffers[i] = fbo;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
}
gl.clearColor(0, 0, 0, 1);
function renderLoop() {
    // Update particle data
    gl.bindFramebuffer(gl.FRAMEBUFFER, particleDataFrameBuffers[tickCount % particleDataFrameBuffers.length]);
    gl.viewport(0, 0, SQRT_PARTICLE_COUNT * 2, SQRT_PARTICLE_COUNT);
    gl.useProgram(updateProgram);
    gl.bindTexture(gl.TEXTURE_2D, particleDataTextures[(tickCount + 1) % particleDataTextures.length]);
    gl.bindBuffer(gl.ARRAY_BUFFER, updateVertexBuffer);
    gl.enableVertexAttribArray(getAttribLoc(gl, "a_pos"));
    gl.vertexAttribPointer(getAttribLoc(gl, "a_pos"), 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    // Render particles
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.useProgram(renderProgram);
    gl.bindTexture(gl.TEXTURE_2D, particleDataTextures[tickCount % particleDataTextures.length]);
    gl.bindBuffer(gl.ARRAY_BUFFER, particleVertexIndexBuffer);
    gl.enableVertexAttribArray(getAttribLoc(gl, "a_idx"));
    gl.vertexAttribPointer(getAttribLoc(gl, "a_idx"), 1, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, PARTICLE_COUNT * 6);
    gl.disable(gl.BLEND);
    // Display data texture in the corner
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, SQRT_PARTICLE_COUNT * 2 * 4, SQRT_PARTICLE_COUNT * 4);
    gl.useProgram(renderInternalsProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, updateVertexBuffer);
    gl.enableVertexAttribArray(getAttribLoc(gl, "a_pos"));
    gl.vertexAttribPointer(getAttribLoc(gl, "a_pos"), 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, particleDataTextures[tickCount % particleDataTextures.length]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    ++tickCount;
    requestAnimationFrame(renderLoop);
}
renderLoop();
