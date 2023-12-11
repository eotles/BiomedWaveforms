# BiomedWaveforms
Web software for visualizing various biomedical waveforms, like EKGs.

You can generate a new waveform by calling a couple of lines of JavaScript.
For example, here's how you can use it to simulate an EKG with a wide QRS complex:
```
<html lang="en">
    <body>
        <canvas id="wideQRSEKGMonitor" width="400" height="160"></canvas>

        <script type="module">
            import { DefaultEKGMonitor } from 'https://cdn.jsdelivr.net/gh/eotles/BiomedWaveforms@main/assets/js/index.js';

            DefaultEKGMonitor( 
                {qDuration: 60, rDuration: 70, sDuration: 60}, 
                'wideQRSEKGMonitor'
            );
        </script> 
    </body>
</html>
```
This is actually the code used to generate the wide QRS example from above.
It's an HTML wrapper around a very short javascript module.

I'm not very good a javascript, or web development (I actually hate it).
So, let's walk through the javascript piece by piece.

First, we need to set up the place we are going to draw the EKG.
```
<canvas id="wideQRSEKGMonitor" width="400" height="160"></canvas>
```
This makes an empty HTML canvas named ```wideQRSEKGMonitor``` (what a gorgeous variable name).

Second, we need to get the ```BiomedWaveforms``` code.
Let's use the JSDeliv approach as its easier than having to download my code and re-serve it with this code.
```
import { DefaultEKGMonitor } from 'https://cdn.jsdelivr.net/gh/eotles/BiomedWaveforms@main/assets/js/index.js';
```
This imports the ```BiomedWaveforms``` javascript codebase from JSDeliv, simple (although, it took me several attempts to get correct).

Third, we draw the EKG using parameters.
```
DefaultEKGMonitor( 
    {qDuration: 60, rDuration: 70, sDuration: 60}, 
    'wideQRSEKGMonitor'
);
```
The ```DefaultEKGMonitor``` is a helper function that does a bunch of stuff for you.
It generates the EKG waveform using the parameters defined inside the curly brackets:```{qDuration: 60, rDuration: 70, sDuration: 60}``` (this give us our QRS wwiiddeenneess).
And it plots the EKG waveform to the ```wideQRSEKGMonitor``` canvas we defined above.

That's it.
You should be able to copy-paste that code into a blank file named ```whateveryouwant.html``` and your browser *should* be able to plot a wide QRS EKG for you.
