/**
 * CHEP College of Nursing Sciences - WordPress PWA & Push Notification Hub
 * With Offline-First Architecture & Automatic Cloud Synchronization
 */

(function () {
  'use strict';

  let installPrompt = null;
  let isInstalled = false;
  let isOnline = navigator.onLine;
  let syncQueue = JSON.parse(localStorage.getItem('chep_wp_sync_queue') || '[]');
  let alertHistory = [
    {
      id: 'a1',
      title: 'NMCN CAOSCE Examination Station Schedule Active',
      time: 'Just now',
      type: 'exam',
    },
    {
      id: 'a2',
      title: '2026/2027 Basic Nursing Admissions Batch A Open',
      time: 'Today',
      type: 'admission',
    },
  ];

  // 1. Service Worker Registration
  if ('serviceWorker' in navigator) {
    const swUrl = (window.chep_pwa_object && window.chep_pwa_object.sw_url) || '/sw.js';
    navigator.serviceWorker
      .register(swUrl)
      .then(function (reg) {
        console.log('[CHEP WP PWA] Service worker registered:', reg.scope);
      })
      .catch(function (err) {
        console.warn('[CHEP WP PWA] Service worker registration note:', err);
      });
  }

  // 2. Check Display Mode
  if (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  ) {
    isInstalled = true;
  }

  // 3. Web Audio Hospital Chime Synthesizer
  function playHospitalChime(type) {
    type = type || 'normal';
    try {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      var ctx = new AudioCtx();

      if (type === 'bell') {
        var freqs = [880, 1174.66];
        freqs.forEach(function (freq, idx) {
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
          gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.15);
          osc.stop(ctx.currentTime + idx * 0.15 + 1.2);
        });
      } else if (type === 'emergency') {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sawtooth';
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
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.0);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // 4. Send Notification
  function sendNotification(title, body, url, chimeType) {
    chimeType = chimeType || 'normal';
    url = url || '/';
    playHospitalChime(chimeType);

    alertHistory.unshift({
      id: 'alert-' + Date.now(),
      title: title,
      time: 'Just now',
      type: chimeType,
    });
    if (alertHistory.length > 8) alertHistory.pop();
    updateHistoryUI();

    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    var iconUrl =
      (window.chep_pwa_object && window.chep_pwa_object.icon_url) ||
      '/wp-content/themes/chep-college-theme/assets/images/chep_logo.png';

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(function (reg) {
        reg.showNotification(title, {
          body: body,
          icon: iconUrl,
          badge: iconUrl,
          data: { url: url },
          tag: 'chep-' + Date.now(),
        });
      });
    } else {
      new Notification(title, {
        body: body,
        icon: iconUrl,
      });
    }
  }

  window.chepSendNotification = sendNotification;

  // 5. Offline Outbox & Auto-Sync Engine
  function queueOfflineResult(payload) {
    syncQueue.push({
      id: 'sync-' + Date.now(),
      timestamp: new Date().toISOString(),
      payload: payload,
    });
    localStorage.setItem('chep_wp_sync_queue', JSON.stringify(syncQueue));
    updateSyncUI();
    sendNotification(
      '💾 Record Saved Locally',
      'Operating offline. Result is secured in local outbox and will upload upon internet reconnection.',
      '/exams',
      'normal'
    );
  }

  window.chepQueueOfflineResult = queueOfflineResult;

  function syncOfflineQueue() {
    if (!navigator.onLine || syncQueue.length === 0) return;
    var ajaxUrl =
      (window.chepExamConfig && window.chepExamConfig.ajaxUrl) ||
      (window.chep_ajax_object && window.chep_ajax_object.ajax_url);

    if (!ajaxUrl) return;

    var pendingCount = syncQueue.length;
    var promises = syncQueue.map(function (item) {
      var fd = new FormData();
      Object.keys(item.payload).forEach(function (k) {
        fd.append(k, item.payload[k]);
      });
      return fetch(ajaxUrl, { method: 'POST', body: fd })
        .then(function (r) { return r.json(); })
        .catch(function (e) { return null; });
    });

    Promise.all(promises).then(function (results) {
      var succeeded = results.filter(function (r) { return r && r.success; }).length;
      if (succeeded > 0) {
        syncQueue = [];
        localStorage.removeItem('chep_wp_sync_queue');
        updateSyncUI();
        sendNotification(
          '✓ Cloud Sync Complete',
          'Successfully uploaded ' + succeeded + ' offline record(s) to the collegiate WordPress database.',
          '/exams',
          'normal'
        );
      }
    });
  }

  // Connectivity Listeners
  window.addEventListener('online', function () {
    isOnline = true;
    updateNetPill();
    sendNotification(
      '🟢 Internet Connection Restored',
      'Collegiate cloud network active. Initiating background sync...',
      '/',
      'normal'
    );
    syncOfflineQueue();
  });

  window.addEventListener('offline', function () {
    isOnline = false;
    updateNetPill();
    sendNotification(
      '🟠 Offline Mode Active',
      'No internet detected. All OSCE simulation, waveforms, and logbook entries are preserved locally.',
      '/',
      'emergency'
    );
  });

  // 6. Build and Inject Floating HUD into DOM
  document.addEventListener('DOMContentLoaded', function () {
    var container = document.createElement('div');
    container.id = 'chep-pwa-hud';
    container.innerHTML = `
      <!-- Floating Trigger Button -->
      <div style="position: fixed; bottom: 24px; left: 24px; z-index: 9999; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; font-family: 'Inter', system-ui, sans-serif;">
        <!-- PWA Install Banner -->
        <div id="chep-pwa-install-banner" style="display: none; background: rgba(15, 23, 42, 0.95); color: #fff; border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 16px; padding: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); backdrop-filter: blur(8px); max-width: 280px; align-items: center; justify-content: space-between; gap: 12px;">
          <div style="text-align: left;">
            <p style="margin: 0; font-size: 12px; font-weight: 800; color: #fff;">Install CHEP App</p>
            <p style="margin: 0; font-size: 11px; color: #a7f3d0;">Offline CAOSCE &amp; Fast Launch</p>
          </div>
          <button id="chep-pwa-install-btn" style="padding: 6px 12px; border-radius: 12px; background: #10b981; color: #022c22; font-size: 11px; font-weight: 800; border: none; cursor: pointer;">Install</button>
        </div>

        <!-- Floating Bell & Connectivity Trigger -->
        <button id="chep-pwa-bell-btn" style="display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 9999px; background: rgba(15, 23, 42, 0.9); color: #fff; border: 1px solid rgba(16, 185, 129, 0.4); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3); backdrop-filter: blur(8px); cursor: pointer; transition: all 0.2s;">
          <span class="material-symbols-outlined" style="font-size: 20px; color: #34d399;">notifications_active</span>
          <span style="font-size: 12px; font-weight: 700;">CHEP Hub</span>
          <span id="chep-net-status-pill" style="font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 9999px; background: ${navigator.onLine ? '#065f46' : '#991b1b'}; color: ${navigator.onLine ? '#6ee7b7' : '#fca5a5'};">
            ${navigator.onLine ? 'Online' : 'Offline'}
          </span>
          <span id="chep-pwa-status-dot" style="width: 8px; height: 8px; border-radius: 9999px; background: ${Notification.permission === 'granted' ? '#34d399' : '#f59e0b'};"></span>
        </button>
      </div>

      <!-- Alert Center Modal -->
      <div id="chep-pwa-modal" style="display: none; position: fixed; inset: 0; z-index: 10000; background: rgba(2, 6, 23, 0.6); backdrop-filter: blur(4px); align-items: flex-end; justify-content: flex-start; padding: 24px; font-family: 'Inter', system-ui, sans-serif;">
        <div style="background: #ffffff; border-radius: 24px; max-width: 420px; width: 100%; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid #e2e8f0; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(to right, #0f172a, #064e3b, #0f172a); color: #fff; padding: 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(16, 185, 129, 0.3);">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; border-radius: 12px; background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(52, 211, 153, 0.4); display: flex; align-items: center; justify-content: center; color: #6ee7b7;">
                <span class="material-symbols-outlined" style="font-size: 22px;">wifi_sync</span>
              </div>
              <div>
                <h3 style="margin: 0; font-size: 14px; font-weight: 800; color: #fff;">Offline-First &amp; Cloud Hub</h3>
                <p style="margin: 0; font-size: 11px; color: #a7f3d0;">Auto-Sync &amp; Notification Engine</p>
              </div>
            </div>
            <button id="chep-pwa-close-btn" style="background: rgba(255, 255, 255, 0.1); border: none; color: #fff; width: 30px; height: 30px; border-radius: 9999px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
              <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
            </button>
          </div>

          <!-- Connectivity & Sync Status Bar -->
          <div style="padding: 16px 20px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; items-center; justify-content: space-between;">
            <div>
              <span style="font-size: 11px; font-weight: 700; color: #64748b; display: block;">Network Status</span>
              <span id="chep-modal-net-label" style="font-size: 12px; font-weight: 800; color: ${navigator.onLine ? '#059669' : '#dc2626'};">
                ${navigator.onLine ? '🟢 Connected to Cloud' : '🟠 Offline (Local Mode)'}
              </span>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 11px; font-weight: 700; color: #64748b; display: block;">Local Outbox</span>
              <span id="chep-modal-outbox-count" style="font-size: 12px; font-weight: 800; color: #0f172a;">
                ${syncQueue.length} records pending
              </span>
            </div>
          </div>

          <!-- Push Status -->
          <div style="padding: 16px 20px; border-bottom: 1px solid #f1f5f9;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 12px; font-weight: 700; color: #334155;">Push Notifications:</span>
              <span id="chep-pwa-perm-badge" style="padding: 3px 8px; border-radius: 9999px; font-size: 11px; font-weight: 800; text-transform: uppercase;">
                ${Notification.permission === 'granted' ? 'Active ✓' : 'Not Enabled'}
              </span>
            </div>
            ${Notification.permission !== 'granted' ? `
              <button id="chep-pwa-enable-btn" style="width: 100%; padding: 8px 12px; border-radius: 10px; background: #059669; color: #fff; font-size: 11px; font-weight: 700; border: none; cursor: pointer;">
                Enable Browser Notifications
              </button>
            ` : ''}
          </div>

          <!-- Sync Action & Live Triggers -->
          <div style="padding: 16px 20px; display: flex; flex-direction: column; gap: 8px;">
            <button id="btn-force-sync" style="padding: 10px; border-radius: 12px; background: #0f172a; color: #fff; font-size: 11px; font-weight: 800; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
              <span class="material-symbols-outlined" style="font-size: 16px;">sync</span>
              <span>Sync Offline Outbox to Database Now</span>
            </button>

            <button id="btn-trigger-bell" style="padding: 10px; text-align: left; border-radius: 12px; background: #f8fafc; border: 1px solid #e2e8f0; cursor: pointer; display: flex; align-items: center; gap: 10px;">
              <span class="material-symbols-outlined" style="font-size: 18px; color: #2563eb;">notifications</span>
              <div>
                <p style="margin: 0; font-size: 11px; font-weight: 700; color: #0f172a;">Test CAOSCE Station Bell</p>
                <p style="margin: 0; font-size: 10px; color: #64748b;">10-min station expiration chime</p>
              </div>
            </button>

            <button id="btn-trigger-codeblue" style="padding: 10px; text-align: left; border-radius: 12px; background: #f8fafc; border: 1px solid #e2e8f0; cursor: pointer; display: flex; align-items: center; gap: 10px;">
              <span class="material-symbols-outlined" style="font-size: 18px; color: #dc2626;">emergency</span>
              <div>
                <p style="margin: 0; font-size: 11px; font-weight: 700; color: #0f172a;">Test Emergency Code Blue Drill</p>
                <p style="margin: 0; font-size: 10px; color: #64748b;">Hospital trauma warble sound</p>
              </div>
            </button>
          </div>

          <!-- History Feed -->
          <div style="padding: 16px 20px; padding-top: 0;">
            <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #94a3b8; display: block; margin-bottom: 6px;">
              Recent Dispatches
            </span>
            <div id="chep-pwa-history" style="max-height: 100px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px;"></div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    // Event Listeners
    var modal = document.getElementById('chep-pwa-modal');
    var bellBtn = document.getElementById('chep-pwa-bell-btn');
    var closeBtn = document.getElementById('chep-pwa-close-btn');
    var enableBtn = document.getElementById('chep-pwa-enable-btn');
    var forceSyncBtn = document.getElementById('btn-force-sync');
    var banner = document.getElementById('chep-pwa-install-banner');
    var installBtn = document.getElementById('chep-pwa-install-btn');

    bellBtn.addEventListener('click', function () {
      modal.style.display = 'flex';
      updatePermBadge();
      updateSyncUI();
    });

    closeBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.style.display = 'none';
    });

    if (enableBtn) {
      enableBtn.addEventListener('click', function () {
        if (!('Notification' in window)) return;
        Notification.requestPermission().then(function (perm) {
          updatePermBadge();
          if (perm === 'granted') {
            sendNotification('Push Enabled • CHEP College', 'Real-time CAOSCE exam rotation bells active.', '/exams', 'normal');
          }
        });
      });
    }

    if (forceSyncBtn) {
      forceSyncBtn.addEventListener('click', function () {
        if (!navigator.onLine) {
          alert('Cannot sync while offline. Please connect to Wi-Fi or mobile data first.');
          return;
        }
        syncOfflineQueue();
      });
    }

    document.getElementById('btn-trigger-bell').addEventListener('click', function () {
      sendNotification('🔔 CAOSCE 10-Minute Warning', 'Station 1 Complete. Rotate to Station 2 immediately!', '/exams', 'bell');
    });

    document.getElementById('btn-trigger-codeblue').addEventListener('click', function () {
      sendNotification('🚨 Emergency Code Blue Drill', 'Acute Post-Thyroidectomy Stridor in Bed 4. High-flow O2 required!', '/clinical-reflections', 'emergency');
    });

    // PWA Install Prompt
    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      installPrompt = e;
      if (!isInstalled && banner) {
        banner.style.display = 'flex';
      }
    });

    if (installBtn) {
      installBtn.addEventListener('click', function () {
        if (!installPrompt) return;
        installPrompt.prompt();
        installPrompt.userChoice.then(function (res) {
          if (res.outcome === 'accepted') {
            isInstalled = true;
            banner.style.display = 'none';
          }
          installPrompt = null;
        });
      });
    }

    function updatePermBadge() {
      var badge = document.getElementById('chep-pwa-perm-badge');
      var dot = document.getElementById('chep-pwa-status-dot');
      if (!badge) return;
      if (Notification.permission === 'granted') {
        badge.textContent = 'Active ✓';
        badge.style.background = '#d1fae5';
        badge.style.color = '#065f46';
        if (dot) dot.style.background = '#34d399';
      } else if (Notification.permission === 'denied') {
        badge.textContent = 'Blocked ✕';
        badge.style.background = '#fee2e2';
        badge.style.color = '#991b1b';
        if (dot) dot.style.background = '#f87171';
      } else {
        badge.textContent = 'Not Enabled';
        badge.style.background = '#fef3c7';
        badge.style.color = '#92400e';
        if (dot) dot.style.background = '#f59e0b';
      }
    }

    function updateNetPill() {
      var pill = document.getElementById('chep-net-status-pill');
      var modalNetLabel = document.getElementById('chep-modal-net-label');
      if (pill) {
        pill.textContent = navigator.onLine ? 'Online' : 'Offline';
        pill.style.background = navigator.onLine ? '#065f46' : '#991b1b';
        pill.style.color = navigator.onLine ? '#6ee7b7' : '#fca5a5';
      }
      if (modalNetLabel) {
        modalNetLabel.textContent = navigator.onLine ? '🟢 Connected to Cloud' : '🟠 Offline (Local Mode)';
        modalNetLabel.style.color = navigator.onLine ? '#059669' : '#dc2626';
      }
    }

    function updateSyncUI() {
      var countEl = document.getElementById('chep-modal-outbox-count');
      if (countEl) {
        countEl.textContent = syncQueue.length + ' records pending';
      }
    }

    function updateHistoryUI() {
      var histEl = document.getElementById('chep-pwa-history');
      if (!histEl) return;
      histEl.innerHTML = alertHistory
        .map(function (item) {
          return (
            '<div style="padding: 4px 8px; border-radius: 6px; background: #f8fafc; border: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between; font-size: 10px;">' +
            '<span style="font-weight: 600; color: #334155; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 250px;">' +
            item.title +
            '</span>' +
            '<span style="color: #94a3b8; font-size: 9px;">' +
            item.time +
            '</span>' +
            '</div>'
          );
        })
        .join('');
    }

    updatePermBadge();
    updateNetPill();
    updateSyncUI();
    updateHistoryUI();
  });
})();
