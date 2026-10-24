<?php
/**
 * CHEP College of Nursing Sciences - Single Post Template
 *
 * @package CHEP_Nursing
 */

get_header();
?>

<main class="w-full pt-20 bg-surface-canvas min-h-screen">
    <?php while (have_posts()): the_post(); ?>
        <!-- Header Banner -->
        <section class="w-full bg-forest-dark text-white py-14 px-4 sm:px-8">
            <div class="max-w-4xl mx-auto space-y-4">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-primary-fixed text-xs font-bold uppercase tracking-wider">
                    <span class="material-symbols-outlined text-[16px]">verified</span>
                    Official Academic Dispatch
                </div>
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                    <?php the_title(); ?>
                </h1>
                <div class="flex items-center gap-3 text-xs text-gray-300">
                    <span>By <?php the_author(); ?></span>
                    <span>•</span>
                    <span>Published <?php echo get_the_date('F j, Y'); ?></span>
                </div>
            </div>
        </section>

        <!-- Post Content -->
        <article class="max-w-4xl mx-auto px-4 sm:px-8 py-12">
            <div class="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-border-subtle space-y-6">
                <?php if (has_post_thumbnail()): ?>
                    <div class="rounded-2xl overflow-hidden w-full" style="max-height: 440px;">
                        <?php the_post_thumbnail('large', array('class' => 'w-full h-full object-cover')); ?>
                    </div>
                <?php endif; ?>

                <div class="prose max-w-none text-gray-800 leading-relaxed space-y-4 text-sm sm:text-base">
                    <?php the_content(); ?>
                </div>

                <div class="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <a href="<?php echo esc_url(home_url('/news')); ?>" class="text-xs font-bold text-forest-base hover:underline flex items-center gap-1">
                        <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                        Back to News &amp; Bulletins
                    </a>
                    <button onclick="window.print()" class="text-xs font-bold text-orange-action hover:underline flex items-center gap-1">
                        <span class="material-symbols-outlined text-[16px]">print</span>
                        Print Dispatch
                    </button>
                </div>
            </div>
        </article>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
