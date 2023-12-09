/**
 * peaked-T-waves.js
 * Copyright (c) 2023
 *
 * This script is responsible for creating and displaying a simulated EKG waveform with a peaked T-waves.
 * It utilizes the EKGWaveform and WaveformPlotter classes from the BiomedWaveforms library to render the waveform
 * on a canvas element.
 *
 * @summary Script for simulating and displaying an EKG waveform with a wide QRS complex.
 * @author Erkin Otles
 *
 * Created at     : 2023-12-09
 * Last modified  : 2023-12-09
 */


import { EKGWaveform, WaveformPlotter } from '../assets/js/index.js';

const canvas = document.getElementById('EKGMonitor');
const seconds = 5;
const yMin = 149;
const yMax = 152;

const ekgWaveform = new EKGWaveform({
    frequency: 250,
    tWaveDuration: 100,
    tWaveMagnitude: 0.8
});

const realtimePlotter = new WaveformPlotter(canvas, seconds, [yMin, yMax]);
realtimePlotter.monitorWaveform(ekgWaveform, {
    color: "red",
    lineWidth: 2
});
