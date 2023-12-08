# BiomedWaveforms
Web software for visualizing various biomedical waveforms, like EKGs

```
<canvas id="peakedTWavesCanvas" width="500" height="200"></canvas>

<script src="https://raw.githubusercontent.com/eotles/BiomedWaveforms/main/assets/js/EKGWaveform.js"></script>
<script src="https://raw.githubusercontent.com/eotles/BiomedWaveforms/main/assets/js/waveformPlotter.js"></script>

<script>
    const canvas = document.getElementById('peakedTWavesCanvas');
    
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
</script>
```


<html lang="en">
    <head>
        <title>Example BiomedWavform Usage</title>
    </head>
    <body>
        <h2>Peaked T-Waves EKG</h2>
        <canvas id="peakedTWavesCanvas" width="500" height="200"></canvas>
        
        <script src="https://raw.githubusercontent.com/eotles/BiomedWaveforms/main/assets/js/EKGWaveform.js"></script>
        <script src="https://raw.githubusercontent.com/eotles/BiomedWaveforms/main/assets/js/waveformPlotter.js"></script>
        
        <script>
        
            const canvas = document.getElementById('peakedTWavesCanvas');
            
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
            
        </script>
        

    </body>
<html>
