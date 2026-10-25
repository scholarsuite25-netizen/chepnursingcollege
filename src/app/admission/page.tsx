"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { submitApplication, checkApplicationStatus } from "@/app/actions/admissions";

export default function AdmissionPage() {
  const [activeTab, setActiveTab] = useState<"apply" | "status">("apply");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    program: "Basic Nursing (4-Year ND/HND)",
    jambScore: "",
    olevelExam: "WAEC",
    examYear: "2024",
    creditsCount: "5",
  });
  const [submitted, setSubmitted] = useState(false);

  // Status Check State
  const [statusSearchQuery, setStatusSearchQuery] = useState("");
  const [statusSearching, setStatusSearching] = useState(false);
  const [statusResults, setStatusResults] = useState<any[] | null>(null);
  const [statusError, setStatusError] = useState("");

  const programs = [
    {
      name: "Basic Nursing (General)",
      duration: "4 Years (ND/HND Programme)",
      intake: "October 2026",
      qualification: "National Diploma (ND) & Higher National Diploma (HND) in Nursing / Registered Nurse (RN)",
      accreditation: "Accredited by NMCN & NBTE",
      description:
        "CHEP College of Nursing Sciences Ota Ogun is a 4years ND/HND programme, accredited by Nursing and Midwifery council (NMCN) and National Board of Technical Education ( NBTE)",
      requirements:
        "Five (5) credits in WAEC/NECO/NABTEB at not more than two sittings: English Language, Mathematics, Biology, Chemistry, and Physics.",
      badge: "Flagship ND/HND Programme",
    },
    {
      name: "Post-Basic Midwifery",
      duration: "18 Months Accelerated",
      intake: "September 2026",
      qualification: "Registered Midwife (RM)",
      accreditation: "NMCN Regulated",
      requirements: "Must be a Registered Nurse (RN) with valid licensing and current practicing license issued by the Nursing and Midwifery Council of Nigeria.",
      badge: "Accelerated Clinical",
    },
    {
      name: "Public Health & Geriatric Nursing",
      duration: "2 Years Specialty",
      intake: "November 2026",
      qualification: "Specialist Practitioner",
      accreditation: "NMCN Certified",
      requirements: "RN qualification plus minimum 1 year clinical post-qualification experience in primary healthcare, community health, or elderly home care.",
      badge: "Pioneering Specialty",
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await submitApplication(formData);
    setIsSubmitting(false);
    if (res.success) {
      setSubmissionResult(res.application);
    }
    setSubmitted(true);
  };

  const handleStatusSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusSearchQuery.trim()) return;
    setStatusSearching(true);
    setStatusError("");
    setStatusResults(null);
    const res = await checkApplicationStatus(statusSearchQuery);
    setStatusSearching(false);
    if (res.success && res.applications) {
      setStatusResults(res.applications);
    } else {
      setStatusError(res.message || "No application record found.");
    }
  };

  return (
    <>
      <Navbar />

      <main className="w-full pt-20 bg-surface-canvas min-h-screen">
        {/* Hero Section */}
        <section className="w-full bg-forest-dark text-white py-16 sm:py-20 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-primary-fixed text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
              Admissions Open • 2026/2027 Academic Year
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Begin Your Journey to Becoming an Elite Registered Nurse
            </h1>
            <p className="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed">
              Join CHEP College of Nursing Sciences in Ota, Ogun State. Learn with cutting-edge anatomical simulation suites, direct preceptor hospital postings, and comprehensive geriatric specialty training.
            </p>
          </div>
        </section>

        {/* Content Body */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
          {/* Programs Grid */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forest-medium">Academic Offerings</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark">Approved Programmes of Study</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programs.map((prog) => (
                <div key={prog.name} className="bg-white rounded-2xl p-6 shadow-xs border border-border-subtle flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-full bg-surface-tint text-forest-base inline-block">
                      {prog.badge}
                    </span>
                    <h3 className="text-lg font-bold text-forest-dark">{prog.name}</h3>
                    {"description" in prog && prog.description && (
                      <p className="text-xs text-slate-700 bg-emerald-50/90 p-3 rounded-xl border border-emerald-200/80 font-medium leading-relaxed">
                        {prog.description}
                      </p>
                    )}
                    <div className="space-y-1.5 text-xs text-text-muted">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-forest-base">schedule</span>
                        <span>{prog.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-forest-base">workspace_premium</span>
                        <span>{prog.qualification}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-forest-base">verified</span>
                        <span>{prog.accreditation}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-xs font-bold text-gray-800 block mb-1">Requirements:</span>
                      <p className="text-xs text-text-muted leading-relaxed">{prog.requirements}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <a
                      href="#apply"
                      className="w-full inline-block text-center bg-forest-base hover:bg-forest-medium text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
                    >
                      Apply for this Programme
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admission Form & Status Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="apply">
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-border-subtle space-y-6">
              {/* Tab Switcher */}
              <div className="flex items-center gap-2 p-1 bg-surface-canvas rounded-2xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setActiveTab("apply")}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    activeTab === "apply"
                      ? "bg-forest-base text-white shadow-xs"
                      : "text-gray-600 hover:text-forest-dark"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">edit_document</span>
                  Apply Online (2026/2027)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("status")}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    activeTab === "status"
                      ? "bg-forest-base text-white shadow-xs"
                      : "text-gray-600 hover:text-forest-dark"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">manage_search</span>
                  Check Admission Status
                </button>
              </div>

              {activeTab === "status" ? (
                /* Application Status Checker */
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-forest-dark">Candidate Admission &amp; Screening Status</h3>
                    <p className="text-xs text-text-muted mt-1">
                      Track your screening timetable, CBT evaluation remarks, and provisional admission letter using your assigned Remita RRR or registered email.
                    </p>
                  </div>

                  <form onSubmit={handleStatusSearch} className="space-y-3">
                    <label className="text-xs font-bold text-gray-700 block">
                      Enter Remita RRR, Application Email, or Candidate Name
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[20px]">
                          search
                        </span>
                        <input
                          type="text"
                          required
                          value={statusSearchQuery}
                          onChange={(e) => setStatusSearchQuery(e.target.value)}
                          placeholder="e.g. RRR-2901-4412-8819 or candidate@example.com"
                          className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={statusSearching}
                        className="h-11 px-5 bg-forest-base hover:bg-forest-medium text-white text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                      >
                        {statusSearching ? (
                          <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                        ) : (
                          <>
                            <span>Verify Status</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {statusError && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">error</span>
                      {statusError}
                    </div>
                  )}

                  {statusResults && statusResults.length > 0 && (
                    <div className="space-y-4 pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-forest-medium block">
                        Official Dossier Verification Result ({statusResults.length} Found)
                      </span>
                      {statusResults.map((candidate: any) => (
                        <div
                          key={candidate.id}
                          className="p-5 rounded-2xl bg-surface-canvas border border-emerald-200 space-y-4 shadow-xs"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2 border-b border-gray-200 pb-3">
                            <div>
                              <h4 className="text-base font-extrabold text-forest-dark">{candidate.full_name}</h4>
                              <span className="text-xs text-text-muted">{candidate.program}</span>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase ${
                                candidate.status === "admitted"
                                  ? "bg-emerald-500 text-white"
                                  : candidate.status === "screened"
                                  ? "bg-blue-600 text-white"
                                  : "bg-orange-500 text-white"
                              }`}
                            >
                              {candidate.status === "admitted"
                                ? "Admitted • Offer Issued"
                                : candidate.status === "screened"
                                ? "CBT Screened • Senate Review"
                                : "Shortlisted for Screening"}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-gray-500 block text-[10px] uppercase font-bold">Assigned RRR</span>
                              <span className="font-mono font-bold text-gray-900">{candidate.rrr_number || "Pending"}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block text-[10px] uppercase font-bold">Screening Batch</span>
                              <span className="font-bold text-forest-dark">{candidate.batch || "Batch A-01"}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block text-[10px] uppercase font-bold">O&apos;Level Standing</span>
                              <span className="text-gray-900">{candidate.olevel_exam} ({candidate.credits_count || "5 Credits"})</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block text-[10px] uppercase font-bold">Application Date</span>
                              <span className="text-gray-900">{new Date(candidate.created_at).toLocaleDateString("en-GB")}</span>
                            </div>
                          </div>

                          <div className="pt-2 flex flex-wrap gap-2">
                            <Link
                              href={`/admission/slip?name=${encodeURIComponent(candidate.full_name)}&ref=${encodeURIComponent(candidate.id.slice(0, 14))}&rrr=${encodeURIComponent(candidate.rrr_number || "")}&program=${encodeURIComponent(candidate.program)}&batch=${encodeURIComponent(candidate.batch || "Batch A-01")}`}
                              className="flex-1 py-2.5 px-3 bg-forest-base hover:bg-forest-medium text-white text-xs font-bold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                            >
                              <span className="material-symbols-outlined text-[16px]">print</span>
                              Print Official Screening Slip
                            </Link>
                            <Link
                              href={`/payment?rrr=${encodeURIComponent(candidate.rrr_number || "")}`}
                              className="py-2.5 px-4 bg-orange-action hover:bg-orange-700 text-white text-xs font-bold rounded-xl text-center transition-colors flex items-center justify-center gap-1 shadow-xs"
                            >
                              <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                              Verify Remita Receipt
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* New Application Form */
                <>
                  <div>
                    <h3 className="text-xl font-bold text-forest-dark">Direct Online Application Form</h3>
                    <p className="text-xs text-text-muted mt-1">
                      Fill in your details to initiate your application dossier and receive screening timetable notifications.
                    </p>
                  </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-surface-tint border border-emerald-100 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-[36px]">check</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-forest-dark">Application Successfully Submitted!</h4>
                    <p className="text-xs text-text-muted mt-1 max-w-md mx-auto">
                      Thank you, <strong>{formData.fullName}</strong>. An email with your Application Reference Number and screening schedule has been sent to <strong>{formData.email}</strong>.
                    </p>
                    {submissionResult?.rrr_number && (
                      <div className="mt-3 bg-white p-3.5 rounded-xl border border-emerald-200 inline-block text-left text-xs space-y-1 shadow-xs">
                        <div><strong className="text-forest-dark">Assigned RRR:</strong> <span className="font-mono text-gray-900 font-bold">{submissionResult.rrr_number}</span></div>
                        <div><strong className="text-forest-dark">Screening Batch:</strong> <span className="text-emerald-700 font-bold">{submissionResult.batch}</span></div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-forest-base hover:underline"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Surname, Firstname, Othername"
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="applicant@example.com"
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Telephone / WhatsApp Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 800 000 0000"
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Programme Applied For</label>
                      <select
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                      >
                        <option>Basic Nursing (4-Year ND/HND)</option>
                        <option>Post-Basic Midwifery (18 Months)</option>
                        <option>Public Health &amp; Geriatric Nursing</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">O&apos;Level Examination</label>
                      <select
                        value={formData.olevelExam}
                        onChange={(e) => setFormData({ ...formData, olevelExam: e.target.value })}
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                      >
                        <option>WAEC (SSCE)</option>
                        <option>NECO</option>
                        <option>NABTEB</option>
                        <option>Combined WAEC/NECO</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Examination Year</label>
                      <input
                        type="text"
                        value={formData.examYear}
                        onChange={(e) => setFormData({ ...formData, examYear: e.target.value })}
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Core Science Credits</label>
                      <select
                        value={formData.creditsCount}
                        onChange={(e) => setFormData({ ...formData, creditsCount: e.target.value })}
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                      >
                        <option>5 Credits (English, Maths, Bio, Chem, Phys)</option>
                        <option>6 Credits</option>
                        <option>7+ Credits</option>
                      </select>
                    </div>
                  </div>

                  {/* File Upload Section */}
                  <div className="pt-2 border-t border-gray-100 space-y-3">
                    <span className="text-xs font-bold text-forest-dark block">
                      Upload Verified Credentials (Optional for online pre-screening)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-600 block">
                          Recent Passport Photograph (Max 2MB)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          className="w-full text-xs text-gray-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-surface-tint file:text-forest-base hover:file:bg-emerald-100 border border-gray-200 rounded-xl p-1"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-600 block">
                          WAEC / NECO / NABTEB Slip (PDF / Image)
                        </label>
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          className="w-full text-xs text-gray-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-surface-tint file:text-forest-base hover:file:bg-emerald-100 border border-gray-200 rounded-xl p-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-action hover:bg-orange-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                          Submitting to Registry...
                        </>
                      ) : (
                        "Submit Application Dossier"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>

            {/* Application Stages Card */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-xs border border-border-subtle space-y-4">
              <h4 className="text-base font-bold text-forest-dark border-b border-gray-100 pb-3">
                4-Stage Admission Sequence
              </h4>
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-forest-base text-white flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">Online Registration &amp; RRR Generation</span>
                    <p className="text-text-muted mt-0.5">Submit personal profile and verify application fee on Remita.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-forest-base text-white flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">Computer-Based Screening (CBT)</span>
                    <p className="text-text-muted mt-0.5">Physical screening at CHEP 60-seat ICT Center in Ota.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-forest-base text-white flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">Oral Clinical Aptitude Interview</span>
                    <p className="text-text-muted mt-0.5">Interactive interview with Nursing Academic Senate panel.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">NMCN Indexing &amp; Matriculation</span>
                    <p className="text-text-muted mt-0.5">Issuance of council index number and ceremonial induction.</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-surface-canvas border border-gray-100 space-y-2 text-xs">
                <span className="font-bold text-forest-dark block">Admissions Helplines:</span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="tel:+234916635674"
                    className="px-2.5 py-1 rounded-md bg-forest-base hover:bg-forest-medium text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[13px]">call</span>
                    Call +234 916 635 674
                  </a>
                  <a
                    href="https://wa.me/234916635674?text=Hello%20CHEP%20Admissions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[13px]">chat</span>
                    WhatsApp
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="tel:+2348135406714"
                    className="px-2.5 py-1 rounded-md bg-forest-base hover:bg-forest-medium text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[13px]">call</span>
                    Call +234 813 540 6714
                  </a>
                  <a
                    href="https://wa.me/2348135406714?text=Hello%20CHEP%20Registry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[13px]">chat</span>
                    WhatsApp
                  </a>
                </div>
                <p className="text-forest-base font-semibold pt-1">
                  <a href="mailto:registrar@chepnursingcollege.org" className="hover:underline">
                    registrar@chepnursingcollege.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
