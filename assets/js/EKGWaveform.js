/**
 * EKGWaveform.js
 * Copyright (c) 2023
 *
 * functionality for generating a simulated EKG waveform
 *
 * @summary short description for the file
 * @author erkin <eotles@gmail.com>
 *
 * Created at     : 2023-10-23
 * Last modified  : 2018-12-09
 */

import { BiomedicalWaveform } from './biomedicalWaveforms.js';

export class EKGWaveform extends BiomedicalWaveform {
    constructor(options = {}) {
        const defaults = {
        frequency: 250,
        pWaveDuration: 80,
        pWaveMagnitude: 0.25,
        qDuration: 30,
        qMagnitude: -0.1,
        rDuration: 35,
        rMagnitude: 1.2,
        sDuration: 30,
        sMagnitude: -0.2,
        tWaveDuration: 160,
        tWaveMagnitude: 0.3,
        prInterval: 120,
        prSegmentElevation: 0,
        qtInterval: 360,
        stSegmentElevation: 0,
        };
        
        const settings = Object.assign({}, defaults, options);
        
        super(settings.frequency);
        this.pWaveDuration = settings.pWaveDuration;
        this.pWaveMagnitude = settings.pWaveMagnitude;
        this.qDuration = settings.qDuration;
        this.qMagnitude = settings.qMagnitude;
        this.rDuration = settings.rDuration;
        this.rMagnitude = settings.rMagnitude;
        this.sDuration = settings.sDuration;
        this.sMagnitude = settings.sMagnitude;
        this.tWaveDuration = settings.tWaveDuration;
        this.tWaveMagnitude = settings.tWaveMagnitude;
        this.prInterval = settings.prInterval;
        this.prSegmentElevation = settings.prSegmentElevation;
        this.qtInterval = settings.qtInterval;
        this.stSegmentElevation = settings.stSegmentElevation;
    }
    
    
    normalizePosition(time) {
        return (time / this.frequency) * 1000; // normalize to a 1000ms cycle
    }
    
    generateDataPoint(time) {
        const baseline = 150;
        const positionInCycle = time % this.frequency;
        //const normalizedPosition = (positionInCycle / this.frequency) * 1000; // normalize to a 1000ms cycle
        const normalizedPosition = this.normalizePosition(positionInCycle);
        
        
        const pWaveEnd = this.pWaveDuration;
        
        const prSegmentStart = this.pWaveEnd;
        const prSegmentEnd = this.prInterval;
        
        const qrsStart = this.prInterval;
        const qExtremaTime = qrsStart + this.qDuration/2;
        const rExtremaTime = qrsStart + this.qDuration + this.rDuration/2;
        const sExtremaTime = qrsStart + this.qDuration + this.rDuration + this.sDuration/2;
        const qrsEnd = qrsStart + this.qDuration + this.rDuration + this.sDuration;
        
        const qSlope = (this.qMagnitude - this.prSegmentElevation) / (this.qDuration/2);
        const qrSlope = (this.rMagnitude - this.qMagnitude) / (this.qDuration/2 + this.rDuration/2);
        const rsSlope = (this.sMagnitude - this.rMagnitude) / (this.rDuration/2 + this.sDuration/2);
        const sSlope = (this.stSegmentElevation - this.sMagnitude) / (this.sDuration/2);
        
        const tWaveStart = qrsEnd + (this.qtInterval - this.tWaveDuration);
        const tWaveEnd = tWaveStart + this.tWaveDuration;
        
        const stSegmentStart = qrsEnd;
        const stSegmentEnd = tWaveStart;
        
        // P wave
        if (normalizedPosition >= 0 && normalizedPosition < pWaveEnd) {
            const positionInP = normalizedPosition;
            return baseline + Math.sin((positionInP / this.pWaveDuration) * Math.PI) * this.pWaveMagnitude + this.prSegmentElevation;
        }
        // PR segment
        else if (normalizedPosition >= prSegmentStart && normalizedPosition < prSegmentEnd) {
            return baseline + this.prSegmentElevation;
        }
        // QRS complex
        else if (normalizedPosition >= qrsStart && normalizedPosition < qrsEnd) {
            if (normalizedPosition < qExtremaTime) {
                const positionInQ = normalizedPosition - qrsStart;
                return baseline + this.prSegmentElevation + (qSlope*positionInQ);
            }
            else if (normalizedPosition < rExtremaTime) {
                const positionInQR = normalizedPosition - qExtremaTime;
                return baseline + this.qMagnitude + (qrSlope*positionInQR);
            }
            else if (normalizedPosition < sExtremaTime) {
                const positionInRS = normalizedPosition - rExtremaTime;
                return baseline + this.rMagnitude + (rsSlope*positionInRS);
            }
            else {
                const positionInS = normalizedPosition - sExtremaTime;
                return baseline + this.sMagnitude + (sSlope*positionInS);
            }
        }
        // ST segment
        else if (normalizedPosition >= stSegmentStart && normalizedPosition < stSegmentEnd) {
            return baseline + this.stSegmentElevation;
        }
        // T wave
        else if (normalizedPosition >= tWaveStart && normalizedPosition < tWaveEnd) {
            const positionInT = normalizedPosition - tWaveStart;
            return baseline + Math.sin((positionInT / this.tWaveDuration) * Math.PI) * this.tWaveMagnitude + this.stSegmentElevation;
        }
        // Baseline
        else {
            return baseline;
        }
    }
}
