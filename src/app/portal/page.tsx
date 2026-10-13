"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PortalPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"student" | "alumni" | "faculty" | "applicant">("student");
  const [session, setSession] = useState("2025/2026");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const roleConfig = {
    student: {
      label: "Matriculation / NMCN Index Number",
      placeholder: "e.g. CHEP/NUR/2025/0842",
      badge: "Verified Student Format",
      welcome: "Student Nurse Central Portal",
      targetUrl: "/portal/student",
      actionText: "Launch Student e-Clinical Logbook & Dashboard",
    },
    alumni: {
      label: "Graduation Reg / NMCN License Number",
      placeholder: "e.g. CHEP/ALUM/2024/0119",
      badge: "Verified Alumni Dossier",
      welcome: "Alumni Transcript & Licensing Hub",
      targetUrl: "/portal/student",
      actionText: "Access Alumni Records & NMCN Verification",
    },
    faculty: {
      label: "Institutional Staff ID Number",
      placeholder: "e.g. CHEP/STAFF/MED/004",
      badge: "Faculty Academic Roster",
      welcome: "Preceptor & Clinical Examiner Portal",
      targetUrl: "/portal/faculty",
      actionText: "Launch Faculty Preceptor Sign-Off Desk",
    },
    applicant: {
      label: "JAMB Registration or Screening Voucher",
      placeholder: "e.g. 2026/CHEP/ADM/9924",
      badge: "Admission Candidate Record",
      welcome: "Candidate Screening & Status Tracking",
      targetUrl: "/admission/slip",
      actionText: "View Official Screening Slip & Status",
    },
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
      const target = roleConfig[selectedRole].targetUrl;
      setTimeout(() => {
        router.push(target);
      }, 1200);
    }, 800);
  };

  return (
    <>
      <Navbar />

      <main className="w-full pt-20 bg-surface-canvas min-h-screen">
        {/* Security & Status Bar */}
        <div className="w-full bg-forest-dark text-white py-2 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-forest-medium text-emerald-light font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-accent mr-1.5 animate-pulse"></span>
                PORTAL LIVE • 2026/2027 ACADEMIC SESSION
              </span>
              <span className="hidden md:inline text-gray-300">
                NMCN Indexing, e-Logbook &amp; Remita Verification Gateway
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <span className="flex items-center gap-1 text-primary-fixed">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                256-Bit TLS Encrypted
              </span>
              <span>|</span>
              <a href="#helpdesk" className="hover:text-white transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">headset_mic</span>
                ICT Helpdesk
              </a>
            </div>
          </div>
        </div>

        {/* Breadcrumb Strip */}
        <div className="w-full bg-white border-b border-border-subtle py-3 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-text-muted">
            <nav className="flex items-center gap-1.5">
              <Link href="/" className="hover:text-forest-base transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">home</span>
                Home
              </Link>
              <span>/</span>
              <span>CHEP Network</span>
              <span>/</span>
              <span className="text-forest-dark font-bold">Portal Gateway &amp; SSO</span>
            </nav>
            <div className="hidden sm:flex items-center gap-1 text-forest-medium font-semibold text-xs">
              <span className="material-symbols-outlined text-[16px]">school</span>
              Accredited by Nursing &amp; Midwifery Council of Nigeria (NMCN)
            </div>
          </div>
        </div>

        {/* Gateway Section */}
        <section className="w-full py-12 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Academic Gateway Features */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-light text-forest-dark text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-forest-medium">account_balance</span>
                  Unified Health Academic Network (UHAN)
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-dark tracking-tight leading-tight">
                  Welcome to the CHEP Academic &amp; Clinical Gateway
                </h1>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  Access your personalized clinical rotation logs, verify Remita RRR school fee clearances, register semester nursing modules, and interact directly with preceptors across our affiliated tertiary medical centers.
                </p>
              </div>

              {/* 4 Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white shadow-xs border border-border-subtle hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-xl bg-emerald-light flex items-center justify-center text-forest-base mb-3">
                    <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
                  </div>
                  <h3 className="font-bold text-base text-forest-dark mb-1">Course &amp; Exam Slips</h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Complete basic nursing semester registration and download biometric exam clearance passes.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white shadow-xs border border-border-subtle hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-forest-medium mb-3">
                    <span className="material-symbols-outlined text-[24px]">clinical_notes</span>
                  </div>
                  <h3 className="font-bold text-base text-forest-dark mb-1">e-Clinical Logbook</h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Record bedside procedure hours, pediatric ward shifts, and preceptor verified sign-offs.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white shadow-xs border border-border-subtle hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-forest-dark mb-3">
                    <span className="material-symbols-outlined text-[24px]">payments</span>
                  </div>
                  <h3 className="font-bold text-base text-forest-dark mb-1">Remita RRR Verification</h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Instant RRR transaction validation, tuition receipts, and NMCN examination index records.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white shadow-xs border border-border-subtle hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 mb-3">
                    <span className="material-symbols-outlined text-[24px]">local_library</span>
                  </div>
                  <h3 className="font-bold text-base text-forest-dark mb-1">Virtual Library SSO</h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Single-sign-on directly into Librarika OPAC, ScienceDirect, and PubMed medical journals.
                  </p>
                </div>
              </div>

              {/* Senate Alert Banner */}
              <div className="p-6 rounded-2xl bg-forest-dark text-white shadow-md relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-primary-fixed">
                    <span className="material-symbols-outlined text-[22px]">campaign</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-primary-fixed uppercase tracking-wider">
                      Senate Notice • Hospital Postings
                    </span>
                    <h4 className="text-base font-bold text-white">2026 First Semester Hospital Postings</h4>
                    <p className="text-xs text-gray-200 leading-relaxed">
                      All Year II &amp; Year III Student Nurses must verify logged rotation shifts before Friday. Hospital preceptor digital signatures close automatically on portal midnight.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Authentication Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-border-subtle sticky top-28">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-forest-medium block">
                      Secure Gateway
                    </span>
                    <h2 className="text-xl font-bold text-forest-dark">CHEP Network SSO</h2>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-forest-base/10 flex items-center justify-center text-forest-base">
                    <span className="material-symbols-outlined text-[26px]">lock</span>
                  </div>
                </div>

                {/* Role Tabs */}
                <div className="py-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-surface-canvas rounded-xl">
                    {(["student", "alumni", "faculty", "applicant"] as const).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`py-2 text-center rounded-lg text-xs font-bold capitalize transition-all ${
                          selectedRole === role
                            ? "bg-forest-base text-white shadow-xs"
                            : "text-gray-600 hover:text-forest-dark hover:bg-white"
                        }`}
                      >
                        {role === "student" ? "Student" : role}
                      </button>
                    ))}
                  </div>
                </div>

                {isLoggedIn ? (
                  <div className="p-6 rounded-2xl bg-surface-tint border border-emerald-100 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                      <span className="material-symbols-outlined text-[32px]">check</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-forest-dark">Authentication Successful!</h3>
                      <p className="text-xs text-text-muted mt-1">
                        Session verified for <strong>{identifier || "CHEP/NUR/2025/0842"}</strong>. Redirecting automatically...
                      </p>
                    </div>
                    <div className="pt-2">
                      <Link
                        href={roleConfig[selectedRole].targetUrl}
                        className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-forest-base hover:bg-forest-dark text-white font-bold text-sm shadow-md transition-all"
                      >
                        <span>{roleConfig[selectedRole].actionText}</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </Link>
                    </div>
                    <div className="pt-1">
                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className="text-xs font-semibold text-gray-500 hover:text-forest-dark"
                      >
                        Cancel / Switch Role
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-4">
                    {/* Academic Session */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Academic Session</label>
                      <select
                        value={session}
                        onChange={(e) => setSession(e.target.value)}
                        className="w-full h-11 px-3 bg-surface-canvas text-gray-900 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-forest-base"
                      >
                        <option value="2025/2026">2025/2026 Academic Session (Current)</option>
                        <option value="2024/2025">2024/2025 Academic Session</option>
                        <option value="alumni">Historical / Archive Registry</option>
                      </select>
                    </div>

                    {/* ID Input */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-700 block">
                          {roleConfig[selectedRole].label}
                        </label>
                        <span className="text-[11px] font-semibold text-forest-medium">
                          {roleConfig[selectedRole].badge}
                        </span>
                      </div>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-gray-400">
                          badge
                        </span>
                        <input
                          type="text"
                          required
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          placeholder={roleConfig[selectedRole].placeholder}
                          className="w-full h-11 pl-10 pr-3 bg-surface-canvas text-gray-900 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-forest-base"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-700 block">Portal Password / PIN</label>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert("Please contact the ICT Directorate or your Level Advisor with your admission letter to reset your PIN.");
                          }}
                          className="text-[11px] font-semibold text-orange-action hover:underline"
                        >
                          Forgot PIN?
                        </a>
                      </div>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-gray-400">
                          key
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full h-11 pl-10 pr-10 bg-surface-canvas text-gray-900 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-forest-base"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-orange-action hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {loading ? (
                          <>
                            <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                            <span>Authenticating with NMCN Index...</span>
                          </>
                        ) : (
                          <>
                            <span>Sign In to CHEP Portal</span>
                            <span className="material-symbols-outlined text-[20px]">login</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* Quick Direct Access */}
                <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Direct Navigation Shortcuts
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Link
                      href="/portal/student"
                      className="p-2.5 rounded-lg border border-gray-200 bg-surface-canvas hover:border-forest-base hover:bg-surface-tint font-semibold text-forest-dark flex items-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px] text-forest-medium">assignment</span>
                      Student e-Logbook
                    </Link>
                    <Link
                      href="/portal/faculty"
                      className="p-2.5 rounded-lg border border-gray-200 bg-surface-canvas hover:border-forest-base hover:bg-surface-tint font-semibold text-forest-dark flex items-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px] text-forest-medium">clinical_notes</span>
                      Faculty Preceptor
                    </Link>
                    <Link
                      href="/admission/slip"
                      className="p-2.5 rounded-lg border border-gray-200 bg-surface-canvas hover:border-forest-base hover:bg-surface-tint font-semibold text-forest-dark flex items-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px] text-forest-medium">badge</span>
                      Screening Slip
                    </Link>
                    <Link
                      href="/payment"
                      className="p-2.5 rounded-lg border border-gray-200 bg-surface-canvas hover:border-forest-base hover:bg-surface-tint font-semibold text-forest-dark flex items-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px] text-forest-medium">receipt_long</span>
                      Remita Gateway
                    </Link>
                  </div>
                </div>

                {/* Helpdesk Notice */}
                <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs text-text-muted" id="helpdesk">
                  <div className="flex items-center gap-2 font-bold text-forest-dark">
                    <span className="material-symbols-outlined text-[16px] text-forest-base">verified</span>
                    ICT Directorate Helpdesk
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span>Helpline: +234 916 635 674</span>
                    <a href="mailto:it-support@chepnursingcollege.org" className="text-forest-base hover:underline">
                      it-support@chepnursingcollege.org
                    </a>
                  </div>
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
