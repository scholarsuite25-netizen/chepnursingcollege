<?php
/**
 * Template Name: About Us & Leadership
 * Description: Heritage, leadership, NMCN accreditation, and affiliated hospital network
 */
get_header();

$leadership = [
    [
        'name' => 'Prof. Stella O. Ayowole',
        'role' => 'Provost & Academic Director',
        'qualifications' => 'RN, RM, B.N.Sc, M.Sc, PhD, FWACN',
        'bio' => 'Academic Director spearheading competency-based nursing curricula in full compliance with NMCN council directives.',
        'image' => chep_asset('images/provost.png'),
    ],
    [
        'name' => 'Akinkuebi Olawunmi Esther',
        'role' => 'Senior Academic Lecturer',
        'qualifications' => 'RN, RM, B.N.Sc (Nursing Sciences)',
        'bio' => 'Directs foundational nursing instruction, aseptic procedures, and medical-surgical nursing coursework.',
        'image' => chep_asset('images/lecturer_akinkuebi.png'),
    ],
    [
        'name' => 'Jojolade Adeboye Ismail',
        'role' => 'Lecturer & Clinical Instructor',
        'qualifications' => 'B.N.Sc, M.Sc (Clinical Practicum)',
        'bio' => 'Oversees pre-clinical student preparation, patient ward simulation, and preceptor rotations across hospital partners.',
        'image' => chep_asset('images/lecturer_jojolade.png'),
    ],
    [
        'name' => 'Chika Maryjane',
        'role' => 'Lecturer & Skills Lab Coordinator',
        'qualifications' => 'RN, B.N.Sc (Health Science)',
        'bio' => 'Manages anatomical models, high-fidelity manikin simulators, and OSCE objective clinical examination assessments.',
        'image' => chep_asset('images/lecturer_chika.png'),
    ],
    [
        'name' => 'Urom Elisha Samuel',
        'role' => 'Lecturer • Biological Sciences',
        'qualifications' => 'M.Sc (Human Anatomy & Physiology)',
        'bio' => 'Senior tutor in macroscopic anatomy, pathology, pharmacology fundamentals, and bio-chemical science courses.',
        'image' => chep_asset('images/lecturer_urom.png'),
    ],
    [
        'name' => 'Isikwei Success Isioma',
        'role' => 'Lecturer • Maternal & Child Health',
        'qualifications' => 'RM, B.N.Sc (Midwifery Specialty)',
        'bio' => 'Coordinates reproductive health, antenatal and postnatal care practicum, and high-risk obstetric case simulations.',
        'image' => chep_asset('images/lecturer_isikwei.png'),
    ],
];

$boardOfTrustees = [
    [
        'name' => 'Chief (Dr.) Olusegun Agbebi',
        'position' => 'Chairman, Board of Trustees',
        'desc' => 'Healthcare philanthropist and visionary founder of the Agbebi Central Health Endowment.',
    ],
    [
        'name' => 'Alhaja (Nurse) Aminat Danmole',
        'position' => 'Trustee & NMCN Fellow',
        'desc' => 'Distinguished Fellow of the West African College of Nursing and former National Chief Nursing Officer.',
    ],
    [
        'name' => 'Barrister Tunde Olawale (SAN)',
        'position' => 'Legal Adviser & Board Secretary',
        'desc' => 'Senior Advocate of Nigeria specializing in healthcare policy, medical jurisprudence, and tertiary governance.',
    ],
    [
        'name' => 'Dr. (Mrs.) Folashade Banjoko',
        'position' => 'Trustee & Public Health Pioneer',
        'desc' => 'Senior Epidemiologist advising national maternal-child health task forces.',
    ],
];

$affiliatedHospitals = [
    [
        'name' => 'State Hospital, Ota',
        'type' => 'Secondary Referral Hospital',
        'units' => 'Accident & Emergency, Labor Ward, Surgical Unit, Pediatric Annex',
        'distance' => '3.8 km from Campus',
    ],
    [
        'name' => 'Olabisi Onabanjo University Teaching Hospital (OOUTH)',
        'type' => 'Tertiary Teaching Hospital (Sagamu)',
        'units' => 'Intensive Care Unit (ICU), Dialysis Center, Neonatology, Cardiology',
        'distance' => 'Clinical Residency Partner',
    ],
    [
        'name' => 'General Hospital, Ifo',
        'type' => 'Public District Hospital',
        'units' => 'Community Health Outreach, Antenatal Clinics, Orthopedic Care',
        'distance' => '12.4 km from Campus',
    ],
    [
        'name' => 'Sacred Heart Hospital, Lantoro (Abeokuta)',
        'type' => 'Historic Clinical Partner',
        'units' => 'Mental Health & Psychiatric Rotations, Maternal Wellness Care',
        'distance' => 'Specialist Clinical Affiliate',
    ],
];
?>

