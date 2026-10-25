<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="manifest" href="<?php echo esc_url(get_template_directory_uri() . '/manifest.json'); ?>">
    <meta name="theme-color" content="#064e3b">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <link rel="apple-touch-icon" href="<?php echo esc_url(chep_asset('images/chep_logo.png')); ?>">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Main Fixed Navbar -->
<header class="chep-navbar">
    <!-- Top Authority Sub-Bar -->
    <div class="w-full bg-forest-dark text-white py-1 px-4 sm:px-8 border-b border-white/10 text-xs">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3">
                <span class="inline-flex items-center gap-1 font-bold text-primary-fixed">
                    <span class="material-symbols-outlined text-[14px]">verified</span>
                    NMCN ACCREDITED INSTITUTION
                </span>
                <span class="hidden sm:inline text-gray-300">•</span>
                <span class="hidden sm:inline text-gray-300">Statutory Nursing Authority in Southwest Nigeria</span>
            </div>
            <div class="flex items-center gap-4 text-[11px] text-gray-300">
                <span class="hidden md:inline">Ota Campus: No. 18 Agbebi Estate Road, Honda B/Stop</span>
                <a href="<?php echo esc_url(home_url('/about')); ?>" class="text-primary-fixed hover:underline font-bold flex items-center gap-0.5">
                    <span class="material-symbols-outlined text-[14px]">school</span> Official Collegiate Registry
                </a>
            </div>
        </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        <!-- Logo -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-3">
            <img src="<?php echo esc_url(chep_asset('images/chep_logo.png')); ?>" alt="CHEP College of Nursing Sciences" class="h-10 sm:h-12 w-auto object-contain">
            <div class="hidden lg:block">
                <span class="font-extrabold text-base leading-tight text-forest-dark block">CHEP COLLEGE OF NURSING SCIENCES</span>
                <span class="text-[11px] text-forest-medium font-semibold uppercase tracking-wider block">Ota, Ogun State • NMCN Accredited</span>
            </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-forest-base transition-colors">Home</a>
            <a href="<?php echo esc_url(home_url('/about')); ?>" class="hover:text-forest-base transition-colors">About Us</a>
            
            <div class="chep-dropdown py-2">
                <a href="<?php echo esc_url(home_url('/admission')); ?>" class="hover:text-forest-base transition-colors flex items-center gap-1">
                    Academics <span class="material-symbols-outlined text-[16px]">expand_more</span>
                </a>
                <div class="chep-dropdown-menu">
                    <a href="<?php echo esc_url(home_url('/admission')); ?>" class="block p-2 rounded-lg hover:bg-surface-tint">
                        <strong class="text-forest-dark text-xs block">Admission &amp; Screening</strong>
                        <span class="text-[11px] text-text-muted">Requirements, 3-Yr Basic Nursing</span>
                    </a>
                    <a href="<?php echo esc_url(home_url('/admission#tuition')); ?>" class="block p-2 rounded-lg hover:bg-surface-tint mt-1">
                        <strong class="text-forest-dark text-xs block">Tuition &amp; Fees</strong>
                        <span class="text-[11px] text-text-muted">Transparent schedule of fees</span>
                    </a>
                </div>
            </div>

            <a href="<?php echo esc_url(home_url('/exams')); ?>" class="hover:text-forest-base transition-colors text-emerald-800 font-extrabold flex items-center gap-1">
                <span>Clinical Exams</span>
                <span class="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-black">CAOSCE</span>
            </a>
            <a href="<?php echo esc_url(home_url('/clinical-reflections')); ?>" class="hover:text-forest-base transition-colors">Reflections</a>
            <a href="<?php echo esc_url(home_url('/library')); ?>" class="hover:text-forest-base transition-colors">e-Library</a>
            <a href="<?php echo esc_url(home_url('/gallery')); ?>" class="hover:text-forest-base transition-colors">Gallery</a>
            <a href="<?php echo esc_url(home_url('/news')); ?>" class="hover:text-forest-base transition-colors">News</a>
            <a href="<?php echo esc_url(home_url('/contact')); ?>" class="hover:text-forest-base transition-colors">Contact</a>
            <a href="<?php echo esc_url(home_url('/portal')); ?>" class="hover:text-forest-base transition-colors">Portals</a>
        </nav>

        <!-- Right Action Buttons -->
        <div class="flex items-center gap-3">
            <a href="<?php echo esc_url(home_url('/admission')); ?>" class="chep-btn-primary text-xs py-2 px-4 shadow-sm">
                Apply for Admission
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>

            <!-- Mobile Hamburger Toggle -->
            <button id="chep-mobile-toggle" aria-label="Open navigation menu" class="md:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700">
                <span class="material-symbols-outlined text-[24px]">menu</span>
            </button>
        </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <div id="chep-mobile-menu" class="md:hidden border-t border-border-subtle bg-white px-4 py-4 space-y-3" style="display: none;">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="block font-semibold text-sm text-forest-dark py-2 border-b border-gray-100">Home</a>
        <a href="<?php echo esc_url(home_url('/about')); ?>" class="block font-semibold text-sm text-forest-dark py-2 border-b border-gray-100">About Us &amp; Governance</a>
        <a href="<?php echo esc_url(home_url('/admission')); ?>" class="block font-semibold text-sm text-forest-dark py-2 border-b border-gray-100">Admissions &amp; Application Form</a>
        <a href="<?php echo esc_url(home_url('/exams')); ?>" class="block font-semibold text-sm text-emerald-800 py-2 border-b border-gray-100">Clinical Examination Academy (CAOSCE)</a>
        <a href="<?php echo esc_url(home_url('/clinical-reflections')); ?>" class="block font-semibold text-sm text-forest-dark py-2 border-b border-gray-100">Clinical Reflections Forum</a>
        <a href="<?php echo esc_url(home_url('/library')); ?>" class="block font-semibold text-sm text-forest-dark py-2 border-b border-gray-100">e-Library &amp; Repository</a>
        <a href="<?php echo esc_url(home_url('/gallery')); ?>" class="block font-semibold text-sm text-forest-dark py-2 border-b border-gray-100">Campus Media Gallery</a>
        <a href="<?php echo esc_url(home_url('/news')); ?>" class="block font-semibold text-sm text-forest-dark py-2 border-b border-gray-100">News &amp; Clinical Dispatches</a>
        <a href="<?php echo esc_url(home_url('/contact')); ?>" class="block font-semibold text-sm text-forest-dark py-2 border-b border-gray-100">Contact &amp; Tours</a>
        <a href="<?php echo esc_url(home_url('/portal')); ?>" class="block font-semibold text-sm text-forest-dark py-2 border-b border-gray-100">Student &amp; Faculty Portals</a>
    </div>
</header>
