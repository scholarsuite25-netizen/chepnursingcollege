# PRE-DEPLOYMENT GO / NO-GO CHECKLIST (GEWA-AS PHASE 10)
## Target: CHEP College of Nursing Sciences Academic Web Application
### Release Gate Evaluation: October 25, 2026

---

## 1. RELEASE DECISION SCOREBOARD

```
+---------------------------------------------------------------------------------------------------+
|                                     DEPLOYMENT READINESS VERDICT                                  |
+---------------------+---------------------+-------------------------------------------------------+
| Final Status        | CONDITIONALLY READY | Permitted for Internal Acceptance / Staging           |
| Release Blockers    | 2 Critical (P0)     | Public Admission Portal requires RLS & Auth Guards    |
| Operational Gates   | 16 PASS, 2 COND.    | 0 Build Failures, 0 Runtime Fatalities                |
+---------------------+---------------------+-------------------------------------------------------+
```

---

## 2. ITEMIZED OPERATIONAL CHECKLIST

| # | Checkpoint Item | Audit Category | Verification Method | Status | Notes & Evidence |
|:---|:---|:---|:---|:---:|:---|
| **01** | Framework & Runtime Stability | Architecture | `package.json` inspection | **PASS** | Next.js 16.4.0 (Turbopack), Node.js v26.5.1 |
| **02** | Deterministic Dependency Lockfile | DevOps | `package-lock.json` check | **PASS** | Lockfile synchronized |
| **03** | Upstream Dependency Security (SCA) | Security | `npm audit` | **FAIL (P0)** | Next.js 16.4.0 flagged (GHSA-2464-fhr4-w9xw). Fix: upgrade to 16.4.3 |
| **04** | TypeScript Compiler Strictness | Code Quality | `npx tsc --noEmit` | **PASS** | Exit code 0, 0 compiler errors |
| **05** | ESLint Code Quality Rules | Code Quality | `npm run lint` | **CONDITION** | 64 any casts flagged (QUA-001) |
| **06** | Secret Key Segregation | DevSecOps | Git & `.env.local` audit | **PASS** | No private secrets in `NEXT_PUBLIC_*` |
| **07** | Database Row-Level Security (RLS) | Security | `supabase_schema.sql` | **FAIL (P0)** | Insecure wildcard `using (true)` policies found (SEC-001) |
| **08** | Server Action Caller Authorization | DevSecOps | `src/app/actions/admin.ts` | **FAIL (P0)** | Admin functions lack server-side session checks (SEC-003) |
| **09** | Clinical Signature Verification | Security | `src/app/actions/clinical.ts` | **FAIL (P0)** | Preceptor approval lacks role check (SEC-004) |
| **10** | Neutralization of Legacy Verification | Functional | `src/app/verify/page.tsx` | **PASS** | HTTP 307 redirects to `/about`; 0 public verify links |
| **11** | "About Us" Top Navigation Accessibility | UI / UX | `src/components/Navbar.tsx` | **PASS** | Prominent top menu + dropdown to Provost & Board |
| **12** | Elimination of Academic Calendar | Functional | `src/app/news/page.tsx` | **PASS** | Calendar sidebar card completely removed |
| **13** | Authentic Matriculation Photos | Media / Assets | `src/app/gallery/page.tsx` | **PASS** | Clinical cohort uses `chep_matric_6.jpg` |
| **14** | Empty ICT Computer Lab Photos | Media / Assets | `src/app/page.tsx` | **PASS** | Facilities & gallery use `ict_computers_empty.jpg` |
| **15** | Disaster Management Simulation Lab | Media / Assets | `src/app/page.tsx` | **PASS** | Lab card uses `disaster_week_3.jpg` |
| **16** | Production Health Check Endpoint | SRE / DevOps | `GET /api/health` | **PASS** | Returns HTTP 200, status: "healthy", uptime |
| **17** | Automated CI/CD Release Pipeline | DevOps | `.github/workflows/ci.yml` | **PASS** | Pipeline created for lint, typecheck, test, build |
| **18** | Multi-Tier Test Suite Execution | QA / Testing | `npm test` | **PASS** | 11/11 automated unit and security tests passed |
| **19** | Turbopack Production Build Gate | Release | `npm run build` | **PASS** | Exit code 0, all 23 routes generated |
| **20** | Live Hosting & Custom Subdomain | Infra | DNS & Vercel inspection | **PASS** | Live at `https://chepnursingcollege.vercel.app` (HTTP 200) |

---

## 3. GO / NO-GO SUMMARY

- **Staging / Demonstration Deployment**: **GO** (Ready for internal review and stakeholder sign-off).
- **Public Candidate Admission Portal**: **NO-GO** (Pending P0 patch for Supabase RLS and Server Action role verification).
