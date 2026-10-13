"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const trustees = [
    {
      name: "Chief (Dr.) Olusegun Agbebi",
      role: "Chairman, Board of Trustees",
      credentials: "MBBS, FWACS. Healthcare Philanthropist & Founder, Agbebi Central Health Endowment.",
      image: "/images/chep/building.png",
      badge: "Institutional Governance",
    },
    {
      name: "Dr. (Mrs.) Folashade Banjoko",
      role: "Trustee • Clinical Standards",
      credentials: "B.Sc, M.Sc, PhD (Public Health). Advisor on Epidemiological Surveillance and NMCN Accreditation.",
      image: "/images/chep/safety_exercise.png",
      badge: "Pedagogy & Accreditations",
    },
    {
      name: "Barrister Tunde Olawale (SAN)",
      role: "Trustee • Legal & Ethics",
      credentials: "LL.B (Hons), BL, LL.M. Healthcare Policy, Medical Jurisprudence & Tertiary Statutes.",
      image: "/images/chep/campus_event_chep14.jpeg",
      badge: "Legal & Institutional Ethics",
    },
    {
      name: "Alhaja (Nurse) Aminat Danmole",
      role: "Trustee • Nursing Fellow",
      credentials: "FWACN, RN, RM. Distinguished Fellow of the West African College of Nursing.",
      image: "/images/chep/students_green_scrubs.jpg",
      badge: "Professional Standards",
    },
  ];

  const managementTeam = [
    {
      name: "Akinkuebi Olawunmi Esther",
      role: "Senior Academic Lecturer",
      degree: "RN, RM, B.N.Sc",
      area: "Core Nursing Sciences",
      image: "/images/chep/lecturer_akinkuebi.png",
    },
    {
      name: "Jojolade Adeboye Ismail",
      role: "Lecturer & Clinical Instructor",
      degree: "B.N.Sc, M.Sc",
      area: "Clinical Preceptorship",
      image: "/images/chep/lecturer_jojolade.png",
    },
    {
      name: "Chika Maryjane",
      role: "Lecturer & Lab Coordinator",
      degree: "RN, B.N.Sc",
      area: "Skills Simulation",
      image: "/images/chep/lecturer_chika.png",
    },
    {
      name: "Urom Elisha Samuel",
      role: "Lecturer • Biological Sciences",
      degree: "M.Sc (Anatomy & Physiology)",
      area: "Anatomical Sciences",
      image: "/images/chep/lecturer_urom.png",
    },
    {
      name: "Isikwei Success Isioma",
      role: "Lecturer • Maternal & Child Health",
      degree: "RM, B.N.Sc",
      area: "Midwifery Practicum",
      image: "/images/chep/lecturer_isikwei.png",
    },
    {
      name: "Ogunmuyiwa Ayodeji",
      role: "Lecturer • Community Health",
      degree: "CHO, B.Sc (Public Health)",
      area: "Epidemiological Outreach",
      image: "/images/chep/lecturer_ogunmuyiwa.png",
    },
  ];

  const facilities = [
    {
      title: "Advanced Anatomy & Science Labs",
      subtitle: "Scientific Hub",
      badge: "Microbiology & Anatomy",
      desc: "Cutting-edge technology, high-precision microscopes, and anatomical models for biochemistry, pathology, and anatomy.",
      image: "/images/chep/laboratory.jpg",
    },
    {
      title: "ICT Center & Virtual Library",
      subtitle: "Virtual Integration",
      badge: "Librarika OPAC & eJournals",
      desc: "Dedicated fiber broadband workstations providing instant access to OPAC catalogs, clinical eBooks, and PubMed journal databases.",
      image: "/images/chep/ict_center.jpg",
    },
    {
      title: "Clinical Demonstration Wards",
      subtitle: "Pre-Clinical Mastery",
      badge: "High-Fidelity Simulators",
      desc: "Realistic hospital simulation ward outfitted with patient beds, emergency crash carts, oxygen ports, and pediatric incubators.",
      image: "/images/chep/safety_exercise.png",
    },
    {
      title: "Ultra-Modern Hostels",
      subtitle: "Residential Living",
      badge: "24/7 Security & Power",
      desc: "Safe, comfortable dormitories with 24/7 security surveillance, treated water access, uninterrupted solar backup, and study lounges.",
      image: "/images/chep/dormitory.jpg",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="w-full pt-20 bg-surface-canvas">
        {/* Top Breadcrumb & Institutional Authority */}
        <section className="w-full bg-white py-3 border-b border-border-subtle shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between text-xs sm:text-sm text-text-muted">
            <nav className="flex items-center gap-2">
              <Link href="/" className="hover:text-forest-base transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">home</span>Home
              </Link>
              <span>/</span>
              <span className="text-forest-base font-semibold">About Us &amp; Leadership</span>
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-light text-emerald-accent text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                NMCN Accredited Institution
              </span>
              <span className="text-xs uppercase tracking-wide text-text-muted">Est. Ota, Ogun State</span>
            </div>
          </div>
        </section>

        {/* Hero Banner */}
        <section className="relative w-full bg-forest-dark text-white py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#95f8a7_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-amber-vibrant animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary-fixed">
                    Excellence in Healthcare Pedagogy
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Fostering Clinical Distinction, Empathy &amp; Ethical Nursing Practice in Ota, Ogun State
                </h1>
                <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl">
                  CHEP College of Nursing Sciences bridges scientific rigor and compassionate service. We prepare registered nurses and healthcare leaders empowered to transform community medicine across Nigeria and international health systems.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#leadership"
                    className="inline-flex items-center gap-2 bg-orange-action hover:bg-orange-700 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg shadow-md transition-transform hover:-translate-y-0.5"
                  >
                    Meet Our Leadership
                    <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                  </a>
                  <a
                    href="#prospectus"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg backdrop-blur-md transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    College Prospectus
                  </a>
                </div>
              </div>

              {/* Metric Card */}
              <div className="lg:col-span-5">
                <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-xl text-gray-900 border border-border-subtle">
                  <div className="absolute -top-3 -right-3 bg-forest-base text-white text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow">
                    Official Profile
                  </div>
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <span className="material-symbols-outlined text-forest-base text-[36px]">verified_user</span>
                    <div>
                      <h4 className="font-bold text-lg text-forest-dark">Institutional Mandate</h4>
                      <p className="text-xs text-text-muted">Statutory nursing authority in Southwest Nigeria</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-surface-canvas p-4 rounded-xl border border-gray-100">
                      <span className="text-xs text-forest-medium uppercase font-semibold block">Graduates to Date</span>
                      <span className="text-3xl font-extrabold text-forest-dark">242+</span>
                      <span className="text-xs text-text-muted block mt-1">Licensed Practitioners</span>
                    </div>
                    <div className="bg-surface-canvas p-4 rounded-xl border border-gray-100">
                      <span className="text-xs text-forest-medium uppercase font-semibold block">Current Cohort</span>
                      <span className="text-3xl font-extrabold text-forest-dark">228</span>
                      <span className="text-xs text-text-muted block mt-1">Enrolled Student Nurses</span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-surface-tint flex items-center justify-between border border-emerald-100">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-emerald-accent text-[24px]">workspace_premium</span>
                      <div>
                        <div className="text-sm text-forest-dark font-bold">100% Council Clearance</div>
                        <div className="text-xs text-gray-600">NMCN Full Examination Indexing</div>
                      </div>
                    </div>
                    <span className="text-emerald-accent font-extrabold text-lg">6+ Yrs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy & Dual Mottos */}
        <section className="w-full py-16 sm:py-20 bg-surface-canvas">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-forest-base">
                Guiding Academic Foundations
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-dark">
                Institutional Philosophy &amp; Moral Pillars
              </h2>
              <p className="text-base text-text-muted">
                Anchored in the dual ideals of our heraldic mottos: balancing heart and intellect.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-forest-base text-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-fixed block mb-2">
                  Foundational Philosophy
                </span>
                <h3 className="text-2xl font-bold mb-3">Caring. Knowledge. Excellence.</h3>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  Our instructional doctrine posits that clinical dexterity without human empathy is incomplete. We instill relentless intellectual rigor alongside tender bedside diplomacy.
                </p>
              </div>

              <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-md border border-border-subtle relative overflow-hidden">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-action block mb-2">
                  Aspirational Outcome
                </span>
                <h3 className="text-2xl font-bold text-forest-dark mb-3">Compassion. Wisdom. Success.</h3>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  Every CHEP candidate graduates as a thoughtful clinician equipped with sound judgement, ethical stability, and an unwavering commitment to vulnerable populations.
                </p>
              </div>
            </div>

            {/* Bento Grid: Mission, Vision, and Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-tint text-forest-base flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[28px]">rocket_launch</span>
                  </div>
                  <h4 className="text-xl font-bold text-forest-dark mb-2">Our Mission</h4>
                  <p className="text-sm text-text-muted leading-relaxed">
                    To deliver transformative nursing education through evidence-based pedagogy, high-fidelity clinical simulation, and intensive community engagement, raising healthcare practitioners who define standards across primary, acute, and geriatric settings.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-2 text-forest-medium font-semibold text-xs">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Community &amp; Primary Healthcare Centric
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-tint text-forest-base flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[28px]">visibility</span>
                  </div>
                  <h4 className="text-xl font-bold text-forest-dark mb-2">Our Vision</h4>
                  <p className="text-sm text-text-muted leading-relaxed">
                    To emerge as Sub-Saharan Africa’s premier college of nursing sciences and elderly care specialization, recognized internationally for producing ethically grounded innovators who lead healthcare policy and bedside excellence.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-2 text-forest-medium font-semibold text-xs">
                  <span className="material-symbols-outlined text-[18px]">public</span>
                  Global Competency Alignment
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-tint text-forest-base flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[28px]">shield_with_heart</span>
                  </div>
                  <h4 className="text-xl font-bold text-forest-dark mb-2">Core Institutional Values</h4>
                  <ul className="space-y-2 text-sm text-text-muted">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-forest-base text-[16px]">done</span>
                      <strong>Integrity:</strong> Unflinching ethical bedside stewardship.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-forest-base text-[16px]">done</span>
                      <strong>Altruism:</strong> Patient-first dedication without compromise.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-forest-base text-[16px]">done</span>
                      <strong>Scientific Curiosity:</strong> Research-based medical discovery.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-forest-base text-[16px]">done</span>
                      <strong>Dignity:</strong> Geriatric respect across life stages.
                    </li>
                  </ul>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-2 text-forest-medium font-semibold text-xs">
                  <span className="material-symbols-outlined text-[18px]">military_tech</span>
                  Pioneering Geriatric Care
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* History & Timeline */}
        <section className="w-full py-16 sm:py-20 bg-white border-y border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-forest-base">
                  Institutional Genesis &amp; Legitimacy
                </span>
                <h2 className="text-3xl font-extrabold text-forest-dark">A Trajectory of Uncompromising Standards</h2>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  Established over six years ago along Agbebi Estate Road in Ota, CHEP College of Nursing Sciences was founded to resolve critical staffing deficits in tertiary health centers across Ogun State and neighboring Lagos metropolis.
                </p>
                <div className="p-6 rounded-2xl bg-surface-tint border border-emerald-100">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-forest-base text-[32px]">assignment_turned_in</span>
                    <div>
                      <h4 className="font-bold text-base text-forest-dark">Accredited by NMCN</h4>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mt-1">
                        Full programmatic accreditation by the <em>Nursing and Midwifery Council of Nigeria</em> (NMCN). Curricula fulfill all national standards for Basic Nursing and post-basic specialization.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="border-l-2 border-forest-base/30 pl-6 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-forest-base border-2 border-white"></div>
                    <span className="text-xs uppercase font-bold text-orange-action">Year 1 • Inception &amp; Charter</span>
                    <h4 className="text-base font-bold text-forest-dark mt-1">Foundation of the Ota Academic Enclave</h4>
                    <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                      Campus lands secured at No. 18, Agbebi Estate Road, Honda Bus-Stop. Initial anatomical suites and pre-clinical demonstration wards completed.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-forest-base border-2 border-white"></div>
                    <span className="text-xs uppercase font-bold text-forest-medium">Year 3 • Regulatory Breakthrough</span>
                    <h4 className="text-base font-bold text-forest-dark mt-1">NMCN Verification &amp; Licensure Charter</h4>
                    <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                      Inspection committees from the Nursing and Midwifery Council of Nigeria ratify our high-fidelity skills lab and classroom infrastructure.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-forest-base border-2 border-white"></div>
                    <span className="text-xs uppercase font-bold text-forest-medium">Year 5 • Clinical Expansion</span>
                    <h4 className="text-base font-bold text-forest-dark mt-1">Specialized Geriatric Care Division Launch</h4>
                    <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                      CHEP pioneers 24/7 Geriatric Assessment Units and home-care rotations, filling an overlooked medical gap in elderly care across Ogun State.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-amber-vibrant border-2 border-white"></div>
                    <span className="text-xs uppercase font-bold text-amber-vibrant">Present &amp; Forward • Digital Horizon</span>
                    <h4 className="text-base font-bold text-forest-dark mt-1">CHEP Virtual Library &amp; 242+ Alumni Worldwide</h4>
                    <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                      Fully digital OPAC catalog, research repositories, and simulation-based curriculum driving 100% exam pass outcomes for current candidates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Provost Section */}
        <section className="w-full py-16 sm:py-24 bg-forest-dark text-white" id="leadership">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="w-full h-[450px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-radial from-forest-medium/40 to-forest-dark border border-white/10 flex items-end justify-center">
                    <img
                      src="/images/chep/provost.png"
                      alt="Provost Stella Oluwatoyin AYOWOLE"
                      className="w-full h-[95%] object-contain object-bottom drop-shadow-2xl"
                    />
                  </div>
                  <div className="absolute -bottom-6 left-4 right-4 bg-white text-gray-900 p-4 sm:p-5 rounded-2xl shadow-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold text-forest-base block">Provost &amp; Academic Director</span>
                      <h4 className="text-base sm:text-lg font-bold text-forest-dark leading-tight">Stella Oluwatoyin AYOWOLE</h4>
                      <p className="text-xs text-text-muted">RN, RM, B.N.Sc, M.Sc (Nursing Education)</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-surface-tint flex items-center justify-center text-forest-base">
                      <span className="material-symbols-outlined text-[20px]">school</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5 pt-8 lg:pt-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary-fixed text-xs uppercase tracking-wider font-semibold">
                  <span className="material-symbols-outlined text-[16px]">format_quote</span>
                  Office of the Provost
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                  &ldquo;We do not merely confer diplomas; we build ethical custodians of human life.&rdquo;
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-gray-200 leading-relaxed">
                  <p>
                    Welcome to CHEP College of Nursing Sciences, where excellence meets compassion in the heart of healthcare education. We proudly nurture students into skilled, ethical, and confident professionals ready to transform lives through quality nursing practice.
                  </p>
                  <p>
                    In an era where global medicine demands both high-tech agility and timeless human dignity, our collegiate curriculum delivers intensive bedside exposure from Year One.
                  </p>
                  <p>
                    Under our administration, every candidate masters emergency trauma response, pediatric care, maternal midwifery, and our trademark specialization in comprehensive geriatric support.
                  </p>
                </div>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs uppercase text-primary-fixed block font-bold">Deanery Tenure</span>
                    <span className="text-lg font-bold text-white">Over 20 Years</span>
                    <span className="text-xs text-gray-300 block">Clinical Mentorship</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs uppercase text-primary-fixed block font-bold">NMCN Indexing</span>
                    <span className="text-lg font-bold text-white">Zero Deficit</span>
                    <span className="text-xs text-gray-300 block">Standardized Record</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs uppercase text-primary-fixed block font-bold">Elderly Outreach</span>
                    <span className="text-lg font-bold text-white">Pioneer</span>
                    <span className="text-xs text-gray-300 block">Ogun State Geriatrics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Board of Trustees */}
        <section className="w-full py-16 sm:py-20 bg-surface-canvas" id="board">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-forest-base">Institutional Custodians</span>
                <h2 className="text-3xl font-extrabold text-forest-dark">Board of Trustees &amp; Governance</h2>
                <p className="text-sm text-text-muted mt-1 max-w-xl">
                  Distinguished medical fellows, hospital directors, and academic policy makers ensuring structural integrity and collegiate governance.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-forest-base shadow-xs text-xs font-semibold">
                <span className="material-symbols-outlined text-[16px]">gavel</span>
                Statutory Council of 2026
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustees.map((trustee) => (
                <div key={trustee.name} className="bg-white rounded-2xl p-5 shadow-xs border border-border-subtle hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="w-full h-52 rounded-xl overflow-hidden bg-gray-100 mb-4">
                      <img src={trustee.image} alt={trustee.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="inline-block px-2.5 py-1 rounded bg-surface-tint text-forest-base text-[11px] font-bold uppercase mb-2">
                      {trustee.role}
                    </span>
                    <h4 className="text-base font-bold text-forest-dark">{trustee.name}</h4>
                    <p className="text-xs text-text-muted mt-1 leading-snug">{trustee.credentials}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-forest-medium text-xs font-semibold">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    {trustee.badge}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Management Team */}
        <section className="w-full py-16 sm:py-20 bg-white border-t border-border-subtle" id="management">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-forest-base">Day-to-Day Operations</span>
              <h2 className="text-3xl font-extrabold text-forest-dark">Management Team &amp; Academic Heads</h2>
              <p className="text-sm text-text-muted mt-2">
                The seasoned administrators and nurse educators driving curricula, examinations, and student welfare at our Ota campus.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {managementTeam.map((member) => (
                <div key={member.name} className="bg-surface-canvas rounded-2xl p-5 flex flex-col items-center text-center hover:bg-surface-tint transition-colors border border-border-subtle">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-white mb-3 shadow-inner">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-forest-base text-xs font-bold uppercase">{member.role}</span>
                  <h5 className="text-sm font-bold text-forest-dark mt-1">{member.name}</h5>
                  <p className="text-xs text-text-muted mt-0.5">{member.degree}</p>
                  <span className="mt-3 text-[11px] text-forest-medium px-2 py-0.5 rounded-full bg-white font-medium border border-gray-100">
                    {member.area}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Facilities */}
        <section className="w-full py-16 sm:py-20 bg-surface-canvas">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-forest-base">Purpose-Built Learning Spaces</span>
              <h2 className="text-3xl font-extrabold text-forest-dark">CHEP Campus &amp; Instructional Facilities</h2>
              <p className="text-sm text-text-muted mt-2">
                Designed specifically for clinical simulation, interactive digital research, and safe collegiate living in Ota, Ogun State.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {facilities.map((fac) => (
                <div key={fac.title} className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow border border-border-subtle flex flex-col justify-between">
                  <div>
                    <div className="w-full h-44 bg-gray-100 overflow-hidden">
                      <img src={fac.image} alt={fac.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-5">
                      <span className="text-forest-base text-xs uppercase font-bold block mb-1">{fac.subtitle}</span>
                      <h4 className="text-base font-bold text-forest-dark mb-2">{fac.title}</h4>
                      <p className="text-xs text-text-muted leading-relaxed">{fac.desc}</p>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-0">
                    <span className="text-xs text-forest-medium font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      {fac.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prospectus CTA Section */}
        <section className="w-full py-16 bg-forest-base text-white relative overflow-hidden" id="prospectus">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
            <div className="bg-white text-gray-900 rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-tint text-forest-base text-xs uppercase font-bold">
                    <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                    2026 / 2027 Academic Session
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark">
                    Download the Official CHEP Institutional Prospectus &amp; Charter
                  </h2>
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                    Get comprehensive details regarding the 3-Year Basic Nursing curriculum, NMCN entrance screening syllabus, clinical rotation schedules, fee schedules, geriatric certification options, and hostel lodging guidelines.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-gray-700">
                    <span className="flex items-center gap-1 text-forest-base">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      NMCN Curricular Structure
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-forest-base">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      Admission Requirements &amp; Cut-Offs
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-3">
                  <button
                    onClick={() => alert("CHEP College of Nursing Sciences Academic Prospectus 2026/2027 is downloading... (PDF, 8.4MB)")}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-action hover:bg-orange-700 text-white font-semibold text-sm px-6 py-4 rounded-xl shadow-lg transition-transform active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[20px]">cloud_download</span>
                    Download Prospectus (PDF)
                  </button>
                  <Link
                    href="/admission"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-canvas hover:bg-surface-tint text-forest-base font-semibold text-sm px-6 py-3 rounded-lg transition-colors border border-border-subtle"
                  >
                    <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                    Online Admission Portal
                  </Link>
                  <span className="text-xs text-text-muted">File size: 8.4 MB • Updated March 2026</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
