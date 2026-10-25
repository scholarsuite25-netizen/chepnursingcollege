<?php
/**
 * Template Name: Institutional Portals Hub
 * Description: Unified access gateway for Students, Faculty Preceptors, Alumni, and Applicants
 */
get_header();
?>

<main class="min-h-screen bg-slate-50 pt-28 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-emerald-700">Home</a>
            <span>/</span>
            <span class="text-emerald-800">Portals Gateway</span>
        </div>

        <div class="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 max-w-2xl">
                <span class="inline-block px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
                    Unified Academic Sign-In
                </span>
                <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
                    CHEP Institutional Portal Gateway
                </h1>
                <p class="text-slate-300 text-base leading-relaxed">
                    Select your collegiate role to access the student clinical e-logbook, faculty preceptor approvals, or admission candidate screening dossiers.
                </p>
            </div>
        </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Student Portal -->
            <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                    <span class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-bold mb-4">
                        👩‍⚕️
                    </span>
                    <h3 class="text-xl font-bold text-slate-900">Student Nurse Portal</h3>
                    <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                        Access your clinical ward rotation logbook, dose calculation tools, course syllabi, semester exam dockets, and academic transcripts.
                    </p>
                </div>
                <div class="pt-6 mt-6 border-t border-slate-100">
                    <a href="<?php echo esc_url(home_url('/portal-student')); ?>" class="block text-center py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm">
                        Enter Student Portal →
                    </a>
                </div>
            </div>

            <!-- Faculty Portal -->
            <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                    <span class="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-2xl font-bold mb-4">
                        🩺
                    </span>
                    <h3 class="text-xl font-bold text-slate-900">Faculty &amp; Preceptors</h3>
                    <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                        Evaluate bedside clinical practicum shifts, validate aseptic wound dressing logs, and officially sign student hospital rotation logbooks.
                    </p>
                </div>
                <div class="pt-6 mt-6 border-t border-slate-100">
                    <a href="<?php echo esc_url(home_url('/portal-faculty')); ?>" class="block text-center py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm">
                        Enter Preceptor Desk →
                    </a>
                </div>
            </div>

            <!-- Admissions Screening Slip -->
            <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                    <span class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl font-bold mb-4">
                        📄
                    </span>
                    <h3 class="text-xl font-bold text-slate-900">Admission Candidates</h3>
                    <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                        Lookup your entrance screening schedule, reprint your official 2026/2027 RRR entrance examination slip, and verify screening venues.
                    </p>
                </div>
                <div class="pt-6 mt-6 border-t border-slate-100">
                    <a href="<?php echo esc_url(home_url('/admission')); ?>" class="block text-center py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors">
                        View Screening Slip →
                    </a>
                </div>
            </div>

            <!-- Credential Verification -->
            <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                    <span class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-2xl font-bold mb-4">
                        🛡️
                    </span>
                    <h3 class="text-xl font-bold text-slate-900">Credential Verification</h3>
                    <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                        Public and employer registry portal to verify authentic matriculation numbers and official NMCN licensing records for alumni.
                    </p>
                </div>
                <div class="pt-6 mt-6 border-t border-slate-100">
                    <a href="<?php echo esc_url(home_url('/verify')); ?>" class="block text-center py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors">
                        Verify Graduate Record →
                    </a>
                </div>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>
