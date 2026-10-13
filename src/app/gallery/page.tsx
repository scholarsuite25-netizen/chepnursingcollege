"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const filters = [
    { id: "all", label: "All Media", count: 48, icon: "view_quilt" },
    { id: "simulation", label: "Clinical Simulation Lab", icon: "clinical_notes" },
    { id: "ict", label: "ICT Digital Center", icon: "devices" },
    { id: "matriculation", label: "Matriculation & Induction", icon: "school" },
    { id: "hostel", label: "Students' Hostel", icon: "apartment" },
    { id: "outreach", label: "Geriatric Community Outreach", icon: "volunteer_activism" },
    { id: "faculty", label: "Faculty & Academic Board", icon: "groups" },
  ];

  const galleryItems = [
    {
      id: 0,
      category: "simulation",
      badge: "Clinical Lab",
      photosCount: "14 Photos",
      station: "Anatomical & Skills Lab",
      title: "Nursing College Laboratory - Anatomical Simulators & Skills Practicum",
      location: "Main Skills Simulation Lab, Ota Campus",
      image: "/images/chep/laboratory.jpg",
      desc: "Authentic CHEP College skills simulation laboratory outfitted with clinical hospital beds and anatomical training manikins.",
    },
    {
      id: 1,
      category: "ict",
      badge: "ICT Suite",
      photosCount: "8 Photos",
      station: "CBT & Virtual Exam Center",
      title: "CHEP ICT Facilities - 60-Seat Computer-Based Screening Hall",
      location: "ICT Center, Ota Campus",
      image: "/images/chep/ict_center.jpg",
      desc: "High-speed fiber-optic network terminal workstations where nursing students sit for computerized entrance screenings and CBT assessments.",
    },
    {
      id: 2,
      category: "matriculation",
      badge: "Campus Event",
      photosCount: "26 Photos",
      station: "Induction Milestone",
      title: "Matriculation Ceremony & Induction of Nursing Cohorts",
      location: "College Auditorium • Ota Campus",
      image: "/images/chep/campus_event_chep6.jpeg",
      desc: "Annual matriculation ceremony capturing nursing scholars and academic administrators during formal induction.",
    },
    {
      id: 3,
      category: "outreach",
      badge: "Clinical Life",
      photosCount: "18 Photos",
      station: "Campus Community",
      title: "Nigerian Nursing Students - Campus Life in Clinical Green Scrubs",
      location: "Main Academic Quadrangle, Ota",
      image: "/images/chep/students_green_scrubs.jpg",
      desc: "CHEP student nurses in official emerald-green clinical scrub uniforms between lecture hours and ward demonstrations.",
    },
    {
      id: 4,
      category: "simulation",
      badge: "Practical Training",
      photosCount: "12 Photos",
      station: "Clinical Safety Post",
      title: "Safety Precaution & Emergency Response Practical Exercise",
      location: "Clinical Demonstrations Annex",
      image: "/images/chep/safety_exercise.png",
      desc: "Hands-on emergency drills, infection control techniques, and patient triage protocols overseen by clinical tutors.",
    },
    {
      id: 5,
      category: "hostel",
      badge: "Residential Life",
      photosCount: "15 Photos",
      station: "Student Dormitory",
      title: "Students' Dormitory Complex - Residential Living Quarters",
      location: "Hostel Lodge • 24/7 Security & Solar Backup",
      image: "/images/chep/dormitory.jpg",
      desc: "Spacious, comfortable student dormitories with private study areas, uninterrupted utilities, and secure residential environment.",
    },
    {
      id: 6,
      category: "outreach",
      badge: "Student Body",
      photosCount: "22 Photos",
      station: "Campus Life",
      title: "Active Student Nurses in Front of the Administrative Wing",
      location: "No. 18, Agbebi Estate Road, Ota",
      image: "/images/chep/students_chep.jpeg",
      desc: "Student cohort gathered at the main campus entrance, showcasing institutional pride and collegiate camaraderie.",
    },
    {
      id: 7,
      category: "faculty",
      badge: "Academic Board",
      photosCount: "9 Photos",
      station: "Council Session",
      title: "Provost & Institutional Leadership Senate Review",
      location: "Senate Council Chamber, Ota",
      image: "/images/chep/campus_event_chep14.jpeg",
      desc: "Provost Stella O. Ayowole and College Governing Council convening for curriculum standards and academic oversight.",
    },
    {
      id: 8,
      category: "simulation",
      badge: "Main Complex",
      photosCount: "10 Photos",
      station: "Architectural Enclave",
      title: "CHEP College Multi-Storey Main Academic Complex",
      location: "Main Campus, Idiroko Road Corridor, Ota",
      image: "/images/chep/building.png",
      desc: "Architectural view of the newly expanded CHEP educational complex housing lecture amphitheatres and laboratories.",
    },
    {
      id: 9,
      category: "simulation",
      badge: "Pediatric Care",
      photosCount: "11 Photos",
      station: "Pediatric Demonstration Unit",
      title: "Pediatric Nursing Specialization & Infant Healthcare Training",
      location: "Maternal-Child Health Suite",
      image: "/images/chep/pediatric_nursing.jpg",
      desc: "Specialized training on neonatology, child immunization regimes, and pediatric triage management.",
    },
    {
      id: 10,
      category: "ict",
      badge: "Virtual Library",
      photosCount: "16 Photos",
      station: "E-Library Wing",
      title: "Digital Library & Electronic Journal Research Terminal",
      location: "College Library Wing, Ota",
      image: "/images/chep/library_banner.png",
      desc: "Access portal to PubMed, Open Library, and peer-reviewed healthcare publications for academic research.",
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
                  <span className="block text-2xl font-bold text-white">1,450+</span>
                  <span className="block text-xs text-gray-300">Archived Photos</span>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="block text-2xl font-bold text-white">18</span>
                  <span className="block text-xs text-gray-300">Clinical Suites</span>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="block text-2xl font-bold text-white">100%</span>
                  <span className="block text-xs text-gray-300">NMCN Indexed</span>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="block text-2xl font-bold text-white">4K</span>
                  <span className="block text-xs text-gray-300">Digital Media</span>
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
                  <span className="ml-1 bg-white/20 text-xs px-1.5 py-0.2 rounded-full">
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
                Showing {filteredItems.length} curated photographic albums
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
                      <span className="bg-forest-base text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {item.badge}
                      </span>
                      <span className="bg-white/90 text-forest-dark text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        {item.photosCount}
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
