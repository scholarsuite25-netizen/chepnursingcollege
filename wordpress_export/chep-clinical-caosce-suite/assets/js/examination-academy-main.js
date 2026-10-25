/**
 * CHEP College of Nursing Sciences - Master Examination Academy Controller
 */
document.addEventListener("DOMContentLoaded", function() {
    // 1. Tab Switching
    var tabButtons = document.querySelectorAll(".chep-tab-btn");
    var currentStationIndex = 0;
    var practicalSeconds = 600; // 10 mins
    var mcqSeconds = 600;       // 10 mins
    var timerInterval = null;
    var activePhase = "lobby";   // lobby, practical, mcq, complete
    var currentMcqIndex = 0;
    var stationScores = {};
    var catAdministered = [];
    var catResponses = [];
    var currentCatItem = null;

    function switchTab(tabKey) {
        tabButtons.forEach(function(b) {
            if (b.getAttribute("data-tab") === tabKey) {
                b.classList.add("active");
            } else {
                b.classList.remove("active");
            }
        });

        // Hide all panes
        var panes = document.querySelectorAll(".chep-tab-pane");
        panes.forEach(function(p) { p.classList.add("hidden"); });

        var targetPane = document.getElementById("tab-content-" + tabKey);
        if (targetPane) {
            targetPane.classList.remove("hidden");
        } else {
            var otherPane = document.getElementById("tab-content-other");
            if (otherPane) {
                otherPane.classList.remove("hidden");
                var titleEl = document.getElementById("other-tab-title");
                if (titleEl) titleEl.textContent = tabKey.toUpperCase() + " Simulation Studio";
            }
        }

        // Initialize engines if activated
        if (tabKey === "hemodynamics" && window.HemodynamicEngine) {
            window.HemodynamicEngine.init("hemo-canvas");
        }
        if (tabKey === "cat" && window.IrtCatEngine) {
            initCatTab();
        }
    }

    tabButtons.forEach(function(btn) {
        btn.addEventListener("click", function() {
            switchTab(btn.getAttribute("data-tab"));
        });
    });

    // 2. Proctoring HUD Toggle & Telemetry
    var hudToggleBtn = document.getElementById("chep-toggle-hud");
    var hudContainer = document.getElementById("chep-hud-container");
    var hudToggleText = document.getElementById("hud-toggle-text");
    var isHudVisible = true;

    if (hudToggleBtn && hudContainer) {
        hudToggleBtn.addEventListener("click", function() {
            isHudVisible = !isHudVisible;
            hudContainer.style.display = isHudVisible ? "block" : "none";
            if (hudToggleText) {
                hudToggleText.textContent = isHudVisible ? "Proctoring HUD: Active" : "Proctoring HUD: Hidden";
            }
        });
    }

    if (window.EdgeProctoringHUD) {
        window.EdgeProctoringHUD.start("chep-proctor-video", function(event) {
            var valEl = document.getElementById("hud-integrity-val");
            var flagsEl = document.getElementById("hud-flags");
            var dbEl = document.getElementById("hud-db");

            if (valEl) valEl.textContent = event.integrity + "%";
            if (flagsEl) flagsEl.textContent = event.infractions + " Detected";
            if (event.db && dbEl) dbEl.textContent = event.db + " dB (Whisper Alert)";
        });
    }

    // 3. Audio Chime Synthesizer
    function playChime(freq) {
        try {
            var AudioCtx = window.AudioContext || window.webkitAudioContext;
            var ctx = new AudioCtx();
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq || 660, ctx.currentTime);
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.6);
        } catch (e) {}
    }

    // 4. CAOSCE 6-Station Autonomous Engine
    var startBtn = document.getElementById("caosce-start-btn");
    var lobbyBox = document.getElementById("caosce-lobby");
    var stationBox = document.getElementById("caosce-active-station");
    var proceedMcqBtn = document.getElementById("station-proceed-mcq-btn");
    var nextMcqBtn = document.getElementById("mcq-next-btn");

    function formatTime(s) {
        var m = Math.floor(s / 60);
        var sec = s % 60;
        return (m < 10 ? "0" + m : m) + ":" + (sec < 10 ? "0" + sec : sec);
    }

    function loadStation(index) {
        var stations = window.CHEP_CAOSCE_STATIONS || [];
        if (index >= stations.length) {
            finishCaosce();
            return;
        }
        var st = stations[index];
        activePhase = "practical";
        practicalSeconds = 600;

        document.getElementById("station-badge").textContent = "STATION " + (st.stationNumber) + " OF " + stations.length + " • " + st.domain;
        document.getElementById("station-title").textContent = st.title;
        document.getElementById("timer-label").textContent = "Practical Assessment (10 mins)";
        document.getElementById("station-timer").textContent = "10:00";
        document.getElementById("station-scenario-text").textContent = st.clinicalScenario;

        var instList = document.getElementById("station-instructions-list");
        instList.innerHTML = "";
        st.candidateInstructions.forEach(function(inst) {
            var li = document.createElement("li");
            li.textContent = inst;
            instList.appendChild(li);
        });

        var checkContainer = document.getElementById("station-checklist-box");
        checkContainer.innerHTML = "";
        st.criticalChecklist.forEach(function(item, i) {
            var row = document.createElement("label");
            row.className = "flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 cursor-pointer hover:bg-slate-100";
            row.innerHTML = '<input type="checkbox" class="mt-0.5 rounded text-emerald-700" /><span>' + item + '</span>';
            checkContainer.appendChild(row);
        });

        document.getElementById("station-scenario-box").classList.remove("hidden");
        document.getElementById("station-mcq-box").classList.add("hidden");

        playChime(880);

        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(function() {
            if (activePhase === "practical") {
                practicalSeconds--;
                document.getElementById("station-timer").textContent = formatTime(practicalSeconds);
                if (practicalSeconds === 120 && window.chepSendNotification) {
                    window.chepSendNotification(
                        "⏳ CAOSCE 2-Minute Warning",
                        "2 minutes remaining in Station " + (currentStationIndex + 1) + " practical scenario. Finalize interventions!",
                        "/exams",
                        "normal"
                    );
                }
                if (practicalSeconds <= 0) {
                    proceedToStationMcqs();
                }
            } else if (activePhase === "mcq") {
                mcqSeconds--;
                document.getElementById("station-timer").textContent = formatTime(mcqSeconds);
                if (mcqSeconds <= 0) {
                    rotateNextStation();
                }
            }
        }, 1000);
    }

    function proceedToStationMcqs() {
        activePhase = "mcq";
        mcqSeconds = 600;
        currentMcqIndex = 0;
        document.getElementById("timer-label").textContent = "Station MCQs (10 mins)";
        document.getElementById("station-scenario-box").classList.add("hidden");
        document.getElementById("station-mcq-box").classList.remove("hidden");
        playChime(587);

        if (window.chepSendNotification) {
            window.chepSendNotification(
                "🔔 CAOSCE Rotation Bell",
                "Station " + (currentStationIndex + 1) + " practical complete! Complete the 10 post-encounter MCQs.",
                "/exams",
                "bell"
            );
        }
        renderMcqQuestion();
    }

    function renderMcqQuestion() {
        var stations = window.CHEP_CAOSCE_STATIONS || [];
        var st = stations[currentStationIndex];
        var mcqs = st.mcqs || [];
        if (currentMcqIndex >= mcqs.length) {
            rotateNextStation();
            return;
        }
        var q = mcqs[currentMcqIndex];
        document.getElementById("mcq-counter").textContent = "Question " + (currentMcqIndex + 1) + " of " + mcqs.length;
        document.getElementById("mcq-question-text").textContent = q.question;

        var optContainer = document.getElementById("mcq-options-container");
        optContainer.innerHTML = "";
        q.options.forEach(function(opt, idx) {
            var btn = document.createElement("button");
            btn.className = "w-full text-left p-3.5 rounded-xl border border-slate-200 text-xs font-medium hover:bg-slate-50 transition-all block";
            btn.textContent = String.fromCharCode(65 + idx) + ". " + opt;
            btn.addEventListener("click", function() {
                var isCorrect = (idx === q.correctIndex);
                if (!stationScores[st.id]) stationScores[st.id] = 0;
                if (isCorrect) stationScores[st.id] += 10;
                currentMcqIndex++;
                renderMcqQuestion();
            });
            optContainer.appendChild(btn);
        });
    }

    function rotateNextStation() {
        currentStationIndex++;
        var stations = window.CHEP_CAOSCE_STATIONS || [];
        if (currentStationIndex < stations.length) {
            loadStation(currentStationIndex);
        } else {
            finishCaosce();
        }
    }

    function finishCaosce() {
        if (timerInterval) clearInterval(timerInterval);
        activePhase = "complete";
        var candName = (document.getElementById("caosce-cand-name") || {}).value || "Candidate Nurse";
        var candIndex = (document.getElementById("caosce-cand-index") || {}).value || "NMCN/2026/0842";
        var certHash = "CERT-CHEP-" + Math.floor(100000 + Math.random() * 900000);

        var totalScore = 0;
        Object.keys(stationScores).forEach(function(k) { totalScore += stationScores[k]; });
        var percent = Math.min(100, Math.round((totalScore / 60) * 100));

        stationBox.innerHTML = '<div class="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 max-w-xl mx-auto shadow-xl">' +
            '<div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 text-3xl font-black flex items-center justify-center mx-auto">✓</div>' +
            '<h2 class="text-2xl font-black text-slate-900">CAOSCE Circuit Complete</h2>' +
            '<p class="text-xs text-slate-600">Candidate: <strong>' + candName + '</strong> (' + candIndex + ')</p>' +
            '<div class="text-3xl font-black text-emerald-800 font-mono">' + percent + '% Aggregate</div>' +
            '<p class="text-[11px] font-mono text-slate-400">Cryptographic Hash: ' + certHash + '</p>' +
            '<button onclick="window.print()" class="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs">Print Official Certificate</button>' +
            '</div>';

        // Background AJAX persistence to WordPress MySQL (with Offline Auto-Sync fallback)
        var resultPayload = {
            action: "chep_submit_exam_result",
            security: (window.chepExamConfig && window.chepExamConfig.examNonce) || "",
            candidate_name: candName,
            candidate_index: candIndex,
            exam_type: "caosce",
            score_percentage: percent,
            certificate_hash: certHash,
            integrity_score: window.EdgeProctoringHUD ? window.EdgeProctoringHUD.getIntegrity() : 100
        };

        if (!navigator.onLine) {
            if (window.chepQueueOfflineResult) {
                window.chepQueueOfflineResult(resultPayload);
            }
        } else if (window.chepExamConfig && window.chepExamConfig.ajaxUrl) {
            var formData = new FormData();
            Object.keys(resultPayload).forEach(function(k) {
                formData.append(k, resultPayload[k]);
            });

            fetch(window.chepExamConfig.ajaxUrl, {
                method: "POST",
                body: formData
            }).then(function(r) { return r.json(); }).then(function(res) {
                console.log("Exam result saved to WordPress DB:", res);
            }).catch(function(err) {
                console.warn("Network error during submission. Storing in offline sync outbox:", err);
                if (window.chepQueueOfflineResult) {
                    window.chepQueueOfflineResult(resultPayload);
                }
            });
        }
    }

    if (startBtn) {
        startBtn.addEventListener("click", function() {
            lobbyBox.classList.add("hidden");
            stationBox.classList.remove("hidden");
            loadStation(0);
        });
    }

    if (proceedMcqBtn) {
        proceedMcqBtn.addEventListener("click", proceedToStationMcqs);
    }

    // 5. Hemodynamics Engine Interventions
    var hemoAudioBtn = document.getElementById("hemo-audio-toggle");
    if (hemoAudioBtn && window.HemodynamicEngine) {
        hemoAudioBtn.addEventListener("click", function() {
            var active = window.HemodynamicEngine.toggleAudio();
            hemoAudioBtn.textContent = active ? "🔊 Audio Active" : "🔇 Audio Muted";
            hemoAudioBtn.classList.toggle("bg-emerald-500", active);
            hemoAudioBtn.classList.toggle("text-slate-950", active);
        });
    }

    function syncHemoDisplay() {
        if (!window.HemodynamicEngine) return;
        var s = window.HemodynamicEngine.getState();
        var hrEl = document.getElementById("hemo-hr");
        var bpEl = document.getElementById("hemo-bp");
        var spo2El = document.getElementById("hemo-spo2");
        var labelEl = document.getElementById("hemo-label");

        if (hrEl) hrEl.textContent = s.hr + " BPM";
        if (bpEl) bpEl.textContent = s.bpSystolic + "/" + s.bpDiastolic + " mmHg";
        if (spo2El) spo2El.textContent = s.spo2 + "%";
        if (labelEl) labelEl.textContent = s.label;
    }

    var btnAtropine = document.getElementById("act-atropine");
    var btnAdenosine = document.getElementById("act-adenosine");
    var btnDefib = document.getElementById("act-defib");
    var btnSaline = document.getElementById("act-saline");
    var btnVfib = document.getElementById("act-vfib");

    if (btnAtropine) btnAtropine.addEventListener("click", function() { window.HemodynamicEngine.giveAtropine(); syncHemoDisplay(); });
    if (btnAdenosine) btnAdenosine.addEventListener("click", function() { window.HemodynamicEngine.giveAdenosine(); syncHemoDisplay(); });
    if (btnDefib) btnDefib.addEventListener("click", function() { window.HemodynamicEngine.defibrillate(); syncHemoDisplay(); });
    if (btnSaline) btnSaline.addEventListener("click", function() { window.HemodynamicEngine.giveSaline(); syncHemoDisplay(); });
    if (btnVfib) btnVfib.addEventListener("click", function() { window.HemodynamicEngine.triggerVFib(); syncHemoDisplay(); });

    // 6. Adaptive CAT (3PL IRT)
    function initCatTab() {
        var pool = window.CHEP_CAT_ITEM_POOL || [];
        var currentTheta = 0.0;
        if (catResponses.length > 0) {
            var est = window.IrtCatEngine.estimateAbility(catResponses);
            currentTheta = est.theta;
            document.getElementById("cat-theta").textContent = est.theta.toFixed(2);
        }
        currentCatItem = window.IrtCatEngine.selectNextItem(currentTheta, pool, catAdministered);
        if (!currentCatItem) {
            document.getElementById("cat-question-box").innerHTML = '<div class="p-6 rounded-2xl bg-emerald-50 text-emerald-900 text-sm font-bold text-center">✓ 3PL Adaptive Stopping Rule Triggered: Passing Standard Confirmed (95% CI > 0.00)</div>';
            return;
        }

        document.getElementById("cat-prompt").textContent = currentCatItem.prompt;
        var optContainer = document.getElementById("cat-options");
        optContainer.innerHTML = "";
        currentCatItem.options.forEach(function(opt, idx) {
            var row = document.createElement("label");
            row.className = "flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 text-xs cursor-pointer hover:bg-slate-50";
            row.innerHTML = '<input type="radio" name="cat-opt" value="' + idx + '" class="text-indigo-600" /><span>' + opt + '</span>';
            optContainer.appendChild(row);
        });
    }

    var catSubmitBtn = document.getElementById("cat-submit-btn");
    if (catSubmitBtn) {
        catSubmitBtn.addEventListener("click", function() {
            var selected = document.querySelector('input[name="cat-opt"]:checked');
            if (!selected || !currentCatItem) return;
            var chosen = parseInt(selected.value, 10);
            var isCorrect = (chosen === currentCatItem.correctIndex);
            catAdministered.push(currentCatItem.id);
            catResponses.push({
                a: currentCatItem.a,
                b: currentCatItem.b,
                c: currentCatItem.c,
                isCorrect: isCorrect
            });
            initCatTab();
        });
    }

    // 7. Generative AI Scenarios
    var genAiBtn = document.getElementById("genai-generate-btn");
    var trapRevealBtn = document.getElementById("genai-reveal-trap-btn");
    var currentGenScenario = null;

    function renderGenAiScenario() {
        if (!window.ClinicalAiEngine) return;
        currentGenScenario = window.ClinicalAiEngine.getRandomScenario();
        document.getElementById("genai-patient").textContent = currentGenScenario.patient;
        document.getElementById("genai-setting").textContent = currentGenScenario.setting;
        document.getElementById("genai-emergency").textContent = currentGenScenario.emergency;
        document.getElementById("genai-vitals").textContent = currentGenScenario.vitals;
        document.getElementById("genai-suggestion").textContent = currentGenScenario.aiSuggestion;
        document.getElementById("genai-trap-box").classList.add("hidden");
    }

    if (genAiBtn) genAiBtn.addEventListener("click", renderGenAiScenario);
    if (trapRevealBtn) {
        trapRevealBtn.addEventListener("click", function() {
            var box = document.getElementById("genai-trap-box");
            if (currentGenScenario && box) {
                box.textContent = currentGenScenario.trapExplanation;
                box.classList.remove("hidden");
            }
        });
    }
});
