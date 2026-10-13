"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  generateNursingCarePlan,
  CarePlanResult,
} from "@/app/actions/library";
import {
  ALL_OPEN_EBOOKS,
  ALL_OPEN_JOURNALS,
  RESOURCE_CATEGORIES,
  OpenEBook,
  OpenJournalPaper,
} from "@/data/openResources";

const ITEMS_PER_PAGE = 12;

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Category filters
  const [selectedJournalCategory, setSelectedJournalCategory] = useState("All Categories");
  const [selectedEbookCategory, setSelectedEbookCategory] = useState("All Categories");

  // Pagination states
  const [journalPage, setJournalPage] = useState(1);
  const [ebookPage, setEbookPage] = useState(1);

  // Selected modals
  const [selectedArticle, setSelectedArticle] = useState<OpenJournalPaper | null>(null);
  const [selectedEbook, setSelectedEbook] = useState<OpenEBook | null>(null);

  // AI Care Plan Studio States
  const [aiScenario, setAiScenario] = useState("Acute post-operative surgical wound pain (VAS 7/10) with tachycardia");
  const [aiLoading, setAiLoading] = useState(false);
  const [carePlan, setCarePlan] = useState<CarePlanResult | null>(null);

  // Filtered Journals (240+ resources)
  const filteredJournals = useMemo(() => {
    return ALL_OPEN_JOURNALS.filter((j) => {
      const matchCat =
        selectedJournalCategory === "All Categories" || j.category === selectedJournalCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.authors.toLowerCase().includes(q) ||
        j.journal.toLowerCase().includes(q) ||
        j.abstract.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [selectedJournalCategory, searchQuery]);

  // Paginated Journals
  const totalJournalPages = Math.max(1, Math.ceil(filteredJournals.length / ITEMS_PER_PAGE));
  const paginatedJournals = useMemo(() => {
    const start = (journalPage - 1) * ITEMS_PER_PAGE;
    return filteredJournals.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredJournals, journalPage]);

  // Filtered eBooks (240+ resources)
  const filteredEbooks = useMemo(() => {
    return ALL_OPEN_EBOOKS.filter((b) => {
      const matchCat =
        selectedEbookCategory === "All Categories" || b.category === selectedEbookCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.publisher.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [selectedEbookCategory, searchQuery]);

  // Paginated eBooks
  const totalEbookPages = Math.max(1, Math.ceil(filteredEbooks.length / ITEMS_PER_PAGE));
  const paginatedEbooks = useMemo(() => {
    const start = (ebookPage - 1) * ITEMS_PER_PAGE;
    return filteredEbooks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEbooks, ebookPage]);

  const handleGenerateCarePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiScenario) return;
    setAiLoading(true);
    const result = await generateNursingCarePlan(aiScenario);
    setCarePlan(result);
    setAiLoading(false);
  };

  const databases = [
    {
      name: "WHO HINARI Health Network",
      desc: "World Health Organization Access to Research in Health initiative granting thousands of biomedical titles.",
      badge: "WHO Global Health",
      url: "https://www.who.int/hinari/en/",
    },
    {
      name: "PubMed / NCBI Central (NLM)",
      desc: "Over 36 million biomedical citations, MeSH nursing literature, and open-access PMC full text.",
      badge: "NIH / National Library of Medicine",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=nursing+care",
    },
    {
      name: "Directory of Open Access Journals (DOAJ)",
      desc: "Peer-reviewed, fully open-access clinical nursing and midwifery journals with zero paywalls.",
      badge: "100% Open Access",
      url: "https://doaj.org/search/articles?ref=homepage-box&source=%7B%22query%22%3A%7B%22query_string%22%3A%7B%22query%22%3A%22nursing%22%7D%7D%7D",
    },
    {
      name: "Europe PMC Open Repository",
      desc: "Federated European biomedical papers including preprints, clinical trials, and bio-curations.",
      badge: "Open Biomedical API",
      url: "https://europepmc.org/search?query=nursing+practice",
    },
    {
      name: "Cochrane Library Nursing Field",
      desc: "Gold-standard systematic reviews informing clinical nursing interventions and randomized trials.",
      badge: "Systematic Evidence",
      url: "https://www.cochranelibrary.com/",
    },
    {
      name: "Open Library & Internet Archive",
      desc: "Open digital lending library with millions of public medical treatises and historical texts.",
      badge: "Universal Digital Lending",
      url: "https://openlibrary.org/search?q=nursing",
    },
  ];

  // Helper for pagination numbers display
  const getPageNumbers = (currentPage: number, totalPages: number) => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <>
      <Navbar />

      <main className="w-full pt-20 bg-surface-canvas min-h-screen">
        {/* Hero Section */}
        <section className="w-full bg-forest-dark text-white py-16 sm:py-20 px-4 sm:px-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-primary-fixed text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">local_library</span>
              CHEP Virtual Library &amp; Open Access Gateway
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl">
              Open Evidence-Based Medical Knowledge &amp; Clinical Practice Tools
            </h1>
            <p className="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed">
              Zero-cost, open access repository containing over <strong>480+ indexed clinical resources</strong> (240+ peer-reviewed eJournals and 240+ core curriculum medical textbooks), categorized across 12 nursing disciplines, alongside automated CBT testing and OSCE clinical simulators.
            </p>

            {/* Live Search Bar */}
            <div className="max-w-3xl bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-2" id="catalog">
              <div className="flex-1 flex items-center gap-2 px-3">
                <span className="material-symbols-outlined text-gray-400">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setJournalPage(1);
                    setEbookPage(1);
                  }}
                  placeholder="Filter 480+ open access eBooks, journals, authors, or topics..."
                  className="w-full text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden py-2"
                />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 self-center"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Links & CTA Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/exams"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <span>🎯 Launch CBT Exams &amp; OSCE Studio (100L-500L)</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              <a href="#ejournals" className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors">
                eJournals ({ALL_OPEN_JOURNALS.length}+)
              </a>
              <a href="#ebooks" className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors">
                Clinical eBooks ({ALL_OPEN_EBOOKS.length}+)
              </a>
              <a href="#ai-tools" className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-light hover:bg-emerald-500/30 text-xs font-semibold transition-colors">
                AI Clinical Care-Plan Engine
              </a>
              <a href="#databases" className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors">
                Global Databases
              </a>
            </div>
          </div>
        </section>

        {/* Feature Spotlight: Examinations, CBT, Essays & OSCE Link */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6 relative z-20">
          <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Integrated Academic Testing &amp; OSCE Simulator
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                NMCN Licensure, 100L-500L CBT Testing &amp; Timed OSCE Stations
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Practice clinical MCQs with strictly single correct answers and detailed rationales, solve case study essays with official marking rubrics, and run timed OSCE stations with examiner checklists.
              </p>
            </div>
            <Link
              href="/exams"
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 shrink-0 flex items-center gap-2 transition-all"
            >
              <span>Enter Examination Studio</span>
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
            </Link>
          </div>
        </section>

        {/* ================= SECTION 1: Open Access Peer-Reviewed eJournals (240+ Papers) ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-14 space-y-6" id="ejournals">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-tint text-forest-base text-[11px] font-bold uppercase mb-1">
                <span className="material-symbols-outlined text-[14px]">science</span>
                Peer-Reviewed Repository • 240 Open Access Papers
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark">
                Peer-Reviewed Clinical eJournals &amp; Empirical Research
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Full-text open-access papers spanning clinical trials, nursing innovations, and epidemiology across 12 distinct categories.
              </p>
            </div>
            <span className="text-xs font-bold text-forest-medium">
              Showing {filteredJournals.length} studies • Page {journalPage} of {totalJournalPages}
            </span>
          </div>

          {/* Categories Pill Selector */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Filter by Nursing Discipline Category:
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {RESOURCE_CATEGORIES.map((cat) => {
                const count =
                  cat === "All Categories"
                    ? ALL_OPEN_JOURNALS.length
                    : ALL_OPEN_JOURNALS.filter((j) => j.category === cat).length;
                const isSelected = selectedJournalCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedJournalCategory(cat);
                      setJournalPage(1);
                    }}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-forest-base text-white shadow-sm"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-forest-base"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* eJournals Grid (12 per page) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedJournals.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-3xl p-6 shadow-xs border border-border-subtle flex flex-col justify-between hover:shadow-md hover:border-forest-base transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-light text-forest-dark text-[11px] font-bold uppercase tracking-wider">
                      {art.category.split("/")[0].trim()}
                    </span>
                    <span className="text-[11px] font-mono text-gray-500">{art.year}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 hover:text-forest-base transition-colors">
                    {art.title}
                  </h3>
                  <div className="text-xs text-text-muted">
                    <span>{art.journal} • </span>
                    <span className="font-mono text-gray-500">{art.volume}</span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed bg-surface-canvas p-3 rounded-xl border border-gray-100">
                    {art.abstract}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">lock_open</span>
                    Open Access
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedArticle(art)}
                      className="text-xs font-bold text-forest-base hover:underline"
                    >
                      Abstract
                    </button>
                    <a
                      href={art.fullTextUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-forest-base hover:bg-forest-medium text-white rounded-lg font-bold text-xs flex items-center gap-1 transition-colors shadow-xs"
                    >
                      <span>Full Paper</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* eJournals Multi-Page Pagination Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200">
            <div className="text-xs text-gray-600">
              Showing {(journalPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
              {Math.min(journalPage * ITEMS_PER_PAGE, filteredJournals.length)} of{" "}
              {filteredJournals.length} resources
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setJournalPage((p) => Math.max(1, p - 1))}
                disabled={journalPage === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Prev Page
              </button>

              {getPageNumbers(journalPage, totalJournalPages).map((p, idx) =>
                typeof p === "number" ? (
                  <button
                    key={idx}
                    onClick={() => setJournalPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      journalPage === p
                        ? "bg-forest-base text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ) : (
                  <span key={idx} className="px-1 text-xs text-gray-400">
                    ...
                  </span>
                )
              )}

              <button
                onClick={() => setJournalPage((p) => Math.min(totalJournalPages, p + 1))}
                disabled={journalPage === totalJournalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next Page →
              </button>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: Open Source AI Nursing Care Plan Studio ================= */}
        <section className="w-full bg-surface-container py-14 px-4 sm:px-8 border-y border-gray-200" id="ai-tools">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-light text-forest-dark text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                Evidence-Based Clinical Engine
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark">
                AI Clinical Care-Plan Synthesizer (NANDA-I • NIC • NOC)
              </h2>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Generates complete multi-dimensional nursing care plans conforming to global standards: NANDA-I diagnostic classifications, NOC expected outcomes, and NIC rationalized clinical interventions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Input */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-border-subtle shadow-xs space-y-4">
                <form onSubmit={handleGenerateCarePlan} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-gray-700">
                      Patient Clinical Scenario / Chief Complaints
                    </label>
                    <textarea
                      rows={4}
                      value={aiScenario}
                      onChange={(e) => setAiScenario(e.target.value)}
                      placeholder="e.g. Type 2 Diabetes with foot ulceration, fever (38.8C), elevated WBC, and non-compliance with insulin..."
                      className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-forest-base focus:ring-1 focus:ring-forest-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-gray-500 block uppercase">
                      Quick Clinical Presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Post-Op Laparotomy acute incision pain (VAS 8/10)",
                        "Primigravida 38 weeks in active labor with severe anxiety",
                        "6-year-old child with acute asthma exacerbation & wheezing",
                        "Elderly patient with congestive heart failure and peripheral edema",
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAiScenario(preset)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-surface-canvas hover:bg-emerald-50 text-gray-700 hover:text-forest-base border border-gray-200 transition-colors text-left"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={aiLoading}
                    className="w-full py-3 bg-forest-base hover:bg-forest-medium text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    {aiLoading ? (
                      <>
                        <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                        <span>Synthesizing NANDA Care Plan...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                        <span>Generate Evidence Care Plan</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Rendered Care Plan */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-border-subtle shadow-xs">
                {carePlan ? (
                  <div className="space-y-5">
                    <div className="pb-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded bg-surface-tint text-forest-base">
                        NANDA-I Standard Clinical Care Plan
                      </span>
                      <span className="text-xs text-text-muted">Evidence Level: Grade A</span>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                        Nursing Diagnosis Statement:
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mt-1">
                        {carePlan.diagnosis}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-surface-canvas border border-gray-200 space-y-2">
                        <strong className="text-forest-dark block font-bold text-[11px] uppercase">
                          Related Factors (Etiology):
                        </strong>
                        <ul className="list-disc pl-4 space-y-1 text-gray-700 text-[11px]">
                          {carePlan.relatedFactors.map((rf, i) => (
                            <li key={i}>{rf}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-canvas border border-gray-200 space-y-2">
                        <strong className="text-forest-dark block font-bold text-[11px] uppercase">
                          Defining Characteristics (Signs/Symptoms):
                        </strong>
                        <ul className="list-disc pl-4 space-y-1 text-gray-700 text-[11px]">
                          {carePlan.definingCharacteristics.map((dc, i) => (
                            <li key={i}>{dc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2">
                      <strong className="text-forest-dark block font-bold text-[11px] uppercase">
                        Nursing Outcomes Classification (NOC Targets):
                      </strong>
                      <ul className="list-disc pl-4 space-y-1 text-gray-700 text-[11px]">
                        {carePlan.outcomesNOC.map((noc, i) => (
                          <li key={i}>{noc}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <strong className="text-forest-dark block font-bold text-[11px] uppercase tracking-wider">
                        Nursing Interventions Classification (NIC) &amp; Scientific Rationales:
                      </strong>
                      <div className="space-y-2.5">
                        {carePlan.interventionsNIC.map((nic, i) => (
                          <div key={i} className="p-3.5 rounded-xl border border-gray-200 bg-surface-canvas space-y-1">
                            <div className="flex items-start gap-2">
                              <span className="w-5 h-5 rounded-full bg-forest-base text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <strong className="text-gray-900 font-semibold text-xs">{nic.action}</strong>
                            </div>
                            <p className="pl-7 text-[11px] text-gray-600 italic">
                              <strong>Rationale:</strong> {nic.rationale}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center space-y-3 text-text-muted">
                    <span className="material-symbols-outlined text-[48px] text-gray-300">clinical_notes</span>
                    <p className="text-xs">
                      Enter patient chief complaints on the left or click a preset to synthesize a real-time evidence-based care plan.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: Clinical eBooks Repository (240+ Monographs) ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-14 space-y-6" id="ebooks">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-tint text-forest-base text-[11px] font-bold uppercase mb-1">
                <span className="material-symbols-outlined text-[14px]">menu_book</span>
                Open Library &amp; CHEP Digital Stack • 240+ Curated Texts
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark">
                Clinical eBooks &amp; Academic Medical Textbooks
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Core curricula texts in Medical-Surgical Nursing, Midwifery, Anatomy, Pharmacology, and Pediatrics.
              </p>
            </div>
            <span className="text-xs font-bold text-forest-medium">
              Showing {filteredEbooks.length} curated monographs • Page {ebookPage} of {totalEbookPages}
            </span>
          </div>

          {/* eBooks Categories Pill Selector */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Filter eBooks by Specialty Category:
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {RESOURCE_CATEGORIES.map((cat) => {
                const count =
                  cat === "All Categories"
                    ? ALL_OPEN_EBOOKS.length
                    : ALL_OPEN_EBOOKS.filter((b) => b.category === cat).length;
                const isSelected = selectedEbookCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedEbookCategory(cat);
                      setEbookPage(1);
                    }}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-forest-base text-white shadow-sm"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-forest-base"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* eBooks Grid (12 per page) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedEbooks.map((bk) => (
              <div
                key={bk.id}
                className="bg-white rounded-3xl p-5 shadow-xs border border-border-subtle flex flex-col justify-between hover:shadow-md transition-shadow space-y-4"
              >
                <div className="space-y-3">
                  <div className="h-44 w-full bg-surface-canvas rounded-xl overflow-hidden flex flex-col items-center justify-center border border-gray-100 p-4 text-center">
                    <span className="material-symbols-outlined text-[40px] text-emerald-700 mb-2">
                      auto_stories
                    </span>
                    <span className="text-[11px] font-bold text-gray-800 line-clamp-2">
                      {bk.title}
                    </span>
                    <span className="text-[10px] text-gray-500 mt-1">{bk.publisher}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-surface-tint text-forest-base inline-block mb-1">
                      {bk.category.split("/")[0].trim()}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
                      {bk.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-1">By {bk.author}</p>
                    <span className="text-[10px] font-mono text-gray-400 block mt-0.5">
                      {bk.year} • {bk.pages} pages
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => setSelectedEbook(bk)}
                    className="text-xs font-bold text-forest-base hover:underline"
                  >
                    Details &amp; Shelf
                  </button>
                  <a
                    href={bk.readUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-forest-base hover:bg-forest-medium text-white rounded-lg font-bold text-xs flex items-center gap-1 transition-colors shadow-xs"
                  >
                    <span>Read Text</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* eBooks Multi-Page Pagination Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200">
            <div className="text-xs text-gray-600">
              Showing {(ebookPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
              {Math.min(ebookPage * ITEMS_PER_PAGE, filteredEbooks.length)} of{" "}
              {filteredEbooks.length} monographs
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setEbookPage((p) => Math.max(1, p - 1))}
                disabled={ebookPage === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Prev Page
              </button>

              {getPageNumbers(ebookPage, totalEbookPages).map((p, idx) =>
                typeof p === "number" ? (
                  <button
                    key={idx}
                    onClick={() => setEbookPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      ebookPage === p
                        ? "bg-forest-base text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ) : (
                  <span key={idx} className="px-1 text-xs text-gray-400">
                    ...
                  </span>
                )
              )}

              <button
                onClick={() => setEbookPage((p) => Math.min(totalEbookPages, p + 1))}
                disabled={ebookPage === totalEbookPages}
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next Page →
              </button>
            </div>
          </div>
        </section>

        {/* ================= SECTION 4: Federated Medical Databases Showcase ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-6" id="databases">
          <div className="border-b border-gray-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-medium">Global Medical Consortia</span>
            <h2 className="text-2xl font-extrabold text-forest-dark">Direct Research Database Integrations</h2>
            <p className="text-xs text-text-muted mt-0.5">
              Direct portals granting CHEP scholars access to millions of biomedical treatises, clinical trial registries, and Cochrane systematic reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {databases.map((db) => (
              <div
                key={db.name}
                className="bg-white rounded-3xl p-6 shadow-xs border border-border-subtle flex flex-col justify-between hover:shadow-md hover:border-forest-base transition-all"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-surface-tint text-forest-base inline-block">
                    {db.badge}
                  </span>
                  <h3 className="text-base font-bold text-forest-dark leading-snug">{db.name}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{db.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Zero Cost / Open Access
                  </span>
                  <a
                    href={db.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest-base hover:text-forest-dark font-bold flex items-center gap-1"
                  >
                    Access Portal <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 5: Physical Stack Circulation & Clinical Services ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-6" id="services">
          <div className="border-b border-gray-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-medium">Campus Physical Infrastructure</span>
            <h2 className="text-2xl font-extrabold text-forest-dark">Library Services &amp; Physical Stack Circulation</h2>
            <p className="text-xs text-text-muted mt-0.5">
              On-campus amenities at our Ota facility for student study groups, reference librarianship, and inter-library loans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-xs border border-border-subtle space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-surface-tint text-forest-base flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">search_hands_free</span>
              </div>
              <h3 className="text-base font-bold text-forest-dark">OPAC Shelf Locator</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Search physical books categorized under Dewey Decimal and National Library of Medicine (NLM) schemes. Find exact shelf coordinates (Block A through D) across all 4 campus reading halls.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xs border border-border-subtle space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-surface-tint text-forest-base flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">devices</span>
              </div>
              <h3 className="text-base font-bold text-forest-dark">e-Learning Terminal Suite</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                60 ergonomic desktop workstations with high-speed fiber-optic bandwidth, dedicated for NMCN online indexing, literature searching, and computerized medical examinations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xs border border-border-subtle space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-surface-tint text-forest-base flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">support_agent</span>
              </div>
              <h3 className="text-base font-bold text-forest-dark">Reference Nursing Librarian Desk</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Consult with our senior medical librarians for structured PICO research strategy formulation, Mendeley / Zotero citation assistance, and systematic review guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Modal: Journal Abstract Reader */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-light text-forest-dark text-xs font-bold uppercase">
                    {selectedArticle.journal}
                  </span>
                  <span className="text-xs text-text-muted">{selectedArticle.year}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-forest-dark leading-tight">
                  {selectedArticle.title}
                </h2>
                <p className="text-xs text-text-muted">
                  By <strong className="text-gray-900">{selectedArticle.authors}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-tint border border-emerald-100 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase text-[10px]">Journal Volume &amp; Issue</span>
                  <span className="font-bold text-forest-dark">{selectedArticle.volume}</span>
                </div>
                {selectedArticle.doi && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-bold uppercase text-[10px]">Digital Object Identifier (DOI)</span>
                    <span className="font-mono text-gray-800">{selectedArticle.doi}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-xs text-gray-700 leading-relaxed">
                <h4 className="font-bold text-forest-dark uppercase tracking-wider text-[11px]">
                  Clinical Abstract:
                </h4>
                <p className="text-gray-700 leading-relaxed bg-surface-canvas p-4 rounded-xl border border-gray-200">
                  {selectedArticle.abstract}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <a
                  href={selectedArticle.fullTextUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-forest-base hover:bg-forest-medium text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Open Full-Text Paper</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </a>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-900 font-semibold"
                >
                  Close Abstract
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: eBook Details & Shelf */}
        {selectedEbook && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedEbook(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-light text-forest-dark text-xs font-bold uppercase">
                    {selectedEbook.category}
                  </span>
                  <span className="text-xs text-text-muted">{selectedEbook.year}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-forest-dark leading-tight">
                  {selectedEbook.title}
                </h2>
                <p className="text-xs text-text-muted">
                  By <strong className="text-gray-900">{selectedEbook.author}</strong> • {selectedEbook.publisher}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-tint border border-emerald-100 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Physical Library Location</span>
                  <span className="font-bold text-gray-900">Block B • Shelf N-04 (Ota Campus)</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">ISBN Registry</span>
                  <span className="font-mono text-gray-900">{selectedEbook.isbn || "978-0-13-400000-0"}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Pages</span>
                  <span className="font-mono text-gray-900">{selectedEbook.pages} Pages</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Lending Status</span>
                  <span className="text-emerald-700 font-bold">Available in Open Stacks</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-canvas border border-gray-200 text-xs text-gray-700 leading-relaxed">
                <strong className="block text-gray-900 mb-1 font-bold">Synopsis &amp; Module Scope:</strong>
                {selectedEbook.description}
              </div>

              <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <a
                  href={selectedEbook.readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-forest-base hover:bg-forest-medium text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Borrow &amp; Read on Open Library</span>
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                </a>
                <button
                  onClick={() => setSelectedEbook(null)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-900 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
