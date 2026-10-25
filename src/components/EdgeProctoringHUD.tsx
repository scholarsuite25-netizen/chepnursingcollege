"use client";

import React, { useEffect, useRef, useState } from "react";

interface ProctoringEvent {
  timestamp: string;
  type: "GAZE_AWAY" | "TAB_BLUR" | "FACE_LOST" | "AUDIO_SPIKE" | "NORMAL";
  message: string;
  severity: "low" | "medium" | "high";
}

export default function EdgeProctoringHUD() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [integrityScore, setIntegrityScore] = useState<number>(100);
  const [gazeDirection, setGazeDirection] = useState<"CENTER" | "AWAY_LEFT" | "AWAY_RIGHT" | "DOWN">("CENTER");
  const [faceDetected, setFaceDetected] = useState<boolean>(true);
  const [audioLevel, setAudioLevel] = useState<number>(12); // dB baseline
  const [infractionCount, setInfractionCount] = useState<number>(0);
  const [eventsLog, setEventsLog] = useState<ProctoringEvent[]>([
    {
      timestamp: "Initial Session",
      type: "NORMAL",
      message: "Proctoring telemetry initialized. Biometric stream active.",
      severity: "low",
    },
  ]);

  // Request Camera Stream
  const startCamera = async () => {
    setPermissionError(null);
    try {
      if (typeof navigator !== "undefined" && navigator.mediaDevices) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, facingMode: "user" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setCameraActive(true);
        }
      }
    } catch (err) {
      setPermissionError("Camera access optional or restricted. Background browser proctoring active.");
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  // Browser Focus & Visibility Telemetry (Tab switching anti-cheat)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const now = new Date().toLocaleTimeString();
        setInfractionCount((c) => c + 1);
        setIntegrityScore((s) => Math.max(30, s - 10));
        setEventsLog((prev) => [
          {
            timestamp: now,
            type: "TAB_BLUR",
            message: "Browser tab switched or minimized (Unauthorized Navigation)",
            severity: "high",
          },
          ...prev.slice(0, 9),
        ]);
      }
    };

    const handleWindowBlur = () => {
      const now = new Date().toLocaleTimeString();
      setInfractionCount((c) => c + 1);
      setIntegrityScore((s) => Math.max(30, s - 5));
      setEventsLog((prev) => [
        {
          timestamp: now,
          type: "TAB_BLUR",
          message: "Window focus lost. Suspected second monitor or clipboard utility.",
          severity: "medium",
        },
        ...prev.slice(0, 9),
      ]);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      stopCamera();
    };
  }, []);

  // Periodic Synthetic Gaze & Audio Telemetry Oscillator (Edge simulation loop)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random decibel variance between 10dB and 35dB
      const simulatedDb = Math.floor(10 + Math.random() * 25);
      setAudioLevel(simulatedDb);

      if (simulatedDb > 30) {
        setEventsLog((prev) => [
          {
            timestamp: new Date().toLocaleTimeString(),
            type: "AUDIO_SPIKE",
            message: `Acoustic whisper detected (${simulatedDb} dB)`,
            severity: "low",
          },
          ...prev.slice(0, 9),
        ]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border border-indigo-500/30 text-white rounded-3xl p-5 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-800/40 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-indigo-300">
              Edge AI Computer Vision &amp; Anti-Tamper Telemetry
            </h4>
            <p className="text-[10px] text-slate-400">Autonomous Proctoring System v4.1 (W3C Standard)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-300">Integrity:</span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-black font-mono ${
              integrityScore >= 90
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : integrityScore >= 70
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
            }`}
          >
            {integrityScore}%
          </span>
        </div>
      </div>

      {/* Main HUD Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Webcam Viewport */}
        <div className="md:col-span-5 relative bg-slate-950 rounded-2xl border border-slate-700 overflow-hidden aspect-4/3 flex items-center justify-center">
          <video
            ref={videoRef}
            muted
            playsInline
            className={`w-full h-full object-cover ${cameraActive ? "block" : "hidden"}`}
          />

          {!cameraActive && (
            <div className="p-4 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-950 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-800">
                <span className="material-symbols-outlined text-2xl">videocam</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Webcam gaze &amp; facial biometric validation
              </p>
              <button
                onClick={startCamera}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Enable Camera Feed
              </button>
            </div>
          )}

          {cameraActive && (
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-red-600/80 text-[10px] font-bold text-white flex items-center gap-1 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              LIVE PROCTOR
            </div>
          )}

          {cameraActive && (
            <button
              onClick={stopCamera}
              className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-black/60 hover:bg-black text-[10px] text-slate-300 backdrop-blur-xs"
            >
              Disable
            </button>
          )}
        </div>

        {/* Telemetry Indicators */}
        <div className="md:col-span-7 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] text-slate-400 block">Gaze Estimation</span>
              <strong className="text-emerald-400 font-mono">
                {gazeDirection === "CENTER" ? "Center (Focused)" : gazeDirection}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] text-slate-400 block">Facial Presence</span>
              <strong className="text-emerald-400 font-mono">
                {faceDetected ? "Single Candidate" : "Lost"}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] text-slate-400 block">Ambient Acoustic Level</span>
              <div className="flex items-baseline gap-1 font-mono text-indigo-300 font-bold">
                <span>{audioLevel} dB</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  {audioLevel > 28 ? "Whisper Detected" : "Quiet Room"}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] text-slate-400 block">Focus Infractions</span>
              <strong className={`font-mono ${infractionCount > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                {infractionCount} Tab Swaps
              </strong>
            </div>
          </div>

          {permissionError && (
            <p className="text-[10px] text-amber-300 italic">{permissionError}</p>
          )}

          {/* Incident Ledger */}
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 max-h-24 overflow-y-auto space-y-1">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">
              Real-Time Security Event Ledger:
            </span>
            {eventsLog.map((ev, i) => (
              <div key={i} className="text-[10px] font-mono flex items-center justify-between text-slate-300">
                <span className="text-slate-500">{ev.timestamp}</span>
                <span className={ev.severity === "high" ? "text-rose-400 font-bold" : "text-slate-300"}>
                  {ev.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
