import { EKGWaveform, WaveformPlotter } from '../assets/js/index.js';

const canvas = document.getElementById('wideQRSCanvas');
const seconds = 5;
const yMin = 149;
const yMax = 152;

const ekgWaveform = new EKGWaveform({
    frequency: 250,
    qDuration: 60,
    rDuration: 70,
    sDuration: 60,
});

const realtimePlotter = new WaveformPlotter(canvas, seconds, [yMin, yMax]);
realtimePlotter.monitorWaveform(ekgWaveform, {
    color: "red",
    lineWidth: 2
});
