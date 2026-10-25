"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected runtime errors for observability and SRE monitoring
    console.error("Clinical System Exception Trapped:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-sans p-4 sm:p-6">
      <div className="max-w-lg w-full bg-slate-800/90 border border-rose-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl text-center">
        <div className="w-20 h-20 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-rose-500/20 shadow-inner">
          <span className="material-symbols-outlined text-4xl">warning</span>
        </div>

        <span className="inline-block text-xs uppercase font-extrabold tracking-widest text-rose-400 bg-rose-950/80 px-3.5 py-1 rounded-full mb-3 border border-rose-800">
          Runtime System Safeguard Triggered
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
          Clinical Encounter Interrupted
        </h1>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          An unhandled state error occurred while rendering this module. Patient data integrity and session boundaries remain fully protected.
        </p>

        {error.digest && (
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-700/60 text-xs font-mono text-slate-400 mb-6 break-all">
            Incident Hash: {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">refresh</span>
            Retry Transaction
          </button>

          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm transition-all"
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Return to Safety
          </Link>
        </div>
      </div>
    </div>
  );
}
