<?php
/**
 * Template Name: Clinical Reflections
 * Description: De-identified clinical reflective practice forum adhering to Gibbs' (1988) cycle and NDPA / NMCN privacy guidelines.
 *
 * @package CHEP_Nursing
 */

get_header();
?>

<main class="w-full pt-20 bg-surface-canvas min-h-screen pb-20">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-teal-950 via-emerald-900 to-slate-900 text-white py-16 px-4 sm:px-8 border-b border-emerald-800/40 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div class="max-w-7xl mx-auto relative z-10 space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <span class="material-symbols-outlined text-[16px]">verified_user</span>
                NMCN Confidentiality Compliant • NDPA 2023 Protected
            </div>
            <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl text-white">
                De-Identified Clinical Reflective Practice &amp; Peer Learning Forum
            </h1>
            <p class="text-sm sm:text-base text-emerald-100/90 max-w-3xl leading-relaxed">
                A legally protected, academically sanctioned space for nursing students across 100L through 500L to share real-world ward practicum experiences, debrief ethical dilemmas, and master clinical reasoning using <strong>Gibbs' Reflective Cycle (1988)</strong> with zero violation of patient privacy laws.
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-4">
                <button
                    id="btn-open-modal"
                    class="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                    <span class="material-symbols-outlined text-[18px]">add_circle</span>
                    <span>Submit De-Identified Reflection (Gibbs' Cycle)</span>
                </button>
                <a
                    href="<?php echo esc_url(home_url('/exams')); ?>"
                    class="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2"
                >
                    <span class="material-symbols-outlined text-[18px]">task_alt</span>
                    <span>CBT &amp; OSCE Exam Studio</span>
                </a>
            </div>
        </div>
    </section>

    <!-- Legal & Professional Confidentiality Standards Shield -->
    <section class="max-w-7xl mx-auto px-4 sm:px-8 -mt-6 relative z-20">
        <div class="bg-white rounded-3xl p-6 shadow-md border border-emerald-200/80 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[22px]">privacy_tip</span>
                </div>
                <div>
                    <h3 class="text-sm font-bold text-slate-900">Zero Patient Identifiers</h3>
                    <p class="text-xs text-slate-600 mt-1">
                        All postings undergo client-side PHI scrubbing. Real patient names, phone numbers, and bed numbers are strictly prohibited under penalty of disciplinary review.
                    </p>
                </div>
            </div>

            <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[22px]">psychology</span>
                </div>
                <div>
                    <h3 class="text-sm font-bold text-slate-900">Gibbs' (1988) Framework</h3>
                    <p class="text-xs text-slate-600 mt-1">
                        Submissions follow Description &rarr; Feelings &rarr; Evaluation &rarr; Analysis &rarr; Conclusion &rarr; Action Plan to cultivate deep metacognitive clinical maturity.
                    </p>
                </div>
            </div>

            <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[22px]">verified</span>
                </div>
                <div>
                    <h3 class="text-sm font-bold text-slate-900">Preceptor Endorsement</h3>
                    <p class="text-xs text-slate-600 mt-1">
                        Senior nurse educators review reflections for ethical rigor and diagnostic accuracy before validating entries toward official clinical logbook hours.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Filter & Search Controls -->
    <section class="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="flex flex-wrap items-center gap-2" id="category-filter-container">
                <!-- Injected via JS -->
            </div>

            <div class="relative w-full md:w-80">
                <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">search</span>
                <input
                    type="text"
                    id="search-input"
                    placeholder="Search clinical topics, tags, or levels..."
                    class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-emerald-500"
                />
            </div>
        </div>
    </section>

    <!-- Reflections Feed List -->
    <section class="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        <div id="reflections-list" class="space-y-6">
            <!-- Rendered by JavaScript -->
        </div>
    </section>
</main>

<!-- Submission Modal -->
<div id="reflection-modal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 hidden">
    <div class="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
                <span class="text-xs font-black uppercase text-emerald-600 tracking-wider">Clinical Logbook Dossier</span>
                <h3 class="text-xl font-black text-slate-900">Submit Gibbs' Reflective Cycle</h3>
            </div>
            <button id="btn-close-modal" class="text-slate-400 hover:text-slate-700">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>

        <div id="scrubber-alert" class="hidden my-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">warning</span>
            <span id="scrubber-alert-text">Alert</span>
        </div>

        <form id="reflection-form" class="space-y-4 pt-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Dossier / Reflection Title *</label>
                    <input type="text" id="form-title" required placeholder="e.g. Navigating Pediatric Febrile Seizure..." class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-emerald-500">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Student Author Alias *</label>
                    <input type="text" id="form-alias" required placeholder="e.g. Student Nurse K.B. (300L)" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-emerald-500">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Academic Year / Level *</label>
                    <select id="form-level" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-emerald-500">
                        <option value="100L">100L - Foundations</option>
                        <option value="200L">200L - Medical-Surgical I</option>
                        <option value="300L" selected>300L - Maternal &amp; Child Health</option>
                        <option value="400L">400L - ICU / Trauma &amp; Mental Health</option>
                        <option value="500L">500L - Leadership &amp; Advanced Midwifery</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Clinical Specialty *</label>
                    <select id="form-specialty" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-emerald-500">
                        <option value="Medical-Surgical Nursing">Medical-Surgical Nursing</option>
                        <option value="Maternal & Child Health / Midwifery">Maternal &amp; Child Health / Midwifery</option>
                        <option value="Pediatric & Neonatal Care">Pediatric &amp; Neonatal Care</option>
                        <option value="Emergency & Intensive Care">Emergency &amp; Intensive Care</option>
                        <option value="Psychiatric & Mental Health">Psychiatric &amp; Mental Health</option>
                        <option value="Community & Public Health">Community &amp; Public Health</option>
                        <option value="Ethics, Communication & Patient Advocacy">Ethics, Communication &amp; Patient Advocacy</option>
                    </select>
                </div>
            </div>

            <!-- Gibbs Stages -->
            <div class="space-y-3 pt-2">
                <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <label class="block text-xs font-bold text-emerald-800 mb-1">1. Description (What happened? Strictly de-identified) *</label>
                    <textarea id="form-desc" required rows="3" placeholder="Context, patient age bracket, clinical presentation without identifying details..." class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-emerald-500"></textarea>
                </div>

                <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <label class="block text-xs font-bold text-emerald-800 mb-1">2. Feelings (What were you thinking and feeling?)</label>
                    <textarea id="form-feelings" rows="2" placeholder="Your psychological reaction, cognitive load, anxiety or confidence..." class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-emerald-500"></textarea>
                </div>

                <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <label class="block text-xs font-bold text-emerald-800 mb-1">3. Evaluation (What was good and bad about the experience?)</label>
                    <textarea id="form-evaluation" rows="2" placeholder="Clinical aspects that proceeded effectively vs difficulties encountered..." class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-emerald-500"></textarea>
                </div>

                <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <label class="block text-xs font-bold text-emerald-800 mb-1">4. Analysis (What sense can you make of the situation?)</label>
                    <textarea id="form-analysis" rows="2" placeholder="Evidence-based rationale, pathophysiology, NMCN procedural benchmarks..." class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-emerald-500"></textarea>
                </div>

                <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <label class="block text-xs font-bold text-emerald-800 mb-1">5. Conclusion (What else could you have done?)</label>
                    <textarea id="form-conclusion" rows="2" placeholder="Insights drawn on alternative actions or faster escalation..." class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-emerald-500"></textarea>
                </div>

                <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <label class="block text-xs font-bold text-emerald-800 mb-1">6. Action Plan (If it arose again, what would you do?)</label>
                    <textarea id="form-action-plan" rows="2" placeholder="Specific competencies to rehearse, checklist changes, or equipment drills..." class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-emerald-500"></textarea>
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Clinical Tags (comma-separated)</label>
                <input type="text" id="form-tags" placeholder="e.g. Sepsis, IVCannulation, Escalation" class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-emerald-500">
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" id="btn-cancel-modal" class="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer">
                    Cancel
                </button>
                <button type="submit" class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer">
                    Publish De-Identified Reflection
                </button>
            </div>
        </form>
    </div>
</div>

<script>
(function() {
    const CATEGORIES = [
        "All Specialties",
        "Medical-Surgical Nursing",
        "Maternal & Child Health / Midwifery",
        "Pediatric & Neonatal Care",
        "Emergency & Intensive Care",
        "Psychiatric & Mental Health",
        "Community & Public Health",
        "Ethics, Communication & Patient Advocacy"
    ];

    const SEED_DATA = [
        {
            id: "refl-01",
            title: "Navigating Sudden Desaturation Post-Extubation in a High-Dependency Unit",
            authorAlias: "Student Nurse A.O. (400L ICU Posting)",
            level: "400L",
            specialty: "Emergency & Intensive Care",
            dateSubmitted: "October 10, 2026",
            preceptorVerified: true,
            preceptorFeedback: "Exemplary reflection following Gibbs' framework. Demonstrates prompt escalation and clear understanding of postoperative atelectasis vs. laryngeal edema.",
            gibbsCycle: {
                description: "During my clinical rotation on the post-operative recovery unit, a 45-year-old adult patient (Patient Case #A) underwent successful thyroidectomy and was extubated. Twenty minutes later, the patient displayed stridor, agitation, and oxygen saturation plummeted from 98% to 84% on room air.",
                feelings: "Initially, I felt a surge of panic because the patient looked terrified and was gripping the bed rail. However, remembering our emergency airway drills helped me maintain focus and call the rapid response team immediately.",
                evaluation: "What went well: I maintained airway patency with a chin-lift, applied high-flow oxygen via non-rebreather mask (15 L/min), and checked for neck wound hematoma. What was difficult: Balancing communication to comfort the family while maintaining rapid emergency handoff.",
                analysis: "Post-thyroidectomy respiratory distress is a surgical emergency often caused by tension hematoma, bilateral recurrent laryngeal nerve injury, or acute laryngeal edema. Auscultation confirmed inspiratory stridor. Emergency administration of IV dexamethasone and nebulized adrenaline stabilized the patient before re-intubation was required.",
                conclusion: "I recognized that early detection of inspiratory stridor is critical; waiting for severe cyanosis is dangerous. Immediate bedside availability of a tracheostomy tray and suctioning apparatus is indispensable.",
                actionPlan: "In future postoperative cases, I will always pre-inspect the emergency airway kit at the bedside prior to receiving extubated head and neck surgical patients, and maintain continuous plethysmographic pulse oximetry monitoring."
            },
            keyLearningPoints: [
                "Stridor post-thyroid surgery demands immediate high-flow O2 and surgeon notification.",
                "Check neck circumference for concealed expanding wound hematoma.",
                "Effective communication reduces patient anxiety during acute dyspnea."
            ],
            tags: ["AirwayEmergency", "PostOpCare", "Thyroidectomy", "RapidEscalation"],
            peerComments: [
                {
                    id: "c-1",
                    author: "Student Nurse K.E. (500L)",
                    comment: "Excellent handling! In our 500L research seminar, we reviewed evidence showing bedside tracheostomy kits save valuable minutes during post-op hemorrhage.",
                    date: "October 11, 2026"
                }
            ]
        },
        {
            id: "refl-02",
            title: "Overcoming Hesitation During Active Management of Third Stage of Labor (AMTSL)",
            authorAlias: "Student Midwife T.M. (300L Labor Ward)",
            level: "300L",
            specialty: "Maternal & Child Health / Midwifery",
            dateSubmitted: "October 8, 2026",
            preceptorVerified: true,
            preceptorFeedback: "Well-articulated self-reflection. Uterotonic administration timing is vital in preventing postpartum hemorrhage. Validated for clinical logbook portfolio.",
            gibbsCycle: {
                description: "Assisting a multiparous mother during spontaneous vaginal delivery. Following the birth of a 3.5 kg infant, I was responsible for administering the prophylactic uterotonic and performing controlled cord traction (CCT) under direct supervision of the senior preceptor.",
                feelings: "I was excited yet hesitant. Because the baby had just cried, I momentarily paused to check the neonatal APGAR rather than immediately palpating the mother's abdomen for a second twin.",
                evaluation: "The preceptor promptly prompted me: 'Rule out second twin, then give Oxytocin!' I recovered quickly, palpated the fundus, verified single pregnancy, and administered 10 IU Oxytocin IM into the vastus lateralis within 45 seconds of birth.",
                analysis: "WHO and NMCN guidelines dictate AMTSL within 1 minute of birth to prevent uterine atony, which accounts for over 70% of primary postpartum hemorrhage. Delays increase maternal blood loss exponentially.",
                conclusion: "Dual-tasking in the labor ward requires prioritizing simultaneous clinical roles: the lead midwife and assistant have distinct, synchronous responsibilities.",
                actionPlan: "I have rehearsed the mental checklist for third-stage labor so that AMTSL execution becomes an instinctive, rapid sequence without second-guessing."
            },
            keyLearningPoints: [
                "Always palpate abdomen to rule out second twin before oxytocin administration.",
                "Administer 10 IU Oxytocin IM within 60 seconds of neonatal delivery.",
                "Perform gentle controlled cord traction during uterine contraction only."
            ],
            tags: ["AMTSL", "Midwifery", "PPHPrevention", "LaborWard"],
            peerComments: []
        }
    ];

    let reflections = JSON.parse(localStorage.getItem('chep_reflections')) || SEED_DATA;
    let selectedCategory = "All Specialties";
    let searchQuery = "";
    let expandedId = "refl-01";

    const filterContainer = document.getElementById('category-filter-container');
    const searchInput = document.getElementById('search-input');
    const listContainer = document.getElementById('reflections-list');
    const modal = document.getElementById('reflection-modal');
    const btnOpenModal = document.getElementById('btn-open-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnCancelModal = document.getElementById('btn-cancel-modal');
    const form = document.getElementById('reflection-form');
    const scrubberAlert = document.getElementById('scrubber-alert');
    const scrubberAlertText = document.getElementById('scrubber-alert-text');

    function checkPHI(text) {
        const phonePattern = /(\+?234|0)[789][01]\d{8}/;
        const bedPattern = /\b(bed\s*\d+|ward\s*[a-z0-9]+|room\s*\d+)\b/i;
        const mrnPattern = /\b(mrn|hospital\s*number|id\s*no)\s*[:#]?\s*\d+/i;

        if (phonePattern.test(text)) {
            return "Telephone number detected. Remove all contact numbers to maintain strict patient anonymity.";
        }
        if (bedPattern.test(text)) {
            return "Specific ward bed or room number detected. Please use general terms (e.g. 'an acute surgical unit').";
        }
        if (mrnPattern.test(text)) {
            return "Medical record number (MRN) detected. Replace with de-identified alias (e.g. 'Patient Case #1').";
        }
        return null;
    }

    function renderFilters() {
        filterContainer.innerHTML = '';
        CATEGORIES.forEach(cat => {
            const btn = document.createElement('button');
            const isActive = selectedCategory === cat;
            btn.className = `px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`;
            btn.textContent = cat;
            btn.addEventListener('click', () => {
                selectedCategory = cat;
                renderFilters();
                renderReflections();
            });
            filterContainer.appendChild(btn);
        });
    }

    function renderReflections() {
        const filtered = reflections.filter(r => {
            const matchCat = selectedCategory === "All Specialties" || r.specialty === selectedCategory;
            const q = searchQuery.toLowerCase().trim();
            const matchQ = !q ||
                r.title.toLowerCase().includes(q) ||
                r.authorAlias.toLowerCase().includes(q) ||
                r.gibbsCycle.description.toLowerCase().includes(q) ||
                r.tags.some(t => t.toLowerCase().includes(q));
            return matchCat && matchQ;
        });

        if (filtered.length === 0) {
            listContainer.innerHTML = `
                <div class="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                    <span class="material-symbols-outlined text-4xl text-slate-400">notes</span>
                    <p class="text-sm font-bold text-slate-600 mt-2">No reflections found matching your criteria</p>
                    <p class="text-xs text-slate-400">Try adjusting your filters or search keywords.</p>
                </div>
            `;
            return;
        }

        listContainer.innerHTML = filtered.map(r => {
            const isExpanded = expandedId === r.id;
            return `
                <article class="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden transition-all hover:shadow-md">
                    <div class="p-6 cursor-pointer" onclick="toggleExpand('${r.id}')">
                        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div class="flex items-center gap-2">
                                <span class="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black">${r.level}</span>
                                <span class="text-xs font-semibold text-slate-500">${r.specialty}</span>
                                <span class="text-xs text-slate-400">• ${r.dateSubmitted}</span>
                            </div>
                            ${r.preceptorVerified ? `
                                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                                    <span class="material-symbols-outlined text-[14px]">verified</span>
                                    Preceptor Verified
                                </span>
                            ` : `
                                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
                                    <span class="material-symbols-outlined text-[14px]">schedule</span>
                                    Pending Review
                                </span>
                            `}
                        </div>

                        <h2 class="text-lg sm:text-xl font-black text-slate-900 leading-snug hover:text-emerald-700 transition-colors">
                            ${r.title}
                        </h2>

                        <p class="text-xs text-slate-500 mt-1 font-medium">
                            Authored by: <strong class="text-slate-700">${r.authorAlias}</strong>
                        </p>

                        <p class="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                            ${r.gibbsCycle.description}
                        </p>

                        <div class="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100">
                            <div class="flex flex-wrap gap-1.5">
                                ${r.tags.map(t => `<span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-bold">#${t}</span>`).join('')}
                            </div>
                            <button class="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                                <span>${isExpanded ? 'Collapse Dossier' : 'Review Gibbs Stages & Dialogue'}</span>
                                <span class="material-symbols-outlined text-[16px]">${isExpanded ? 'expand_less' : 'expand_more'}</span>
                            </button>
                        </div>
                    </div>

                    ${isExpanded ? `
                        <div class="px-6 pb-6 pt-2 bg-slate-50/70 border-t border-slate-100 space-y-4">
                            <!-- Gibbs 6 Stages -->
                            <div class="space-y-3">
                                <h4 class="text-xs font-black uppercase tracking-wider text-slate-500">Gibbs' (1988) Reflective Framework Breakdown</h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div class="p-3 bg-white rounded-xl border border-slate-200">
                                        <span class="text-xs font-black text-emerald-800 block">1. Description (Context)</span>
                                        <p class="text-xs text-slate-700 mt-1 leading-relaxed">${r.gibbsCycle.description}</p>
                                    </div>
                                    <div class="p-3 bg-white rounded-xl border border-slate-200">
                                        <span class="text-xs font-black text-emerald-800 block">2. Feelings (Emotional Response)</span>
                                        <p class="text-xs text-slate-700 mt-1 leading-relaxed">${r.gibbsCycle.feelings}</p>
                                    </div>
                                    <div class="p-3 bg-white rounded-xl border border-slate-200">
                                        <span class="text-xs font-black text-emerald-800 block">3. Evaluation (Good & Difficult)</span>
                                        <p class="text-xs text-slate-700 mt-1 leading-relaxed">${r.gibbsCycle.evaluation}</p>
                                    </div>
                                    <div class="p-3 bg-white rounded-xl border border-slate-200">
                                        <span class="text-xs font-black text-emerald-800 block">4. Analysis (Sensemaking & Theory)</span>
                                        <p class="text-xs text-slate-700 mt-1 leading-relaxed">${r.gibbsCycle.analysis}</p>
                                    </div>
                                    <div class="p-3 bg-white rounded-xl border border-slate-200">
                                        <span class="text-xs font-black text-emerald-800 block">5. Conclusion (Alternative Actions)</span>
                                        <p class="text-xs text-slate-700 mt-1 leading-relaxed">${r.gibbsCycle.conclusion}</p>
                                    </div>
                                    <div class="p-3 bg-white rounded-xl border border-slate-200">
                                        <span class="text-xs font-black text-emerald-800 block">6. Action Plan (Future Preparedness)</span>
                                        <p class="text-xs text-slate-700 mt-1 leading-relaxed">${r.gibbsCycle.actionPlan}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Preceptor Evaluation -->
                            ${r.preceptorFeedback ? `
                                <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                                    <div class="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                                        <span class="material-symbols-outlined text-[16px]">assignment_turned_in</span>
                                        Faculty Preceptor Endorsement &amp; Clinical Feedback
                                    </div>
                                    <p class="text-xs text-emerald-950 mt-1 italic">"${r.preceptorFeedback}"</p>
                                </div>
                            ` : ''}

                            <!-- Comments Section -->
                            <div class="pt-2">
                                <h4 class="text-xs font-black text-slate-700 mb-2">Peer Learning Dialogue (${r.peerComments.length})</h4>
                                <div class="space-y-2 mb-3">
                                    ${r.peerComments.map(c => `
                                        <div class="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                                            <div class="flex items-center justify-between font-bold text-slate-800">
                                                <span>${c.author}</span>
                                                <span class="text-slate-400 font-normal">${c.date}</span>
                                            </div>
                                            <p class="text-slate-600 mt-1">${c.comment}</p>
                                        </div>
                                    `).join('')}
                                </div>
                                <div class="flex gap-2">
                                    <input type="text" id="comment-input-${r.id}" placeholder="Add clinical peer comment..." class="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500 bg-white">
                                    <button onclick="addComment('${r.id}')" class="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer">
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </article>
            `;
        }).join('');
    }

    window.toggleExpand = function(id) {
        expandedId = expandedId === id ? null : id;
        renderReflections();
    };

    window.addComment = function(reflectionId) {
        const input = document.getElementById(`comment-input-${reflectionId}`);
        if (!input || !input.value.trim()) return;

        const val = input.value.trim();
        const phi = checkPHI(val);
        if (phi) {
            alert("Comment blocked: " + phi);
            return;
        }

        const match = reflections.find(r => r.id === reflectionId);
        if (match) {
            match.peerComments.push({
                id: 'c-' + Date.now(),
                author: 'Colleague (CHEP Student)',
                comment: val,
                date: 'Just now'
            });
            localStorage.setItem('chep_reflections', JSON.stringify(reflections));
            renderReflections();
        }
    };

    // Modal Events
    btnOpenModal.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });
    btnCloseModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    btnCancelModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Form Scrubber Check
    const formFields = ['form-title', 'form-desc', 'form-feelings', 'form-evaluation', 'form-analysis', 'form-conclusion', 'form-action-plan'];
    formFields.forEach(fid => {
        const el = document.getElementById(fid);
        if (el) {
            el.addEventListener('input', () => {
                const phi = checkPHI(el.value);
                if (phi) {
                    scrubberAlertText.textContent = phi;
                    scrubberAlert.classList.remove('hidden');
                } else {
                    scrubberAlert.classList.add('hidden');
                }
            });
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullText = formFields.map(id => document.getElementById(id).value).join(' ');
        const phi = checkPHI(fullText);
        if (phi) {
            alert("Submission blocked: Please remove identifiable patient data flagged by the Privacy Scrubber before publishing.");
            return;
        }

        const tagsRaw = document.getElementById('form-tags').value;
        const newRefl = {
            id: 'refl-' + Date.now(),
            title: document.getElementById('form-title').value,
            authorAlias: document.getElementById('form-alias').value,
            level: document.getElementById('form-level').value,
            specialty: document.getElementById('form-specialty').value,
            dateSubmitted: 'Just now',
            preceptorVerified: false,
            preceptorFeedback: 'Pending Clinical Preceptor Review',
            gibbsCycle: {
                description: document.getElementById('form-desc').value,
                feelings: document.getElementById('form-feelings').value,
                evaluation: document.getElementById('form-evaluation').value,
                analysis: document.getElementById('form-analysis').value,
                conclusion: document.getElementById('form-conclusion').value,
                actionPlan: document.getElementById('form-action-plan').value
            },
            keyLearningPoints: [
                'Patient dignity maintained under strict NDPA & NMCN confidentiality standards.',
                "Reflective insight formulated using Gibbs' (1988) cycle."
            ],
            tags: tagsRaw ? tagsRaw.split(',').map(t => t.trim().replace(/^#/, '')) : ['ReflectivePractice', 'ClinicalLearning'],
            peerComments: []
        };

        reflections.unshift(newRefl);
        localStorage.setItem('chep_reflections', JSON.stringify(reflections));
        modal.classList.add('hidden');
        form.reset();
        expandedId = newRefl.id;
        renderReflections();
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderReflections();
    });

    renderFilters();
    renderReflections();
})();
</script>

<?php
get_footer();
