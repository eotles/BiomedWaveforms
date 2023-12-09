/**
 * wide-QRS-complex.js
 * Copyright (c) 2023
 *
 * This script is responsible for creating and displaying a simulated EKG waveform with a wide QRS complex.
 * It utilizes the DefaultEKGMonitor classe from the BiomedWaveforms library to render the waveform on a canvas element.
 *
 * @summary Script for simulating and displaying an EKG waveform with a wide QRS complex.
 * @author Erkin Otles
 *
 * Created at     : 2023-12-09
 * Last modified  : 2023-12-09
 */


import { DefaultEKGMonitor } from '../assets/js/index.js';

DefaultEKGMonitor({
    prInterval: 250,
});