<main class="min-h-screen bg-slate-50 pt-28 pb-20">
    <!-- Breadcrumb & Hero -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-emerald-700">Home</a>
            <span>/</span>
            <span class="text-emerald-800">About Us &amp; Governance</span>
        </div>
        <div class="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div class="absolute -right-10 -bottom-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div class="relative z-10 max-w-3xl">
                <span class="inline-block px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
                    Statutory Institutional Profile
                </span>
                <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
                    Pioneering Excellence in Nigerian &amp; Global Healthcare Education
                </h1>
                <p class="text-slate-300 text-base sm:text-lg leading-relaxed">
                    CHEP College of Nursing Sciences, Ota is an accredited tertiary institution chartered by the Nursing and Midwifery Council of Nigeria (NMCN) to train the next generation of clinical practitioners, nurse leaders, and midwife specialists.
                </p>
            </div>
        </div>
    </div>

    <!-- Core Philosophy: Vision, Mission, Values -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-bold mb-6">
                    🎯
                </div>
                <h2 class="text-xl font-black text-slate-900 mb-3">Institutional Vision</h2>
                <p class="text-slate-600 text-sm leading-relaxed">
                    To be the foremost African center of excellence in collegiate nursing education, recognized internationally for clinically proficient, ethical, and evidence-driven nurse leaders.
                </p>
            </div>

            <div class="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div class="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-2xl font-bold mb-6">
                    🩺
                </div>
                <h2 class="text-xl font-black text-slate-900 mb-3">Our Core Mission</h2>
                <p class="text-slate-600 text-sm leading-relaxed">
                    To deliver rigorous clinical simulations, holistic patient care principles, and transformative technological competencies that empower graduates to excel in diverse healthcare environments worldwide.
                </p>
            </div>

            <div class="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl font-bold mb-6">
                    ⚖️
                </div>
                <h2 class="text-xl font-black text-slate-900 mb-3">Pillars of Practice</h2>
                <p class="text-slate-600 text-sm leading-relaxed">
                    Uncompromising integrity, clinical empathy, aseptic rigor, professional accountability, and life-saving decisive competence under statutory NMCN protocols.
                </p>
            </div>
        </div>
    </div>

    <!-- Academic Leadership & Faculty Roster -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="text-center max-w-2xl mx-auto mb-12">
            <span class="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Academic Leadership
            </span>
            <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                Distinguished Faculty &amp; Clinical Instructors
            </h2>
            <p class="text-slate-600 text-sm mt-2">
                Our faculty combines decades of tertiary hospital leadership, published nursing research, and bedside clinical mastery.
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($leadership as $person): ?>
                <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col">
                    <div class="h-64 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                        <img 
                            src="<?php echo esc_url($person['image']); ?>" 
                            alt="<?php echo esc_attr($person['name']); ?>" 
                            class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div class="p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-lg font-bold text-slate-900"><?php echo esc_html($person['name']); ?></h3>
                            <p class="text-xs font-semibold text-emerald-800 mt-0.5"><?php echo esc_html($person['role']); ?></p>
                            <span class="inline-block mt-2 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-mono font-medium">
                                <?php echo esc_html($person['qualifications']); ?>
                            </span>
                            <p class="text-xs text-slate-600 mt-3 leading-relaxed">
                                <?php echo esc_html($person['bio']); ?>
                            </p>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- Board of Trustees & Governance -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
            <div class="text-center max-w-xl mx-auto mb-10">
                <span class="text-xs font-extrabold uppercase tracking-widest text-slate-500">Institutional Governance</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">Board of Trustees</h2>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <?php foreach ($boardOfTrustees as $trustee): ?>
                    <div class="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-300 transition-colors">
                        <span class="w-8 h-8 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center mb-3">
                            ✓
                        </span>
                        <h3 class="text-sm font-bold text-slate-900"><?php echo esc_html($trustee['name']); ?></h3>
                        <p class="text-[11px] font-semibold text-emerald-700 mt-0.5"><?php echo esc_html($trustee['position']); ?></p>
                        <p class="text-xs text-slate-600 mt-2 leading-relaxed"><?php echo esc_html($trustee['desc']); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- Clinical Training Hospital Network -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Clinical Rotations
            </span>
            <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                Affiliated Hospital Network
            </h2>
            <p class="text-slate-600 text-sm mt-2">
                Mandatory ward rotations expose students to real-world trauma, neonatal, surgical, and community healthcare.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <?php foreach ($affiliatedHospitals as $hospital): ?>
                <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex items-start gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl shrink-0 font-bold">
                        🏥
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h3 class="text-base sm:text-lg font-bold text-slate-900"><?php echo esc_html($hospital['name']); ?></h3>
                        </div>
                        <span class="inline-block mt-1 text-xs font-semibold text-emerald-700">
                            <?php echo esc_html($hospital['type']); ?> • <?php echo esc_html($hospital['distance']); ?>
                        </span>
                        <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                            <strong class="text-slate-700">Training Units:</strong> <?php echo esc_html($hospital['units']); ?>
                        </p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- College Anthem -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl border border-emerald-800">
            <span class="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">Institutional Anthem</span>
            <h2 class="text-2xl sm:text-3xl font-black mt-2 mb-6">The Song of Healing Hands</h2>
            <div class="space-y-4 text-emerald-100 text-sm sm:text-base leading-relaxed italic max-w-xl mx-auto">
                <p>
                    From Agbebi’s sacred grounds we rise,<br />
                    With caring hearts and watchful eyes.<br />
                    To heal the sick, to soothe the pain,<br />
                    In sunshine, storm, in grief and rain.
                </p>
                <p class="font-bold text-white not-italic text-sm">
                    CHEP College, light of Southwest land,<br />
                    We pledge our faith and skillful hand!<br />
                    Integrity, knowledge, compassion bold,<br />
                    More precious than the finest gold!
                </p>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>
