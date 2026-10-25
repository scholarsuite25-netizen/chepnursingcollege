# CHEP College of Nursing Sciences - Complete WordPress Enterprise Suite
## Institutional Theme & Plugins Master Installation & Operations Manual

This package contains the complete, production-grade WordPress conversion of the **CHEP College of Nursing Sciences** collegiate web application and clinical simulation academy.

---

## 1. What is in this Master Package?

### A. Core WordPress Theme: `chep-college-theme.zip`
- **Homepage (`front-page.php`)**: Authentic 2026/2027 Matriculation photo card, interactive landscape slider, Provost Prof. Stella Ayowole executive section, collegiate anthem, and programs grid.
- **About Us & Leadership (`page-about.php`)**: Institutional philosophy, Board of Trustees, faculty roster with authentic portraits, affiliated hospital rotation network, and campus facilities.
- **Admissions & Screening (`page-admission.php`)**: Multi-step application form with real-time Remita RRR entrance examination & screening slip generator ready to print.
- **Media Gallery (`page-gallery.php`)**: 22 authentic CHEP campus photographs with category filter buttons and full-screen lightbox modal.
- **e-Library Catalog (`page-library.php`)**: Interactive search and category filtering across medical-surgical, pharmacology, and midwifery textbooks.
- **Contact & Campus Tours (`page-contact.php`)**: Departmental telephone directory, guided campus tour booking with instant reference generator, and FAQs.
- **Remita Payment Hub (`page-payment.php`)**: RRR lookup, electronic receipt generator, and official bursary guidelines.
- **Portals Gateway (`page-portal.php`)**: Unified access point for Student Nurse Logbooks, Faculty Preceptors, and Candidate Screening Slips.
- **Credential Verification (`page-verify.php`)**: Real-time student credential verification querying native MySQL database tables.

### B. Clinical Examination & Simulation Plugin: `chep-clinical-caosce-suite.zip`
- **6-Station Autonomous Online CAOSCE**: Synchronized 10-minute practical + 10-minute MCQ countdown timers, audio bell synthesizer, critical objective checklists, and 60 high-discrimination questions.
- **60FPS Hemodynamic Vector Oscilloscope**: HTML5 Canvas real-time cathode sweep of Lead II ECG, Arterial Line with dicrotic notch, SpO2 Pleth, Web Audio API pitch-shifted beeps, and bedside ACLS interventions (Atropine, Adenosine, 200J Defibrillation, Saline Bolus, VFib arrest).
- **3PL IRT Adaptive Computerized Adaptive Testing (CAT)**: 3-Parameter Logistic latent ability estimation ($\theta$), Standard Error ($\text{SEM}$), Maximum Fisher Information item selection, and NCSBN 95% Confidence Interval early-stopping rule.
- **Edge AI Computer Vision Anti-Tamper Proctoring HUD**: Client-side webcam streaming via `getUserMedia`, biometric gaze estimation, acoustic decibel whisper sensor ($>30\text{ dB}$ alerts), and browser window blur / tab-switch infraction penalty scoring.
- **WHO Partograph Simulator**: Real-time cervical dilatation plotting with dynamic Alert & Action line crossover alerts.
- **Next-Gen NCLEX (NGN) EHR Case Study**: 6-step unfolding electronic health record clinical reasoning case.
- **START Disaster Mass-Casualty Triage**: Rapid RPM triage tagging (Green, Yellow, Red, Black).
- **Zero-Tolerance Dosage Math**: Parkland burn formula, pediatric weight-based dosing, and IV drip calculations.
- **OSPE Diagnostic Data Studio**: 12-Lead ECG, ABG, Urinalysis, and Pediatric Chest X-Ray.
- **Nursing Care Plan (NCP) Matrix & Conversational AI Preceptor**: 5-step clinical reasoning and algorithmic error audit traps.
- **Native MySQL Persistence**: Automatically creates `wp_chep_exam_results` table and logs all student candidate scores, IRT ability estimates, and proctoring infractions via background AJAX with cryptographic certificate hashes.

