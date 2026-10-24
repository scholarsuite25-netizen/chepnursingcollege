<?php
/**
 * Template Name: Admission Portal
 *
 * @package CHEP_Nursing
 */

get_header();
?>

<main class="w-full pt-20 bg-surface-canvas min-h-screen">
    <!-- Hero Banner -->
    <section class="w-full bg-forest-dark text-white py-16 px-4 sm:px-8">
        <div class="max-w-7xl mx-auto space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-primary-fixed text-xs font-bold uppercase tracking-wider">
                <span class="material-symbols-outlined text-[16px]">how_to_reg</span>
                Admissions Open • 2026/2027 Academic Year
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                CHEP College of Nursing Sciences Admissions
            </h1>
            <p class="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed">
                Apply for our accredited 3-Year Basic Nursing (General RN) and Post-Basic programmes. Fulfill statutory NMCN requirements, generate your official examination RRR slip, and schedule entrance CBT screenings.
            </p>
        </div>
    </section>

    <!-- Admission Form & Programmes Section -->
    <section class="w-full py-12 px-4 sm:px-8">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <!-- Left Column: Programmes Info -->
            <div class="lg:col-span-5 space-y-6">
                <div>
                    <span class="text-xs font-bold uppercase tracking-widest text-forest-base">Statutory Curricula</span>
                    <h2 class="text-2xl font-extrabold text-forest-dark mt-1">Available Nursing Pathways</h2>
                </div>

                <div class="space-y-4">
                    <div class="bg-white p-6 rounded-2xl shadow-xs border border-border-subtle space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="px-2.5 py-1 bg-surface-tint text-forest-base text-xs font-bold uppercase rounded-full">Flagship Programme</span>
                            <span class="text-xs font-mono font-bold text-text-muted">3 Years Full-Time</span>
                        </div>
                        <h3 class="text-base font-bold text-forest-dark">Basic Nursing (General Nursing)</h3>
                        <p class="text-xs text-text-muted leading-relaxed">
                            Full qualification leading to Registered Nurse (RN) licensure with the Nursing &amp; Midwifery Council of Nigeria.
                        </p>
                        <div class="text-[11px] text-gray-600 bg-surface-canvas p-3 rounded-xl mt-2">
                            <strong>Criteria:</strong> 5 Credits in WAEC/NECO/NABTEB (English, Maths, Biology, Chemistry, Physics) at max 2 sittings.
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-2xl shadow-xs border border-border-subtle space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="px-2.5 py-1 bg-surface-tint text-forest-base text-xs font-bold uppercase rounded-full">Accelerated Clinical</span>
                            <span class="text-xs font-mono font-bold text-text-muted">18 Months</span>
                        </div>
                        <h3 class="text-base font-bold text-forest-dark">Post-Basic Midwifery (RM)</h3>
                        <p class="text-xs text-text-muted leading-relaxed">
                            Advanced obstetric and reproductive healthcare specialty for registered nurses.
                        </p>
                        <div class="text-[11px] text-gray-600 bg-surface-canvas p-3 rounded-xl mt-2">
                            <strong>Criteria:</strong> Must hold a valid Registered Nurse (RN) license from NMCN.
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-2xl shadow-xs border border-border-subtle space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="px-2.5 py-1 bg-surface-tint text-forest-base text-xs font-bold uppercase rounded-full">Pioneering Specialty</span>
                            <span class="text-xs font-mono font-bold text-text-muted">2 Years</span>
                        </div>
                        <h3 class="text-base font-bold text-forest-dark">Public Health &amp; Geriatric Care</h3>
                        <p class="text-xs text-text-muted leading-relaxed">
                            Specialized clinical competence in chronic illness management, elderly rehabilitation, and community medicine.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Right Column: Interactive Form & Screening Slip Output -->
            <div class="lg:col-span-7">
                <!-- Admission Application Form -->
                <form id="chep-admission-form" class="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-border-subtle space-y-5">
                    <div class="border-b border-gray-100 pb-4">
                        <span class="text-xs uppercase tracking-widest text-forest-base font-bold">Official Application Portal</span>
                        <h3 class="text-xl sm:text-2xl font-extrabold text-forest-dark">Candidate Bio-Data &amp; Credentials</h3>
                        <p class="text-xs text-text-muted mt-1">Please provide accurate information as entered on your JAMB and WAEC/NECO slips.</p>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">Candidate Full Name *</label>
                        <input type="text" name="full_name" required placeholder="e.g. Oluwaseun Esther AJAYI" class="chep-input">
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">Email Address *</label>
                            <input type="email" name="email" required placeholder="candidate@example.com" class="chep-input">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">Phone Number *</label>
                            <input type="tel" name="phone" required placeholder="08012345678" class="chep-input">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">Select Programme *</label>
                        <select name="program" class="chep-input" required>
                            <option value="Basic Nursing (General Nursing - 3 Years)">Basic Nursing (General Nursing - 3 Years)</option>
                            <option value="Post-Basic Midwifery (18 Months)">Post-Basic Midwifery (18 Months)</option>
                            <option value="Public Health &amp; Geriatric Nursing (2 Years)">Public Health &amp; Geriatric Nursing (2 Years)</option>
                        </select>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">O'Level Examination</label>
                            <select name="olevel_exam" class="chep-input">
                                <option value="WAEC">WAEC (SSCE)</option>
                                <option value="NECO">NECO</option>
                                <option value="NABTEB">NABTEB</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">Exam Year</label>
                            <input type="text" name="exam_year" value="2025" class="chep-input">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">Science Credits</label>
                            <select name="credits_count" class="chep-input">
                                <option value="5">5 Credits</option>
                                <option value="6">6 Credits</option>
                                <option value="7+">7+ Credits</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">UTME JAMB Score (If applicable)</label>
                        <input type="number" name="jamb_score" placeholder="e.g. 210" class="chep-input">
                    </div>

                    <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span class="text-xs text-text-muted flex items-center gap-1">
                            <span class="material-symbols-outlined text-[16px] text-emerald-accent">shield</span>
                            Instant RRR Slip Generation
                        </span>
                        <button type="submit" class="chep-btn-primary shadow-lg">
                            Submit Application &amp; Generate Slip
                            <span class="material-symbols-outlined text-[18px]">receipt_long</span>
                        </button>
                    </div>
                </form>

                <!-- Screening Slip Output Container (Rendered dynamically by main.js) -->
                <div id="chep-admission-slip" style="display: none;"></div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
