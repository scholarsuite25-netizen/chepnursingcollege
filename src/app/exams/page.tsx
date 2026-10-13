"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  NURSING_MCQ_BANK,
  NURSING_ESSAY_BANK,
  NURSING_OSCE_STATIONS,
  EXAM_LEVELS,
  EXAM_CATEGORIES,
  scrambleMCQs,
  MCQQuestion,
  EssayQuestion,
  OSCEStation,
} from "@/data/nursingExams";

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState<"cbt" | "essays" | "osce">("cbt");

  // Filters
  const [selectedLevel, setSelectedLevel] = useState<string>("All Levels");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

  // Exam Session Configuration (NMCN / NCLEX Global Standards)
  // Options: 100 Qs (90 mins), 50 Qs (45 mins), 25 Qs (25 mins), All Qs
  const [examSessionMode, setExamSessionMode] = useState<number>(100);

  // Filtered master pool of MCQs based on level & category
  const basePool = useMemo(() => {
    return NURSING_MCQ_BANK.filter((q) => {
      const matchLevel = selectedLevel === "All Levels" || q.level === selectedLevel;
      const matchCat = selectedCategory === "All Categories" || q.category === selectedCategory;
      return matchLevel && matchCat;
    });
  }, [selectedLevel, selectedCategory]);

  // Active scrambled question set
  const [scrambledMCQs, setScrambledMCQs] = useState<MCQQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [cbtTimeRemaining, setCbtTimeRemaining] = useState<number>(5400); // 90 mins for 100 Qs default
  const [timerActive, setTimerActive] = useState<boolean>(true);

  // Initialize and scramble question pool
  const initExamSession = (count: number, scramble = true) => {
    let pool = [...basePool];
    if (scramble) {
      pool = scrambleMCQs(pool, true);
    }
    const selected = pool.slice(0, count === 0 ? pool.length : Math.min(count, pool.length));
    setScrambledMCQs(selected);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    
    // NMCN timing: ~54 seconds per question
    const timeInSeconds = selected.length >= 100 ? 5400 : selected.length * 54;
    setCbtTimeRemaining(timeInSeconds);
    setTimerActive(true);
  };

  useEffect(() => {
    initExamSession(examSessionMode, true);
  }, [basePool, examSessionMode]);

  const currentQ: MCQQuestion | undefined = scrambledMCQs[currentQuestionIndex] || scrambledMCQs[0];

  // Filtered Essays (52 questions)
  const filteredEssays = useMemo(() => {
    return NURSING_ESSAY_BANK.filter((e) => {
      const matchLevel = selectedLevel === "All Levels" || e.level === selectedLevel;
      const matchCat = selectedCategory === "All Categories" || e.category === selectedCategory;
      return matchLevel && matchCat;
    });
  }, [selectedLevel, selectedCategory]);
  const [expandedEssayId, setExpandedEssayId] = useState<string | null>(null);

  // Filtered OSCE Stations (102 stations)
  const filteredOSCE = useMemo(() => {
    return NURSING_OSCE_STATIONS.filter((s) => {
      const matchLevel = selectedLevel === "All Levels" || s.level === selectedLevel;
      const matchCat = selectedCategory === "All Categories" || s.category === selectedCategory;
      return matchLevel && matchCat;
    });
  }, [selectedLevel, selectedCategory]);

  // OSCE Simulator State
  const [selectedStationId, setSelectedStationId] = useState<string>(
    NURSING_OSCE_STATIONS[0].id
  );
  const [osceTimeRemaining, setOsceTimeRemaining] = useState<number>(
    NURSING_OSCE_STATIONS[0].durationMinutes * 60
  );
  const [osceTimerRunning, setOsceTimerRunning] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const currentStation = useMemo(() => {
    return (
      NURSING_OSCE_STATIONS.find((s) => s.id === selectedStationId) ||
      NURSING_OSCE_STATIONS[0]
    );
  }, [selectedStationId]);

  // CBT Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && cbtTimeRemaining > 0 && !showResults) {
      interval = setInterval(() => {
        setCbtTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, cbtTimeRemaining, showResults]);

  // OSCE Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (osceTimerRunning && osceTimeRemaining > 0) {
      interval = setInterval(() => {
        setOsceTimeRemaining((prev) => {
          if (prev <= 1) {
            setOsceTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [osceTimerRunning, osceTimeRemaining]);

  const handleSelectStation = (st: OSCEStation) => {
    setSelectedStationId(st.id);
    setOsceTimeRemaining(st.durationMinutes * 60);
    setOsceTimerRunning(false);
    setCompletedSteps({});
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (showResults) return; // Locked once submitted
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateCbtScore = () => {
    let score = 0;
    scrambledMCQs.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const formatTimer = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${mins.toString().padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // OSCE Scoring
  const toggleStep = (stepNumber: number) => {
    const key = `${currentStation.id}-${stepNumber}`;
    setCompletedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const totalOscePointsEarned = currentStation.checklist.reduce((acc, step) => {
    return acc + (completedSteps[`${currentStation.id}-${step.step}`] ? step.points : 0);
  }, 0);
  const totalOsceMaxPoints = currentStation.checklist.reduce((acc, step) => acc + step.points, 0);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-surface-canvas text-slate-800 pt-20 pb-20">
        {/* Header Banner */}
        <section className="bg-gradient-to-r from-emerald-950 via-teal-900 to-cyan-950 text-white pt-16 pb-14 px-4 sm:px-6 lg:px-8 border-b border-emerald-800/40 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Official NMCN &amp; Global Accredited Examination System
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
                  Clinical Examination, CBT &amp; OSCE Studio
                </h1>
                <p className="text-sm md:text-base text-emerald-100/90 max-w-3xl leading-relaxed">
                  Full-scale assessment matrix covering <strong>160+ clinical MCQs</strong> with dynamic question and answer scrambling, <strong>52 comprehensive essay case studies</strong> with official marking rubrics, and <strong>102 OSCE clinical practical stations</strong> timed to Nursing and Midwifery Council of Nigeria (NMCN) and international licensing standards.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => initExamSession(examSessionMode, true)}
                  className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
                  title="Reshuffle question and option sequence"
                >
                  <span>🎲 Scramble &amp; Re-shuffle Exam Pool</span>
                </button>
                <Link
                  href="/library"
                  className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur"
                >
                  ← eLibrary Catalog (480+ Res)
                </Link>
              </div>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-emerald-800/60">
              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-700/40">
                <div className="text-2xl font-extrabold text-white">{NURSING_MCQ_BANK.length}+ MCQs</div>
                <div className="text-xs text-emerald-300">Minimum 100 Standard Exceeded</div>
              </div>
              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-700/40">
                <div className="text-2xl font-extrabold text-teal-300">1 Correct Answer</div>
                <div className="text-xs text-emerald-300">Scrambled Options &amp; Questions</div>
              </div>
              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-700/40">
                <div className="text-2xl font-extrabold text-cyan-300">{NURSING_ESSAY_BANK.length} Essay Cases</div>
                <div className="text-xs text-emerald-300">Minimum 50 Standard Exceeded</div>
              </div>
              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-700/40">
                <div className="text-2xl font-extrabold text-amber-300">{NURSING_OSCE_STATIONS.length} OSCE Stations</div>
                <div className="text-xs text-emerald-300">100+ Professional Clinical Stations</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Tab Controller & Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            {/* Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80 overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTab("cbt")}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === "cbt"
                    ? "bg-emerald-700 text-white shadow-md"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>📝</span>
                <span>CBT MCQ Testing ({scrambledMCQs.length} Qs)</span>
              </button>
              <button
                onClick={() => setActiveTab("essays")}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === "essays"
                    ? "bg-emerald-700 text-white shadow-md"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>📄</span>
                <span>Essay Bank ({filteredEssays.length} Cases)</span>
              </button>
              <button
                onClick={() => setActiveTab("osce")}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === "osce"
                    ? "bg-emerald-700 text-white shadow-md"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>🩺</span>
                <span>OSCE Stations ({filteredOSCE.length} Stations)</span>
              </button>
            </div>

            {/* Timing Mode & Level Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {activeTab === "cbt" && (
                <select
                  value={examSessionMode}
                  onChange={(e) => setExamSessionMode(Number(e.target.value))}
                  className="px-3 py-2 text-xs font-bold rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                >
                  <option value={100}>Session: Full NMCN Mock (100 Qs • 90 Mins)</option>
                  <option value={50}>Session: Council Standard (50 Qs • 45 Mins)</option>
                  <option value={25}>Session: Continuous Assessment (25 Qs • 25 Mins)</option>
                  <option value={0}>Session: Entire Question Pool ({basePool.length} Qs)</option>
                </select>
              )}

              <select
                value={selectedLevel}
                onChange={(e) => {
                  setSelectedLevel(e.target.value);
                  setCurrentQuestionIndex(0);
                }}
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
              >
                {EXAM_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    Level: {lvl}
                  </option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentQuestionIndex(0);
                }}
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
              >
                {EXAM_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ================= TAB 1: CBT MCQ TESTING ================= */}
          {activeTab === "cbt" && (
            <div className="mt-8">
              {scrambledMCQs.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                  <p className="text-base text-slate-600">No MCQs found matching the selected level and category filters.</p>
                  <button
                    onClick={() => {
                      setSelectedLevel("All Levels");
                      setSelectedCategory("All Categories");
                    }}
                    className="mt-4 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  >
                    Reset Filters &amp; Reload Pool
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: CBT Question Workspace */}
                  <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8">
                    {/* Top Bar with Timer, Progress & Scramble Trigger */}
                    <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-100 gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800">
                            {currentQ.level}
                          </span>
                          <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700">
                            {currentQ.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 font-medium">{currentQ.examType}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-mono text-sm shadow">
                          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                          <span>Time Left: {formatTimer(cbtTimeRemaining)}</span>
                        </div>
                        <button
                          onClick={() => initExamSession(examSessionMode, true)}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200"
                          title="Scramble question order and options"
                        >
                          <span>🎲 Scramble</span>
                        </button>
                      </div>
                    </div>

                    {/* Question Stem */}
                    <div className="my-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                        Question {currentQuestionIndex + 1} of {scrambledMCQs.length}
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {currentQ.question}
                      </h2>
                    </div>

                    {/* 4 Options (Strictly Single Choice, dynamically scrambled) */}
                    <div className="space-y-3">
                      {currentQ.options.map((option, idx) => {
                        const isSelected = userAnswers[currentQ.id] === idx;
                        const isCorrect = currentQ.correctIndex === idx;
                        let optionBorderClass = "border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40";

                        if (showResults) {
                          if (isCorrect) {
                            optionBorderClass = "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-2 ring-emerald-500/30";
                          } else if (isSelected && !isCorrect) {
                            optionBorderClass = "border-red-400 bg-red-50 text-red-950";
                          }
                        } else if (isSelected) {
                          optionBorderClass = "border-emerald-600 bg-emerald-50/70 text-slate-900 font-semibold ring-2 ring-emerald-600/30";
                        }

                        return (
                          <div
                            key={idx}
                            onClick={() => handleSelectOption(currentQ.id, idx)}
                            className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${optionBorderClass}`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-all ${
                                isSelected
                                  ? "border-emerald-600 bg-emerald-600 text-white"
                                  : "border-slate-300 text-slate-500"
                              }`}
                            >
                              {String.fromCharCode(65 + idx)}
                            </div>
                            <div className="flex-1 text-sm sm:text-base leading-relaxed">
                              {option}
                            </div>
                            {showResults && isCorrect && (
                              <span className="text-xs px-2 py-0.5 rounded bg-emerald-600 text-white font-bold shrink-0">
                                Correct ✓
                              </span>
                            )}
                            {showResults && isSelected && !isCorrect && (
                              <span className="text-xs px-2 py-0.5 rounded bg-red-500 text-white font-bold shrink-0">
                                Incorrect ✕
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Clinical Rationale & Explanation (Visible upon submission) */}
                    {showResults && (
                      <div className="mt-6 p-5 rounded-2xl bg-slate-900 text-white border border-slate-800">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                          <span>💡 Clinical Rationale &amp; Learning Point:</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {currentQ.rationale}
                        </p>
                      </div>
                    )}

                    {/* Bottom Navigation Buttons */}
                    <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100">
                      <button
                        onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                        disabled={currentQuestionIndex === 0}
                        className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        ← Previous
                      </button>

                      <div className="flex items-center gap-3">
                        {!showResults ? (
                          <button
                            onClick={() => setShowResults(true)}
                            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                          >
                            Submit Paper &amp; Grade
                          </button>
                        ) : (
                          <button
                            onClick={() => initExamSession(examSessionMode, true)}
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                          >
                            Retake Scrambled Paper ↺
                          </button>
                        )}

                        <button
                          onClick={() =>
                            setCurrentQuestionIndex((prev) =>
                              Math.min(scrambledMCQs.length - 1, prev + 1)
                            )
                          }
                          disabled={currentQuestionIndex === scrambledMCQs.length - 1}
                          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Question Navigator & Score Board */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Results Summary Card */}
                    {showResults && (
                      <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 rounded-3xl shadow-lg border border-emerald-800/40">
                        <h3 className="text-sm font-bold text-emerald-300 mb-1">CBT Score Summary</h3>
                        <div className="text-4xl font-extrabold text-white mt-2">
                          {calculateCbtScore()} / {scrambledMCQs.length}
                        </div>
                        <p className="text-xs text-slate-300 mt-1">
                          Percentage: {Math.round((calculateCbtScore() / scrambledMCQs.length) * 100)}%
                        </p>

                        <div className="mt-4 pt-4 border-t border-white/10">
                          {Math.round((calculateCbtScore() / scrambledMCQs.length) * 100) >= 50 ? (
                            <div className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                              PASS: Exceeds NMCN 50% Benchmark Standard
                            </div>
                          ) : (
                            <div className="px-3 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                              REMEDIAL REQUIRED: Below NMCN 50% Benchmark
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Question Navigator Grid */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                      <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                        <span>Answer Sheet Grid ({scrambledMCQs.length} Items)</span>
                        <span className="text-xs text-slate-500 font-normal">
                          {Object.keys(userAnswers).length} Answered
                        </span>
                      </h3>

                      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                        {scrambledMCQs.map((q, idx) => {
                          const isCurrent = currentQuestionIndex === idx;
                          const isAnswered = userAnswers[q.id] !== undefined;
                          let btnClass = "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200";

                          if (showResults) {
                            if (userAnswers[q.id] === q.correctIndex) {
                              btnClass = "bg-emerald-600 text-white border-emerald-700 font-bold";
                            } else if (isAnswered) {
                              btnClass = "bg-red-500 text-white border-red-600 font-bold";
                            } else {
                              btnClass = "bg-slate-200 text-slate-400";
                            }
                          } else if (isCurrent) {
                            btnClass = "bg-emerald-600 text-white border-emerald-700 font-bold ring-2 ring-emerald-400";
                          } else if (isAnswered) {
                            btnClass = "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold";
                          }

                          return (
                            <button
                              key={q.id}
                              onClick={() => setCurrentQuestionIndex(idx)}
                              className={`py-2 text-xs rounded-lg border font-semibold transition-all ${btnClass}`}
                            >
                              {idx + 1}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded bg-emerald-600"></span>
                          <span>Current</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded bg-emerald-100 border border-emerald-300"></span>
                          <span>Answered</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded bg-slate-100 border border-slate-200"></span>
                          <span>Pending</span>
                        </div>
                      </div>
                    </div>

                    {/* Examination Rules & Standards Banner */}
                    <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-200/80 text-emerald-950">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
                        <span>⚖️ NMCN &amp; Global Examination Standards</span>
                      </h4>
                      <p className="text-xs leading-relaxed text-emerald-900/90">
                        Each mock features randomized questions and scrambled option sequences. NMCN allocates 54 seconds per question. 50% constitutes the pass mark for clinical licensure progression.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 2: ESSAY & CASE STUDIES BANK (50+ Items) ================= */}
          {activeTab === "essays" && (
            <div className="mt-8 space-y-6">
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Comprehensive Essay Question Bank &amp; Clinical Scenarios (50+ Cases)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Structured multi-part case study essays covering 100L through 500L, NMCN Licensure, and Midwifery Qualifying boards with comprehensive marking rubrics.
                  </p>
                </div>
                <div className="text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {filteredEssays.length} Essay Scenarios Available
                </div>
              </div>

              {filteredEssays.map((essay, index) => {
                const isExpanded = expandedEssayId === essay.id;
                return (
                  <div
                    key={essay.id}
                    className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                            {essay.level}
                          </span>
                          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                            {essay.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                          <span>Max Marks: {essay.marks} Marks</span>
                          <span>•</span>
                          <span>Time: {essay.timeAllowed}</span>
                        </div>
                      </div>

                      {essay.scenario && (
                        <div className="mb-4 p-4 rounded-2xl bg-slate-50 border-l-4 border-emerald-600 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                          <span className="font-bold text-slate-900 not-italic block mb-1">Clinical Dossier:</span>
                          "{essay.scenario}"
                        </div>
                      )}

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed mb-4">
                        Case #{index + 1}: {essay.question}
                      </h3>

                      <button
                        onClick={() => setExpandedEssayId(isExpanded ? null : essay.id)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                      >
                        <span>{isExpanded ? "Hide Marking Guide & Model Answer ▲" : "Reveal Model Marking Guide & Rubric ▼"}</span>
                      </button>
                    </div>

                    {/* Expandable Model Answer & Marking Scheme */}
                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-slate-50/70 p-6 sm:p-8 space-y-6">
                        {/* Key Points */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
                            Key Clinical Points Required in Model Answer:
                          </h4>
                          <ul className="space-y-2">
                            {essay.modelAnswer.keyPoints.map((pt, pIdx) => (
                              <li key={pIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Official Marking Rubric Table */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                            Official NMCN Marking Rubric &amp; Point Distribution:
                          </h4>
                          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                                <tr>
                                  <th className="p-3 font-bold">Section</th>
                                  <th className="p-3 font-bold">Allocated Marks</th>
                                  <th className="p-3 font-bold">Examiner Criterion</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {essay.modelAnswer.markingRubric.map((r, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-slate-50/50">
                                    <td className="p-3 font-semibold text-slate-900">{r.section}</td>
                                    <td className="p-3 font-bold text-emerald-700">{r.points} Marks</td>
                                    <td className="p-3 text-slate-600">{r.criterion}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Clinical Significance */}
                        <div className="p-4 rounded-2xl bg-teal-900 text-white text-xs leading-relaxed">
                          <span className="font-bold text-teal-300 block mb-1">Clinical Significance &amp; Core Competency:</span>
                          {essay.modelAnswer.clinicalSignificance}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ================= TAB 3: OSCE CLINICAL PRACTICAL STUDIO (100+ Stations) ================= */}
          {activeTab === "osce" && (
            <div className="mt-8">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    OSCE Clinical Practical Examination Stations (100+ Stations)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Objective Structured Clinical Examination (OSCE) circuits covering 10 clinical disciplines with automated 7-minute station bells, door briefs, and examiner rubrics.
                  </p>
                </div>
                <div className="text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {filteredOSCE.length} Clinical Stations Available
                </div>
              </div>

              {/* Station Quick Selector Scrollbar */}
              <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-thin">
                {filteredOSCE.slice(0, 30).map((station) => {
                  const isSelected = station.id === selectedStationId;
                  return (
                    <button
                      key={station.id}
                      onClick={() => handleSelectStation(station)}
                      className={`shrink-0 px-4 py-3 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? "bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500/30"
                          : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
                      }`}
                    >
                      <div className="text-[11px] font-bold text-emerald-300">
                        Station #{station.stationNumber}
                      </div>
                      <div className="text-xs sm:text-sm font-bold truncate max-w-[180px]">
                        {station.title}
                      </div>
                      <div className="text-[10px] opacity-80 mt-0.5">
                        {station.durationMinutes} Mins • {station.level}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Station Simulator Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                {/* Left Column: Candidate Brief & Examiner Checklist */}
                <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
                  {/* Station Title & Timer Bar */}
                  <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-100 gap-4">
                    <div>
                      <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                        Station {currentStation.stationNumber} of {NURSING_OSCE_STATIONS.length}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                        {currentStation.title}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Discipline: {currentStation.category} • Target Level: {currentStation.level}
                      </p>
                    </div>

                    {/* Interactive OSCE Countdown Bell Timer */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-sm shadow ${
                          osceTimeRemaining <= 60
                            ? "bg-red-600 text-white animate-pulse"
                            : "bg-slate-900 text-white"
                        }`}
                      >
                        <span>⏱</span>
                        <span>Station Bell: {formatTimer(osceTimeRemaining)}</span>
                      </div>

                      <button
                        onClick={() => setOsceTimerRunning(!osceTimerRunning)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-all ${
                          osceTimerRunning
                            ? "bg-amber-600 hover:bg-amber-700"
                            : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
                      >
                        {osceTimerRunning ? "Pause Timer" : "Start Station Timer"}
                      </button>
                    </div>
                  </div>

                  {/* Candidate Instructions Brief */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                      📋 Candidate Station Instructions (Door Prompt):
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      {currentStation.candidateInstructions}
                    </p>
                  </div>

                  {/* Simulated Patient Brief */}
                  <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-sky-950 text-xs leading-relaxed">
                    <span className="font-bold text-sky-900 block mb-1">🎭 Simulated Patient / Task Trainer Brief:</span>
                    {currentStation.simulatedPatientBrief}
                  </div>

                  {/* Required Equipment Checklist */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      🧰 Required Equipment on Station Trolley:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentStation.requiredEquipment.map((eq, eqIdx) => (
                        <div
                          key={eqIdx}
                          className="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-700 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          <span>{eq}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Examiner Rubric Checklist (10 steps) */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        Examiner Scoring Rubric (10 Steps)
                      </h3>
                      <span className="text-xs text-slate-500 font-semibold">
                        Score: {totalOscePointsEarned} / {totalOsceMaxPoints} Points
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {currentStation.checklist.map((item) => {
                        const isDone = !!completedSteps[`${currentStation.id}-${item.step}`];
                        return (
                          <div
                            key={item.step}
                            onClick={() => toggleStep(item.step)}
                            className={`p-3.5 rounded-2xl border flex items-start justify-between gap-4 cursor-pointer transition-all ${
                              isDone
                                ? "bg-emerald-50 border-emerald-400 text-slate-900"
                                : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() => {}}
                                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                              />
                              <div>
                                <div className="text-xs font-bold text-slate-900">
                                  Step {item.step}: {item.description}
                                </div>
                                {item.criticalFailStep && (
                                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold">
                                    CRITICAL STEP (Must pass to avoid station failure)
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                              {item.points} pt
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Clinical Examiner Notes */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs">
                    <span className="font-bold text-amber-900 block mb-1">⚠️ Lead Examiner Clinical Notes:</span>
                    {currentStation.examinerNotes}
                  </div>
                </div>

                {/* Right Column: OSCE Station Score Card & Tips */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg border border-slate-800">
                    <h3 className="text-sm font-bold text-emerald-400 mb-1">
                      OSCE Scorecard
                    </h3>
                    <div className="text-4xl font-extrabold text-white mt-2">
                      {totalOscePointsEarned} / {totalOsceMaxPoints}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Completion: {Math.round((totalOscePointsEarned / totalOsceMaxPoints) * 100)}%
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-800">
                      {Math.round((totalOscePointsEarned / totalOsceMaxPoints) * 100) >= 70 ? (
                        <div className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                          COMPETENT: Exceeds Clinical OSCE Distinction
                        </div>
                      ) : (
                        <div className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 text-xs">
                          Tick off steps to simulate examiner assessment.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* High-Yield Clinical Tips */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
                      <span>💡 Clinical High-Yield Tips</span>
                    </h3>
                    <ul className="space-y-3">
                      {currentStation.clinicalTips.map((tip, tIdx) => (
                        <li key={tIdx} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* OSCE Stations Index Directory */}
                  <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-200/80">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3">
                      Browse All 102 Practical Stations
                    </h3>
                    <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                      {filteredOSCE.map((st) => (
                        <button
                          key={st.id}
                          onClick={() => handleSelectStation(st)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                            st.id === selectedStationId
                              ? "bg-emerald-700 text-white"
                              : "bg-white text-slate-700 hover:bg-emerald-100/60"
                          }`}
                        >
                          <span className="truncate max-w-[200px]">St. {st.stationNumber}: {st.title}</span>
                          <span className="text-[10px] opacity-80">{st.durationMinutes}m</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
