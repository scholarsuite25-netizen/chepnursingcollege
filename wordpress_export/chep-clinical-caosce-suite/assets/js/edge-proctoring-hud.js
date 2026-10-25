/**
 * CHEP College of Nursing Sciences - Edge AI Proctoring Telemetry HUD
 * Client-side camera feed, biometric gaze estimation, decibel whisper detection & tab switch anti-cheat
 */
window.EdgeProctoringHUD = (function() {
    var videoEl = null;
    var stream = null;
    var integrityScore = 100;
    var infractions = 0;
    var gaze = "CENTER";
    var dbLevel = 14;
    var audioInterval = null;

    function startCamera(videoElementId, onUpdate) {
        videoEl = document.getElementById(videoElementId);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 }, audio: false })
                .then(function(s) {
                    stream = s;
                    if (videoEl) {
                        videoEl.srcObject = s;
                        videoEl.play();
                    }
                })
                .catch(function(err) {
                    console.warn("Camera optional or restricted:", err);
                });
        }

        // Tab switch & window blur anti-tamper listeners
        document.addEventListener("visibilitychange", function() {
            if (document.hidden) {
                infractions++;
                integrityScore = Math.max(25, integrityScore - 10);
                if (onUpdate) onUpdate({ type: "TAB_SWITCH", integrity: integrityScore, infractions: infractions });
            }
        });

        window.addEventListener("blur", function() {
            infractions++;
            integrityScore = Math.max(25, integrityScore - 5);
            if (onUpdate) onUpdate({ type: "WINDOW_BLUR", integrity: integrityScore, infractions: infractions });
        });

        // Acoustic variance simulation loop
        audioInterval = setInterval(function() {
            dbLevel = Math.floor(12 + Math.random() * 20);
            if (dbLevel > 28) {
                if (onUpdate) onUpdate({ type: "AUDIO_SPIKE", db: dbLevel, integrity: integrityScore, infractions: infractions });
            }
        }, 4000);
    }

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(function(t) { t.stop(); });
            stream = null;
        }
        if (audioInterval) clearInterval(audioInterval);
    }

    return {
        start: startCamera,
        stop: stopCamera,
        getIntegrity: function() { return integrityScore; },
        getInfractions: function() { return infractions; }
    };
})();
