<?php
/**
 * Template Name: Contact & Campus Tours
 * Description: Campus coordinates, departmental directory, tour booking, and admissions inquiries
 */
get_header();

$directory = [
    [
        'dept' => 'Admissions & Candidates Secretariat',
        'person' => 'Academic Affairs Registry',
        'phone' => '+234 916 635 674',
        'rawPhone' => '+234916635674',
        'email' => 'admissions@chepnursingcollege.org',
        'hours' => 'Mon – Fri: 08:00 AM – 04:30 PM',
        'icon' => '📝',
    ],
    [
        'dept' => 'Bursary Directorate & Remita Desk',
        'person' => 'Student Accounts & Fee Clearances',
        'phone' => '+234 813 540 6714',
        'rawPhone' => '+2348135406714',
        'email' => 'bursary@chepnursingcollege.org',
        'hours' => 'Mon – Fri: 08:30 AM – 04:00 PM',
        'icon' => '💳',
    ],
    [
        'dept' => 'Clinical Training & Hospital Postings',
        'person' => 'Preceptorship Coordination Office',
        'phone' => '+234 916 635 674',
        'rawPhone' => '+234916635674',
        'email' => 'clinical@chepnursingcollege.org',
        'hours' => 'Mon – Sat: 07:30 AM – 06:00 PM',
        'icon' => '🏥',
    ],
    [
        'dept' => 'Office of the Provost & Senate Secretariat',
        'person' => 'Executive Protocol Desk',
        'phone' => '+234 813 540 6714',
        'rawPhone' => '+2348135406714',
        'email' => 'provost@chepnursingcollege.org',
        'hours' => 'By Official Institutional Appointment',
        'icon' => '🎓',
    ],
];

$faqs = [
    [
        'q' => 'Is CHEP College of Nursing Sciences fully accredited by NMCN?',
        'a' => 'Yes. CHEP College of Nursing Sciences, Ota holds statutory accreditation from the Nursing and Midwifery Council of Nigeria (NMCN) to conduct Basic Nursing and Post-Basic Midwifery educational curricula leading to professional license examinations.',
    ],
    [
        'q' => 'What are the minimum O’Level requirements for Basic Nursing?',
        'a' => 'Applicants must possess a minimum of five (5) credit passes in WAEC, NECO, or NABTEB obtained at not more than two sittings in: English Language, Mathematics, Biology, Chemistry, and Physics.',
    ],
    [
        'q' => 'Are male candidates eligible to apply for Basic Nursing?',
        'a' => 'Yes. Both male and female candidates are admitted into all collegiate nursing diploma and professional certification tracks.',
    ],
    [
        'q' => 'Where are the student hostel facilities located?',
        'a' => 'Secure on-campus student residential halls are located within the gated Agbebi Estate campus with 24/7 security, continuous water supply, and supervised study lounges.',
    ],
];
?>

