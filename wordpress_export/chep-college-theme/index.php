<?php
/**
 * CHEP College of Nursing Sciences - News & Blog Index Template
 *
 * @package CHEP_Nursing
 */

get_header();
?>

<main class="w-full pt-20 bg-surface-canvas min-h-screen">
    <!-- Header Banner -->
    <section class="w-full bg-forest-dark text-white py-16 px-4 sm:px-8">
        <div class="max-w-7xl mx-auto space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-primary-fixed text-xs font-bold uppercase tracking-wider">
                <span class="material-symbols-outlined text-[16px]">newspaper</span>
                Institutional Dispatch • Academic Affairs Press
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                Clinical Insights, Bulletins &amp; Research
            </h1>
            <p class="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed">
                Authoritative updates from CHEP College of Nursing Sciences faculty, NMCN regulatory notices, clinical posting schedules, and student scholarship dossiers.
            </p>
        </div>
    </section>

    <!-- News Articles Grid -->
    <section class="w-full py-12 px-4 sm:px-8 bg-surface-canvas">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php if (have_posts()): while (have_posts()): the_post(); ?>
                    <article class="bg-white rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div>
                            <div class="w-full h-48 bg-gray-100 overflow-hidden">
                                <?php if (has_post_thumbnail()): ?>
                                    <?php the_post_thumbnail('medium_large', array('class' => 'w-full h-full object-cover')); ?>
                                <?php else: ?>
                                    <img src="<?php echo esc_url(chep_asset('images/disaster_week.jpg')); ?>" alt="<?php the_title_attribute(); ?>" class="w-full h-full object-cover">
                                <?php endif; ?>
                            </div>
                            <div class="p-5">
                                <div class="flex items-center gap-2 text-xs text-text-muted mb-2">
                                    <span><?php echo get_the_date('d/m/Y'); ?></span>
                                    <span>•</span>
                                    <span><?php the_author(); ?></span>
                                </div>
                                <h3 class="text-base font-bold text-gray-900 leading-snug">
                                    <a href="<?php the_permalink(); ?>" class="hover:text-forest-base transition-colors">
                                        <?php the_title(); ?>
                                    </a>
                                </h3>
                                <p class="text-xs text-text-muted mt-2 leading-relaxed">
                                    <?php echo wp_trim_words(get_the_excerpt(), 20, '...'); ?>
                                </p>
                            </div>
                        </div>
                        <div class="p-5 pt-0 border-t border-gray-50 flex items-center justify-between mt-2">
                            <span class="text-xs font-semibold text-forest-medium">Academic Registry</span>
                            <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-orange-action hover:underline">
                                Read Dispatch &rarr;
                            </a>
                        </div>
                    </article>
                <?php endwhile; else: ?>
                    <!-- Default Static News if no posts created yet -->
                    <article class="bg-white rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between overflow-hidden">
                        <div>
                            <div class="w-full h-48 bg-gray-100 overflow-hidden">
                                <img src="<?php echo esc_url(chep_asset('images/chep_geriatrics_3.jpg')); ?>" alt="Geriatric Care" class="w-full h-full object-cover">
                            </div>
                            <div class="p-5">
                                <div class="flex items-center gap-2 text-xs text-text-muted mb-2"><span>20/03/2026</span> • <span>5 min read</span></div>
                                <h3 class="text-base font-bold text-gray-900 leading-snug">Comprehensive Geriatric Assessments (CGA): Redefining Senior Well-being</h3>
                                <p class="text-xs text-text-muted mt-2 leading-relaxed">Geriatric syndromes require multi-dimensional assessment protocols. CHEP student researchers present findings from clinical fieldwork in Ogun State.</p>
                            </div>
                        </div>
                    </article>
                    <article class="bg-white rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between overflow-hidden">
                        <div>
                            <div class="w-full h-48 bg-gray-100 overflow-hidden">
                                <img src="<?php echo esc_url(chep_asset('images/disaster_week.jpg')); ?>" alt="Disaster Preparedness" class="w-full h-full object-cover">
                            </div>
                            <div class="p-5">
                                <div class="flex items-center gap-2 text-xs text-text-muted mb-2"><span>01/04/2026</span> • <span>4 min read</span></div>
                                <h3 class="text-base font-bold text-gray-900 leading-snug">Community Health Nursing: Emergency Fieldwork &amp; Primary Care</h3>
                                <p class="text-xs text-text-muted mt-2 leading-relaxed">Preventative epidemiology and emergency trauma drills form Nigeria's frontline defense. An analysis of CHEP's rural immersion cohorts in Agbebi Central.</p>
                            </div>
                        </div>
                    </article>
                    <article class="bg-white rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between overflow-hidden">
                        <div>
                            <div class="w-full h-48 bg-gray-100 overflow-hidden">
                                <img src="<?php echo esc_url(chep_asset('images/examination_hall.jpg')); ?>" alt="CBT Examinations" class="w-full h-full object-cover">
                            </div>
                            <div class="p-5">
                                <div class="flex items-center gap-2 text-xs text-text-muted mb-2"><span>14/03/2026</span> • <span>3 min read</span></div>
                                <h3 class="text-base font-bold text-gray-900 leading-snug">NMCN Standardized CBT Examinations &amp; Academic Probity Protocols</h3>
                                <p class="text-xs text-text-muted mt-2 leading-relaxed">Modern digital examination terminal protocols ensuring flawless indexing, transparent assessment records, and seamless council clearance.</p>
                            </div>
                        </div>
                    </article>
                <?php endif; ?>
            </div>

            <!-- Pagination -->
            <div class="mt-8 text-center">
                <?php the_posts_pagination(array(
                    'prev_text' => '&larr; Previous',
                    'next_text' => 'Next &rarr;',
                )); ?>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
