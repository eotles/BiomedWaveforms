/**
 * ekgUtils.js
 * Copyright (2023)
 *
 * Functionality for generating a simulated EKG waveform.
 *
 * @summary Short description for the file
 * @author erkin ötleş <ehi@eotles.com>
 *
 * Created at: 2023-10-23
 * Last modified  : 2018-12-10
 */

export function generateEKGWaveform(options = {}) {
    const baseline = options.baseline || 150;

    const P_WAVE_HEIGHT = options.pWaveHeight || -10;
    const Q_WAVE_HEIGHT = options.qWaveHeight || 10;
    const R_WAVE_HEIGHT = options.rWaveHeight || -40;
    const S_WAVE_HEIGHT = options.sWaveHeight || 10;
    const T_WAVE_HEIGHT = options.tWaveHeight || -20;

    const PR_INTERVAL = options.prInterval || 60; // duration before P wave
    const PQ_DURATION = options.pqDuration || 5;  // P-Q segment length
    const QRS_DURATION = options.qrsDuration || 15; // total QRS complex duration
    const ST_INTERVAL = options.stInterval || 30;  // duration after S wave before T wave
    const T_WAVE_DURATION = options.tWaveDuration || 10; // duration of T wave

    const data = [];
    for (let i = 0; i < 250; i++) {
        if (i >= PR_INTERVAL && i < PR_INTERVAL + PQ_DURATION) {
            data.push(baseline + P_WAVE_HEIGHT);
        } else if (i === PR_INTERVAL + PQ_DURATION) {
            data.push(baseline + Q_WAVE_HEIGHT);
        } else if (i > PR_INTERVAL + PQ_DURATION && i <= PR_INTERVAL + PQ_DURATION + QRS_DURATION/2) {
            data.push(baseline + R_WAVE_HEIGHT);
        } else if (i > PR_INTERVAL + PQ_DURATION + QRS_DURATION/2 && i < PR_INTERVAL + PQ_DURATION + QRS_DURATION) {
            data.push(baseline + S_WAVE_HEIGHT);
        } else if (i >= PR_INTERVAL + PQ_DURATION + QRS_DURATION + ST_INTERVAL && i < PR_INTERVAL + PQ_DURATION + QRS_DURATION + ST_INTERVAL + T_WAVE_DURATION) {
            data.push(baseline + T_WAVE_HEIGHT);
        } else {
            data.push(baseline);
        }
    }
    return data;
}
