"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const filters = [
    { id: "all", label: "All Media", count: 26, icon: "view_quilt" },
    { id: "matriculation", label: "Matriculation & Induction", count: 7, icon: "school" },
    { id: "geriatric", label: "Geriatric Care Outreach", count: 7, icon: "volunteer_activism" },
    { id: "disaster", label: "Disaster Drills & Trauma Drills", count: 6, icon: "emergency" },
    { id: "cbt-exam", label: "CBT & Examination Center", count: 2, icon: "devices" },
    { id: "campus-life", label: "Campus Life & Celebrations", count: 4, icon: "groups" },
  ];

  const galleryItems = [
    // Matriculation (7 items)
    {
      id: 1,
      category: "matriculation",
      badge: "Matriculation Induction",
      photosCount: "Class of 2026/2027",
      station: "Assembly & Oath",
      title: "Matriculation Ceremony • Grand Induction of Nursing Scholars",
      location: "College Auditorium • Ota Campus",
      image: "/images/chep/chep_matric_1.jpg",
      desc: "Annual matriculation ceremony capturing student nurses undertaking the ceremonial Nightingale pledge and formal academic investiture in the college auditorium.",
    },
    {
      id: 2,
      category: "matriculation",
      badge: "Matriculation Milestone",
      photosCount: "Ceremonial Regalia",
      station: "Scholar Investiture",
      title: "Ceremonial Investiture & Academic Gown Portrait",
      location: "Academic Quadrangle • Ota",
      image: "/images/chep/chep_matric_2.jpg",
      desc: "Proud student nurse inductee in official green and gold collegiate academic gown following formal matriculation ceremonies.",
    },
    {
      id: 3,
      category: "matriculation",
      badge: "Matriculation Rite",
      photosCount: "Council Charter",
      station: "Nightingale Lamp",
      title: "Council Florence Nightingale Pledge & Lamp Lighting",
      location: "Main Stage • CHEP Auditorium",
      image: "/images/chep/chep_matric_3.jpg",
      desc: "Nursing inductees holding symbolic lamps during the solemn recitation of the International Nursing Pledge before the College Senate.",
    },
    {
      id: 4,
      category: "matriculation",
      badge: "Matriculation Cohort",
      photosCount: "Cohort Procession",
      station: "Senate Procession",
      title: "Official Matriculation Class Procession & Cohort Assembly",
      location: "CHEP Main Academic Enclave",
      image: "/images/chep/chep_matric_4.jpg",
      desc: "The entire matriculation cohort assembling with faculty heads and administrative directors for the official session group photograph.",
    },
    {
      id: 5,
      category: "matriculation",
      badge: "Matriculation Honour",
      photosCount: "Collegiate Pride",
      station: "Inductee Portrait",
      title: "Student Inductee in Emerald Ceremonial Regalia",
      location: "College Quadrangle",
      image: "/images/chep/chep_matric_5.jpg",
      desc: "A scholar portrait radiating enthusiasm and commitment to compassionate healthcare delivery across Nigerian hospitals.",
    },
    {
      id: 6,
      category: "matriculation",
      badge: "Matriculation Jubilee",
      photosCount: "Campus Celebrations",
      station: "Family Convocation",
      title: "Matriculation Scholars & Proud Families Academic Celebration",
      location: "Auditorium Annex • Ota",
      image: "/images/chep/chep_matric_6.jpg",
      desc: "Families, sponsors, and preceptors joining new student nurses to commemorate their admission into the Nursing and Midwifery Council register.",
    },
    {
      id: 7,
      category: "matriculation",
      badge: "Matriculation Council",
      photosCount: "Senate Commemoration",
      station: "Senate Commemoration",
      title: "Academic Senate & Matriculating Scholars Commemorative Session",
      location: "Ota Collegiate Compound",
      image: "/images/chep/chep_matric_7.jpg",
      desc: "CHEP College governing board and faculty members standing alongside matriculants at the conclusion of the 2026/2027 matriculation ceremony.",
    },

    // Geriatric Care Outreach (7 items)
    {
      id: 8,
      category: "geriatric",
      badge: "Elderly Health Outreach",
      photosCount: "Clinical Screening",
      station: "Clinical Screening",
      title: "Comprehensive Geriatric Health Assessment & Elder Support",
      location: "Community Outreach Clinic, Ogun State",
      image: "/images/chep/chep_geriatrics_1.jpg",
      desc: "CHEP student nurses conducting blood pressure profiling, blood sugar monitoring, and holistic health checks for senior community citizens.",
    },
    {
      id: 9,
      category: "geriatric",
      badge: "Specialized Care",
      photosCount: "Bedside Monitoring",
      station: "Vital Monitoring",
      title: "Bedside Geriatric Care & Vital Signs Monitoring",
      location: "Geriatric Ward Annex",
      image: "/images/chep/chep_geriatrics_2.jpg",
      desc: "Direct bedside clinical evaluation of elderly patients, mastering compassionate communication, pressure ulcer prevention, and medication adherence.",
    },
    {
      id: 10,
      category: "geriatric",
      badge: "Rehabilitative Therapy",
      photosCount: "Mobility Support",
      station: "Elder Care Unit",
      title: "Senior Patient Physical Rehabilitation & Mobility Therapy",
      location: "Geriatric Wellness Center",
      image: "/images/chep/chep_geriatrics_3.jpg",
      desc: "Student nurses guiding senior patients through gentle range-of-motion routines and physical therapy exercises to enhance functional independence.",
    },
    {
      id: 11,
      category: "geriatric",
      badge: "Palliative Consultation",
      photosCount: "Rural Outreach",
      station: "Community Nursing",
      title: "Community Elder Diagnostic Consultation & Counseling",
      location: "Ota Primary Care Outreach Post",
      image: "/images/chep/chep_geriatrics_4.jpg",
      desc: "Community health clinical rotation focusing on chronic illness management, emotional well-being, and social support for elderly dwellers.",
    },
    {
      id: 12,
      category: "geriatric",
      badge: "Clinical Rotation",
      photosCount: "Fieldwork Practicum",
      station: "Geriatric Practicum",
      title: "Specialized Geriatric Nursing Fieldwork Practicum",
      location: "Rural Health Centre • Ogun State",
      image: "/images/chep/chep_geriatrics_5.jpg",
      desc: "Field preceptors reviewing patient documentation, geriatric syndromes, and individual nursing care plans with student trainees.",
    },
    {
      id: 13,
      category: "geriatric",
      badge: "Health Surveillance",
      photosCount: "Nutrition & Care",
      station: "Medication Regimen",
      title: "Elderly Nutrition, Medication & Health Tracking",
      location: "Community Field Post",
      image: "/images/chep/chep_geriatrics_6.jpg",
      desc: "Providing dietary guidance, chronic disease monitoring, and preventive geriatric counseling directly in local homes.",
    },
    {
      id: 14,
      category: "geriatric",
      badge: "Palliative Care",
      photosCount: "Bedside Empathy",
      station: "Bedside Empathy",
      title: "Holistic Elder Compassion & Palliative Support Practicum",
      location: "Outreach Clinic Suite",
      image: "/images/chep/chep_geriatrics_7.jpg",
      desc: "Instilling deep respect and attentive listening as CHEP scholars spend dedicated hours attending to elderly patients.",
    },

    // Disaster & Trauma Drills (6 items)
    {
      id: 15,
      category: "disaster",
      badge: "Emergency Response",
      photosCount: "Triage Simulation",
      station: "Triage Simulation",
      title: "Emergency Triage & Trauma Response Simulation Drill",
      location: "Clinical Demonstrations Annex • Ota Campus",
      image: "/images/chep/disaster_training_1.jpg",
      desc: "Intensive multi-casualty drill where student nurses execute rapid triage colour-coding, airway stabilization, and emergency hemorrhage control.",
    },
    {
      id: 16,
      category: "disaster",
      badge: "Disaster Readiness",
      photosCount: "Evacuation Protocol",
      station: "Emergency Evacuation",
      title: "Rapid Patient Evacuation & Stretcher Handling Drills",
      location: "Trauma Drill Ground",
      image: "/images/chep/disaster_training_2.jpg",
      desc: "Physical endurance and tactical coordination practice for safely transporting critical patients from disaster incident scenes to ambulances.",
    },
    {
      id: 17,
      category: "disaster",
      badge: "Disaster Nursing Week",
      photosCount: "Field Scenario",
      station: "Field Triage",
      title: "Annual Disaster Preparedness Week • Simulation Scenario",
      location: "Campus Demonstrations Quadrangle",
      image: "/images/chep/disaster_week.jpg",
      desc: "Coordinated campus-wide disaster exercise simulating industrial emergency and road traffic crash triage under real-time clinical pressure.",
    },
    {
      id: 18,
      category: "disaster",
      badge: "Trauma Protocol",
      photosCount: "Mass-Casualty Incident",
      station: "Disaster Fieldwork",
      title: "Mass-Casualty Incident Coordination & Triage Prioritization",
      location: "Clinical Simulation Annex",
      image: "/images/chep/disaster_week_2.jpg",
      desc: "Clinical tutors supervising candidates as they prioritize immediate intervention cases versus delayed observation protocols.",
    },
    {
      id: 19,
      category: "disaster",
      badge: "Critical Care",
      photosCount: "First Aid Drills",
      station: "Field Demonstration",
      title: "Emergency First Aid & Splinting Field Demonstration",
      location: "Trauma Field Post",
      image: "/images/chep/disaster_week_3.jpg",
      desc: "Applying improvised and specialized splints, cervical collars, and burn dressings during simulated disaster scenarios.",
    },
    {
      id: 20,
      category: "disaster",
      badge: "Drill Debrief",
      photosCount: "Clinical Review",
      station: "Clinical Review",
      title: "Multi-Disciplinary Emergency Team Briefing & Drill Review",
      location: "Simulation Command Center",
      image: "/images/chep/disaster_week_4.jpg",
      desc: "Post-drill evaluation where nursing instructors and paramedic evaluators analyze response times, antiseptic protocol compliance, and team communication.",
    },

    // CBT & Examination (2 items)
    {
      id: 21,
      category: "cbt-exam",
      badge: "Academic Integrity",
      photosCount: "NMCN Regulated",
      station: "CBT Examination",
      title: "NMCN Computer-Based Testing (CBT) & Assessment Hall",
      location: "Main Auditorium Examination Wing",
      image: "/images/chep/examination_hall.jpg",
      desc: "Standardized proctored computer-based test hall where student nurses undertake continuous council assessments in an atmosphere of strict academic probity.",
    },
    {
      id: 22,
      category: "cbt-exam",
      badge: "Virtual Integration",
      photosCount: "Fiber Broadband",
      station: "E-Library Station",
      title: "Fiber-Broadband Digital Library & Virtual OPAC Workstations",
      location: "ICT Center, Ota Campus",
      image: "/images/chep/ict_center.jpg",
      desc: "High-speed digital learning lab providing instant terminal access to PubMed journals, OPAC catalogues, and interactive medical simulations.",
    },

    // Campus Life & Celebrations (4 items)
    {
      id: 23,
      category: "campus-life",
      badge: "Nurses Week Gala",
      photosCount: "Annual Parade",
      station: "Campus Life",
      title: "Annual International Nurses Week Celebration & Professional Parade",
      location: "CHEP Academic Quadrangle",
      image: "/images/chep/nurses_week_1.jpg",
      desc: "Scholars, alumni, and clinical tutors uniting for the colourful annual International Nurses Week symposium and professional procession in Ota.",
    },
    {
      id: 24,
      category: "campus-life",
      badge: "Clinical Cohort",
      photosCount: "Ward Uniforms",
      station: "Collegiate Life",
      title: "Student Nurses in Official Clinical Emerald Uniforms",
      location: "Main Campus Walkway",
      image: "/images/chep/students_green_scrubs.jpg",
      desc: "CHEP scholars proudly sporting their trademark emerald scrubs between morning laboratory simulations and hospital ward postings.",
    },
    {
      id: 25,
      category: "campus-life",
      badge: "Student Fellowship",
      photosCount: "Campus Fellowship",
      station: "Administrative Wing",
      title: "Active Student Nurse Cohort in Front of Administrative Wing",
      location: "No. 18, Agbebi Estate Road, Ota",
      image: "/images/chep/students_chep.jpeg",
      desc: "A group of active CHEP candidates standing before the college administrative headquarters, demonstrating collegiate unity and pride.",
    },
    {
      id: 26,
      category: "campus-life",
      badge: "Architectural Enclave",
      photosCount: "Main Campus",
      station: "Collegiate Compound",
      title: "CHEP Multi-Storey Main Academic & Laboratory Complex",
      location: "Main Campus • Idiroko Corridor, Ota",
      image: "/images/chep/building.png",
      desc: "Architectural front view of the purpose-built CHEP tertiary health education complex housing classrooms, anatomy suites, and administrative chambers.",
    },
  ];

  const filteredItems = activeFilter === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <>
      <Navbar />

      <main className="w-full pt-20 bg-surface-canvas min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full bg-forest-dark text-white py-16 sm:py-20 px-4 sm:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-primary-fixed backdrop-blur-md">
                <span className="material-symbols-outlined text-[16px]">photo_library</span>
                <span className="text-xs uppercase tracking-widest font-bold">Visual Chronicle • Ota Campus</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                CHEP Campus Life &amp; Clinical Training in Pictures
              </h1>
              <p className="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed">
                Step inside our collegiate compound at No. 18, Agbebi Estate Road, Honda Bus-Stop, Agbebi Central CDA, Ota. Explore precision anatomy laboratories, vibrant student matriculations, intensive hospital rotations, and community health outposts.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="block text-2xl font-bold text-white">26</span>
                  <span className="block text-xs text-gray-300">Verified Exhibits</span>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="block text-2xl font-bold text-white">100%</span>
                  <span className="block text-xs text-gray-300">Authentic Photography</span>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="block text-2xl font-bold text-white">NMCN</span>
                  <span className="block text-xs text-gray-300">Council Accredited</span>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="block text-2xl font-bold text-white">Ota</span>
                  <span className="block text-xs text-gray-300">Ogun State, Nigeria</span>
                </div>
              </div>
              <p className="text-xs text-gray-300 italic">
                All exhibits captured from authentic lectures, clinical practicums, and university matriculation rituals.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filters Bar */}
        <section className="sticky top-20 z-40 w-full bg-white shadow-xs py-3 px-4 sm:px-8 border-b border-border-subtle">
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-xs ${
                  activeFilter === f.id
                    ? "bg-forest-base text-white shadow-md"
                    : "bg-surface-canvas text-gray-700 hover:bg-gray-100 border border-border-subtle"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{f.icon}</span>
                <span>{f.label}</span>
                {f.count && (
                  <span className="ml-1 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                    {f.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="w-full py-12 px-4 sm:px-8 bg-surface-canvas">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs uppercase tracking-wider text-forest-medium font-bold">Verified Visual Exhibits</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark">Institutional Moments &amp; Facilities</h2>
              </div>
              <p className="text-xs sm:text-sm text-text-muted">
                Showing {filteredItems.length} curated photographic exhibits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-border-subtle flex flex-col justify-between cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/85 via-forest-dark/20 to-transparent"></div>
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-forest-base text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        {item.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] uppercase tracking-wider text-primary-fixed block font-bold">
                        {item.station}
                      </span>
                      <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between text-xs text-text-muted bg-white">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-forest-base">location_on</span>
                      {item.location}
                    </span>
                    <span className="text-orange-action font-semibold flex items-center gap-0.5">
                      View <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
              <div className="w-full h-[400px] sm:h-[500px] bg-black">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-light text-emerald-accent text-xs font-bold uppercase">
                    {selectedPhoto.badge}
                  </span>
                  <span className="text-xs text-text-muted">{selectedPhoto.location}</span>
                </div>
                <h3 className="text-xl font-bold text-forest-dark">{selectedPhoto.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{selectedPhoto.desc}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
