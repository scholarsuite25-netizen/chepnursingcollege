<?php
/**
 * CHEP College of Nursing Sciences - Footer Template
 *
 * @package CHEP_Nursing
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<footer class="w-full bg-forest-dark text-white pt-16 pb-8 border-t border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            <!-- Col 1: Institutional Authority -->
            <div class="lg:col-span-4 space-y-4">
                <div class="flex items-center gap-3">
                    <img src="<?php echo esc_url(chep_asset('images/chep_logo.png')); ?>" alt="CHEP Crest" class="h-12 w-auto object-contain bg-white/10 p-1 rounded-xl">
                    <div>
                        <h4 class="text-base font-extrabold text-white leading-tight">CHEP COLLEGE OF NURSING SCIENCES</h4>
                        <span class="text-xs text-primary-fixed uppercase tracking-wider font-semibold">Ota, Ogun State, Nigeria</span>
                    </div>
                </div>
                <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Bridging scientific rigor and compassionate service. Fully accredited by the Nursing &amp; Midwifery Council of Nigeria (NMCN) to train registered nurses and healthcare leaders.
                </p>
                <div class="pt-2 flex items-center gap-2">
                    <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-light bg-white/10 px-3 py-1 rounded-full">
                        <span class="material-symbols-outlined text-[14px]">verified</span> NMCN Regulated
                    </span>
                    <span class="inline-flex items-center gap-1 text-[11px] font-bold text-gray-200 bg-white/10 px-3 py-1 rounded-full">
                        <span class="material-symbols-outlined text-[14px]">school</span> Est. Ota Enclave
                    </span>
                </div>
            </div>

            <!-- Col 2: Academic Programmes -->
            <div class="lg:col-span-3 space-y-3">
                <h5 class="text-xs font-bold uppercase tracking-widest text-primary-fixed">Academic Curricula</h5>
                <ul class="space-y-2 text-xs text-gray-300">
                    <li><a href="<?php echo esc_url(home_url('/admission')); ?>" class="hover:text-white transition-colors">• 3-Year Basic Nursing (General RN)</a></li>
                    <li><a href="<?php echo esc_url(home_url('/admission')); ?>" class="hover:text-white transition-colors">• 18-Month Post-Basic Midwifery (RM)</a></li>
                    <li><a href="<?php echo esc_url(home_url('/admission')); ?>" class="hover:text-white transition-colors">• Geriatric Care Specialization</a></li>
                    <li><a href="<?php echo esc_url(home_url('/admission')); ?>" class="hover:text-white transition-colors">• Public Health Community Outreach</a></li>
                    <li><a href="<?php echo esc_url(home_url('/admission')); ?>" class="hover:text-white transition-colors">• NMCN CBT Continuous Examination</a></li>
                </ul>
            </div>

            <!-- Col 3: Quick Portals -->
            <div class="lg:col-span-2 space-y-3">
                <h5 class="text-xs font-bold uppercase tracking-widest text-primary-fixed">Student Portals</h5>
                <ul class="space-y-2 text-xs text-gray-300">
                    <li><a href="<?php echo esc_url(home_url('/admission')); ?>" class="hover:text-white transition-colors">• Online Admission Form</a></li>
                    <li><a href="<?php echo esc_url(home_url('/about')); ?>" class="hover:text-white transition-colors">• About CHEP College</a></li>
                    <li><a href="<?php echo esc_url(home_url('/gallery')); ?>" class="hover:text-white transition-colors">• Campus Media Gallery</a></li>
                    <li><a href="<?php echo esc_url(home_url('/news')); ?>" class="hover:text-white transition-colors">• Clinical Bulletins</a></li>
                    <li><a href="<?php echo esc_url(home_url('/about')); ?>" class="hover:text-white transition-colors">• Leadership &amp; Senate</a></li>
                </ul>
            </div>

            <!-- Col 4: Campus Location -->
            <div class="lg:col-span-3 space-y-3">
                <h5 class="text-xs font-bold uppercase tracking-widest text-primary-fixed">Campus Enclave</h5>
                <div class="space-y-2 text-xs text-gray-300 leading-relaxed">
                    <p class="flex items-start gap-2">
                        <span class="material-symbols-outlined text-[16px] text-primary-fixed shrink-0 mt-0.5">location_on</span>
                        <span>No. 18, Agbebi Estate Road, Honda Bus-Stop, Agbebi Central CDA, Ota, Ogun State.</span>
                    </p>
                    <p class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-[16px] text-primary-fixed shrink-0">mail</span>
                        <span>registry@chepnursingcollege.org</span>
                    </p>
                    <p class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-[16px] text-primary-fixed shrink-0">call</span>
                        <span>+234 (0) 803 000 0000</span>
                    </p>
                </div>
            </div>
        </div>

        <!-- Sub-Footer -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
            <p>&copy; <?php echo date('Y'); ?> CHEP College of Nursing Sciences. All statutory rights reserved.</p>
            <div class="flex items-center gap-4">
                <span>NMCN Verified</span>
                <span>•</span>
                <span>Florence Nightingale Healthcare Pedagogy</span>
            </div>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
