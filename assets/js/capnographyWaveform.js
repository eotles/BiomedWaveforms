/**
 * CapnographyWaveform.js
 * Copyright (2023)
 *
 * Functionality for generating a simulated capnography waveform.
 *
 * @summary Short description for the file
 * @author erkin ötleş <hi@eotles.com>
 *
 * Created at: 2023-10-23
 * Last modified  : 2018-12-10
 */

import { BiomedicalWaveform } from './biomedicalWaveforms.js';


export class CapnographyWaveform extends BiomedicalWaveform {
    constructor(options = {}) {
        const defaults = {
        frequency: 250,
        inspirationDuration: 1000,
        expiratoryUpstrokeDuration: 100,
        endExpiratoryCO2: 40,
        alveolarPlateauDuration: 1800,
        endAlveolarCO2: 45,
        inspiratoryDownstrokeDuration: 100,
        smoothTransitions: false,
        };
        
        const settings = Object.assign({}, defaults, options);
        
        super(settings.frequency);
        this.inspirationDuration = settings.inspirationDuration;
        this.expiratoryUpstrokeDuration = settings.expiratoryUpstrokeDuration;
        this.endExpiratoryCO2 = settings.endExpiratoryCO2;
        this.alveolarPlateauDuration = settings.alveolarPlateauDuration;
        this.endAlveolarCO2 = settings.endAlveolarCO2;
        this.inspiratoryDownstrokeDuration = settings.inspiratoryDownstrokeDuration;
        this.smoothTransitions = settings.smoothTransitions;
    }
    
    normalizePosition(time, cycleDuration) {
        return (time / cycleDuration)*1000;
    }
    
    
    generateDataPoint(time) {
        const cycleDuration = this.inspirationDuration + this.expiratoryUpstrokeDuration + this.alveolarPlateauDuration + this.inspiratoryDownstrokeDuration;
        
        const timeInMS = (time / this.frequency)*1000;
        const normalizedPosition = (timeInMS % cycleDuration)/cycleDuration;
        
        const inspiratoryEnd = this.inspirationDuration / cycleDuration;
        const expiratoryUpstrokeEnd =
        (this.inspirationDuration + this.expiratoryUpstrokeDuration) /
        cycleDuration;
        const alveolarPlateauEnd =
        (this.inspirationDuration +
         this.expiratoryUpstrokeDuration +
         this.alveolarPlateauDuration) /
        cycleDuration;
        
        if (normalizedPosition <= inspiratoryEnd) {
            return 0;
        } else if (normalizedPosition <= expiratoryUpstrokeEnd) {
            const positionInPhase =
            (normalizedPosition - inspiratoryEnd) /
            (expiratoryUpstrokeEnd - inspiratoryEnd);
            return this.smoothTransitions
            ? this.quadraticEaseIn(positionInPhase, 0, this.endExpiratoryCO2)
            : positionInPhase * this.endExpiratoryCO2;
        } else if (normalizedPosition <= alveolarPlateauEnd) {
            const positionInPhase =
            (normalizedPosition - expiratoryUpstrokeEnd) /
            (alveolarPlateauEnd - expiratoryUpstrokeEnd);
            return this.smoothTransitions
            ? this.quadraticEaseInOut(
                                      positionInPhase,
                                      this.endExpiratoryCO2,
                                      this.endAlveolarCO2 - this.endExpiratoryCO2
                                      )
            : this.endExpiratoryCO2 +
            positionInPhase * (this.endAlveolarCO2 - this.endExpiratoryCO2);
        } else {
            const positionInPhase =
            (normalizedPosition - alveolarPlateauEnd) /
            (1 - alveolarPlateauEnd);
            return this.smoothTransitions
            ? this.quadraticEaseOut(positionInPhase, this.endAlveolarCO2, -this.endAlveolarCO2)
            : this.endAlveolarCO2 - positionInPhase * this.endAlveolarCO2;
        }
    }
    
    quadraticEaseIn(t, b, c) {
        return c * (t /= 1) * t + b;
    }
    
    quadraticEaseOut(t, b, c) {
        return -c * (t /= 1) * (t - 2) + b;
    }
    
    quadraticEaseInOut(t, b, c) {
        if ((t /= 0.5) < 1) return (c / 2) * t * t + b;
            return (-c / 2) * (--t * (t - 2) - 1) + b;
    }

}
