import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6">
        <div className="max-w-xl w-full text-center bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-emerald-100">
            <span className="material-symbols-outlined text-4xl">local_hospital</span>
          </div>

          <span className="inline-block text-xs uppercase font-extrabold tracking-widest text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
            Error 404 • Resource Not Located
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Clinical Chart Not Found
          </h1>

          <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
            The page or record you are attempting to access does not exist, has been archived under statutory NMCN governance, or the URL address was misdirected.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
            <Link
              href="/"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition-all group"
            >
              <span className="material-symbols-outlined text-emerald-700 group-hover:scale-110 transition-transform">
                home
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900">Institutional Home</p>
                <p className="text-[11px] text-slate-500">Return to main college portal</p>
              </div>
            </Link>

            <Link
              href="/admission"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition-all group"
            >
              <span className="material-symbols-outlined text-emerald-700 group-hover:scale-110 transition-transform">
                school
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900">Admissions Portal</p>
                <p className="text-[11px] text-slate-500">Requirements & application</p>
              </div>
            </Link>

            <Link
              href="/exams"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition-all group"
            >
              <span className="material-symbols-outlined text-emerald-700 group-hover:scale-110 transition-transform">
                assignment
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900">Clinical Examination Hub</p>
                <p className="text-[11px] text-slate-500">CAOSCE, Partograph & OSPE</p>
              </div>
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition-all group"
            >
              <span className="material-symbols-outlined text-emerald-700 group-hover:scale-110 transition-transform">
                support_agent
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900">Registry Support</p>
                <p className="text-[11px] text-slate-500">Contact college admissions desk</p>
              </div>
            </Link>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md shadow-emerald-900/20 transition-all"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Return to College Homepage
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