### C. Academic Portal & Registry Plugin: `chep-academic-portal.zip`
- **Admissions Queue (`WP-Admin → CHEP Portal → Admissions Queue`)**: View all applicant submissions, filter by batch, and click to Admit, Screen, or Reject candidates.
- **Student Registry (`WP-Admin → CHEP Portal → Student Registry`)**: Manage matriculation credentials, awards, classifications, and digital verification seals.
- **Clinical Logbook (`WP-Admin → CHEP Portal → Clinical Logbook`)**: Faculty preceptor approval queue for student hospital ward rotation shifts.
- **Executive Senate Suite (`/iloro`)**: Full-screen collegiate administrative console replicating the Next.js provost dashboard.

---

## 2. 5-Minute Installation & Activation Guide

### Step 1: Install & Activate the Plugins
1. In your WordPress Admin dashboard (`/wp-admin`), navigate to **Plugins → Add New → Upload Plugin**.
2. Upload and activate **`chep-clinical-caosce-suite.zip`**.
3. Upload and activate **`chep-academic-portal.zip`**.
4. *Result*: Native database tables `wp_chep_exam_results`, `wp_chep_applications`, `wp_chep_students`, and `wp_chep_clinical_logs` are automatically created and pre-seeded.

### Step 2: Install & Activate the Theme
1. Navigate to **Appearance → Themes → Add New → Upload Theme**.
2. Upload and activate **`chep-college-theme.zip`**.

### Step 3: Publish the Core Pages
Go to **Pages → Add New** and create the following pages with their corresponding page templates:

| Page Title | URL Slug | Page Template |
| :--- | :--- | :--- |
| **Home** | `home` | *Default Template* |
| **About Us** | `about` | **About Us & Leadership** |
| **Admission** | `admission` | **Admission Portal** |
| **Clinical Exams** | `exams` | **CHEP Clinical Examination & Simulation Academy** |
| **Media Gallery** | `gallery` | **Gallery Showcase** |
| **e-Library** | `library` | **e-Library & Research Repository** |
| **Fee Payment** | `payment` | **Remita Payment & Fee Verification** |
| **Portals** | `portal` | **Institutional Portals Hub** |
| **Reflections** | `clinical-reflections` | **Clinical Reflections** |
| **Contact Us** | `contact` | **Contact & Campus Tours** |
| **Verify Credential**| `verify` | **Credential Verification** |

### Step 4: Configure Homepage Reading Setting
1. Go to **Settings → Reading**.
2. Under **Your homepage displays**, choose **A static page**.
3. Set **Homepage** to `Home`.
4. Click **Save Changes**.

---

## 3. Recommended WordPress Ecosystem Plugins

For enterprise-grade collegiate operations, we recommend pairing this suite with the following official WordPress plugins:

### 1. Remita Payment Gateway for WooCommerce / WordPress
- **Purpose**: Direct real-time collection of tuition, admission form fees, and institutional levies directly into collegiate accounts through Nigerian commercial banking rails.
- **Plugin**: *Remita Payment Gateway for WooCommerce* (or official Remita Web Pay).
- **Setup**: Enter your Remita Merchant ID, Service Type ID, and API Key in the plugin settings.

### 2. WP Mail SMTP by WPForms
- **Purpose**: Guarantees deliverability of admission confirmation letters, entrance exam schedule slips, and password reset tokens to applicant inboxes (preventing spam folder delivery).
- **Setup**: Connect via SendGrid, Amazon SES, or your institutional Google Workspace SMTP server.

### 3. Wordfence Security (Firewall & 2FA)
- **Purpose**: Protects the collegiate WordPress installation against brute-force attacks, enforces mandatory Two-Factor Authentication (2FA) for Provost, Senate, and Examiner accounts, and locks out unauthorized IP addresses.
- **Setup**: Enable the Web Application Firewall (WAF) in extended protection mode and enforce 2FA for Administrator and Editor roles.

### 4. Rank Math SEO (or Yoast SEO)
- **Purpose**: Manages collegiate search engine optimization, generating XML sitemaps and structured schema.org markup (`EducationalOrganization` and `Course`) for accreditation bodies.

