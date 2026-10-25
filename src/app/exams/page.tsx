"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  NURSING_MCQ_BANK,
  NURSING_ESSAY_BANK,
  EXAM_LEVELS,
  EXAM_CATEGORIES,
  scrambleMCQs,
  MCQQuestion,
  EssayQuestion,
} from "@/data/nursingExams";
import {
  CAOSCE_STATIONS,
  scrambleCAOSCEMCQs,
  CAOSCEStation,
  CAOSCEMCQ,
} from "@/data/caosceExams";

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState<"caosce" | "cbt" | "essays">("caosce");

  // =========================================================================
  // 1. 100% AUTONOMOUS 6-STATION CAOSCE STATE MACHINE (Zero Human Intervention)
  // =========================================================================
  const [caoscePhase, setCaoscePhase] = useState<"lobby" | "practical" | "mcq" | "transition" | "results">("lobby");
  const [candidateName, setCandidateName] = useState<string>("Candidate Nurse");
  const [candidateIndexNo, setCandidateIndexNo] = useState<string>("NMCN/2026/0842");

  const [currentStationIndex, setCurrentStationIndex] = useState<number>(0);
  const [practicalTimeRemaining, setPracticalTimeRemaining] = useState<number>(600); // 10 minutes (600 seconds)
  const [practicalTimerRunning, setPracticalTimerRunning] = useState<boolean>(false);

  const [mcqTimeRemaining, setMcqTimeRemaining] = useState<number>(600); // 10 minutes (600 seconds)
  const [mcqTimerRunning, setMcqTimerRunning] = useState<boolean>(false);
  const [currentStationMCQIndex, setCurrentStationMCQIndex] = useState<number>(0); // 0 to 9

  const [transitionTimeRemaining, setTransitionTimeRemaining] = useState<number>(30); // 30s station bell
  const [practicalCompletedSteps, setPracticalCompletedSteps] = useState<Record<string, boolean>>({});
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [examStartTime, setExamStartTime] = useState<number | null>(null);
  const [examCompletedTime, setExamCompletedTime] = useState<number | null>(null);

  // Active Station in the 6-station rotation
  const activeStation: CAOSCEStation = CAOSCE_STATIONS[currentStationIndex] || CAOSCE_STATIONS[0];

  // Scrambled MCQs for each station
  const [stationMCQPool, setStationMCQPool] = useState<Record<string, CAOSCEMCQ[]>>({});

  // Initialize CAOSCE MCQs on mount
  useEffect(() => {
    const pool: Record<string, CAOSCEMCQ[]> = {};
    CAOSCE_STATIONS.forEach((st) => {
      pool[st.id] = scrambleCAOSCEMCQs(st.mcqs);
    });
    setStationMCQPool(pool);
  }, []);

  const activeStationMCQs = useMemo(() => {
    return stationMCQPool[activeStation.id] || activeStation.mcqs;
  }, [stationMCQPool, activeStation.id, activeStation.mcqs]);

  // Audio Bell Chime Synthesizer (Web Audio API)
  const playStationBell = (type: "single" | "double" | "warning" = "single") => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      const playTone = (freq: number, start: number, dur: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur);
      };

      if (type === "warning") {
        playTone(600, 0, 0.5);
      } else if (type === "double") {
        playTone(880, 0, 0.4);
        playTone(1050, 0.45, 0.8);
      } else {
        playTone(800, 0, 0.7);
      }
    } catch {
      // AudioContext unavailable in silent environments
    }
  };

  // 1A. Practical Countdown Timer Effect (Strict 10 Minutes)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (caoscePhase === "practical" && practicalTimerRunning && practicalTimeRemaining > 0) {
      interval = setInterval(() => {
        setPracticalTimeRemaining((prev) => {
          if (prev === 121) {
            playStationBell("warning"); // 2-minute warning bell
          }
          if (prev <= 1) {
            // 10 minutes elapsed: auto-advance to MCQs
            playStationBell("double");
            setPracticalTimerRunning(false);
            setCaoscePhase("mcq");
            setMcqTimeRemaining(600);
            setMcqTimerRunning(true);
            setCurrentStationMCQIndex(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [caoscePhase, practicalTimerRunning, practicalTimeRemaining]);

  // 1B. MCQ Countdown Timer Effect (Strict 10 Minutes)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (caoscePhase === "mcq" && mcqTimerRunning && mcqTimeRemaining > 0) {
      interval = setInterval(() => {
        setMcqTimeRemaining((prev) => {
          if (prev === 121) {
            playStationBell("warning");
          }
          if (prev <= 1) {
            // MCQ time elapsed: advance to transition or results
            playStationBell("double");
            setMcqTimerRunning(false);
            if (currentStationIndex < CAOSCE_STATIONS.length - 1) {
              setCaoscePhase("transition");
              setTransitionTimeRemaining(30);
            } else {
              setCaoscePhase("results");
              setExamCompletedTime(Date.now());
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [caoscePhase, mcqTimerRunning, mcqTimeRemaining, currentStationIndex]);

  // 1C. Station Rotation Bell Transition Timer (30 Seconds)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (caoscePhase === "transition" && transitionTimeRemaining > 0) {
      interval = setInterval(() => {
        setTransitionTimeRemaining((prev) => {
          if (prev <= 1) {
            // Auto-advance to next station practical
            playStationBell("single");
            setCurrentStationIndex((curr) => curr + 1);
            setCaoscePhase("practical");
            setPracticalTimeRemaining(600);
            setPracticalTimerRunning(true);
            setMcqTimeRemaining(600);
            setCurrentStationMCQIndex(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [caoscePhase, transitionTimeRemaining]);

  // Start Autonomous CAOSCE Circuit
  const handleStartCAOSCE = () => {
    playStationBell("single");
    setCurrentStationIndex(0);
    setPracticalCompletedSteps({});
    setMcqAnswers({});
    setExamStartTime(Date.now());
    setExamCompletedTime(null);
    setPracticalTimeRemaining(600);
    setPracticalTimerRunning(true);
    setMcqTimeRemaining(600);
    setMcqTimerRunning(false);
    setCurrentStationMCQIndex(0);
    setCaoscePhase("practical");
  };

  // Toggle practical step checkbox
  const handleTogglePracticalStep = (stepNumber: number) => {
    const key = `${activeStation.id}-${stepNumber}`;
    setPracticalCompletedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Early submission of practical -> proceeds directly to Station MCQs
  const handleCompletePracticalEarly = () => {
    playStationBell("single");
    setPracticalTimerRunning(false);
    setCaoscePhase("mcq");
    setMcqTimeRemaining(600);
    setMcqTimerRunning(true);
    setCurrentStationMCQIndex(0);
  };

  // Select MCQ option
  const handleSelectMCQOption = (mcqId: string, optionIndex: number) => {
    setMcqAnswers((prev) => ({
      ...prev,
      [mcqId]: optionIndex,
    }));
  };

  // Complete Station MCQs -> advances to transition or results
  const handleCompleteStationMCQs = () => {
    playStationBell("double");
    setMcqTimerRunning(false);
    if (currentStationIndex < CAOSCE_STATIONS.length - 1) {
      setCaoscePhase("transition");
      setTransitionTimeRemaining(30);
    } else {
      setCaoscePhase("results");
      setExamCompletedTime(Date.now());
    }
  };

  // Skip 30s transition and enter next station immediately
  const handleSkipTransition = () => {
    playStationBell("single");
    setCurrentStationIndex((curr) => curr + 1);
    setCaoscePhase("practical");
    setPracticalTimeRemaining(600);
    setPracticalTimerRunning(true);
    setMcqTimeRemaining(600);
    setCurrentStationMCQIndex(0);
  };

  // Time formatter (MM:SS)
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // =========================================================================
  // CAOSCE COMPOSITE SCORING ENGINE
  // =========================================================================
  const stationPerformance = useMemo(() => {
    return CAOSCE_STATIONS.map((st) => {
      // Practical score
      let practicalEarned = 0;
      let practicalMax = 0;
      let criticalViolated = false;

      st.checklist.forEach((step) => {
        practicalMax += step.points;
        const done = !!practicalCompletedSteps[`${st.id}-${step.step}`];
        if (done) {
          practicalEarned += step.points;
        } else if (step.criticalFailStep) {
          criticalViolated = true;
        }
      });

      const practicalPercentage = practicalMax > 0 ? (practicalEarned / practicalMax) * 100 : 0;

      // MCQ score
      const mcqList = stationMCQPool[st.id] || st.mcqs;
      let mcqCorrect = 0;
      mcqList.forEach((q) => {
        if (mcqAnswers[q.id] === q.correctIndex) {
          mcqCorrect += 1;
        }
      });
      const mcqPercentage = (mcqCorrect / 10) * 100;

      // Composite = 50% Practical + 50% MCQ
      const compositeScore = Math.round((practicalPercentage * 0.5) + (mcqPercentage * 0.5));

      return {
        station: st,
        practicalEarned,
        practicalMax,
        practicalPercentage: Math.round(practicalPercentage),
        criticalViolated,
        mcqCorrect,
        mcqTotal: 10,
        mcqPercentage: Math.round(mcqPercentage),
        compositeScore,
      };
    });
  }, [practicalCompletedSteps, mcqAnswers, stationMCQPool]);

  const overallAggregateScore = useMemo(() => {
    if (stationPerformance.length === 0) return 0;
    const total = stationPerformance.reduce((acc, curr) => acc + curr.compositeScore, 0);
    return Math.round(total / stationPerformance.length);
  }, [stationPerformance]);

  const anyCriticalViolations = useMemo(() => {
    return stationPerformance.some((s) => s.criticalViolated);
  }, [stationPerformance]);

  // =========================================================================
  // 2. CBT MCQ & ESSAY BANK STATE (Retained & Preserved)
  // =========================================================================
  const [selectedLevel, setSelectedLevel] = useState<string>("All Levels");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [examSessionMode, setExamSessionMode] = useState<number>(100);

  const basePool = useMemo(() => {
    return NURSING_MCQ_BANK.filter((q) => {
      const matchLevel = selectedLevel === "All Levels" || q.level === selectedLevel;
      const matchCat = selectedCategory === "All Categories" || q.category === selectedCategory;
      return matchLevel && matchCat;
    });
  }, [selectedLevel, selectedCategory]);

  const [scrambledMCQs, setScrambledMCQs] = useState<MCQQuestion[]>([]);
  const [currentCbtQuestionIndex, setCurrentCbtQuestionIndex] = useState<number>(0);
  const [cbtUserAnswers, setCbtUserAnswers] = useState<Record<string, number>>({});
  const [showCbtResults, setShowCbtResults] = useState<boolean>(false);
  const [cbtTimeRemaining, setCbtTimeRemaining] = useState<number>(5400);
  const [cbtTimerActive, setCbtTimerActive] = useState<boolean>(true);

  const initCbtSession = (count: number, scramble = true) => {
    let pool = [...basePool];
    if (scramble) {
      pool = scrambleMCQs(pool, true);
    }
    const selected = pool.slice(0, count === 0 ? pool.length : Math.min(count, pool.length));
    setScrambledMCQs(selected);
    setCurrentCbtQuestionIndex(0);
    setCbtUserAnswers({});
    setShowCbtResults(false);
    const timeInSeconds = selected.length >= 100 ? 5400 : selected.length * 54;
    setCbtTimeRemaining(timeInSeconds);
    setCbtTimerActive(true);
  };

  useEffect(() => {
    initCbtSession(examSessionMode, true);
  }, [basePool, examSessionMode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cbtTimerActive && cbtTimeRemaining > 0 && !showCbtResults) {
      interval = setInterval(() => {
        setCbtTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cbtTimerActive, cbtTimeRemaining, showCbtResults]);

  const currentCbtQ: MCQQuestion | undefined = scrambledMCQs[currentCbtQuestionIndex] || scrambledMCQs[0];

  const calculateCbtScore = () => {
    let score = 0;
    scrambledMCQs.forEach((q) => {
      if (cbtUserAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  // Essays
  const filteredEssays = useMemo(() => {
    return NURSING_ESSAY_BANK.filter((e) => {
      const matchLevel = selectedLevel === "All Levels" || e.level === selectedLevel;
      const matchCat = selectedCategory === "All Categories" || e.category === selectedCategory;
      return matchLevel && matchCat;
    });
  }, [selectedLevel, selectedCategory]);
  const [expandedEssayId, setExpandedEssayId] = useState<string | null>(null);

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
                  Clinical Examination, CAOSCE &amp; CBT Studio
                </h1>
                <p className="text-sm md:text-base text-emerald-100/90 max-w-3xl leading-relaxed">
                  Autonomous <strong>6-Station Computer-Assisted OSCE (CAOSCE)</strong> with strict 10-minute practicals and linked cognitive MCQs, plus <strong>160+ clinical CBT MCQs</strong> and <strong>52 comprehensive essay case studies</strong> timed to Nursing and Midwifery Council of Nigeria (NMCN) licensure standards.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    if (activeTab === "caosce") {
                      handleStartCAOSCE();
                    } else {
                      initCbtSession(examSessionMode, true);
                    }
                  }}
                  className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
                >
                  <span>{activeTab === "caosce" ? "🚀 Start CAOSCE Circuit" : "🎲 Scramble & Re-shuffle Exam Pool"}</span>
                </button>
                <Link
                  href="/library"
                  className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur"
                >
                  ← eLibrary Catalog
                </Link>
              </div>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-emerald-800/60">
              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-700/40">
                <div className="text-2xl font-extrabold text-amber-300">6 Stations</div>
                <div className="text-xs text-emerald-300">Autonomous CAOSCE Circuit (120 Mins)</div>
              </div>
              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-700/40">
                <div className="text-2xl font-extrabold text-teal-300">60 Linked MCQs</div>
                <div className="text-xs text-emerald-300">10 per Practical Station</div>
              </div>
              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-700/40">
                <div className="text-2xl font-extrabold text-white">{NURSING_MCQ_BANK.length}+ CBT Qs</div>
                <div className="text-xs text-emerald-300">Scrambled Licensure Bank</div>
              </div>
              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-700/40">
                <div className="text-2xl font-extrabold text-cyan-300">{NURSING_ESSAY_BANK.length} Essay Cases</div>
                <div className="text-xs text-emerald-300">Model Marking Rubrics</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Tab Controller */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            {/* Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80 overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTab("caosce")}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === "caosce"
                    ? "bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500/30"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>🩺</span>
                <span>6-Station CAOSCE Circuit (Autonomous)</span>
              </button>
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
                <span>Clinical Essay Bank ({filteredEssays.length} Cases)</span>
              </button>
            </div>

            {/* CBT Options if CBT is active */}
            {activeTab === "cbt" && (
              <div className="flex flex-wrap items-center gap-2">
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

                <select
                  value={selectedLevel}
                  onChange={(e) => {
                    setSelectedLevel(e.target.value);
                    setCurrentCbtQuestionIndex(0);
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
                    setCurrentCbtQuestionIndex(0);
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
            )}
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: 100% AUTONOMOUS 6-STATION CAOSCE EXAMINATION STUDIO               */}
          {/* ========================================================================= */}
          {activeTab === "caosce" && (
            <div className="mt-8">
              {/* PHASE 1: LOBBY */}
              {caoscePhase === "lobby" && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 max-w-4xl mx-auto">
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                      NMCN Standardized CAOSCE Circuit
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                      Autonomous 6-Station Practical &amp; Cognitive Examination
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      This examination operates <strong>100% autonomously without human invigilators</strong>. Follow the on-screen clinical prompts, execute hands-on procedures at each station within 10 minutes, and complete the corresponding 10 MCQs in strict lockstep sequence.
                    </p>
                  </div>

                  {/* Candidate Identity Entry Form */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Candidate Full Name
                      </label>
                      <input
                        type="text"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        placeholder="e.g. Nurse Fatima Abdullahi"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        NMCN Index / Examination Number
                      </label>
                      <input
                        type="text"
                        value={candidateIndexNo}
                        onChange={(e) => setCandidateIndexNo(e.target.value)}
                        placeholder="e.g. NMCN/2026/0842"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                      />
                    </div>
                  </div>

                  {/* Circuit Overview Grid */}
                  <div className="mt-8">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                      The Six Accredited Clinical Stations:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {CAOSCE_STATIONS.map((st, sIdx) => (
                        <div
                          key={st.id}
                          className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="text-[11px] font-bold text-emerald-700">
                              Station {sIdx + 1} • {st.discipline}
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-2">
                              {st.title}
                            </h4>
                          </div>
                          <div className="mt-3 text-[10px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
                            <span>⏱ 10m Practical</span>
                            <span>📝 10 MCQs (10m)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Regulatory Guidelines */}
                  <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-2">
                    <div className="font-bold text-amber-900 flex items-center gap-2">
                      <span>⚠️</span>
                      <span>Council Examination Rules &amp; Critical Safety Warnings:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                      <li>Each practical station runs for <strong>strictly 10 minutes</strong>. A warning bell chimes at 2 minutes remaining.</li>
                      <li>When 10 minutes elapse, the system automatically sounds the station changeover bell and advances you to the 10 linked MCQs.</li>
                      <li>You have <strong>10 minutes for the 10 MCQs</strong> at each station (60 seconds per question).</li>
                      <li><strong>Critical Patient Safety Steps:</strong> Missing a mandatory safety step (e.g. failing to exclude a second twin before oxytocin) constitutes an automatic station referral.</li>
                      <li>Total Examination Duration: <strong>120 Minutes (2.0 Hours)</strong>. Pass mark: <strong>50%</strong>. Distinction: <strong>75%</strong>.</li>
                    </ul>
                  </div>

                  {/* Begin Exam CTA */}
                  <div className="mt-8 text-center">
                    <button
                      onClick={handleStartCAOSCE}
                      className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-xl shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
                    >
                      Enter Station 1 &amp; Start Autonomous CAOSCE Circuit 🩺
                    </button>
                    <p className="text-xs text-slate-400 mt-2">
                      Lockstep automated timer activates immediately upon entry.
                    </p>
                  </div>
                </div>
              )}

              {/* PHASE 2: PRACTICAL CLINICAL EXAM (10 MINUTES STRICT) */}
              {caoscePhase === "practical" && (
                <div className="space-y-6">
                  {/* Station Header & Synchronized Digital Bell Timer Bar */}
                  <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                          Station {currentStationIndex + 1} of 6: Practical Examination
                        </span>
                        <span className="text-xs text-slate-400">
                          Candidate: <strong>{candidateName}</strong> ({candidateIndexNo})
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                        {activeStation.title}
                      </h2>
                      <p className="text-xs text-slate-300">
                        Clinical Discipline: {activeStation.discipline}
                      </p>
                    </div>

                    {/* Digital Countdown Timer */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-mono text-base font-black shadow-inner ${
                          practicalTimeRemaining <= 120
                            ? "bg-red-600 text-white animate-pulse"
                            : "bg-emerald-950 text-emerald-300 border border-emerald-600/40"
                        }`}
                      >
                        <span>⏱ Bell Timer:</span>
                        <span>{formatTimer(practicalTimeRemaining)}</span>
                      </div>

                      <button
                        onClick={handleCompletePracticalEarly}
                        className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5"
                        title="Submit practical and start 10 MCQs immediately"
                      >
                        <span>Proceed to Station MCQs (10 Qs) →</span>
                      </button>
                    </div>
                  </div>

                  {/* Station Workspace Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Dossier, Equipment & Interactive Checklist */}
                    <div className="lg:col-span-8 space-y-6">
                      {/* Clinical Scenario Dossier & Patient Vitals */}
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                        <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-emerald-600 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                          <span className="font-bold text-slate-900 not-italic block mb-1">
                            📋 Clinical Scenario Dossier:
                          </span>
                          {activeStation.scenario}
                        </div>

                        {/* Vital Signs Bar */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2">
                          <div className="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200 text-center">
                            <div className="text-[10px] font-bold text-slate-500 uppercase">BP</div>
                            <div className="text-xs font-extrabold text-slate-900 mt-0.5">
                              {activeStation.vitalSignsAtEntry.bloodPressure}
                            </div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200 text-center">
                            <div className="text-[10px] font-bold text-slate-500 uppercase">HR</div>
                            <div className="text-xs font-extrabold text-emerald-700 mt-0.5">
                              {activeStation.vitalSignsAtEntry.heartRate}
                            </div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200 text-center">
                            <div className="text-[10px] font-bold text-slate-500 uppercase">RR</div>
                            <div className="text-xs font-extrabold text-slate-900 mt-0.5">
                              {activeStation.vitalSignsAtEntry.respiratoryRate}
                            </div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200 text-center">
                            <div className="text-[10px] font-bold text-slate-500 uppercase">Temp</div>
                            <div className="text-xs font-extrabold text-amber-700 mt-0.5">
                              {activeStation.vitalSignsAtEntry.temperature}
                            </div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200 text-center">
                            <div className="text-[10px] font-bold text-slate-500 uppercase">SpO2</div>
                            <div className="text-xs font-extrabold text-teal-700 mt-0.5">
                              {activeStation.vitalSignsAtEntry.spO2}
                            </div>
                          </div>
                          {activeStation.vitalSignsAtEntry.painScore && (
                            <div className="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200 text-center">
                              <div className="text-[10px] font-bold text-slate-500 uppercase">Pain</div>
                              <div className="text-xs font-extrabold text-red-600 mt-0.5">
                                {activeStation.vitalSignsAtEntry.painScore}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Candidate Door Brief */}
                        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 text-xs">
                          <span className="font-bold text-teal-900 block mb-1">
                            🎯 Candidate Station Instructions:
                          </span>
                          {activeStation.candidateInstructions}
                        </div>
                      </div>

                      {/* Interactive Autonomous Procedure Checklist (10 Steps) */}
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                              Clinical Procedure Execution Checklist (10 Steps)
                            </h3>
                            <p className="text-xs text-slate-500">
                              Click to execute each required nursing action in priority clinical sequence.
                            </p>
                          </div>
                          <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                            100 Points Total
                          </div>
                        </div>

                        <div className="space-y-3">
                          {activeStation.checklist.map((step) => {
                            const isDone = !!practicalCompletedSteps[`${activeStation.id}-${step.step}`];
                            return (
                              <div
                                key={step.step}
                                onClick={() => handleTogglePracticalStep(step.step)}
                                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                                  isDone
                                    ? "bg-emerald-50/70 border-emerald-400 text-slate-900 shadow-xs"
                                    : "bg-white border-slate-200 hover:border-emerald-300 text-slate-700"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <input
                                    type="checkbox"
                                    checked={isDone}
                                    onChange={() => {}}
                                    className="mt-1 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                                  />
                                  <div>
                                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                                      Step {step.step}: {step.description}
                                    </div>
                                    <div className="text-[11px] text-slate-500 mt-1 italic">
                                      Examiner Criteria: {step.examinerGuidance}
                                    </div>
                                    {step.criticalFailStep && (
                                      <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-extrabold uppercase tracking-wide">
                                        🚨 Non-Negotiable Critical Patient Safety Step
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700">
                                  {step.points} pts
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Trolley Equipment & Station Progress */}
                    <div className="lg:col-span-4 space-y-6">
                      {/* Equipment Tray Checklist */}
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
                          <span>🧰 Station Equipment Tray:</span>
                        </h3>
                        <div className="space-y-2">
                          {activeStation.requiredEquipment.map((eq, eqIdx) => (
                            <div
                              key={eqIdx}
                              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2"
                            >
                              <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                              <span>{eq}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Simulated Patient Dossier */}
                      <div className="bg-sky-50 p-6 rounded-3xl border border-sky-200 text-sky-950 text-xs">
                        <span className="font-bold text-sky-900 block mb-1">
                          🎭 Simulated Patient Profile:
                        </span>
                        {activeStation.simulatedPatientBrief}
                      </div>

                      {/* Clinical Significance */}
                      <div className="bg-emerald-950 text-emerald-100 p-6 rounded-3xl border border-emerald-800 text-xs leading-relaxed">
                        <span className="font-bold text-emerald-300 block mb-1">
                          💡 Core Clinical Competency:
                        </span>
                        {activeStation.clinicalSignificance}
                      </div>

                      {/* Big Submit Button */}
                      <button
                        onClick={handleCompletePracticalEarly}
                        className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition-all text-center flex items-center justify-center gap-2"
                      >
                        <span>Submit Practical &amp; Start Station MCQs (10 Qs) →</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PHASE 3: STATION LINKED MCQS (10 QUESTIONS • 10 MINUTES) */}
              {caoscePhase === "mcq" && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  {/* MCQ Header & Timer Bar */}
                  <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold">
                          Station {currentStationIndex + 1} of 6: Linked Cognitive MCQs
                        </span>
                        <span className="text-xs text-slate-400">
                          {activeStation.discipline}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                        Clinical Decision &amp; Pathophysiology Assessment
                      </h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-mono text-base font-black shadow-inner ${
                          mcqTimeRemaining <= 120
                            ? "bg-red-600 text-white animate-pulse"
                            : "bg-teal-950 text-teal-300 border border-teal-600/40"
                        }`}
                      >
                        <span>⏱ MCQ Timer:</span>
                        <span>{formatTimer(mcqTimeRemaining)}</span>
                      </div>

                      <button
                        onClick={handleCompleteStationMCQs}
                        className="px-5 py-2.5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-extrabold shadow-md transition-all"
                      >
                        <span>Submit Station MCQs →</span>
                      </button>
                    </div>
                  </div>

                  {/* 10 Question Navigator Pills */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-2 overflow-x-auto">
                    <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
                      Questions (10):
                    </span>
                    <div className="flex items-center gap-1.5">
                      {activeStationMCQs.map((q, idx) => {
                        const isAnswered = mcqAnswers[q.id] !== undefined;
                        const isCurrent = currentStationMCQIndex === idx;
                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentStationMCQIndex(idx)}
                            className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                              isCurrent
                                ? "bg-teal-700 text-white ring-2 ring-teal-400"
                                : isAnswered
                                ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Question Card */}
                  {activeStationMCQs[currentStationMCQIndex] && (
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
                        <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                          Question {currentStationMCQIndex + 1} of 10
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          Domain: {activeStationMCQs[currentStationMCQIndex].competencyDomain}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                        {activeStationMCQs[currentStationMCQIndex].question}
                      </h3>

                      {/* 4 Selectable Options */}
                      <div className="space-y-3 pt-2">
                        {activeStationMCQs[currentStationMCQIndex].options.map((opt, optIdx) => {
                          const isSelected = mcqAnswers[activeStationMCQs[currentStationMCQIndex].id] === optIdx;
                          return (
                            <div
                              key={optIdx}
                              onClick={() => handleSelectMCQOption(activeStationMCQs[currentStationMCQIndex].id, optIdx)}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                                isSelected
                                  ? "bg-teal-50 border-teal-500 text-slate-900 shadow-xs ring-1 ring-teal-400"
                                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                  isSelected ? "border-teal-600 bg-teal-600" : "border-slate-300"
                                }`}
                              >
                                {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                              </div>
                              <span className="text-xs sm:text-sm font-medium">{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Nav Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <button
                          disabled={currentStationMCQIndex === 0}
                          onClick={() => setCurrentStationMCQIndex((prev) => Math.max(0, prev - 1))}
                          className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                        >
                          ← Previous Question
                        </button>

                        {currentStationMCQIndex < 9 ? (
                          <button
                            onClick={() => setCurrentStationMCQIndex((prev) => Math.min(9, prev + 1))}
                            className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold"
                          >
                            Next Question →
                          </button>
                        ) : (
                          <button
                            onClick={handleCompleteStationMCQs}
                            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md"
                          >
                            Submit Station MCQs &amp; Proceed →
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PHASE 4: 30-SECOND ROTATION BELL TRANSITION */}
              {caoscePhase === "transition" && (
                <div className="bg-slate-950 text-white rounded-3xl border border-slate-800 p-8 sm:p-12 max-w-2xl mx-auto text-center shadow-2xl space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center text-3xl mx-auto animate-bounce">
                    🔔
                  </div>

                  <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                      Station Changeover Bell
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
                      Station {currentStationIndex + 1} Complete!
                    </h2>
                    <p className="text-sm text-slate-300 mt-2">
                      Please prepare your workstation. Transitioning to <strong>Station {currentStationIndex + 2}: {CAOSCE_STATIONS[currentStationIndex + 1]?.discipline}</strong>.
                    </p>
                  </div>

                  {/* 30-Second Countdown */}
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                      Automated Station Rotation In:
                    </div>
                    <div className="text-5xl font-black text-emerald-400 mt-2 font-mono">
                      00:{transitionTimeRemaining.toString().padStart(2, "0")}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={handleSkipTransition}
                      className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition-all"
                    >
                      I Am Ready — Enter Station {currentStationIndex + 2} Now →
                    </button>
                  </div>
                </div>
              )}

              {/* PHASE 5: COMPOSITE RESULTS & OFFICIAL TRANSCRIPT */}
              {caoscePhase === "results" && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
                  {/* Official Result Slip Header */}
                  <div className="border-b border-slate-200 pb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                        Official NMCN Standard Assessment Slip
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                        CAOSCE Examination Performance Transcript
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Candidate: <strong>{candidateName}</strong> • Index No: <strong>{candidateIndexNo}</strong> • Date: {new Date().toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => window.print()}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-all flex items-center gap-2"
                      >
                        <span>🖨️</span>
                        <span>Print Official Slip</span>
                      </button>

                      <button
                        onClick={handleStartCAOSCE}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all"
                      >
                        Retake CAOSCE Circuit
                      </button>
                    </div>
                  </div>

                  {/* Aggregate Result Banner */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800">
                      <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                        Composite Aggregate Score
                      </div>
                      <div className="text-5xl font-black text-emerald-400 mt-2 font-mono">
                        {overallAggregateScore}%
                      </div>
                      <div className="mt-3">
                        {overallAggregateScore >= 75 ? (
                          <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                            🏆 DISTINCTION (Council Honors)
                          </span>
                        ) : overallAggregateScore >= 60 ? (
                          <span className="px-3 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold">
                            ✓ CREDIT PASS
                          </span>
                        ) : overallAggregateScore >= 50 ? (
                          <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                            ✓ PASS (50% Standard Met)
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold">
                            ⚠️ REFERRED / REMEDIAL REQUIRED
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                          Patient Safety Audit
                        </div>
                        <div className="mt-2 text-sm font-bold text-slate-900">
                          {anyCriticalViolations ? (
                            <div className="text-red-700 flex items-start gap-2">
                              <span>🚨</span>
                              <span>Critical Safety Violations Detected in one or more stations.</span>
                            </div>
                          ) : (
                            <div className="text-emerald-700 flex items-start gap-2">
                              <span>🛡️</span>
                              <span>Zero Critical Safety Violations. Safe clinical practice validated.</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2">
                        NMCN policy requires remediation if any non-negotiable patient safety step is omitted.
                      </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold uppercase text-emerald-800 tracking-wider">
                          Examination Structure
                        </div>
                        <div className="text-xs text-emerald-950 mt-2 space-y-1">
                          <div>• 6 Clinical Practical Stations (10m each)</div>
                          <div>• 60 Cognitive Rationale MCQs (10m each)</div>
                          <div>• Total Exam Circuit: 120 Minutes (2.0 Hours)</div>
                        </div>
                      </div>
                      <div className="text-[11px] text-emerald-700 font-semibold mt-2">
                        Certified by College Clinical Examination Board
                      </div>
                    </div>
                  </div>

                  {/* Station-by-Station Mastery Table */}
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-3">
                      Station-by-Station Competency Breakdown:
                    </h3>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                          <tr>
                            <th className="p-3.5 font-bold">Station</th>
                            <th className="p-3.5 font-bold">Clinical Discipline</th>
                            <th className="p-3.5 font-bold">Practical Score (50%)</th>
                            <th className="p-3.5 font-bold">MCQ Score (50%)</th>
                            <th className="p-3.5 font-bold">Composite Grade</th>
                            <th className="p-3.5 font-bold">Safety Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {stationPerformance.map((item, idx) => (
                            <tr key={item.station.id} className="hover:bg-slate-50/60">
                              <td className="p-3.5 font-bold text-slate-900">Station {idx + 1}</td>
                              <td className="p-3.5 font-medium text-slate-800">{item.station.discipline}</td>
                              <td className="p-3.5 font-bold text-emerald-700">
                                {item.practicalPercentage}% ({item.practicalEarned}/{item.practicalMax} pts)
                              </td>
                              <td className="p-3.5 font-bold text-teal-700">
                                {item.mcqPercentage}% ({item.mcqCorrect}/10 Qs)
                              </td>
                              <td className="p-3.5 font-extrabold text-slate-900 text-sm">
                                {item.compositeScore}%
                              </td>
                              <td className="p-3.5">
                                {item.criticalViolated ? (
                                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
                                    CRITICAL OMISSION
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                    PASSED
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: CBT MCQ TESTING (Preserved)                                        */}
          {/* ========================================================================= */}
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
                  {/* Left Column: Active CBT Question */}
                  <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                          Question {currentCbtQuestionIndex + 1} of {scrambledMCQs.length}
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                          {currentCbtQ?.level}
                        </span>
                      </div>
                      <div className="font-mono text-sm font-bold text-slate-700">
                        ⏱ Time Remaining: {formatTimer(cbtTimeRemaining)}
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                      {currentCbtQ?.question}
                    </h3>

                    <div className="space-y-3 pt-2">
                      {currentCbtQ?.options.map((opt, idx) => {
                        const isSelected = cbtUserAnswers[currentCbtQ.id] === idx;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              if (!showCbtResults) {
                                setCbtUserAnswers((prev) => ({
                                  ...prev,
                                  [currentCbtQ.id]: idx,
                                }));
                              }
                            }}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                              isSelected
                                ? "bg-emerald-50 border-emerald-500 text-slate-900 ring-1 ring-emerald-400"
                                : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? "border-emerald-600 bg-emerald-600" : "border-slate-300"
                              }`}
                            >
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                            </div>
                            <span className="text-xs sm:text-sm font-medium">{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        disabled={currentCbtQuestionIndex === 0}
                        onClick={() => setCurrentCbtQuestionIndex((prev) => Math.max(0, prev - 1))}
                        className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                      >
                        ← Previous
                      </button>
                      <button
                        disabled={currentCbtQuestionIndex === scrambledMCQs.length - 1}
                        onClick={() => setCurrentCbtQuestionIndex((prev) => Math.min(scrambledMCQs.length - 1, prev + 1))}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold disabled:opacity-40"
                      >
                        Next Question →
                      </button>
                    </div>
                  </div>

                  {/* Right Column: CBT Stats & Submission */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-md border border-slate-800">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        CBT Session Status
                      </h3>
                      <div className="text-3xl font-extrabold text-white mt-2">
                        {Object.keys(cbtUserAnswers).length} / {scrambledMCQs.length} Answered
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-800">
                        <button
                          onClick={() => setShowCbtResults(true)}
                          className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow"
                        >
                          Submit CBT Exam Paper
                        </button>
                      </div>
                    </div>

                    {showCbtResults && (
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-3">
                        <h4 className="text-xs font-bold uppercase text-slate-500">CBT Score</h4>
                        <div className="text-4xl font-black text-emerald-700">
                          {calculateCbtScore()} / {scrambledMCQs.length}
                        </div>
                        <p className="text-xs text-slate-600">
                          Score Percentage: {Math.round((calculateCbtScore() / scrambledMCQs.length) * 100)}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: ESSAY CASE BANK (Preserved)                                        */}
          {/* ========================================================================= */}
          {activeTab === "essays" && (
            <div className="mt-8 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
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

                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-slate-50/70 p-6 sm:p-8 space-y-6">
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

                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                            Official NMCN Marking Rubric:
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

                        <div className="p-4 rounded-2xl bg-teal-900 text-white text-xs leading-relaxed">
                          <span className="font-bold text-teal-300 block mb-1">Clinical Significance:</span>
                          {essay.modelAnswer.clinicalSignificance}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
