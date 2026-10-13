import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

def set_cell_background(cell, hex_color):
    """Set background color of a table cell."""
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_color)
    tc_pr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    """Set inner padding for table cell."""
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_mar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tc_mar.append(node)
    tc_pr.append(tc_mar)

def create_document():
    doc = Document()
    
    # Page setup - 1 inch margins
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)
        
    # Color palette
    PRIMARY_COLOR = RGBColor(16, 74, 50)      # Forest Dark #104a32
    SECONDARY_COLOR = RGBColor(34, 113, 177)  # Blue #2271b1
    TEXT_DARK = RGBColor(30, 41, 59)          # Slate #1e293b
    TEXT_MUTED = RGBColor(100, 116, 139)      # Slate #64748b
    
    # ----------------------------------------------------
    # DOCUMENT HEADER / TITLE
    # ----------------------------------------------------
    title_p = doc.add_paragraph()
    title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title_run = title_p.add_run("CHEP COLLEGE OF NURSING SCIENCES\n")
    title_run.font.name = "Georgia"
    title_run.font.size = Pt(22)
    title_run.font.bold = True
    title_run.font.color.rgb = PRIMARY_COLOR
    
    subtitle_run = title_p.add_run("Institutional Management System (CHEP-IMS Core v6.7)\nAdministrative Senate Handbook & Security Manual\n")
    subtitle_run.font.name = "Arial"
    subtitle_run.font.size = Pt(13)
    subtitle_run.font.bold = True
    subtitle_run.font.color.rgb = SECONDARY_COLOR
    
    meta_run = title_p.add_run("Accredited by the Nursing & Midwifery Council of Nigeria (NMCN)\nOgun-OTA-041 Security Node • Session 2026/2027\n")
    meta_run.font.name = "Arial"
    meta_run.font.size = Pt(10)
    meta_run.font.italic = True
    meta_run.font.color.rgb = TEXT_MUTED

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # ----------------------------------------------------
    # 1. EXECUTIVE OVERVIEW & SECURITY RATIONALE
    # ----------------------------------------------------
    h1 = doc.add_heading("1. Executive Overview & Security Route Re-Architecture", level=1)
    h1.style.font.color.rgb = PRIMARY_COLOR
    h1.style.font.name = "Georgia"

    p1 = doc.add_paragraph(
        "To safeguard sensitive institutional records, candidate credentials, and NMCN matriculation ledgers, "
        "the college management system has been re-architected under the proprietary institutional title "
    )
    p1.add_run("CHEP Institutional Management System (CHEP-IMS)").bold = True
    p1.add_run(". All generic terminology has been eradicated in favor of statutory healthcare nomenclatures.")

    p2 = doc.add_paragraph()
    p2.add_run("Security Obfuscation of the Administrative Route:\n").bold = True
    p2.add_run(
        "Standard administrative endpoints (such as '/admin') are notorious vectors for automated credential stuffing, "
        "dictionary attacks, and vulnerability scanners. In strict accordance with institutional security directives, "
        "the administrative backend has been moved to a covert route: "
    )
    p2.add_run("/iloro\n").bold = True
    p2.add_run(
        "Any external requests probing the legacy '/admin' URL are automatically deflected to the public homepage with "
        "zero cryptographic or architectural footprint exposed."
    )

    # ----------------------------------------------------
    # 2. BACKEND ACCESS GUIDE & DEFAULT CREDENTIALS
    # ----------------------------------------------------
    h2 = doc.add_heading("2. Backend Access Guide & Credentials", level=1)
    h2.style.font.color.rgb = PRIMARY_COLOR
    h2.style.font.name = "Georgia"

    p_url = doc.add_paragraph()
    p_url.add_run("Official Endpoint URLs:\n").bold = True
    p_url.add_run("• Production Live Deployment: ").bold = True
    p_url.add_run("https://chepnursingcollege.vercel.app/iloro\n")
    p_url.add_run("• Local Development Server: ").bold = True
    p_url.add_run("http://localhost:3000/iloro\n")

    doc.add_paragraph("Pre-Configured Administrative Roster & Credentials:").bold = True

    # Credentials Table
    table_cred = doc.add_table(rows=1, cols=4)
    table_cred.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_cred.style = 'Table Grid'
    
    headers = ["Institutional Role", "Official Email / Username", "Default Passkey", "Assigned Authority"]
    for i, title in enumerate(headers):
        cell = table_cred.rows[0].cells[i]
        set_cell_background(cell, "104A32")
        p = cell.paragraphs[0]
        r = p.add_run(title)
        r.font.name = "Arial"
        r.font.size = Pt(9.5)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)

    cred_data = [
        ("Super Administrator (Provost)", "provost@chepnursingcollege.org", "chep2026admin", "Executive Senate Oversight, Cache & Users"),
        ("Academic Registrar (Editor)", "registrar@chepnursingcollege.org", "chep2026registrar", "Admissions Dossier, Press Dispatches, Media"),
        ("Faculty Preceptor", "faculty@chepnursingcollege.org", "chep2026faculty", "Question Bank, OSCE Rubrics, Reflection Audit"),
        ("Bursar / Finance Officer", "bursar@chepnursingcollege.org", "chep2026bursar", "Remita RRR Verification & Fee Clearances")
    ]

    for row_idx, data in enumerate(cred_data):
        row = table_cred.add_row()
        bg = "F8FAFC" if row_idx % 2 == 1 else "FFFFFF"
        for col_idx, text in enumerate(data):
            cell = row.cells[col_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, 120, 120, 150, 150)
            p = cell.paragraphs[0]
            r = p.add_run(text)
            r.font.name = "Arial"
            r.font.size = Pt(9)
            if col_idx in [0, 2]:
                r.font.bold = True

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # ----------------------------------------------------
    # 3. AUTHENTICATION LIFECYCLE: SIGN IN, SIGN OUT, FORGOT PASSWORD
    # ----------------------------------------------------
    h3 = doc.add_heading("3. Authentication Lifecycle & Security Protocols", level=1)
    h3.style.font.color.rgb = PRIMARY_COLOR
    h3.style.font.name = "Georgia"

    doc.add_paragraph("A. Sign In Protocol:").bold = True
    doc.add_paragraph(
        "1. Direct your browser to https://chepnursingcollege.vercel.app/iloro.\n"
        "2. Input your verified institutional address (e.g. provost@chepnursingcollege.org) and secret passkey.\n"
        "3. Select your institutional role from the security dropdown (Super Administrator, Registrar, Faculty, or Bursar).\n"
        "4. Click 'Sign In to Institutional Suite'. The system validates the NMCN node session token and unlocks the Senate workspace."
    )

    doc.add_paragraph("B. Sign Out Protocol:").bold = True
    doc.add_paragraph(
        "1. In the upper-right corner of the Senate header bar, click on your authenticated identity profile.\n"
        "2. Select 'Sign Out' (highlighted in red) from the profile menu.\n"
        "3. The active cryptographic session is immediately revoked, local tokens are cleared, and the screen returns to the locked login gate."
    )

    doc.add_paragraph("C. Forgot Password & Emergency PIN Recovery Protocol:").bold = True
    doc.add_paragraph(
        "If an administrative officer loses access to their credentials, the dual-tier recovery framework executes:\n"
        "1. Automated Digital Dispatch: Click 'Forgot Password?' on the /iloro gateway. Enter your registered email. "
        "An encrypted single-use 24-hour reset token is dispatched to your institutional inbox.\n"
        "2. Physical Senate Attestation: If email access is compromised, present your NMCN Council Staff Identification "
        "to the Academic Registry & ICT Directorate (enquiries@chepnursingcollege.org) for a 24-hour emergency bypass PIN."
    )

    # ----------------------------------------------------
    # 4. USER ROLES, PERMISSIONS & BENEFITS MATRIX
    # ----------------------------------------------------
    h4 = doc.add_heading("4. Role-Based Access Control (RBAC) & Benefits Matrix", level=1)
    h4.style.font.color.rgb = PRIMARY_COLOR
    h4.style.font.name = "Georgia"

    doc.add_paragraph(
        "The CHEP Institutional Management System operates on strict Role-Based Access Control (RBAC) to enforce "
        "principle of least privilege and NMCN statutory governance."
    )

    # Roles Table
    table_roles = doc.add_table(rows=1, cols=4)
    table_roles.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_roles.style = 'Table Grid'

    role_headers = ["Institutional Role", "Target Personnel", "Operational Permissions", "Strategic Benefits"]
    for i, title in enumerate(role_headers):
        cell = table_roles.rows[0].cells[i]
        set_cell_background(cell, "104A32")
        p = cell.paragraphs[0]
        r = p.add_run(title)
        r.font.name = "Arial"
        r.font.size = Pt(9.5)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)

    roles_data = [
        (
            "Super Administrator",
            "College Provost, Deputy Provost, Rector",
            "• Full Read/Write/Delete permissions.\n• Final admission approval & NMCN indexing clearance.\n• Purge Serverless Edge & CDN Cache.\n• User account creation, role assignment, and privilege revocation.\n• System diagnostics and full JSON archival backups.",
            "Complete executive oversight, statutory compliance guarantee, unilateral institutional command."
        ),
        (
            "Academic Registrar (Editor)",
            "Registrar, Academic Affairs Officers, Admissions Committee",
            "• Publish official Senate press dispatches and bulletins.\n• Review candidate applications & O'Level verification.\n• Export council-formatted NMCN Admissions Ledgers to CSV.\n• Upload campus media assets and simulation lab documentation.",
            "Eliminates admissions backlogs, provides paperless workflows, instant NMCN matriculation lists."
        ),
        (
            "Faculty Lecturer / Examiner",
            "Departmental Heads, Senior Nurse Educators",
            "• Author & update CBT question banks (100L–500L).\n• Establish scoring keys & NMCN essay grading rubrics.\n• Configure timed OSCE clinical simulation stations.\n• Catalog eBooks & journals in the eLibrary OPAC.",
            "Automated question scrambling, zero exam leakage, standardized clinical OSCE assessment."
        ),
        (
            "Clinical Preceptor",
            "Hospital Rotations Matrons, Ward In-Charges",
            "• Moderate student clinical reflections.\n• Audit automated HIPAA/NDPR patient identifier (PHI) scrubbing.\n• Sign off bedside clinical hours and procedure logs.",
            "Legally compliant reflective learning, ethical protection of patient privacy, verified clinical hours."
        ),
        (
            "Bursar / Finance Officer",
            "College Bursar, Accounts Directorate",
            "• Audit Remita RRR transaction receipts.\n• Approve screening fee and tuition payment status.\n• Export financial clearance records for Senate lists.",
            "Eradicates school fee fraud, enables real-time bank reconciliation, ensures transparent accounting."
        ),
        (
            "Student Nurse / Candidate",
            "Enrolled Students, Applicants (via /portal)",
            "• Self-service course registration.\n• Download exam clearance passes & screening slips.\n• Log clinical procedure hours.\n• Take practice CBT mock exams & review eLibrary holdings.",
            "24/7 academic autonomy, continuous exam readiness, seamless transcript verification."
        )
    ]

    for row_idx, data in enumerate(roles_data):
        row = table_roles.add_row()
        bg = "F8FAFC" if row_idx % 2 == 1 else "FFFFFF"
        for col_idx, text in enumerate(data):
            cell = row.cells[col_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, 120, 120, 150, 150)
            p = cell.paragraphs[0]
            r = p.add_run(text)
            r.font.name = "Arial"
            r.font.size = Pt(8.5)
            if col_idx == 0:
                r.font.bold = True

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # ----------------------------------------------------
    # 5. CAMPUS SUBDOMAIN RE-ORGANIZATION
    # ----------------------------------------------------
    h5 = doc.add_heading("5. Digital Campus Subdomain Gateways", level=1)
    h5.style.font.color.rgb = PRIMARY_COLOR
    h5.style.font.name = "Georgia"

    doc.add_paragraph(
        "To reflect international Ivy-League and global healthcare university standards, all digital campus services "
        "are segregated into clean subdomain gateways:"
    )

    table_sub = doc.add_table(rows=1, cols=3)
    table_sub.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_sub.style = 'Table Grid'

    sub_headers = ["Subdomain Host", "Service Functionality", "Accessible Route"]
    for i, title in enumerate(sub_headers):
        cell = table_sub.rows[0].cells[i]
        set_cell_background(cell, "104A32")
        p = cell.paragraphs[0]
        r = p.add_run(title)
        r.font.name = "Arial"
        r.font.size = Pt(9.5)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)

    sub_data = [
        ("iloro.chep", "Institutional Senate Suite (Restricted Administrative Core)", "/iloro"),
        ("exams.chep", "CBT Examination & OSCE Simulation Studio (314 Questions)", "/exams"),
        ("library.chep", "Virtual eLibrary & AI Care-Plan Engine (480+ Texts)", "/library"),
        ("reflections.chep", "Protected Reflective Clinical Forum (Gibbs + Auto PHI Scrubber)", "/clinical-reflections"),
        ("verify.chep", "Credential Verification Engine (Graduate & License Verification)", "/verify"),
        ("portal.chep", "Student e-Logbook & Course Registration LMS", "/portal/student"),
        ("faculty.chep", "Faculty Preceptor & Clinical Procedure Desk", "/portal/faculty")
    ]

    for row_idx, data in enumerate(sub_data):
        row = table_sub.add_row()
        bg = "F8FAFC" if row_idx % 2 == 1 else "FFFFFF"
        for col_idx, text in enumerate(data):
            cell = row.cells[col_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, 120, 120, 150, 150)
            p = cell.paragraphs[0]
            r = p.add_run(text)
            r.font.name = "Arial"
            r.font.size = Pt(9)
            if col_idx == 0:
                r.font.bold = True
                r.font.color.rgb = SECONDARY_COLOR

    doc.add_paragraph().paragraph_format.space_after = Pt(16)

    # ----------------------------------------------------
    # SIGN-OFF BLOCK
    # ----------------------------------------------------
    sign_p = doc.add_paragraph()
    sign_p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    sign_p.add_run("ISSUED BY AUTHORITY OF THE COLLEGE SENATE\n").bold = True
    sign_p.add_run("Office of the Provost & Academic Affairs Registry\n")
    sign_p.add_run("CHEP College of Nursing Sciences, Ota, Ogun State\n")
    sign_p.add_run("NMCN Accreditation Reference Node: Ogun-OTA-041\n").italic = True

    # Save to public downloads and root
    os.makedirs("public/downloads", exist_ok=True)
    public_path = "public/downloads/CHEP_College_Institutional_Management_System_Handbook.docx"
    root_path = "CHEP_College_Institutional_Management_System_Handbook.docx"
    
    doc.save(public_path)
    doc.save(root_path)
    print(f"Generated DOCX at: {public_path} and {root_path}")

if __name__ == "__main__":
    create_document()
