<?php
/**
 * Template Name: e-Library & Research Repository
 * Description: Electronic textbooks, peer-reviewed nursing journals, and clinical reference library
 */
get_header();

$categories = [
    'All Categories',
    'Medical-Surgical',
    'Maternal & Child Health',
    'Pharmacology',
    'Anatomy & Physiology',
    'Foundations of Nursing',
    'Public & Community Health',
];

$ebooks = [
    [
        'title' => "Brunner & Suddarth's Textbook of Medical-Surgical Nursing (15th Ed.)",
        'authors' => 'Janice L. Hinkle, Kerry H. Cheever',
        'category' => 'Medical-Surgical',
        'year' => '2024',
        'desc' => 'The premier authority on pathophysiological assessment, surgical nursing care plans, and acute clinical interventions.',
    ],
    [
        'title' => 'Pharmacology and the Nursing Process (10th Ed.)',
        'authors' => 'Linda Lane Lilley, Shelly Rainforth Collins',
        'category' => 'Pharmacology',
        'year' => '2023',
        'desc' => 'Essential drug classifications, dosage calculations, pharmacokinetics, and safe intravenous administration guidelines.',
    ],
    [
        'title' => 'Myles Textbook for Midwives (17th Ed.)',
        'authors' => 'Jayne E. Marshall, Maureen D. Raynor',
        'category' => 'Maternal & Child Health',
        'year' => '2023',
        'desc' => 'The gold-standard reference for antenatal monitoring, labor mechanics, neonatal resuscitation, and obstetric emergencies.',
    ],
    [
        'title' => "Ross & Wilson Anatomy and Physiology in Health and Illness (14th Ed.)",
        'authors' => 'Anne Waugh, Allison Grant',
        'category' => 'Anatomy & Physiology',
        'year' => '2022',
        'desc' => 'Comprehensive macroscopic anatomical structures, organ systemic physiology, and homeostatic regulation mechanisms.',
    ],
    [
        'title' => 'Potter & Perry’s Fundamentals of Nursing (11th Ed.)',
        'authors' => 'Patricia A. Potter, Anne Griffin Perry',
        'category' => 'Foundations of Nursing',
        'year' => '2024',
        'desc' => 'Aseptic techniques, vital signs monitoring, bed-making, catheterization, and evidence-based clinical reasoning.',
    ],
    [
        'title' => 'Community & Public Health Nursing in Developing Nations',
        'authors' => 'Adenike O. Balogun, Chioma E. Nwachukwu',
        'category' => 'Public & Community Health',
        'year' => '2023',
        'desc' => 'Epidemiological surveillance, immunization chains, maternal-child survival strategies, and rural health clinics in Nigeria.',
    ],
];
?>

<main class="min-h-screen bg-slate-50 pt-28 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-emerald-700">Home</a>
            <span>/</span>
            <span class="text-emerald-800">e-Library Catalog</span>
        </div>

        <div class="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 max-w-2xl">
                <span class="inline-block px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
                    Academic Research &amp; Clinical Texts
                </span>
                <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
                    Collegiate e-Library &amp; Repository
                </h1>
                <p class="text-slate-300 text-base leading-relaxed">
                    Access over 200 accredited nursing textbooks, peer-reviewed clinical research papers, and pharmacology references approved for NMCN curricula.
                </p>
            </div>
        </div>
    </div>

    <!-- Search & Filter Controls -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div class="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="w-full md:w-96 relative">
                <input 
                    type="text" 
                    id="library-search" 
                    placeholder="Search textbook title, author, or keyword..." 
                    class="w-full text-xs p-3 pl-9 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                />
                <span class="absolute left-3 top-3 text-slate-400 text-xs">🔍</span>
            </div>

            <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                <?php foreach ($categories as $cat): ?>
                    <button 
                        class="lib-cat-btn px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all <?php echo $cat === 'All Categories' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'; ?>"
                        data-category="<?php echo esc_attr($cat); ?>"
                    >
                        <?php echo esc_html($cat); ?>
                    </button>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- e-Books Catalog Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="library-grid">
            <?php foreach ($ebooks as $b): ?>
                <div class="lib-card bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between" data-category="<?php echo esc_attr($b['category']); ?>">
                    <div>
                        <div class="flex items-center justify-between gap-2 mb-3">
                            <span class="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                                <?php echo esc_html($b['category']); ?>
                            </span>
                            <span class="text-slate-400 text-xs font-mono"><?php echo esc_html($b['year']); ?></span>
                        </div>
                        <h3 class="text-base font-bold text-slate-900 leading-snug"><?php echo esc_html($b['title']); ?></h3>
                        <p class="text-xs font-semibold text-emerald-700 mt-1"><?php echo esc_html($b['authors']); ?></p>
                        <p class="text-xs text-slate-600 mt-3 leading-relaxed"><?php echo esc_html($b['desc']); ?></p>
                    </div>

                    <div class="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                        <span class="text-[11px] font-mono text-slate-500">📖 Full e-Text Available</span>
                        <button class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold">
                            Read e-Text →
                        </button>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</main>

<script>
document.addEventListener("DOMContentLoaded", function() {
    var searchInput = document.getElementById("library-search");
    var catButtons = document.querySelectorAll(".lib-cat-btn");
    var cards = document.querySelectorAll(".lib-card");
    var activeCategory = "All Categories";

    function filterCards() {
        var q = (searchInput ? searchInput.value : "").toLowerCase().trim();
        cards.forEach(function(card) {
            var cat = card.getAttribute("data-category");
            var text = card.textContent.toLowerCase();
            var matchCat = (activeCategory === "All Categories" || cat === activeCategory);
            var matchQuery = (!q || text.indexOf(q) !== -1);
            if (matchCat && matchQuery) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterCards);
    }

    catButtons.forEach(function(btn) {
        btn.addEventListener("click", function() {
            catButtons.forEach(function(b) {
                b.classList.remove("bg-emerald-800", "text-white");
                b.classList.add("bg-slate-100", "text-slate-600");
            });
            btn.classList.add("bg-emerald-800", "text-white");
            btn.classList.remove("bg-slate-100", "text-slate-600");
            activeCategory = btn.getAttribute("data-category");
            filterCards();
        });
    });
});
</script>

<?php get_footer(); ?>
