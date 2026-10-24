<?php
/**
 * CHEP College of Nursing Sciences - Front Page Template
 *
 * @package CHEP_Nursing
 */

get_header();
?>

<main class="w-full pt-20 bg-surface-canvas">
    <!-- Top Breadcrumb & Institutional Authority -->
    <section class="w-full bg-white py-3 border-b border-border-subtle shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between text-xs sm:text-sm text-text-muted">
            <nav class="flex items-center gap-2">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-forest-base transition-colors flex items-center gap-1">
                    <span class="material-symbols-outlined text-[16px]">home</span>Home
                </a>
                <span>/</span>
                <span class="text-forest-base font-semibold">Official Collegiate Portal</span>
            </nav>
            <div class="hidden md:flex items-center gap-3">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-light text-emerald-accent text-xs font-bold uppercase tracking-wider">
                    <span class="material-symbols-outlined text-[14px]">verified</span>
                    NMCN Accredited Institution
                </span>
                <span class="text-xs uppercase tracking-wide text-text-muted">Est. Ota, Ogun State</span>
            </div>
        </div>
    </section>

    <!-- Hero Banner with 2026/2027 Matriculation Showcase -->
    <section class="relative w-full bg-forest-dark text-white py-14 lg:py-20 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div class="lg:col-span-7 space-y-6">
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md">
                        <span class="w-2 h-2 rounded-full bg-amber-vibrant"></span>
                        <span class="text-xs font-bold uppercase tracking-widest text-primary-fixed">
                            Excellence in Healthcare Pedagogy
                        </span>
                    </div>
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                        Fostering Clinical Distinction, Empathy &amp; Ethical Nursing Practice in Ota, Ogun State
                    </h1>
                    <p class="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl">
                        CHEP College of Nursing Sciences bridges scientific rigor and compassionate service. We prepare registered nurses and healthcare leaders empowered to transform community medicine across Nigeria and international health systems.
                    </p>
                    <div class="flex flex-wrap items-center gap-4 pt-2">
                        <a href="#leadership" class="chep-btn-primary text-sm px-6 py-3.5 shadow-md">
                            Office of the Provost
                            <span class="material-symbols-outlined text-[18px]">arrow_downward</span>
                        </a>
                        <a href="<?php echo esc_url(home_url('/admission')); ?>" class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded-lg backdrop-blur-md transition-colors">
                            <span class="material-symbols-outlined text-[18px]">how_to_reg</span>
                            Online Admissions Portal
                        </a>
                    </div>
                </div>

                <!-- 2026/2027 Matriculation Ceremony Showcase Photo Card -->
                <div class="lg:col-span-5">
                    <div class="relative bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/20 shadow-2xl overflow-hidden">
                        <div class="relative w-full rounded-xl overflow-hidden shadow-inner" style="aspect-ratio: 16/10;">
                            <img src="<?php echo esc_url(chep_asset('images/chep_matric_4.jpg')); ?>" alt="2026/2027 Matriculation Ceremony at CHEP College of Nursing Sciences" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" style="background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 50%, transparent 100%);"></div>
                            
                            <div class="absolute top-3 left-3 bg-forest-base text-white text-[11px] sm:text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-white/20">
                                <span class="material-symbols-outlined text-[15px]">school</span>
                                2026/2027 Matriculation Ceremony
                            </div>

                            <div class="absolute bottom-3 left-3 right-3 text-white">
                                <h4 class="font-extrabold text-base sm:text-lg leading-tight text-white">
                                    Formal Induction of Student Nursing Cohorts
                                </h4>
                                <p class="text-xs text-gray-200 mt-1">
                                    Class of 2026/2027 undertaking the Florence Nightingale pledge &amp; ceremonial gown investiture at the Ota campus auditorium.
                                </p>
                            </div>
                        </div>
                        <div class="pt-2.5 px-2 pb-1 flex items-center justify-between text-xs text-gray-200">
                            <span class="flex items-center gap-1.5 font-medium text-emerald-light">
                                <span class="material-symbols-outlined text-[16px]">verified</span>
                                NMCN Matriculation Ledger
                            </span>
                            <span class="text-[11px] uppercase tracking-wider text-gray-300">Ota, Ogun State</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Guiding Academic Foundations / Philosophy & Moral Pillars -->
    <section class="w-full py-16 sm:py-20 bg-surface-canvas">
        <div class="max-w-7xl mx-auto px-4 sm:px-8">
            <div class="text-center max-w-3xl mx-auto space-y-2 mb-12">
                <span class="text-xs font-bold uppercase tracking-widest text-forest-base">
                    Guiding Academic Foundations
                </span>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-forest-dark">
                    Institutional Philosophy &amp; Moral Pillars
                </h2>
                <p class="text-base text-text-muted">
                    Anchored in the dual ideals of our heraldic mottos: balancing heart and intellect.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div class="bg-forest-base text-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
                    <span class="text-xs font-bold uppercase tracking-widest text-primary-fixed block mb-2">
                        Foundational Philosophy
                    </span>
                    <h3 class="text-2xl font-bold mb-3 text-white">Caring. Knowledge. Excellence.</h3>
                    <p class="text-sm sm:text-base text-gray-200 leading-relaxed">
                        Our instructional doctrine posits that clinical dexterity without human empathy is incomplete. We instill relentless intellectual rigor alongside tender bedside diplomacy.
                    </p>
                </div>

                <div class="bg-white text-gray-900 rounded-2xl p-8 shadow-md border border-border-subtle relative overflow-hidden">
                    <span class="text-xs font-bold uppercase tracking-widest text-orange-action block mb-2">
                        Aspirational Outcome
                    </span>
                    <h3 class="text-2xl font-bold text-forest-dark mb-3">Compassion. Wisdom. Success.</h3>
                    <p class="text-sm sm:text-base text-text-muted leading-relaxed">
                        Every CHEP candidate graduates as a thoughtful clinician equipped with sound judgement, ethical stability, and an unwavering commitment to vulnerable populations.
                    </p>
                </div>
            </div>

            <!-- Bento Grid: Mission, Vision, and Values -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col justify-between">
                    <div>
                        <div class="w-12 h-12 rounded-xl bg-surface-tint text-forest-base flex items-center justify-center mb-4">
                            <span class="material-symbols-outlined text-[28px]">rocket_launch</span>
                        </div>
                        <h4 class="text-xl font-bold text-forest-dark mb-2">Our Mission</h4>
                        <p class="text-sm text-text-muted leading-relaxed">
                            To deliver transformative nursing education through evidence-based pedagogy, high-fidelity clinical simulation, and intensive community engagement.
                        </p>
                    </div>
                    <div class="pt-4 mt-4 border-t border-gray-100 flex items-center gap-2 text-forest-medium font-semibold text-xs">
                        <span class="material-symbols-outlined text-[18px]">check_circle</span>
                        Community &amp; Primary Healthcare Centric
                    </div>
                </div>

                <div class="bg-white p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col justify-between">
                    <div>
                        <div class="w-12 h-12 rounded-xl bg-surface-tint text-forest-base flex items-center justify-center mb-4">
                            <span class="material-symbols-outlined text-[28px]">visibility</span>
                        </div>
                        <h4 class="text-xl font-bold text-forest-dark mb-2">Our Vision</h4>
                        <p class="text-sm text-text-muted leading-relaxed">
                            To emerge as Sub-Saharan Africa’s premier college of nursing sciences and elderly care specialization, recognized internationally for producing ethical innovators.
                        </p>
                    </div>
                    <div class="pt-4 mt-4 border-t border-gray-100 flex items-center gap-2 text-forest-medium font-semibold text-xs">
                        <span class="material-symbols-outlined text-[18px]">public</span>
                        Global Competency Alignment
                    </div>
                </div>

                <div class="bg-white p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col justify-between">
                    <div>
                        <div class="w-12 h-12 rounded-xl bg-surface-tint text-forest-base flex items-center justify-center mb-4">
                            <span class="material-symbols-outlined text-[28px]">shield_with_heart</span>
                        </div>
                        <h4 class="text-xl font-bold text-forest-dark mb-2">Core Institutional Values</h4>
                        <ul class="space-y-2 text-sm text-text-muted">
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-forest-base text-[16px]">done</span> <strong>Integrity:</strong> Ethical bedside stewardship.</li>
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-forest-base text-[16px]">done</span> <strong>Altruism:</strong> Patient-first dedication.</li>
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-forest-base text-[16px]">done</span> <strong>Curiosity:</strong> Research-based medical discovery.</li>
                        </ul>
                    </div>
                    <div class="pt-4 mt-4 border-t border-gray-100 flex items-center gap-2 text-forest-medium font-semibold text-xs">
                        <span class="material-symbols-outlined text-[18px]">military_tech</span>
                        Pioneering Geriatric Care
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Dynamic Landscape Photo Slider -->
    <section class="w-full py-16 sm:py-20 bg-white border-y border-border-subtle">
        <div class="max-w-7xl mx-auto px-4 sm:px-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <span class="text-xs font-bold uppercase tracking-widest text-forest-base">
                        Authentic Collegiate Fieldwork
                    </span>
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-forest-dark">
                        Clinical Simulation, Examination &amp; Community Care
                    </h2>
                    <p class="text-sm text-text-muted mt-1 max-w-2xl">
                        Explore high-fidelity emergency simulations, rigorous computer-based testing, and pioneer elder-care outreach conducted across our Ota campus.
                    </p>
                </div>

                <!-- Slider Navigation Controls -->
                <div class="flex items-center gap-3">
                    <span id="chep-slider-counter" class="text-xs font-mono font-bold text-forest-base bg-surface-tint px-3 py-1.5 rounded-full">
                        01 / 03
                    </span>
                    <button id="chep-slider-prev" aria-label="Previous slide" class="w-10 h-10 rounded-full border border-gray-200 hover:border-forest-base hover:bg-forest-base hover:text-white flex items-center justify-center transition-colors text-gray-700 shadow-xs">
                        <span class="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <button id="chep-slider-next" aria-label="Next slide" class="w-10 h-10 rounded-full border border-gray-200 hover:border-forest-base hover:bg-forest-base hover:text-white flex items-center justify-center transition-colors text-gray-700 shadow-xs">
                        <span class="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                </div>
            </div>

            <!-- Slider Container -->
            <div id="chep-landscape-slider" class="relative w-full rounded-3xl overflow-hidden shadow-xl bg-forest-dark" style="aspect-ratio: 21/9; min-height: 380px;">
                <!-- Slide 1 -->
                <div class="chep-slider-slide active">
                    <img src="<?php echo esc_url(chep_asset('images/disaster_training_1.jpg')); ?>" alt="Emergency Triage &amp; Disaster Response Drills" class="w-full h-full object-cover">
                    <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%);"></div>
                    <div class="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white">
                        <div class="flex items-center gap-2">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-base text-white text-xs font-bold uppercase">
                                <span class="material-symbols-outlined text-[15px]">verified</span> Clinical Simulation &amp; Fieldwork
                            </span>
                            <span class="px-3 py-1 rounded-full bg-white/20 text-white text-xs">Clinical Demonstrations Annex • Ota</span>
                        </div>
                        <div class="max-w-3xl space-y-2">
                            <h3 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
                                Emergency Triage &amp; Disaster Response Practical Training
                            </h3>
                            <p class="text-xs sm:text-sm text-gray-200 leading-relaxed">
                                CHEP nursing candidates undergoing hands-on trauma preparedness drills, rapid triage protocol execution, and coordinated field emergency exercises under senior clinical instructors.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Slide 2 -->
                <div class="chep-slider-slide">
                    <img src="<?php echo esc_url(chep_asset('images/examination_hall.jpg')); ?>" alt="State-of-the-Art Examination Hall" class="w-full h-full object-cover">
                    <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%);"></div>
                    <div class="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white">
                        <div class="flex items-center gap-2">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-base text-white text-xs font-bold uppercase">
                                <span class="material-symbols-outlined text-[15px]">verified</span> Academic Integrity &amp; CBT
                            </span>
                            <span class="px-3 py-1 rounded-full bg-white/20 text-white text-xs">Main Auditorium Examination Wing</span>
                        </div>
                        <div class="max-w-3xl space-y-2">
                            <h3 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
                                State-of-the-Art Examination Hall &amp; Computer-Based Testing
                            </h3>
                            <p class="text-xs sm:text-sm text-gray-200 leading-relaxed">
                                Candidates seated for standardized Nursing and Midwifery Council of Nigeria (NMCN) continuous assessments in an atmosphere of strict academic probity.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Slide 3 -->
                <div class="chep-slider-slide">
                    <img src="<?php echo esc_url(chep_asset('images/chep_geriatrics_1.jpg')); ?>" alt="Geriatric Care Outreach" class="w-full h-full object-cover">
                    <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%);"></div>
                    <div class="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white">
                        <div class="flex items-center gap-2">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-base text-white text-xs font-bold uppercase">
                                <span class="material-symbols-outlined text-[15px]">verified</span> Pioneering Specialty
                            </span>
                            <span class="px-3 py-1 rounded-full bg-white/20 text-white text-xs">Community Health &amp; Geriatrics Outreach</span>
                        </div>
                        <div class="max-w-3xl space-y-2">
                            <h3 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
                                Geriatric Healthcare &amp; Compassionate Elder-Care Practicum
                            </h3>
                            <p class="text-xs sm:text-sm text-gray-200 leading-relaxed">
                                Extending healthcare beyond clinical wards into senior communities. CHEP scholars conduct comprehensive geriatric assessments and personalized palliative care.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Indicator Dots -->
                <div class="absolute bottom-4 right-6 sm:bottom-6 sm:right-10 z-20 flex items-center gap-2">
                    <span class="chep-slider-dot active"></span>
                    <span class="chep-slider-dot"></span>
                    <span class="chep-slider-dot"></span>
                </div>
            </div>
        </div>
    </section>

    <!-- Office of the Provost (Replaced Genesis Timeline) -->
    <section class="w-full py-16 sm:py-24 bg-forest-dark text-white" id="leadership">
        <div class="max-w-7xl mx-auto px-4 sm:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-5">
                    <div class="relative">
                        <div class="w-full rounded-3xl overflow-hidden shadow-2xl bg-forest-medium/30 border border-white/10 flex items-end justify-center" style="height: 480px;">
                            <img src="<?php echo esc_url(chep_asset('images/provost.png')); ?>" alt="Provost Stella Oluwatoyin AYOWOLE" class="w-full h-[95%] object-contain object-bottom drop-shadow-2xl">
                        </div>
                        <div class="absolute -bottom-6 left-4 right-4 bg-white text-gray-900 p-4 sm:p-5 rounded-2xl shadow-xl flex items-center justify-between">
                            <div>
                                <span class="text-xs uppercase font-bold text-forest-base block">Provost &amp; Academic Director</span>
                                <h4 class="text-base sm:text-lg font-bold text-forest-dark leading-tight">Stella Oluwatoyin AYOWOLE</h4>
                                <p class="text-xs text-text-muted">RN, RM, B.N.Sc, M.Sc (Nursing Education)</p>
                            </div>
                            <div class="w-10 h-10 rounded-full bg-surface-tint flex items-center justify-center text-forest-base shrink-0">
                                <span class="material-symbols-outlined text-[20px]">school</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-7 space-y-5 pt-8 lg:pt-0">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary-fixed text-xs uppercase tracking-wider font-semibold">
                        <span class="material-symbols-outlined text-[16px]">format_quote</span>
                        Office of the Provost
                    </div>
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-white">
                        &ldquo;We do not merely confer diplomas; we build ethical custodians of human life.&rdquo;
                    </h2>
                    <div class="space-y-3 text-sm sm:text-base text-gray-200 leading-relaxed">
                        <p>
                            Welcome to CHEP College of Nursing Sciences, where excellence meets compassion in the heart of healthcare education. We proudly nurture students into skilled, ethical, and confident professionals ready to transform lives through quality nursing practice.
                        </p>
                        <p>
                            In an era where global medicine demands both high-tech agility and timeless human dignity, our collegiate curriculum delivers intensive bedside exposure from Year One.
                        </p>
                    </div>

                    <div class="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div class="p-3.5 rounded-xl bg-white/5 border border-white/10">
                            <span class="text-xs uppercase text-primary-fixed block font-bold">Deanery Tenure</span>
                            <span class="text-lg font-bold text-white">Over 20 Years</span>
                            <span class="text-xs text-gray-300 block">Clinical Mentorship</span>
                        </div>
                        <div class="p-3.5 rounded-xl bg-white/5 border border-white/10">
                            <span class="text-xs uppercase text-primary-fixed block font-bold">NMCN Indexing</span>
                            <span class="text-lg font-bold text-white">Zero Deficit</span>
                            <span class="text-xs text-gray-300 block">Standardized Record</span>
                        </div>
                        <div class="p-3.5 rounded-xl bg-white/5 border border-white/10">
                            <span class="text-xs uppercase text-primary-fixed block font-bold">Elderly Outreach</span>
                            <span class="text-lg font-bold text-white">Pioneer</span>
                            <span class="text-xs text-gray-300 block">Ogun State Geriatrics</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Campus Facilities -->
    <section class="w-full py-16 sm:py-20 bg-surface-canvas">
        <div class="max-w-7xl mx-auto px-4 sm:px-8">
            <div class="text-center max-w-3xl mx-auto mb-12">
                <span class="text-xs font-bold uppercase tracking-widest text-forest-base">Purpose-Built Learning Spaces</span>
                <h2 className="text-3xl font-extrabold text-forest-dark">CHEP Campus &amp; Instructional Facilities</h2>
                <p class="text-sm text-text-muted mt-2">
                    Designed specifically for clinical simulation, interactive digital research, and safe collegiate living in Ota, Ogun State.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white rounded-2xl overflow-hidden shadow-xs border border-border-subtle flex flex-col justify-between">
                    <div>
                        <div class="w-full h-44 bg-gray-100 overflow-hidden">
                            <img src="<?php echo esc_url(chep_asset('images/laboratory.jpg')); ?>" alt="Anatomy Lab" class="w-full h-full object-cover">
                        </div>
                        <div class="p-5">
                            <span class="text-forest-base text-xs uppercase font-bold block mb-1">Scientific Hub</span>
                            <h4 class="text-base font-bold text-forest-dark mb-2">Advanced Anatomy &amp; Science Labs</h4>
                            <p class="text-xs text-text-muted leading-relaxed">High-precision microscopes and anatomical models for biochemistry and pathology.</p>
                        </div>
                    </div>
                    <div class="px-5 pb-5"><span class="text-xs text-forest-medium font-semibold flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">verified</span>Microbiology &amp; Anatomy</span></div>
                </div>

                <div class="bg-white rounded-2xl overflow-hidden shadow-xs border border-border-subtle flex flex-col justify-between">
                    <div>
                        <div class="w-full h-44 bg-gray-100 overflow-hidden">
                            <img src="<?php echo esc_url(chep_asset('images/ict_center.jpg')); ?>" alt="ICT Center" class="w-full h-full object-cover">
                        </div>
                        <div class="p-5">
                            <span class="text-forest-base text-xs uppercase font-bold block mb-1">Virtual Integration</span>
                            <h4 class="text-base font-bold text-forest-dark mb-2">ICT Center &amp; Virtual Library</h4>
                            <p class="text-xs text-text-muted leading-relaxed">Dedicated broadband workstations with access to OPAC catalogs and PubMed databases.</p>
                        </div>
                    </div>
                    <div class="px-5 pb-5"><span class="text-xs text-forest-medium font-semibold flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">verified</span>Librarika OPAC Workstations</span></div>
                </div>

                <div class="bg-white rounded-2xl overflow-hidden shadow-xs border border-border-subtle flex flex-col justify-between">
                    <div>
                        <div class="w-full h-44 bg-gray-100 overflow-hidden">
                            <img src="<?php echo esc_url(chep_asset('images/disaster_training_1.jpg')); ?>" alt="Demonstration Wards" class="w-full h-full object-cover">
                        </div>
                        <div class="p-5">
                            <span class="text-forest-base text-xs uppercase font-bold block mb-1">Pre-Clinical Mastery</span>
                            <h4 class="text-base font-bold text-forest-dark mb-2">Clinical Demonstration &amp; Safety Annex</h4>
                            <p class="text-xs text-text-muted leading-relaxed">Realistic simulation ward outfitted with patient beds, oxygen ports, and emergency carts.</p>
                        </div>
                    </div>
                    <div class="px-5 pb-5"><span class="text-xs text-forest-medium font-semibold flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">verified</span>High-Fidelity Simulators</span></div>
                </div>

                <div class="bg-white rounded-2xl overflow-hidden shadow-xs border border-border-subtle flex flex-col justify-between">
                    <div>
                        <div class="w-full h-44 bg-gray-100 overflow-hidden">
                            <img src="<?php echo esc_url(chep_asset('images/dormitory.jpg')); ?>" alt="Hostels" class="w-full h-full object-cover">
                        </div>
                        <div class="p-5">
                            <span class="text-forest-base text-xs uppercase font-bold block mb-1">Residential Living</span>
                            <h4 class="text-base font-bold text-forest-dark mb-2">Ultra-Modern Hostels</h4>
                            <p class="text-xs text-text-muted leading-relaxed">Safe, comfortable dormitories with 24/7 security surveillance and uninterrupted solar backup.</p>
                        </div>
                    </div>
                    <div class="px-5 pb-5"><span class="text-xs text-forest-medium font-semibold flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">verified</span>24/7 Security &amp; Power</span></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured News & Clinical Dispatches -->
    <section class="w-full py-16 sm:py-20 bg-white border-t border-border-subtle">
        <div class="max-w-7xl mx-auto px-4 sm:px-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <span class="text-xs font-bold uppercase tracking-widest text-forest-base">Official Academic Press</span>
                    <h2 class="text-3xl font-extrabold text-forest-dark">Latest News &amp; Clinical Dispatches</h2>
                    <p class="text-sm text-text-muted mt-1 max-w-xl">Authoritative updates from CHEP College of Nursing Sciences faculty, clinical fieldwork reports, and council notices.</p>
                </div>
                <a href="<?php echo esc_url(home_url('/news')); ?>" class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-action hover:underline">
                    View All News &amp; Bulletins <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Card 1 -->
                <article class="bg-white rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between overflow-hidden">
                    <div>
                        <div class="w-full h-48 overflow-hidden bg-gray-100">
                            <img src="<?php echo esc_url(chep_asset('images/chep_geriatrics_3.jpg')); ?>" alt="Geriatric Care" class="w-full h-full object-cover">
                        </div>
                        <div class="p-5">
                            <div class="flex items-center gap-2 text-xs text-text-muted mb-2"><span>20/03/2026</span> • <span>5 min read</span></div>
                            <h4 class="text-base font-bold text-gray-900 leading-snug">Comprehensive Geriatric Assessments (CGA): Redefining Senior Well-being</h4>
                            <p class="text-xs text-text-muted mt-2 leading-relaxed">Geriatric syndromes require multi-dimensional assessment protocols. CHEP student researchers present findings from Ogun State.</p>
                        </div>
                    </div>
                    <div class="p-5 pt-0 border-t border-gray-50 flex items-center justify-between mt-2">
                        <span class="text-xs font-semibold text-forest-medium">Dr. Ifeanyi Chukwuma</span>
                        <a href="<?php echo esc_url(home_url('/news')); ?>" class="text-xs font-bold text-orange-action hover:underline">Read Dispatch &rarr;</a>
                    </div>
                </article>

                <!-- Card 2 -->
                <article class="bg-white rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between overflow-hidden">
                    <div>
                        <div class="w-full h-48 overflow-hidden bg-gray-100">
                            <img src="<?php echo esc_url(chep_asset('images/disaster_week.jpg')); ?>" alt="Disaster Preparedness" class="w-full h-full object-cover">
                        </div>
                        <div class="p-5">
                            <div class="flex items-center gap-2 text-xs text-text-muted mb-2"><span>01/04/2026</span> • <span>4 min read</span></div>
                            <h4 class="text-base font-bold text-gray-900 leading-snug">Community Health Nursing: Emergency Fieldwork &amp; Primary Care</h4>
                            <p class="text-xs text-text-muted mt-2 leading-relaxed">Preventative epidemiology and emergency trauma drills form Nigeria's frontline defense. An analysis of CHEP's rural immersion cohorts.</p>
                        </div>
                    </div>
                    <div class="p-5 pt-0 border-t border-gray-50 flex items-center justify-between mt-2">
                        <span class="text-xs font-semibold text-forest-medium">Nurse T. K. Balogun</span>
                        <a href="<?php echo esc_url(home_url('/news')); ?>" class="text-xs font-bold text-orange-action hover:underline">Read Dispatch &rarr;</a>
                    </div>
                </article>

                <!-- Card 3 -->
                <article class="bg-white rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between overflow-hidden">
                    <div>
                        <div class="w-full h-48 overflow-hidden bg-gray-100">
                            <img src="<?php echo esc_url(chep_asset('images/examination_hall.jpg')); ?>" alt="CBT Examinations" class="w-full h-full object-cover">
                        </div>
                        <div class="p-5">
                            <div class="flex items-center gap-2 text-xs text-text-muted mb-2"><span>14/03/2026</span> • <span>3 min read</span></div>
                            <h4 class="text-base font-bold text-gray-900 leading-snug">NMCN Standardized CBT Examinations &amp; Academic Probity Protocols</h4>
                            <p class="text-xs text-text-muted mt-2 leading-relaxed">Modern digital examination terminal protocols ensuring flawless indexing, transparent assessment records, and seamless council clearance.</p>
                        </div>
                    </div>
                    <div class="p-5 pt-0 border-t border-gray-50 flex items-center justify-between mt-2">
                        <span class="text-xs font-semibold text-forest-medium">Academic Affairs Registry</span>
                        <a href="<?php echo esc_url(home_url('/news')); ?>" class="text-xs font-bold text-orange-action hover:underline">Read Dispatch &rarr;</a>
                    </div>
                </article>
            </div>
        </div>
    </section>

    <!-- Prospectus CTA Section -->
    <section class="w-full py-16 bg-forest-base text-white relative overflow-hidden" id="prospectus">
        <div class="max-w-7xl mx-auto px-4 sm:px-8">
            <div class="bg-white text-gray-900 rounded-3xl p-8 sm:p-12 shadow-2xl">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div class="lg:col-span-8 space-y-4">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-tint text-forest-base text-xs uppercase font-bold">
                            <span class="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                            2026 / 2027 Academic Session
                        </div>
                        <h2 class="text-2xl sm:text-3xl font-extrabold text-forest-dark">
                            Download the Official CHEP Institutional Prospectus &amp; Charter
                        </h2>
                        <p class="text-sm sm:text-base text-text-muted leading-relaxed">
                            Get comprehensive details regarding the 3-Year Basic Nursing curriculum, NMCN entrance screening syllabus, clinical rotation schedules, fee schedules, geriatric certification options, and hostel lodging guidelines.
                        </p>
                    </div>

                    <div class="lg:col-span-4 flex flex-col items-center lg:items-end gap-3">
                        <a href="<?php echo esc_url(home_url('/admission')); ?>" class="chep-btn-primary w-full sm:w-auto text-sm px-6 py-4 shadow-lg">
                            <span class="material-symbols-outlined text-[20px]">how_to_reg</span>
                            Online Admission Portal
                        </a>
                        <span class="text-xs text-text-muted">Updated for 2026/2027 Admissions</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
