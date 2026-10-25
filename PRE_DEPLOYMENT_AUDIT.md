# PRE-DEPLOYMENT AUDIT & RELEASE ASSESSMENT REPORT
## Target: CHEP College of Nursing Sciences Web Application
### Standard: Global Enterprise Web Application Audit & Release Standard (GEWA-AS 2026.1)

---

## 1. EXECUTIVE SUMMARY

An evidence-based pre-deployment audit was conducted on the CHEP College of Nursing Sciences web application across all 10 phases of the GEWA-AS standard.

```
+---------------------------------------------------------------------------------------------------+
|                                      AUDIT FINDINGS SUMMARY                                       |
+---------------------+---------------------+-------------------------------------------------------+
| Severity Level      | Count               | Status                                                |
+---------------------+---------------------+-------------------------------------------------------+
| CRITICAL            | 2                   | 1 Confirmed Architecture, 1 Upstream Supply Chain     |
| HIGH                | 2                   | Confirmed Server Action Authorization Missing         |
| MEDIUM              | 2                   | Confirmed Business Logic & PII Enumeration            |
| LOW / INFO          | 2                   | Code Quality (any casts) & Image Optimization         |
+---------------------+---------------------+-------------------------------------------------------+
| TOTAL FINDINGS      | 8                   | P0 Remediation Prescribed                             |
+---------------------+---------------------+-------------------------------------------------------+
```

### Final Release Verdict
**CONDITIONALLY READY (Within Assessed Staging/Pre-Launch Scope)**  
The application successfully compiles (23 routes generated), passes all 11 automated unit and security tests, serves clean static pages, and features an active health check endpoint. However, **the 2 Critical and 2 High findings must be remediated before processing real public candidate admissions or student grade records.**

---

## 2. ARCHITECTURE SUMMARY & REPOSITORY INVENTORY

- **Framework**: Next.js 16.4.0 (Turbopack, App Router)
- **Frontend / UI**: React 19.3.0, Tailwind CSS v4, Google Material Symbols, Custom CHEP Design Tokens
- **Persistence Layer**: PostgreSQL via Supabase SSR (`@supabase/ssr` v0.12.7, `@supabase/supabase-js` v2.117.3)
- **Hosting / Runtime**: Vercel Serverless / Edge Platform (`https://chepnursingcollege.vercel.app`)
- **Active Routes Generated (23 Routes)**:
  - Institutional: `/`, `/about`, `/gallery`, `/news`, `/contact`
  - Academics & Admissions: `/admission`, `/admission/slip`, `/payment`
  - Examinations & Clinical: `/exams`, `/clinical-reflections`
  - Portals: `/portal`, `/portal/student`, `/portal/faculty`, `/admin`, `/iloro`
  - Virtual Library: `/library`
  - Health & DevOps: `/api/health`, `/sitemap.xml`, `/robots.txt`
  - Legacy Neutralized: `/verify` (Redirects HTTP 307 to `/about`)

---

## 3. DETAILED FINDINGS & VULNERABILITY REGISTER

