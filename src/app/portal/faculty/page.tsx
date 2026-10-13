"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getClinicalLogs, approveClinicalLog } from "@/app/actions/clinical";

export default function FacultyPreceptorPortal() {
  const [logs, setLogs] = useState<any[]>([
    {
      id: "demo-1",
      student_name: "Ifeoluwa Ayomide",
      matric_number: "CHEP/NUR/2025/0842",
      hospital_unit: "State Hospital Ota (Adult Surgical Ward)",
      shift_date: "2026-03-24",
      hours: 8,
      procedure_notes: "Administered prescribed IV Ceftriaxone, performed aseptic surgical wound dressing, recorded 2-hourly post-operative vitals.",
      preceptor_signed: true,
    },
    {
      id: "demo-2",
      student_name: "Chukwuemeka Blessing",
      matric_number: "CHEP/NUR/2025/0921",
      hospital_unit: "State Hospital Ota (Maternity Labor Ward)",
      shift_date: "2026-03-27",
      hours: 12,
      procedure_notes: "Monitored fetal heart rates via Doppler ultrasound, assisted staff midwife with Stage 2 labor delivery, recorded APGAR scores at 1 & 5 mins.",
      preceptor_signed: false,
    },
    {
      id: "demo-3",
      student_name: "Fatima Balarabe Umar",
      matric_number: "CHEP/NUR/2025/0774",
      hospital_unit: "OOUTH Sagamu (Intensive Care Unit)",
      shift_date: "2026-03-28",
      hours: 8,
      procedure_notes: "Assisted with tracheostomy suctioning, recorded arterial line blood pressure monitoring, administered enteral nutrition feeding.",
      preceptor_signed: false,
    },
  ]);

  const [filterState, setFilterState] = useState<"all" | "pending" | "signed">("pending");

  useEffect(() => {
    async function load() {
      const res = await getClinicalLogs();
      if (res.success && res.data && res.data.length > 0) {
        setLogs((prev) => [...res.data, ...prev.filter(p => !res.data.some((d: any) => d.id === p.id))]);
      }
    }
    load();
  }, []);

  const handleApprove = async (id: string) => {
    setLogs((prev) =>
      prev.map((l) => (l.id === id ? { ...l, preceptor_signed: true } : l))
    );
    await approveClinicalLog(id);
    alert("Clinical shift validated and officially signed in the student's NMCN logbook!");
  };

  const filteredLogs = logs.filter((l) => {
    if (filterState === "pending") return !l.preceptor_signed;
    if (filterState === "signed") return l.preceptor_signed;
    return true;
  });

  return (
    <>
      <Navbar />

      <main className="w-full pt-20 bg-surface-canvas min-h-screen">
        {/* Preceptor Header */}
        <section className="w-full bg-forest-dark text-white py-8 px-4 sm:px-8 border-b border-forest-base">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-primary-fixed overflow-hidden flex items-center justify-center text-primary-fixed shrink-0">
                <span className="material-symbols-outlined text-[36px]">stethoscope</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-white">Matron Victoria ADEDIRAN</h1>
                  <span className="bg-orange-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                    Clinical Director
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300">
                  <span>Role: <strong className="text-white">Director of Clinical Training &amp; Hospital Practicum</strong></span>
                  <span>•</span>
                  <span>Base: <strong className="text-primary-fixed">State Hospital Ota &amp; CHEP Enclave</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/portal"
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </section>

        {/* Workspace */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
          {/* Preceptor Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between">
              <span className="text-xs uppercase font-bold text-text-muted">Awaiting Your Signature</span>
              <div className="my-2">
                <span className="text-3xl font-extrabold text-orange-action">
                  {logs.filter((l) => !l.preceptor_signed).length}
                </span>
                <span className="text-xs text-text-muted block mt-1">Pending student shifts</span>
              </div>
              <span className="text-[11px] text-orange-action font-semibold">Immediate action required</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between">
              <span className="text-xs uppercase font-bold text-text-muted">Approved Hours (March)</span>
              <div className="my-2">
                <span className="text-3xl font-extrabold text-forest-dark">348</span>
                <span className="text-xs text-text-muted block mt-1">Certified logbook hours</span>
              </div>
              <span className="text-[11px] text-forest-medium font-semibold">Indexed to NMCN database</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between">
              <span className="text-xs uppercase font-bold text-text-muted">Active Student Trainees</span>
              <div className="my-2">
                <span className="text-3xl font-extrabold text-gray-900">42</span>
                <span className="text-xs text-text-muted block mt-1">Under your hospital supervision</span>
              </div>
              <span className="text-[11px] text-text-muted">Rotating in Ota &amp; Sagamu</span>
            </div>
          </div>

          {/* Clinical Shift Verification Queue */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-border-subtle space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-forest-dark">Clinical Logbook Verification Queue</h3>
                <p className="text-xs text-text-muted">Inspect procedures performed and sign off student clinical hours.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterState("pending")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterState === "pending"
                      ? "bg-orange-action text-white shadow-xs"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Pending Signature ({logs.filter((l) => !l.preceptor_signed).length})
                </button>
                <button
                  onClick={() => setFilterState("signed")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterState === "signed"
                      ? "bg-forest-base text-white shadow-xs"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Signed &amp; Approved
                </button>
                <button
                  onClick={() => setFilterState("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterState === "all"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  All Logs
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredLogs.length === 0 ? (
                <div className="p-12 text-center text-text-muted text-sm">
                  <span className="material-symbols-outlined text-[48px] text-gray-300 block mb-2">task_alt</span>
                  No clinical logs matching this filter.
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-5 rounded-2xl bg-surface-canvas border border-border-subtle space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-forest-base/10 text-forest-base font-bold flex items-center justify-center text-xs">
                          RN
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 block text-sm">
                            {log.student_name || "Ifeoluwa Ayomide"}
                          </span>
                          <span className="text-xs text-text-muted">
                            Matric: {log.matric_number || "CHEP/NUR/2025/0842"} • Shift Date: {log.shift_date}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="bg-white px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-bold text-gray-700">
                          {log.hours} Hours
                        </span>
                        {log.preceptor_signed ? (
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">verified</span>
                            Officially Signed
                          </span>
                        ) : (
                          <button
                            onClick={() => handleApprove(log.id)}
                            className="bg-forest-base hover:bg-forest-medium text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-xs transition-colors flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">edit_document</span>
                            Sign &amp; Approve Shift
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-gray-100 text-xs text-gray-800 space-y-1">
                      <span className="text-[11px] font-bold text-forest-dark uppercase block">
                        Facility: {log.hospital_unit}
                      </span>
                      <p className="leading-relaxed">{log.procedure_notes}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
