/**
 * defaultCapnographyMonitor.js
 * Copyright (c) 2023
 *
 * This script is responsible for creating and displaying a simulated capnography waveform with given capnography parameters on a canvas of a given canvasId.
 * It utilizes the CapnographyWaveform and WaveformPlotter classes from the BiomedWaveforms library to render the waveform on a canvas element.
 *
 * @summary script for simulating and displaying an capnography waveform
 * @author erkin ötleş <hi@eotles.com>
 *
 * Created at     : 2023-12-09
 * Last modified  : 2018-12-10
 */

import { CapnographyWaveform } from './capnographyWaveform.js';
import { WaveformPlotter } from './waveformPlotter.js';

export function DefaultCapnographyMonitor(capnographyParameters, canvasId = 'capnographyMonitor') {
    let canvas = document.getElementById(canvasId);

    // If the canvas doesn't exist, create it
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = canvasId;
        canvas.width = 500;
        canvas.height = 200;

        // Append the canvas to the body or a specific container
        document.body.appendChild(canvas);
    }
    
    const seconds = 10;
    const yMin = 0;
    const yMax = 50;

    const capnographyWaveform = new CapnographyWaveform({
        frequency: 250,
        ...capnographyParameters
    });

    const realtimePlotter = new WaveformPlotter(canvas, seconds, [yMin, yMax]);
    realtimePlotter.monitorWaveform(capnographyWaveform, {
        color: "black",
        lineWidth: 2
    });
}