<main class="min-h-screen bg-slate-50 pt-28 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-emerald-700">Home</a>
            <span>/</span>
            <span class="text-emerald-800">Contact &amp; Tours</span>
        </div>

        <div class="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 max-w-2xl">
                <span class="inline-block px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
                    Campus Visitations &amp; Registries
                </span>
                <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
                    Connect With Our Secretariat &amp; Schedule a Campus Tour
                </h1>
                <p class="text-slate-300 text-base leading-relaxed">
                    Have questions regarding 2026/2027 admissions, entrance screening dates, or transfer credits? Our academic registry is available to guide you.
                </p>
            </div>
        </div>
    </div>

    <!-- Departmental Directory Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="text-center max-w-xl mx-auto mb-10">
            <span class="text-xs font-extrabold uppercase tracking-widest text-emerald-700">Official Directories</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Institutional Contact Desks</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <?php foreach ($directory as $d): ?>
                <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex items-start gap-4">
                    <span class="text-3xl p-3 bg-emerald-50 rounded-2xl shrink-0"><?php echo esc_html($d['icon']); ?></span>
                    <div class="space-y-1">
                        <h3 class="text-base font-bold text-slate-900"><?php echo esc_html($d['dept']); ?></h3>
                        <p class="text-xs font-semibold text-emerald-700"><?php echo esc_html($d['person']); ?></p>
                        <p class="text-xs text-slate-600 font-mono pt-1">
                            📞 <a href="tel:<?php echo esc_attr($d['rawPhone']); ?>" class="hover:underline font-bold"><?php echo esc_html($d['phone']); ?></a>
                        </p>
                        <p class="text-xs text-slate-600 font-mono">
                            ✉️ <a href="mailto:<?php echo esc_attr($d['email']); ?>" class="hover:underline"><?php echo esc_html($d['email']); ?></a>
                        </p>
                        <p class="text-[11px] text-slate-400 pt-1">⏰ <?php echo esc_html($d['hours']); ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- Campus Tour Booking & Map Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- Booking Form -->
            <div class="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
                <span class="text-xs font-extrabold uppercase tracking-widest text-emerald-700">Prospective Students</span>
                <h2 class="text-2xl font-black text-slate-900 mt-1 mb-2">Book an Guided Campus Tour</h2>
                <p class="text-xs text-slate-600 mb-6">
                    Tour our high-fidelity anatomical skills laboratory, computer-based testing center, and residential dormitories.
                </p>

                <form id="chep-tour-form" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">Full Legal Name *</label>
                            <input type="text" required class="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600" placeholder="e.g. Blessing Adediran" />
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                            <input type="email" required class="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600" placeholder="candidate@gmail.com" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">Active Telephone *</label>
                            <input type="tel" required class="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600" placeholder="+234 800 000 0000" />
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">Prospective Program</label>
                            <select class="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600">
                                <option>Basic Nursing (3 Years ND/HND)</option>
                                <option>Post-Basic Midwifery (18 Months)</option>
                                <option>Public Health Nursing</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" class="w-full py-3.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md">
                        Confirm Campus Tour Schedule
                    </button>
                </form>

                <div id="tour-success-box" class="hidden mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs">
                    <strong class="block text-sm font-bold text-emerald-950">✓ Tour Schedule Confirmed!</strong>
                    <span>Your booking voucher has been registered. Please present your reference at the Security Gatehouse upon arrival.</span>
                </div>
            </div>

            <!-- Campus Location & Map Card -->
            <div class="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                    <span class="text-xs font-extrabold uppercase tracking-widest text-slate-500">Physical Coordinates</span>
                    <h3 class="text-xl font-black text-slate-900 mt-1">Main Campus Address</h3>
                    <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                        📍 <strong>No. 18 Agbebi Estate Road</strong>, Off Idiroko Expressway, Honda Bus Stop, Ota, Ogun State, Nigeria.
                    </p>
                </div>

                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
                    <div><strong>🚌 Major Transit Links:</strong> 15 mins from Tollgate Lagos-Ogun Border.</div>
                    <div><strong>🕒 Gatehouse Hours:</strong> Visitors received Mon–Sat, 8:00 AM – 5:00 PM.</div>
                    <div><strong>🛡️ Campus Protocol:</strong> Valid National ID or Student Screening Slip required.</div>
                </div>

                <a 
                    href="https://maps.google.com/?q=Ota+Ogun+State" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="block text-center py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
                >
                    Open in Google Maps Navigation ↗
                </a>
            </div>
        </div>
    </div>

    <!-- Institutional FAQs Accordion -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
            <span class="text-xs font-extrabold uppercase tracking-widest text-emerald-700">Frequently Asked Questions</span>
            <h2 class="text-2xl font-black text-slate-900 mt-1">Candidate Enquiries</h2>
        </div>

        <div class="space-y-3">
            <?php foreach ($faqs as $i => $faq): ?>
                <details class="group bg-white rounded-2xl border border-slate-200 p-5 cursor-pointer">
                    <summary class="font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between">
                        <span><?php echo esc_html($faq['q']); ?></span>
                        <span class="text-emerald-700 group-open:rotate-180 transition-transform text-lg">▾</span>
                    </summary>
                    <p class="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
                        <?php echo esc_html($faq['a']); ?>
                    </p>
                </details>
            <?php endforeach; ?>
        </div>
    </div>
</main>

<script>
document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("chep-tour-form");
    var successBox = document.getElementById("tour-success-box");
    if (form && successBox) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            form.style.display = "none";
            successBox.classList.remove("hidden");
        });
    }
});
</script>

<?php get_footer(); ?>
