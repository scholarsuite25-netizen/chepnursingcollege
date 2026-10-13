"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  NURSING_MCQ_BANK,
  NURSING_ESSAY_BANK,
  NURSING_OSCE_STATIONS,
  EXAM_LEVELS,
  EXAM_CATEGORIES,
  MCQQuestion,
  EssayQuestion,
  OSCEStation,
} from "@/data/nursingExams";

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState<"cbt" | "essays" | "osce">("cbt");

  // Filters
  const [selectedLevel, setSelectedLevel] = useState<string>("All Levels");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

  // CBT State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [cbtTimeRemaining, setCbtTimeRemaining] = useState<number>(1800); // 30 minutes in seconds
  const [timerActive, setTimerActive] = useState<boolean>(true);

  // Filtered MCQs
  const filteredMCQs = NURSING_MCQ_BANK.filter((q) => {
    const matchLevel = selectedLevel === "All Levels" || q.level === selectedLevel;
    const matchCat = selectedCategory === "All Categories" || q.category === selectedCategory;
    return matchLevel && matchCat;
  });

  const currentQ: MCQQuestion | undefined = filteredMCQs[currentQuestionIndex] || filteredMCQs[0];

  // Filtered Essays
  const filteredEssays = NURSING_ESSAY_BANK.filter((e) => {
    const matchLevel = selectedLevel === "All Levels" || e.level === selectedLevel;
    const matchCat = selectedCategory === "All Categories" || e.category === selectedCategory;
    return matchLevel && matchCat;
  });
  const [expandedEssayId, setExpandedEssayId] = useState<string | null>(null);

  // OSCE Simulator State
  const [selectedStationId, setSelectedStationId] = useState<string>(NURSING_OSCE_STATIONS[0].id);
  const [osceTimeRemaining, setOsceTimeRemaining] = useState<number>(NURSING_OSCE_STATIONS[0].durationMinutes * 60);
  const [osceTimerRunning, setOsceTimerRunning] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const currentStation = NURSING_OSCE_STATIONS.find((s) => s.id === selectedStationId) || NURSING_OSCE_STATIONS[0];

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
    filteredMCQs.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const resetCbtTest = () => {
    setUserAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setCbtTimeRemaining(1800);
    setTimerActive(true);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
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
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-950 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-emerald-800/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Official NMCN & Global Standard Test Suite
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                Clinical Examinations, CBT & OSCE Studio
              </h1>
              <p className="text-base md:text-lg text-emerald-100/90 max-w-3xl leading-relaxed">
                Comprehensive testing matrix covering 100 Level through 500 Level, Professional NMCN Licensure, Post-Basic Midwifery, and Objective Structured Clinical Examination (OSCE) practical stations with real-time scoring rubrics.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/library"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-all backdrop-blur"
              >
                ← Back to eLibrary Catalog
              </Link>
              <a
                href="#cbt-arena"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold shadow-lg shadow-emerald-500/25 transition-all"
              >
                Launch Mock Exam
              </a>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-emerald-800/60">
            <div className="bg-emerald-950/50 p-4 rounded-xl border border-emerald-700/30">
              <div className="text-2xl font-bold text-white">{NURSING_MCQ_BANK.length} MCQs</div>
              <div className="text-xs text-emerald-200">100L to 500L & Council Boards</div>
            </div>
            <div className="bg-emerald-950/50 p-4 rounded-xl border border-emerald-700/30">
              <div className="text-2xl font-bold text-teal-300">Single Correct Ans</div>
              <div className="text-xs text-emerald-200">Strict Standard with Rationales</div>
            </div>
            <div className="bg-emerald-950/50 p-4 rounded-xl border border-emerald-700/30">
              <div className="text-2xl font-bold text-cyan-300">{NURSING_ESSAY_BANK.length} Essay Cases</div>
              <div className="text-xs text-emerald-200">With NMCN Marking Rubrics</div>
            </div>
            <div className="bg-emerald-950/50 p-4 rounded-xl border border-emerald-700/30">
              <div className="text-2xl font-bold text-amber-300">{NURSING_OSCE_STATIONS.length} OSCE Stations</div>
              <div className="text-xs text-emerald-200">Timed Practical Checklists</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tab Controller */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8" id="cbt-arena">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80">
            <button
              onClick={() => setActiveTab("cbt")}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === "cbt"
                  ? "bg-emerald-700 text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <span>📝</span>
              <span>CBT MCQ Testing (1 Correct Ans)</span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-900/30 text-white">
                {NURSING_MCQ_BANK.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("essays")}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === "essays"
                  ? "bg-emerald-700 text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <span>📄</span>
              <span>Essay & Case Studies Bank</span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-900/30 text-white">
                {NURSING_ESSAY_BANK.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("osce")}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === "osce"
                  ? "bg-emerald-700 text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <span>🩺</span>
              <span>OSCE Clinical Practical Studio</span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-900/30 text-white">
                {NURSING_OSCE_STATIONS.length} Stations
              </span>
            </button>
          </div>

          {/* Level & Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setCurrentQuestionIndex(0);
              }}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
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
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
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
            {filteredMCQs.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                <p className="text-lg text-slate-600">No MCQs found matching the selected level and category filters.</p>
                <button
                  onClick={() => {
                    setSelectedLevel("All Levels");
                    setSelectedCategory("All Categories");
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: CBT Question Workspace */}
                <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                  {/* Top Bar with Timer & Progress */}
                  <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-100 gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-100 text-emerald-800">
                          {currentQ.level}
                        </span>
                        <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-700">
                          {currentQ.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 font-medium">{currentQ.examType}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-mono text-sm shadow">
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                        <span>Timer: {formatTimer(cbtTimeRemaining)}</span>
                      </div>
                      <button
                        onClick={resetCbtTest}
                        className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
                      >
                        Reset Test
                      </button>
                    </div>
                  </div>

                  {/* Question Stem */}
                  <div className="my-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                      Question {currentQuestionIndex + 1} of {filteredMCQs.length}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                      {currentQ.question}
                    </h2>
                  </div>

                  {/* 4 Options (Strictly Single Choice) */}
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
                          className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${optionBorderClass}`}
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
                    <div className="mt-6 p-5 rounded-xl bg-slate-900 text-white border border-slate-800">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                        <span>💡 Clinical Rationale & Teaching Point:</span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed font-normal">
                        {currentQ.rationale}
                      </p>
                    </div>
                  )}

                  {/* Bottom Navigation Buttons */}
                  <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100">
                    <button
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      ← Previous
                    </button>

                    <div className="flex items-center gap-3">
                      {!showResults ? (
                        <button
                          onClick={() => setShowResults(true)}
                          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all"
                        >
                          Submit & View Results
                        </button>
                      ) : (
                        <button
                          onClick={resetCbtTest}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all"
                        >
                          Retake Test ↺
                        </button>
                      )}

                      <button
                        onClick={() =>
                          setCurrentQuestionIndex((prev) =>
                            Math.min(filteredMCQs.length - 1, prev + 1)
                          )
                        }
                        disabled={currentQuestionIndex === filteredMCQs.length - 1}
                        className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
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
                    <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 rounded-2xl shadow-lg border border-emerald-800/40">
                      <h3 className="text-base font-bold text-emerald-300 mb-1">CBT Score Summary</h3>
                      <div className="text-4xl font-extrabold text-white mt-2">
                        {calculateCbtScore()} / {filteredMCQs.length}
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        Percentage: {Math.round((calculateCbtScore() / filteredMCQs.length) * 100)}%
                      </p>

                      <div className="mt-4 pt-4 border-t border-white/10">
                        {Math.round((calculateCbtScore() / filteredMCQs.length) * 100) >= 50 ? (
                          <div className="px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                            PASS: Exceeds NMCN 50% Benchmark Standard
                          </div>
                        ) : (
                          <div className="px-3 py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                            REMEDIAL REQUIRED: Below NMCN 50% Benchmark
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Question Navigator Grid */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                      <span>Question Sheet</span>
                      <span className="text-xs text-slate-500 font-normal">
                        {Object.keys(userAnswers).length} answered
                      </span>
                    </h3>

                    <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
                      {filteredMCQs.map((q, idx) => {
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

                    <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs text-slate-500">
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

                  {/* Examination Rules Banner */}
                  <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200/80 text-amber-950">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                      <span>⚠️ NMCN Exam Instruction</span>
                    </h4>
                    <p className="text-xs leading-relaxed text-amber-900">
                      Each question features exactly one correct answer. Ensure you review all rationales upon submitting to strengthen clinical diagnostic reasoning and pharmacological precision.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: ESSAY & CASE STUDIES BANK ================= */}
        {activeTab === "essays" && (
          <div className="mt-8 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Comprehensive Essay Questions & Clinical Scenarios
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Structured examination essays from 100L through 500L and NMCN Licensure with complete clinical marking rubrics.
                </p>
              </div>
              <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                {filteredEssays.length} Essay Scenarios Available
              </div>
            </div>

            {filteredEssays.map((essay, index) => {
              const isExpanded = expandedEssayId === essay.id;
              return (
                <div
                  key={essay.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                          {essay.level}
                        </span>
                        <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
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
                      <div className="mb-4 p-4 rounded-xl bg-slate-50 border-l-4 border-emerald-600 text-sm text-slate-700 leading-relaxed italic">
                        <span className="font-bold text-slate-900 not-italic block mb-1">Clinical Vignette:</span>
                        "{essay.scenario}"
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-slate-900 leading-relaxed mb-4">
                      Q{index + 1}. {essay.question}
                    </h3>

                    <button
                      onClick={() => setExpandedEssayId(isExpanded ? null : essay.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
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
                            <li key={pIdx} className="text-sm text-slate-700 flex items-start gap-2.5">
                              <span className="text-emerald-600 font-bold shrink-0">✓</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Official Marking Rubric Table */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                          Official NMCN Marking Rubric & Point Distribution:
                        </h4>
                        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
                      <div className="p-4 rounded-xl bg-teal-900 text-white text-xs leading-relaxed">
                        <span className="font-bold text-teal-300 block mb-1">Clinical Significance & Core Competency:</span>
                        {essay.modelAnswer.clinicalSignificance}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ================= TAB 3: OSCE CLINICAL PRACTICAL STUDIO ================= */}
        {activeTab === "osce" && (
          <div className="mt-8">
            {/* Station Selector Bar */}
            <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-thin">
              {NURSING_OSCE_STATIONS.map((station) => {
                const isSelected = station.id === selectedStationId;
                return (
                  <button
                    key={station.id}
                    onClick={() => handleSelectStation(station)}
                    className={`shrink-0 px-4 py-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? "bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500/30"
                        : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    <div className="text-xs font-bold text-emerald-300">
                      Station #{station.stationNumber}
                    </div>
                    <div className="text-sm font-bold truncate max-w-[200px]">
                      {station.title}
                    </div>
                    <div className="text-[11px] opacity-80 mt-0.5">
                      {station.durationMinutes} Mins • {station.level}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Station Simulator Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
              {/* Left Column: Candidate Brief & Examiner Checklist */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                {/* Station Title & Timer Bar */}
                <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-100 gap-4">
                  <div>
                    <span className="px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Station {currentStation.stationNumber} of {NURSING_OSCE_STATIONS.length}
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                      {currentStation.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Category: {currentStation.category} • Target Level: {currentStation.level}
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
                      {osceTimerRunning ? "Pause" : "Start Station Timer"}
                    </button>
                  </div>
                </div>

                {/* Candidate Instructions Brief */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                    📋 Candidate Station Instructions (Door Prompt):
                  </h3>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {currentStation.candidateInstructions}
                  </p>
                </div>

                {/* Simulated Patient Brief */}
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 text-sky-950 text-xs leading-relaxed">
                  <span className="font-bold text-sky-900 block mb-1">🎭 Simulated Patient / Manikin Presentation:</span>
                  {currentStation.simulatedPatientBrief}
                </div>

                {/* Required Equipment Checklist */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    🧰 Required Clinical Equipment on Station Trolley:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentStation.requiredEquipment.map((eq, eqIdx) => (
                      <div
                        key={eqIdx}
                        className="p-2.5 rounded-lg bg-slate-100/70 border border-slate-200 text-xs text-slate-700 flex items-center gap-2"
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
                      Interactive Examiner Scoring Rubric (10 Steps)
                    </h3>
                    <span className="text-xs text-slate-500">
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
                          className={`p-3.5 rounded-xl border flex items-start justify-between gap-4 cursor-pointer transition-all ${
                            isDone
                              ? "bg-emerald-50 border-emerald-400 text-slate-900"
                              : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isDone}
                              onChange={() => {}} // handled by parent onClick
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

                          <div className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                            {item.points} pt
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Clinical Examiner Notes */}
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs">
                  <span className="font-bold text-amber-900 block mb-1">⚠️ Lead Examiner Clinical Notes:</span>
                  {currentStation.examinerNotes}
                </div>
              </div>

              {/* Right Column: OSCE Station Score Card & Tips */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800">
                  <h3 className="text-sm font-bold text-emerald-400 mb-1">
                    OSCE Practical Scorecard
                  </h3>
                  <div className="text-4xl font-extrabold text-white mt-2">
                    {totalOscePointsEarned} / {totalOsceMaxPoints}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Completion: {Math.round((totalOscePointsEarned / totalOsceMaxPoints) * 100)}%
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800">
                    {Math.round((totalOscePointsEarned / totalOsceMaxPoints) * 100) >= 70 ? (
                      <div className="px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                        COMPETENT: Exceeds Clinical OSCE Distinction
                      </div>
                    ) : (
                      <div className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs">
                        Tick off completed steps to simulate examiner assessment.
                      </div>
                    )}
                  </div>
                </div>

                {/* High-Yield Clinical Tips */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
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

                {/* Practical Station Switcher Quick Links */}
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3">
                    All Available Practical Stations
                  </h3>
                  <div className="space-y-2">
                    {NURSING_OSCE_STATIONS.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => handleSelectStation(st)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                          st.id === selectedStationId
                            ? "bg-emerald-700 text-white"
                            : "bg-white text-slate-700 hover:bg-emerald-100/60"
                        }`}
                      >
                        <span>St. {st.stationNumber}: {st.title.split("&")[0]}</span>
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
    </div>
  );
}
