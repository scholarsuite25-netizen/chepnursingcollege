"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [tourForm, setTourForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    prospectiveProgram: "Basic Nursing (3 Years)",
    visitDate: "",
    attendeesCount: "1",
    specialInterest: "Clinical Simulation Ward",
  });
  const [tourBooked, setTourBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    category: "Admissions & Screening",
    message: "",
  });
  const [inquirySent, setInquirySent] = useState(false);

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TOUR-CHEP-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setTourBooked(true);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  const departmentalDirectory = [
    {
      department: "Admissions & Candidates Secretariat",
      contactPerson: "Academic Affairs Registry",
      phone: "+234 916 635 674",
      rawPhone: "+234916635674",
      email: "admissions@chepnursingcollege.org",
      hours: "Mon – Fri: 08:00 AM – 04:30 PM",
      icon: "how_to_reg",
    },
    {
      department: "Bursary Directorate & Remita Desk",
      contactPerson: "Student Accounts & Fee Clearances",
      phone: "+234 813 540 6714",
      rawPhone: "+2348135406714",
      email: "bursary@chepnursingcollege.org",
      hours: "Mon – Fri: 08:30 AM – 04:00 PM",
      icon: "receipt_long",
    },
    {
      department: "Clinical Training & Hospital Postings",
      contactPerson: "Directorate of Clinical Practicum",
      phone: "+234 916 635 674 (Ext. 204)",
      rawPhone: "+234916635674",
      email: "clinical-affairs@chepnursingcollege.org",
      hours: "24/7 Clinical Emergency On-Call",
      icon: "stethoscope",
    },
    {
      department: "ICT & Digital Portal Helpdesk",
      contactPerson: "Systems Engineering Directorate",
      phone: "+234 916 635 674 (Ext. 102)",
      rawPhone: "+234916635674",
      email: "it-support@chepnursingcollege.org",
      hours: "Mon – Sat: 08:00 AM – 06:00 PM",
      icon: "devices",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="w-full pt-20 bg-surface-canvas min-h-screen">
        {/* Hero Section */}
        <section className="w-full bg-forest-dark text-white py-16 sm:py-20 px-4 sm:px-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-medium text-emerald-light text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">pin_drop</span>
              Ota Main Campus • Ogun State
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl">
              Connect With Us &amp; Experience Our Campus Facilities
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Plan a physical visit to our high-fidelity anatomy simulation labs, consult with faculty advisors, or reach our registry hotlines for immediate 2026/2027 admissions support.
            </p>
          </div>
        </section>

        {/* Core Contact Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-md border border-border-subtle space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-surface-tint text-forest-base flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">location_on</span>
              </div>
              <h3 className="text-base font-bold text-forest-dark">Campus Physical Address</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                No. 18, Agbebi Estate Road, Honda Bus-Stop, Agbebi Central CDA, Ota 102213, Ogun State, Nigeria.
              </p>
              <span className="text-[11px] font-bold text-forest-medium block pt-1">
                Landmark: Opposite Agbebi Central Healthcare Post
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-md border border-border-subtle space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-surface-tint text-forest-base flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">call</span>
              </div>
              <h3 className="text-base font-bold text-forest-dark">Direct Phone Lines</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Reach admissions officers or bursary desks directly via telephone call or instant WhatsApp chat.
              </p>
              
              <div className="space-y-2 pt-1">
                {/* Line 1 */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-surface-canvas border border-gray-200">
                  <div className="text-xs">
                    <span className="text-[10px] text-gray-500 font-bold block uppercase">Admissions Desk</span>
                    <span className="font-bold text-gray-900">+234 916 635 674</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href="tel:+234916635674"
                      className="px-2.5 py-1 rounded-lg bg-forest-base hover:bg-forest-medium text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                      title="Click to Call"
                    >
                      <span className="material-symbols-outlined text-[13px]">call</span>
                      Call
                    </a>
                    <a
                      href="https://wa.me/234916635674?text=Hello%20CHEP%20Admissions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                      title="Click to WhatsApp"
                    >
                      <span className="material-symbols-outlined text-[13px]">chat</span>
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Line 2 */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-surface-canvas border border-gray-200">
                  <div className="text-xs">
                    <span className="text-[10px] text-gray-500 font-bold block uppercase">Bursary &amp; Registry</span>
                    <span className="font-bold text-gray-900">+234 813 540 6714</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href="tel:+2348135406714"
                      className="px-2.5 py-1 rounded-lg bg-forest-base hover:bg-forest-medium text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                      title="Click to Call"
                    >
                      <span className="material-symbols-outlined text-[13px]">call</span>
                      Call
                    </a>
                    <a
                      href="https://wa.me/2348135406714?text=Hello%20CHEP%20Bursary"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                      title="Click to WhatsApp"
                    >
                      <span className="material-symbols-outlined text-[13px]">chat</span>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-md border border-border-subtle space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-surface-tint text-forest-base flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">mail</span>
              </div>
              <h3 className="text-base font-bold text-forest-dark">Official Institutional Mail</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Enquiries: enquiries@chepnursingcollege.org<br />
                Registry: admissions@chepnursingcollege.org
              </p>
              <span className="text-[11px] font-bold text-forest-medium block pt-1">
                Expected Response Time: Within 24 Business Hours
              </span>
            </div>
          </div>
        </section>

        {/* Two-Column: Book a Campus Tour + Route Transit Guide */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Schedule Campus & Simulation Lab Visit */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-border-subtle space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-medium">Personalized Inspection</span>
                <h2 className="text-2xl font-extrabold text-forest-dark mt-1">
                  Schedule a Guided Campus &amp; Simulation Ward Tour
                </h2>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  Experience our 60-seat CBT center, female hostels, and clinical skill manikins firsthand. Guided by our student ambassadors and faculty preceptors.
                </p>
              </div>

              {tourBooked ? (
                <div className="p-8 rounded-2xl bg-surface-tint border border-emerald-100 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <span className="material-symbols-outlined text-[36px]">check</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-forest-dark">Campus Visit Confirmed!</h3>
                    <p className="text-xs text-text-muted mt-1 max-w-md mx-auto">
                      Thank you, <strong>{tourForm.fullName}</strong>. Your physical campus inspection docket has been registered under reference:
                    </p>
                    <div className="mt-3 inline-block bg-white px-4 py-2 rounded-xl border border-emerald-200 font-mono text-sm font-bold text-forest-dark shadow-xs">
                      {bookingRef}
                    </div>
                  </div>
                  <div className="text-xs text-gray-700 bg-white p-4 rounded-xl border border-gray-100 text-left max-w-md mx-auto space-y-1">
                    <div><strong>Scheduled Date:</strong> {tourForm.visitDate}</div>
                    <div><strong>Selected Program:</strong> {tourForm.prospectiveProgram}</div>
                    <div><strong>Priority Area:</strong> {tourForm.specialInterest}</div>
                    <div><strong>Meeting Point:</strong> Reception Annex, Administrative Block</div>
                  </div>
                  <button
                    onClick={() => setTourBooked(false)}
                    className="text-xs font-bold text-forest-base hover:underline block mx-auto"
                  >
                    Book another appointment
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTourSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Visitor Full Name</label>
                      <input
                        type="text"
                        required
                        value={tourForm.fullName}
                        onChange={(e) => setTourForm({ ...tourForm, fullName: e.target.value })}
                        placeholder="e.g. Mrs. Funke Adeleke"
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Phone / WhatsApp Number</label>
                      <input
                        type="tel"
                        required
                        value={tourForm.phone}
                        onChange={(e) => setTourForm({ ...tourForm, phone: e.target.value })}
                        placeholder="+234 800 000 0000"
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Email Address</label>
                      <input
                        type="email"
                        required
                        value={tourForm.email}
                        onChange={(e) => setTourForm({ ...tourForm, email: e.target.value })}
                        placeholder="visitor@example.com"
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Preferred Visit Date</label>
                      <input
                        type="date"
                        required
                        value={tourForm.visitDate}
                        onChange={(e) => setTourForm({ ...tourForm, visitDate: e.target.value })}
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Prospective Program of Interest</label>
                      <select
                        value={tourForm.prospectiveProgram}
                        onChange={(e) => setTourForm({ ...tourForm, prospectiveProgram: e.target.value })}
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                      >
                        <option>Basic Nursing (3 Years)</option>
                        <option>Post-Basic Midwifery (18 Months)</option>
                        <option>Public Health &amp; Geriatric Nursing</option>
                        <option>General Institutional Stakeholder</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Primary Area of Interest</label>
                      <select
                        value={tourForm.specialInterest}
                        onChange={(e) => setTourForm({ ...tourForm, specialInterest: e.target.value })}
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                      >
                        <option>Clinical Simulation Ward &amp; Lab</option>
                        <option>Students&apos; Hostel Complex</option>
                        <option>ICT Suite &amp; Virtual Library</option>
                        <option>Full Campus Tour</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-forest-base hover:bg-forest-medium text-white text-xs font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                      Confirm Campus Tour Appointment
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Route Directions & Transit Guide */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-xs border border-border-subtle space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-forest-medium block">
                  Transit &amp; Route Guide
                </span>
                <h3 className="text-lg font-bold text-forest-dark">How to Locate CHEP College in Ota</h3>

                <div className="space-y-4 text-xs text-gray-700">
                  <div className="p-4 rounded-2xl bg-surface-canvas border border-gray-200 space-y-1">
                    <strong className="text-forest-dark block font-bold">From Lagos (Iyana-Ipaja / Oshodi / Ikeja):</strong>
                    <p className="text-text-muted leading-relaxed">
                      Board transit to Sango-Ota or Tollgate. Proceed via Idiroko Expressway towards Honda Bus-Stop. Turn right into Agbebi Estate Road; CHEP College is located 300 meters inside on the right.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-canvas border border-gray-200 space-y-1">
                    <strong className="text-forest-dark block font-bold">From Abeokuta / Sagamu:</strong>
                    <p className="text-text-muted leading-relaxed">
                      Follow the Lagos-Abeokuta Expressway down to Sango Underbridge. Take the Idiroko artery to Honda Bus-Stop, then branch into Agbebi Estate Road.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-canvas border border-gray-200 space-y-1">
                    <strong className="text-forest-dark block font-bold">From Berger / Ojodu:</strong>
                    <p className="text-text-muted leading-relaxed">
                      Route through Meiran / Kola or Agbado Crossing connecting to Ota central axis.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Ota+Ogun+State"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-surface-tint hover:bg-emerald-100 text-forest-base font-bold text-xs rounded-xl transition-colors border border-emerald-200"
                  >
                    <span className="material-symbols-outlined text-[18px]">map</span>
                    Open in Google Maps Navigation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Departmental Directory Grid */}
        <section className="w-full py-16 px-4 sm:px-8 bg-surface-container border-t border-gray-200">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-medium">Institutional Extensions</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark">
                Departmental Hotlines &amp; Direct Enquiries
              </h2>
              <p className="text-xs sm:text-sm text-text-muted">
                Connect directly with the relevant administrative unit for specialized academic, fee, or clinical practicum clearances.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departmentalDirectory.map((dept) => (
                <div key={dept.department} className="bg-white rounded-3xl p-6 shadow-xs border border-gray-200 space-y-4 flex flex-col justify-between hover:border-forest-base transition-colors">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-surface-tint text-forest-base flex items-center justify-center">
                      <span className="material-symbols-outlined text-[26px]">{dept.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-forest-dark leading-snug">{dept.department}</h3>
                      <span className="text-[11px] text-text-muted block mt-0.5">{dept.contactPerson}</span>
                    </div>
                    <div className="space-y-2 text-xs text-gray-700 pt-2 border-t border-gray-100">
                      <div>
                        <strong className="text-gray-900 block mb-1">Phone Helpline:</strong>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <a
                            href={`tel:${dept.rawPhone}`}
                            className="px-2.5 py-1 rounded-md bg-forest-base hover:bg-forest-medium text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                            title="Call this department"
                          >
                            <span className="material-symbols-outlined text-[13px]">call</span>
                            Call
                          </a>
                          <a
                            href={`https://wa.me/${dept.rawPhone.replace("+", "")}?text=Hello%20CHEP%20${encodeURIComponent(dept.department)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                            title="WhatsApp this department"
                          >
                            <span className="material-symbols-outlined text-[13px]">chat</span>
                            WhatsApp
                          </a>
                        </div>
                      </div>
                      <div>
                        <strong className="text-gray-900 block mt-1">Official Email:</strong>
                        <a href={`mailto:${dept.email}`} className="text-forest-base hover:underline break-all">
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500 font-semibold bg-surface-canvas p-2 rounded-xl text-center">
                    {dept.hours}
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Social Media & Live Community Channels */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xs space-y-4 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-medium">
                Official Institutional Networks
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-forest-dark">
                Follow CHEP College Across Social Platforms
              </h3>
              <p className="text-xs text-text-muted max-w-xl mx-auto">
                Stay updated with real-time matriculation dates, NMCN examination timetables, student life vlogs, and clinical seminars.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href="https://wa.me/234916635674"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  Official WhatsApp Channel
                </a>
                <a
                  href="https://facebook.com/chepnursingcollege"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  Facebook Page
                </a>
                <a
                  href="https://instagram.com/chepnursingcollege"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  Instagram Feed
                </a>
                <a
                  href="https://linkedin.com/school/chep-college-of-nursing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  LinkedIn Academic Network
                </a>
                <a
                  href="https://youtube.com/@chepnursingcollege"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  YouTube Lectures &amp; Tours
                </a>
                <a
                  href="https://x.com/chepnursing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
