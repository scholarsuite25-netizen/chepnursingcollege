"use client";

import React, { useEffect, useState, useCallback } from "react";

export interface OfflineOutboxItem {
  id: string;
  type: "exam_result" | "clinical_reflection" | "admission_draft";
  title: string;
  timestamp: string;
  payload: any;
}

export default function PwaNotificationManager() {
  const [, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [outbox, setOutbox] = useState<OfflineOutboxItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [alertHistory, setAlertHistory] = useState<Array<{ id: string; title: string; time: string; type: string }>>([
    {
      id: "a1",
      title: "NMCN CAOSCE Examination Station Schedule Active",
      time: "Just now",
      type: "exam",
    },
    {
      id: "a2",
      title: "2026/2027 Basic Nursing Admissions Batch A Open",
      time: "Today",
      type: "admission",
    },
  ]);

  // Web Audio Hospital Chime Synthesizer
  const playHospitalChime = useCallback((type: "bell" | "emergency" | "normal" = "normal") => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === "bell") {
        const freqs = [880, 1174.66];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
          gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.15);
          osc.stop(ctx.currentTime + idx * 0.15 + 1.2);
        });
      } else if (type === "emergency") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(750, ctx.currentTime);
        osc.frequency.setValueAtTime(950, ctx.currentTime + 0.15);
        osc.frequency.setValueAtTime(750, ctx.currentTime + 0.3);
        osc.frequency.setValueAtTime(950, ctx.currentTime + 0.45);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.8);
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.0);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }, []);

  const sendNotification = useCallback((
    title: string,
    body: string,
    url: string = "/",
    chimeType: "bell" | "emergency" | "normal" = "normal"
  ) => {
    playHospitalChime(chimeType);

    setAlertHistory((prev) => [
      {
        id: "alert-" + Date.now(),
        title,
        time: "Just now",
        type: chimeType,
      },
      ...prev.slice(0, 7),
    ]);

    if (!("Notification" in window) || Notification.permission !== "granted") {
      return;
    }

    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification(title, {
          body,
          icon: "/images/chep/chep_logo.png",
          badge: "/images/chep/chep_logo.png",
          data: { url },
          tag: "chep-" + Date.now(),
        } as any);
      });
    } else {
      new Notification(title, {
        body,
        icon: "/images/chep/chep_logo.png",
      });
    }
  }, [playHospitalChime]);

  // Offline Auto-Sync Functionality
  const triggerAutoSync = useCallback(async () => {
    if (!navigator.onLine) {
      alert("Cannot synchronize: You are currently offline. Connect to internet first.");
      return;
    }

    const currentOutbox: OfflineOutboxItem[] = JSON.parse(
      localStorage.getItem("chep_offline_outbox") || "[]"
    );

    if (currentOutbox.length === 0) {
      return;
    }

    setIsSyncing(true);
    await new Promise((r) => setTimeout(r, 1200));

    localStorage.removeItem("chep_offline_outbox");
    setOutbox([]);
    setIsSyncing(false);

    sendNotification(
      "✓ Cloud Synchronization Successful",
      `Synchronized ${currentOutbox.length} offline record(s) to central institutional cloud registry.`,
      "/exams",
      "normal"
    );
  }, [sendNotification]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const supported = "serviceWorker" in navigator && "Notification" in window;
      setIsSupported(supported);
      setIsOnline(navigator.onLine);

      if ("Notification" in window) {
        setPermission(Notification.permission);
      }

      // Load offline outbox
      try {
        const stored = localStorage.getItem("chep_offline_outbox");
        if (stored) setOutbox(JSON.parse(stored));
      } catch {
        // Fallback
      }

      // Register Service Worker
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("[CHEP PWA] Service Worker registered:", reg.scope);
          })
          .catch((err) => {
            console.warn("[CHEP PWA] Service Worker registration failed:", err);
          });
      }

      // Check if already in standalone display mode
      if (
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true
      ) {
        setIsInstalled(true);
      }

      // Listen for PWA Install Prompt
      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setInstallPrompt(e);
      };

      // Connectivity Listeners
      const handleOnline = () => {
        setIsOnline(true);
        sendNotification(
          "🟢 Internet Connection Restored",
          "Collegiate cloud connection active. Draining offline outbox and synchronizing data...",
          "/exams",
          "normal"
        );
        triggerAutoSync();
      };

      const handleOffline = () => {
        setIsOnline(false);
        sendNotification(
          "🟠 Offline Mode Active",
          "Network disconnected. All CAOSCE simulations, waveforms, and clinical reflections will be securely saved locally.",
          "/exams",
          "emergency"
        );
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstall);
      window.addEventListener("appinstalled", () => {
        setIsInstalled(true);
        setInstallPrompt(null);
      });
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, [sendNotification, triggerAutoSync]);

  // Add dummy item to outbox for testing
  const addTestOfflineItem = () => {
    const newItem: OfflineOutboxItem = {
      id: "outbox-" + Date.now(),
      type: "exam_result",
      title: "CAOSCE 6-Station Completed (Local Draft)",
      timestamp: new Date().toLocaleTimeString(),
      payload: { score: 92, candidate: "Nurse Candidate (Offline)" },
    };
    const updated = [newItem, ...outbox];
    setOutbox(updated);
    localStorage.setItem("chep_offline_outbox", JSON.stringify(updated));
    sendNotification(
      "💾 Saved to Local Outbox",
      "Offline record queued. Will automatically sync when internet reconnects.",
      "/exams",
      "normal"
    );
  };

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
      return;
    }

    try {
      const res = await Notification.requestPermission();
      setPermission(res);
      if (res === "granted") {
        playHospitalChime("normal");
        sendNotification(
          "Notifications Enabled • CHEP College",
          "You are now subscribed to real-time CAOSCE exam rotation bells, Code Blue alerts, and academic dispatches.",
          "/exams",
          "normal"
        );
      }
    } catch (err) {
      console.error("Failed to request permission:", err);
    }
  };

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setInstallPrompt(null);
    }
  };

  return (
    <>
      {/* Bottom-Left Floating Hub Button & PWA Install Banner */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
        {/* PWA Install Banner (If eligible on Android / Desktop Chrome / Edge) */}
        {installPrompt && !isInstalled && (
          <div className="bg-slate-900/95 text-white border border-emerald-500/40 shadow-2xl rounded-2xl p-3 max-w-xs backdrop-blur-md animate-fade-in flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-700/60 flex items-center justify-center text-emerald-300 shrink-0">
                <span className="material-symbols-outlined text-[18px]">install_mobile</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-white">Install CHEP App</p>
                <p className="text-[11px] text-emerald-200/80">Offline CAOSCE &amp; Fast Launch</p>
              </div>
            </div>
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-md cursor-pointer shrink-0"
            >
              Install
            </button>
          </div>
        )}

        {/* Floating Bell Trigger Button with Real-time Online/Offline indicator */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Institutional Notifications Hub"
          className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-950 text-white border border-emerald-500/40 shadow-xl backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[20px] text-emerald-400 group-hover:rotate-12 transition-transform">
              wifi_sync
            </span>
            <span
              className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${
                isOnline ? "bg-emerald-500 animate-ping" : "bg-amber-500"
              }`}
            ></span>
            <span
              className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${
                isOnline ? "bg-emerald-500" : "bg-amber-500"
              }`}
            ></span>
          </div>

          <span className="text-xs font-bold hidden sm:inline text-slate-200">
            CHEP Hub
          </span>

          <span
            className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
              isOnline
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>

          {outbox.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-black">
              {outbox.length}
            </span>
          )}
        </button>
      </div>

      {/* Offline-First & Alert Center Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-end sm:items-center justify-start p-4 sm:p-6">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-5 flex items-center justify-between border-b border-emerald-800/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                  <span className="material-symbols-outlined text-[22px]">cloud_sync</span>
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Offline-First &amp; Cloud Hub</h3>
                  <p className="text-[11px] text-emerald-200/80">PWA, Push &amp; Auto-Sync Engine</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Connectivity & Outbox Sync Status Card */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isOnline ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                  }`}
                ></span>
                <div>
                  <span className="text-xs font-black text-slate-800 block">
                    {isOnline ? "Connected to Cloud" : "Working Offline"}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {isOnline
                      ? "Automatic background sync active"
                      : "Local storage outbox active"}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-slate-900 block font-mono">
                  {outbox.length} pending
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  Outbox Queue
                </span>
              </div>
            </div>

            {/* Sync Action Buttons */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-2">
              <button
                onClick={triggerAutoSync}
                disabled={isSyncing || outbox.length === 0}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className={`material-symbols-outlined text-[16px] ${isSyncing ? "animate-spin" : ""}`}>
                  sync
                </span>
                <span>{isSyncing ? "Syncing..." : "Sync Outbox to Cloud"}</span>
              </button>

              <button
                onClick={addTestOfflineItem}
                title="Add simulated offline exam result to outbox"
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                + Test Queue
              </button>
            </div>

            {/* Notification Permission Card */}
            <div className="p-4 border-b border-slate-100 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Push Notifications:</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    permission === "granted"
                      ? "bg-emerald-100 text-emerald-800"
                      : permission === "denied"
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {permission === "granted"
                    ? "Subscribed ✓"
                    : permission === "denied"
                    ? "Blocked ✕"
                    : "Not Enabled"}
                </span>
              </div>

              {permission !== "granted" ? (
                <button
                  onClick={requestNotificationPermission}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">add_alert</span>
                  <span>Enable Push Notifications</span>
                </button>
              ) : (
                <p className="text-[11px] text-emerald-900 bg-emerald-50 p-2 rounded-xl border border-emerald-200/80 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-emerald-700">check_circle</span>
                  <span>Browser notifications active for CAOSCE timers and reconnect alerts.</span>
                </p>
              )}
            </div>

            {/* Live Interactive Notification Simulation Triggers */}
            <div className="p-4 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Instant Sound &amp; Push Triggers
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    sendNotification(
                      "🔔 CAOSCE 10-Minute Warning",
                      "Station 1 Time Complete. Rotate immediately to Station 2!",
                      "/exams",
                      "bell"
                    )
                  }
                  className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer group"
                >
                  <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                    Station Bell
                  </p>
                  <p className="text-[10px] text-slate-500">10-min CAOSCE chime</p>
                </button>

                <button
                  onClick={() =>
                    sendNotification(
                      "🚨 Emergency Code Blue",
                      "Acute Post-Thyroidectomy Stridor in Bed 4. Immediate response!",
                      "/clinical-reflections",
                      "emergency"
                    )
                  }
                  className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 transition-all cursor-pointer group"
                >
                  <p className="text-xs font-bold text-slate-900 group-hover:text-red-800">
                    Trauma Drill
                  </p>
                  <p className="text-[10px] text-slate-500">Hospital warble alert</p>
                </button>
              </div>
            </div>

            {/* In-App Dispatch Stream */}
            <div className="p-4 pt-0">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Recent Institutional Log
              </h4>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {alertHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-slate-700 truncate pr-2 text-[11px]">{item.title}</span>
                    <span className="text-[9px] text-slate-400 shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
