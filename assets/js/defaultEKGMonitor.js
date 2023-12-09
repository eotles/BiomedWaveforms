/**
 * defaultEKGMonitor.js
 * Copyright (c) 2023
 *
 * This script is responsible for creating and displaying a simulated EKG wavefomr with given EKG parameters on a canvas of a given canvasId.
 * It utilizes the EKGWaveform and WaveformPlotter classes from the BiomedWaveforms library to render the waveform on a canvas element.
 *
 * @summary cript for simulating and displaying an EKG waveform
 * @author erkin <eotles@gmail.com>
 *
 * Created at     : 2023-12-09
 * Last modified  : 2018-12-09
 */

import { EKGWaveform } from './EKGWaveform.js';
import { WaveformPlotter } from './waveformPlotter.js';

export function DefaultEKGMonitor(EKGParameters, canvasId = 'EKGMonitor') {
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
    
    const seconds = 5;
    const yMin = 149;
    const yMax = 152;

    const ekgWaveform = new EKGWaveform({
        frequency: 250,
        ...EKGParameters
    });

    const realtimePlotter = new WaveformPlotter(canvas, seconds, [yMin, yMax]);
    realtimePlotter.monitorWaveform(ekgWaveform, {
        color: "red",
        lineWidth: 2
    });
}
