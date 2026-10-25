# TEST PLAN & VERIFICATION STRATEGY (GEWA-AS PHASE 6 & 9)
## Target: CHEP College of Nursing Sciences Academic Web Application

---

## 1. TEST STRATEGY & PYRAMID SCOPE

This test plan defines the multi-tier testing methodology implemented to validate code correctness, security access controls, and operational reliability.

```
       / \
      / E2E \       End-to-End User Journeys (Candidate Registration, Portal Flow)
     /-------\
    / Integr. \     API Routes (/api/health), Server Actions & Sitemap Resolution
   /-----------\
  /    Unit     \   Admissions Validation, Fee Calculations, Remita RRR Checks
 /---------------\
/ Security Regress\ Database RLS Verification, Server Action Auth Boundary Tests
+-----------------+
```

---

## 2. RISK-BASED TEST MATRIX

| Test ID | Test Category | Target Feature / Control | Preconditions | Inputs / Test Case | Expected Outcome | Priority | Automated File |
|:---|:---|:---|:---|:---|:---|:---:|:---|
| **TST-001** | Unit | Admission Criteria Validation | Candidate form open | Full Name: Valid, O-Level Credits: 5, Program: "Basic Nursing" | Returns `valid: true`, 0 errors | P0 | `tests/unit/admissions_validation.test.mjs` |
| **TST-002** | Unit | Deficient Credits Rejection | Candidate form open | O-Level Credits: 4 (below NMCN minimum threshold) | Returns `valid: false`, flag credit deficiency | P0 | `tests/unit/admissions_validation.test.mjs` |
| **TST-003** | Unit | Remita RRR Number Formatting | Payment lookup form | 12-digit numeric RRR string | Formats correctly, passes length validator | P1 | `tests/unit/admissions_validation.test.mjs` |
| **TST-004** | Security | Server Actions 'use server' Header | Action file inspection | All files in `src/app/actions/*.ts` | 100% must declare `'use server'` directive | P0 | `tests/security/server_actions_access.test.mjs` |
| **TST-005** | Security | Admin Client Caller Authorization | Action file inspection | `src/app/actions/admin.ts` | Verify whether caller session is checked prior to `createAdminClient()` | P0 | `tests/security/server_actions_access.test.mjs` |
| **TST-006** | Security | Secret Environment Variable Segregation | Env file inspection | `.env.local` | Service role keys and secrets must NOT carry `NEXT_PUBLIC_` prefix | P0 | `tests/security/server_actions_access.test.mjs` |
| **TST-007** | Database | Database Table RLS Enablement | Schema inspection | `supabase_schema.sql` | All 7 core tables must have `ENABLE ROW LEVEL SECURITY` | P0 | `tests/security/database_rls_policies.test.mjs` |
| **TST-008** | Database | Wildcard RLS Policy Detection | Schema inspection | `supabase_schema.sql` | Policies with `using (true)` must be identified and audited | P0 | `tests/security/database_rls_policies.test.mjs` |
| **TST-009** | Integration | Health Check Endpoint Availability | Application built | `GET /api/health` | Returns HTTP 200, status: "healthy", uptime | P0 | `tests/integration/health_and_routes.test.mjs` |
| **TST-010** | Integration | Verify Route Deprecation from Sitemap | Sitemap generator | `src/app/sitemap.ts` | Does NOT contain `"/verify"`; correctly lists active pages | P1 | `tests/integration/health_and_routes.test.mjs` |
| **TST-011** | Integration | Top-Level "About Us" Navigation Link | Navbar component | `src/components/Navbar.tsx` | Contains top-level `label: "About Us"` linking to `/about` | P1 | `tests/integration/health_and_routes.test.mjs` |

---

## 3. TEST EXECUTION ENVIRONMENT & COMMANDS

- **Test Runner**: Native Node.js Test Runner (`node:test`, `node:assert`)
- **Execution Command**: `npm test` (or `node --test tests/**/*.test.mjs`)
- **Isolation Principle**: All tests execute with synthetic fixtures; zero writes or modifications to production databases.
