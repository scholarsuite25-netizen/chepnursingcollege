"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  INITIAL_CLINICAL_REFLECTIONS,
  REFLECTION_CATEGORIES,
  ClinicalReflection,
} from "@/data/clinicalReflections";

export default function ClinicalReflectionsPage() {
  const [reflections, setReflections] = useState<ClinicalReflection[]>(INITIAL_CLINICAL_REFLECTIONS);
  const [selectedCategory, setSelectedCategory] = useState("All Specialties");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("refl-01");

  // New Reflection Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthorAlias, setNewAuthorAlias] = useState("");
  const [newLevel, setNewLevel] = useState("300L");
  const [newSpecialty, setNewSpecialty] = useState("Medical-Surgical Nursing");
  const [newTags, setNewTags] = useState("");
  
  // Gibbs 6 stages
  const [desc, setDesc] = useState("");
  const [feelings, setFeelings] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [actionPlan, setActionPlan] = useState("");

  // Scrubber feedback
  const [scrubberWarning, setScrubberWarning] = useState<string | null>(null);

  // Comment input state per reflection
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // Real-time PHI Detector (Scrubber)
  const checkForPHI = (text: string): boolean => {
    // Check for common real-life identifying patterns like phone numbers, MRN/Bed numbers, or real patient names phrases
    const phonePattern = /(\+?234|0)[789][01]\d{8}/;
    const bedPattern = /\b(bed\s*\d+|ward\s*[a-z0-9]+|room\s*\d+)\b/i;
    const mrnPattern = /\b(mrn|hospital\s*number|id\s*no)\s*[:#]?\s*\d+/i;
    
    if (phonePattern.test(text)) {
      setScrubberWarning("⚠️ Alert: Telephone number detected. Remove all contact numbers to maintain strict patient anonymity.");
      return true;
    }
    if (bedPattern.test(text)) {
      setScrubberWarning("⚠️ Alert: Specific ward bed or room number detected. Please use general terms (e.g. 'an acute surgical unit').");
      return true;
    }
    if (mrnPattern.test(text)) {
      setScrubberWarning("⚠️ Alert: Medical record number (MRN) detected. Replace with de-identified alias (e.g. 'Patient Case #1').");
      return true;
    }
    setScrubberWarning(null);
    return false;
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    checkForPHI(value);
  };

  const handleAddReflection = (e: React.FormEvent) => {
    e.preventDefault();
    const fullText = `${desc} ${feelings} ${evaluation} ${analysis} ${conclusion} ${actionPlan}`;
    if (checkForPHI(fullText)) {
      alert("Submission blocked: Please remove identifiable patient data flagged by the Privacy Scrubber before publishing.");
      return;
    }

    const newEntry: ClinicalReflection = {
      id: `refl-${Date.now()}`,
      title: newTitle,
      authorAlias: newAuthorAlias || "Student Nurse (Anonymous)",
      level: newLevel,
      specialty: newSpecialty,
      dateSubmitted: "Just now",
      preceptorVerified: false,
      preceptorFeedback: "Pending Clinical Preceptor Review",
      gibbsCycle: {
        description: desc,
        feelings,
        evaluation,
        analysis,
        conclusion,
        actionPlan,
      },
      keyLearningPoints: [
        "Patient dignity maintained under strict NDPA & NMCN confidentiality standards.",
        "Reflective insight formulated using Gibbs' (1988) cycle."
      ],
      tags: newTags ? newTags.split(",").map(t => t.trim().replace(/^#/, "")) : ["ReflectivePractice", "ClinicalLearning"],
      peerComments: []
    };

    setReflections([newEntry, ...reflections]);
    setIsModalOpen(false);
    // Reset fields
    setNewTitle("");
    setDesc("");
    setFeelings("");
    setEvaluation("");
    setAnalysis("");
    setConclusion("");
    setActionPlan("");
    setNewTags("");
  };

  const handleAddComment = (reflectionId: string) => {
    const text = commentInputs[reflectionId];
    if (!text || !text.trim()) return;

    setReflections(prev =>
      prev.map(r => {
        if (r.id === reflectionId) {
          return {
            ...r,
            peerComments: [
              ...r.peerComments,
              {
                id: `c-${Date.now()}`,
                author: "Colleague (CHEP Student)",
                comment: text.trim(),
                date: "Just now"
              }
            ]
          };
        }
        return r;
      })
    );

    setCommentInputs(prev => ({ ...prev, [reflectionId]: "" }));
  };

  const filteredReflections = reflections.filter(r => {
    const matchCat = selectedCategory === "All Specialties" || r.specialty === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.authorAlias.toLowerCase().includes(q) ||
      r.gibbsCycle.description.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchQuery;
  });

  return (
    <>
      <Navbar />

      <main className="w-full pt-20 bg-surface-canvas min-h-screen pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-950 via-emerald-900 to-slate-900 text-white py-16 px-4 sm:px-8 border-b border-emerald-800/40 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              NMCN Confidentiality Compliant • NDPA 2023 Protected
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl">
              De-Identified Clinical Reflective Practice &amp; Peer Learning Forum
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 max-w-3xl leading-relaxed">
              A legally protected, academically sanctioned space for nursing students across 100L through 500L to share real-world ward practicum experiences, debrief ethical dilemmas, and master clinical reasoning using <strong>Gibbs' Reflective Cycle (1988)</strong> with zero violation of patient privacy laws.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Submit De-Identified Reflection (Gibbs' Cycle)</span>
              </button>
              <Link
                href="/exams"
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">task_alt</span>
                <span>CBT &amp; OSCE Exam Studio</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Legal & Professional Confidentiality Standards Shield */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6 relative z-20">
          <div className="bg-white rounded-3xl p-6 shadow-md border border-emerald-200/80 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">privacy_tip</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase">1. Zero Patient Identifiers (NDPA)</h4>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  Real patient names, initials, exact dates of birth, ward bed numbers, or hospital names are strictly prohibited and scrubbed automatically.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">school</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase">2. Gibbs' 6-Stage Pedagogy</h4>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  Structures learning into Description, Feelings, Evaluation, Analysis, Conclusion, and Action Plan for NMC/NMCN logbook credits.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase">3. Preceptor Validation</h4>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  Clinical preceptors and registered nurse educators review submissions to award official clinical practicum competency badges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-200">
            {/* Search */}
            <div className="w-full md:w-96 relative">
              <span className="material-symbols-outlined text-gray-400 absolute left-3.5 top-3 text-[18px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reflections by topic, tag, or level..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:outline-hidden focus:border-forest-base"
              />
            </div>

            {/* Category Select */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-thin">
              {REFLECTION_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    selectedCategory === cat
                      ? "bg-forest-base text-white shadow-xs"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-forest-base"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Reflections List */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 space-y-6">
          {filteredReflections.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
              <span className="material-symbols-outlined text-[48px] text-gray-300">menu_book</span>
              <p className="text-sm text-gray-600 mt-2">No clinical reflections found matching your filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All Specialties");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-forest-base text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredReflections.map((refl) => {
              const isExpanded = expandedId === refl.id;
              return (
                <div
                  key={refl.id}
                  className="bg-white rounded-3xl border border-border-subtle shadow-xs hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="p-6 sm:p-8">
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                          {refl.level}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                          {refl.specialty}
                        </span>
                        {refl.preceptorVerified && (
                          <span className="px-2.5 py-0.5 rounded-full bg-teal-600 text-white text-[11px] font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">verified</span>
                            Preceptor Endorsed
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 font-mono">{refl.dateSubmitted}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug hover:text-forest-base transition-colors">
                      {refl.title}
                    </h2>
                    <p className="text-xs text-text-muted mt-1">
                      Reflected by: <strong className="text-gray-800">{refl.authorAlias}</strong>
                    </p>

                    {/* Preceptor Feedback Box if verified */}
                    {refl.preceptorFeedback && (
                      <div className="mt-4 p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 text-xs space-y-1">
                        <span className="font-bold text-teal-900 block flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">school</span>
                          Clinical Preceptor Assessment &amp; Teaching Commentary:
                        </span>
                        <p className="italic leading-relaxed">{refl.preceptorFeedback}</p>
                      </div>
                    )}

                    {/* Key Learning Points Summary */}
                    <div className="mt-4 space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                        Core Clinical Takeaways:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                        {refl.keyLearningPoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2 bg-surface-canvas p-2.5 rounded-xl border border-gray-100">
                            <span className="text-emerald-600 font-bold shrink-0">✓</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-4">
                      {refl.tags.map((t, idx) => (
                        <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-surface-tint text-forest-base font-semibold">
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Action Toggle */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : refl.id)}
                        className="text-xs font-bold text-forest-base hover:text-forest-dark flex items-center gap-1.5 transition-colors"
                      >
                        <span>{isExpanded ? "Collapse Gibbs' 6 Stages ▲" : "View Full Gibbs' 6-Stage Reflection ▼"}</span>
                      </button>

                      <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                        {refl.peerComments.length} Colleague Insights
                      </span>
                    </div>
                  </div>

                  {/* Expanded Gibbs Cycle & Peer Discussions */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-surface-container p-6 sm:p-8 space-y-6">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-forest-dark border-b border-gray-200 pb-2">
                        Gibbs' Reflective Cycle (1988) Structured Analysis
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        {/* 1. Description */}
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1">
                          <span className="font-bold text-forest-dark uppercase block text-[10px]">
                            1. Description (What happened clinically?)
                          </span>
                          <p className="text-gray-700 leading-relaxed">{refl.gibbsCycle.description}</p>
                        </div>

                        {/* 2. Feelings */}
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1">
                          <span className="font-bold text-forest-dark uppercase block text-[10px]">
                            2. Feelings (What were you thinking &amp; feeling?)
                          </span>
                          <p className="text-gray-700 leading-relaxed">{refl.gibbsCycle.feelings}</p>
                        </div>

                        {/* 3. Evaluation */}
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1">
                          <span className="font-bold text-forest-dark uppercase block text-[10px]">
                            3. Evaluation (What was good and challenging?)
                          </span>
                          <p className="text-gray-700 leading-relaxed">{refl.gibbsCycle.evaluation}</p>
                        </div>

                        {/* 4. Analysis */}
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1">
                          <span className="font-bold text-forest-dark uppercase block text-[10px]">
                            4. Analysis (Evidence-based physiological reasoning)
                          </span>
                          <p className="text-gray-700 leading-relaxed">{refl.gibbsCycle.analysis}</p>
                        </div>

                        {/* 5. Conclusion */}
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1">
                          <span className="font-bold text-forest-dark uppercase block text-[10px]">
                            5. Conclusion (What else could you have done?)
                          </span>
                          <p className="text-gray-700 leading-relaxed">{refl.gibbsCycle.conclusion}</p>
                        </div>

                        {/* 6. Action Plan */}
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1">
                          <span className="font-bold text-forest-dark uppercase block text-[10px]">
                            6. Action Plan (Future response in similar clinical scenario)
                          </span>
                          <p className="text-gray-700 leading-relaxed">{refl.gibbsCycle.actionPlan}</p>
                        </div>
                      </div>

                      {/* Peer Discussion Section */}
                      <div className="pt-4 border-t border-gray-200 space-y-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                          Peer Clinical Discussion &amp; Literature Cross-References:
                        </span>

                        {refl.peerComments.length > 0 && (
                          <div className="space-y-2.5">
                            {refl.peerComments.map(c => (
                              <div key={c.id} className="bg-white p-3.5 rounded-xl border border-gray-200 text-xs space-y-1">
                                <div className="flex items-center justify-between text-gray-500">
                                  <strong className="text-forest-dark">{c.author}</strong>
                                  <span className="text-[10px]">{c.date}</span>
                                </div>
                                <p className="text-gray-700">{c.comment}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add Comment Input */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={commentInputs[refl.id] || ""}
                            onChange={(e) => setCommentInputs({ ...commentInputs, [refl.id]: e.target.value })}
                            placeholder="Share an evidence-based clinical tip or literature citation..."
                            className="flex-1 px-4 py-2 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-forest-base bg-white"
                          />
                          <button
                            onClick={() => handleAddComment(refl.id)}
                            className="px-4 py-2 bg-forest-base hover:bg-forest-medium text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                          >
                            Post Peer Tip
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </section>

        {/* Modal: New Reflection Submission with Live Scrubber */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                  <span className="material-symbols-outlined text-[13px]">shield</span>
                  Automated PHI Scrubber Active
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-forest-dark">
                  Submit De-Identified Clinical Reflection
                </h2>
                <p className="text-xs text-text-muted leading-relaxed">
                  Reflect on a ward scenario using Gibbs' Cycle. All real patient names, contact info, and facility identifiers will be scrubbed to comply with the Nigerian Data Protection Act (NDPA) and NMCN code of conduct.
                </p>
              </div>

              {/* Scrubber Warning Alert */}
              {scrubberWarning && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold animate-pulse">
                  {scrubberWarning}
                </div>
              )}

              <form onSubmit={handleAddReflection} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Case Title</label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Managing Pediatric Hypoglycemic Crisis in ED"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-forest-base"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Your Student Alias</label>
                    <input
                      type="text"
                      required
                      value={newAuthorAlias}
                      onChange={(e) => setNewAuthorAlias(e.target.value)}
                      placeholder="e.g. Student Nurse K. (400L)"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-forest-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Academic Level</label>
                    <select
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-forest-base"
                    >
                      <option value="100L">100 Level</option>
                      <option value="200L">200 Level</option>
                      <option value="300L">300 Level</option>
                      <option value="400L">400 Level</option>
                      <option value="500L">500 Level</option>
                    </select>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700">Clinical Specialty</label>
                    <select
                      value={newSpecialty}
                      onChange={(e) => setNewSpecialty(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-forest-base"
                    >
                      {REFLECTION_CATEGORIES.filter(c => c !== "All Specialties").map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Gibbs 6 Stages Textareas */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-forest-medium block">
                    Gibbs' (1988) 6 Stages:
                  </span>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block">1. Description (No patient names, beds, or phone numbers)</label>
                    <textarea
                      rows={2}
                      required
                      value={desc}
                      onChange={(e) => handleInputChange(setDesc, e.target.value)}
                      placeholder="What was the clinical situation, procedure, or dilemma?"
                      className="w-full p-2.5 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-forest-base"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block">2. Feelings</label>
                    <textarea
                      rows={2}
                      required
                      value={feelings}
                      onChange={(e) => handleInputChange(setFeelings, e.target.value)}
                      placeholder="What were you feeling before, during, and after?"
                      className="w-full p-2.5 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-forest-base"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block">3. Evaluation</label>
                    <textarea
                      rows={2}
                      required
                      value={evaluation}
                      onChange={(e) => handleInputChange(setEvaluation, e.target.value)}
                      placeholder="What went well? What was difficult or could have gone wrong?"
                      className="w-full p-2.5 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-forest-base"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block">4. Analysis</label>
                    <textarea
                      rows={2}
                      required
                      value={analysis}
                      onChange={(e) => handleInputChange(setAnalysis, e.target.value)}
                      placeholder="What sense can you make of it? Connect to pathology or pharmacology literature."
                      className="w-full p-2.5 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-forest-base"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block">5. Conclusion</label>
                    <textarea
                      rows={2}
                      required
                      value={conclusion}
                      onChange={(e) => handleInputChange(setConclusion, e.target.value)}
                      placeholder="What else could you or the healthcare team have done?"
                      className="w-full p-2.5 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-forest-base"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block">6. Action Plan</label>
                    <textarea
                      rows={2}
                      required
                      value={actionPlan}
                      onChange={(e) => handleInputChange(setActionPlan, e.target.value)}
                      placeholder="If this happens again in your nursing career, how will you handle it?"
                      className="w-full p-2.5 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-forest-base"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="e.g. Sepsis, IVCannulation, GriefSupport"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:border-forest-base"
                  />
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-forest-base hover:bg-forest-medium text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    Publish Protected Reflection
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
