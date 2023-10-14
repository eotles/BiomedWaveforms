/**
 * biomedicalWaveform.js
 * Copyright (c) 2023
 *
 * functionality for describing waveforms
 *
 * @summary short description for the file
 * @author erkin <eotles@gmail.com>
 *
 * Created at     : 2023-10-14
 * Last modified  : 2018-10-14
 */

class BiomedicalWaveform {
    constructor(frequency = 1000) {
        this.frequency = frequency;
    }

    generateSnapshot(duration) {
        const dataPoints = [];
        const totalPoints = Math.round(duration * this.frequency);

        for (let i = 0; i < totalPoints; i++) {
            dataPoints.push({
                time: i / this.frequency, // this will give you time in seconds
                value: this.generateDataPoint(i)
            });
        }

        return dataPoints;
    }

    generateRealtimeWaveform() {
        return this.generateDataPoint(new Date().getTime() / 1000);
    }

    generateDataPoint(time) {
        const baseline = 150;
        const positionInSecond = time % this.frequency;
        
        if (positionInSecond >= 350 && positionInSecond < 500) {
            return baseline + 25;
        } else if (positionInSecond >= 500 && positionInSecond < 650) {
            return baseline - 25;
        } else if (positionInSecond >= 998 && positionInSecond < 999) {
            return baseline + 30;
        } else if (positionInSecond >= 999 && positionInSecond < 1000) {
            return baseline - 30;
        } else {
            return baseline;
        }
    }

}






/*
 class BiomedicalWaveform {
 constructor(plottingRange = [0, 300], frequency = 1000) {
 this.plottingRange = plottingRange;
 this.frequency = frequency;
 }
 
 scaleY(value, canvas) {
 const [yMin, yMax] = this.plottingRange;
 return (1 - (value - yMin) / (yMax - yMin)) * canvas.height;
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
 
 drawGrid(canvas, gridSize = 5, boldInterval = 25) {
 const ctx = canvas.getContext('2d');
 const pixelsPerSecond = boldInterval * this.frequency;
 
 for (let x = 0; x < canvas.width; x += gridSize) {
 ctx.beginPath();
 ctx.moveTo(x, 0);
 ctx.lineTo(x, canvas.height);
 ctx.strokeStyle = (x % boldInterval === 0) ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)';
 ctx.lineWidth = 1;
 ctx.stroke();
 
 // Add horizontal numbers in seconds
 if (x % pixelsPerSecond === 0) {
 const secondValue = x / pixelsPerSecond;
 ctx.fillStyle = 'black';
 ctx.fillText(secondValue.toString(), x, canvas.height - 5);
 }
 }
 
 for (let y = 0; y < canvas.height; y += gridSize) {
 ctx.beginPath();
 ctx.moveTo(0, y);
 ctx.lineTo(canvas.width, y);
 ctx.strokeStyle = (y % boldInterval === 0) ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)';
 ctx.lineWidth = 1;
 ctx.stroke();
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
 
 */
