<?php
/**
 * Template Name: Gallery Showcase
 *
 * @package CHEP_Nursing
 */

get_header();

// Authentic Gallery Exhibits Data
$gallery_items = array(
    // Matriculation (7 items)
    array(
        'category' => 'matriculation',
        'badge' => 'Matriculation Induction',
        'station' => 'Assembly & Oath',
        'title' => 'Matriculation Ceremony • Grand Induction of Nursing Scholars',
        'location' => 'College Auditorium • Ota Campus',
        'image' => chep_asset('images/chep_matric_1.jpg'),
        'desc' => 'Annual matriculation ceremony capturing student nurses undertaking the ceremonial Nightingale pledge and formal academic investiture in the college auditorium.'
    ),
    array(
        'category' => 'matriculation',
        'badge' => 'Matriculation Milestone',
        'station' => 'Scholar Investiture',
        'title' => 'Ceremonial Investiture & Academic Gown Portrait',
        'location' => 'Academic Quadrangle • Ota',
        'image' => chep_asset('images/chep_matric_2.jpg'),
        'desc' => 'Proud student nurse inductee in official green and gold collegiate academic gown following formal matriculation ceremonies.'
    ),
    array(
        'category' => 'matriculation',
        'badge' => 'Matriculation Rite',
        'station' => 'Nightingale Lamp',
        'title' => 'Council Florence Nightingale Pledge & Lamp Lighting',
        'location' => 'Main Stage • CHEP Auditorium',
        'image' => chep_asset('images/chep_matric_3.jpg'),
        'desc' => 'Nursing inductees holding symbolic lamps during the solemn recitation of the International Nursing Pledge before the College Senate.'
    ),
    array(
        'category' => 'matriculation',
        'badge' => 'Matriculation Cohort',
        'station' => 'Senate Procession',
        'title' => 'Official Matriculation Class Procession & Cohort Assembly',
        'location' => 'CHEP Main Academic Enclave',
        'image' => chep_asset('images/chep_matric_4.jpg'),
        'desc' => 'The entire matriculation cohort assembling with faculty heads and administrative directors for the official session group photograph.'
    ),
    array(
        'category' => 'matriculation',
        'badge' => 'Matriculation Honour',
        'station' => 'Inductee Portrait',
        'title' => 'Student Inductee in Emerald Ceremonial Regalia',
        'location' => 'College Quadrangle',
        'image' => chep_asset('images/chep_matric_5.jpg'),
        'desc' => 'A scholar portrait radiating enthusiasm and commitment to compassionate healthcare delivery across Nigerian hospitals.'
    ),
    array(
        'category' => 'matriculation',
        'badge' => 'Matriculation Jubilee',
        'station' => 'Family Convocation',
        'title' => 'Matriculation Scholars & Proud Families Academic Celebration',
        'location' => 'Auditorium Annex • Ota',
        'image' => chep_asset('images/chep_matric_6.jpg'),
        'desc' => 'Families, sponsors, and preceptors joining new student nurses to commemorate their admission into the Nursing and Midwifery Council register.'
    ),
    array(
        'category' => 'matriculation',
        'badge' => 'Matriculation Council',
        'station' => 'Senate Commemoration',
        'title' => 'Academic Senate & Matriculating Scholars Commemorative Session',
        'location' => 'Ota Collegiate Compound',
        'image' => chep_asset('images/chep_matric_7.jpg'),
        'desc' => 'CHEP College governing board and faculty members standing alongside matriculants at the conclusion of the 2026/2027 matriculation ceremony.'
    ),

    // Geriatric Care Outreach (7 items)
    array(
        'category' => 'geriatric',
        'badge' => 'Elderly Health Outreach',
        'station' => 'Clinical Screening',
        'title' => 'Comprehensive Geriatric Health Assessment & Elder Support',
        'location' => 'Community Outreach Clinic, Ogun State',
        'image' => chep_asset('images/chep_geriatrics_1.jpg'),
        'desc' => 'CHEP student nurses conducting blood pressure profiling, blood sugar monitoring, and holistic health checks for senior community citizens.'
    ),
    array(
        'category' => 'geriatric',
        'badge' => 'Specialized Care',
        'station' => 'Vital Monitoring',
        'title' => 'Bedside Geriatric Care & Vital Signs Monitoring',
        'location' => 'Geriatric Ward Annex',
        'image' => chep_asset('images/chep_geriatrics_2.jpg'),
        'desc' => 'Direct bedside clinical evaluation of elderly patients, mastering compassionate communication, pressure ulcer prevention, and medication adherence.'
    ),
    array(
        'category' => 'geriatric',
        'badge' => 'Rehabilitative Therapy',
        'station' => 'Elder Care Unit',
        'title' => 'Senior Patient Physical Rehabilitation & Mobility Therapy',
        'location' => 'Geriatric Wellness Center',
        'image' => chep_asset('images/chep_geriatrics_3.jpg'),
        'desc' => 'Student nurses guiding senior patients through gentle range-of-motion routines and physical therapy exercises to enhance functional independence.'
    ),
    array(
        'category' => 'geriatric',
        'badge' => 'Palliative Consultation',
        'station' => 'Community Nursing',
        'title' => 'Community Elder Diagnostic Consultation & Counseling',
        'location' => 'Ota Primary Care Outreach Post',
        'image' => chep_asset('images/chep_geriatrics_4.jpg'),
        'desc' => 'Community health clinical rotation focusing on chronic illness management, emotional well-being, and social support for elderly dwellers.'
    ),
    array(
        'category' => 'geriatric',
        'badge' => 'Clinical Rotation',
        'station' => 'Geriatric Practicum',
        'title' => 'Specialized Geriatric Nursing Fieldwork Practicum',
        'location' => 'Rural Health Centre • Ogun State',
        'image' => chep_asset('images/chep_geriatrics_5.jpg'),
        'desc' => 'Field preceptors reviewing patient documentation, geriatric syndromes, and individual nursing care plans with student trainees.'
    ),
    array(
        'category' => 'geriatric',
        'badge' => 'Health Surveillance',
        'station' => 'Medication Regimen',
        'title' => 'Elderly Nutrition, Medication & Health Tracking',
        'location' => 'Community Field Post',
        'image' => chep_asset('images/chep_geriatrics_6.jpg'),
        'desc' => 'Providing dietary guidance, chronic disease monitoring, and preventive geriatric counseling directly in local homes.'
    ),
    array(
        'category' => 'geriatric',
        'badge' => 'Palliative Care',
        'station' => 'Bedside Empathy',
        'title' => 'Holistic Elder Compassion & Palliative Support Practicum',
        'location' => 'Outreach Clinic Suite',
        'image' => chep_asset('images/chep_geriatrics_7.jpg'),
        'desc' => 'Instilling deep respect and attentive listening as CHEP scholars spend dedicated hours attending to elderly patients.'
    ),

    // Disaster Drills (6 items)
    array(
        'category' => 'disaster',
        'badge' => 'Emergency Response',
        'station' => 'Triage Simulation',
        'title' => 'Emergency Triage & Trauma Response Simulation Drill',
        'location' => 'Clinical Demonstrations Annex • Ota Campus',
        'image' => chep_asset('images/disaster_training_1.jpg'),
        'desc' => 'Intensive multi-casualty drill where student nurses execute rapid triage colour-coding, airway stabilization, and emergency hemorrhage control.'
    ),
    array(
        'category' => 'disaster',
        'badge' => 'Disaster Readiness',
        'station' => 'Emergency Evacuation',
        'title' => 'Rapid Patient Evacuation & Stretcher Handling Drills',
        'location' => 'Trauma Drill Ground',
        'image' => chep_asset('images/disaster_training_2.jpg'),
        'desc' => 'Physical endurance and tactical coordination practice for safely transporting critical patients from disaster incident scenes to ambulances.'
    ),
    array(
        'category' => 'disaster',
        'badge' => 'Disaster Nursing Week',
        'station' => 'Field Triage',
        'title' => 'Annual Disaster Preparedness Week • Simulation Scenario',
        'location' => 'Campus Demonstrations Quadrangle',
        'image' => chep_asset('images/disaster_week.jpg'),
        'desc' => 'Coordinated campus-wide disaster exercise simulating industrial emergency and road traffic crash triage under real-time clinical pressure.'
    ),
    array(
        'category' => 'disaster',
        'badge' => 'Trauma Protocol',
        'station' => 'Disaster Fieldwork',
        'title' => 'Mass-Casualty Incident Coordination & Triage Prioritization',
        'location' => 'Clinical Simulation Annex',
        'image' => chep_asset('images/disaster_week_2.jpg'),
        'desc' => 'Clinical tutors supervising candidates as they prioritize immediate intervention cases versus delayed observation protocols.'
    ),
    array(
        'category' => 'disaster',
        'badge' => 'Critical Care',
        'station' => 'Field Demonstration',
        'title' => 'Emergency First Aid & Splinting Field Demonstration',
        'location' => 'Trauma Field Post',
        'image' => chep_asset('images/disaster_week_3.jpg'),
        'desc' => 'Applying improvised and specialized splints, cervical collars, and burn dressings during simulated disaster scenarios.'
    ),
    array(
        'category' => 'disaster',
        'badge' => 'Drill Debrief',
        'station' => 'Clinical Review',
        'title' => 'Multi-Disciplinary Emergency Team Briefing & Drill Review',
        'location' => 'Simulation Command Center',
        'image' => chep_asset('images/disaster_week_4.jpg'),
        'desc' => 'Post-drill evaluation where nursing instructors and paramedic evaluators analyze response times and team communication.'
    ),

    // CBT & Examination (2 items)
    array(
        'category' => 'cbt-exam',
        'badge' => 'Academic Integrity',
        'station' => 'CBT Examination',
        'title' => 'NMCN Computer-Based Testing (CBT) & Assessment Hall',
        'location' => 'Main Auditorium Examination Wing',
        'image' => chep_asset('images/examination_hall.jpg'),
        'desc' => 'Standardized proctored computer-based test hall where student nurses undertake continuous council assessments in an atmosphere of strict academic probity.'
    ),
    array(
        'category' => 'cbt-exam',
        'badge' => 'Virtual Integration',
        'station' => 'E-Library Station',
        'title' => 'Fiber-Broadband Digital Library & Virtual OPAC Workstations',
        'location' => 'ICT Center, Ota Campus',
        'image' => chep_asset('images/ict_center.jpg'),
        'desc' => 'High-speed digital learning lab providing instant terminal access to PubMed journals, OPAC catalogues, and interactive medical simulations.'
    ),

    // Campus Life (4 items)
    array(
        'category' => 'campus-life',
        'badge' => 'Nurses Week Gala',
        'station' => 'Campus Life',
        'title' => 'Annual International Nurses Week Celebration & Professional Parade',
        'location' => 'CHEP Academic Quadrangle',
        'image' => chep_asset('images/nurses_week_1.jpg'),
        'desc' => 'Scholars, alumni, and clinical tutors uniting for the colourful annual International Nurses Week symposium and professional procession in Ota.'
    ),
    array(
        'category' => 'campus-life',
        'badge' => 'Clinical Cohort',
        'station' => 'Collegiate Life',
        'title' => 'Student Nurses in Official Clinical Emerald Uniforms',
        'location' => 'Main Campus Walkway',
        'image' => chep_asset('images/students_green_scrubs.jpg'),
        'desc' => 'CHEP scholars proudly sporting their trademark emerald scrubs between morning laboratory simulations and hospital ward postings.'
    ),
    array(
        'category' => 'campus-life',
        'badge' => 'Student Fellowship',
        'station' => 'Administrative Wing',
        'title' => 'Active Student Nurse Cohort in Front of Administrative Wing',
        'location' => 'No. 18, Agbebi Estate Road, Ota',
        'image' => chep_asset('images/students_chep.jpeg'),
        'desc' => 'A group of active CHEP candidates standing before the college administrative headquarters, demonstrating collegiate unity and pride.'
    ),
    array(
        'category' => 'campus-life',
        'badge' => 'Architectural Enclave',
        'station' => 'Collegiate Compound',
        'title' => 'CHEP Multi-Storey Main Academic & Laboratory Complex',
        'location' => 'Main Campus • Idiroko Corridor, Ota',
        'image' => chep_asset('images/building.png'),
        'desc' => 'Architectural front view of the purpose-built CHEP tertiary health education complex housing classrooms, anatomy suites, and administrative chambers.'
    ),
);
?>

