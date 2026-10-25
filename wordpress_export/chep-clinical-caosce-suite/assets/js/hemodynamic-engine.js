/**
 * CHEP College of Nursing Sciences - 60FPS Dynamic Hemodynamic Vector Oscilloscope Engine
 * Pure client-side canvas simulation with Web Audio pitch-shifted beeping & ACLS interventions
 */
window.HemodynamicEngine = (function() {
    var canvas, ctx;
    var animId = null;
    var sweepX = 0;
    var sweepSpeed = 2.4;
    var audioEnabled = false;
    var audioCtx = null;

    var state = {
        rhythm: "BRADYCARDIA",
        hr: 42,
        bpSystolic: 84,
        bpDiastolic: 52,
        spo2: 92,
        temperature: 36.8,
        label: "Symptomatic Sinus Bradycardia with Hypoperfusion"
    };

    function playBeep(freq) {
        if (!audioEnabled) return;
        try {
            if (!audioCtx) {
                var AudioContextClass = window.AudioContext || window.webkitAudioContext;
                audioCtx = new AudioContextClass();
            }
            if (audioCtx.state === 'suspended') audioCtx.resume();
            var osc = audioCtx.createOscillator();
            var gain = audioCtx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq || (600 + (state.spo2 * 4)), audioCtx.currentTime);
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 0.08);
        } catch (e) {}
    }

    function render() {
        if (!canvas || !ctx) return;
        var width = canvas.width;
        var height = canvas.height;

        var periodSamples = state.hr > 0 ? (60 / state.hr) * 60 : 300;
        var beatPhase = (sweepX % periodSamples) / periodSamples;
        var p = beatPhase;

        // Lead II ECG calculation
        var ecgY = height * 0.28;
        if (state.rhythm === "VFIB") {
            var n1 = Math.sin(sweepX * 0.18) * 18;
            var n2 = Math.cos(sweepX * 0.42) * 14;
            ecgY += n1 + n2;
        } else if (state.rhythm === "ASYSTOLE") {
            ecgY += (Math.random() - 0.5) * 1.5;
        } else {
            if (p >= 0.10 && p <= 0.18) {
                var pSub = (p - 0.14) / 0.04;
                ecgY -= Math.exp(-pSub * pSub * 4) * 12; // P wave
            } else if (p >= 0.24 && p <= 0.32) {
                var qrsSub = (p - 0.28) / 0.02;
                if (qrsSub < -0.4) ecgY += 4; // Q wave
                else if (qrsSub >= -0.4 && qrsSub <= 0.4) {
                    ecgY -= 75; // R spike
                    if (Math.abs(qrsSub) < 0.05) playBeep();
                } else ecgY += 14; // S dip
            } else if (p >= 0.45 && p <= 0.65) {
                var tSub = (p - 0.55) / 0.08;
                ecgY -= Math.exp(-tSub * tSub * 3.5) * 20; // T wave
            }
        }

        // Arterial Line ABP calculation
        var abpY = height * 0.68;
        if (state.rhythm !== "VFIB" && state.rhythm !== "ASYSTOLE") {
            if (p >= 0.28 && p <= 0.65) {
                var abpSub = (p - 0.38) / 0.12;
                var pulseHeight = (state.bpSystolic - state.bpDiastolic) * 0.5;
                abpY -= Math.exp(-abpSub * abpSub * 3.5) * pulseHeight;
                if (p >= 0.46 && p <= 0.52) {
                    abpY += 3.5; // Dicrotic notch
                }
            }
        }

        // SpO2 Plethysmograph
        var plethY = height * 0.90;
        if (state.rhythm !== "VFIB" && state.rhythm !== "ASYSTOLE") {
            if (p >= 0.35 && p <= 0.75) {
                var plethSub = (p - 0.50) / 0.16;
                plethY -= Math.exp(-plethSub * plethSub * 3.0) * 16 * (state.spo2 / 100);
            }
        }

        // Clear beam front
        ctx.fillStyle = "#020617";
        ctx.fillRect(sweepX, 0, 16, height);

        // Grid sweep
        ctx.strokeStyle = "rgba(16, 185, 129, 0.08)";
        ctx.lineWidth = 1;
        for (var y = 0; y < height; y += 20) {
            ctx.beginPath();
            ctx.moveTo(sweepX, y);
            ctx.lineTo(sweepX + sweepSpeed, y);
            ctx.stroke();
        }

        // Draw ECG (Green)
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 2.2;
        ctx.shadowColor = "#34d399";
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.moveTo(sweepX, ecgY);
        ctx.lineTo(sweepX + sweepSpeed, ecgY);
        ctx.stroke();

        // Draw ABP (Rose/Red)
        ctx.strokeStyle = "#f43f5e";
        ctx.lineWidth = 1.8;
        ctx.shadowColor = "#fb7185";
        ctx.shadowBlur = 3;
        ctx.beginPath();
        ctx.moveTo(sweepX, abpY);
        ctx.lineTo(sweepX + sweepSpeed, abpY);
        ctx.stroke();

        // Draw Pleth (Cyan)
        ctx.strokeStyle = "#06b6d4";
        ctx.lineWidth = 1.6;
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 3;
        ctx.beginPath();
        ctx.moveTo(sweepX, plethY);
        ctx.lineTo(sweepX + sweepSpeed, plethY);
        ctx.stroke();

        ctx.shadowBlur = 0;

        sweepX += sweepSpeed;
        if (sweepX >= width) sweepX = 0;

        animId = requestAnimationFrame(render);
    }

    return {
        init: function(canvasId) {
            canvas = document.getElementById(canvasId);
            if (!canvas) return;
            ctx = canvas.getContext("2d");
            if (animId) cancelAnimationFrame(animId);
            sweepX = 0;
            animId = requestAnimationFrame(render);
        },
        toggleAudio: function() {
            audioEnabled = !audioEnabled;
            return audioEnabled;
        },
        getState: function() {
            return state;
        },
        giveAtropine: function() {
            state.rhythm = "NSR";
            state.hr = 88;
            state.bpSystolic = 122;
            state.bpDiastolic = 78;
            state.spo2 = 98;
            state.label = "Normal Sinus Rhythm Restored post-Atropine IV Push";
        },
        giveAdenosine: function() {
            state.rhythm = "ASYSTOLE";
            state.hr = 0;
            state.label = "Transient Asystolic Pause (Chemical Cardioversion in Progress)";
            setTimeout(function() {
                state.rhythm = "NSR";
                state.hr = 76;
                state.bpSystolic = 118;
                state.bpDiastolic = 76;
                state.spo2 = 99;
                state.label = "Normal Sinus Rhythm Restored (SVT Terminated)";
            }, 2400);
        },
        defibrillate: function() {
            state.rhythm = "NSR";
            state.hr = 92;
            state.bpSystolic = 110;
            state.bpDiastolic = 70;
            state.spo2 = 96;
            state.label = "Post-Shock ROSC Achieved";
        },
        giveSaline: function() {
            state.bpSystolic = Math.min(140, state.bpSystolic + 16);
            state.bpDiastolic = Math.min(90, state.bpDiastolic + 10);
            state.spo2 = Math.min(100, state.spo2 + 2);
        },
        triggerVFib: function() {
            state.rhythm = "VFIB";
            state.hr = 0;
            state.bpSystolic = 0;
            state.bpDiastolic = 0;
            state.spo2 = 60;
            state.label = "Ventricular Fibrillation • ZERO Cardiac Output • START CPR";
        }
    };
})();