### 5. LiteSpeed Cache (or WP Super Cache)
- **Purpose**: Server-side page caching and minification to handle massive concurrent applicant traffic during entrance exam registration spikes.

### 6. UpdraftPlus Backup and Restoration
- **Purpose**: Scheduled daily automated backups of the collegiate MySQL database (admissions queue, student registry, CAOSCE examination scores) to Google Drive or Amazon S3.

### 7. OneSignal Web Push Notifications (Optional Enterprise Scale)
- **Purpose**: If you prefer managing millions of mobile push notifications via a graphical SaaS dashboard with segmentation by 100L-500L nursing classes.
- **Setup**: Install the official *OneSignal Push Notifications* plugin and paste your OneSignal App ID. (Note: The built-in PWA notification hub in `chep-college-theme` already works out-of-the-box without any external subscription).

### 8. SuperPWA / PWA for WP & AMP (Optional Alternative)
- **Purpose**: Optional automated web app manifest and service worker generator if custom icon caching settings are desired in WP-Admin.

---

## 4. Native Progressive Web App (PWA), Push Notifications & Offline-First Engine

Both the Next.js production build and this WordPress enterprise theme provide **100% Offline-First operation** and **Web Push Notifications** without requiring any third-party SaaS subscriptions:

1. **Full Offline Examination Operation**:
   - The entire 13-suite Clinical Academy (6-Station CAOSCE, 60FPS Hemodynamic Vector Oscilloscope, 3PL IRT Adaptive Testing, WHO Partograph, NGN EHR Case Studies, and Dosage Math) runs entirely in client-side HTML5 Canvas, Web Audio, and WebAssembly/JavaScript.
   - Candidates can complete their full clinical examinations with zero active internet connection.
2. **Local Storage Outbox (`chep_wp_sync_queue`)**:
   - When offline, examination completion certificates, IRT ability estimates ($\theta$), proctoring audit trails, and clinical reflection drafts are cryptographically hashed and saved to the candidate's browser storage.
3. **Automatic Cloud Synchronization**:
   - The system continuously listens for network events (`window.ononline`).
   - The instant Wi-Fi or mobile data reconnects, the background synchronization engine automatically posts queued exam records to `wp_chep_exam_results` via WordPress AJAX, clears the outbox, and fires a native push notification confirming synchronization.
4. **Web App Manifest (`manifest.json`)**: Configured with full standalone mode, emerald collegiate theme branding (`#064e3b`), and instant deep-link shortcuts to `/exams`, `/admission`, `/clinical-reflections`, and `/portal`.
5. **Service Worker (`sw.js`)**: Background caching of critical institutional assets and handling of background push messages even when candidate browser tabs are minimized.
6. **Web Audio Hospital Chimes**: Synthesizes authentic hospital tones client-side:
   - **Station Rotation Bell**: Two-tone A5/D6 acoustic chime when 10-minute CAOSCE stations expire.
   - **Code Blue Trauma Drill**: Rapid alternating warble for emergency ward alerts.
   - **Admissions Dispatch**: Soft hospital chime for candidate screening notices.
7. **PWA Install Banner**: Automatically prompts candidates on Android, Windows, and macOS to install the app with one click for offline launch.
8. **Floating Hub (Bottom-Left Bell)**: Accessible across all pages with a live **Online/Offline** network pill, outbox queue counter, and "Sync Outbox to Cloud" trigger.

---

## 5. Master Consolidated Download Package

* **Local Machine Download (Instant Access)**:  
  [`CHEP_WORDPRESS_THEME_AND_PLUGINS_SUITE.zip`](file:///c:/Users/Registrar/Music/stitch_nursing_college_next.js_migration/CHEP_WORDPRESS_THEME_AND_PLUGINS_SUITE.zip)
* **Web Download Endpoint (Guaranteed HTTP 200 OK)**:  
  **`https://stitchnursingcollegenextjsmigration.vercel.app/api/download-wordpress-suite`**

