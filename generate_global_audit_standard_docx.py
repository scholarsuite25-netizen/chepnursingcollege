import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, hex_color):
    shading_xml = f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>'
    cell._tc.get_or_add_tcPr().append(parse_xml(shading_xml))

def set_cell_margins(cell, top=140, bottom=140, left=180, right=180):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def create_global_audit_document():
    doc = Document()
    
    # Page setup - Margins
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.85)
        section.right_margin = Inches(0.85)
        
    NAVY = RGBColor(16, 42, 77)        # #102A4D
    EMERALD = RGBColor(16, 122, 85)    # #107A55
    DARK_GRAY = RGBColor(45, 55, 72)   # #2D3748
    MUTED_GRAY = RGBColor(100, 116, 139) # #64748B
    CRIMSON = RGBColor(197, 48, 48)    # #C53030
    AMBER = RGBColor(217, 119, 6)      # #D97706
    
    # Document Header Eyebrow
    eyebrow = doc.add_paragraph()
    eyebrow.paragraph_format.space_before = Pt(0)
    eyebrow.paragraph_format.space_after = Pt(2)
    run_eye = eyebrow.add_run("ENTERPRISE SOFTWARE QUALITY & CYBERSECURITY STANDARD • GEWA-AS 2026.1")
    run_eye.font.name = 'Arial'
    run_eye.font.size = Pt(10)
    run_eye.font.bold = True
    run_eye.font.color.rgb = EMERALD
    
    # Title
    main_title = doc.add_paragraph()
    main_title.paragraph_format.space_before = Pt(2)
    main_title.paragraph_format.space_after = Pt(4)
    run_t = main_title.add_run("GLOBAL ENTERPRISE WEB APPLICATION AUDIT & RELEASE STANDARD")
    run_t.font.name = 'Arial'
    run_t.font.size = Pt(20)
    run_t.font.bold = True
    run_t.font.color.rgb = NAVY
    
    # Subtitle
    sub_title = doc.add_paragraph()
    sub_title.paragraph_format.space_before = Pt(0)
    sub_title.paragraph_format.space_after = Pt(14)
    run_s = sub_title.add_run("Universal Full-Lifecycle Protocol for Post-Build Pre-Deployment Auditing Across SDLC, DevSecOps, Multi-Tier QA, and Release Governance")
    run_s.font.name = 'Arial'
    run_s.font.size = Pt(11)
    run_s.font.color.rgb = MUTED_GRAY
    
    # Metadata Box
    meta_table = doc.add_table(rows=1, cols=4)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_table.autofit = False
    
    col_widths = [Inches(1.7), Inches(1.7), Inches(1.7), Inches(1.7)]
    headers = [
        ("STANDARD VERSION", "GEWA-AS 2026.1"),
        ("APPLICATION SCOPE", "Universal (Web/Cloud)"),
        ("FIRST TARGET APP", "CHEP College Next.js"),
        ("RELEASE GATING", "Binding Go/No-Go")
    ]
    
    row = meta_table.rows[0]
    for i, (label, val) in enumerate(headers):
        cell = row.cells[i]
        cell.width = col_widths[i]
        set_cell_background(cell, "F1F5F9")
        set_cell_margins(cell, top=120, bottom=120, left=140, right=140)
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        
        r1 = p.add_run(f"{label}\n")
        r1.font.name = 'Arial'
        r1.font.size = Pt(8)
        r1.font.bold = True
        r1.font.color.rgb = MUTED_GRAY
        
        r2 = p.add_run(val)
        r2.font.name = 'Arial'
        r2.font.size = Pt(9.5)
        r2.font.bold = True
        r2.font.color.rgb = NAVY

    doc.add_paragraph().paragraph_format.space_after = Pt(10)

    def add_section_heading(title, number=""):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(16)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        
        if number:
            r_num = p.add_run(f"{number}. ")
            r_num.font.name = 'Arial'
            r_num.font.size = Pt(14)
            r_num.font.bold = True
            r_num.font.color.rgb = EMERALD
            
        r_txt = p.add_run(title)
        r_txt.font.name = 'Arial'
        r_txt.font.size = Pt(14)
        r_txt.font.bold = True
        r_txt.font.color.rgb = NAVY

    def add_subsection_heading(title):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(10)
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.keep_with_next = True
        r = p.add_run(title)
        r.font.name = 'Arial'
        r.font.size = Pt(11.5)
        r.font.bold = True
        r.font.color.rgb = EMERALD

    def add_body_p(text, bold_prefix="", italic=False):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.15
        if bold_prefix:
            r_b = p.add_run(bold_prefix)
            r_b.font.name = 'Arial'
            r_b.font.size = Pt(9.5)
            r_b.font.bold = True
            r_b.font.color.rgb = DARK_GRAY
        r_t = p.add_run(text)
        r_t.font.name = 'Arial'
        r_t.font.size = Pt(9.5)
        r_t.font.italic = italic
        r_t.font.color.rgb = DARK_GRAY
        return p

    def add_bullet(text, bold_prefix=""):
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.line_spacing = 1.15
        if bold_prefix:
            r_b = p.add_run(bold_prefix)
            r_b.font.name = 'Arial'
            r_b.font.size = Pt(9.5)
            r_b.font.bold = True
            r_b.font.color.rgb = DARK_GRAY
        r_t = p.add_run(text)
        r_t.font.name = 'Arial'
        r_t.font.size = Pt(9.5)
        r_t.font.color.rgb = DARK_GRAY

    # SECTION 1
    add_section_heading("EXECUTIVE MANDATE & AUDITOR CHARTER", "1")
    add_body_p("The Global Enterprise Web Application Audit & Release Standard (GEWA-AS) establishes an uncompromising, evidence-based verification protocol to evaluate any web application following the completion of its build phase and prior to live production deployment. It serves as the final barrier against security breaches, data corruption, architectural drift, and broken user journeys.")
    
    add_subsection_heading("1.1 Mandatory Working Rules for Auditors")
    add_bullet(" Never assume code is functional, secure, or production-ready because it compiles, passes linting, or was generated by an AI assistant. Every control must be verified through code inspection, static analysis, or safe reproducible execution.", "Rule 1 (Evidence-Based):")
    add_bullet(" The auditor must conduct a complete discovery and risk assessment before making modifications, updating dependencies, or altering runtime behavior.", "Rule 2 (Audit First, Refactor Later):")
    add_bullet(" Never execute destructive database queries, drop tables, invoke live payment gateways with real funds, send unmocked mass SMS/emails, or trigger live attack traffic against third parties.", "Rule 3 (Zero Destructive Actions):")
    add_bullet(" Under no circumstances may real API secrets, database passwords, session tokens, private keys, or personally identifiable information (PII) be committed to logs, reports, or test fixtures.", "Rule 4 (Credential & PII Redaction):")
    add_bullet(" An unavailable scanner, an unconfigured test runner, or an unexecuted test suite must be explicitly reported as NOT ASSESSED or BLOCKED—never as a pass.", "Rule 5 (No Synthetic Passes):")
    add_bullet(" The audit team holds binding release gating authority. If a Critical or High severity vulnerability remains unresolved, deployment to production is automatically blocked.", "Rule 6 (Release Veto Authority):")

    # SECTION 2
    add_section_heading("FULL-LIFECYCLE SDLC INTEGRATION FRAMEWORK", "2")
    add_body_p("While legacy software audits only inspect syntax at the end of development, this standard integrates the entire Software Development Life Cycle (SDLC) to ensure end-to-end alignment from business requirements to live production maintenance.")
    
    add_subsection_heading("2.1 The 4 SDLC Governance Gates")
    
    sdlc_table = doc.add_table(rows=5, cols=4)
    sdlc_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    sdlc_table.autofit = False
    
    sdlc_widths = [Inches(1.6), Inches(1.8), Inches(1.8), Inches(1.6)]
    sdlc_headers = ["SDLC Gate", "Core Objective", "Required Audit Evidence", "Pass Criteria"]
    
    for i, h in enumerate(sdlc_headers):
        cell = sdlc_table.rows[0].cells[i]
        cell.width = sdlc_widths[i]
        set_cell_background(cell, "102A4D")
        set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
        p = cell.paragraphs[0]
        r = p.add_run(h)
        r.font.name = 'Arial'
        r.font.size = Pt(8.5)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        
    sdlc_data = [
        ("Gate 1: Architecture & RTM", "Verify every business requirement maps to code without orphan or dead features.", "Requirements Traceability Matrix (RTM) linking PRDs to routes.", "100% core journeys mapped; 0 undocumented endpoints."),
        ("Gate 2: Code Quality & Types", "Enforce strict typing, clean architecture, and decoupled persistence layers.", "Compiler strict mode logs (`tsc --noEmit`), ESLint output.", "0 TypeScript compilation errors; 0 unhandled any casts."),
        ("Gate 3: QA & Verification", "Execute multi-tier test pyramid (Unit, Integration, Component, E2E).", "Automated test runner output (Vitest/Jest/Playwright).", "100% critical test pass rate; >80% branch coverage on core logic."),
        ("Gate 4: Release & Rollback", "Ensure safe automated deployment, zero-downtime migrations, and rollbacks.", "CI/CD execution logs, rollback dry-run proof.", "Automated CI pipeline green; one-click rollback validated.")
    ]
    
    for row_idx, data in enumerate(sdlc_data):
        row = sdlc_table.rows[row_idx + 1]
        bg_col = "F8FAFC" if row_idx % 2 == 0 else "FFFFFF"
        for col_idx, text in enumerate(data):
            cell = row.cells[col_idx]
            cell.width = sdlc_widths[col_idx]
            set_cell_background(cell, bg_col)
            set_cell_margins(cell, top=80, bottom=80, left=120, right=120)
            p = cell.paragraphs[0]
            r = p.add_run(text)
            r.font.name = 'Arial'
            r.font.size = Pt(8)
            r.font.color.rgb = DARK_GRAY

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # SECTION 3
    add_section_heading("DEVOPS & DEVSECOPS ENGINEERING SPECIFICATION", "3")
    add_body_p("A robust web application requires automated engineering controls across CI/CD, runtime security, observability, and disaster recovery.")
    
    add_subsection_heading("3.1 Automated CI/CD Release Pipeline")
    add_bullet(" Execution of strict lockfile installation (`npm ci`, `poetry install --frozen-lockfile`) to ensure reproducible builds across environments.", "Deterministic Dependency Install:")
    add_bullet(" Continuous integration step executing static code scanners to detect dangerous AST function calls and vulnerabilities.", "Static Security Analysis (SAST):")
    add_bullet(" Automated dependency scanning (`npm audit --audit-level=high`, `trivy`, `snyk`) to block high/critical CVEs in third-party libraries.", "Software Composition Analysis (SCA):")
    add_bullet(" Pre-commit and CI scanners (`gitleaks`, `trufflehog`) detecting committed secrets, tokens, private keys, or connection strings.", "Secret Detection Gates:")
    add_bullet(" Execution of test suites with automated failure on regression or broken assertions.", "Synchronous Testing Gates:")
    
    add_subsection_heading("3.2 Site Reliability & Observability (SRE)")
    add_bullet(" Dedicated `/api/health` and `/healthz` endpoints verifying process uptime, memory usage, and downstream database connectivity.", "Health & Liveness Probes:")
    add_bullet(" Structured JSON logging with request IDs, HTTP status, and duration, avoiding PII leakage.", "Centralized Structured Telemetry:")
    add_bullet(" Automatic exception tracking and performance tracing via Sentry, Datadog, or OpenTelemetry.", "APM & Error Tracking:")
    add_bullet(" Immutable production bundles with one-click atomic rollback to prior releases on hosting platforms (Vercel, AWS, Kubernetes).", "Instant Rollback Capabilities:")

    # SECTION 4
    add_section_heading("THE 10-PHASE EVIDENCE-BASED AUDIT PROTOCOL", "4")
    add_body_p("Every audit conducted under GEWA-AS must systematically evaluate and provide evidence for all ten phases below:")

    phases = [
        ("Phase 1: Project Discovery & Architecture Inventory", [
            "Framework & Runtime: Identify exact version of Next.js, React, Node.js, Python, or PHP, checking compiler strictness and lockfile status.",
            "Route & Surface Mapping: Enumerate all pages, App Router server/client layouts, public routes, and background jobs.",
            "External Integrations: Identify all databases (PostgreSQL/Supabase), payment gateways (Remita, Paystack), cloud storage, and AI APIs.",
            "Environment Segregation: Verify environment variables; ensure `.env.example` exists without exposed private credentials."
        ]),
        ("Phase 2: Authentication, Session & Identity Security", [
            "Password Hashing: Verify high-work-factor cryptographic hashing (Argon2id, bcrypt; strictly disallow SHA1/MD5/plain text).",
            "Session Management: Audit session creation, renewal, rotation, expiration timeouts, and absolute invalidation upon logout.",
            "Cookie Attributes: Enforce `Secure`, `HttpOnly`, `SameSite=Lax` or `Strict`, and appropriate domain scoping.",
            "Account Enumeration Defense: Verify consistent response timing and generic error messages during login and password recovery.",
            "Brute-Force Protection: Verify rate limiting, exponential backoff, or CAPTCHA on all authentication endpoints.",
            "Mock Authentication Removal: Eliminate all test bypasses, hardcoded user credentials, and backdoor accounts."
        ]),
        ("Phase 3: Authorization, RBAC & Access Control", [
            "Access-Control Matrix: Document every route and Server Action with its intended audience (Public, Student, Faculty, Admin).",
            "Insecure Direct Object References (IDOR/BOLA): Verify users cannot read or modify records belonging to other users by changing ID parameters.",
            "Privilege Escalation: Test whether non-admin users can grant themselves admin permissions via payload manipulation.",
            "Multi-Tenant Isolation: Ensure tenant identifiers are strictly validated on every database read and write.",
            "Server-Side Enforcement: Verify middleware and Server Actions enforce permissions independently of client-side UI visibility."
        ]),
        ("Phase 4: Input Handling, Injection Defense & OWASP Top 10", [
            "SQL / NoSQL Injection: Ensure 100% of database interactions use parameterized queries or trusted ORMs with zero string concatenation.",
            "Cross-Site Scripting (XSS): Audit all dynamic HTML rendering (`dangerouslySetInnerHTML`, `v-html`); enforce context-aware encoding.",
            "Cross-Site Request Forgery (CSRF): Verify anti-CSRF tokens or `SameSite` cookies on all state-mutating requests.",
            "Server-Side Request Forgery (SSRF): Verify user-provided URLs in server fetches are checked against private IP allow/denylists.",
            "Path Traversal & Upload Security: Validate file uploads via magic bytes, enforce size limits, and store outside public roots."
        ]),
        ("Phase 5: Framework-Specific Boundaries & Client/Server Isolation", [
            "Server Components vs Client Components: Verify `'use client'` vs `'use server'` boundaries in Next.js/React architectures.",
            "Server Actions Security: Treat Server Actions as public API endpoints; enforce input validation and authentication checks.",
            "Data Serialization Leaks: Verify database records passed to client components do not leak password hashes or internal keys.",
            "Cache Isolation: Ensure dynamic, user-specific data is not cached across sessions or shared between tenants.",
            "Public Environment Variables: Ensure only non-sensitive variables carry `NEXT_PUBLIC_*` or `VITE_*` prefixes."
        ]),
        ("Phase 6: API Services, Server Actions & Integration Contracts", [
            "Schema Validation: Validate all incoming payloads with schema validation libraries (Zod, Yup, Pydantic).",
            "Rate Limiting & DoS Defense: Implement request throttling and payload size limits on public APIs.",
            "Third-Party Resilience: Implement circuit breakers, timeouts, and fallback handling for payment gateways and external APIs.",
            "Webhook Verification: Verify cryptographic HMAC signatures, timestamp replay windows, and idempotent processing."
        ]),
        ("Phase 7: Database Architecture, Migrations & Data Integrity", [
            "Schema Integrity: Verify primary keys, foreign keys, cascading delete constraints, and proper column nullability.",
            "Duplicate Prevention: Enforce unique constraints on business identifiers (matriculation numbers, emails, transaction refs).",
            "Indexes & Query Optimization: Verify indexes exist on all frequent join, filter, and sort columns.",
            "ACID Transactions: Ensure multi-step business mutations execute within database transactions.",
            "Row-Level Security (RLS): Ensure PostgreSQL/Supabase tables enforce RLS policies for SELECT, INSERT, UPDATE, DELETE."
        ]),
        ("Phase 8: Performance, Core Web Vitals, Reliability & Concurrency", [
            "Client Bundle Size: Eliminate oversized client libraries and unused dependencies to minimize initial JS payload.",
            "Core Web Vitals Compliance: Verify LCP < 2.5s, CLS < 0.1, and INP < 200ms across mobile and desktop viewports.",
            "Image & Asset Optimization: Implement responsive formats (WebP/AVIF), explicit aspect ratios, and CDN caching.",
            "N+1 Query Elimination: Batch and join data fetching routines to avoid unbounded database request loops.",
            "Concurrency Protection: Ensure atomic updates or optimistic locking protect high-contention business actions."
        ]),
        ("Phase 9: Multi-Tier Testing Pyramid Execution", [
            "Unit Tests: Automated verification of calculations, validation schemas, fee logic, and boundary conditions.",
            "Component Tests: Automated DOM assertions verifying form states, error banners, and accessibility attributes.",
            "Integration Tests: Automated verification of Server Actions and API endpoints with mocked external services.",
            "End-to-End (E2E) Tests: Automated browser journeys covering candidate application, CBT exam, and student portal flows.",
            "Security Regression Tests: Automated test suite confirming unauthenticated requests return HTTP 401/403."
        ]),
        ("Phase 10: DevOps CI/CD, Infrastructure & Deployment Readiness", [
            "HTTP Security Headers: Verify CSP, HSTS, X-Frame-Options, X-Content-Type-Options, and Permissions-Policy.",
            "Clean Production Build: Execute `npm run build` in a clean environment and confirm 0 errors.",
            "Local Production Smoke Test: Verify key application pages load cleanly with 0 hydration errors.",
            "Deployment Gate Checklist: Complete the itemized release checklist before authorizing production rollout."
        ])
    ]

    for p_title, p_items in phases:
        add_subsection_heading(p_title)
        for it in p_items:
            pts = it.split(":", 1)
            if len(pts) == 2:
                add_bullet(f" {pts[1]}", f"{pts[0]}:")
            else:
                add_bullet(it)

    # SECTION 5
    add_section_heading("STANDARDIZED AUDIT DELIVERABLES & SCHEMAS", "5")
    add_body_p("Every audit executed under GEWA-AS must generate five standardized artifacts to ensure full auditability and stakeholder transparency:")
    
    delivs = [
        ("Deliverable 1: PRE_DEPLOYMENT_AUDIT.md", "Executive summary, architecture inventory, detailed vulnerability findings with proof-of-concept evidence, access control matrix, remediation plan, and final deployment verdict."),
        ("Deliverable 2: AUDIT_FINDINGS.csv", "Structured, machine-readable register of all findings detailing Finding ID, Category, Severity (Critical/High/Medium/Low/Info), Confidence, File Path, Line Number, Root Cause, Remediation, and Release Blocker flag."),
        ("Deliverable 3: TEST_PLAN.md", "Risk-based testing specification detailing test cases across unit, component, API integration, E2E user journeys, and security regression boundaries."),
        ("Deliverable 4: TEST_EXECUTION_REPORT.md", "Empirical execution record containing exact command lines, process exit codes, passed/failed/skipped test counts, measured code coverage, and failure reproduction logs."),
        ("Deliverable 5: DEPLOYMENT_CHECKLIST.md", "Itemized go/no-go operational release checklist where each item is explicitly evaluated as PASS, FAIL, NOT VERIFIED, or NOT APPLICABLE.")
    ]
    
    for d_title, d_desc in delivs:
        add_bullet(f" {d_desc}", f"{d_title}:")

    # SECTION 6
    add_section_heading("RELEASE DECISION RULES & BLOCKER THRESHOLDS", "6")
    add_body_p("To eliminate subjectivity, the auditor must strictly enforce the following release decision matrix:")
    
    dec_table = doc.add_table(rows=6, cols=3)
    dec_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    dec_table.autofit = False
    
    dec_widths = [Inches(1.8), Inches(2.2), Inches(2.8)]
    dec_headers = ["Severity Rating", "Production Release Status", "Mandatory Action Required"]
    
    for i, h in enumerate(dec_headers):
        cell = dec_table.rows[0].cells[i]
        cell.width = dec_widths[i]
        set_cell_background(cell, "102A4D")
        set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
        p = cell.paragraphs[0]
        r = p.add_run(h)
        r.font.name = 'Arial'
        r.font.size = Pt(8.5)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        
    dec_data = [
        ("CRITICAL", "STRICTLY BLOCKED", "Immediate P0 remediation required. Deployment blocked until re-audited and verified."),
        ("HIGH", "STRICTLY BLOCKED", "Significant security or functional flaw. Deployment blocked until fixed and verified."),
        ("MEDIUM", "CONDITIONALLY PERMITTED", "Deployment permitted only with signed executive waiver and scheduled P1 remediation ticket."),
        ("LOW", "PERMITTED TO RELEASE", "Minor defect or deviation. Scheduled for resolution in subsequent sprint cycle."),
        ("INFORMATIONAL", "PERMITTED TO RELEASE", "Architectural recommendation or code quality suggestion.")
    ]
    
    for row_idx, data in enumerate(dec_data):
        row = dec_table.rows[row_idx + 1]
        bg_col = "F8FAFC" if row_idx % 2 == 0 else "FFFFFF"
        for col_idx, text in enumerate(data):
            cell = row.cells[col_idx]
            cell.width = dec_widths[col_idx]
            set_cell_background(cell, bg_col)
            set_cell_margins(cell, top=80, bottom=80, left=120, right=120)
            p = cell.paragraphs[0]
            r = p.add_run(text)
            r.font.name = 'Arial'
            r.font.size = Pt(8)
            if col_idx == 0:
                r.font.bold = True
                if text == "CRITICAL":
                    r.font.color.rgb = CRIMSON
                elif text == "HIGH":
                    r.font.color.rgb = AMBER
                elif text == "MEDIUM":
                    r.font.color.rgb = NAVY
                else:
                    r.font.color.rgb = EMERALD
            else:
                r.font.color.rgb = DARK_GRAY

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # SECTION 7
    add_section_heading("UNIVERSAL AUDITOR EXECUTION PROMPT", "7")
    add_body_p("The following prompt can be directly copied and executed in any AI coding assistant or provided to an engineering auditor to conduct a comprehensive audit on ANY web application (starting with Target #1: CHEP College of Nursing Sciences):")

    prompt_box = doc.add_table(rows=1, cols=1)
    prompt_box.alignment = WD_TABLE_ALIGNMENT.CENTER
    prompt_box.autofit = False
    cell_p = prompt_box.rows[0].cells[0]
    cell_p.width = Inches(6.8)
    set_cell_background(cell_p, "F1F5F9")
    set_cell_margins(cell_p, top=140, bottom=140, left=160, right=160)
    
    prompt_text = (
        'Act as a Lead Systems Auditor, Senior DevSecOps Engineer, and Principal QA Automation Architect '
        'executing the Global Enterprise Web Application Audit & Release Standard (GEWA-AS).\n\n'
        'Target Application: CHEP College of Nursing Sciences Web Application (or specify target)\n'
        'Environment: Local / Staging / Production\n\n'
        'Conduct a comprehensive, evidence-based, pre-deployment audit of the ENTIRE repository following the GEWA-AS 10-Phase Protocol:\n'
        '• Phase 1: Project Discovery & Architecture Inventory\n'
        '• Phase 2: Authentication, Session & Identity Security\n'
        '• Phase 3: Authorization, RBAC & Access Control Matrix\n'
        '• Phase 4: Input Handling, Injection Defense & OWASP Top 10\n'
        '• Phase 5: Client/Server Boundaries & Serialization Leakage\n'
        '• Phase 6: API Services, Server Actions & Integration Contracts\n'
        '• Phase 7: Database Architecture, Migrations & Data Integrity\n'
        '• Phase 8: Performance, Core Web Vitals & Concurrency\n'
        '• Phase 9: Multi-Tier Test Suite Execution\n'
        '• Phase 10: DevOps CI/CD, Infrastructure & Deployment Readiness\n\n'
        'Follow the GEWA-AS Non-Negotiable Working Rules:\n'
        '1. Audit first. Do not silently modify or alter application behavior.\n'
        '2. Provide concrete evidence (file paths, line numbers, code snippets, execution outputs) for every finding.\n'
        '3. Never expose secrets or PII in logs or deliverables.\n'
        '4. Execute non-destructive tests only; use synthetic fixtures and mocks for external providers.\n'
        '5. Generate all 5 standard deliverables:\n'
        '   - PRE_DEPLOYMENT_AUDIT.md\n'
        '   - AUDIT_FINDINGS.csv\n'
        '   - TEST_PLAN.md\n'
        '   - TEST_EXECUTION_REPORT.md\n'
        '   - DEPLOYMENT_CHECKLIST.md\n\n'
        'Begin Phase 1 discovery immediately.'
    )
    
    p_box = cell_p.paragraphs[0]
    p_box.paragraph_format.line_spacing = 1.15
    r_pb = p_box.add_run(prompt_text)
    r_pb.font.name = 'Consolas'
    r_pb.font.size = Pt(8.5)
    r_pb.font.color.rgb = DARK_GRAY

    # Save document
    output_path = os.path.join(os.getcwd(), "GLOBAL_ENTERPRISE_WEB_APP_AUDIT_STANDARD.docx")
    doc.save(output_path)
    print(f"Successfully generated: {output_path}")

if __name__ == "__main__":
    create_global_audit_document()
