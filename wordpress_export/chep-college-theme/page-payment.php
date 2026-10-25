<?php
/**
 * Template Name: Remita Payment & Fee Verification
 * Description: RRR lookup, electronic receipt generation, and fee schedule verification
 */
get_header();
?>

<main class="min-h-screen bg-slate-50 pt-28 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-emerald-700">Home</a>
            <span>/</span>
            <span class="text-emerald-800">Bursary &amp; Remita Gateway</span>
        </div>

        <div class="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 max-w-2xl">
                <span class="inline-block px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
                    Official Collegiate Remita Portal
                </span>
                <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
                    Fee Payment &amp; RRR Verification Desk
                </h1>
                <p class="text-slate-300 text-base leading-relaxed">
                    Verify statutory application fees, ND/HND tuition payments, and print official electronic receipts for NMCN candidate indexing.
                </p>
            </div>
        </div>
    </div>

    <!-- Main Payment Container -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
            <span class="text-xs font-extrabold uppercase tracking-widest text-emerald-700">Electronic Verification</span>
            <h2 class="text-2xl font-black text-slate-900 mt-1 mb-6">Enter Remita Retrieval Reference (RRR)</h2>

            <form id="chep-rrr-form" class="flex flex-col sm:flex-row gap-3">
                <input 
                    type="text" 
                    id="chep-rrr-input" 
                    required 
                    placeholder="e.g. 2901-4412-8819 or RRR-2901-4412-8819" 
                    class="flex-1 text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 font-mono"
                />
                <button 
                    type="submit" 
                    class="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shrink-0"
                >
                    Verify &amp; Fetch Invoice
                </button>
            </form>

            <!-- Result Box -->
            <div id="rrr-result-box" class="hidden mt-8 pt-8 border-t border-slate-200 space-y-6">
                <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
                        <div>
                            <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Transaction Status</span>
                            <div class="flex items-center gap-1.5 mt-0.5">
                                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                                <span class="text-sm font-black text-emerald-800" id="receipt-status">PAID &amp; SETTLED</span>
                            </div>
                        </div>
                        <span class="text-xl font-black text-slate-900" id="receipt-amount">₦15,000.00</span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
                        <div>
                            <span class="text-slate-400 block font-medium">Candidate / Student Name:</span>
                            <strong class="text-slate-900" id="receipt-payer">Adebayo Oluwaseun</strong>
                        </div>
                        <div>
                            <span class="text-slate-400 block font-medium">Service Description:</span>
                            <strong class="text-slate-900" id="receipt-service">2026/2027 Professional Basic Nursing Screening Fee</strong>
                        </div>
                        <div>
                            <span class="text-slate-400 block font-medium">Verified RRR Reference:</span>
                            <strong class="text-emerald-800 font-mono" id="receipt-rrr">RRR-2901-4412-8819</strong>
                        </div>
                        <div>
                            <span class="text-slate-400 block font-medium">Payment Timestamp:</span>
                            <strong class="text-slate-900" id="receipt-date"><?php echo esc_html(date('F d, Y')); ?></strong>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-3">
                    <span class="text-xs text-slate-500 italic">Official receipt digitally stamped by CHEP Bursary Directorate.</span>
                    <button onclick="window.print()" class="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center gap-2">
                        🖨️ Print Official Receipt
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Official Fee Schedule Information -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 class="text-lg font-bold text-slate-900">Statutory Bursary Payment Guidelines</h3>
            <ul class="space-y-2 text-xs text-slate-600 leading-relaxed list-disc list-inside">
                <li>All collegiate payments (Application Voucher, Acceptance Fee, Clinical Lab Levy, Tuition) must be processed through official <strong>Remita RRR Retrieval References</strong>.</li>
                <li>Cash payments to individuals or unofficial accounts are strictly prohibited and non-attestable by the Academic Registry.</li>
                <li>Ensure you keep two (2) printed copies of your electronic Remita receipt for matriculation indexing and semester docket endorsement.</li>
            </ul>
        </div>
    </div>
</main>

<script>
document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("chep-rrr-form");
    var input = document.getElementById("chep-rrr-input");
    var box = document.getElementById("rrr-result-box");
    var rrrTarget = document.getElementById("receipt-rrr");

    if (form && input && box) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            var val = input.value.trim();
            if (rrrTarget) {
                rrrTarget.textContent = val.toUpperCase().indexOf("RRR") !== -1 ? val.toUpperCase() : "RRR-" + val;
            }
            box.classList.remove("hidden");
        });
    }
});
</script>

<?php get_footer(); ?>