### SEC-001 (CRITICAL) — Insecure Wildcard RLS Policies in `supabase_schema.sql`
- **Affected File**: [`supabase_schema.sql:L77-L89, L132-L139`](file:///c:/Users/Registrar/Music/stitch_nursing_college_next.js_migration/supabase_schema.sql#L77-L89)
- **Vulnerable Code**:
  ```sql
  create policy "Admin full access applications" on public.applications
    for all using (true) with check (true);
  create policy "Admin full access site_users" on public.site_users
    for all using (true) with check (true);
  ```
- **Root Cause**: The RLS policy applies `using (true)` globally without restricting to `TO service_role` or checking `auth.uid() IN (SELECT id FROM admin_users)`.
- **Impact**: Any anonymous user possessing `NEXT_PUBLIC_SUPABASE_ANON_KEY` can perform direct REST API calls to read, modify, or drop records in `applications`, `students`, `clinical_logs`, and `site_users`.
- **Remediation**: Update RLS policies to restrict full access strictly to `service_role`:
  ```sql
  create policy "Admin full access applications" on public.applications
    to service_role using (true) with check (true);
  ```

---

### SEC-002 (CRITICAL) — Next.js 16.4.0 Upstream Vulnerabilities (Supply Chain)
- **Affected Package**: `next@16.4.0`
- **Advisories**:
  - `GHSA-2464-fhr4-w9xw` (Critical): Remote Code Execution in Image Optimization API when SVG files are used.
  - `GHSA-673q-mjm6-r5xr` (Critical): Remote Code Execution in `use cache` functions returning typed arrays.
  - `GHSA-p3m5-59mp-jv5r` (High): Denial of Service in App Router using Server Actions.
- **Root Cause**: Upstream framework vulnerability in Next.js versions `<= 16.4.0`.
- **Remediation**: Execute `npm install next@16.4.3` or run `next upgrade --agent=security`.

---

### SEC-003 (HIGH) — Unauthenticated Administrative Server Actions
- **Affected File**: [`src/app/actions/admin.ts:L5-L42, L141-L220`](file:///c:/Users/Registrar/Music/stitch_nursing_college_next.js_migration/src/app/actions/admin.ts#L5-L42)
- **Vulnerable Code**:
  ```typescript
  export async function updateApplicationStatus(id: string, status: string) {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("applications").update({ status }).eq("id", id)...
  ```
- **Root Cause**: Next.js Server Actions are publicly accessible POST endpoints. `admin.ts` does not inspect session cookies or verify administrative roles before calling `createAdminClient()`.
- **Impact**: An unauthorized attacker can forge POST requests to approve or reject student admissions, create new admin users, or delete published news dispatches.
- **Remediation**: Implement a server-side session validator helper `requireAdminSession()` at the entry of every action in `admin.ts`.

---

### SEC-004 (HIGH) — Forged Clinical Preceptor Signatures
- **Affected File**: [`src/app/actions/clinical.ts:L62-L80`](file:///c:/Users/Registrar/Music/stitch_nursing_college_next.js_migration/src/app/actions/clinical.ts#L62-L80)
- **Vulnerable Code**:
  ```typescript
  export async function approveClinicalLog(logId: string) {
    const supabase = createAdminClient();
    return await supabase.from("clinical_logs").update({ preceptor_signed: true }).eq("id", logId);
  }
  ```
- **Root Cause**: Missing preceptor role verification.
- **Impact**: Students or third parties can digitally sign off on their own clinical ward hours.
- **Remediation**: Verify that `auth.getUser()` has the role `Clinical Preceptor` or `Faculty` before setting `preceptor_signed: true`.

---

### SEC-005 (MEDIUM) — Candidate Dossier PII Enumeration
- **Affected File**: [`src/app/actions/admissions.ts:L50-L75`](file:///c:/Users/Registrar/Music/stitch_nursing_college_next.js_migration/src/app/actions/admissions.ts#L50-L75)
- **Root Cause**: `checkApplicationStatus` uses broad wildcard queries (`.or(rrr_number.ilike... full_name.ilike...)`) and returns `.select("*")` containing full candidate phone numbers, emails, and O-Level grades.
- **Impact**: Anyone searching for common names (e.g., "Adebayo") receives up to 5 full personal dossiers.
- **Remediation**: Require exact matching on RRR or Application ID, and restrict returned fields to `{ full_name, program, status, batch }`.

---

### SEC-006 (MEDIUM) — Hardcoded Application Fee Payment Status
- **Affected File**: [`src/app/actions/admissions.ts:L32`](file:///c:/Users/Registrar/Music/stitch_nursing_college_next.js_migration/src/app/actions/admissions.ts#L32)
- **Vulnerable Code**: `payment_status: "paid"`
- **Root Cause**: Every candidate submission is automatically marked as `paid` on insert.
- **Impact**: Applicants bypass statutory application fees.
- **Remediation**: Default `payment_status` to `"unpaid"` and update to `"paid"` strictly via a verified Remita payment webhook or bank settlement confirmation.

---

### QUA-001 (LOW) — Unchecked `any` Types & ESLint Warnings
- **Affected Files**: `src/app/payment/page.tsx`, `src/app/portal/student/page.tsx`, `src/app/portal/faculty/page.tsx`
- **Evidence**: `npm run lint` flagged 64 instances of `@typescript-eslint/no-explicit-any`.
- **Remediation**: Replace `(err: any)` with `(err: unknown)` with standard type narrowing.

---

### PERF-001 (INFORMATIONAL) — Unoptimized `<img>` Elements
- **Affected Files**: `src/app/page.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`
- **Evidence**: Standard HTML `<img>` tags are used instead of `next/image`.
- **Remediation**: Convert priority above-the-fold images to `<Image priority />` for enhanced LCP performance.

---

## 4. ACCESS-CONTROL MATRIX

| Endpoint / Server Action | Location | Intended Audience | Authentication Enforced? | Role Enforced? | Current Risk |
|:---|:---|:---|:---:|:---:|:---:|
| `submitApplication` | `actions/admissions.ts` | Public Candidates | No (Intended) | N/A | Low (Captcha needed) |
| `checkApplicationStatus` | `actions/admissions.ts` | Candidates | No | No | Medium (PII Enumeration) |
| `getApplications` | `actions/admin.ts` | Registry Staff | ❌ No | ❌ No | **HIGH (Data Leak)** |
| `updateApplicationStatus`| `actions/admin.ts` | Admissions Officer | ❌ No | ❌ No | **HIGH (Tampering)** |
| `publishDispatch` | `actions/admin.ts` | Registry / Editor | ❌ No | ❌ No | **HIGH (Content Injection)** |
| `deleteDispatch` | `actions/admin.ts` | Registry / Editor | ❌ No | ❌ No | **HIGH (Data Loss)** |
| `createSiteUser` | `actions/admin.ts` | Super Admin | ❌ No | ❌ No | **HIGH (Privilege Escalation)**|
| `deleteSiteUser` | `actions/admin.ts` | Super Admin | ❌ No | ❌ No | **HIGH (Account Destruction)** |
| `submitClinicalLog` | `actions/clinical.ts` | Student Nurse | ❌ No | ❌ No | Medium (Unauthenticated Log) |
| `approveClinicalLog` | `actions/clinical.ts` | Preceptor | ❌ No | ❌ No | **HIGH (Signature Forgery)** |
| `searchOpenAccess` | `actions/library.ts` | Public / Students | No (Public Read) | N/A | Low |
| `GET /api/health` | `api/health/route.ts` | SRE / Monitoring | No (Public Liveness) | N/A | Low |

---

## 5. REMEDIATION PLAN

### Priority 0 (Must Fix Before Public Candidate Admissions)
1. Tighten RLS policies in `supabase_schema.sql` to restrict wildcard access to `to service_role`.
2. Add server-side session and role authentication checks to `src/app/actions/admin.ts` and `src/app/actions/clinical.ts`.
3. Upgrade Next.js dependency to `16.4.3` via `npm install next@16.4.3`.
4. Fix `admissions.ts` to default `payment_status: "unpaid"`.

### Priority 1 (Next Scheduled Sprint)
1. Add strict matching and field filtering to `checkApplicationStatus` to prevent PII harvesting.
2. Add rate limiting to `/api/health` and candidate application forms.
3. Clean up `(err: any)` explicit any casts across portal pages.

### Priority 2 (Post-Launch Hardening)
1. Transition priority static `<img>` tags to `next/image` with WebP optimization.
2. Integrate Sentry error monitoring and automated uptime pinging.
