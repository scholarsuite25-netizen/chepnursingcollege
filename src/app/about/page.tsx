import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us & Leadership | CHEP College of Nursing Sciences",
  description: "Learn about the heritage, leadership, NMCN accreditation, and affiliated hospital network of CHEP College of Nursing Sciences, Ota.",
};

export default function AboutPage() {
  const leadership = [
    {
      name: "Prof. Stella O. Ayowole",
      role: "Provost & Academic Director",
      qualifications: "RN, RM, B.N.Sc, M.Sc, PhD, FWACN",
      bio: "Academic Director spearheading competency-based nursing curricula in full compliance with NMCN council directives.",
      image: "/images/chep/provost.png",
    },
    {
      name: "Akinkuebi Olawunmi Esther",
      role: "Senior Academic Lecturer",
      qualifications: "RN, RM, B.N.Sc (Nursing Sciences)",
      bio: "Directs foundational nursing instruction, aseptic procedures, and medical-surgical nursing coursework.",
      image: "/images/chep/lecturer_akinkuebi.png",
    },
    {
      name: "Jojolade Adeboye Ismail",
      role: "Lecturer & Clinical Instructor",
      qualifications: "B.N.Sc, M.Sc (Clinical Practicum)",
      bio: "Oversees pre-clinical student preparation, patient ward simulation, and preceptor rotations across hospital partners.",
      image: "/images/chep/lecturer_jojolade.png",
    },
    {
      name: "Chika Maryjane",
      role: "Lecturer & Skills Lab Coordinator",
      qualifications: "RN, B.N.Sc (Health Science)",
      bio: "Manages anatomical models, high-fidelity manikin simulators, and OSCE objective clinical examination assessments.",
      image: "/images/chep/lecturer_chika.png",
    },
    {
      name: "Urom Elisha Samuel",
      role: "Lecturer • Biological Sciences",
      qualifications: "M.Sc (Human Anatomy & Physiology)",
      bio: "Senior tutor in macroscopic anatomy, pathology, pharmacology fundamentals, and bio-chemical science courses.",
      image: "/images/chep/lecturer_urom.png",
    },
    {
      name: "Isikwei Success Isioma",
      role: "Lecturer • Maternal & Child Health",
      qualifications: "RM, B.N.Sc (Midwifery Specialty)",
      bio: "Coordinates reproductive health, antenatal and postnatal care practicum, and high-risk obstetric case simulations.",
      image: "/images/chep/lecturer_isikwei.png",
    },
  ];

  const boardOfTrustees = [
    {
      name: "Chief (Dr.) Olusegun Agbebi",
      position: "Chairman, Board of Trustees",
      desc: "Healthcare philanthropist and visionary founder of the Agbebi Central Health Endowment.",
    },
    {
      name: "Alhaja (Nurse) Aminat Danmole",
      position: "Trustee & NMCN Fellow",
      desc: "Distinguished Fellow of the West African College of Nursing and former National Chief Nursing Officer.",
    },
    {
      name: "Barrister Tunde Olawale (SAN)",
      position: "Legal Adviser & Board Secretary",
      desc: "Senior Advocate of Nigeria specializing in healthcare policy, medical jurisprudence, and tertiary governance.",
    },
    {
      name: "Dr. (Mrs.) Folashade Banjoko",
      position: "Trustee & Public Health Pioneer",
      desc: "Senior Epidemiologist advising national maternal-child health task forces.",
    },
  ];

  const affiliatedHospitals = [
    {
      name: "State Hospital Ota",
      type: "Primary Clinical Rotation Partner",
      capacity: "250 Beds • Multi-Specialty",
      units: "General Surgery, Internal Medicine, Obstetrics, Pediatrics, Accident & Emergency",
      badge: "Tertiary Rotation",
    },
    {
      name: "Olabisi Onabanjo University Teaching Hospital (OOUTH)",
      type: "Specialized Tertiary Referral Center (Sagamu)",
      capacity: "450 Beds • Teaching Hospital",
      units: "Intensive Care Unit (ICU), Neonatal ICU, Oncology, Cardiothoracic Suite",
      badge: "High-Acuity Training",
    },
    {
      name: "CHEP Geriatric Care Foundation & Rural Annex",
      type: "Community Health & Geriatric Practicum",
      capacity: "Specialized Elder Care Post",
      units: "Comprehensive Geriatric Assessment, Palliative Care, Home-Based Outpatient",
      badge: "Community Immersion",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="w-full pt-20 bg-surface-canvas min-h-screen">
        {/* Hero Section */}
        <section className="w-full bg-forest-dark text-white py-16 px-4 sm:px-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-medium text-emerald-light text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              NMCN Institutional Accreditation
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl">
              Nurturing World-Class Clinical Leaders &amp; Compassionate Healers
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Founded on the pillars of scientific precision, holistic empathy, and ethical devotion, CHEP College of Nursing Sciences stands as Ogun State’s premier center of excellence for modern nurse education.
            </p>
          </div>
        </section>

        {/* Institutional Pillars */}
        <section className="w-full py-16 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xs border border-border-subtle space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-base/10 text-forest-base flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">visibility</span>
              </div>
              <h3 className="text-xl font-bold text-forest-dark">Our Vision</h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                To be the globally recognized epicenter for transformational nursing education in Africa, graduating nurse leaders who pioneer clinical breakthroughs, eradicate healthcare disparities, and elevate bedside empathy to an art form.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xs border border-border-subtle space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-action/10 text-orange-action flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">flag</span>
              </div>
              <h3 className="text-xl font-bold text-forest-dark">Our Mission</h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                To deliver rigorous, technology-integrated nursing curricula enriched by high-fidelity clinical simulation, tertiary hospital immersion, and deep community outreach—empowering students to pass licensure exams with distinction and serve humanity with unwavering integrity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xs border border-border-subtle space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-accent/10 text-emerald-accent flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">shield</span>
              </div>
              <h3 className="text-xl font-bold text-forest-dark">Core Values (E.P.I.C)</h3>
              <ul className="text-xs sm:text-sm text-text-muted space-y-2">
                <li><strong className="text-forest-dark">Empathy:</strong> Uncompromising devotion to patient dignity and cultural sensitivity.</li>
                <li><strong className="text-forest-dark">Precision:</strong> Flawless clinical mastery and evidence-based medicine.</li>
                <li><strong className="text-forest-dark">Integrity:</strong> Absolute moral honor in patient records and medical confidentiality.</li>
                <li><strong className="text-forest-dark">Community:</strong> Proactive preventive health interventions for underserved populations.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Accreditation & Quality Benchmarks */}
        <section className="w-full py-12 px-4 sm:px-8 bg-surface-tint border-y border-emerald-100">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-medium">National Regulatory Compliance</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark">
                Full Statutory Accreditation &amp; Council Certification
              </h2>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                All academic programs at CHEP College of Nursing Sciences are fully accredited by the Nursing &amp; Midwifery Council of Nigeria (NMCN) and approved by the Federal and Ogun State Ministries of Health. Our graduates are eligible for national indexing, foreign licensure equivalency, and immediate professional RN/RM induction.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-200 text-center min-w-[140px]">
                <span className="block text-2xl font-black text-forest-dark">100%</span>
                <span className="text-[11px] font-bold text-text-muted uppercase">NMCN Compliance</span>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-200 text-center min-w-[140px]">
                <span className="block text-2xl font-black text-forest-dark">2,400+</span>
                <span className="text-[11px] font-bold text-text-muted uppercase">Clinical Hours</span>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-200 text-center min-w-[140px]">
                <span className="block text-2xl font-black text-forest-dark">15:1</span>
                <span className="text-[11px] font-bold text-text-muted uppercase">Preceptor Ratio</span>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Management Team */}
        <section className="w-full py-16 px-4 sm:px-8" id="management">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-medium">Academic Governance</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark">
                Principal Officers &amp; Academic Senate
              </h2>
              <p className="text-xs sm:text-sm text-text-muted">
                Guided by seasoned medical scholars, nurse educators, and hospital administrators committed to continuous curriculum modernization.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadership.map((officer) => (
                <div key={officer.name} className="bg-white rounded-3xl p-6 shadow-xs border border-border-subtle flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="w-20 h-20 rounded-2xl bg-forest-base/10 overflow-hidden border border-emerald-100 flex items-center justify-center shadow-xs">
                      <img src={officer.image} alt={officer.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 leading-snug">{officer.name}</h3>
                      <span className="text-xs font-bold text-forest-medium block mt-0.5">{officer.role}</span>
                      <span className="text-[11px] font-mono text-gray-500 block mt-1">{officer.qualifications}</span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">{officer.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Board of Trustees */}
        <section className="w-full py-16 px-4 sm:px-8 bg-surface-container" id="board">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-medium">Institutional Custodians</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark">
                Governing Board of Trustees
              </h2>
              <p className="text-xs sm:text-sm text-text-muted">
                Providing strategic stewardship, fiduciary oversight, and philanthropic endowments for institutional infrastructure expansion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {boardOfTrustees.map((trustee) => (
                <div key={trustee.name} className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200 space-y-2">
                  <div className="w-2 h-6 bg-forest-base rounded-full mb-3"></div>
                  <h3 className="text-base font-bold text-gray-900">{trustee.name}</h3>
                  <span className="text-xs font-bold text-orange-action block">{trustee.position}</span>
                  <p className="text-xs text-text-muted leading-relaxed mt-2">{trustee.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clinical Teaching Hospital Network */}
        <section className="w-full py-16 px-4 sm:px-8" id="hospitals">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-medium">Bedside Immersion</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark">
                Affiliated Hospital Network &amp; Clinical Centers
              </h2>
              <p className="text-xs sm:text-sm text-text-muted">
                Our students rotate across premier tertiary medical facilities and rural outreach posts under direct consultant preceptor supervision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {affiliatedHospitals.map((hosp) => (
                <div key={hosp.name} className="bg-white rounded-3xl p-6 shadow-xs border border-border-subtle flex flex-col justify-between space-y-4 hover:border-forest-base transition-colors">
                  <div className="space-y-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-light text-forest-dark text-[11px] font-bold uppercase tracking-wider inline-block">
                      {hosp.badge}
                    </span>
                    <h3 className="text-lg font-bold text-forest-dark">{hosp.name}</h3>
                    <div className="text-xs space-y-1 text-gray-600">
                      <div><strong className="text-gray-900">Classification:</strong> {hosp.type}</div>
                      <div><strong className="text-gray-900">Bed Capacity:</strong> {hosp.capacity}</div>
                      <div><strong className="text-gray-900">Rotation Units:</strong> {hosp.units}</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-100 text-xs font-semibold text-forest-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Active NMCN Preceptorship MoU
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-16 px-4 sm:px-8 bg-forest-dark text-white">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Begin Your Journey in Professional Nursing Sciences
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Applications are currently open for the 2026/2027 Academic Session for Basic Nursing and Post-Basic Midwifery.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/admission"
                className="bg-orange-action hover:bg-orange-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-colors"
              >
                Apply for 2026/2027 Admission
              </Link>
              <Link
                href="/portal"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                Access Student &amp; Preceptor Portal
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
