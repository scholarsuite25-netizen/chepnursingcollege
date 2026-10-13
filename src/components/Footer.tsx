import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-forest-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Institutional Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/chep/chep_logo.png"
                alt="CHEP College of Nursing Sciences Crest"
                className="w-12 h-12 object-contain bg-white rounded-xl p-1 shadow-sm"
              />
              <div>
                <span className="font-bold text-lg text-white block leading-tight">
                  CHEP College
                </span>
                <span className="text-[11px] font-bold text-primary-fixed uppercase tracking-wider">
                  Nursing Sciences
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Fostering clinical distinction, empathetic patient-centered care, and rigorous academic excellence in nursing and healthcare sciences.
            </p>

            {/* Address & Dual Phone Call / WhatsApp Links */}
            <div className="pt-2 space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary-fixed text-[18px] mt-0.5 shrink-0">location_on</span>
                <span>No. 18, Agbebi Estate Road, Honda Bus-Stop, Agbebi Central CDA, Ota 102213, Ogun State.</span>
              </div>

              {/* Line 1: 0916 635 674 */}
              <div className="flex flex-wrap items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
                <span className="material-symbols-outlined text-emerald-400 text-[16px]">call</span>
                <a
                  href="tel:+234916635674"
                  className="hover:text-primary-fixed text-white font-semibold transition-colors"
                  title="Click to Call"
                >
                  +234 916 635 674
                </a>
                <span className="text-gray-500">•</span>
                <a
                  href="https://wa.me/234916635674?text=Hello%20CHEP%20Admissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded-md bg-emerald-600/40 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-[11px] font-bold transition-all inline-flex items-center gap-1"
                  title="Click to Chat on WhatsApp"
                >
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Line 2: 0813 540 6714 */}
              <div className="flex flex-wrap items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
                <span className="material-symbols-outlined text-teal-400 text-[16px]">phone_in_talk</span>
                <a
                  href="tel:+2348135406714"
                  className="hover:text-primary-fixed text-white font-semibold transition-colors"
                  title="Click to Call"
                >
                  +234 813 540 6714
                </a>
                <span className="text-gray-500">•</span>
                <a
                  href="https://wa.me/2348135406714?text=Hello%20CHEP%20Registry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded-md bg-emerald-600/40 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-[11px] font-bold transition-all inline-flex items-center gap-1"
                  title="Click to Chat on WhatsApp"
                >
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-fixed text-[18px]">mail</span>
                <a href="mailto:enquiries@chepnursingcollege.org" className="hover:text-primary-fixed transition-colors">
                  enquiries@chepnursingcollege.org
                </a>
              </div>
            </div>

            {/* Dynamic Social Media Channels */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary-fixed block mb-2">
                Connect on Official Channels:
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://wa.me/234916635674"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-600/30 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 flex items-center justify-center transition-all"
                  title="Official WhatsApp"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                </a>
                <a
                  href="https://facebook.com/chepnursingcollege"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white flex items-center justify-center transition-all font-bold text-xs"
                  title="Official Facebook"
                >
                  fb
                </a>
                <a
                  href="https://instagram.com/chepnursingcollege"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-pink-600/30 hover:bg-pink-600 text-pink-300 hover:text-white flex items-center justify-center transition-all font-bold text-xs"
                  title="Official Instagram"
                >
                  ig
                </a>
                <a
                  href="https://linkedin.com/school/chep-college-of-nursing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-sky-600/30 hover:bg-sky-600 text-sky-300 hover:text-white flex items-center justify-center transition-all font-bold text-xs"
                  title="Official LinkedIn"
                >
                  in
                </a>
                <a
                  href="https://youtube.com/@chepnursingcollege"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white flex items-center justify-center transition-all font-bold text-xs"
                  title="Official YouTube Channel"
                >
                  yt
                </a>
                <a
                  href="https://x.com/chepnursing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-white text-slate-300 hover:text-slate-900 flex items-center justify-center transition-all font-bold text-xs"
                  title="Official X / Twitter"
                >
                  𝕏
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white tracking-wide border-b border-white/10 pb-2">
              Academic &amp; Portals
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary-fixed transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary-fixed transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  About Us &amp; Leadership
                </Link>
              </li>
              <li>
                <Link href="/admission" className="text-gray-300 hover:text-primary-fixed transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  Admission Requirements
                </Link>
              </li>
              <li>
                <Link href="/exams" className="text-emerald-400 hover:text-white transition-colors flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-[16px]">task_alt</span>
                  CBT Exams &amp; OSCE Studio
                </Link>
              </li>
              <li>
                <Link href="/clinical-reflections" className="text-teal-300 hover:text-white transition-colors flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
                  Clinical Reflective Forum
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-primary-fixed transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  Campus Facilities Gallery
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-primary-fixed transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  Institutional News
                </Link>
              </li>
              <li>
                <Link href="/verify" className="text-gray-300 hover:text-primary-fixed transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  NMCN Credential Verification
                </Link>
              </li>
              <li>
                <Link href="/admission/slip" className="text-gray-300 hover:text-primary-fixed transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  Screening Slip &amp; Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Virtual Library */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white tracking-wide border-b border-white/10 pb-2">
              Virtual Library (480+ Open Res)
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/library" className="text-gray-300 hover:text-primary-fixed transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  CHEP Library Home
                </Link>
              </li>
              <li>
                <Link href="/exams" className="text-emerald-300 hover:text-white transition-colors flex items-center gap-1.5 font-semibold">
                  <span className="material-symbols-outlined text-[16px]">quiz</span>
                  CBT MCQs &amp; OSCE Practical
                </Link>
              </li>
              <li>
                <Link href="/library#ebooks" className="text-gray-300 hover:text-primary-fixed transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  Clinical eBooks (240+ Texts)
                </Link>
              </li>
              <li>
                <Link href="/library#ejournals" className="text-gray-300 hover:text-primary-fixed transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  Peer-Reviewed eJournals (240+)
                </Link>
              </li>
              <li>
                <Link href="/library#ai-tools" className="text-primary-fixed hover:text-white transition-colors flex items-center gap-1.5 font-semibold">
                  <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                  AI Nursing Care-Plan Studio
                </Link>
              </li>
              <li>
                <Link href="/library#databases" className="text-gray-300 hover:text-primary-fixed transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  Global Medical Consortia
                </Link>
              </li>
              <li>
                <Link href="/library#services" className="text-gray-300 hover:text-primary-fixed transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  Physical Stack Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Recent Dispatches */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white tracking-wide border-b border-white/10 pb-2">
              Institutional Updates
            </h3>
            <div className="space-y-3">
              <Link href="/news" className="group block">
                <span className="text-xs font-bold text-primary-fixed uppercase tracking-wider block">
                  Admissions 2026/2027
                </span>
                <p className="text-xs text-gray-300 group-hover:text-white transition-colors mt-0.5">
                  Nursing Council announces entrance screening schedule.
                </p>
              </Link>
              <Link href="/news" className="group block">
                <span className="text-xs font-bold text-primary-fixed uppercase tracking-wider block">
                  Clinical Outreach
                </span>
                <p className="text-xs text-gray-300 group-hover:text-white transition-colors mt-0.5">
                  CHEP student cohort conducts geriatric health assessments.
                </p>
              </Link>
              <Link href="/news" className="group block">
                <span className="text-xs font-bold text-primary-fixed uppercase tracking-wider block">
                  Facility Milestone
                </span>
                <p className="text-xs text-gray-300 group-hover:text-white transition-colors mt-0.5">
                  High-fidelity anatomy simulation laboratory officially commissioned.
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 CHEP College of Nursing Sciences. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-primary-fixed transition-colors">Privacy Policy</Link>
            <Link href="/admission" className="hover:text-primary-fixed transition-colors">Terms of Admission</Link>
            <Link href="/about" className="hover:text-primary-fixed transition-colors">NMCN Accreditation</Link>
            <Link href="/contact" className="hover:text-primary-fixed transition-colors">Campus Tour</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
