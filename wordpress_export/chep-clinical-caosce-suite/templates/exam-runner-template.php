<?php
/**
 * Template for CHEP Clinical Examination & Simulation Academy
 */
get_header();
?>

<div class="chep-exam-wrap min-h-screen bg-slate-50 pt-28 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <!-- Authority Header -->
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
            <div>
                <span class="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    NMCN Standardized Competency Evaluation Node
                </span>
                <h1 class="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    Clinical Examination &amp; Simulation Academy
                </h1>
            </div>

            <!-- Proctoring HUD Toggle -->
            <button id="chep-toggle-hud" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 transition-all flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow"></span>
                <span id="hud-toggle-text">Proctoring HUD: Active</span>
            </button>
        </div>

        <!-- Biometric Proctoring HUD Overlay -->
        <div id="chep-hud-container" class="chep-proctor-hud mb-8">
            <div class="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-900/60 pb-3 mb-4">
                <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-slow"></span>
                    <strong class="text-xs font-mono tracking-widest text-indigo-300 uppercase">Edge AI Proctoring Telemetry • Active Stream</strong>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-xs font-mono text-slate-400">Integrity Score:</span>
                    <strong class="text-sm font-mono text-emerald-400" id="hud-integrity-val">100%</strong>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div class="md:col-span-4 bg-slate-950 rounded-2xl p-2 border border-indigo-950 flex flex-col items-center justify-center">
                    <video id="chep-proctor-video" autoplay playsinline muted class="w-full h-40 object-cover rounded-xl bg-slate-900"></video>
                    <span class="text-[10px] text-slate-400 mt-1 font-mono">Biometric Eye Tracking • WebRTC</span>
                </div>

                <div class="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                        <span class="text-slate-400 block text-[10px] uppercase font-bold">Gaze Direction</span>
                        <strong class="text-emerald-400 font-mono text-sm" id="hud-gaze">CENTER</strong>
                    </div>
                    <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                        <span class="text-slate-400 block text-[10px] uppercase font-bold">Whisper Sensor</span>
                        <strong class="text-cyan-400 font-mono text-sm" id="hud-db">14 dB (Normal)</strong>
                    </div>
                    <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                        <span class="text-slate-400 block text-[10px] uppercase font-bold">Infraction Flags</span>
                        <strong class="text-rose-400 font-mono text-sm" id="hud-flags">0 Detected</strong>
                    </div>
                </div>
            </div>
        </div>

        <!-- Master 13 Modality Tab Bar -->
        <div class="flex items-center gap-2 overflow-x-auto pb-3 mb-8">
            <button class="chep-tab-btn active" data-tab="caosce">1. CAOSCE 6-Station</button>
            <button class="chep-tab-btn" data-tab="hemodynamics">2. Live Hemodynamics</button>
            <button class="chep-tab-btn" data-tab="cat">3. Adaptive CAT (3PL IRT)</button>
            <button class="chep-tab-btn" data-tab="genai">4. Generative Clinical AI</button>
            <button class="chep-tab-btn" data-tab="ospe">5. OSPE Data Studio</button>
            <button class="chep-tab-btn" data-tab="dosage">6. Dosage Math</button>
            <button class="chep-tab-btn" data-tab="partograph">7. WHO Partograph</button>
            <button class="chep-tab-btn" data-tab="triage">8. Disaster Triage</button>
            <button class="chep-tab-btn" data-tab="ngn">9. Next-Gen NCLEX (NGN)</button>
            <button class="chep-tab-btn" data-tab="ncp">10. Nursing Care Plan</button>
            <button class="chep-tab-btn" data-tab="preceptor">11. AI Preceptor</button>
            <button class="chep-tab-btn" data-tab="cbt">12. General CBT</button>
            <button class="chep-tab-btn" data-tab="essays">13. Essay Bank</button>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 1: 100% AUTONOMOUS 6-STATION CAOSCE                                   -->
        <!-- ========================================================================= -->
        <div id="tab-content-caosce" class="chep-tab-pane">
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 max-w-4xl mx-auto" id="caosce-lobby">
                <div class="text-center max-w-2xl mx-auto">
                    <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                        NMCN Standardized Circuit
                    </span>
                    <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                        6-Station Clinical Examination Circuit
                    </h2>
                    <p class="text-slate-600 text-sm mt-3 leading-relaxed">
                        Autonomous, online clinical assessment circuit. Exactly <strong>10 minutes</strong> per practical station, immediately followed by <strong>10 corresponding MCQs</strong> (10 minutes) before rotating to the next station.
                    </p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left my-8">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">Candidate Full Name *</label>
                            <input type="text" id="caosce-cand-name" value="Candidate Nurse" class="w-full text-xs p-3 rounded-xl border border-slate-300 font-semibold" />
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">NMCN Candidate Index Number *</label>
                            <input type="text" id="caosce-cand-index" value="NMCN/2026/0842" class="w-full text-xs p-3 rounded-xl border border-slate-300 font-mono font-bold" />
                        </div>
                    </div>

                    <button id="caosce-start-btn" class="w-full py-4 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-900/20">
                        Begin 6-Station CAOSCE Circuit →
                    </button>
                </div>
            </div>

            <!-- Active Station Container -->
            <div id="caosce-active-station" class="hidden space-y-6">
                <!-- Station Timer Header -->
                <div class="bg-slate-900 text-white rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 border border-slate-800">
                    <div>
                        <span class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold" id="station-badge">STATION 1 OF 6</span>
                        <h2 class="text-lg font-black text-white mt-1" id="station-title">Loading Station...</h2>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="text-right">
                            <span class="text-[10px] font-mono text-slate-400 block uppercase" id="timer-label">Practical Phase</span>
                            <span class="text-2xl font-black font-mono text-amber-400" id="station-timer">10:00</span>
                        </div>
                    </div>
                </div>

                <!-- Scenario Card -->
                <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm" id="station-scenario-box">
                    <h3 class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Clinical Scenario:</h3>
                    <p class="text-sm text-slate-800 leading-relaxed font-medium" id="station-scenario-text"></p>

                    <h3 class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mt-6 mb-2">Candidate Action Instructions:</h3>
                    <ul class="space-y-1.5 text-xs text-slate-700" id="station-instructions-list"></ul>

                    <h3 class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mt-6 mb-2">Objective Clinical Checklist:</h3>
                    <div class="space-y-2" id="station-checklist-box"></div>

                    <div class="pt-6 mt-6 border-t border-slate-100 flex justify-end">
                        <button id="station-proceed-mcq-btn" class="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider">
                            Proceed to Station MCQs →
                        </button>
                    </div>
                </div>

                <!-- Station MCQ Box -->
                <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hidden" id="station-mcq-box">
                    <h3 class="text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-4" id="mcq-counter">Question 1 of 10</h3>
                    <h4 class="text-base font-bold text-slate-900 mb-4" id="mcq-question-text"></h4>
                    <div class="space-y-2 mb-6" id="mcq-options-container"></div>
                    <div class="flex justify-between items-center pt-4 border-t border-slate-100">
                        <span class="text-xs text-slate-400" id="mcq-score-preview"></span>
                        <button id="mcq-next-btn" class="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold">
                            Next Question →
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 2: 60FPS HEMODYNAMICS VECTOR OSCILLOSCOPE                             -->
        <!-- ========================================================================= -->
        <div id="tab-content-hemodynamics" class="chep-tab-pane hidden">
            <div class="bg-slate-950 text-white rounded-3xl p-6 border-2 border-emerald-500/30 shadow-2xl space-y-5">
                <div class="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-900/60 pb-4">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-slow"></span>
                            <span class="text-xs font-mono font-black text-emerald-400 uppercase tracking-widest">
                                Intensive Care Vector Telemetry • 60 FPS Sweep Engine
                            </span>
                        </div>
                        <h3 class="text-lg font-black text-white mt-1" id="hemo-label">Symptomatic Sinus Bradycardia</h3>
                    </div>

                    <button id="hemo-audio-toggle" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
                        🔇 Audio Muted
                    </button>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    <div class="lg:col-span-9 bg-slate-950 rounded-2xl border border-emerald-900/50 p-2 relative">
                        <canvas id="hemo-canvas" width="720" height="260" class="chep-scope-canvas"></canvas>
                        <div class="absolute top-3 left-4 text-[10px] font-mono text-emerald-400/80 font-bold">LEAD II • ECG (mV)</div>
                        <div class="absolute top-[48%] left-4 text-[10px] font-mono text-rose-400/80 font-bold">ART LINE (mmHg) • DICROTIC NOTCH</div>
                        <div class="absolute bottom-3 left-4 text-[10px] font-mono text-cyan-400/80 font-bold">PLETH • SpO2 %</div>
                    </div>

                    <div class="lg:col-span-3 space-y-2 text-xs">
                        <div class="p-3 rounded-2xl bg-slate-900 border border-emerald-500/40 text-emerald-400">
                            <span class="block text-[10px] uppercase font-bold">Heart Rate</span>
                            <span class="text-2xl font-black font-mono" id="hemo-hr">42 BPM</span>
                        </div>
                        <div class="p-3 rounded-2xl bg-slate-900 border border-rose-500/40 text-rose-400">
                            <span class="block text-[10px] uppercase font-bold">Arterial BP</span>
                            <span class="text-2xl font-black font-mono" id="hemo-bp">84/52 mmHg</span>
                        </div>
                        <div class="p-3 rounded-2xl bg-slate-900 border border-cyan-500/40 text-cyan-400">
                            <span class="block text-[10px] uppercase font-bold">Oxygenation</span>
                            <span class="text-2xl font-black font-mono" id="hemo-spo2">92%</span>
                        </div>
                    </div>
                </div>

                <!-- Bedside ACLS Interventions -->
                <div class="pt-3 border-t border-slate-800 space-y-2">
                    <span class="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block">Bedside Interventions:</span>
                    <div class="flex flex-wrap gap-2">
                        <button id="act-atropine" class="px-3 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white">💉 Push Atropine 1mg IV</button>
                        <button id="act-adenosine" class="px-3 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white">💉 Push Adenosine 6mg IV</button>
                        <button id="act-defib" class="px-3 py-2 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-600 text-white">⚡ Deliver 200J Biphasic Shock</button>
                        <button id="act-saline" class="px-3 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-600 text-white">💧 500 mL Saline Bolus</button>
                        <button id="act-vfib" class="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 ml-auto">Trigger VFib Collapse</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 3: ADAPTIVE CAT (3PL IRT)                                             -->
        <!-- ========================================================================= -->
        <div id="tab-content-cat" class="chep-tab-pane hidden">
            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                        <span class="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">3-Parameter Logistic (3PL) IRT Engine</span>
                        <h2 class="text-xl font-black text-slate-900 mt-2">Computerized Adaptive Testing (CAT) Simulator</h2>
                    </div>
                    <div class="text-right">
                        <span class="text-xs text-slate-500 block">Estimated Ability (&theta;):</span>
                        <strong class="text-2xl font-black font-mono text-indigo-700" id="cat-theta">0.00</strong>
                    </div>
                </div>

                <div id="cat-question-box" class="space-y-4">
                    <h3 class="text-base font-bold text-slate-900" id="cat-prompt">Loading item...</h3>
                    <div class="space-y-2" id="cat-options"></div>
                    <button id="cat-submit-btn" class="px-6 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-bold">
                        Submit Adaptive Response →
                    </button>
                </div>
            </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 4: GENERATIVE CLINICAL AI SCENARIO                                     -->
        <!-- ========================================================================= -->
        <div id="tab-content-genai" class="chep-tab-pane hidden">
            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                        <span class="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">Algorithmic Stewardship &amp; Error Audit</span>
                        <h2 class="text-xl font-black text-slate-900 mt-2">Generative Emergency Encounter Generator</h2>
                    </div>
                    <button id="genai-generate-btn" class="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold">
                        🎲 Generate New Emergency Case
                    </button>
                </div>

                <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div><strong class="text-slate-900">Patient:</strong> <span id="genai-patient">Mrs. Folashade Adeleke, 26y G1P0 at 34 weeks</span></div>
                    <div><strong class="text-slate-900">Setting:</strong> <span id="genai-setting">Maternity Triage • State Hospital Ota</span></div>
                    <div><strong class="text-slate-900">Emergency:</strong> <span id="genai-emergency" class="text-rose-700 font-bold">Severe Preeclampsia with Impending Eclampsia</span></div>
                    <div><strong class="text-slate-900">Vitals:</strong> <span id="genai-vitals" class="font-mono">BP 188/114 mmHg, HR 98 bpm, RR 22</span></div>
                </div>

                <div class="p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-2">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-amber-800">AI Clinical Copilot Suggestion (Audit Required):</span>
                    <p class="text-xs text-amber-950 font-medium" id="genai-suggestion">Administer Diazepam 10mg IV push immediately, followed by rapid sublingual nifedipine 10mg.</p>
                    <div class="pt-2">
                        <button id="genai-reveal-trap-btn" class="px-3.5 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-bold">
                            Audit &amp; Reveal Lethal Algorithmic Error Trap ▼
                        </button>
                    </div>
                    <div id="genai-trap-box" class="hidden text-xs text-rose-900 bg-rose-100 p-3 rounded-xl border border-rose-300 mt-2 font-mono"></div>
                </div>
            </div>
        </div>

        <!-- Fallback message for other tabs -->
        <div id="tab-content-other" class="chep-tab-pane hidden">
            <div class="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
                <span class="text-3xl">🩺</span>
                <h3 class="text-lg font-bold text-slate-900" id="other-tab-title">Diagnostic Simulation Studio</h3>
                <p class="text-xs text-slate-600 max-w-lg mx-auto" id="other-tab-desc">Clinical dataset and interactive reasoning rubric loaded successfully.</p>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>
