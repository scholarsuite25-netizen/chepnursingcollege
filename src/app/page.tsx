"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);

  const landscapeSlides = [
    {
      id: 1,
      image: "/images/chep/disaster_training_1.jpg",
      badge: "Clinical Simulation & Fieldwork",
      tag: "Real-Time Emergency Simulation",
      title: "Emergency Triage & Disaster Response Practical Training",
      desc: "CHEP nursing candidates undergoing hands-on trauma preparedness drills, rapid triage protocol execution, and coordinated field emergency exercises under senior clinical instructors.",
      location: "Clinical Demonstrations Annex • Ota Campus",
    },
    {
      id: 2,
      image: "/images/chep/examination_hall.jpg",
      badge: "Academic Integrity & CBT",
      tag: "NMCN Regulated Assessment",
      title: "State-of-the-Art Examination Hall & Computer-Based Testing",
      desc: "Candidates seated for standardized Nursing and Midwifery Council of Nigeria (NMCN) continuous assessments and proctored terminal examinations in an atmosphere of strict academic probity.",
      location: "Main Auditorium Examination Wing",
    },
    {
      id: 3,
      image: "/images/chep/chep_geriatrics_1.jpg",
      badge: "Pioneering Specialty",
      tag: "Elder Care Specialization",
      title: "Geriatric Healthcare & Compassionate Elder-Care Practicum",
      desc: "Extending healthcare beyond the clinical wards into senior communities. CHEP scholars conduct comprehensive geriatric assessments, physical therapy, and personalized palliative care.",
      location: "Community Health & Geriatrics Outreach, Ogun State",
    },
  ];

  const featuredNews = [
    {
      id: "3",
      category: "Geriatric Nursing",
      categoryLabel: "Specialized Healthcare",
      title: "Comprehensive Geriatric Assessments (CGA): Redefining Senior Well-being",
      desc: "Geriatric syndromes require multi-dimensional assessment protocols. CHEP student researchers present findings from clinical fieldwork in Ogun State.",
      author: "Dr. Ifeanyi Chukwuma",
      date: "20/03/2025",
      readTime: "5 min read",
      image: "/images/chep/chep_geriatrics_3.jpg",
    },
    {
      id: "1",
      category: "community-health",
      categoryLabel: "Community Health & Fieldwork",
      title: "Community Health Nursing: Bridging the Gap Between Healthcare and Society",
      desc: "Preventative epidemiology and emergency trauma drills form Nigeria's frontline defense. An analysis of CHEP's rural immersion cohorts in Agbebi Central.",
      author: "Nurse T. K. Balogun",
      date: "01/04/2025",
      readTime: "4 min read",
      image: "/images/chep/disaster_week.jpg",
    },
    {
      id: "4",
      category: "library",
      categoryLabel: "CBT & Academic Integrity",
      title: "NMCN Standardized CBT Examinations & Academic Probity Protocols",
      desc: "Modern digital examination terminal protocols ensuring flawless indexing, transparent assessment records, and seamless council clearance for all nursing candidates.",
      author: "Academic Affairs Registry",
      date: "14/03/2025",
      readTime: "3 min read",
      image: "/images/chep/examination_hall.jpg",
    },
  ];

  const facilities = [
    {
      title: "Clinical Simulation & Disaster Management Lab",
      subtitle: "Emergency & Trauma Hub",
      badge: "Disaster Preparedness & Simulation",
      desc: "Specialized emergency response, triage simulations, and high-fidelity trauma drill facilities preparing scholars for frontline healthcare crisis management.",
      image: "/images/chep/disaster_week_3.jpg",
    },
    {
      title: "ICT Center & Virtual Library",
      subtitle: "Virtual Integration",
      badge: "Librarika OPAC & eJournals",
      desc: "Dedicated fiber broadband workstations providing instant access to OPAC catalogs, clinical eBooks, and PubMed journal databases.",
      image: "/images/chep/ict_computers_empty.jpg",
    },
    {
      title: "Clinical Demonstration & Safety Annex",
      subtitle: "Pre-Clinical Mastery",
      badge: "High-Fidelity Simulators",
      desc: "Realistic hospital simulation ward outfitted with patient beds, emergency crash carts, oxygen ports, and pediatric incubators.",
      image: "/images/chep/disaster_training_1.jpg",
    },
    {
      title: "Ultra-Modern Hostels",
      subtitle: "Residential Living",
      badge: "24/7 Security & Power",
      desc: "Safe, comfortable dormitories with 24/7 security surveillance, treated water access, uninterrupted solar backup, and study lounges.",
      image: "/images/chep/dormitory.jpg",
    },
  ];

  // Auto-advance landscape slider every 6 seconds unless hovered
  useEffect(() => {
    if (isSliderPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % landscapeSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isSliderPaused, landscapeSlides.length]);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + landscapeSlides.length) % landscapeSlides.length);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % landscapeSlides.length);
  };

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
              <span className="text-forest-base font-semibold">Official Collegiate Portal</span>
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

        {/* Hero Banner with 2026/2027 Matriculation Showcase */}
        <section className="relative w-full bg-forest-dark text-white py-14 lg:py-20 overflow-hidden">
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
                    Office of the Provost
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

              {/* 2026/2027 Matriculation Ceremony Showcase Photo Card */}
              <div className="lg:col-span-5">
                <div className="relative group bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/20 shadow-2xl overflow-hidden">
                  <div className="relative w-full aspect-[3/2] sm:aspect-[16/10] rounded-xl overflow-hidden shadow-inner">
                    <img
                      src="/images/chep/chep_matric_4.jpg"
                      alt="2026/2027 Matriculation Ceremony at CHEP College of Nursing Sciences"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-forest-base/95 text-white backdrop-blur-md text-[11px] sm:text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-white/20">
                      <span className="material-symbols-outlined text-[15px]">school</span>
                      2026/2027 Matriculation Ceremony
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="font-extrabold text-base sm:text-lg leading-tight text-white drop-shadow">
                        Formal Induction of Student Nursing Cohorts
                      </h4>
                      <p className="text-xs text-gray-200 mt-1 line-clamp-2 drop-shadow">
                        Class of 2026/2027 undertaking the Florence Nightingale pledge &amp; ceremonial gown investiture at the Ota campus auditorium.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2.5 px-2 pb-1 flex items-center justify-between text-xs text-gray-200">
                    <span className="flex items-center gap-1.5 font-medium text-emerald-light">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      NMCN Matriculation Ledger
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-gray-300">Ota, Ogun State</span>
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

        {/* Dynamic Landscape Photo Slider */}
        <section className="w-full py-16 sm:py-20 bg-white border-y border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-forest-base">
                  Authentic Collegiate Fieldwork
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-forest-dark">
                  Clinical Simulation, Examination &amp; Community Care
                </h2>
                <p className="text-sm text-text-muted mt-1 max-w-2xl">
                  Explore high-fidelity emergency simulations, rigorous computer-based testing, and pioneer elder-care outreach conducted across our Ota campus.
                </p>
              </div>

              {/* Slider Navigation Controls */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-forest-base bg-surface-tint px-3 py-1.5 rounded-full">
                  0{activeSlide + 1} / 0{landscapeSlides.length}
                </span>
                <button
                  onClick={handlePrevSlide}
                  aria-label="Previous slide"
                  className="w-10 h-10 rounded-full border border-gray-200 hover:border-forest-base hover:bg-forest-base hover:text-white flex items-center justify-center transition-colors text-gray-700 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button
                  onClick={handleNextSlide}
                  aria-label="Next slide"
                  className="w-10 h-10 rounded-full border border-gray-200 hover:border-forest-base hover:bg-forest-base hover:text-white flex items-center justify-center transition-colors text-gray-700 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Slider Container */}
            <div
              className="relative w-full rounded-3xl overflow-hidden shadow-xl bg-forest-dark aspect-[16/10] sm:aspect-[16/8] lg:aspect-[21/9] min-h-[360px]"
              onMouseEnter={() => setIsSliderPaused(true)}
              onMouseLeave={() => setIsSliderPaused(false)}
            >
              {landscapeSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20"></div>

                  {/* Slide Content Overlay */}
                  <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-white">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-base/90 text-white backdrop-blur-md text-xs font-bold uppercase tracking-wider shadow">
                        <span className="material-symbols-outlined text-[15px]">verified</span>
                        {slide.badge}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white backdrop-blur-md text-xs font-semibold">
                        <span className="material-symbols-outlined text-[15px]">location_on</span>
                        {slide.location}
                      </span>
                    </div>

                    <div className="max-w-3xl space-y-2 sm:space-y-3">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight text-white drop-shadow">
                        {slide.title}
                      </h3>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-200 leading-relaxed drop-shadow line-clamp-3 sm:line-clamp-none">
                        {slide.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Progress Indicator Dots */}
              <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-10 z-20 flex items-center gap-2">
                {landscapeSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all rounded-full ${
                      idx === activeSlide
                        ? "w-8 h-2.5 bg-orange-action shadow-md"
                        : "w-2.5 h-2.5 bg-white/50 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Office of the Provost (Replaced Institutional Genesis & Legitimacy) */}
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
                    <div className="w-10 h-10 rounded-full bg-surface-tint flex items-center justify-center text-forest-base shrink-0">
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
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs uppercase text-primary-fixed block font-bold">Deanery Tenure</span>
                    <span className="text-lg font-bold text-white">Over 20 Years</span>
                    <span className="text-xs text-gray-300 block">Clinical Mentorship</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs uppercase text-primary-fixed block font-bold">NMCN Indexing</span>
                    <span className="text-lg font-bold text-white">Zero Deficit</span>
                    <span className="text-xs text-gray-300 block">Standardized Record</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs uppercase text-primary-fixed block font-bold">Elderly Outreach</span>
                    <span className="text-lg font-bold text-white">Pioneer</span>
                    <span className="text-xs text-gray-300 block">Ogun State Geriatrics</span>
                  </div>
                </div>
              </div>
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

        {/* Featured News & Academic Dispatches */}
        <section className="w-full py-16 sm:py-20 bg-white border-t border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-forest-base">
                  Official Academic Press
                </span>
                <h2 className="text-3xl font-extrabold text-forest-dark">
                  Latest News &amp; Clinical Dispatches
                </h2>
                <p className="text-sm text-text-muted mt-1 max-w-xl">
                  Authoritative updates from CHEP College of Nursing Sciences faculty, clinical fieldwork reports, and council announcements.
                </p>
              </div>

              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-action hover:text-orange-700 transition-colors"
              >
                View All News &amp; Bulletins
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredNews.map((news) => (
                <article
                  key={news.id}
                  className="bg-white rounded-2xl shadow-xs border border-border-subtle hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-forest-base text-white text-[11px] font-bold uppercase tracking-wider shadow">
                          {news.categoryLabel}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                        <span>{news.date}</span>
                        <span>•</span>
                        <span>{news.readTime}</span>
                      </div>
                      <h4 className="text-base font-bold text-gray-900 group-hover:text-forest-base transition-colors leading-snug">
                        {news.title}
                      </h4>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed line-clamp-3">
                        {news.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-gray-50 flex items-center justify-between mt-2">
                    <span className="text-xs font-semibold text-forest-medium">{news.author}</span>
                    <Link
                      href={`/news?id=${news.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-orange-action hover:text-orange-700"
                    >
                      Read Dispatch
                      <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    </Link>
                  </div>
                </article>
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