<main class="w-full pt-20 bg-surface-canvas min-h-screen">
    <!-- Header Banner -->
    <section class="w-full bg-forest-dark text-white py-16 px-4 sm:px-8">
        <div class="max-w-7xl mx-auto space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-primary-fixed text-xs font-bold uppercase tracking-wider">
                <span class="material-symbols-outlined text-[16px]">photo_library</span>
                Visual Chronicle • Ota Campus
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                CHEP Campus Life &amp; Clinical Training in Pictures
            </h1>
            <p class="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed">
                Step inside our collegiate compound at No. 18, Agbebi Estate Road, Honda Bus-Stop, Ota. Explore precision anatomy laboratories, vibrant student matriculations, intensive hospital rotations, and community health outposts.
            </p>
        </div>
    </section>

    <!-- Category Filters Bar -->
    <section class="sticky top-20 z-40 w-full bg-white shadow-xs py-3 px-4 sm:px-8 border-b border-border-subtle">
        <div class="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1">
            <button class="chep-gallery-filter-btn bg-forest-base text-white px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shadow-md flex items-center gap-1.5" data-filter="all">
                <span class="material-symbols-outlined text-[16px]">view_quilt</span> All Media (26)
            </button>
            <button class="chep-gallery-filter-btn bg-white text-gray-700 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border border-border-subtle flex items-center gap-1.5" data-filter="matriculation">
                <span class="material-symbols-outlined text-[16px]">school</span> Matriculation &amp; Induction (7)
            </button>
            <button class="chep-gallery-filter-btn bg-white text-gray-700 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border border-border-subtle flex items-center gap-1.5" data-filter="geriatric">
                <span class="material-symbols-outlined text-[16px]">volunteer_activism</span> Geriatric Care Outreach (7)
            </button>
            <button class="chep-gallery-filter-btn bg-white text-gray-700 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border border-border-subtle flex items-center gap-1.5" data-filter="disaster">
                <span class="material-symbols-outlined text-[16px]">emergency</span> Disaster &amp; Trauma Drills (6)
            </button>
            <button class="chep-gallery-filter-btn bg-white text-gray-700 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border border-border-subtle flex items-center gap-1.5" data-filter="cbt-exam">
                <span class="material-symbols-outlined text-[16px]">devices</span> CBT &amp; Examination (2)
            </button>
            <button class="chep-gallery-filter-btn bg-white text-gray-700 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border border-border-subtle flex items-center gap-1.5" data-filter="campus-life">
                <span class="material-symbols-outlined text-[16px]">groups</span> Campus Life (4)
            </button>
        </div>
    </section>

    <!-- Gallery Grid -->
    <section class="w-full py-12 px-4 sm:px-8 bg-surface-canvas">
        <div class="max-w-7xl mx-auto space-y-6">
            <div class="flex items-center justify-between">
                <span class="text-xs uppercase tracking-wider text-forest-medium font-bold">Verified Visual Exhibits</span>
                <span class="text-xs text-text-muted">Showing 26 Curated Exhibits</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($gallery_items as $item): ?>
                    <article class="chep-gallery-card group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-border-subtle flex flex-col justify-between cursor-pointer"
                             data-category="<?php echo esc_attr($item['category']); ?>"
                             data-title="<?php echo esc_attr($item['title']); ?>"
                             data-desc="<?php echo esc_attr($item['desc']); ?>"
                             data-badge="<?php echo esc_attr($item['badge']); ?>"
                             data-location="<?php echo esc_attr($item['location']); ?>">
                        <div class="relative h-64 overflow-hidden bg-gray-100">
                            <img src="<?php echo esc_url($item['image']); ?>" alt="<?php echo esc_attr($item['title']); ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" style="background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);"></div>
                            <div class="absolute top-3 left-3">
                                <span class="bg-forest-base text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                                    <?php echo esc_html($item['badge']); ?>
                                </span>
                            </div>
                            <div class="absolute bottom-3 left-3 right-3 text-white">
                                <span class="text-[11px] uppercase tracking-wider text-primary-fixed block font-bold"><?php echo esc_html($item['station']); ?></span>
                                <h3 class="text-sm font-bold text-white leading-snug line-clamp-2"><?php echo esc_html($item['title']); ?></h3>
                            </div>
                        </div>
                        <div class="p-4 flex items-center justify-between text-xs text-text-muted bg-white">
                            <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-forest-base">location_on</span><?php echo esc_html($item['location']); ?></span>
                            <span class="text-orange-action font-semibold flex items-center gap-0.5">View <span class="material-symbols-outlined text-[16px]">fullscreen</span></span>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Lightbox Modal -->
    <div id="chep-gallery-lightbox" class="chep-lightbox-backdrop">
        <div class="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl" onclick="event.stopPropagation()">
            <button id="chep-lightbox-close" class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors">
                <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div class="w-full bg-black flex items-center justify-center" style="height: 480px;">
                <img id="chep-lightbox-img" src="" alt="Full view" class="w-full h-full object-contain">
            </div>
            <div class="p-6 space-y-2">
                <div class="flex items-center gap-2">
                    <span id="chep-lightbox-badge" class="px-2.5 py-1 rounded-full bg-emerald-light text-emerald-accent text-xs font-bold uppercase">Badge</span>
                    <span id="chep-lightbox-location" class="text-xs text-text-muted">Location</span>
                </div>
                <h3 id="chep-lightbox-title" class="text-xl font-bold text-forest-dark">Title</h3>
                <p id="chep-lightbox-desc" class="text-sm text-text-muted leading-relaxed">Description</p>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>
