"use strict";
function new3() {
    return [0, 0, 0];
}
function new4() {
    return [0, 0, 0, 0];
}
function bilinear3(x, y, dlVal, drVal, ulVal, urVal) {
    const ulMul = (1 - x) * (1 - y);
    const urMul = x * (1 - y);
    const dlMul = (1 - x) * y;
    const drMul = x * y;
    return [
        dlVal[0] * ulMul + drVal[0] * urMul + ulVal[0] * dlMul + urVal[0] * drMul,
        dlVal[1] * ulMul + drVal[1] * urMul + ulVal[1] * dlMul + urVal[1] * drMul,
        dlVal[2] * ulMul + drVal[2] * urMul + ulVal[2] * dlMul + urVal[2] * drMul
    ];
}
function extendArray(fnName, fn) {
    Object.defineProperty(Array.prototype, fnName, { value: fn });
}
extendArray("copy3", function () {
    return [this[0], this[1], this[2]];
});
extendArray("copy3As4", function () {
    return [this[0], this[1], this[2], 1];
});
extendArray("copy4", function () {
    return [this[0], this[1], this[2], this[3]];
});
extendArray("set3", function (o) {
    this[0] = o[0];
    this[1] = o[1];
    this[2] = o[2];
    return this;
});
extendArray("set4", function (o) {
    this[0] = o[0];
    this[1] = o[1];
    this[2] = o[2];
    this[3] = o[3];
    return this;
});
extendArray("neg3", function () {
    this[0] = -this[0];
    this[1] = -this[1];
    this[2] = -this[2];
    return this;
});
extendArray("neg4", function () {
    this[0] = -this[0];
    this[1] = -this[1];
    this[2] = -this[2];
    this[3] = -this[3];
    return this;
});
extendArray("add3", function (o) {
    this[0] += o[0];
    this[1] += o[1];
    this[2] += o[2];
    return this;
});
extendArray("add4", function (o) {
    this[0] += o[0];
    this[1] += o[1];
    this[2] += o[2];
    this[3] += o[3];
    return this;
});
extendArray("sub3", function (o) {
    this[0] -= o[0];
    this[1] -= o[1];
    this[2] -= o[2];
    return this;
});
extendArray("sub4", function (o) {
    this[0] -= o[0];
    this[1] -= o[1];
    this[2] -= o[2];
    this[3] -= o[3];
    return this;
});
extendArray("mul3", function (o) {
    if (typeof o === "number") {
        this[0] *= o;
        this[1] *= o;
        this[2] *= o;
    }
    else {
        this[0] *= o[0];
        this[1] *= o[1];
        this[2] *= o[2];
    }
    return this;
});
extendArray("mul4", function (o) {
    if (typeof o === "number") {
        this[0] *= o;
        this[1] *= o;
        this[2] *= o;
        this[3] *= o;
    }
    else {
        this[0] *= o[0];
        this[1] *= o[1];
        this[2] *= o[2];
        this[3] *= o[3];
    }
    return this;
});
extendArray("div3", function (o) {
    if (typeof o === "number") {
        this[0] /= o;
        this[1] /= o;
        this[2] /= o;
    }
    else {
        this[0] /= o[0];
        this[1] /= o[1];
        this[2] /= o[2];
    }
    return this;
});
extendArray("div4", function (o) {
    if (typeof o === "number") {
        this[0] /= o;
        this[1] /= o;
        this[2] /= o;
        this[3] /= o;
    }
    else {
        this[0] /= o[0];
        this[1] /= o[1];
        this[2] /= o[2];
        this[3] /= o[3];
    }
    return this;
});
extendArray("dot3", function (o) {
    return this[0] * o[0]
        + this[1] * o[1]
        + this[2] * o[2];
});
extendArray("magSq3", function () {
    return this.dot3(this);
});
extendArray("mag3", function () {
    return Math.sqrt(this.magSq3());
});
extendArray("norm3", function () {
    const magRcp = 1 / this.mag3();
    this[0] *= magRcp;
    this[1] *= magRcp;
    this[2] *= magRcp;
    return this;
});
extendArray("normOrZero3", function () {
    const mag = this.mag3();
    const magRcp = mag !== 0 ? 1 / mag : 0;
    this[0] *= magRcp;
    this[1] *= magRcp;
    this[2] *= magRcp;
    return this;
});
extendArray("cross3", function (o) {
    const oldX = this[0];
    const oldY = this[1];
    this[0] = this[1] * o[2] - this[2] * o[1];
    this[1] = this[2] * o[0] - oldX * o[2];
    this[2] = oldX * o[1] - oldY * o[0];
    return this;
});
extendArray("fastLerp3", function (o, weight) {
    this[0] = Engine.fastLerp(this[0], o[0], weight);
    this[1] = Engine.fastLerp(this[1], o[1], weight);
    this[2] = Engine.fastLerp(this[2], o[2], weight);
    return this;
});
extendArray("fastLerp4", function (o, weight) {
    this[0] = Engine.fastLerp(this[0], o[0], weight);
    this[1] = Engine.fastLerp(this[1], o[1], weight);
    this[2] = Engine.fastLerp(this[2], o[2], weight);
    this[3] = Engine.fastLerp(this[3], o[3], weight);
    return this;
});
function identityM4() {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
}
function viewM4(pos, rot) {
    return invEulerXformationM4(rot, pos);
}
function perspM4(zNear, zFar, hFovRad, fovRatio) {
    const zScalar = (zNear + zFar) / (zNear - zFar);
    const zOffset = zFar * zScalar + zFar;
    const xScalar = 1 / Math.tan(hFovRad * 0.5);
    const yScalar = xScalar * fovRatio;
    return [
        xScalar, 0, 0, 0,
        0, yScalar, 0, 0,
        0, 0, zScalar, -1,
        0, 0, zOffset, 0,
    ];
}
function eulerBasis(rot) {
    const cosX = Math.cos(rot[0]), cosY = Math.cos(rot[1]), cosZ = Math.cos(rot[2]), sinX = Math.sin(rot[0]), sinY = Math.sin(rot[1]), sinZ = Math.sin(rot[2]);
    return [
        cosY * cosZ + sinY * sinX * sinZ, cosX * sinZ, cosY * sinX * sinZ - sinY * cosZ,
        sinY * sinX * cosZ - cosY * sinZ, cosX * cosZ, sinY * sinZ + cosY * sinX * cosZ,
        sinY * cosX, -sinX, cosY * cosX,
    ];
}
function eulerXformationM43(rot, translate = [0, 0, 0]) {
    const cosX = Math.cos(rot[0]), cosY = Math.cos(rot[1]), cosZ = Math.cos(rot[2]), sinX = Math.sin(rot[0]), sinY = Math.sin(rot[1]), sinZ = Math.sin(rot[2]);
    return [
        cosY * cosZ + sinY * sinX * sinZ, cosX * sinZ, cosY * sinX * sinZ - sinY * cosZ,
        sinY * sinX * cosZ - cosY * sinZ, cosX * cosZ, sinY * sinZ + cosY * sinX * cosZ,
        sinY * cosX, -sinX, cosY * cosX,
        translate[0], translate[1], translate[2],
    ];
}
function eulerXformationM4(rot, translate = [0, 0, 0]) {
    const cosX = Math.cos(rot[0]), cosY = Math.cos(rot[1]), cosZ = Math.cos(rot[2]), sinX = Math.sin(rot[0]), sinY = Math.sin(rot[1]), sinZ = Math.sin(rot[2]);
    return [
        cosY * cosZ + sinY * sinX * sinZ, cosX * sinZ, cosY * sinX * sinZ - sinY * cosZ, 0,
        sinY * sinX * cosZ - cosY * sinZ, cosX * cosZ, sinY * sinZ + cosY * sinX * cosZ, 0,
        sinY * cosX, -sinX, cosY * cosX, 0,
        translate[0], translate[1], translate[2], 1,
    ];
}
function invEulerBasis(rot) {
    const cosX = Math.cos(rot[0]), cosY = Math.cos(rot[1]), cosZ = Math.cos(rot[2]), sinX = Math.sin(-rot[0]), sinY = Math.sin(-rot[1]), sinZ = Math.sin(-rot[2]);
    return [
        cosZ * cosY - sinZ * sinX * sinY, sinZ * cosY + cosZ * sinX * sinY, -cosX * sinY,
        -sinZ * cosX, cosZ * cosX, sinX,
        cosZ * sinY + sinZ * sinX * cosY, sinZ * sinY - cosZ * sinX * cosY, cosX * cosY,
    ];
}
function invEulerXformationM43(rot, translate = [0, 0, 0]) {
    const cosX = Math.cos(rot[0]), cosY = Math.cos(rot[1]), cosZ = Math.cos(rot[2]), sinX = Math.sin(-rot[0]), sinY = Math.sin(-rot[1]), sinZ = Math.sin(-rot[2]);
    const inv = [
        cosZ * cosY - sinZ * sinX * sinY, sinZ * cosY + cosZ * sinX * sinY, -cosX * sinY,
        -sinZ * cosX, cosZ * cosX, sinX,
        cosZ * sinY + sinZ * sinX * cosY, sinZ * sinY - cosZ * sinX * cosY, cosX * cosY,
        0, 0, 0,
    ];
    const xformedTranslate = translate.basedV3M43(inv);
    inv[9] = -xformedTranslate[0];
    inv[10] = -xformedTranslate[1];
    inv[11] = -xformedTranslate[2];
    return inv;
}
function invEulerXformationM4(rot, translate = [0, 0, 0]) {
    const cosX = Math.cos(rot[0]), cosY = Math.cos(rot[1]), cosZ = Math.cos(rot[2]), sinX = Math.sin(-rot[0]), sinY = Math.sin(-rot[1]), sinZ = Math.sin(-rot[2]);
    const inv = [
        cosZ * cosY - sinZ * sinX * sinY, sinZ * cosY + cosZ * sinX * sinY, -cosX * sinY, 0,
        -sinZ * cosX, cosZ * cosX, sinX, 0,
        cosZ * sinY + sinZ * sinX * cosY, sinZ * sinY - cosZ * sinX * cosY, cosX * cosY, 0,
        0, 0, 0, 1,
    ];
    const xformedTranslate = translate.basedV3M4(inv);
    inv[12] = -xformedTranslate[0];
    inv[13] = -xformedTranslate[1];
    inv[14] = -xformedTranslate[2];
    return inv;
}
function newM4() {
    return [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ];
}
extendArray("xformedM4", function (o) {
    const res = newM4();
    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
            res[y * 4 + x]
                = this[x] * o[y * 4]
                    + this[4 + x] * o[y * 4 + 1]
                    + this[8 + x] * o[y * 4 + 2]
                    + this[12 + x] * o[y * 4 + 3];
        }
    }
    return res;
});
extendArray("xposeM4", function () {
    for (let y = 0; y < 4; ++y) {
        const yRow = y * 4;
        for (let x = y; x < 4; ++x) {
            const a = yRow + x;
            const b = x * 4 + y;
            const t = this[a];
            this[a] = this[b];
            this[b] = t;
        }
    }
    return this;
});
extendArray("basedV3", function (m) {
    return [
        this[0] * m[0] + this[1] * m[3] + this[2] * m[6],
        this[0] * m[1] + this[1] * m[4] + this[2] * m[7],
        this[0] * m[2] + this[1] * m[5] + this[2] * m[8],
    ];
});
extendArray("basedV4", function (m) {
    return [
        this[0] * m[0] + this[1] * m[3] + this[2] * m[6],
        this[0] * m[1] + this[1] * m[4] + this[2] * m[7],
        this[0] * m[2] + this[1] * m[5] + this[2] * m[8],
        this[3],
    ];
});
extendArray("basedV3M43", function (m) {
    return [
        this[0] * m[0] + this[1] * m[4] + this[2] * m[8],
        this[0] * m[1] + this[1] * m[5] + this[2] * m[9],
        this[0] * m[2] + this[1] * m[6] + this[2] * m[10],
    ];
});
extendArray("basedV3M4", function (m) {
    return [
        this[0] * m[0] + this[1] * m[4] + this[2] * m[8],
        this[0] * m[1] + this[1] * m[5] + this[2] * m[9],
        this[0] * m[2] + this[1] * m[6] + this[2] * m[10],
    ];
});
extendArray("basedV4M4", function (m) {
    return [
        this[0] * m[0] + this[1] * m[4] + this[2] * m[8],
        this[0] * m[1] + this[1] * m[5] + this[2] * m[9],
        this[0] * m[2] + this[1] * m[6] + this[2] * m[10],
        this[3],
    ];
});
extendArray("xformedHomV3M4", function (m) {
    return [
        this[0] * m[0] + this[1] * m[4] + this[2] * m[8] + m[12],
        this[0] * m[1] + this[1] * m[5] + this[2] * m[9] + m[13],
        this[0] * m[2] + this[1] * m[6] + this[2] * m[10] + m[14],
    ];
});
extendArray("xformedHomV3M43", function (m) {
    return [
        this[0] * m[0] + this[1] * m[3] + this[2] * m[6] + m[9],
        this[0] * m[1] + this[1] * m[4] + this[2] * m[7] + m[10],
        this[0] * m[2] + this[1] * m[5] + this[2] * m[8] + m[11],
    ];
});
extendArray("xformedV4M4", function (m) {
    return [
        this[0] * m[0] + this[1] * m[4] + this[2] * m[8] + this[3] * m[12],
        this[0] * m[1] + this[1] * m[5] + this[2] * m[9] + this[3] * m[13],
        this[0] * m[2] + this[1] * m[6] + this[2] * m[10] + this[3] * m[14],
        this[0] * m[3] + this[1] * m[7] + this[2] * m[11] + this[3] * m[15],
    ];
});
var Engine;
(function (Engine) {
    var Gfx;
    (function (Gfx) {
        Gfx.camPos = [0, 0, 0];
        Gfx.camRot = [0, 0, 0];
        Gfx.hFovRad = 110 * Math.PI / 180;
        Gfx.zNear = 1 / (2 ** 8);
        Gfx.zFar = 1024;
        const groundProgPosAttribIdx = 0;
        let groundProg;
        Gfx.screenShakeStrength = 0;
        const screenShakeDec = 1;
        Gfx.jetpackScreenShake = 0;
        Gfx.landingSpeedScreenShakeMult = 1 / 32;
        Gfx.landingSpeedScreenShakeOffset = -.375;
        Gfx.sunNorm = [-.57735, -.57735, -.57735];
        Gfx.sunColor = [2 / 3, 2 / 3, .75 * 2 / 3];
        Gfx.ambientLight = [1 / 3, 1 / 3, 1 / 3];
        let jetpackFuelBarFg = "#28F";
        let jetpackFuelBarBg = "#114";
        let jetpackFuelBarStroke = "#000";
        let jetpackFuelBarLineWidth = 1 / 32;
        let jetpackFuelBarRect = [-1, -1, .5, 1 / 8];
        let lastDrawTime;
        Gfx.vaoSets = [];
        async function init() {
            groundProg = Gfx.makeGLProgram(`#version 300 es

uniform mat4 view, proj;
uniform sampler2D heightMap;
uniform sampler2D swizzledNormalMap;
uniform vec4 xform; // x translation, z translation, xy size, total height

in vec2 pos;

out vec3 worldPos;
out vec4 vert_normal_height; // xyz: normal, w: height

void main() {
	// > Get samples
	float height = texture(heightMap, pos).r;
	vec3 norm = normalize(texture(swizzledNormalMap, pos).xyz * vec3(2.) - vec3(1.));

	// > Get position
	worldPos = vec3(pos.x * xform.z + xform.x, height * xform.w, pos.y * xform.z + xform.y);
	gl_Position = proj * view * vec4(worldPos, 1.);

	vert_normal_height = vec4(norm, height);
}`, `#version 300 es
precision highp float;

in vec3 worldPos;
in vec4 vert_normal_height; // xyz: normal, w: height

uniform sampler2D topDiff;
uniform sampler2D topNorm;
uniform sampler2D sideDiff;
uniform sampler2D sideNorm;

uniform vec2 top_side_scaleRecips; // x: reciprocal of top texture scale, y: reciprocal of side texture scale

uniform vec3 sunNorm;
uniform vec3 sunColor;
uniform vec3 ambientLight;

out vec4 color;

void main() {
	vec3 norm = normalize(vert_normal_height.xyz);
	float height = vert_normal_height.w;

	// > Prepare sample coords
	vec2 topCoord = worldPos.xz * top_side_scaleRecips.x;
	vec2 xSideCoord = worldPos.xy * top_side_scaleRecips.y;
	vec2 ySideCoord = worldPos.zy * top_side_scaleRecips.y;
	// > Get samples
	vec4 topCol = texture(topDiff, topCoord);
	vec4 xSideCol = texture(sideDiff, xSideCoord);
	vec4 ySideCol = texture(sideDiff, ySideCoord);

	float sideLerp = abs(norm.x);
	vec4 sideCol = mix(xSideCol, ySideCol, sideLerp);
	float topLerp = pow(norm.y, 1.5);
	color = mix(sideCol, topCol, topLerp);

	color.rgb *= (ambientLight + sunColor * max(0., -dot(sunNorm, norm)));
}`);
            Gfx.gl.bindAttribLocation(groundProg, groundProgPosAttribIdx, "pos");
            const w = Gfx.gl.canvas.width;
            const h = Gfx.gl.canvas.height;
            Gfx.ctx2d.setTransform(.5 * w, 0, 0, -.5 * h, .5 * w, .5 * h);
            requestAnimationFrame((time) => {
                lastDrawTime = time;
                draw(time);
            });
        }
        Gfx.init = init;
        function draw(time) {
            const d = (time - lastDrawTime) / 1000;
            const w = Gfx.gl.canvas.clientWidth;
            const h = Gfx.gl.canvas.clientHeight;
            if (Gfx.gl.canvas.width != w
                || Gfx.gl.canvas.height != h) {
                Gfx.gl.canvas.width = w;
                Gfx.gl.canvas.height = h;
                Gfx.gl.viewport(0, 0, w, h);
                Gfx.ctx2d.canvas.width = w;
                Gfx.ctx2d.canvas.height = h;
                Gfx.ctx2d.setTransform(.5 * w, 0, 0, -.5 * h, .5 * w, .5 * h);
            }
            Gfx.gl.clearColor(.375, .625, .875, 1);
            Gfx.gl.clearDepth(1.0);
            Gfx.gl.clear(Gfx.gl.COLOR_BUFFER_BIT | Gfx.gl.DEPTH_BUFFER_BIT);
            Gfx.gl.cullFace(Gfx.gl.BACK);
            Gfx.gl.enable(Gfx.gl.DEPTH_TEST);
            Gfx.gl.enable(Gfx.gl.CULL_FACE);
            const viewM = viewM4(Gfx.camPos, Gfx.camRot);
            viewM[12] += (Math.random() - .5) * Gfx.screenShakeStrength;
            viewM[13] += (Math.random() - .5) * Gfx.screenShakeStrength;
            const projM = perspM4(Gfx.zNear, Gfx.zFar, Gfx.hFovRad, w / h);
            for (const set of Gfx.vaoSets) {
                Gfx.gl.useProgram(set.prog);
                Gfx.gl.uniformMatrix4fv(Gfx.gl.getUniformLocation(set.prog, "view"), false, new Float32Array(viewM));
                Gfx.gl.uniformMatrix4fv(Gfx.gl.getUniformLocation(set.prog, "proj"), false, new Float32Array(projM));
                set.vaoInfos.forEach(Gfx.bindAndDrawVao);
            }
            Gfx.gl.useProgram(groundProg);
            Gfx.gl.uniformMatrix4fv(Gfx.gl.getUniformLocation(groundProg, "view"), false, new Float32Array(viewM));
            Gfx.gl.uniformMatrix4fv(Gfx.gl.getUniformLocation(groundProg, "proj"), false, new Float32Array(projM));
            Gfx.gl.uniform4fv(Gfx.gl.getUniformLocation(groundProg, "xform"), new Float32Array([Engine.ground.pos[0], Engine.ground.pos[1], Engine.ground.length, Engine.ground.heightScale]));
            Gfx.gl.uniform2fv(Gfx.gl.getUniformLocation(groundProg, "top_side_scaleRecips"), new Float32Array([Engine.ground.topMatScaleRecip, Engine.ground.sideMatScaleRecip]));
            Gfx.gl.uniform3fv(Gfx.gl.getUniformLocation(groundProg, "sunNorm"), new Float32Array(Gfx.sunNorm));
            Gfx.gl.uniform3fv(Gfx.gl.getUniformLocation(groundProg, "sunColor"), new Float32Array(Gfx.sunColor));
            Gfx.gl.uniform3fv(Gfx.gl.getUniformLocation(groundProg, "ambientLight"), new Float32Array(Gfx.ambientLight));
            Gfx.gl.activeTexture(Gfx.gl.TEXTURE0);
            Gfx.gl.bindTexture(Gfx.gl.TEXTURE_2D, Engine.ground.heightmapTex);
            Gfx.gl.uniform1i(Gfx.gl.getUniformLocation(groundProg, "heightMap"), 0);
            Gfx.gl.activeTexture(Gfx.gl.TEXTURE1);
            Gfx.gl.bindTexture(Gfx.gl.TEXTURE_2D, Engine.ground.normalmapTex);
            Gfx.gl.uniform1i(Gfx.gl.getUniformLocation(groundProg, "swizzledNormalMap"), 1);
            Gfx.gl.activeTexture(Gfx.gl.TEXTURE2);
            Gfx.gl.bindTexture(Gfx.gl.TEXTURE_2D, Engine.ground.topMatDiff);
            Gfx.gl.uniform1i(Gfx.gl.getUniformLocation(groundProg, "topDiff"), 2);
            Gfx.gl.activeTexture(Gfx.gl.TEXTURE3);
            Gfx.gl.bindTexture(Gfx.gl.TEXTURE_2D, Engine.ground.topMatNorm);
            Gfx.gl.uniform1i(Gfx.gl.getUniformLocation(groundProg, "topNorm"), 3);
            Gfx.gl.activeTexture(Gfx.gl.TEXTURE4);
            Gfx.gl.bindTexture(Gfx.gl.TEXTURE_2D, Engine.ground.sideMatDiff);
            Gfx.gl.uniform1i(Gfx.gl.getUniformLocation(groundProg, "sideDiff"), 4);
            Gfx.gl.activeTexture(Gfx.gl.TEXTURE5);
            Gfx.gl.bindTexture(Gfx.gl.TEXTURE_2D, Engine.ground.sideMatNorm);
            Gfx.gl.uniform1i(Gfx.gl.getUniformLocation(groundProg, "sideNorm"), 5);
            Gfx.bindAndDrawVao(Engine.ground.vaoInfo);
            Gfx.ctx2d.clearRect(-1, -1, 2, 2);
            {
                Gfx.ctx2d.lineWidth = jetpackFuelBarLineWidth;
                Gfx.ctx2d.strokeStyle = jetpackFuelBarStroke;
                Gfx.ctx2d.fillStyle = jetpackFuelBarBg;
                Gfx.ctx2d.beginPath();
                Gfx.ctx2d.rect(...jetpackFuelBarRect);
                Gfx.ctx2d.stroke();
                Gfx.ctx2d.fill();
                Gfx.ctx2d.fillStyle = jetpackFuelBarFg;
                const [x, y, w, h] = jetpackFuelBarRect;
                Gfx.ctx2d.beginPath();
                Gfx.ctx2d.rect(x, y, w * Engine.player.jetpackFuel / Engine.player.jetpackFuelMax, h);
                Gfx.ctx2d.fill();
            }
            Gfx.screenShakeStrength = Math.max(0, Gfx.screenShakeStrength - screenShakeDec * d);
            requestAnimationFrame(draw);
            lastDrawTime = time;
        }
        Gfx.draw = draw;
        function genGroundVaoInfo(vertsPerDim) {
            const tilesPerDim = vertsPerDim - 1;
            const vertCount = vertsPerDim * vertsPerDim;
            const posComponents = 2;
            const posBuffer = new Float32Array(vertCount * posComponents);
            for (let vertIdx = 0, y = 0; y < vertsPerDim; ++y) {
                const yComp = y / tilesPerDim;
                for (let x = 0; x < vertsPerDim; ++x) {
                    posBuffer[vertIdx++] = x / tilesPerDim;
                    posBuffer[vertIdx++] = yComp;
                }
            }
            const indexArray = [];
            for (let y = 0; y < tilesPerDim; ++y) {
                const yComp = y * vertsPerDim;
                if (y > 0) {
                    indexArray.push(yComp + vertsPerDim - 1);
                    indexArray.push(yComp);
                }
                for (let x = 0; x < vertsPerDim; ++x) {
                    const thisVert = yComp + x;
                    indexArray.push(thisVert);
                    indexArray.push(thisVert + vertsPerDim);
                }
            }
            return Gfx.makeAndBindVao([
                {
                    dataArgs: { srcData: posBuffer, usage: Gfx.gl.STATIC_DRAW },
                    attribsArgs: [{
                            index: groundProgPosAttribIdx,
                            size: 2,
                            type: Gfx.gl.FLOAT,
                            normalized: false,
                            stride: 0,
                            offset: 0
                        }]
                }
            ], { srcData: new Uint32Array(indexArray), usage: Gfx.gl.STATIC_DRAW }, Gfx.gl.TRIANGLE_STRIP);
        }
        Gfx.genGroundVaoInfo = genGroundVaoInfo;
        function getImageData(src) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (ctx === null)
                throw ["Unable to get 2D context"];
            canvas.width = src.width;
            canvas.height = src.height;
            ctx.drawImage(src, 0, 0);
            return ctx.getImageData(0, 0, src.width, src.height);
        }
        Gfx.getImageData = getImageData;
    })(Gfx = Engine.Gfx || (Engine.Gfx = {}));
})(Engine || (Engine = {}));
var Engine;
(function (Engine) {
    var Gfx;
    (function (Gfx) {
        ;
        function bindAndDrawVao(vaoInfo) {
            var _a;
            Gfx.gl.bindVertexArray(vaoInfo.vao);
            const mode = (_a = vaoInfo.mode) !== null && _a !== void 0 ? _a : Gfx.gl.TRIANGLES;
            if (!vaoInfo.indexInfo)
                Gfx.gl.drawArrays(mode, 0, vaoInfo.count);
            else
                Gfx.gl.drawElements(mode, vaoInfo.count, vaoInfo.indexInfo.indexType, 0);
        }
        Gfx.bindAndDrawVao = bindAndDrawVao;
        function formatFromInternalformat(internalformat) {
            switch (internalformat) {
                case Gfx.gl.RGB:
                case Gfx.gl.RGB8:
                case Gfx.gl.SRGB8:
                case Gfx.gl.RGB565:
                case Gfx.gl.R11F_G11F_B10F:
                case Gfx.gl.RGB9_E5:
                case Gfx.gl.RGB16F:
                case Gfx.gl.RGB32F:
                    return Gfx.gl.RGB;
                case Gfx.gl.RGBA:
                case Gfx.gl.RGBA8:
                case Gfx.gl.SRGB8_ALPHA8:
                case Gfx.gl.RGB5_A1:
                case Gfx.gl.RGB10_A2:
                case Gfx.gl.RGBA4:
                case Gfx.gl.RGBA16F:
                case Gfx.gl.RGBA32F:
                    return Gfx.gl.RGBA;
                case Gfx.gl.LUMINANCE_ALPHA:
                    return Gfx.gl.LUMINANCE_ALPHA;
                case Gfx.gl.LUMINANCE:
                    return Gfx.gl.LUMINANCE;
                case Gfx.gl.ALPHA:
                    return Gfx.gl.ALPHA;
                case Gfx.gl.R8:
                case Gfx.gl.R16F:
                case Gfx.gl.R32F:
                    return Gfx.gl.RED;
                case Gfx.gl.R8UI:
                    return Gfx.gl.RED_INTEGER;
                case Gfx.gl.RG8:
                case Gfx.gl.RG16F:
                case Gfx.gl.RG32F:
                    return Gfx.gl.RG;
                case Gfx.gl.RG8UI:
                    return Gfx.gl.RG_INTEGER;
                case Gfx.gl.RGB8UI:
                    return Gfx.gl.RGB_INTEGER;
                case Gfx.gl.RGBA8UI:
                    return Gfx.gl.RGBA_INTEGER;
            }
            throw ["Unknown internalformat", internalformat];
        }
        async function loadImage(src) {
            const image = new Image();
            image.src = src;
            await image.decode();
            return image;
        }
        Gfx.loadImage = loadImage;
        async function genAndBindTexture(src, internalformat, type, options) {
            const bitmapPromise = createImageBitmap(src);
            const texture = Gfx.gl.createTexture();
            const bitmap = await bitmapPromise;
            Gfx.gl.bindTexture(Gfx.gl.TEXTURE_2D, texture);
            Gfx.gl.texImage2D(Gfx.gl.TEXTURE_2D, 0, internalformat, formatFromInternalformat(internalformat), type, bitmap);
            if (options) {
                Engine.handleOptions(options, {
                    generateMipmap: (o => { if (o)
                        Gfx.gl.generateMipmap(Gfx.gl.TEXTURE_2D); }),
                    magFilter: (o => { if (o != Gfx.gl.LINEAR)
                        Gfx.gl.texParameteri(Gfx.gl.TEXTURE_2D, Gfx.gl.TEXTURE_MAG_FILTER, o); }),
                    minFilter: (o => { if (o != Gfx.gl.NEAREST_MIPMAP_LINEAR)
                        Gfx.gl.texParameteri(Gfx.gl.TEXTURE_2D, Gfx.gl.TEXTURE_MIN_FILTER, o); }),
                    wrapS: (o => { if (o != Gfx.gl.REPEAT)
                        Gfx.gl.texParameteri(Gfx.gl.TEXTURE_2D, Gfx.gl.TEXTURE_WRAP_S, o); }),
                    wrapT: (o => { if (o != Gfx.gl.REPEAT)
                        Gfx.gl.texParameteri(Gfx.gl.TEXTURE_2D, Gfx.gl.TEXTURE_WRAP_T, o); })
                });
            }
            return texture;
        }
        Gfx.genAndBindTexture = genAndBindTexture;
        async function genAndBindTextureFrom2dArrayRGB(array2d, height, options) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx === null)
                throw ["Unable to get 2D context"];
            const rgbaArray = [];
            for (let i = 0; i < array2d.length; ++i) {
                rgbaArray.push(array2d[i]);
                if (i % 3 === 2)
                    rgbaArray.push(255);
            }
            const imageData = ctx.createImageData(Math.floor(array2d.length / height / 3), height);
            imageData.data.set(rgbaArray);
            return genAndBindTexture(imageData, Gfx.gl.RGBA, Gfx.gl.UNSIGNED_BYTE, options);
        }
        Gfx.genAndBindTextureFrom2dArrayRGB = genAndBindTextureFrom2dArrayRGB;
        async function loadAndBindTexture(src, internalformat, type, options) {
            return genAndBindTexture(await loadImage(src), internalformat, type, options);
        }
        Gfx.loadAndBindTexture = loadAndBindTexture;
        function makeAndBindVao(dataAttribsGroups, indexBufferOrCount, mode) {
            const vao = Gfx.gl.createVertexArray();
            Gfx.gl.bindVertexArray(vao);
            const indexed = typeof indexBufferOrCount !== "number";
            let count;
            if (!indexed)
                count = indexBufferOrCount;
            else {
                if ('srcOffset' in indexBufferOrCount) {
                    count = (indexBufferOrCount.length
                        ? indexBufferOrCount.length
                        : indexBufferOrCount.srcData.length) - indexBufferOrCount.srcOffset;
                }
                else {
                    count = indexBufferOrCount.srcData.length;
                }
            }
            for (const group of dataAttribsGroups) {
                const buf = Gfx.gl.createBuffer();
                Gfx.gl.bindBuffer(Gfx.gl.ARRAY_BUFFER, buf);
                const dataArgs = group.dataArgs;
                if ('srcOffset' in dataArgs) {
                    Gfx.gl.bufferData(Gfx.gl.ARRAY_BUFFER, dataArgs.srcData, dataArgs.usage, dataArgs.srcOffset, dataArgs.length);
                }
                else {
                    Gfx.gl.bufferData(Gfx.gl.ARRAY_BUFFER, dataArgs.srcData, dataArgs.usage);
                }
                for (const attrib of group.attribsArgs) {
                    Gfx.gl.enableVertexAttribArray(attrib.index);
                    Gfx.gl.vertexAttribPointer(attrib.index, attrib.size, attrib.type, attrib.normalized, attrib.stride, attrib.offset);
                }
            }
            if (indexed) {
                const buf = Gfx.gl.createBuffer();
                Gfx.gl.bindBuffer(Gfx.gl.ELEMENT_ARRAY_BUFFER, buf);
                if ('srcOffset' in indexBufferOrCount) {
                    Gfx.gl.bufferData(Gfx.gl.ELEMENT_ARRAY_BUFFER, indexBufferOrCount.srcData, indexBufferOrCount.usage, indexBufferOrCount.srcOffset, indexBufferOrCount.length);
                }
                else {
                    Gfx.gl.bufferData(Gfx.gl.ELEMENT_ARRAY_BUFFER, indexBufferOrCount.srcData, indexBufferOrCount.usage);
                }
            }
            return {
                vao,
                count,
                mode,
                indexInfo: indexed
                    ? { indexType: glTypeFromTypeArray(indexBufferOrCount.srcData) }
                    : undefined
            };
        }
        Gfx.makeAndBindVao = makeAndBindVao;
        function makeGLProgram(vsSource, fsSource) {
            const p = Gfx.gl.createProgram();
            Gfx.gl.attachShader(p, makeShader(Gfx.gl.VERTEX_SHADER, vsSource));
            Gfx.gl.attachShader(p, makeShader(Gfx.gl.FRAGMENT_SHADER, fsSource));
            Gfx.gl.linkProgram(p);
            Gfx.gl.validateProgram(p);
            if (!Gfx.gl.getProgramParameter(p, Gfx.gl.VALIDATE_STATUS)) {
                throw ["GL Program validation failed", Gfx.gl.getProgramInfoLog(p), vsSource, fsSource];
            }
            return p;
        }
        Gfx.makeGLProgram = makeGLProgram;
        function makeShader(type, source) {
            const s = Gfx.gl.createShader(type);
            Gfx.gl.shaderSource(s, source);
            Gfx.gl.compileShader(s);
            if (!Gfx.gl.getShaderParameter(s, Gfx.gl.COMPILE_STATUS))
                throw ["Shader compilation failed", Gfx.gl.getShaderInfoLog(s), type, source];
            return s;
        }
        function glTypeFromTypeArray(typedArray) {
            switch (typedArray.constructor) {
                case Int8Array:
                    return Gfx.gl.BYTE;
                case Uint8Array:
                    return Gfx.gl.UNSIGNED_BYTE;
                case Uint8ClampedArray:
                    return Gfx.gl.UNSIGNED_BYTE;
                case Int16Array:
                    return Gfx.gl.SHORT;
                case Uint16Array:
                    return Gfx.gl.UNSIGNED_SHORT;
                case Int32Array:
                    return Gfx.gl.INT;
                case Uint32Array:
                    return Gfx.gl.UNSIGNED_INT;
                case Float32Array:
                    return Gfx.gl.FLOAT;
            }
            throw ["TypedArray is invalid gl type", Object.prototype.toString.call(typedArray)];
        }
        Gfx.glTypeFromTypeArray = glTypeFromTypeArray;
        function glWrapFromWrapping(wrapping) {
            switch (wrapping) {
                case 0:
                    return Gfx.gl.REPEAT;
                case 1:
                    return Gfx.gl.CLAMP_TO_EDGE;
            }
        }
        Gfx.glWrapFromWrapping = glWrapFromWrapping;
        function glSizeFromType(type) {
            switch (type) {
                case Gfx.gl.BYTE:
                case Gfx.gl.UNSIGNED_BYTE:
                    return 1;
                case Gfx.gl.HALF_FLOAT:
                case Gfx.gl.SHORT:
                case Gfx.gl.UNSIGNED_SHORT:
                case Gfx.gl.UNSIGNED_SHORT_4_4_4_4:
                case Gfx.gl.UNSIGNED_SHORT_5_5_5_1:
                case Gfx.gl.UNSIGNED_SHORT_5_6_5:
                    return 2;
                case Gfx.gl.FLOAT:
                case Gfx.gl.INT:
                case Gfx.gl.UNSIGNED_INT:
                case Gfx.gl.UNSIGNED_INT_24_8:
                case Gfx.gl.UNSIGNED_INT_2_10_10_10_REV:
                case Gfx.gl.UNSIGNED_INT_5_9_9_9_REV:
                case Gfx.gl.UNSIGNED_INT_10F_11F_11F_REV:
                    return 4;
            }
            throw ["Unknown type", type];
        }
        Gfx.glSizeFromType = glSizeFromType;
    })(Gfx = Engine.Gfx || (Engine.Gfx = {}));
})(Engine || (Engine = {}));
var Engine;
(function (Engine) {
    Engine.baseDir = '';
    const targetTickrate = 1 / 60;
    Engine.keys = new Set();
    Engine.newKeys = new Set();
    Engine.pointerLocked = false;
    Engine.lockedPointerDX = 0;
    Engine.lockedPointerDY = 0;
    const mouseButtons = {
        0: "MouseLeft",
        1: "MouseMiddle",
        2: "MouseRight"
    };
    async function main() {
        const canvas = document.getElementById("game");
        const canvas2d = document.getElementById("game2d");
        Engine.Gfx.gl = canvas.getContext("webgl2");
        Engine.Gfx.ctx2d = canvas2d.getContext("2d");
        if (!Engine.Gfx.gl) {
            canvas.outerHTML = "<p>ERROR webgl2 failed; Please update your browser or enable webgl2 in its settings</p>";
            return;
        }
        if (!Engine.Gfx.ctx2d) {
            canvas.outerHTML = "<p>ERROR 2d context failed</p>";
            return;
        }
        canvas.addEventListener("keydown", e => {
            if (!Engine.pointerLocked && e.code !== "Enter")
                return;
            if (!Engine.pointerLocked)
                canvas.requestPointerLock();
            e.preventDefault();
            e.stopPropagation();
            Engine.keys.add(e.code);
            Engine.newKeys.add(e.code);
        });
        canvas.addEventListener("keyup", e => {
            if (!Engine.pointerLocked)
                return;
            e.preventDefault();
            e.stopPropagation();
            Engine.keys.delete(e.code);
        });
        canvas.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            if (!Engine.pointerLocked) {
                canvas.requestPointerLock();
                return;
            }
        });
        document.addEventListener("pointerlockchange", () => {
            if (document.pointerLockElement === canvas)
                Engine.pointerLocked = true;
            else {
                Engine.pointerLocked = false;
                Engine.keys.clear();
            }
        });
        canvas.addEventListener("mousemove", e => {
            if (!Engine.pointerLocked)
                return;
            e.preventDefault();
            e.stopPropagation();
            Engine.lockedPointerDX += e.movementX;
            Engine.lockedPointerDY += e.movementY;
        });
        canvas.addEventListener("mousedown", e => {
            if (!Engine.pointerLocked)
                return;
            e.preventDefault();
            e.stopPropagation();
            const key = mouseButtons[e.button];
            if (key === undefined)
                return;
            Engine.keys.add(key);
            Engine.newKeys.add(key);
        });
        canvas.addEventListener("mouseup", e => {
            if (!Engine.pointerLocked)
                return;
            e.preventDefault();
            e.stopPropagation();
            const key = mouseButtons[e.button];
            if (key === undefined)
                return;
            Engine.keys.delete(key);
        });
        const testProg = Engine.Gfx.makeGLProgram(`#version 300 es

uniform mat4 view;
uniform mat4 proj;

in vec2 pos;

out float depth;

void main() {
	gl_Position = proj * view * vec4(0.0, pos, 1.0);
	//gl_Position.xy /= gl_Position.w;

	// vec4 res = proj * view * vec4(0.0, pos, 1.0);
	// res.xy /= res.w;
	// gl_Position = res;

	// gl_Position = view * vec4(0.0, pos, 1.0);

	depth = gl_Position.z;
}
`, `#version 300 es
precision highp float;

in float depth;

out vec4 color;

void main() {
	color = vec4(0.5, 1.0 - mix(0.5, 0.0, depth), 0.5, 1.0);
}
`);
        const squareVaoInfo = Engine.Gfx.makeAndBindVao([
            {
                dataArgs: { srcData: new Float32Array([-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5]), usage: Engine.Gfx.gl.STATIC_DRAW },
                attribsArgs: [{ index: Engine.Gfx.gl.getAttribLocation(testProg, "pos"), size: 2, type: Engine.Gfx.gl.FLOAT, normalized: false, stride: 0, offset: 0 }]
            }
        ], 6, Engine.Gfx.gl.TRIANGLES);
        Engine.Gfx.vaoSets.push({ prog: testProg, vaoInfos: [squareVaoInfo] });
        await initGame();
        await Engine.Gfx.init();
    }
    Engine.main = main;
    let controls;
    async function initGame() {
        Engine.player = new Player();
        controls = new Controls(2, 1 / 2 ** 7);
        const groundLength = 1024;
        const groundCenterOffset = -groundLength * .5;
        Engine.ground = await Terrain.new(Engine.baseDir + 'res/heightmap.png', Engine.baseDir + 'res/forest2_d.jpg', Engine.baseDir + 'res/forest2_n.jpg', 16, Engine.baseDir + 'res/forest4_d.jpg', Engine.baseDir + 'res/forest4_n.jpg', 16, groundLength, 128, (128 * 3) + 1, [groundCenterOffset, groundCenterOffset], 1);
        const tickDelay = Math.round(targetTickrate * 1000);
        setInterval(tick, tickDelay, tickDelay / 1000);
    }
    function tick(d) {
        Engine.player.update(d);
        Engine.Gfx.camPos.set3([Engine.player.pos[0], Engine.player.pos[1] + Engine.player.height, Engine.player.pos[2]]);
        Engine.Gfx.camRot.set3(Engine.player.rot);
        Engine.newKeys.clear();
        Engine.lockedPointerDX = 0;
        Engine.lockedPointerDY = 0;
    }
    class Controls {
        constructor(keyTurnSens, mouseTurnSens) {
            this.move_front = 'KeyW';
            this.move_back = 'KeyS';
            this.move_left = 'KeyA';
            this.move_right = 'KeyD';
            this.move_up = 'MouseRight';
            this.move_down = 'Space';
            this.move_fast = 'ShiftLeft';
            this.turn_up = 'ArrowUp';
            this.turn_down = 'ArrowDown';
            this.turn_left = 'ArrowLeft';
            this.turn_right = 'ArrowRight';
            this.toggle_spectate = 'KeyX';
            this.keyTurnSens = keyTurnSens;
            this.mouseTurnSens = mouseTurnSens;
        }
    }
    class Player {
        constructor() {
            this.pos = [0, 0, 0];
            this.rot = [0, 0, 0];
            this.vel = [0, 0, 0];
            this.moveAcc = 32;
            this.maxHorSpd = 0;
            this.overspeedSlowdownFixedAcc = 12;
            this.overspeedSlowdownFactorAcc = 3 / 4;
            this.gravity = -9.807;
            this.jumpSpd = this.gravity * -.625;
            this.jetpackAcc = this.gravity * -1.5;
            this.spectating = false;
            this.height = 1.5;
            this.grounded = false;
            this.jetpackAccMult = 3 / 8;
            this.airAccMult = this.jetpackAccMult / 4;
            this.flySpd = 24;
            this.fastFlyMul = 2;
            this.jetpackFuelMax = 1;
            this.jetpackFuel = this.jetpackFuelMax;
            this.jetpackFuelCostPerSec = 1 / 3;
            this.jetpackFuelRegenPerSec = 1 / 6;
            this.jetpackFuelRegenDelay = 1;
            this.jetpackFuelRegenTimer = 0;
            this.jetpackRunoutUseDelay = this.jetpackFuelRegenDelay + .25;
            this.jetpackUseTimer = 0;
        }
        update(d) {
            this.move(d);
        }
        move(d) {
            if (Engine.newKeys.has(controls.toggle_spectate)) {
                this.spectating = !this.spectating;
            }
            const skiing = Engine.keys.has(controls.move_down);
            this.rot[0]
                += (Engine.keys.has(controls.turn_up) ? controls.keyTurnSens * d : 0)
                    + (Engine.keys.has(controls.turn_down) ? -controls.keyTurnSens * d : 0)
                    - Engine.lockedPointerDY * controls.mouseTurnSens;
            this.rot[0] = Engine.clamp(this.rot[0], -Engine.HALF_PI, Engine.HALF_PI);
            this.rot[1]
                += (Engine.keys.has(controls.turn_left) ? controls.keyTurnSens * d : 0)
                    + (Engine.keys.has(controls.turn_right) ? -controls.keyTurnSens * d : 0)
                    - Engine.lockedPointerDX * controls.mouseTurnSens;
            this.rot[1] = Engine.mod(this.rot[1] + Engine.PI, Engine.TWO_PI) - Engine.PI;
            const acc = new3();
            if (!this.spectating) {
                let jetpacking = false;
                if (Engine.keys.has(controls.move_up)) {
                    if (this.grounded)
                        this.vel[1] = Math.max(this.jumpSpd, this.vel[1]);
                    if (this.jetpackFuel > 0 && this.jetpackUseTimer <= 0) {
                        jetpacking = true;
                        Engine.Gfx.screenShakeStrength = Math.max(Engine.Gfx.jetpackScreenShake, Engine.Gfx.screenShakeStrength);
                    }
                }
                const horVel = this.vel.copy3().mul3([1, 0, 1]);
                const horVelNorm = horVel.copy3().normOrZero3();
                const horSpeed = horVel.mag3();
                if (this.grounded && !skiing) {
                    const overspeed = Math.max(0, horSpeed - this.maxHorSpd);
                    const slowdown = Math.min(overspeed * (1 - Math.pow((1 - this.overspeedSlowdownFactorAcc), d)) + this.overspeedSlowdownFixedAcc * d, overspeed);
                    this.vel.sub3(horVelNorm.copy3().mul3(slowdown));
                }
                const horAccMag = this.moveAcc * (this.grounded ? (skiing ? 0 : 1) : jetpacking ? this.jetpackAccMult : this.airAccMult);
                const wantHorAcc = [
                    (Engine.keys.has(controls.move_left) ? -1 : 0)
                        + (Engine.keys.has(controls.move_right) ? 1 : 0),
                    0,
                    (Engine.keys.has(controls.move_front) ? -1 : 0)
                        + (Engine.keys.has(controls.move_back) ? 1 : 0)
                ]
                    .normOrZero3()
                    .mul3(horAccMag);
                const horAcc = (wantHorAcc.magSq3() === 0 && this.grounded && !skiing) ? horVelNorm.copy3().mul3(-Math.min(horAccMag, horSpeed)) : wantHorAcc.copy3();
                const moveBasis = eulerBasis([0, this.rot[1], 0]);
                acc.add3(horAcc.basedV3(moveBasis));
                acc[1] += this.gravity + (jetpacking ? this.jetpackAcc : 0);
                if (jetpacking) {
                    acc[1] == this.jetpackAcc;
                    this.jetpackFuel -= this.jetpackFuelCostPerSec * d;
                    if (this.jetpackFuel <= 0)
                        this.jetpackUseTimer = this.jetpackRunoutUseDelay;
                    this.jetpackFuelRegenTimer = this.jetpackFuelRegenDelay;
                }
            }
            else {
                const playerBasis = eulerBasis(this.rot);
                const playerMove_view = [
                    (Engine.keys.has(controls.move_left) ? -this.flySpd : 0)
                        + (Engine.keys.has(controls.move_right) ? this.flySpd : 0),
                    (Engine.keys.has(controls.move_up) ? this.flySpd : 0)
                        + (Engine.keys.has(controls.move_down) ? -this.flySpd : 0),
                    (Engine.keys.has(controls.move_front) ? -this.flySpd : 0)
                        + (Engine.keys.has(controls.move_back) ? this.flySpd : 0)
                ];
                this.vel.set3(playerMove_view.basedV3(playerBasis).mul3(Engine.keys.has(controls.move_fast) ? this.fastFlyMul : 1));
            }
            acc.mul3(d);
            this.pos.add3(this.vel.copy3().add3(acc.copy3().mul3(.5)).mul3(d));
            this.vel.add3(acc);
            this.grounded = false;
            const groundHeight = Engine.ground.heightAt(this.pos[0], this.pos[2]);
            if (this.pos[1] < groundHeight) {
                this.pos[1] = groundHeight;
                const groundNorm = Engine.ground.normalAt(this.pos[0], this.pos[2]);
                const velDotGround = this.vel.dot3(groundNorm);
                if (velDotGround < 0) {
                    this.grounded = true;
                    Engine.Gfx.screenShakeStrength = Math.max(Engine.Gfx.screenShakeStrength, Engine.clamp(velDotGround * -Engine.Gfx.landingSpeedScreenShakeMult + Engine.Gfx.landingSpeedScreenShakeOffset, 0, 1));
                    this.vel.sub3(groundNorm.mul3(velDotGround));
                }
            }
            const rightEdge = Engine.ground.length * .5;
            const leftEdge = -rightEdge;
            const frontEdge = Engine.ground.length * .5;
            const backEdge = -frontEdge;
            if (this.pos[0] < leftEdge) {
                this.pos[0] = leftEdge;
                this.vel[0] = 0;
            }
            if (this.pos[0] > rightEdge) {
                this.pos[0] = rightEdge;
                this.vel[0] = 0;
            }
            if (this.pos[2] < backEdge) {
                this.pos[2] = backEdge;
                this.vel[2] = 0;
            }
            if (this.pos[2] > frontEdge) {
                this.pos[2] = rightEdge;
                this.vel[2] = 0;
            }
            if (this.jetpackFuelRegenTimer <= 0)
                this.jetpackFuel += this.jetpackFuelRegenPerSec * d;
            this.jetpackFuel = Engine.clamp(this.jetpackFuel, 0, this.jetpackFuelMax);
            this.jetpackFuelRegenTimer -= d;
            this.jetpackUseTimer -= d;
        }
    }
    class Terrain {
        constructor(heightmapData, heightmapTex, normalmapData, normalmapTex, topMatDiff, topMatNorm, topMatScaleRecip, sideMatDiff, sideMatNorm, sideMatScaleRecip, vaoInfo, length, heightScale, res, pos, wrapping) {
            this.pos = [0, 0];
            this.heightmapData = heightmapData;
            this.heightmapTex = heightmapTex;
            this.normalmapData = normalmapData;
            this.normalmapTex = normalmapTex;
            this.topMatDiff = topMatDiff;
            this.topMatNorm = topMatNorm;
            this.topMatScaleRecip = topMatScaleRecip;
            this.sideMatDiff = sideMatDiff;
            this.sideMatNorm = sideMatNorm;
            this.sideMatScaleRecip = sideMatScaleRecip;
            this.vaoInfo = vaoInfo;
            this.length = length;
            this.heightScale = heightScale;
            this.res = res;
            this.pos = pos;
            this.wrapping = wrapping;
        }
        static async new(hmapSrc, topMatDiffSrc, topMatNormSrc, topMatScale, sideMatDiffSrc, sideMatNormSrc, sideMatScale, length, heightScale, res, pos, wrapping) {
            const heightmapImagePromise = Engine.Gfx.loadImage(hmapSrc);
            const topMatDiffImagePromise = Engine.Gfx.loadImage(topMatDiffSrc);
            const topMatNormImagePromise = Engine.Gfx.loadImage(topMatNormSrc);
            const sideMatDiffImagePromise = Engine.Gfx.loadImage(sideMatDiffSrc);
            const sideMatNormImagePromise = Engine.Gfx.loadImage(sideMatNormSrc);
            const vaoInfo = Engine.Gfx.genGroundVaoInfo(res);
            const heightmapImage = await heightmapImagePromise;
            const glWrap = Engine.Gfx.glWrapFromWrapping(wrapping);
            const heightmapTexPromise = Engine.Gfx.genAndBindTexture(heightmapImage, Engine.Gfx.gl.LUMINANCE, Engine.Gfx.gl.UNSIGNED_BYTE, { minFilter: Engine.Gfx.gl.LINEAR, wrapS: glWrap, wrapT: glWrap });
            const heightmapImageData = Engine.Gfx.getImageData(heightmapImage);
            const hm = Engine.CreateWrappingArray(new Array(heightmapImageData.height), wrapping);
            for (let y = 0; y < heightmapImageData.height; ++y) {
                const row = Engine.CreateWrappingArray(new Array(heightmapImageData.width), wrapping);
                hm[y] = row;
                for (let x = 0; x < heightmapImageData.width; ++x) {
                    row[x] = heightmapImageData.data[(y * heightmapImageData.width + x) * 4] / 255;
                }
            }
            const normalmapData = Engine.CreateWrappingArray(new Array(hm.length), wrapping);
            for (let y = 0; y < hm.length; ++y) {
                const row = Engine.CreateWrappingArray(new Array(hm[y].length), wrapping);
                normalmapData[y] = row;
                for (let x = 0; x < hm[y].length; ++x) {
                    const centre = hm[y][x] * heightScale;
                    const leftDelta = hm[y][x - 1] * heightScale - centre;
                    const rightDelta = hm[y][x + 1] * heightScale - centre;
                    const backDelta = hm[y - 1][x] * heightScale - centre;
                    const frontDelta = hm[y + 1][x] * heightScale - centre;
                    const zNorm = [0, length / hm.length, -frontDelta]
                        .norm3()
                        .add3([0, length / hm.length, backDelta]
                        .norm3())
                        .mul3(.5)
                        .norm3();
                    const xNorm = [-rightDelta, length / hm.length, 0]
                        .norm3()
                        .add3([leftDelta, length / hm.length, 0]
                        .norm3())
                        .mul3(.5)
                        .norm3();
                    const sampleDist = length / hm.length;
                    const distMagComp = Engine.sq(sampleDist);
                    const leftNorm = [leftDelta, sampleDist, 0].norm3();
                    const rightNorm = [-rightDelta, sampleDist, 0].norm3();
                    const xSlope = (leftNorm[0] + rightNorm[0]) / (leftNorm[1] + rightNorm[1]);
                    const backNorm = [backDelta, sampleDist, 0].norm3();
                    const frontNorm = [-frontDelta, sampleDist, 0].norm3();
                    const zSlope = (backNorm[0] + frontNorm[0]) / (backNorm[1] + frontNorm[1]);
                    const norm = [xSlope, 1, zSlope].norm3();
                    normalmapData[y][x] = norm;
                }
            }
            const normalmapTexPromise = Engine.Gfx.genAndBindTextureFrom2dArrayRGB(normalmapData.flatMap(row => row.flatMap(norm => [norm[0] * 127.5 + 127.5, norm[1] * 127.5 + 127.5, norm[2] * 127.5 + 127.5])), normalmapData.length, { minFilter: Engine.Gfx.gl.LINEAR });
            const topMatDiffTexPromise = Engine.Gfx.genAndBindTexture(await topMatDiffImagePromise, Engine.Gfx.gl.RGB, Engine.Gfx.gl.UNSIGNED_BYTE, { generateMipmap: true, minFilter: Engine.Gfx.gl.LINEAR_MIPMAP_LINEAR });
            const topMatNormTexPromise = Engine.Gfx.genAndBindTexture(await topMatNormImagePromise, Engine.Gfx.gl.RGB, Engine.Gfx.gl.UNSIGNED_BYTE, { generateMipmap: true, minFilter: Engine.Gfx.gl.LINEAR_MIPMAP_LINEAR });
            const sideMatDiffTexPromise = Engine.Gfx.genAndBindTexture(await sideMatDiffImagePromise, Engine.Gfx.gl.RGB, Engine.Gfx.gl.UNSIGNED_BYTE, { generateMipmap: true, minFilter: Engine.Gfx.gl.LINEAR_MIPMAP_LINEAR });
            const sideMatNormTexPromise = Engine.Gfx.genAndBindTexture(await sideMatNormImagePromise, Engine.Gfx.gl.RGB, Engine.Gfx.gl.UNSIGNED_BYTE, { generateMipmap: true, minFilter: Engine.Gfx.gl.LINEAR_MIPMAP_LINEAR });
            return new this(hm, await heightmapTexPromise, normalmapData, await normalmapTexPromise, await topMatDiffTexPromise, await topMatNormTexPromise, 1 / topMatScale, await sideMatDiffTexPromise, await sideMatNormTexPromise, 1 / sideMatScale, vaoInfo, length, heightScale, res, pos, wrapping);
        }
        mapXFromWorldX(x) {
            return (x - this.pos[0]) / this.length * this.heightmapData.length - .5;
        }
        mapYFromWorldZ(z) {
            return (z - this.pos[1]) / this.length * this.heightmapData.length - .5;
        }
        dlTriXFromWorldX(x) {
            const trisPerDim = this.res - 1;
            return Math.floor((x - this.pos[0]) / this.length * trisPerDim) / trisPerDim * this.heightmapData.length - .5;
        }
        dlTriYFromWorldZ(z) {
            const trisPerDim = this.res - 1;
            return Math.floor((z - this.pos[1]) / this.length * trisPerDim) / trisPerDim * this.heightmapData.length - .5;
        }
        bilinearHeightAtLocal(x, y) {
            const hm = this.heightmapData;
            const leftIdx = Math.floor(x);
            const downIdx = Math.floor(y);
            const fractX = x - leftIdx;
            const fractY = y - downIdx;
            return Engine.bilinear(fractX, fractY, hm[downIdx][leftIdx], hm[downIdx][leftIdx + 1], hm[downIdx + 1][leftIdx], hm[downIdx + 1][leftIdx + 1]);
        }
        heightAt(x, z) {
            const mapX = this.mapXFromWorldX(x);
            const mapY = this.mapYFromWorldZ(z);
            const dlVertX = this.dlTriXFromWorldX(x);
            const dlVertY = this.dlTriYFromWorldZ(z);
            const trisPerDim = this.res - 1;
            const vertDist = this.heightmapData.length / trisPerDim;
            const fractX = (mapX - dlVertX) / vertDist;
            const fractY = (mapY - dlVertY) / vertDist;
            if (fractX + fractY > 1) {
                const ul = this.bilinearHeightAtLocal(dlVertX, dlVertY + vertDist);
                const ur = this.bilinearHeightAtLocal(dlVertX + vertDist, dlVertY + vertDist);
                const dr = this.bilinearHeightAtLocal(dlVertX + vertDist, dlVertY);
                const horLerp = Engine.fastLerp(ur, ul, (1 - fractX) / fractY);
                const lerp = Engine.fastLerp(dr, horLerp, fractY);
                return lerp * this.heightScale;
            }
            else {
                const dl = this.bilinearHeightAtLocal(dlVertX, dlVertY);
                const dr = this.bilinearHeightAtLocal(dlVertX + vertDist, dlVertY);
                const ul = this.bilinearHeightAtLocal(dlVertX, dlVertY + vertDist);
                const horLerp = Engine.fastLerp(dl, dr, fractX / (1 - fractY));
                const lerp = Engine.fastLerp(horLerp, ul, fractY);
                return lerp * this.heightScale;
            }
        }
        bilinearNormalAtLocal(x, y) {
            const nm = this.normalmapData;
            const leftIdx = Math.floor(x);
            const downIdx = Math.floor(y);
            const fractX = x - leftIdx;
            const fractY = y - downIdx;
            return bilinear3(fractX, fractY, nm[downIdx][leftIdx], nm[downIdx][leftIdx + 1], nm[downIdx + 1][leftIdx], nm[downIdx + 1][leftIdx + 1]);
        }
        normalAt(x, z) {
            return this.bilinearNormalAtLocal(this.mapXFromWorldX(x), this.mapYFromWorldZ(z));
        }
        triNormalAt(x, z) {
            const mapX = this.mapXFromWorldX(x);
            const mapY = this.mapYFromWorldZ(z);
            const dlVertX = this.dlTriXFromWorldX(x);
            const dlVertY = this.dlTriYFromWorldZ(z);
            const trisPerDim = this.res - 1;
            const vertDist = this.heightmapData.length / trisPerDim;
            const fractX = (mapX - dlVertX) / vertDist;
            const fractY = (mapY - dlVertY) / vertDist;
            if (fractX + fractY > 1) {
                const ul = this.bilinearNormalAtLocal(dlVertX, dlVertY + vertDist);
                const ur = this.bilinearNormalAtLocal(dlVertX + vertDist, dlVertY + vertDist);
                const dr = this.bilinearNormalAtLocal(dlVertX + vertDist, dlVertY);
                const horLerp = ur.fastLerp3(ul, (1 - fractX) / fractY).norm3();
                return dr.fastLerp3(horLerp, fractY).mul3(this.heightScale).norm3();
            }
            else {
                const dl = this.bilinearNormalAtLocal(dlVertX, dlVertY);
                const dr = this.bilinearNormalAtLocal(dlVertX + vertDist, dlVertY);
                const ul = this.bilinearNormalAtLocal(dlVertX, dlVertY + vertDist);
                const horLerp = dl.fastLerp3(dr, fractX / (1 - fractY)).norm3();
                return horLerp.fastLerp3(ul, fractY).mul3(this.heightScale).norm3();
            }
        }
    }
})(Engine || (Engine = {}));
var Engine;
(function (Engine) {
    Engine.HALF_PI = .5 * Math.PI;
    Engine.PI = Math.PI;
    Engine.TWO_PI = 2 * Math.PI;
    function bilinear(x, y, dlVal, drVal, ulVal, urVal) {
        return fastLerp(fastLerp(dlVal, drVal, x), fastLerp(ulVal, urVal, x), y);
    }
    Engine.bilinear = bilinear;
    function clamp(n, min, max) {
        return n <= min ? min : n >= max ? max : n;
    }
    Engine.clamp = clamp;
    function fastLerp(a, b, weight) {
        return (b - a) * weight + a;
    }
    Engine.fastLerp = fastLerp;
    function slowLerp(a, b, weight) {
        return a * (1 - weight) + b * weight;
    }
    Engine.slowLerp = slowLerp;
    function sq(n) {
        return n * n;
    }
    Engine.sq = sq;
    function handleOptions(optionsObj, handlers) {
        for (const key in optionsObj) {
            handlers[key](optionsObj[key]);
        }
    }
    Engine.handleOptions = handleOptions;
    function mod(a, b) { return (a % b + b) % b; }
    Engine.mod = mod;
    function CreateWrappingArray(array, wrapping) {
        switch (wrapping) {
            case 0:
                return new Proxy(array, {
                    get: (obj, key) => {
                        if (typeof key !== "string")
                            return obj[key];
                        const idx = Number(key);
                        if (isNaN(idx))
                            return obj[key];
                        return obj[mod(idx, obj.length)];
                    }
                });
            case 1:
                return new Proxy(array, {
                    get: (obj, key) => {
                        if (typeof key !== "string")
                            return obj[key];
                        const idx = Number(key);
                        if (isNaN(idx))
                            return obj[key];
                        return obj[clamp(idx, 0, obj.length - 1)];
                    }
                });
        }
    }
    Engine.CreateWrappingArray = CreateWrappingArray;
})(Engine || (Engine = {}));
//# sourceMappingURL=game.js.map