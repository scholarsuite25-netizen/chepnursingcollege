"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNewsDispatches } from "@/app/actions/admin";

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [liveArticles, setLiveArticles] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  useEffect(() => {
    async function loadDispatches() {
      const res = await getNewsDispatches();
      if (res.success && res.data && res.data.length > 0) {
        const mapped = res.data.map((item: any) => ({
          id: item.id,
          category: item.category.toLowerCase().includes("community")
            ? "community-health"
            : item.category.toLowerCase().includes("geriatric")
            ? "geriatric"
            : "foundation",
          categoryLabel: item.category,
          title: item.title,
          desc: item.summary || item.content?.slice(0, 160) || "Official dispatch from the Academic Affairs Registry.",
          author: item.author || "Academic Affairs Registry",
          date: new Date(item.created_at).toLocaleDateString("en-GB"),
          readTime: item.read_time || "4 min read",
          image: item.image_url || "/images/chep/safety_exercise.png",
        }));
        setLiveArticles(mapped);
      }
    }
    loadDispatches();
  }, []);

  const categories = [
    { id: "all", label: "All Posts (24)" },
    { id: "community-health", label: "Community Health Nursing" },
    { id: "foundation", label: "Foundation of Nursing" },
    { id: "fundamentals", label: "Fundamentals of Nursing" },
    { id: "geriatric", label: "Geriatric Nursing" },
    { id: "library", label: "Library & Research" },
    { id: "maternal", label: "Maternal and Child Nursing" },
    { id: "paediatric", label: "Paediatric Nursing" },
  ];

  const articles = [
    {
      id: "1",
      category: "community-health",
      categoryLabel: "Community Health",
      title: "Community Health Nursing: Bridging the Gap Between Healthcare and Society",
      desc: "Preventative epidemiology and emergency trauma drills form Nigeria's frontline defense. An analysis of CHEP's rural immersion cohorts in Agbebi Central.",
      author: "Nurse T. K. Balogun",
      date: "01/04/2025",
      readTime: "4 min read",
      image: "/images/chep/disaster_week.jpg",
    },
    {
      id: "2",
      category: "total-care",
      categoryLabel: "Total Nursing Care",
      title: "Compassion in Motion: The Philosophy of Total Nursing Care",
      desc: "Delving into holistic patient management—integrating physiological assessment, mental health support, and cultural dignity in bedside treatment.",
      author: "Matron V. Adediran",
      date: "28/03/2025",
      readTime: "6 min read",
      image: "/images/chep/nurses_week_1.jpg",
    },
    {
      id: "3",
      category: "geriatric",
      categoryLabel: "Geriatric Nursing",
      title: "Comprehensive Geriatric Assessments (CGA): Redefining Senior Well-being",
      desc: "Geriatric syndromes require multi-dimensional assessment protocols. CHEP student researchers present findings from clinical fieldwork in Ogun State.",
      author: "Dr. Ifeanyi Chukwuma",
      date: "20/03/2025",
      readTime: "5 min read",
      image: "/images/chep/chep_geriatrics_3.jpg",
    },
    {
      id: "4",
      category: "library",
      categoryLabel: "CBT & Academic Integrity",
      title: "NMCN Standardized CBT Examinations & Academic Probity Protocols",
      desc: "Student nurses now have instantaneous terminal access to over 15,000 peer-reviewed healthcare publications and standardized computerized examination halls.",
      author: "Academic Affairs Registry",
      date: "14/03/2025",
      readTime: "3 min read",
      image: "/images/chep/examination_hall.jpg",
    },
    {
      id: "5",
      category: "maternal",
      categoryLabel: "Maternal & Child Health",
      title: "Zero Tolerance for Maternal Mortality: High-Fidelity Simulation Protocols",
      desc: "How pre-clinical obstetric simulation in our delivery demonstration suite prepares student nurses to navigate complex labor emergencies with precision.",
      author: "Mrs. O. D. Kuti",
      date: "05/03/2025",
      readTime: "7 min read",
      image: "/images/chep/chep_matric_3.jpg",
    },
    {
      id: "6",
      category: "foundation",
      categoryLabel: "Academic Foundation",
      title: "From Classroom to Hospital Ward: Preparing First-Year Scholars for Clinical Postings",
      desc: "An orientation manual detailing professional attire, aseptic hand-washing technique, bedside empathy, and preceptor communication.",
      author: "Rev. Sister Mary Theresa",
      date: "26/02/2025",
      readTime: "5 min read",
      image: "/images/chep/chep_matric_2.jpg",
    },
  ];

  const combinedArticles = [
    ...liveArticles,
    ...articles.filter((a) => !liveArticles.some((l) => l.title === a.title)),
  ];

  // Auto-open article if ?id= query param is provided
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const articleId = params.get("id");
      if (articleId) {
        const found = combinedArticles.find((a) => a.id === articleId);
        if (found) {
          setSelectedArticle(found);
        }
      }
    }
  }, [liveArticles]);

  const filteredArticles = activeCategory === "all"
    ? combinedArticles
    : combinedArticles.filter((a) => a.category === activeCategory);

  return (
    <>
      <Navbar />

      <main className="w-full pt-20 bg-surface-canvas min-h-screen">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-20">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6">
            <nav className="flex items-center gap-1.5 text-xs text-text-muted">
              <Link href="/" className="hover:text-forest-base transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">home</span>
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-semibold">News &amp; Publications</span>
            </nav>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-light text-emerald-accent text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Official NMCN Academic Press
            </div>
          </div>

          {/* Editorial Masthead Banner */}
          <div className="bg-forest-dark text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden mb-10">
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-fixed block">
                  Institutional Dispatch • Volume XII
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                  Clinical Insights, Academic Bulletins &amp; Research
                </h1>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed pt-1">
                  Authoritative updates from CHEP College of Nursing Sciences faculty, NMCN regulatory notices, clinical posting schedules, and student scholarship dossiers.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10 shrink-0">
                <span className="material-symbols-outlined text-primary-fixed text-[28px]">auto_stories</span>
                <div>
                  <span className="text-xs uppercase text-primary-fixed block font-bold">Active Digest</span>
                  <span className="text-sm font-bold text-white">2026/2027 Session</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="w-full mb-8 overflow-x-auto pb-2">
            <div className="flex items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-xs ${
                    activeCategory === cat.id
                      ? "bg-forest-base text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-border-subtle"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Lead Story */}
          <div className="mb-12 bg-white rounded-2xl shadow-md overflow-hidden border border-border-subtle hover:shadow-xl transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative lg:col-span-5 min-h-[280px] lg:min-h-full">
                <img
                  src="/images/chep/chep_matric_1.jpg"
                  alt="Accreditation Briefing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-orange-action text-white text-xs font-bold uppercase shadow">
                    Official Bulletin
                  </span>
                  <span className="px-3 py-1 rounded-full bg-forest-dark/80 text-primary-fixed text-xs font-bold uppercase backdrop-blur-sm">
                    Accreditation Notice
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1 font-semibold text-forest-base">
                      <span className="material-symbols-outlined text-[16px]">verified_user</span>
                      Academic Affairs Registry
                    </span>
                    <span>•</span>
                    <span>01/04/2025</span>
                    <span>•</span>
                    <span>5 min read</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-forest-base transition-colors leading-snug">
                    2026/2027 Professional Basic Nursing Screening Dates Announced by Nursing &amp; Midwifery Council of Nigeria (NMCN) Accredited Board
                  </h2>

                  <p className="text-sm text-text-muted leading-relaxed">
                    The Management of CHEP College of Nursing Sciences, in strict concurrence with the Nursing &amp; Midwifery Council of Nigeria statutory directives, hereby notifies all verified candidates of the physical computer-based screening, verification of O’Level credentials, and oral clinical aptitude assessments scheduled at the Ota Main Campus.
                  </p>

                  <div className="bg-surface-canvas p-4 rounded-xl border border-gray-100 space-y-2">
                    <div className="flex items-start gap-2 text-xs text-gray-800">
                      <span className="material-symbols-outlined text-forest-base text-[16px] shrink-0 mt-0.5">check_circle</span>
                      <span>Batch A: Candidates scoring 180+ in UTME • Verification begins April 28th</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-gray-800">
                      <span className="material-symbols-outlined text-forest-base text-[16px] shrink-0 mt-0.5">check_circle</span>
                      <span>Required: Original WAEC/NECO scratch cards, JAMB original printout &amp; Birth Certificate</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-forest-medium flex items-center justify-center text-white font-bold text-sm">
                      DR
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900 block leading-tight">Dr. R. A. Adeyemi</span>
                      <span className="text-xs text-text-muted">Registrar &amp; Secretary to Academic Board</span>
                    </div>
                  </div>
                  <Link
                    href="/admission"
                    className="inline-flex items-center gap-2 bg-orange-action hover:bg-orange-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-sm transition-colors"
                  >
                    Read Full Article
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Grid: Articles + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Articles List */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-forest-base rounded-full"></span>
                  Latest Academic Dispatches
                </h3>
                <span className="text-xs text-text-muted">Showing {filteredArticles.length} publications</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((art) => (
                  <article key={art.id} className="bg-white rounded-2xl shadow-xs border border-border-subtle hover:shadow-md transition-shadow flex flex-col overflow-hidden">
                    <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-light text-emerald-accent text-[11px] font-bold uppercase tracking-wider">
                          {art.categoryLabel}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                          <span>{art.date}</span>
                          <span>•</span>
                          <span>{art.readTime}</span>
                        </div>
                        <h4 className="text-base font-bold text-gray-900 hover:text-forest-base transition-colors leading-snug">
                          {art.title}
                        </h4>
                        <p className="text-xs text-text-muted mt-2 leading-relaxed">
                          {art.desc}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-forest-medium">{art.author}</span>
                        <button
                          onClick={() => setSelectedArticle(art)}
                          className="text-xs font-bold text-orange-action hover:text-orange-700 flex items-center gap-1"
                        >
                          Read <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">

              {/* Newsletter Subscription */}
              <div className="bg-forest-base text-white p-6 rounded-2xl shadow-md">
                <h4 className="text-lg font-bold mb-2">Subscribe to Dispatches</h4>
                <p className="text-xs text-gray-200 leading-relaxed mb-4">
                  Receive verified NMCN regulatory notices, admission announcements, and research updates directly to your inbox.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully to CHEP Institutional Dispatches!"); }} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    className="w-full px-4 py-2.5 rounded-lg text-xs bg-white text-gray-900 placeholder-gray-500 border border-gray-200 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="w-full bg-orange-action hover:bg-orange-700 text-white font-semibold text-xs py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 space-y-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute right-5 top-5 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-light text-forest-dark text-xs font-bold uppercase tracking-wider">
                    {selectedArticle.categoryLabel}
                  </span>
                  <span className="text-xs text-text-muted">
                    {selectedArticle.date} • {selectedArticle.readTime}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark leading-tight">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-text-muted border-b border-gray-100 pb-4">
                  <span className="font-semibold text-gray-800">By {selectedArticle.author}</span>
                  <span>•</span>
                  <span>CHEP Academic Affairs Directorate</span>
                </div>
              </div>

              {selectedArticle.image && (
                <div className="rounded-2xl overflow-hidden h-64 sm:h-80 w-full bg-gray-100">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
                <p className="font-semibold text-gray-900 text-sm sm:text-base border-l-4 border-forest-base pl-4 italic">
                  {selectedArticle.desc}
                </p>
                <p>
                  As healthcare delivery models rapidly modernize in Nigeria, professional nursing standards require an intricate synergy of clinical competence, cultural empathy, and technological literacy. CHEP College of Nursing Sciences continues to spearhead evidence-based pedagogical reforms to equip students with hands-on capabilities across tertiary hospital wards and grassroots outreach posts.
                </p>
                <p>
                  Clinical observations conducted during recent cohort rotations emphasize the critical role of preventive health protocols, early vital sign triage, and holistic patient counseling. The Academic Senate has mandated enhanced simulation lab hours to complement theoretical lectures, ensuring graduates consistently lead in national NMCN qualifying examinations.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-forest-medium font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Official Institutional Dispatch
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert("Article link copied to clipboard!");
                    }}
                    className="px-3.5 py-2 rounded-xl border border-gray-200 hover:border-forest-base text-gray-700 font-semibold transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">share</span>
                    Share Dispatch
                  </button>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-4 py-2 rounded-xl bg-forest-base hover:bg-forest-medium text-white font-bold transition-colors"
                  >
                    Close Reader
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
