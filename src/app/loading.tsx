export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-6">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-2xl bg-emerald-100 border border-emerald-300 animate-pulse"></div>
          <div className="absolute inset-2 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-md animate-bounce">
            <span className="material-symbols-outlined text-2xl">local_hospital</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-widest">
            CHEP College of Nursing Sciences
          </h3>
          <p className="text-xs text-slate-500 mt-1">Synchronizing clinical protocols & resources...</p>
        </div>
      </div>
    </div>
  );
}
