const VertexShaderSource = `
attribute vec4 aVertexPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
vec2 uWindowMatrix;

void main() {
    // gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    gl_Position = 
}
`;

const FragmentShaderSource = `
precision mediump float;

vec2 uWindowMatrix;

void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

window.onload = function () {
    console.log('loading');

    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('noise');

    if (!canvas.getContext) {
        console.error('Unable to support canvas element');
        return;
    }

    /** @type {WebGLRenderingContext} */
    const gl = canvas.getContext('webgl');
    if (gl === null) {
        console.error('webgl not supported');
        return;
    }

    const shaderProgram = initShaderProgram(gl, VertexShaderSource, FragmentShaderSource);

    drawScene(gl, shaderProgram);

    // // Set clear color to black, fully opaque
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // // Clear the color buffer with specified clear color
    // gl.clear(gl.COLOR_BUFFER_BIT);
}

function initBuffers(
    /** @type {WebGLRenderingContext} */
    gl
) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
        1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        -1.0, -1.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return {
        position: positionBuffer
    };
}

function loadShader(
    /** @type {WebGLRenderingContext} */
    gl,
    /** @type {number} */
    type,
    /** @type {string} */
    source
) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error compiling the shaders', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function initShaderProgram(
    /** @type {WebGLRenderingContext} */
    gl,
    /** @type {string} */
    vs,
    /** @type {string} */
    fs) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vs);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fs);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Error creating shader program', gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

function initProgramInfo(
    /** @type {WebGLRenderingContext} */
    gl,
    /** @type {WebGLProgram} */
    shaderProgram) {
    return {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition')
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
        },
        vars: {
            windowMatrix: gl.getUniformLocation(shaderProgram, 'uWindowMatrix')
        }
    };
}

function drawScene(
    /** @type {WebGLRenderingContext} */
    gl,
    /** @type {WebGLProgram} */
    shaderProgram) {
    const programInfo = initProgramInfo(gl, shaderProgram);
    const buffers = initBuffers(gl);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(
        projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar
    );

    const modelViewMatrix = mat4.create();

    mat4.translate(
        modelViewMatrix,
        modelViewMatrix,
        [0.0, 0.0, -1.0]
    );

    {
        const numComponents = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset
        );
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexPosition
        );
    }

    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
    );
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
    );
    gl.uniform2f(
        programInfo.vars.windowMatrix,
        gl.canvas.clientWidth, gl.canvas.clientHeight
    );

    {
        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
}