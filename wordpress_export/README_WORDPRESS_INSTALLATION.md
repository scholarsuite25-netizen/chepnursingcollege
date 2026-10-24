# CHEP College of Nursing Sciences - WordPress Installation Guide

This export package contains a complete, production-ready WordPress Theme and companion Plugin that fully replicate the **CHEP College of Nursing Sciences** high-level Next.js web application.

---

## What is in this Package?

1. **`chep-college-theme.zip`** (WordPress Theme):
   - **Hero Banner** with authentic 2026/2027 Matriculation Ceremony photographic card.
   - **Interactive Landscape Photo Slider** (Emergency Drills, Examination Hall, Geriatric Care).
   - **Office of the Provost** section with Provost Stella Oluwatoyin AYOWOLE's authentic portrait, executive quote, and credentials.
   - **Authentic Media Gallery** template with all 22 real CHEP photographs, category filtering, and full-screen lightbox modal.
   - **Admissions Portal** template with instant RRR Admission & Screening Slip generation and print formatting.
   - **Credential Verification Engine** template querying the native WordPress student registry.
   - **News & Clinical Dispatches** template with native WordPress post loop.

2. **`chep-academic-portal.zip`** (WordPress Companion Plugin):
   - Automatically creates native MySQL database tables (`wp_chep_applications`, `wp_chep_students`).
   - Seeds sample verified student records (Blessing ADEDIRAN, Ifeoluwa OSENI, Chidinma OKAFOR).
   - Provides an admin management portal in `WP-Admin → CHEP Portal`:
     - **Admissions Queue**: View all incoming candidates, filter status, one-click Admit/Screen/Reject buttons.
     - **Student Registry & Verification**: Add and edit verifiable matriculation and NMCN credentials.
   - Handles AJAX form submissions securely without any Supabase or external cloud dependencies.

---

## 3-Minute Installation Steps

### Step 1: Install the Plugin
1. Log in to your WordPress Admin dashboard (`/wp-admin`).
2. Go to **Plugins → Add New → Upload Plugin**.
3. Choose **`chep-academic-portal.zip`** and click **Install Now**.
4. Click **Activate Plugin**.
5. *Result*: A new menu named **CHEP Portal** will appear on the left sidebar with your Admissions Queue and Student Registry pre-seeded.

### Step 2: Install the Theme
1. In your WordPress Admin dashboard, go to **Appearance → Themes → Add New → Upload Theme**.
2. Choose **`chep-college-theme.zip`** and click **Install Now**.
3. Click **Activate**.

### Step 3: Create the Core Pages
Go to **Pages → Add New** and create these 4 pages:

1. **Home**
   - Title: `Home`
   - Template: *Default template*
   - Publish.

2. **Admission Portal**
   - Title: `Admission`
   - Slug: `admission` (URL will be `yourdomain.com/admission`)
   - Page Attributes → Template: Select **Admission Portal**
   - Publish.

3. **Media Gallery**
   - Title: `Gallery`
   - Slug: `gallery` (URL will be `yourdomain.com/gallery`)
   - Page Attributes → Template: Select **Gallery Showcase**
   - Publish.

4. **Credential Verification**
   - Title: `Verify Credentials`
   - Slug: `verify` (URL will be `yourdomain.com/verify`)
   - Page Attributes → Template: Select **Credential Verification**
   - Publish.

### Step 4: Set the Static Homepage
1. Go to **Settings → Reading**.
2. Under **Your homepage displays**, select **A static page**.
3. Set **Homepage** to `Home`.
4. Click **Save Changes**.

---

## Live Testing Checklist

1. **Visit Homepage**: Check the 2026/2027 Matriculation photo card, test the landscape slider (prev/next controls and auto-advance), and view the Office of the Provost.
2. **Test Admissions Form (`/admission`)**:
   - Fill in candidate name, email, phone, and JAMB score.
   - Click **Submit Application & Generate Slip**.
   - Notice the instant generation of the official **RRR Entrance Examination & Screening Slip** ready to print (`Ctrl+P` or print button).
   - Go to `WP-Admin → CHEP Portal → Admissions Queue` to see the candidate automatically recorded in your native MySQL database!
3. **Test Credential Verification (`/verify`)**:
   - Enter `CHEP/NUR/2024/0119` or `CHEP/NUR/2025/0842`.
   - Click **Verify Record** to see the digital verification seal and academic details rendered instantly.
4. **Test Gallery (`/gallery`)**:
   - Click category filter buttons (*Matriculation*, *Geriatric Care*, *Disaster Drills*, etc.).
   - Click any photo to launch the full-screen lightbox modal.
