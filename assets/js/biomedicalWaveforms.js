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
 * Last modified  : 2018-12-09
 */

export class BiomedicalWaveform {
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


export class CustomFrequencyWaveform extends BiomedicalWaveform {
    constructor(frequency = 1000) {
        const validFrequency = Math.min(Math.max(frequency, 10), 1000);
        super(validFrequency);
    }

    generateDataPoint(time) {
        const baseline = 150;
        const positionInCycle = time % this.frequency;
        const normalizedPosition = (positionInCycle / this.frequency) * 1000; // normalize to a 1000ms cycle
        
        if (normalizedPosition >= 350 && normalizedPosition < 500) {
            return baseline + 25;
        } else if (normalizedPosition >= 500 && normalizedPosition < 650) {
            return baseline - 25;
        } else if (normalizedPosition >= 998 && normalizedPosition < 999) {
            return baseline + 30;
        } else if (normalizedPosition >= 999 && normalizedPosition < 1000) {
            return baseline - 30;
        } else {
            return baseline;
        }
    }
}
