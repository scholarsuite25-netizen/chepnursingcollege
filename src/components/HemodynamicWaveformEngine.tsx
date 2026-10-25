"use client";

import React, { useEffect, useRef, useState } from "react";

export type CardiacRhythmType = "NSR" | "BRADYCARDIA" | "TACHYCARDIA" | "VTACH" | "VFIB" | "ASYSTOLE";

interface HemodynamicState {
  rhythm: CardiacRhythmType;
  hr: number;
  bpSystolic: number;
  bpDiastolic: number;
  spo2: number;
  temperature: number;
  label: string;
}

export default function HemodynamicWaveformEngine() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [activeInterventionNotice, setActiveInterventionNotice] = useState<string>("");

  const [hemo, setHemo] = useState<HemodynamicState>({
    rhythm: "BRADYCARDIA",
    hr: 42,
    bpSystolic: 84,
    bpDiastolic: 52,
    spo2: 92,
    temperature: 36.8,
    label: "Symptomatic Sinus Bradycardia with Hypoperfusion",
  });

  const stateRef = useRef<HemodynamicState>(hemo);
  useEffect(() => {
    stateRef.current = hemo;
  }, [hemo]);

  // Audio Context for Beep
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playCardiacBeep = (freq: number = 880) => {
    if (!audioEnabled || typeof window === "undefined") return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // AudioContext unavailable
    }
  };

  // 60FPS Canvas Waveform Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let sweepX = 0;
    const sweepSpeed = 2.2;
    const width = canvas.width;
    const height = canvas.height;

    // ECG wave parameters
    let beatPhase = 0; // 0 to 1 cycle
    let lastBeatTimestamp = performance.now();

    const render = (now: number) => {
      const currentState = stateRef.current;
      const beatIntervalMs = (60 / Math.max(20, currentState.hr)) * 1000;

      // Check if new beat starts
      if (now - lastBeatTimestamp >= beatIntervalMs && currentState.rhythm !== "VFIB" && currentState.rhythm !== "ASYSTOLE") {
        lastBeatTimestamp = now;
        beatPhase = 0;
        // Pitch shifts with SpO2: 98% = 880Hz, 85% = 550Hz
        const beepFreq = 400 + (currentState.spo2 - 70) * 16;
        playCardiacBeep(Math.max(400, Math.min(1000, beepFreq)));
      } else {
        beatPhase = (now - lastBeatTimestamp) / beatIntervalMs;
      }

      // Calculate instantaneous voltage for Lead II ECG
      let ecgY = height * 0.32;
      const p = beatPhase;

      if (currentState.rhythm === "ASYSTOLE") {
        ecgY = height * 0.32 + (Math.random() - 0.5) * 1.5;
      } else if (currentState.rhythm === "VFIB") {
        ecgY = height * 0.32 + Math.sin(now * 0.02) * 22 + Math.sin(now * 0.045) * 15 + (Math.random() - 0.5) * 8;
      } else if (currentState.rhythm === "VTACH") {
        ecgY = height * 0.32 + Math.sin(p * Math.PI * 2) * 35;
      } else {
        // P-QRS-T complex synthesis
        if (p >= 0.12 && p <= 0.20) {
          // P Wave
          const pSub = (p - 0.16) / 0.04;
          ecgY -= Math.exp(-pSub * pSub * 4) * 8;
        } else if (p > 0.22 && p < 0.25) {
          // Q Dip
          ecgY += 5;
        } else if (p >= 0.25 && p <= 0.31) {
          // R Spike
          const rSub = (p - 0.28) / 0.03;
          ecgY -= Math.exp(-rSub * rSub * 12) * 48;
        } else if (p > 0.31 && p < 0.34) {
          // S Dip
          ecgY += 12;
        } else if (p >= 0.40 && p <= 0.55) {
          // T Wave
          const tSub = (p - 0.47) / 0.075;
          ecgY -= Math.exp(-tSub * tSub * 4) * 14;
        }
      }

      // Calculate ABP Arterial Waveform (Height 0.65)
      let abpY = height * 0.68;
      if (currentState.rhythm === "VFIB" || currentState.rhythm === "ASYSTOLE") {
        abpY = height * 0.68;
      } else {
        if (p >= 0.28 && p <= 0.65) {
          const abpSub = (p - 0.38) / 0.12;
          const pulseHeight = (currentState.bpSystolic - currentState.bpDiastolic) * 0.5;
          abpY -= Math.exp(-abpSub * abpSub * 3.5) * pulseHeight;
          if (p >= 0.46 && p <= 0.52) {
            abpY += 3; // Dicrotic notch
          }
        }
      }

      // Calculate SpO2 Plethysmograph (Height 0.88)
      let plethY = height * 0.90;
      if (currentState.rhythm === "VFIB" || currentState.rhythm === "ASYSTOLE") {
        plethY = height * 0.90;
      } else {
        if (p >= 0.35 && p <= 0.75) {
          const plethSub = (p - 0.50) / 0.16;
          plethY -= Math.exp(-plethSub * plethSub * 3.0) * 16 * (currentState.spo2 / 100);
        }
      }

      // Clear leading edge ahead of sweep
      ctx.fillStyle = "#020617"; // Dark slate
      ctx.fillRect(sweepX, 0, 16, height);

      // Draw Grid Lines (Hospital Monitor Cathode Grid)
      ctx.strokeStyle = "rgba(16, 185, 129, 0.08)";
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(sweepX, y);
        ctx.lineTo(sweepX + sweepSpeed, y);
        ctx.stroke();
      }

      // Draw ECG Waveform (Green Phosphor)
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2.2;
      ctx.shadowColor = "#34d399";
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.moveTo(sweepX, ecgY);
      ctx.lineTo(sweepX + sweepSpeed, ecgY);
      ctx.stroke();

      // Draw ABP Waveform (Red/Amber)
      ctx.strokeStyle = "#f43f5e";
      ctx.lineWidth = 1.8;
      ctx.shadowColor = "#fb7185";
      ctx.shadowBlur = 3;
      ctx.beginPath();
      ctx.moveTo(sweepX, abpY);
      ctx.lineTo(sweepX + sweepSpeed, abpY);
      ctx.stroke();

      // Draw Pleth Waveform (Cyan)
      ctx.strokeStyle = "#06b6d4";
      ctx.lineWidth = 1.6;
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 3;
      ctx.beginPath();
      ctx.moveTo(sweepX, plethY);
      ctx.lineTo(sweepX + sweepSpeed, plethY);
      ctx.stroke();

      // Reset Shadow
      ctx.shadowBlur = 0;

      sweepX += sweepSpeed;
      if (sweepX >= width) {
        sweepX = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [audioEnabled]);

  // Clinical Interventions Logic
  const handleAtropine = () => {
    setActiveInterventionNotice("💉 Administered Atropine 1mg IV Push: Vagolytic effect accelerating SA nodal discharge.");
    setHemo({
      rhythm: "NSR",
      hr: 88,
      bpSystolic: 124,
      bpDiastolic: 78,
      spo2: 98,
      temperature: 36.8,
      label: "Normal Sinus Rhythm Restored (Hemodynamically Stable)",
    });
  };

  const handleAdenosine = () => {
    setActiveInterventionNotice("💉 Administered Adenosine 6mg Rapid IV Bolus: Transient AV nodal conduction block.");
    setHemo({
      rhythm: "ASYSTOLE",
      hr: 0,
      bpSystolic: 60,
      bpDiastolic: 40,
      spo2: 88,
      temperature: 36.8,
      label: "Transient AV Block / Chemical Cardioversion Pause...",
    });

    setTimeout(() => {
      setHemo({
        rhythm: "NSR",
        hr: 76,
        bpSystolic: 118,
        bpDiastolic: 76,
        spo2: 99,
        temperature: 36.8,
        label: "Normal Sinus Rhythm Successfully Re-Established",
      });
      setActiveInterventionNotice("✓ Chemical Cardioversion Successful: Re-entry SVT terminated.");
    }, 2400);
  };

  const handleDefibrillation = () => {
    setActiveInterventionNotice("⚡ 200J Biphasic Shock Delivered: Myocardial cellular depolarization.");
    setHemo({
      rhythm: "NSR",
      hr: 92,
      bpSystolic: 110,
      bpDiastolic: 70,
      spo2: 96,
      temperature: 36.8,
      label: "Post-Cardiac Arrest Return of Spontaneous Circulation (ROSC)",
    });
  };

  const handleSalineBolus = () => {
    setActiveInterventionNotice("💧 Infused 500 mL 0.9% Normal Saline: Intravascular volume expansion.");
    setHemo((prev) => ({
      ...prev,
      bpSystolic: Math.min(140, prev.bpSystolic + 16),
      bpDiastolic: Math.min(90, prev.bpDiastolic + 10),
      spo2: Math.min(100, prev.spo2 + 2),
    }));
  };

  const triggerVFib = () => {
    setActiveInterventionNotice("⚠️ Sudden Cardiac Collapse: Ventricular Fibrillation (Pulseless Arrest)!");
    setHemo({
      rhythm: "VFIB",
      hr: 0,
      bpSystolic: 0,
      bpDiastolic: 0,
      spo2: 60,
      temperature: 36.5,
      label: "Ventricular Fibrillation • ZERO Cardiac Output • START CPR & DEFIB STAT",
    });
  };

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-6 border-2 border-emerald-500/30 shadow-2xl space-y-5">
      {/* Monitor Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-900/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono font-black text-emerald-400 uppercase tracking-widest">
              Intensive Care Vector Telemetry • 60 FPS Sweep Engine
            </span>
          </div>
          <h3 className="text-lg font-black text-white mt-1">{hemo.label}</h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              audioEnabled
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
            }`}
          >
            <span>{audioEnabled ? "🔊 O2 Beep Active" : "🔇 Audio Muted"}</span>
          </button>
        </div>
      </div>

      {/* Monitor Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Oscilloscope Canvas */}
        <div className="lg:col-span-9 bg-slate-950 rounded-2xl border border-emerald-900/50 p-2 overflow-hidden shadow-inner relative">
          <canvas
            ref={canvasRef}
            width={720}
            height={260}
            className="w-full h-auto block rounded-xl bg-slate-950"
          />
          <div className="absolute top-3 left-4 text-[10px] font-mono text-emerald-400/80 font-bold">
            LEAD II • ECG (mV) 1.0 cm/mV
          </div>
          <div className="absolute top-[48%] left-4 text-[10px] font-mono text-rose-400/80 font-bold">
            ART LINE (mmHg) • SCALE 0-200
          </div>
          <div className="absolute bottom-3 left-4 text-[10px] font-mono text-cyan-400/80 font-bold">
            PLETH • SpO2 %
          </div>
        </div>

        {/* Real-Time Digital Vitals Box */}
        <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-2.5">
          {/* HR */}
          <div className="bg-slate-900/90 p-3 rounded-2xl border border-emerald-500/40 text-emerald-400">
            <span className="text-[10px] uppercase font-bold tracking-wider block">Heart Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black font-mono">{hemo.hr}</span>
              <span className="text-xs font-normal opacity-80">BPM</span>
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="bg-slate-900/90 p-3 rounded-2xl border border-rose-500/40 text-rose-400">
            <span className="text-[10px] uppercase font-bold tracking-wider block">Arterial BP</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-mono">
                {hemo.bpSystolic}/{hemo.bpDiastolic}
              </span>
              <span className="text-xs font-normal opacity-80">mmHg</span>
            </div>
          </div>

          {/* SpO2 */}
          <div className="bg-slate-900/90 p-3 rounded-2xl border border-cyan-500/40 text-cyan-400">
            <span className="text-[10px] uppercase font-bold tracking-wider block">Pulse Oximetry</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black font-mono">{hemo.spo2}</span>
              <span className="text-xs font-normal opacity-80">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Intervention Notice Bar */}
      {activeInterventionNotice && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-600/50 text-xs font-mono text-emerald-200 animate-fadeIn">
          {activeInterventionNotice}
        </div>
      )}

      {/* Interactive Clinical Resuscitation Action Bar */}
      <div className="pt-2 border-t border-slate-800 space-y-2">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block">
          Bedside Nurse Interventions:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleAtropine}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition-all cursor-pointer shadow-sm"
          >
            💉 Push Atropine 1mg IV (Treat Bradycardia)
          </button>
          <button
            onClick={handleAdenosine}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all cursor-pointer shadow-sm"
          >
            💉 Push Adenosine 6mg IV (Treat SVT)
          </button>
          <button
            onClick={handleDefibrillation}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-600 text-white transition-all cursor-pointer shadow-sm"
          >
            ⚡ Deliver 200J Biphasic Shock (Defibrillate)
          </button>
          <button
            onClick={handleSalineBolus}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-600 text-white transition-all cursor-pointer shadow-sm"
          >
            💧 500 mL Saline Bolus (Raise BP)
          </button>
          <button
            onClick={triggerVFib}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer ml-auto"
          >
            Trigger Deterioration (VFib Arrest)
          </button>
        </div>
      </div>
    </div>
  );
}
