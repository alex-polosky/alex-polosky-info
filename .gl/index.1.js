const normalize = (x, min, max) => {
    return (x - min) / (max - min);
}

const denormalize = (x, min, max) => {
    return x * (max - min) + min;
}

window.onload = function () {
    console.log('loaded');

    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('noise');

    if (!canvas.getContext) {
        console.log("Unable to support canvas element");
        return;
    }
    /** @type {CanvasRenderingContext2D } */
    let ctx;
    let wWidth, wHeight;

    let noiseData;
    let frame = 0;
    let frames = 25;
    // let frames = 180;

    const createRandomNoise = (frames, currentFrame, totalFrames) => {
        const idata = ctx.createImageData(wWidth, wHeight);
        const buffer32 = new Uint32Array(idata.data.buffer);
        const len = buffer32.length;

        const barriers = [
            [0.0, 0x33000000],
            [0.1, 0x33ff0000],
            [0.2, 0x3300ff00],
            [0.3, 0x330000ff],
            [0.4, 0x33ffffff],
            [0.5, 0x33000000],
        ]
        // const barriers = [
        //     [0.0, 0x00cdcdff],
        //     [0.4, 0x00cdcdff],
        //     [0.6, 0xffffffff],
        //     [0.8, 0xffffffff],
        // ]

        for (let i = 0; i < len; i++) {
            let c = Math.random();
            for (let j = 0; j < barriers.length; j++) {
                let x = 0;
                let y = 1;
                if (j > 0) {
                    x = barriers[j - 1][0];
                }
                if (j < barriers.length - 1) {
                    y = barriers[j][0];
                }
                if (x <= c && c < y) {
                    buffer32[i] = barriers[j][1];
                }
            }
        }

        frames.push(idata);
    }

    const createThing = (frames, currentFrame, totalFrames) => {
        const idata = ctx.createImageData(wWidth, wHeight);
        const buffer32 = new Uint32Array(idata.data.buffer);
        const len = buffer32.length;
        const rad = currentFrame;
        // const rad = currentFrame * Math.PI / 180;

        for (let i = 0; i < len; i++) {
            let a = 0xFF;
            let r = (i % wWidth + Math.tan(rad)) % 0xff;
            let g = (i % wWidth) % 0xff;
            let b = (i % wHeight) % 0xff;

            let d = ((a << 24) | (b << 16) | (g << 8) | (r << 0)) >>> 0;
            buffer32[i] = d;
        }

        frames.push(idata);
    }

    const createCicles = (frames, currentFrame, totalFrames) => {
        const idata = ctx.createImageData(wWidth, wHeight);
        const buffer32 = new Uint32Array(idata.data.buffer);
        const len = buffer32.length;
        const rad = denormalize(normalize(currentFrame - 1, 0, totalFrames - 1), 0, 359) * Math.PI / 180;
        // const rad = currentFrame * Math.PI / 180;

        for (let i = 0; i < len; i++) {
            let a = 0xCC;
            // let r = (Math.sin(rad)) % 0xff;
            let r = denormalize(Math.sin(rad) + i % wWidth, 0, 0xFF);
            let g = denormalize(Math.cos(rad - i) + i % wWidth, 0, 0xFF);
            let b = denormalize(Math.tan(rad) + i % wHeight, 0, 0xFF);

            let d = ((a << 24) | (b << 16) | (g << 8) | (r << 0)) >>> 0;
            buffer32[i] = d;
        }

        frames.push(idata);
    }

    const noiseTypes = [
        ['random', createRandomNoise],
        ['thing', createThing],
        ['cicles', createCicles]
    ]

    // Create Noise
    const createNoise = (frames, currentFrame, totalFrames) => {
        // createRandomNoise(frames, currentFrame, totalFrames);
        // createThing(frames, currentFrame, totalFrames);
        // createCicles(frames, currentFrame, totalFrames);
        let v = parseInt(noiseTypeEl.value);
        if (v > 0) {
            noiseTypes[v - 1][1](frames, currentFrame, totalFrames);
        } else {
            const idata = ctx.createImageData(wWidth, wHeight);
            frames.push(idata);
        }
    };


    // Play Noise
    const paintNoise = () => {
        if (frame === (frames - 1)) {
            frame = 0;
        } else {
            frame++;
        }

        ctx.putImageData(noiseData[frame], 0, 0);
    };

    const setup = () => {
        wWidth = window.innerWidth;
        wHeight = window.innerHeight;

        canvas.width = wWidth;
        canvas.height = wHeight;

        noiseData = [];
        for (let i = 0; i < frames; i++) {
            createNoise(noiseData, i, frames);
        }
        loop();
    }

    let loopTimeout;
    const loop = () => {
        paintNoise(frame);

        loopTimeout = window.setTimeout(() => {
            // window.requestAnimationFrame(loop);
            // setup();
            loop();
        }, 1000 / 25);
    };

    let resizeEventListener;
    const reset = () => {
        window.addEventListener('resize', () => {
            window.clearTimeout(resizeEventListener);

            resizeEventListener = window.setTimeout(() => {
                window.clearTimeout(loopTimeout);
                setup();
            }, 200);
        });
    }

    /** @type {HTMLSelectElement} */
    const noiseTypeEl = document.getElementById('noiseType');
    // noiseTypeEl.value
    for (let i = 0; i < noiseTypes.length; i++) {
        /** @type{HTMLOptionElement} */
        let el = document.createElement('option');
        el.value = i + 1;
        el.text = noiseTypes[i][0];
        noiseTypeEl.appendChild(el);
    }
    noiseTypeEl.onchange = (() => {
        console.log('change');
        setup();
    }).bind(noiseTypeEl);

    ctx = canvas.getContext('2d');
    setup();
    reset();
};