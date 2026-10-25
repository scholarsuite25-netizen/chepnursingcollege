"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function AdmissionSlipContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Adebayo Oluwaseun";
  const ref = searchParams.get("ref") || "CHEP/ADM/2026/089";
  const rrr = searchParams.get("rrr") || "RRR-2901-4412-8819";
  const program = searchParams.get("program") || "Basic Nursing (4 Years ND/HND)";
  const batch = searchParams.get("batch") || "Batch A-04 (08:30 AM)";

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 print:p-0 print:bg-white text-gray-900">
      {/* Top Action Bar */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/admission"
          className="text-xs font-semibold text-forest-base hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Admissions
        </Link>
        <button
          onClick={() => window.print()}
          className="bg-forest-base hover:bg-forest-medium text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">print</span>
          Print Official Slip
        </button>
      </div>

      {/* Official Printable Docket */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl print:shadow-none border border-gray-200 p-8 sm:p-12 space-y-6 relative overflow-hidden">
        {/* Crest & Header */}
        <div className="text-center pb-6 border-b-2 border-forest-dark space-y-1">
          <div className="w-16 h-16 rounded-xl bg-forest-base/10 text-forest-base flex items-center justify-center mx-auto mb-2">
            <span className="material-symbols-outlined text-[40px]">local_hospital</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-forest-dark uppercase tracking-tight">
            CHEP College of Nursing Sciences
          </h1>
          <p className="text-xs font-semibold text-gray-600">
            No. 18, Agbebi Estate Road, Honda Bus-Stop, Agbebi Central CDA, Ota, Ogun State.
          </p>
          <div className="inline-block px-3 py-1 bg-surface-tint text-forest-base text-xs font-bold rounded-full uppercase mt-2">
            Official Computer-Based Screening &amp; Verification Slip (2026/2027)
          </div>
        </div>

        {/* Candidate Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[10px]">Candidate Full Name</span>
            <span className="text-sm font-bold text-gray-900">{name}</span>
          </div>
          <div className="space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[10px]">Application Dossier Ref</span>
            <span className="font-mono text-sm font-bold text-forest-dark">{ref}</span>
          </div>
          <div className="space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[10px]">Applied Nursing Program</span>
            <span className="font-semibold text-gray-800">{program}</span>
          </div>
          <div className="space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[10px]">Assigned Remita RRR</span>
            <span className="font-mono text-xs font-bold text-orange-action">{rrr}</span>
          </div>
        </div>

        {/* Screening Schedule Callout */}
        <div className="p-4 rounded-xl bg-surface-tint border border-emerald-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-forest-medium uppercase tracking-wider block">Screening Date &amp; Batch</span>
            <span className="text-sm font-extrabold text-forest-dark">{batch}</span>
          </div>
          <div className="text-right text-xs">
            <span className="text-gray-500 block text-[10px]">Venue</span>
            <span className="font-bold text-gray-800">CBT Center, ICT Complex, CHEP Campus</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-2 text-xs text-gray-700">
          <h4 className="font-bold text-forest-dark uppercase text-[11px] tracking-wide">
            Mandatory Screening Requirements:
          </h4>
          <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed text-gray-600">
            <li>Candidates must arrive with 2 printed copies of this screening slip.</li>
            <li>Original and photocopies of O&apos;Level certificates / statement of results (WAEC, NECO, or NABTEB).</li>
            <li>Proof of remita application fee payment or receipt endorsement.</li>
            <li>Four (4) recent colored passport photographs against a white background.</li>
            <li>Any form of electronic gadgets or programmable calculators are strictly prohibited in the exam hall.</li>
          </ol>
        </div>

        {/* Registrar Signature & Barcode Simulation */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-mono text-xs tracking-widest bg-gray-100 px-3 py-1 rounded inline-block">
              *||| | |||| | |||||| || | ||*
            </div>
            <span className="text-[10px] text-gray-500 block">NMCN Indexing Barcode Node: OG-OTA-041</span>
          </div>

          <div className="text-center sm:text-right">
            <div className="font-script text-base text-forest-dark font-bold italic">
              Samuel E. Akinro
            </div>
            <span className="text-[11px] font-bold text-gray-800 block">Registrar &amp; Secretary to Senate</span>
            <span className="text-[10px] text-gray-500">CHEP College of Nursing Sciences</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdmissionSlipPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 border-4 border-forest-base border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-forest-dark">Generating Official Screening Slip...</p>
          </div>
        </div>
      }
    >
      <AdmissionSlipContent />
    </Suspense>
  );
}
