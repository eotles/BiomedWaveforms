class BiomedicalWaveform {
    constructor(plottingRange = [0, 300], frequency = 250) {
        this.plottingRange = plottingRange;
        this.frequency = frequency;
    }

    scaleY(value, canvas) {
        const [yMin, yMax] = this.plottingRange;
        return canvas.height - (value - yMin) / (yMax - yMin) * canvas.height;
    }


    generateEKGData() {
        const baseline = 150;
        const data = [];
        for (let i = 0; i < 1000; i++) {
            const positionInSecond = i % 250;

            if (positionInSecond >= 60 && positionInSecond < 65) {
                data.push(baseline - 10);
            } else if (positionInSecond >= 100 && positionInSecond < 103) {
                data.push(baseline + 10);
            } else if (positionInSecond >= 103 && positionInSecond < 107) {
                data.push(baseline - 40);
            } else if (positionInSecond >= 107 && positionInSecond < 110) {
                data.push(baseline + 10);
            } else if (positionInSecond >= 140 && positionInSecond < 144) {
                data.push(baseline - 20);
            } else {
                data.push(baseline);
            }
        }
        return data;
    }

    static plotWaveform(canvas, data, plottingRange, options = {}) {
        const ctx = canvas.getContext("2d");
        const waveform = new BiomedicalWaveform(plottingRange);
        
        ctx.beginPath();
        ctx.moveTo(0, waveform.scaleY(data[0], canvas));
        for (let i = 1; i < data.length; i++) {
            ctx.lineTo(i, waveform.scaleY(data[i], canvas));
        }
        
        ctx.strokeStyle = options.color || "black";
        ctx.lineWidth = options.lineWidth || 1;
        ctx.stroke();
    }

    static drawGrid(canvas, gridSize = 5, boldInterval = 25) {
        const ctx = canvas.getContext("2d");

        for (let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.strokeStyle = (x % boldInterval === 0) ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Drawing X axis numbers
            if (x % boldInterval === 0) {
                ctx.fillText(x, x + 2, 12);
            }
        }

        for (let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.strokeStyle = (y % boldInterval === 0) ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Drawing Y axis numbers
            if (y % boldInterval === 0) {
                ctx.fillText(y, 2, y - 2);
            }
        }
    }
}

function startDynamicRendering(canvas, waveform, duration, interval, options = {}) {
    const ctx = canvas.getContext("2d");
    const data = waveform.generateEKGData();
    let position = 0;

    setInterval(() => {
        ctx.clearRect(position, 0, options.lineWidth || 1, canvas.height);

        ctx.beginPath();
        ctx.moveTo(position, waveform.scaleY(data[position], canvas));
        position = (position + 1) % duration;
        ctx.lineTo(position, waveform.scaleY(data[position], canvas));

        ctx.strokeStyle = options.color || "black";
        ctx.lineWidth = options.lineWidth || 1;
        ctx.stroke();
    }, interval);
}

window.BiomedicalWaveform = BiomedicalWaveform;
window.startDynamicRendering = startDynamicRendering;
