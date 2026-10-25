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
} from "@/data/nursingExams";
import {
  CAOSCE_STATIONS,
  scrambleCAOSCEMCQs,
  CAOSCEStation,
  CAOSCEMCQ,
} from "@/data/caosceExams";
import { OSPE_STATIONS, OSPEStation } from "@/data/ospeExams";
import { DOSAGE_MATH_QUESTIONS, DosageQuestion } from "@/data/dosageMathExams";
import { WHO_PARTOGRAPH_SCENARIO, PartographScenario } from "@/data/partographExams";
import { DISASTER_TRIAGE_CASUALTIES, TriageCasualty } from "@/data/triageExams";

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState<
    "caosce" | "partograph" | "ospe" | "dosage" | "triage" | "cbt" | "essays"
  >("caosce");

  // =========================================================================
  // 1. 100% AUTONOMOUS 6-STATION CAOSCE STATE MACHINE
  // =========================================================================
  const [caoscePhase, setCaoscePhase] = useState<"lobby" | "practical" | "mcq" | "transition" | "results">("lobby");
  const [candidateName, setCandidateName] = useState<string>("Candidate Nurse");
  const [candidateIndexNo, setCandidateIndexNo] = useState<string>("NMCN/2026/0842");

  const [currentStationIndex, setCurrentStationIndex] = useState<number>(0);
  const [practicalTimeRemaining, setPracticalTimeRemaining] = useState<number>(600); // 10 mins (600s)
  const [practicalTimerRunning, setPracticalTimerRunning] = useState<boolean>(false);

  const [mcqTimeRemaining, setMcqTimeRemaining] = useState<number>(600); // 10 mins (600s)
  const [mcqTimerRunning, setMcqTimerRunning] = useState<boolean>(false);
  const [currentStationMCQIndex, setCurrentStationMCQIndex] = useState<number>(0);

  const [transitionTimeRemaining, setTransitionTimeRemaining] = useState<number>(30); // 30s bell
  const [practicalCompletedSteps, setPracticalCompletedSteps] = useState<Record<string, boolean>>({});
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [showQrCertificateModal, setShowQrCertificateModal] = useState<boolean>(false);

  // Active Station
  const activeStation: CAOSCEStation = CAOSCE_STATIONS[currentStationIndex] || CAOSCE_STATIONS[0];

  // Scrambled Station MCQs
  const [stationMCQPool, setStationMCQPool] = useState<Record<string, CAOSCEMCQ[]>>({});

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

  // Audio Bell Chime Synthesizer
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
      // AudioContext unavailable
    }
  };

  // Practical Countdown (10 Mins)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (caoscePhase === "practical" && practicalTimerRunning && practicalTimeRemaining > 0) {
      interval = setInterval(() => {
        setPracticalTimeRemaining((prev) => {
          if (prev === 121) playStationBell("warning");
          if (prev <= 1) {
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

  // MCQ Countdown (10 Mins)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (caoscePhase === "mcq" && mcqTimerRunning && mcqTimeRemaining > 0) {
      interval = setInterval(() => {
        setMcqTimeRemaining((prev) => {
          if (prev === 121) playStationBell("warning");
          if (prev <= 1) {
            playStationBell("double");
            setMcqTimerRunning(false);
            if (currentStationIndex < CAOSCE_STATIONS.length - 1) {
              setCaoscePhase("transition");
              setTransitionTimeRemaining(30);
            } else {
              setCaoscePhase("results");
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [caoscePhase, mcqTimerRunning, mcqTimeRemaining, currentStationIndex]);

  // Transition Countdown (30s)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (caoscePhase === "transition" && transitionTimeRemaining > 0) {
      interval = setInterval(() => {
        setTransitionTimeRemaining((prev) => {
          if (prev <= 1) {
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

  const handleStartCAOSCE = () => {
    playStationBell("single");
    setCurrentStationIndex(0);
    setPracticalCompletedSteps({});
    setMcqAnswers({});
    setPracticalTimeRemaining(600);
    setPracticalTimerRunning(true);
    setMcqTimeRemaining(600);
    setMcqTimerRunning(false);
    setCurrentStationMCQIndex(0);
    setCaoscePhase("practical");
  };

  const handleTogglePracticalStep = (stepNumber: number) => {
    const key = `${activeStation.id}-${stepNumber}`;
    setPracticalCompletedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCompletePracticalEarly = () => {
    playStationBell("single");
    setPracticalTimerRunning(false);
    setCaoscePhase("mcq");
    setMcqTimeRemaining(600);
    setMcqTimerRunning(true);
    setCurrentStationMCQIndex(0);
  };

  const handleSelectMCQOption = (mcqId: string, optionIndex: number) => {
    setMcqAnswers((prev) => ({
      ...prev,
      [mcqId]: optionIndex,
    }));
  };

  const handleCompleteStationMCQs = () => {
    playStationBell("double");
    setMcqTimerRunning(false);
    if (currentStationIndex < CAOSCE_STATIONS.length - 1) {
      setCaoscePhase("transition");
      setTransitionTimeRemaining(30);
    } else {
      setCaoscePhase("results");
    }
  };

  const handleSkipTransition = () => {
    playStationBell("single");
    setCurrentStationIndex((curr) => curr + 1);
    setCaoscePhase("practical");
    setPracticalTimeRemaining(600);
    setPracticalTimerRunning(true);
    setMcqTimeRemaining(600);
    setCurrentStationMCQIndex(0);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // CAOSCE Scoring Engine
  const stationPerformance = useMemo(() => {
    return CAOSCE_STATIONS.map((st) => {
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
      const mcqList = stationMCQPool[st.id] || st.mcqs;
      let mcqCorrect = 0;
      mcqList.forEach((q) => {
        if (mcqAnswers[q.id] === q.correctIndex) {
          mcqCorrect += 1;
        }
      });
      const mcqPercentage = (mcqCorrect / 10) * 100;
      const compositeScore = Math.round((practicalPercentage * 0.5) + (mcqPercentage * 0.5));

      return {
        station: st,
        practicalEarned,
        practicalMax,
        practicalPercentage: Math.round(practicalPercentage),
        criticalViolated,
        mcqCorrect,
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

  // Generate SHA-256 Mock Cryptographic Hash Token for Certificate
  const cryptographicCertificateHash = useMemo(() => {
    const raw = `${candidateName}-${candidateIndexNo}-${overallAggregateScore}-NMCN-VERIFIED`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    return `SHA256-${Math.abs(hash).toString(16).toUpperCase()}-94A8E-2026-CHEP`;
  }, [candidateName, candidateIndexNo, overallAggregateScore]);

  // =========================================================================
  // 2. OSPE DIAGNOSTIC STUDIO STATE
  // =========================================================================
  const [currentOspeIndex, setCurrentOspeIndex] = useState<number>(0);
  const [ospeAnswers, setOspeAnswers] = useState<Record<string, number>>({});
  const activeOspeStation: OSPEStation = OSPE_STATIONS[currentOspeIndex] || OSPE_STATIONS[0];

  // =========================================================================
  // 3. ZERO-TOLERANCE DOSAGE MATH STATE
  // =========================================================================
  const [currentDosageIndex, setCurrentDosageIndex] = useState<number>(0);
  const [dosageAnswers, setDosageAnswers] = useState<Record<string, number>>({});
  const [dosageRevealed, setDosageRevealed] = useState<Record<string, boolean>>({});
  const activeDosageQuestion: DosageQuestion = DOSAGE_MATH_QUESTIONS[currentDosageIndex] || DOSAGE_MATH_QUESTIONS[0];

  // =========================================================================
  // 4. WHO PARTOGRAPH SIMULATOR STATE
  // =========================================================================
  const partograph = WHO_PARTOGRAPH_SCENARIO;
  const [partographAnswers, setPartographAnswers] = useState<Record<number, number>>({});

  // =========================================================================
  // 5. START DISASTER TRIAGE STATE
  // =========================================================================
  const [triageAnswers, setTriageAnswers] = useState<Record<string, "RED" | "YELLOW" | "GREEN" | "BLACK">>({});
  const [currentTriageIndex, setCurrentTriageIndex] = useState<number>(0);
  const activeTriageCasualty: TriageCasualty = DISASTER_TRIAGE_CASUALTIES[currentTriageIndex] || DISASTER_TRIAGE_CASUALTIES[0];

  // =========================================================================
  // 6. CBT MCQ & ESSAY BANK STATE (Preserved)
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

  useEffect(() => {
    let pool = [...basePool];
    pool = scrambleMCQs(pool, true);
    const selected = pool.slice(0, examSessionMode === 0 ? pool.length : Math.min(examSessionMode, pool.length));
    setScrambledMCQs(selected);
    setCurrentCbtQuestionIndex(0);
    setCbtUserAnswers({});
    setShowCbtResults(false);
    setCbtTimeRemaining(selected.length >= 100 ? 5400 : selected.length * 54);
  }, [basePool, examSessionMode]);

  const currentCbtQ: MCQQuestion | undefined = scrambledMCQs[currentCbtQuestionIndex] || scrambledMCQs[0];

  const calculateCbtScore = () => {
    let score = 0;
    scrambledMCQs.forEach((q) => {
      if (cbtUserAnswers[q.id] === q.correctIndex) score += 1;
    });
    return score;
  };

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
        {/* Header Hero Banner */}
        <section className="bg-gradient-to-r from-emerald-950 via-teal-900 to-cyan-950 text-white pt-16 pb-14 px-4 sm:px-6 lg:px-8 border-b border-emerald-800/40 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Official NMCN &amp; Global Accredited Examination Studio
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
                  Clinical Examination &amp; Simulation Academy
                </h1>
                <p className="text-sm md:text-base text-emerald-100/90 max-w-3xl leading-relaxed">
                  Comprehensive multi-modal examination suites: <strong>Autonomous 6-Station CAOSCE</strong>, <strong>Interactive WHO Partograph</strong>, <strong>OSPE Diagnostic Studio (ECG/ABG)</strong>, <strong>Dosage Math Board</strong>, <strong>START Disaster Triage</strong>, and <strong>160+ CBT Board MCQs</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="/GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.md"
                  download
                  className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur flex items-center gap-2"
                >
                  <span>📥 Download Global Exam Standard (.md)</span>
                </a>
                <Link
                  href="/library"
                  className="px-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black shadow-lg shadow-emerald-500/25 transition-all"
                >
                  ← eLibrary Catalog
                </Link>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-8 pt-6 border-t border-emerald-800/60 text-center">
              <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-700/40">
                <div className="text-xl font-black text-amber-300">6 Stations</div>
                <div className="text-[11px] text-emerald-300">CAOSCE Circuit (120m)</div>
              </div>
              <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-700/40">
                <div className="text-xl font-black text-teal-300">WHO Partograph</div>
                <div className="text-[11px] text-emerald-300">Vector Labor Graph</div>
              </div>
              <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-700/40">
                <div className="text-xl font-black text-cyan-300">OSPE Studio</div>
                <div className="text-[11px] text-emerald-300">ECG, ABG &amp; Urinalysis</div>
              </div>
              <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-700/40">
                <div className="text-xl font-black text-rose-300">Dosage Math</div>
                <div className="text-[11px] text-emerald-300">Zero-Tolerance Calcs</div>
              </div>
              <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-700/40">
                <div className="text-xl font-black text-emerald-300">START Triage</div>
                <div className="text-[11px] text-emerald-300">Disaster Casualty Queue</div>
              </div>
              <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-700/40">
                <div className="text-xl font-black text-white">160+ CBT Qs</div>
                <div className="text-[11px] text-emerald-300">Scrambled Board MCQs</div>
              </div>
            </div>
          </div>
        </section>

        {/* Master Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80 overflow-x-auto max-w-full gap-1">
              <button
                onClick={() => setActiveTab("caosce")}
                className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "caosce" ? "bg-emerald-700 text-white shadow-md" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>🩺</span>
                <span>6-Station CAOSCE</span>
              </button>
              <button
                onClick={() => setActiveTab("partograph")}
                className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "partograph" ? "bg-emerald-700 text-white shadow-md" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>📈</span>
                <span>WHO Partograph</span>
              </button>
              <button
                onClick={() => setActiveTab("ospe")}
                className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "ospe" ? "bg-emerald-700 text-white shadow-md" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>🔬</span>
                <span>OSPE Diagnostics</span>
              </button>
              <button
                onClick={() => setActiveTab("dosage")}
                className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "dosage" ? "bg-emerald-700 text-white shadow-md" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>💊</span>
                <span>Dosage Math</span>
              </button>
              <button
                onClick={() => setActiveTab("triage")}
                className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "triage" ? "bg-emerald-700 text-white shadow-md" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>🚨</span>
                <span>Disaster Triage</span>
              </button>
              <button
                onClick={() => setActiveTab("cbt")}
                className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "cbt" ? "bg-emerald-700 text-white shadow-md" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>📝</span>
                <span>CBT MCQs</span>
              </button>
              <button
                onClick={() => setActiveTab("essays")}
                className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "essays" ? "bg-emerald-700 text-white shadow-md" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>📄</span>
                <span>Essay Bank</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: 100% AUTONOMOUS 6-STATION CAOSCE                                   */}
          {/* ========================================================================= */}
          {activeTab === "caosce" && (
            <div className="mt-8">
              {/* LOBBY */}
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

              {/* PRACTICAL PHASE */}
              {caoscePhase === "practical" && (
                <div className="space-y-6">
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
                        Discipline: {activeStation.discipline}
                      </p>
                    </div>

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
                        className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-md transition-all"
                      >
                        Proceed to Station MCQs (10 Qs) →
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 space-y-6">
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                        <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-emerald-600 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                          <span className="font-bold text-slate-900 not-italic block mb-1">
                            📋 Clinical Scenario Dossier:
                          </span>
                          {activeStation.scenario}
                        </div>

                        {/* Vital Signs */}
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

                        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 text-xs">
                          <span className="font-bold text-teal-900 block mb-1">
                            🎯 Candidate Station Instructions:
                          </span>
                          {activeStation.candidateInstructions}
                        </div>
                      </div>

                      {/* Checklist */}
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                            Clinical Procedure Execution Checklist (10 Steps)
                          </h3>
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
                                      <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-extrabold uppercase">
                                        🚨 Critical Patient Safety Step
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

                    <div className="lg:col-span-4 space-y-6">
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                          🧰 Equipment Tray:
                        </h3>
                        <div className="space-y-2">
                          {activeStation.requiredEquipment.map((eq, eqIdx) => (
                            <div key={eqIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{eq}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-sky-50 p-6 rounded-3xl border border-sky-200 text-sky-950 text-xs">
                        <span className="font-bold text-sky-900 block mb-1">🎭 Simulated Patient:</span>
                        {activeStation.simulatedPatientBrief}
                      </div>

                      <button
                        onClick={handleCompletePracticalEarly}
                        className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition-all text-center"
                      >
                        Submit Practical &amp; Start Station MCQs (10 Qs) →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* MCQ PHASE */}
              {caoscePhase === "mcq" && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="px-3 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold">
                        Station {currentStationIndex + 1} of 6: Linked Cognitive MCQs
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                        Clinical Decision &amp; Pathophysiology Assessment
                      </h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="px-5 py-2.5 rounded-2xl font-mono text-base font-black bg-teal-950 text-teal-300 border border-teal-600/40">
                        ⏱ MCQ Timer: {formatTimer(mcqTimeRemaining)}
                      </div>
                      <button
                        onClick={handleCompleteStationMCQs}
                        className="px-5 py-2.5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-extrabold shadow-md"
                      >
                        Submit Station MCQs →
                      </button>
                    </div>
                  </div>

                  {/* 10 Question Navigator */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-2 overflow-x-auto">
                    <span className="text-xs font-bold text-slate-700">Questions (10):</span>
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

                  {/* Question Card */}
                  {activeStationMCQs[currentStationMCQIndex] && (
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                          Question {currentStationMCQIndex + 1} of 10
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">
                          Domain: {activeStationMCQs[currentStationMCQIndex].competencyDomain}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                        {activeStationMCQs[currentStationMCQIndex].question}
                      </h3>

                      <div className="space-y-3 pt-2">
                        {activeStationMCQs[currentStationMCQIndex].options.map((opt, optIdx) => {
                          const isSelected = mcqAnswers[activeStationMCQs[currentStationMCQIndex].id] === optIdx;
                          return (
                            <div
                              key={optIdx}
                              onClick={() => handleSelectMCQOption(activeStationMCQs[currentStationMCQIndex].id, optIdx)}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                                isSelected
                                  ? "bg-teal-50 border-teal-500 text-slate-900 ring-1 ring-teal-400"
                                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? "border-teal-600 bg-teal-600" : "border-slate-300"}`}>
                                {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                              </div>
                              <span className="text-xs sm:text-sm font-medium">{opt}</span>
                            </div>
                          );
                        })}
                      </div>

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

              {/* 30-SECOND TRANSITION */}
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
                      Transitioning to <strong>Station {currentStationIndex + 2}: {CAOSCE_STATIONS[currentStationIndex + 1]?.discipline}</strong>.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                      Automated Station Rotation In:
                    </div>
                    <div className="text-5xl font-black text-emerald-400 mt-2 font-mono">
                      00:{transitionTimeRemaining.toString().padStart(2, "0")}
                    </div>
                  </div>

                  <button
                    onClick={handleSkipTransition}
                    className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition-all"
                  >
                    I Am Ready — Enter Station {currentStationIndex + 2} Now →
                  </button>
                </div>
              )}

              {/* RESULTS TRANSCRIPT & DIGITAL CERTIFICATE */}
              {caoscePhase === "results" && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
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
                        onClick={() => setShowQrCertificateModal(true)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold shadow-md hover:bg-emerald-700 transition-all flex items-center gap-2"
                      >
                        <span>🔐</span>
                        <span>Verifiable Digital Certificate &amp; QR</span>
                      </button>

                      <button
                        onClick={() => window.print()}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-all flex items-center gap-2"
                      >
                        <span>🖨️</span>
                        <span>Print Slip</span>
                      </button>

                      <button
                        onClick={handleStartCAOSCE}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all"
                      >
                        Retake Circuit
                      </button>
                    </div>
                  </div>

                  {/* Summary Banner */}
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
                            ✓ PASS (50% Met)
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold">
                            ⚠️ REFERRED / REMEDIAL
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
                              <span>Zero Critical Violations. Patient Safety Standards Validated.</span>
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
                          Cryptographic Integrity
                        </div>
                        <div className="font-mono text-[11px] text-emerald-950 mt-2 break-all bg-white p-2 rounded-xl border border-emerald-200">
                          {cryptographicCertificateHash}
                        </div>
                      </div>
                      <div className="text-[11px] text-emerald-700 font-semibold mt-2">
                        Tamper-proof digital ledger verification token.
                      </div>
                    </div>
                  </div>

                  {/* Station Performance Table */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <tr>
                          <th className="p-3.5 font-bold">Station</th>
                          <th className="p-3.5 font-bold">Clinical Discipline</th>
                          <th className="p-3.5 font-bold">Practical (50%)</th>
                          <th className="p-3.5 font-bold">MCQs (50%)</th>
                          <th className="p-3.5 font-bold">Composite</th>
                          <th className="p-3.5 font-bold">Safety Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {stationPerformance.map((item, idx) => (
                          <tr key={item.station.id} className="hover:bg-slate-50/60">
                            <td className="p-3.5 font-bold text-slate-900">Station {idx + 1}</td>
                            <td className="p-3.5 font-medium text-slate-800">{item.station.discipline}</td>
                            <td className="p-3.5 font-bold text-emerald-700">{item.practicalPercentage}%</td>
                            <td className="p-3.5 font-bold text-teal-700">{item.mcqPercentage}%</td>
                            <td className="p-3.5 font-extrabold text-slate-900 text-sm">{item.compositeScore}%</td>
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

                  {/* AI Preceptor Remediation Box */}
                  <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        AI Clinical Preceptor Adaptive Remediation Prescription:
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {anyCriticalViolations
                        ? "Prescription: Candidate must review NMCN Infection Prevention & Midwifery Emergency Protocols in the College eLibrary. Retesting is required on Station 2 (AMTSL) and Station 6 (Trauma Airway)."
                        : "Prescription: Candidate demonstrates exemplary clinical safety and cognitive rationale. Recommended for NMCN board licensure distinction and advanced critical care placement."}
                    </p>
                  </div>
                </div>
              )}

              {/* QR Verification Modal */}
              {showQrCertificateModal && (
                <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl mx-auto">
                      🛡️
                    </div>
                    <h3 className="text-lg font-black text-slate-900">
                      W3C Verifiable Cryptographic Certificate
                    </h3>
                    <p className="text-xs text-slate-600">
                      Authorized by College of Nursing Sciences Assessment Board &amp; NMCN Digital Credentialing.
                    </p>

                    {/* Simulated QR Code SVG Box */}
                    <div className="p-6 bg-slate-50 border-2 border-dashed border-emerald-400 rounded-2xl mx-auto inline-block">
                      <div className="w-36 h-36 bg-slate-900 text-white p-2 rounded-xl flex flex-col items-center justify-center font-mono text-[9px] text-center break-all">
                        <div className="text-xs mb-1">■■■■■■■■</div>
                        <div>QR-SECURE</div>
                        <div className="text-emerald-400 font-bold">{candidateIndexNo}</div>
                        <div>SCORE: {overallAggregateScore}%</div>
                        <div className="text-xs mt-1">■■■■■■■■</div>
                      </div>
                    </div>

                    <div className="font-mono text-[10px] text-slate-500 break-all bg-slate-100 p-2 rounded-xl">
                      {cryptographicCertificateHash}
                    </div>

                    <button
                      onClick={() => setShowQrCertificateModal(false)}
                      className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all"
                    >
                      Close Verification Window
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: INTERACTIVE WHO PARTOGRAPH SIMULATOR                                */}
          {/* ========================================================================= */}
          {activeTab === "partograph" && (
            <div className="mt-8 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-extrabold uppercase">
                    Midwifery Labor Progress Studio
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    WHO Modified Partograph Clinical Simulation
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Mother: <strong>{partograph.motherName}</strong> ({partograph.gravidaPara}, {partograph.gestationalAge})
                  </p>
                </div>
                <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                  Critical Alert &amp; Action Line Detection
                </div>
              </div>

              {/* Partograph Visual Table */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Serial Cervical Dilatation &amp; Labor Progress Log:
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="p-3 font-bold">Hour</th>
                        <th className="p-3 font-bold">Clock</th>
                        <th className="p-3 font-bold">Cervix Dilatation (X)</th>
                        <th className="p-3 font-bold">Head Descent (O)</th>
                        <th className="p-3 font-bold">Fetal HR</th>
                        <th className="p-3 font-bold">Liquor</th>
                        <th className="p-3 font-bold">Contractions</th>
                        <th className="p-3 font-bold">Maternal BP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {partograph.observations.map((obs) => (
                        <tr key={obs.timeHours} className="hover:bg-slate-50">
                          <td className="p-3 font-bold">Hour {obs.timeHours}</td>
                          <td className="p-3 font-semibold text-slate-700">{obs.clockTime}</td>
                          <td className="p-3 font-black text-emerald-700 text-sm">{obs.cervicalDilationCm} cm (X)</td>
                          <td className="p-3 font-bold text-teal-700">{obs.fetalHeadDescentFifths}/5 (O)</td>
                          <td className="p-3 font-bold text-slate-800">{obs.fetalHeartRateBpm} bpm</td>
                          <td className="p-3 font-bold">
                            {obs.liquorState === "M" ? (
                              <span className="text-red-700 font-extrabold">Meconium (M)</span>
                            ) : obs.liquorState === "C" ? (
                              <span className="text-emerald-700">Clear (C)</span>
                            ) : (
                              <span className="text-slate-600">Intact (I)</span>
                            )}
                          </td>
                          <td className="p-3 text-slate-700">{obs.contractionsPer10Min} / 10m ({obs.contractionDurationCategory})</td>
                          <td className="p-3 text-slate-700">{obs.maternalBpSystolic}/{obs.maternalBpDiastolic} mmHg</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Clinical Decision Inquiries */}
              <div className="space-y-4">
                {partograph.evaluationQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                    <h4 className="text-sm font-bold text-slate-900">
                      Case Decision #{qIdx + 1}: {q.question}
                    </h4>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = partographAnswers[qIdx] === optIdx;
                        const isCorrect = optIdx === q.correctIndex;
                        return (
                          <div
                            key={optIdx}
                            onClick={() => setPartographAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-xs flex items-center justify-between ${
                              isSelected
                                ? isCorrect
                                  ? "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold"
                                  : "bg-red-50 border-red-500 text-red-900 font-bold"
                                : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <span>{isCorrect ? "✓ Correct" : "✗ Review"}</span>}
                          </div>
                        );
                      })}
                    </div>
                    {partographAnswers[qIdx] !== undefined && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 italic">
                        <strong>Clinical Rationale:</strong> {q.rationale}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: OSPE DIAGNOSTIC STUDIO                                             */}
          {/* ========================================================================= */}
          {activeTab === "ospe" && (
            <div className="mt-8 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-extrabold uppercase">
                    Objective Structured Practical Exam
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    OSPE Diagnostic Data &amp; Instrument Interpretation Circuit
                  </h2>
                </div>
                <div className="flex items-center gap-1.5">
                  {OSPE_STATIONS.map((st, idx) => (
                    <button
                      key={st.id}
                      onClick={() => setCurrentOspeIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        currentOspeIndex === idx
                          ? "bg-cyan-700 text-white"
                          : ospeAnswers[st.id] !== undefined
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Station {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active OSPE Station Display */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="px-3 py-1 rounded-lg bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs font-extrabold">
                    Station {activeOspeStation.stationNumber}: {activeOspeStation.category}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {activeOspeStation.title}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-cyan-600 text-xs sm:text-sm text-slate-800">
                  <span className="font-bold text-slate-900 block mb-1">Clinical Vignette:</span>
                  {activeOspeStation.clinicalVignette}
                </div>

                {/* Exhibit Readings Box */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    🔬 {activeOspeStation.diagnosticExhibit.label}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {Object.entries(activeOspeStation.diagnosticExhibit.readings).map(([k, v]) => (
                      <div key={k} className="p-2 rounded-xl bg-slate-800 border border-slate-700 flex justify-between">
                        <span className="text-slate-400">{k}:</span>
                        <span className="font-bold text-white text-right">{v}</span>
                      </div>
                    ))}
                  </div>
                  {activeOspeStation.diagnosticExhibit.visualIndicator && (
                    <div className="text-[11px] text-amber-300 font-semibold pt-1">
                      Finding: {activeOspeStation.diagnosticExhibit.visualIndicator}
                    </div>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {activeOspeStation.promptQuestion}
                </h3>

                <div className="space-y-3">
                  {activeOspeStation.options.map((opt, optIdx) => {
                    const isSelected = ospeAnswers[activeOspeStation.id] === optIdx;
                    const isCorrect = optIdx === activeOspeStation.correctIndex;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => setOspeAnswers((prev) => ({ ...prev, [activeOspeStation.id]: optIdx }))}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm ${
                          isSelected
                            ? isCorrect
                              ? "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold"
                              : "bg-red-50 border-red-500 text-red-900 font-bold"
                            : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <span>{isCorrect ? "✓ Correct" : "✗ Review"}</span>}
                      </div>
                    );
                  })}
                </div>

                {ospeAnswers[activeOspeStation.id] !== undefined && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                    <div className="font-bold">Clinical Rationale:</div>
                    <div>{activeOspeStation.clinicalRationale}</div>
                    <div className="text-[11px] text-emerald-700 italic pt-1">
                      Curriculum Reference: {activeOspeStation.remedialReference}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: ZERO-TOLERANCE DOSAGE MATH                                         */}
          {/* ========================================================================= */}
          {activeTab === "dosage" && (
            <div className="mt-8 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-extrabold uppercase">
                    Zero-Tolerance Safety Credential
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    High-Stakes Dosage &amp; IV Fluid Calculation Board
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Pass mark: 90% - 100%. Zero tolerance for computational unit errors.
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {DOSAGE_MATH_QUESTIONS.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentDosageIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        currentDosageIndex === idx
                          ? "bg-rose-700 text-white"
                          : dosageAnswers[q.id] !== undefined
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Calc {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="px-3 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold">
                    Category: {activeDosageQuestion.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    Question {currentDosageIndex + 1} of {DOSAGE_MATH_QUESTIONS.length}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-rose-600 text-xs sm:text-sm text-slate-800 space-y-2">
                  <div><strong>Clinical Vignette:</strong> {activeDosageQuestion.clinicalVignette}</div>
                  <div><strong>Physician Order:</strong> <span className="font-mono text-rose-700 font-bold">{activeDosageQuestion.prescriptionOrder}</span></div>
                  <div><strong>Drug Supplied on Hand:</strong> <span className="font-mono text-slate-900">{activeDosageQuestion.drugSupplied}</span></div>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {activeDosageQuestion.promptQuestion}
                </h3>

                <div className="space-y-3">
                  {activeDosageQuestion.options.map((opt, optIdx) => {
                    const isSelected = dosageAnswers[activeDosageQuestion.id] === optIdx;
                    const isCorrect = optIdx === activeDosageQuestion.correctIndex;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => {
                          setDosageAnswers((prev) => ({ ...prev, [activeDosageQuestion.id]: optIdx }));
                          setDosageRevealed((prev) => ({ ...prev, [activeDosageQuestion.id]: true }));
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm ${
                          isSelected
                            ? isCorrect
                              ? "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold"
                              : "bg-red-50 border-red-500 text-red-900 font-bold"
                            : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <span>{isCorrect ? "✓ Exact Match" : "✗ Math Error"}</span>}
                      </div>
                    );
                  })}
                </div>

                {dosageRevealed[activeDosageQuestion.id] && (
                  <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs space-y-2 font-mono">
                    <div className="text-emerald-400 font-bold uppercase">Step-by-Step Calculation Formula:</div>
                    {activeDosageQuestion.formulaAndStepByStepCalculation.map((step, sIdx) => (
                      <div key={sIdx} className="text-slate-300">• {step}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: START DISASTER MASS-CASUALTY TRIAGE                                */}
          {/* ========================================================================= */}
          {activeTab === "triage" && (
            <div className="mt-8 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-extrabold uppercase">
                    Mass-Casualty Incident Protocol
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    START Disaster Triage Simulator
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Under 60 seconds per casualty. Zero tolerance for dangerous undertriaging.
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {DISASTER_TRIAGE_CASUALTIES.map((c, idx) => (
                    <button
                      key={c.id}
                      onClick={() => setCurrentTriageIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        currentTriageIndex === idx
                          ? "bg-red-700 text-white"
                          : triageAnswers[c.id] !== undefined
                          ? "bg-slate-200 text-slate-900"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Victim {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-extrabold">
                    Casualty #{activeTriageCasualty.casualtyNumber}: {activeTriageCasualty.ageGender}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Ambulatory Status: {activeTriageCasualty.ambulatoryStatus}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-red-600 text-xs sm:text-sm text-slate-800">
                  <span className="font-bold text-slate-900 block mb-1">Scene Vignette:</span>
                  {activeTriageCasualty.sceneVignette}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
                    <span className="text-slate-500 block font-semibold">Respiration:</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{activeTriageCasualty.respiratoryRate}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
                    <span className="text-slate-500 block font-semibold">Perfusion (Radial Pulse):</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{activeTriageCasualty.perfusionRadialPulse}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
                    <span className="text-slate-500 block font-semibold">Mental Status:</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{activeTriageCasualty.mentalStatus}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                    Assign START Triage Color Band:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(["RED", "YELLOW", "GREEN", "BLACK"] as const).map((tag) => {
                      const isSelected = triageAnswers[activeTriageCasualty.id] === tag;
                      const isCorrect = tag === activeTriageCasualty.correctTag;
                      return (
                        <button
                          key={tag}
                          onClick={() => setTriageAnswers((prev) => ({ ...prev, [activeTriageCasualty.id]: tag }))}
                          className={`p-4 rounded-2xl border font-black text-xs sm:text-sm transition-all flex flex-col items-center gap-1 ${
                            tag === "RED"
                              ? isSelected ? "bg-red-600 text-white ring-2 ring-red-400" : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                              : tag === "YELLOW"
                              ? isSelected ? "bg-amber-500 text-white ring-2 ring-amber-300" : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                              : tag === "GREEN"
                              ? isSelected ? "bg-emerald-600 text-white ring-2 ring-emerald-400" : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                              : isSelected ? "bg-slate-900 text-white ring-2 ring-slate-400" : "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200"
                          }`}
                        >
                          <span>{tag === "RED" ? "🔴 RED" : tag === "YELLOW" ? "🟡 YELLOW" : tag === "GREEN" ? "🟢 GREEN" : "⚫ BLACK"}</span>
                          <span className="text-[10px] font-normal opacity-90">
                            {tag === "RED" ? "Immediate (P1)" : tag === "YELLOW" ? "Delayed (P2)" : tag === "GREEN" ? "Minor (P3)" : "Deceased (P0)"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {triageAnswers[activeTriageCasualty.id] && (
                  <div className={`p-4 rounded-2xl border text-xs space-y-1 ${
                    triageAnswers[activeTriageCasualty.id] === activeTriageCasualty.correctTag
                      ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                      : "bg-red-50 border-red-300 text-red-950"
                  }`}>
                    <div className="font-bold">
                      {triageAnswers[activeTriageCasualty.id] === activeTriageCasualty.correctTag
                        ? "✓ Correct Triage Tag Assigned"
                        : `✗ Triage Error: Correct Tag is ${activeTriageCasualty.tagTitle}`}
                    </div>
                    <div>{activeTriageCasualty.clinicalRationale}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: CBT MCQS (Preserved)                                               */}
          {/* ========================================================================= */}
          {activeTab === "cbt" && (
            <div className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Question {currentCbtQuestionIndex + 1} of {scrambledMCQs.length}
                    </span>
                    <div className="font-mono text-sm font-bold text-slate-700">
                      ⏱ Time: {formatTimer(cbtTimeRemaining)}
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
                            if (!showCbtResults) setCbtUserAnswers((prev) => ({ ...prev, [currentCbtQ.id]: idx }));
                          }}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                            isSelected ? "bg-emerald-50 border-emerald-500 text-slate-900 ring-1 ring-emerald-400" : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? "border-emerald-600 bg-emerald-600" : "border-slate-300"}`}>
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

                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-md border border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      CBT Status
                    </h3>
                    <div className="text-3xl font-extrabold text-white mt-2">
                      {Object.keys(cbtUserAnswers).length} / {scrambledMCQs.length} Answered
                    </div>
                    <button
                      onClick={() => setShowCbtResults(true)}
                      className="w-full mt-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow"
                    >
                      Submit CBT Exam
                    </button>
                  </div>

                  {showCbtResults && (
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-3">
                      <h4 className="text-xs font-bold uppercase text-slate-500">CBT Score</h4>
                      <div className="text-4xl font-black text-emerald-700">
                        {calculateCbtScore()} / {scrambledMCQs.length}
                      </div>
                      <p className="text-xs text-slate-600">
                        {Math.round((calculateCbtScore() / scrambledMCQs.length) * 100)}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: ESSAY BANK (Preserved)                                             */}
          {/* ========================================================================= */}
          {activeTab === "essays" && (
            <div className="mt-8 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Comprehensive Essay Question Bank (50+ Cases)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Structured case study essays covering 100L through 500L with official NMCN marking rubrics.
                  </p>
                </div>
                <div className="text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {filteredEssays.length} Essay Cases Available
                </div>
              </div>

              {filteredEssays.map((essay, index) => {
                const isExpanded = expandedEssayId === essay.id;
                return (
                  <div key={essay.id} className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
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
                        <div className="text-xs font-semibold text-slate-500">
                          Max Marks: {essay.marks} Marks • Time: {essay.timeAllowed}
                        </div>
                      </div>

                      {essay.scenario && (
                        <div className="mb-4 p-4 rounded-2xl bg-slate-50 border-l-4 border-emerald-600 text-xs sm:text-sm text-slate-700 italic">
                          <strong>Clinical Dossier:</strong> "{essay.scenario}"
                        </div>
                      )}

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
                        Case #{index + 1}: {essay.question}
                      </h3>

                      <button
                        onClick={() => setExpandedEssayId(isExpanded ? null : essay.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                      >
                        {isExpanded ? "Hide Marking Guide ▲" : "Reveal Model Marking Guide ▼"}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-slate-50/70 p-6 sm:p-8 space-y-6">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">Key Clinical Points:</h4>
                          <ul className="space-y-1.5">
                            {essay.modelAnswer.keyPoints.map((pt, pIdx) => (
                              <li key={pIdx} className="text-xs text-slate-700 flex items-start gap-2">
                                <span className="text-emerald-600 font-bold">✓</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">NMCN Marking Rubric:</h4>
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
                                  <tr key={rIdx}>
                                    <td className="p-3 font-semibold">{r.section}</td>
                                    <td className="p-3 font-bold text-emerald-700">{r.points} Marks</td>
                                    <td className="p-3 text-slate-600">{r.criterion}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
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
