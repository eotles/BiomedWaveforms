/**
 * waveformPlotter.js
 * Copyright (c) 2023
 *
 * functionality for plotting waveforms
 *
 * @summary short description for the file
 * @author erkin <eotles@gmail.com>
 *
 * Created at     : 2023-10-14
 * Last modified  : 2018-10-14
 */

function almostEqual(a, b, epsilon = 0.001) {
    return Math.abs(a - b) < epsilon;
}

class WaveformPlotter {
    constructor(canvas, duration) {
        this.canvas = canvas;
        this.duration = duration; // duration in seconds
        this.ctx = this.canvas.getContext('2d');
        this.fineGridSize = this.canvas.width / (25 * duration); // 25 finer boxes per second
        this.boldGridSize = this.canvas.width / (5 * duration); // 5 bold boxes per second
        this.pixelsPerSecond = this.canvas.width / duration;
    }

    plotWaveform(waveform, options = {}) {
        // Clear existing drawings
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Plot the waveform data
        const data = waveform.generateSnapshot(this.duration);
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.scaleY(data[0].value));
        for (let i = 1; i < data.length; i++) {
            this.ctx.lineTo(this.scaleX(data[i].time), this.scaleY(data[i].value));
        }
        this.ctx.strokeStyle = options.color || "black";
        this.ctx.lineWidth = options.lineWidth || 2;
        this.ctx.stroke();

        // Draw the grid on top if drawGrid is true or not specified (default to true)
        if (options.drawGrid !== false) {
            this.drawGrid();
        }
    }
    
    
    monitorWaveform(waveform, options = {}) {
        // Clear existing drawings
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        var data = waveform.generateSnapshot(this.duration);
        
        let n = 0; // Don't forget to initialize n

        let self = this; // Store the reference to 'this' here
        self.options = options

        drawMonitorWaveform();

        function drawMonitorWaveform() {
            setTimeout(() => {
                // Drawing code
                n += 1;
                if (n >= data.length-1) {
                    n = 1;
                }
                self.ctx.beginPath();
                
                self.ctx.moveTo(self.scaleX(data[n-1].time), self.scaleY(data[n-1].value));
                self.ctx.lineTo(self.scaleX(data[n].time), self.scaleY(data[n].value));
                
                self.ctx.strokeStyle = options.color || "black";
                self.ctx.lineWidth = options.lineWidth || 2;
                
                self.ctx.stroke();

                self.ctx.clearRect(self.scaleX(data[n+1].time), 0, 10, self.canvas.height);
                

                // Call the function again
                drawMonitorWaveform();
            }, 1000 / waveform.frequency);  // 1ms
        }
    }

    
    scaleX(time) {
        // Determine the x-coordinate for a given time
        return time * this.pixelsPerSecond;
    }

    scaleY(value) {
        const [yMin, yMax] = [100, 200];
        return (1 - (value - yMin) / (yMax - yMin)) * this.canvas.height;
    }
    
    inverseScaleY(pixelY) {
        const [yMin, yMax] = [100, 200];
        return yMin + (yMax - yMin) * (1 - pixelY / this.canvas.height);
    }

    drawGrid() {
        // Drawing vertical lines
        for (let x = 0; x <= this.canvas.width; x += this.fineGridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            if (almostEqual(x % this.boldGridSize, 0)) {
                this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
                this.ctx.fillStyle = 'black';
                if (almostEqual(x % this.pixelsPerSecond, 0) && x !== 0) {
                    const secondValue = x / this.pixelsPerSecond;
                    this.ctx.fillText(secondValue.toFixed(0), x, this.canvas.height - 1);
                }
            } else {
                this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
            }
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }

        // Drawing horizontal lines
        for (let y = 0; y <= this.canvas.height; y += this.fineGridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            
            if (almostEqual(y % this.boldGridSize, 0) && y !== 0) {
                this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
                this.ctx.fillStyle = 'black';
                const yValue = this.inverseScaleY(y);
                this.ctx.fillText(yValue.toFixed(1), 2, y - 2); // Display the yValue to the left of the bold grid line
            } else {
                this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
            }
            
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    }
    
    
}
