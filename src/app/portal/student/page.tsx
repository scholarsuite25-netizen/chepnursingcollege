"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { submitClinicalLog, getClinicalLogs } from "@/app/actions/clinical";

export default function StudentPortalDashboard() {
  const [activeTab, setActiveTab] = useState<"logbook" | "courses" | "calculators" | "cbt" | "payments">("logbook");
  const [showDocketModal, setShowDocketModal] = useState(false);

  // Calculator States
  const [calcSubTab, setCalcSubTab] = useState<"iv" | "pediatric" | "apgar" | "gcs">("iv");
  // IV Calc
  const [ivVolume, setIvVolume] = useState<number>(500);
  const [ivHours, setIvHours] = useState<number>(4);
  const [ivDropFactor, setIvDropFactor] = useState<number>(20);
  // Pediatric Calc
  const [pedWeight, setPedWeight] = useState<number>(12);
  const [pedDosePerKg, setPedDosePerKg] = useState<number>(15);
  const [pedStockMg, setPedStockMg] = useState<number>(250);
  const [pedStockMl, setPedStockMl] = useState<number>(5);
  // APGAR Calc
  const [apgarA, setApgarA] = useState<number>(2);
  const [apgarP, setApgarP] = useState<number>(2);
  const [apgarG, setApgarG] = useState<number>(2);
  const [apgarAct, setApgarAct] = useState<number>(1);
  const [apgarR, setApgarR] = useState<number>(2);
  // GCS Calc
  const [gcsEye, setGcsEye] = useState<number>(4);
  const [gcsVerbal, setGcsVerbal] = useState<number>(5);
  const [gcsMotor, setGcsMotor] = useState<number>(6);

  // NMCN CBT States
  const [cbtAnswers, setCbtAnswers] = useState<Record<number, number>>({});
  const [cbtSubmitted, setCbtSubmitted] = useState(false);

  const [logs, setLogs] = useState<any[]>([
    {
      id: "demo-1",
      hospital_unit: "State Hospital Ota (Adult Surgical Ward)",
      shift_date: "2026-03-24",
      hours: 8,
      procedure_notes: "Administered prescribed IV Ceftriaxone, performed aseptic surgical wound dressing, recorded 2-hourly post-operative vitals.",
      preceptor_signed: true,
    },
    {
      id: "demo-2",
      hospital_unit: "OOUTH Sagamu (Accident & Emergency)",
      shift_date: "2026-03-22",
      hours: 12,
      procedure_notes: "Assisted with cannulation on poly-trauma admission, set up cardiac monitoring leads, managed oxygen therapy via nasal cannula.",
      preceptor_signed: true,
    },
    {
      id: "demo-3",
      hospital_unit: "CHEP Geriatric Care Foundation (Elderly Outreach)",
      shift_date: "2026-03-18",
      hours: 6,
      procedure_notes: "Conducted Comprehensive Geriatric Assessment (CGA), checked blood glucose via glucometer on 14 hypertensive elderly patients.",
      preceptor_signed: false,
    },
  ]);

  // Logbook form state
  const [hospitalUnit, setHospitalUnit] = useState("State Hospital Ota");
  const [department, setDepartment] = useState("Medical-Surgical Ward");
  const [shiftDate, setShiftDate] = useState("2026-03-28");
  const [hours, setHours] = useState(8);
  const [procedureNotes, setProcedureNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadLogs() {
      const res = await getClinicalLogs();
      if (res.success && res.data && res.data.length > 0) {
        setLogs((prev) => [...res.data, ...prev.filter(p => !res.data.some((d: any) => d.id === p.id))]);
      }
    }
    loadLogs();
  }, []);

  const handleLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!procedureNotes) return;
    setIsSubmitting(true);
    const res = await submitClinicalLog({
      hospitalUnit,
      department,
      shiftDate,
      hours: Number(hours),
      procedureNotes,
      matricNumber: "CHEP/NUR/2025/0842",
      studentName: "Ifeoluwa Ayomide",
    });
    setIsSubmitting(false);

    if (res.success && res.log) {
      setLogs((prev) => [res.log, ...prev]);
      alert("Clinical shift logged successfully! Sent to Ward Preceptor for signature.");
      setProcedureNotes("");
    } else {
      // Fallback local update
      const newEntry = {
        id: "local-" + Date.now(),
        hospital_unit: `${hospitalUnit} (${department})`,
        shift_date: shiftDate,
        hours: Number(hours),
        procedure_notes: procedureNotes,
        preceptor_signed: false,
      };
      setLogs((prev) => [newEntry, ...prev]);
      alert("Shift logged! Pending preceptor verification.");
      setProcedureNotes("");
    }
  };

  const registeredCourses = [
    { code: "NUR 201", title: "Medical-Surgical Nursing I (Adult Care)", units: 4, status: "Registered" },
    { code: "NUR 203", title: "Clinical Pharmacology & Chemotherapy", units: 3, status: "Registered" },
    { code: "NUR 205", title: "Human Anatomy & Physiology II", units: 3, status: "Registered" },
    { code: "NUR 207", title: "Foundations of Geriatric Assessment", units: 2, status: "Registered" },
    { code: "NUR 209", title: "Primary Healthcare & Community Immersion", units: 3, status: "Registered" },
    { code: "NUR 211", title: "Hospital Practicum & Clinical Simulation II", units: 4, status: "Registered" },
  ];

  const totalLoggedHours = logs.reduce((acc, curr) => acc + (Number(curr.hours) || 0), 0);

  return (
    <>
      <Navbar />

      <main className="w-full pt-20 bg-surface-canvas min-h-screen">
        {/* Student Profile Header */}
        <section className="w-full bg-forest-dark text-white py-8 px-4 sm:px-8 border-b border-forest-base">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-primary-fixed overflow-hidden flex items-center justify-center text-primary-fixed shrink-0">
                <span className="material-symbols-outlined text-[40px]">person</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-white">Ifeoluwa Ayomide</h1>
                  <span className="bg-emerald-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                    Active Student
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300">
                  <span>Matric: <strong className="text-white">CHEP/NUR/2025/0842</strong></span>
                  <span>•</span>
                  <span>NMCN Index: <strong className="text-primary-fixed">NMCN/IDX/OG/2025/1190</strong></span>
                  <span>•</span>
                  <span>Level: <strong className="text-white">Year 2 (General Nursing)</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert("Printing Official Biometric Exam Clearance Pass for Ifeoluwa Ayomide...")}
                className="bg-orange-action hover:bg-orange-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                Exam Clearance Pass
              </button>
              <Link
                href="/portal"
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </section>

        {/* Dashboard Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between">
              <span className="text-xs uppercase font-bold text-text-muted">Clinical Hours Logged</span>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-forest-dark">{totalLoggedHours}</span>
                  <span className="text-xs text-text-muted">/ 1,800 Hours</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                  <div
                    className="bg-forest-base h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (totalLoggedHours / 1800) * 100)}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-[11px] text-forest-medium font-semibold">Requirement for NMCN Licensing Exam</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between">
              <span className="text-xs uppercase font-bold text-text-muted">Academic Standing</span>
              <div className="my-2">
                <span className="text-3xl font-extrabold text-gray-900">4.62</span>
                <span className="text-xs text-emerald-600 font-bold block mt-1">First Class Cumulative</span>
              </div>
              <span className="text-[11px] text-text-muted">Distinction in Medical-Surgical Lab</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between">
              <span className="text-xs uppercase font-bold text-text-muted">Fee Clearance Status</span>
              <div className="my-2">
                <span className="inline-flex items-center gap-1 text-emerald-600 font-extrabold text-xl">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                  100% Cleared
                </span>
                <span className="text-xs text-text-muted block mt-1">2025/2026 Academic Session</span>
              </div>
              <span className="text-[11px] text-text-muted">Remita RRR: 4419-8201-9921</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between">
              <span className="text-xs uppercase font-bold text-text-muted">Current Clinical Posting</span>
              <div className="my-2">
                <span className="text-sm font-bold text-forest-dark block">State Hospital Ota</span>
                <span className="text-xs text-text-muted block">Adult Surgical &amp; Trauma Ward</span>
              </div>
              <span className="text-[11px] text-orange-action font-semibold">Preceptor: Matron V. Adediran</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-border-subtle">
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-px">
              <button
                onClick={() => setActiveTab("logbook")}
                className={`py-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                  activeTab === "logbook"
                    ? "border-forest-base text-forest-dark"
                    : "border-transparent text-text-muted hover:text-gray-900"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">clinical_notes</span>
                e-Clinical Logbook
              </button>
              <button
                onClick={() => setActiveTab("courses")}
                className={`py-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                  activeTab === "courses"
                    ? "border-forest-base text-forest-dark"
                    : "border-transparent text-text-muted hover:text-gray-900"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">assignment</span>
                Course Registration &amp; Docket
              </button>
              <button
                onClick={() => setActiveTab("calculators")}
                className={`py-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                  activeTab === "calculators"
                    ? "border-forest-base text-forest-dark"
                    : "border-transparent text-text-muted hover:text-gray-900"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">calculate</span>
                Clinical &amp; Drug Calculators
              </button>
              <button
                onClick={() => setActiveTab("cbt")}
                className={`py-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                  activeTab === "cbt"
                    ? "border-forest-base text-forest-dark"
                    : "border-transparent text-text-muted hover:text-gray-900"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">quiz</span>
                NMCN CBT Exam Practice
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`py-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                  activeTab === "payments"
                    ? "border-forest-base text-forest-dark"
                    : "border-transparent text-text-muted hover:text-gray-900"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                Fee Payments &amp; Receipts
              </button>
            </div>
          </div>

          {/* TAB 1: e-Clinical Logbook */}
          {activeTab === "logbook" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Shift Logging Form */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-xs border border-border-subtle space-y-4">
                <div>
                  <h3 className="text-base font-bold text-forest-dark">Log Daily Ward Shift</h3>
                  <p className="text-xs text-text-muted">Document patient bedside procedures for preceptor validation.</p>
                </div>

                <form onSubmit={handleLogSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Hospital Facility</label>
                    <select
                      value={hospitalUnit}
                      onChange={(e) => setHospitalUnit(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                    >
                      <option>State Hospital Ota</option>
                      <option>Olabisi Onabanjo Univ Teaching Hospital (OOUTH)</option>
                      <option>Neuropsychiatric Hospital Aro, Abeokuta</option>
                      <option>CHEP Geriatric Care Foundation</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Ward / Unit</label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="e.g. Surgical Ward A"
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Shift Date</label>
                      <input
                        type="date"
                        value={shiftDate}
                        onChange={(e) => setShiftDate(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Hours Completed</label>
                    <select
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                    >
                      <option value={4}>4 Hours (Half Shift)</option>
                      <option value={8}>8 Hours (Full Day Shift)</option>
                      <option value={12}>12 Hours (Intensive Night Shift)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Bedside Clinical Procedures Performed</label>
                    <textarea
                      rows={3}
                      required
                      value={procedureNotes}
                      onChange={(e) => setProcedureNotes(e.target.value)}
                      placeholder="Detail specific procedures: e.g. wound dressing, cannulation, vitals chart, catheter insertion..."
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-forest-base hover:bg-forest-medium text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                        Submitting to Preceptor...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[16px]">save</span>
                        Submit Shift to Preceptor
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Logged Shifts Table */}
              <div className="lg:col-span-7 bg-white rounded-3xl shadow-xs border border-border-subtle p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-forest-dark">Logged Clinical Records</h3>
                    <p className="text-xs text-text-muted">Total recorded entries: {logs.length}</p>
                  </div>
                  <span className="bg-emerald-100 text-forest-base text-xs font-bold px-3 py-1 rounded-full">
                    {totalLoggedHours} Hours Total
                  </span>
                </div>

                <div className="space-y-3">
                  {logs.map((log, idx) => (
                    <div key={log.id || idx} className="p-4 rounded-2xl bg-surface-canvas border border-gray-100 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-bold text-forest-dark flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-forest-base">local_hospital</span>
                          {log.hospital_unit}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-700 font-semibold">
                            {log.hours} Hours
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${
                              log.preceptor_signed
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            <span className="material-symbols-outlined text-[12px]">
                              {log.preceptor_signed ? "check" : "schedule"}
                            </span>
                            {log.preceptor_signed ? "Preceptor Signed" : "Pending Signature"}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">{log.procedure_notes}</p>
                      <div className="text-[11px] text-text-muted flex items-center justify-between pt-1 border-t border-gray-200/50">
                        <span>Shift Date: {log.shift_date}</span>
                        <span>Logged to NMCN Rota</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Course Registration */}
          {activeTab === "courses" && (
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-border-subtle space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-forest-dark">Second Semester 2025/2026 Course Modules</h3>
                  <p className="text-xs text-text-muted">Faculty of Basic Nursing Sciences • Total Units: 19</p>
                </div>
                <button
                  onClick={() => setShowDocketModal(true)}
                  className="bg-forest-base hover:bg-forest-medium text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  Print Official Course Docket (CRF)
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-canvas text-gray-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Course Code</th>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Credit Units</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {registeredCourses.map((c) => (
                      <tr key={c.code} className="hover:bg-gray-50/50">
                        <td className="py-3.5 px-4 font-bold text-forest-dark">{c.code}</td>
                        <td className="py-3.5 px-4 text-gray-800">{c.title}</td>
                        <td className="py-3.5 px-4 font-semibold">{c.units} Units</td>
                        <td className="py-3.5 px-4">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Fee Payments */}
          {activeTab === "payments" && (
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-border-subtle space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-forest-dark">Remita Fee Clearance Receipts</h3>
                  <p className="text-xs text-text-muted">Automated verification through Remita Gateway.</p>
                </div>
                <Link
                  href="/payment"
                  className="bg-orange-action hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">credit_card</span>
                  Make Online Payment
                </Link>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-surface-canvas border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-gray-900 block text-sm">2025/2026 Academic Tuition Fee</span>
                    <span className="text-text-muted">RRR: 4419-8201-9921 • Paid on October 12, 2025</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-forest-dark">₦285,000.00</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      Paid &amp; Cleared
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-canvas border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-gray-900 block text-sm">Clinical Rotation &amp; Hospital Posting Levy</span>
                    <span className="text-text-muted">RRR: 1104-5590-3321 • Paid on January 14, 2026</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-forest-dark">₦45,000.00</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      Paid &amp; Cleared
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Clinical & Drug Calculators */}
          {activeTab === "calculators" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-border-subtle space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-tint text-forest-base text-[11px] font-bold uppercase mb-1">
                    <span className="material-symbols-outlined text-[14px]">medical_services</span>
                    Clinical Decision Support System (CDSS)
                  </div>
                  <h3 className="text-xl font-bold text-forest-dark">Bedside Nursing &amp; Pharmacological Calculators</h3>
                  <p className="text-xs text-text-muted">Instant error-free dosing, fluid dynamics, and neurological/neonatal triage scales.</p>
                </div>
                {/* Sub-tabs */}
                <div className="flex flex-wrap items-center gap-1 bg-surface-canvas p-1 rounded-xl">
                  <button
                    onClick={() => setCalcSubTab("iv")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      calcSubTab === "iv" ? "bg-forest-base text-white shadow-xs" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    IV Drip Rate
                  </button>
                  <button
                    onClick={() => setCalcSubTab("pediatric")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      calcSubTab === "pediatric" ? "bg-forest-base text-white shadow-xs" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Pediatric Dosage
                  </button>
                  <button
                    onClick={() => setCalcSubTab("apgar")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      calcSubTab === "apgar" ? "bg-forest-base text-white shadow-xs" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    APGAR Score
                  </button>
                  <button
                    onClick={() => setCalcSubTab("gcs")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      calcSubTab === "gcs" ? "bg-forest-base text-white shadow-xs" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Glasgow Coma (GCS)
                  </button>
                </div>
              </div>

              {/* Sub-tab 1: IV Drip Rate */}
              {calcSubTab === "iv" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-900">Infusion Parameters</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Total Infusion Volume (mL)</label>
                        <input
                          type="number"
                          value={ivVolume}
                          onChange={(e) => setIvVolume(Number(e.target.value) || 0)}
                          className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Infusion Time (Hours)</label>
                        <input
                          type="number"
                          step="0.5"
                          value={ivHours}
                          onChange={(e) => setIvHours(Number(e.target.value) || 0)}
                          className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">IV Giving Set Drop Factor (gtt/mL)</label>
                        <select
                          value={ivDropFactor}
                          onChange={(e) => setIvDropFactor(Number(e.target.value))}
                          className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                        >
                          <option value="20">20 gtt/mL (Standard Adult Macrodrip Set)</option>
                          <option value="15">15 gtt/mL (Blood Transfusion Giving Set)</option>
                          <option value="10">10 gtt/mL (Specialized Macrodrip Set)</option>
                          <option value="60">60 gtt/mL (Pediatric Microdrip / Burette Set)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-tint p-6 rounded-2xl border border-emerald-100 space-y-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-forest-medium block">
                      Calculated Bedside Delivery
                    </span>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-xl border border-emerald-200">
                        <span className="text-xs text-text-muted block">Infusion Velocity Rate</span>
                        <span className="text-2xl font-black text-forest-dark">
                          {ivHours > 0 ? (ivVolume / ivHours).toFixed(1) : 0} <span className="text-sm font-semibold">mL / hr</span>
                        </span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-emerald-200">
                        <span className="text-xs text-text-muted block">Gravity Drip Rate (Counting chamber)</span>
                        <span className="text-3xl font-black text-orange-action">
                          {ivHours > 0 ? Math.round((ivVolume * ivDropFactor) / (ivHours * 60)) : 0}{" "}
                          <span className="text-base font-semibold">gtt / min (drops/min)</span>
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed italic">
                      Formula: Drops/min = [Total Volume (mL) × Drop Factor (gtt/mL)] ÷ [Time (hrs) × 60 mins]. Always double-check syringe pumps against physician prescription orders.
                    </p>
                  </div>
                </div>
              )}

              {/* Sub-tab 2: Pediatric Dosage */}
              {calcSubTab === "pediatric" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-900">Pediatric Patient &amp; Medication Details</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Child Weight (kg)</label>
                        <input
                          type="number"
                          value={pedWeight}
                          onChange={(e) => setPedWeight(Number(e.target.value) || 0)}
                          className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Ordered Dose (mg/kg/dose)</label>
                        <input
                          type="number"
                          value={pedDosePerKg}
                          onChange={(e) => setPedDosePerKg(Number(e.target.value) || 0)}
                          className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Stock Strength (mg)</label>
                        <input
                          type="number"
                          value={pedStockMg}
                          onChange={(e) => setPedStockMg(Number(e.target.value) || 1)}
                          className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">In Stock Volume (mL)</label>
                        <input
                          type="number"
                          value={pedStockMl}
                          onChange={(e) => setPedStockMl(Number(e.target.value) || 1)}
                          className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-forest-base"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-tint p-6 rounded-2xl border border-emerald-100 space-y-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-forest-medium block">
                      Administering Dose Breakdown
                    </span>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-xl border border-emerald-200">
                        <span className="text-xs text-text-muted block">Total Active Drug Required</span>
                        <span className="text-2xl font-black text-forest-dark">
                          {(pedWeight * pedDosePerKg).toFixed(1)} <span className="text-sm font-semibold">mg per dose</span>
                        </span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-emerald-200">
                        <span className="text-xs text-text-muted block">Syringe Measure to Administer</span>
                        <span className="text-3xl font-black text-orange-action">
                          {pedStockMg > 0 ? (((pedWeight * pedDosePerKg) / pedStockMg) * pedStockMl).toFixed(2) : 0}{" "}
                          <span className="text-base font-semibold">mL</span>
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed italic">
                      Clark &amp; Augsberger verification: Verify whether dose exceeds maximum adult single dosage limits before bedside administration.
                    </p>
                  </div>
                </div>
              )}

              {/* Sub-tab 3: APGAR Scoring */}
              {calcSubTab === "apgar" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                    <div className="p-4 rounded-xl bg-surface-canvas border border-gray-200 space-y-2">
                      <label className="text-xs font-bold text-forest-dark block">A - Appearance</label>
                      <select
                        value={apgarA}
                        onChange={(e) => setApgarA(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-lg border border-gray-300"
                      >
                        <option value="0">0: Blue / Pale all over</option>
                        <option value="1">1: Pink body, Blue hands/feet</option>
                        <option value="2">2: Completely Pink</option>
                      </select>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-canvas border border-gray-200 space-y-2">
                      <label className="text-xs font-bold text-forest-dark block">P - Pulse</label>
                      <select
                        value={apgarP}
                        onChange={(e) => setApgarP(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-lg border border-gray-300"
                      >
                        <option value="0">0: Absent (No pulse)</option>
                        <option value="1">1: &lt; 100 beats/min</option>
                        <option value="2">2: &gt; 100 beats/min</option>
                      </select>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-canvas border border-gray-200 space-y-2">
                      <label className="text-xs font-bold text-forest-dark block">G - Grimace</label>
                      <select
                        value={apgarG}
                        onChange={(e) => setApgarG(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-lg border border-gray-300"
                      >
                        <option value="0">0: Flaccid / No response</option>
                        <option value="1">1: Minimal grimace/movement</option>
                        <option value="2">2: Vigorous cry, pull away</option>
                      </select>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-canvas border border-gray-200 space-y-2">
                      <label className="text-xs font-bold text-forest-dark block">A - Activity</label>
                      <select
                        value={apgarAct}
                        onChange={(e) => setApgarAct(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-lg border border-gray-300"
                      >
                        <option value="0">0: Limp / No movement</option>
                        <option value="1">1: Some flexion of limbs</option>
                        <option value="2">2: Active spontaneous motion</option>
                      </select>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-canvas border border-gray-200 space-y-2">
                      <label className="text-xs font-bold text-forest-dark block">R - Respiration</label>
                      <select
                        value={apgarR}
                        onChange={(e) => setApgarR(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-lg border border-gray-300"
                      >
                        <option value="0">0: Absent (Apnea)</option>
                        <option value="1">1: Slow, irregular, weak cry</option>
                        <option value="2">2: Good, lusty vigorous cry</option>
                      </select>
                    </div>
                  </div>

                  {(() => {
                    const score = apgarA + apgarP + apgarG + apgarAct + apgarR;
                    return (
                      <div className="p-6 rounded-2xl bg-surface-tint border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <span className="text-xs font-bold text-forest-medium uppercase block">Total APGAR Score (1 &amp; 5 Minutes)</span>
                          <span className="text-4xl font-black text-forest-dark">{score} / 10</span>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase inline-block ${
                              score >= 7
                                ? "bg-emerald-500 text-white"
                                : score >= 4
                                ? "bg-orange-500 text-white"
                                : "bg-red-600 text-white"
                            }`}
                          >
                            {score >= 7
                              ? "Normal Transition (Routine Care)"
                              : score >= 4
                              ? "Moderate Depression (Clear Airway & Oxygen)"
                              : "Severe Distress (Immediate Neonatal Resuscitation)"}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Sub-tab 4: Glasgow Coma Scale (GCS) */}
              {calcSubTab === "gcs" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-surface-canvas border border-gray-200 space-y-2">
                      <label className="text-xs font-bold text-forest-dark block">Eye Opening (E: 1 - 4)</label>
                      <select
                        value={gcsEye}
                        onChange={(e) => setGcsEye(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-lg border border-gray-300"
                      >
                        <option value="4">4: Spontaneous eye opening</option>
                        <option value="3">3: To speech / voice</option>
                        <option value="2">2: To painful stimuli</option>
                        <option value="1">1: None</option>
                      </select>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-canvas border border-gray-200 space-y-2">
                      <label className="text-xs font-bold text-forest-dark block">Verbal Response (V: 1 - 5)</label>
                      <select
                        value={gcsVerbal}
                        onChange={(e) => setGcsVerbal(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-lg border border-gray-300"
                      >
                        <option value="5">5: Oriented &amp; converses</option>
                        <option value="4">4: Disoriented / Confused</option>
                        <option value="3">3: Inappropriate words</option>
                        <option value="2">2: Incomprehensible sounds</option>
                        <option value="1">1: None</option>
                      </select>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-canvas border border-gray-200 space-y-2">
                      <label className="text-xs font-bold text-forest-dark block">Motor Response (M: 1 - 6)</label>
                      <select
                        value={gcsMotor}
                        onChange={(e) => setGcsMotor(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-lg border border-gray-300"
                      >
                        <option value="6">6: Obeys commands</option>
                        <option value="5">5: Localizes to pain</option>
                        <option value="4">4: Normal flexion / withdrawal</option>
                        <option value="3">3: Abnormal flexion (decorticate)</option>
                        <option value="2">2: Extension (decerebrate)</option>
                        <option value="1">1: None (Flaccid)</option>
                      </select>
                    </div>
                  </div>

                  {(() => {
                    const score = gcsEye + gcsVerbal + gcsMotor;
                    return (
                      <div className="p-6 rounded-2xl bg-surface-tint border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <span className="text-xs font-bold text-forest-medium uppercase block">GCS Coma Score (E{gcsEye} + V{gcsVerbal} + M{gcsMotor})</span>
                          <span className="text-4xl font-black text-forest-dark">{score} / 15</span>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase inline-block ${
                              score >= 13
                                ? "bg-emerald-500 text-white"
                                : score >= 9
                                ? "bg-orange-500 text-white"
                                : "bg-red-600 text-white"
                            }`}
                          >
                            {score >= 13
                              ? "Mild Brain Injury / Alert"
                              : score >= 9
                              ? "Moderate Traumatic Brain Injury"
                              : "Severe Coma (GCS ≤ 8 Intubate!)"}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: NMCN CBT Exam Practice Simulator */}
          {activeTab === "cbt" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-border-subtle space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-forest-medium text-emerald-light text-[11px] font-bold uppercase mb-1">
                    <span className="material-symbols-outlined text-[14px]">school</span>
                    NMCN Professional Examination Mock Suite
                  </div>
                  <h3 className="text-xl font-bold text-forest-dark">Computer-Based Licensure Practice Simulation</h3>
                  <p className="text-xs text-text-muted">High-yield clinical nursing questions curated by CHEP Faculty Examiners.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-surface-canvas border border-gray-200 text-forest-dark">
                    Time Allowed: 15 Mins
                  </span>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {[
                  {
                    id: 1,
                    question: "A 48-year-old post-thyroidectomy patient develops laryngeal stridor and tingling in the fingertips. Which complication should the nurse anticipate immediately?",
                    options: [
                      "Accidental removal of parathyroid glands causing acute hypocalcemia",
                      "Early stage sepsis from surgical site infection",
                      "Hypertensive crisis due to elevated TSH",
                      "Aspiration pneumonia from endotracheal intubation",
                    ],
                    correct: 0,
                    rationale: "Accidental excision or devascularization of parathyroid glands leads to sudden hypocalcemia, characterized by tingling (paresthesia), positive Chvostek's/Trousseau's signs, and tetanic laryngeal stridor requiring immediate IV Calcium Gluconate.",
                  },
                  {
                    id: 2,
                    question: "What is the primary pharmacological antidote administered for respiratory depression induced by Morphine toxicity?",
                    options: [
                      "Flumazenil",
                      "Naloxone (Narcan)",
                      "Protamine Sulfate",
                      "Atropine Sulfate",
                    ],
                    correct: 1,
                    rationale: "Naloxone is an opioid receptor antagonist that rapidly reverses opioid-induced central nervous system and respiratory depression.",
                  },
                  {
                    id: 3,
                    question: "During second-stage labor monitoring, what is the physiologically acceptable baseline range for fetal heart rate (FHR)?",
                    options: [
                      "80 - 110 beats per minute",
                      "110 - 160 beats per minute",
                      "160 - 200 beats per minute",
                      "60 - 100 beats per minute",
                    ],
                    correct: 1,
                    rationale: "Normal baseline fetal heart rate is 110 to 160 bpm. Rates persistently below 110 bpm represent fetal bradycardia; rates above 160 bpm represent tachycardia.",
                  },
                  {
                    id: 4,
                    question: "Prior to performing radial artery puncture for Arterial Blood Gas (ABG) sampling, which bedside diagnostic maneuver is mandatory?",
                    options: [
                      "Allen's Test (Assessing ulnar collateral circulation)",
                      "Homans' Sign test",
                      "Babinski reflex check",
                      "Romberg balance assessment",
                    ],
                    correct: 0,
                    rationale: "The modified Allen's test assesses the patency of the ulnar artery to ensure adequate collateral blood flow to the hand in the event of radial artery thrombosis.",
                  },
                  {
                    id: 5,
                    question: "Which anatomical landmark is preferred by the NMCN for deep intramuscular injections in adults to minimize sciatic nerve injury?",
                    options: [
                      "Dorsogluteal upper outer quadrant",
                      "Ventrogluteal site (Gluteus medius)",
                      "Deltoid acromion edge",
                      "Rectus femoris midline",
                    ],
                    correct: 1,
                    rationale: "The ventrogluteal site is the safest intramuscular site for volumes up to 3mL because it is free of major blood vessels and distant from the sciatic nerve.",
                  },
                ].map((q, idx) => (
                  <div key={q.id} className="p-5 rounded-2xl bg-surface-canvas border border-gray-200 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-xs text-forest-medium">Question {idx + 1} of 5</span>
                      {cbtSubmitted && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            cbtAnswers[q.id] === q.correct
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {cbtAnswers[q.id] === q.correct ? "Correct" : "Incorrect"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-gray-900">{q.question}</p>
                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIdx) => (
                        <label
                          key={optIdx}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            cbtAnswers[q.id] === optIdx
                              ? "border-forest-base bg-emerald-50 text-forest-dark font-semibold"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q_${q.id}`}
                            checked={cbtAnswers[q.id] === optIdx}
                            onChange={() => setCbtAnswers({ ...cbtAnswers, [q.id]: optIdx })}
                            disabled={cbtSubmitted}
                            className="text-forest-base focus:ring-forest-base"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>

                    {cbtSubmitted && (
                      <div className="mt-3 p-3.5 rounded-xl bg-white border border-emerald-200 text-xs space-y-1">
                        <strong className="text-forest-dark block font-bold">Clinical Rationale:</strong>
                        <p className="text-gray-700 leading-relaxed text-[11px]">{q.rationale}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit & Score */}
              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                {cbtSubmitted ? (
                  <div className="flex items-center gap-4">
                    {(() => {
                      const score = Object.keys(cbtAnswers).filter(
                        (k) =>
                          cbtAnswers[Number(k)] ===
                          [0, 1, 1, 0, 1][Number(k) - 1]
                      ).length;
                      return (
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-black text-forest-dark">Score: {score} / 5 ({score * 20}%)</span>
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                              score >= 3 ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                            }`}
                          >
                            {score >= 4 ? "Distinction" : score >= 3 ? "Credit Pass" : "Remedial Advised"}
                          </span>
                        </div>
                      );
                    })()}
                    <button
                      onClick={() => {
                        setCbtAnswers({});
                        setCbtSubmitted(false);
                      }}
                      className="text-xs font-bold text-forest-base hover:underline"
                    >
                      Reset &amp; Retake Simulation
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setCbtSubmitted(true)}
                    className="w-full sm:w-auto px-6 py-3 bg-forest-base hover:bg-forest-medium text-white text-xs font-bold rounded-xl transition-colors shadow-md"
                  >
                    Submit Practice Examination &amp; View Rationales
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Modal: Official Course Registration Docket (CRF) */}
          {showDocketModal && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl relative my-8">
                <button
                  onClick={() => setShowDocketModal(false)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 print:hidden"
                >
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>

                <div className="text-center pb-4 border-b-2 border-forest-dark space-y-1">
                  <h2 className="text-xl font-black text-forest-dark uppercase">CHEP College of Nursing Sciences</h2>
                  <p className="text-xs font-semibold text-gray-600">Senate Directorate of Academic Affairs &amp; Records</p>
                  <span className="inline-block px-3 py-1 bg-surface-tint text-forest-base text-[10px] font-bold rounded-full uppercase mt-1">
                    Official Course Registration Form (CRF) • 2025/2026 Second Semester
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div><strong className="text-gray-500">Candidate:</strong> <span className="font-bold text-gray-900">Ifeoluwa Ayomide</span></div>
                  <div><strong className="text-gray-500">Matric No:</strong> <span className="font-mono font-bold text-forest-dark">CHEP/NUR/2025/0842</span></div>
                  <div><strong className="text-gray-500">Programme:</strong> <span className="text-gray-900">Basic Nursing (ND/HND)</span></div>
                  <div><strong className="text-gray-500">Total Units:</strong> <span className="font-bold text-forest-medium">19 Credit Units</span></div>
                </div>

                <table className="w-full text-left text-xs border border-gray-200">
                  <thead className="bg-gray-50 text-gray-700 font-bold border-b">
                    <tr>
                      <th className="p-2">Code</th>
                      <th className="p-2">Course Module Title</th>
                      <th className="p-2 text-right">Units</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {registeredCourses.map((c) => (
                      <tr key={c.code}>
                        <td className="p-2 font-mono font-bold text-forest-dark">{c.code}</td>
                        <td className="p-2 text-gray-800">{c.title}</td>
                        <td className="p-2 text-right font-bold">{c.units}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="pt-6 border-t border-gray-200 grid grid-cols-3 gap-4 text-center text-xs">
                  <div>
                    <div className="border-b border-gray-400 pb-8 italic font-script text-gray-600">I. Ayomide</div>
                    <span className="text-[10px] font-bold text-gray-700 block mt-1">Student Signature</span>
                  </div>
                  <div>
                    <div className="border-b border-gray-400 pb-8 italic font-script text-forest-dark">V. Adediran (RN)</div>
                    <span className="text-[10px] font-bold text-gray-700 block mt-1">Level Advisor Endorsement</span>
                  </div>
                  <div>
                    <div className="border-b border-gray-400 pb-8 italic font-script text-forest-dark">Dr. R. A. Adeyemi</div>
                    <span className="text-[10px] font-bold text-gray-700 block mt-1">Registrar Stamp</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between print:hidden">
                  <button
                    onClick={() => setShowDocketModal(false)}
                    className="text-xs font-semibold text-gray-600 hover:text-gray-900"
                  >
                    Close Preview
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="bg-forest-base hover:bg-forest-medium text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    Print Official CRF
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
