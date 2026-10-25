# GLOBAL ACCREDITATION STANDARD & MASTER SPECIFICATION
# AUTONOMOUS COMPUTER-ASSISTED OBJECTIVE STRUCTURED CLINICAL EXAMINATION (CAOSCE)
**Document Identification:** GLOBAL-CAOSCE-STD-2026-V3  
**Statutory Authority & Benchmarks:**
- Nursing and Midwifery Council of Nigeria (NMCN) Act, Cap N143 Laws of the Federation of Nigeria (LFN) 2004
- NMCN National Curriculum and Guidelines for Nursing and Midwifery Education
- World Health Organization (WHO) Global Standards for the Initial Education of Professional Nurses and Midwives
- International Council of Nurses (ICN) Nursing Competency Framework
- Association for Medical Education in Europe (AMEE) Medical Education Guide No. 81 (OSCE Best Practices)
- National Council of State Boards of Nursing (NCSBN) Clinical Judgment Measurement Model (CJMM / NGN)
- International Association for Clinical Simulation and Learning (INACSL) Healthcare Simulation Standards of Best Practice

**Execution Paradigm:** 100% Fully Online & Autonomous (Zero Human Intervention Required)  
**Applicability:** Professional Licensure Examinations, Hospital Credentialing, University Nursing Faculties, and Global Clinical Assessment Platforms

---

## 1. REGULATORY GOVERNANCE & STATUTORY FRAMEWORK

### 1.1 NMCN Statutory Alignment & Mandate
Under the **Nursing and Midwifery Council of Nigeria (NMCN) Act, Cap N143 LFN 2004**, the council is statutorily empowered to determine the knowledge and skills to be attained by persons seeking to become registered nurses and midwives, and to maintain registers and issue practicing licenses.
In accordance with NMCN Examination Committee directives, clinical competence assessment must demonstrate:
1. **Content Validity:** Proportional coverage across the core clinical nursing specialties (Medical-Surgical, Maternal/Obstetrics, Child Health/Pediatrics, Mental Health/Psychiatry, Community/Public Health, and Emergency/Trauma).
2. **Objectivity & Standardization:** Every candidate must be presented with identical clinical stimuli, standardized simulated patient profiles, identical timing, and an unvarying, criterion-referenced assessment rubric.
3. **Dual Competency Validation:** Clinical examinations must assess both the **psychomotor execution** of hands-on procedures and the **underlying clinical rationale, pathophysiology, and pharmacological safety** governing clinical decisions.

### 1.2 International Benchmarks (WHO, ICN, AMEE)
- **AMEE Guide No. 81:** Demands systematic station construction, blueprinting against curriculum outcomes, rigorous standard-setting, and elimination of examiner bias.
- **NCSBN Clinical Judgment Measurement Model (NCLEX-RN / NGN):** Evaluates clinical judgment through 6 cognitive functions: (1) Recognize Cues, (2) Analyze Cues, (3) Prioritize Hypotheses, (4) Generate Solutions, (5) Take Action, and (6) Evaluate Outcomes.
- **INACSL Simulation Standards:** Requires standardized environmental fidelity, psychological safety, and authentic patient-centered scenarios.

### 1.3 Professional Codes & Ethics
All clinical stations and automated proctoring mechanisms adhere to:
- The NMCN Code of Professional Conduct for Nurses and Midwives.
- The ICN Code of Ethics for Nurses.
- Patient Autonomy, Informed Consent, Confidentiality (NDPR / GDPR), and the Principle of Non-Maleficence (*Primum non nocere*).

---

## 2. PSYCHOMETRIC RIGOR & STANDARD-SETTING METHODOLOGY

### 2.1 Reliability Benchmark
- The global standard for high-stakes licensure clinical examinations mandates a **Generalizability Coefficient ($G$-coefficient)** or **Cronbach's alpha ($\alpha$) $\ge 0.80$**.
- To achieve this reliability threshold without human examiner variance, this CAOSCE replaces subjective examiner scoring with a deterministic, objective behavioral checklist verified through interactive clinical actions and paired with psychometrically calibrated MCQs.

### 2.2 Standard-Setting: Modified Angoff & Borderline Regression
- Pass marks are established using criterion-referenced methodology:
  1. **Modified Angoff Method:** A panel of NMCN Nurse Educators and clinical preceptors evaluates each checklist item and MCQ to estimate the proportion of "minimally competent candidates" (MCC) who would execute the step correctly.
  2. **NMCN Regulatory Pass Mark:** The council benchmark is established at **50.0% composite score** across each station and the aggregate exam.
  3. **NMCN Distinction Mark:** Awarded to candidates attaining **$\ge 75.0\%$ aggregate score** with no critical safety failures.

### 2.3 Non-Negotiable Patient Safety & Fatal Error Policy ("Red Flag" Criteria)
In healthcare licensure, technical skill without patient safety constitutes gross malpractice. Each station incorporates predefined **Critical Fail Steps (Red Flags)**:
- Examples: Administering oxytocin without excluding a second twin; performing a head-tilt in cervical spine trauma; administering a spoiled VVM Stage 4 vaccine; breaching surgical asepsis during central line care.
- **Regulatory Consequence:** If a candidate commits or omits a critical fail step:
  - The station practical score is capped at a maximum of 49% (Automatic Station Referral).
  - The candidate's final result slip prominently flags the **Critical Patient Safety Violation** with remedial clinical directives.

---

## 3. TIMING MATRIX & SEQUENTIAL CIRCUIT ENGINE

### 3.1 Strict Station Schedulability
The CAOSCE circuit consists of **6 distinct clinical stations**. Every station operates on an immutable, clock-synchronized lockstep schedule:

$$\begin{array}{|l|l|c|l|}
\hline
\textbf{Phase} & \textbf{Component} & \textbf{Allocated Time} & \textbf{Autonomous System Behavior} \\
\hline
\text{Phase 1} & \text{Practical Clinical Exam} & \text{10 Minutes (600s)} & \text{Door brief, patient dossier, equipment, interactive checklist.} \\
\hline
\text{Alert} & \text{Warning Bell} & \text{At 2 Minutes Remaining} & \text{Amber flashing banner + single acoustic chime (750 Hz).} \\
\hline
\text{Phase 2} & \text{Station Linked MCQs} & \text{10 Minutes (600s)} & \text{10 scenario-specific questions (60s/Q). Immediate lock of Phase 1.} \\
\hline
\text{Phase 3} & \text{Station Rotation Bell} & \text{30 Seconds (30s)} & \text{Double acoustic chime (1000 Hz). Transition to Station } N+1. \\
\hline
\end{array}$$

### 3.2 Aggregate Circuit Metrics:
- **Duration per Station:** 20 Minutes (10m Practical + 10m MCQ)
- **Total Station Stations:** 6 Stations
- **Total Examination Time:** 120 Minutes (2.0 Hours)
- **Total Questions:** 60 Scenario-Linked MCQs + 60 Practical Competency Checkpoints

```
[Candidate Verification Lobby]
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                   STATION 1: MEDICAL-SURGICAL               │
│  [Practical: 10 mins]  ──►  [10 MCQs: 10 mins]  ──► [30s Bell]
└─────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                   STATION 2: MATERNAL & OBSTETRIC           │
│  [Practical: 10 mins]  ──►  [10 MCQs: 10 mins]  ──► [30s Bell]
└─────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                   STATION 3: PEDIATRIC & NEONATAL           │
│  [Practical: 10 mins]  ──►  [10 MCQs: 10 mins]  ──► [30s Bell]
└─────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                   STATION 4: MENTAL HEALTH & PSYCHIATRY     │
│  [Practical: 10 mins]  ──►  [10 MCQs: 10 mins]  ──► [30s Bell]
└─────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                   STATION 5: COMMUNITY & PUBLIC HEALTH      │
│  [Practical: 10 mins]  ──►  [10 MCQs: 10 mins]  ──► [30s Bell]
└─────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                   STATION 6: EMERGENCY & TRAUMA             │
│  [Practical: 10 mins]  ──►  [10 MCQs: 10 mins]  ──► [30s Bell]
└─────────────────────────────────────────────────────────────┘
             │
             ▼
[Official NMCN Composite Board Result Slip & Cryptographic Transcript]
```

---

## 4. ZERO-HUMAN-INTERVENTION AUTONOMOUS PROCTORING

To eliminate human bias, examiner fatigue, and geographical barriers, the system operates completely autonomously under the following technical constraints:

### 4.1 Automated Digital Invigilation Protocol
1. **Candidate Identity & Biometric Verification:**
   - Pre-exam verification captures candidate full name, NMCN Index Number, institution of study, and biometric/webcam confirmation.
   - Integrity token is generated and bound to the candidate's active session.
2. **Kiosk Mode / Browser Focus Enforcement:**
   - Full-screen enforcement: Any window blur, tab switch, or navigation attempt is captured as a proctoring infraction.
   - Clipboard access, copy-pasting, right-clicking, and developer tools are programmatically restricted.
3. **Synchronized Clock Authority:**
   - Timers are authoritative and synchronized against server UTC time.
   - Client-side clock manipulation is immediately detected and rejected.
4. **Deterministic Sequential State Machine:**
   - **No Forward Previewing:** Candidate cannot inspect Station 2 while Station 1 is active.
   - **No Backward Modification:** Once a station phase is submitted or timed out, the state is cryptographically hashed and sealed into the session record.
   - **Fail-Safe Persistence:** In the event of catastrophic local power or network failure, local cache immediately restores the candidate to their exact remaining seconds upon reconnection without loss of submitted steps.

---

## 5. THE SIX CORE NURSING PRACTICE DOMAINS (COMPREHENSIVE DOSSIERS)

---

### STATION 1: MEDICAL-SURGICAL NURSING (ADULT HEALTH)
- **Domain Specialization:** Acute Adult Care, Surgical Asepsis, Sepsis Screening & CLABSI Prevention
- **Station Duration:** 10 Minutes Practical | 10 Minutes MCQ
- **Clinical Scenario:**
  > A 48-year-old male is on Post-Operative Day 4 following an emergency exploratory laparotomy for perforated gangrenous appendicitis. He suddenly develops worsening periumbilical throbbing pain, chills, and diaphoresis. On examination, the surgical dressing is saturated with yellow foul-smelling purulent discharge. A triple-lumen subclavian central venous catheter is in situ in the right infraclavicular fossa.
- **Entry Vital Signs:**
  - Blood Pressure: $138/86\text{ mmHg}$
  - Heart Rate: $104\text{ bpm (Sinus Tachycardia)}$
  - Respiratory Rate: $22\text{ cpm}$
  - Temperature: $38.6\ ^\circ\text{C (Febrile)}$
  - $\text{SpO}_2$: $97\%\text{ on ambient air}$
  - Numeric Pain Rating: $7/10$
- **Standardized Equipment Tray (NMCN Standard):**
  Sterile standard dressing pack (dissecting forceps, tissue forceps, gallipots, sterile gauze swabs), sterile gloves (sizes 7.0/7.5), sterile normal saline $0.9\%$ ($500\text{ mL}$), sterile Amies transport swab with transport medium, $2\%$ chlorhexidine gluconate in $70\%$ isopropyl alcohol applicator, transparent polyurethane semi-permeable adhesive dressing (Tegaderm), clinical biohazard waste bag (Yellow), rigid sharps disposal receptacle, face shield with surgical visor.
- **10-Step Psychomotor Checklist & Points Allocation:**
  1. *Step 1 (10 pts) [CRITICAL FAIL]:* Verify patient identity using 2 unique identifiers (Full Name & Hospital Number), confirm allergy history, explain procedure, and obtain informed consent.
  2. *Step 2 (10 pts):* Perform hand hygiene according to WHO 5 Moments (6-step method, minimum 20s) and don clean procedural gloves and plastic apron.
  3. *Step 3 (10 pts):* Gently remove soiled outer dressing parallel to skin tension lines, inspect and verbalize exudate characteristics (color, volume, odor, consistency), and discard dressing into yellow biohazard bag.
  4. *Step 4 (10 pts):* Doff soiled clean gloves, perform alcohol hand rub, and open sterile dressing pack maintaining a pristine 1-inch sterile margin.
  5. *Step 5 (10 pts) [CRITICAL FAIL]:* Don sterile surgical gloves using strict aseptic technique without touching the outer sterile surfaces with bare skin.
  6. *Step 6 (10 pts):* Cleanse surgical wound with sterile $0.9\%$ normal saline using single downward strokes from least contaminated to most contaminated zone, discarding each swab after one stroke.
  7. *Step 7 (10 pts) [CRITICAL FAIL]:* Collect microbiological specimen using the Levine technique (rotating swab tip over $1\text{ cm}^2$ of clean granulation tissue with sufficient pressure to express wound fluid) avoiding superficial necrotic slough and intact skin edges.
  8. *Step 8 (10 pts):* Apply sterile non-adherent primary wound contact layer, cover with absorbent secondary gauze, and secure with hypoallergenic surgical tape.
  9. *Step 9 (10 pts):* Inspect central line insertion site for phlebitis/erythema, disinfect with $2\%$ chlorhexidine in $70\%$ alcohol using friction scrub for 30s, allow to air dry completely without fanning, and apply sterile transparent dressing.
  10. *Step 10 (10 pts):* Safely dispose of biohazard waste and sharps, remove PPE, perform terminal hand hygiene, document procedure details, and re-evaluate patient comfort.
- **10 Linked Cognitive MCQs (Bloom's Taxonomy / NMCN Licensure):**
  1. *Q1 (Application):* Clinical superiority of the Levine wound swab technique over the Z-stroke technique.
  2. *Q2 (Knowledge):* Mandatory minimum air-drying time for $2\%$ chlorhexidine in $70\%$ alcohol to prevent chemical burns and ensure full bactericidal action ($30\text{--}120\text{ seconds}$).
  3. *Q3 (Analysis):* qSOFA sepsis criteria interpretation ($\text{RR} \ge 22\text{ cpm}$, altered mentation, $\text{systolic BP} \le 100\text{ mmHg}$).
  4. *Q4 (Comprehension):* Cellular characteristics of the proliferative phase of wound healing (fibroblasts, angiogenesis, granulation tissue).
  5. *Q5 (Synthesis/Emergency):* Immediate emergency management of abdominal wound evisceration (warm saline-soaked sterile gauze, low Fowler's with knees flexed, immediate surgical notification; do not reduce).
  6. *Q6 (Pharmacology):* Therapeutic drug monitoring criteria for aminoglycosides (Gentamicin peak and trough levels to prevent ototoxicity and nephrotoxicity).
  7. *Q7 (Infection Control):* CDC/NMCN dressing change schedule for central venous lines (transparent dressings every 7 days; gauze dressings every 48 hours unless soiled).
  8. *Q8 (Application):* Directional cleansing sequence for sutured primary surgical wounds (top to bottom along suture line, then lateral borders).
  9. *Q9 (Analysis):* Laboratory biomarkers indicative of severe sepsis in post-operative patients (serum lactate $> 2.0\text{ mmol/L}$, procalcitonin elevation, leukocytosis with left shift).
  10. *Q10 (Biosafety):* Universal healthcare color-coding for clinical infectious waste incineration (Yellow bags for infectious blood-soaked items).

---

### STATION 2: MATERNAL & OBSTETRIC NURSING (MIDWIFERY)
- **Domain Specialization:** Intrapartum Midwifery, Active Management of 3rd Stage of Labour (AMTSL) & PPH Management
- **Station Duration:** 10 Minutes Practical | 10 Minutes MCQ
- **Clinical Scenario:**
  > A 27-year-old Gravida 3 Para 2 mother has just given birth to a vigorous $3.4\text{ kg}$ infant boy at 39 weeks gestation following an uneventful second stage of labour. The baby has been placed prone on the mother's abdomen in skin-to-skin contact, dried, and the cord clamped and cut. You are the registered nurse-midwife conducting the third stage of labour.
- **Entry Vital Signs:**
  - Blood Pressure: $116/74\text{ mmHg}$
  - Heart Rate: $82\text{ bpm}$
  - Respiratory Rate: $18\text{ cpm}$
  - Temperature: $36.8\ ^\circ\text{C}$
  - $\text{SpO}_2$: $99\%\text{ on ambient air}$
- **Standardized Equipment Tray (NMCN Standard):**
  Ampoule of Oxytocin (10 International Units), sterile $2\text{ mL}$ syringe with $21\text{G}/23\text{G}$ needle, sterile delivery gloves, waterproof apron and face mask, kidney dish/placenta receptacle, sterile Spencer Wells artery forceps, calibrated blood collection drape (V-drape with volumetric pouch), sterile gauze swabs, $70\%$ alcohol swab.
- **10-Step Psychomotor Checklist & Points Allocation:**
  1. *Step 1 (10 pts) [CRITICAL FAIL]:* Palpate the maternal abdomen immediately following birth to definitively rule out the presence of an undiagnosed second twin prior to administering any uterotonic drug.
  2. *Step 2 (10 pts):* Administer 10 International Units (IU) of Oxytocin intramuscularly into the vastus lateralis muscle of the maternal thigh within 1 minute of fetal delivery.
  3. *Step 3 (10 pts):* Observe closely for clinical signs of placental separation (lengthening of the umbilical cord, sudden trickle/gush of blood, uterine fundus rising and becoming globular).
  4. *Step 4 (10 pts) [CRITICAL FAIL]:* Place one hand above the pubic symphysis applying firm upward counter-traction on the lower uterine segment while the other hand grasps the umbilical cord clamp.
  5. *Step 5 (10 pts):* Perform gentle, steady downward Controlled Cord Traction (CCT) strictly during a uterine contraction, following the curve of the birth canal.
  6. *Step 6 (10 pts):* As the placenta emerges at the vulva, cup it in both hands and gently twist it in a continuous circular motion to peel the fetal membranes intact without tearing.
  7. *Step 7 (10 pts):* Immediately perform vigorous fundal massage through the abdominal wall until the uterus is hard, round, and firmly contracted at the level of the umbilicus.
  8. *Step 8 (10 pts):* Inspect the maternal surface of the placenta systematically: verify all 15-20 cotyledons are present and fit together without missing lobules.
  9. *Step 9 (10 pts):* Inspect the fetal surface, cord insertion, 3 umbilical vessels (2 arteries, 1 vein), and examine amnion and chorion for completeness.
  10. *Step 10 (10 pts):* Measure cumulative blood loss using the calibrated V-drape, inspect birth canal for lacerations, confirm mother and newborn stability, dispose of sharps, and document findings.
- **10 Linked Cognitive MCQs (Bloom's Taxonomy / NMCN Licensure):**
  1. *Q1 (Comprehension):* Physiological hazard of failing to palpate for a second twin prior to oxytocin injection (hypertonic uterine contractions causing intrauterine fetal asphyxia or rupture).
  2. *Q2 (Knowledge):* WHO/NMCN first-line drug and dose for AMTSL (Oxytocin 10 IU IM).
  3. *Q3 (Analysis):* Distinguishing clinical signs of placental separation vs active cervical laceration.
  4. *Q4 (Pathophysiology):* Mechanism and life-threatening consequences of acute uterine inversion resulting from cord traction without suprapubic counter-traction.
  5. *Q5 (Knowledge):* The '4 T's' of postpartum hemorrhage and the predominant etiology (Tone / Uterine atony accounting for $70\text{--}80\%$ of cases).
  6. *Q6 (Pharmacology/Contraindication):* Strict contraindication of Ergometrine in pre-eclamptic or hypertensive clients (vasoconstriction leading to hypertensive encephalopathy).
  7. *Q7 (Comprehension):* Pathophysiological sequel of retained placental cotyledons (secondary PPH and puerperal endometritis).
  8. *Q8 (Knowledge):* Quantitative clinical definition of primary PPH under WHO standards ($> 500\text{ mL}$ for vaginal delivery, $> 1,000\text{ mL}$ for cesarean delivery within 24 hours).
  9. *Q9 (Application):* Postnatal protocol for fundal palpation frequency during the immediate 4th stage of labour (every 15 minutes for the first hour).
  10. *Q10 (Physiology):* Endogenous neuroendocrine mechanism of early skin-to-skin contact and suckling (posterior pituitary oxytocin reflex promoting uterine contraction).

---

### STATION 3: PEDIATRIC & NEONATAL NURSING
- **Domain Specialization:** Neonatal Resuscitation Protocol (NRP), Pediatric Dosage Math & Acute Asphyxia
- **Station Duration:** 10 Minutes Practical | 10 Minutes MCQ
- **Clinical Scenario:**
  > A term male infant ($3.0\text{ kg}$) is delivered by emergency cesarean section due to acute fetal distress with thick meconium-stained amniotic fluid. On delivery, the baby is completely limp, cyanotic, and apneic with no audible cry. Heart rate is 45 bpm on precordial auscultation. A pre-heated radiant warmer is prepared at your station.
- **Entry Vital Signs:**
  - Blood Pressure: Unobtainable
  - Heart Rate: $45\text{ bpm (Critical Bradycardia)}$
  - Respiratory Rate: $0\text{ cpm (Apnea)}$
  - Temperature: $35.5\ ^\circ\text{C (Hypothermia risk)}$
  - $\text{SpO}_2$: $58\%\text{ at 1 minute of life}$
- **Standardized Equipment Tray (NMCN Standard):**
  Neonatal radiant warmer with dry pre-warmed linen, self-inflating resuscitation bag ($250\text{--}500\text{ mL}$) with pop-off pressure valve ($30\text{--}40\text{ cmH}_2\text{O}$), neonatal anatomical cushioned masks (sizes 0 and 1), bulb syringe and mechanical suction catheter ($8\text{F}/10\text{F}$ set to $80\text{--}100\text{ mmHg}$), neonatal pulse oximeter with right wrist probe, pediatric stethoscope, Epinephrine 1:10,000 ($0.1\text{ mg/mL}$) ampoule, $1\text{ mL}$ tuberculin syringe.
- **10-Step Psychomotor Checklist & Points Allocation:**
  1. *Step 1 (10 pts):* Place infant under radiant warmer, dry vigorously with warm towels, discard wet linen immediately, and position head in slight extension ('sniffing position') using a shoulder roll.
  2. *Step 2 (10 pts):* Suction airway gently starting with the mouth first, then the nose ('M before N') using bulb syringe, avoiding deep pharyngeal suctioning.
  3. *Step 3 (10 pts):* Provide tactile stimulation by flicking the soles of the feet or rubbing the spine for no more than 5-10 seconds.
  4. *Step 4 (10 pts) [CRITICAL FAIL]:* Auscultate apex heart rate for 6 seconds; recognize persistent apnea or heart rate $< 100\text{ bpm}$ within the 'Golden Minute' and initiate immediate Positive Pressure Ventilation (PPV).
  5. *Step 5 (10 pts):* Apply anatomical face mask over nose and mouth using the 'E-C' clamp technique to establish an airtight seal without putting pressure on the globes.
  6. *Step 6 (10 pts):* Deliver PPV with medical room air ($21\%\text{ O}_2$ for term infant) at a cadence of 40 to 60 breaths per minute ("Breathe, two, three...").
  7. *Step 7 (10 pts):* Evaluate chest expansion: verbalize the MR. SOPA troubleshooting sequence if chest is not moving adequately (Mask, Reposition, Suction, Open mouth, Pressure increase, Alternative airway).
  8. *Step 8 (10 pts) [CRITICAL FAIL]:* Re-evaluate heart rate after 30 seconds of effective PPV; note heart rate remains $< 60\text{ bpm}$ and immediately call for support and initiate coordinated chest compressions.
  9. *Step 9 (10 pts):* Execute the 2-thumb encircling-hands technique on the lower third of the sternum delivering a 3:1 ratio (3 compressions to 1 breath; 90 compressions and 30 breaths per minute).
  10. *Step 10 (10 pts) [CRITICAL FAIL]:* Calculate exact intravenous Epinephrine dose for $3.0\text{ kg}$ infant: $0.02\text{ mg/kg}$ of 1:10,000 solution ($0.2\text{ mL/kg}$) = exactly $0.6\text{ mL}$ IV push followed by $1\text{ mL}$ normal saline flush.
- **10 Linked Cognitive MCQs (Bloom's Taxonomy / NMCN Licensure):**
  1. *Q1 (Knowledge):* Initial gas mixture for resuscitating term neonates ($21\%\text{ O}_2$ room air vs hyperoxic tissue injury with $100\%\text{ O}_2$).
  2. *Q2 (Comprehension):* Rationale for suctioning the mouth before the nose (preventing reflex gasp and aspiration of pharyngeal secretions).
  3. *Q3 (Application):* Recommended cadence and rate for neonatal PPV ($40\text{--}60\text{ breaths/min}$).
  4. *Q4 (Knowledge):* Components of the MR. SOPA corrective ventilation mnemonic.
  5. *Q5 (Analysis):* Strict clinical criterion for initiating cardiac chest compressions in a newborn ($\text{HR} < 60\text{ bpm}$ despite 30 seconds of effective ventilation).
  6. *Q6 (Knowledge):* Physiological rationale for the 3:1 compression-to-ventilation ratio in neonatal asphyxial cardiac arrest.
  7. *Q7 (Math/Application):* Pediatric dosage calculation for Epinephrine 1:10,000 in a $3.0\text{ kg}$ neonate ($0.6\text{ mL}$).
  8. *Q8 (Comprehension):* Hemodynamic superiority of the 2-thumb encircling technique over the 2-finger technique (greater coronary perfusion pressure).
  9. *Q9 (Knowledge):* Pre-ductal pulse oximetry anatomical site (right wrist/palm reflecting brachiocephalic arterial blood).
  10. *Q10 (Physiology):* Expected normal physiological pre-ductal $\text{SpO}_2$ target at 1 minute of life ($60\%\text{--}65\%$).

---

### STATION 4: MENTAL HEALTH & PSYCHIATRIC NURSING
- **Domain Specialization:** Acute Psychiatric Emergency, Verbal De-escalation, MSE & Suicide Prevention
- **Station Duration:** 10 Minutes Practical | 10 Minutes MCQ
- **Clinical Scenario:**
  > A 24-year-old male university undergraduate is escorted to the psychiatric emergency crisis room by campus security. He is extremely restless, pacing, shouting at unseen entities, and gripping a jagged broken glass ornament in his right hand. He believes the government has implanted microchips in his brain. His roommate reports he has not slept in 4 days and posted a farewell suicide note on social media reading: "The voices demand I terminate my life at 24:00 to cleanse humanity."
- **Entry Vital Signs:**
  - Blood Pressure: $144/92\text{ mmHg}$
  - Heart Rate: $112\text{ bpm (Sinus Tachycardia)}$
  - Respiratory Rate: $24\text{ cpm}$
  - Temperature: $37.1\ ^\circ\text{C}$
  - $\text{SpO}_2$: $98\%\text{ on ambient air}$
- **Standardized Equipment Tray (NMCN Standard):**
  Therapeutic psychiatric interview suite (safe environment, unbolted sharp items removed, two unobstructed exit doors), Columbia-Suicide Severity Rating Scale (C-SSRS) documentation instrument, emergency panic button, rapid tranquilization demonstration medication set (Haloperidol, Olanzapine, Lorazepam, Diphenhydramine).
- **10-Step Psychomotor Checklist & Points Allocation:**
  1. *Step 1 (10 pts) [CRITICAL FAIL]:* Ensure personal and environmental safety: position self between the patient and the open exit door, maintain an unobstructed egress route, and verify security backup is within sight.
  2. *Step 2 (10 pts):* Assume a non-threatening, open posture: stand at a 45-degree angle at a safe physical distance (minimum 2 arm-lengths), keeping hands open, relaxed, and visible.
  3. *Step 3 (10 pts):* Communicate with a calm, low, soothing vocal pitch; introduce self by name and profession, and establish therapeutic rapport without challenging hostility.
  4. *Step 4 (10 pts):* Validate the client's emotional terror and distress without reinforcing or debating the delusional content ("I see how terrifying this feels for you, but you are safe with me").
  5. *Step 5 (10 pts) [CRITICAL FAIL]:* De-escalate and negotiate the surrender of the sharp object by requesting the client to place the glass on a designated table; do not attempt physical lunging or grabbing.
  6. *Step 6 (10 pts):* Conduct a focused Mental State Examination (MSE): assess Appearance, Motor Behavior, Speech, Mood/Affect, Thought Content (delusions of persecution/control), and Perception (command auditory hallucinations).
  7. *Step 7 (10 pts) [CRITICAL FAIL]:* Assess suicide risk directly and explicitly: ask directly about suicidal ideation, intent, plan, and lethal means using validated screening (C-SSRS).
  8. *Step 8 (10 pts):* Correctly stratify the patient as High/Imminent Suicide Risk requiring immediate Level 1 Continuous One-to-One (1:1) Line-of-Sight nursing observation.
  9. *Step 9 (10 pts):* Offer oral calming medication (oral atypical antipsychotic or short-acting benzodiazepine) collaboratively, explaining the purpose and seeking patient assent.
  10. *Step 10 (10 pts):* Implement environmental ligature point search, remove dangerous personal belongings respectfully, and complete formal nursing documentation and clinical handover.
- **10 Linked Cognitive MCQs (Bloom's Taxonomy / NMCN Licensure):**
  1. *Q1 (Safety):* Environmental positioning rules during psychiatric de-escalation of an armed or agitated client (unobstructed exit).
  2. *Q2 (Therapeutic Technique):* Evidence-based communication response when addressing active paranoid delusions (validating emotional affect without validating false beliefs).
  3. *Q3 (Risk Analysis):* Perceptual disturbance bearing the highest clinical risk of violent self-harm (command auditory hallucinations).
  4. *Q4 (Clinical Management):* Institutional observation level indicated for active command hallucinations to commit suicide (Level 1: 1:1 continuous observation).
  5. *Q5 (Pharmacology):* Identification of acute dystonic reaction (oculogyric crisis, torticollis) following high-potency typical antipsychotic administration.
  6. *Q6 (Pharmacology):* First-line emergency pharmacological antidote for acute neuroleptic dystonia (anticholinergics: Benztropine or Diphenhydramine IM/IV).
  7. *Q7 (Emergency Pathophysiology):* Diagnostic hallmarks of Neuroleptic Malignant Syndrome (lead-pipe rigidity, hyperthermia, autonomic instability, elevated CK).
  8. *Q8 (Suicidology):* Scientific debunking of common suicide assessment myths (direct questioning does not implant ideation; it relieves anxiety and opens communication).
  9. *Q9 (Pharmacology/TDM):* Therapeutic serum concentration range for Lithium carbonate maintenance ($0.6\text{--}1.0\text{ mEq/L}$ or $\text{mmol/L}$).
  10. *Q10 (Legal/Ethics):* Statutory justification criteria for involuntary psychiatric admission under mental health legislation (imminent danger to self or others due to mental illness).

---

### STATION 5: COMMUNITY & PUBLIC HEALTH NURSING
- **Domain Specialization:** Primary Health Care, EPI Cold-Chain, IMCI Triage & Epidemic Outbreak Response
- **Station Duration:** 10 Minutes Practical | 10 Minutes MCQ
- **Clinical Scenario:**
  > You are the Public Health Nursing Officer in charge of a rural Primary Health Care Centre. Following an overnight 14-hour electrical grid power failure, you discover that the solar inverter failed. The certified dial thermometer inside the top-opening ice-lined vaccine refrigerator reads $+14\ ^\circ\text{C}$ (standard $+2\ ^\circ\text{C}$ to $+8\ ^\circ\text{C}$). Simultaneously, 4 local villagers arrive at the clinic exhibiting sudden onset of massive painless watery 'rice-water' diarrhea and vomiting.
- **Entry Vital Signs (Child Presenting with Diarrhea):**
  - Blood Pressure: $76/48\text{ mmHg (Hypotensive Shock)}$
  - Heart Rate: $136\text{ bpm (Tachycardia)}$
  - Respiratory Rate: $28\text{ cpm (Acidotic Kussmaul-type breathing)}$
  - Temperature: $36.2\ ^\circ\text{C}$
  - $\text{SpO}_2$: $95\%\text{ on ambient air}$
  - Clinical Signs: Lethargic, eyes deeply sunken, skin pinch goes back very slowly ($> 2\text{ seconds}$).
- **Standardized Equipment Tray (NMCN Standard):**
  Vaccine transport cold box with conditioned ice-packs, demonstration vaccine vials featuring Vaccine Vial Monitor (VVM) stages 1, 2, 3, and 4, certified stem thermometer and temperature log sheet, WHO Cholera Rapid Diagnostic Dipstick kit, standard WHO low-osmolarity ORS packets, 1-liter graduated water container, IV infusion equipment (Ringer's Lactate $500\text{ mL}$, $22\text{G}/24\text{G}$ pediatric cannula, macro-infusion set), chlorine powder ($70\%\text{ HTH}$), Integrated Disease Surveillance and Response (IDSR 001) notification forms.
- **10-Step Psychomotor Checklist & Points Allocation:**
  1. *Step 1 (10 pts):* Keep refrigerator lid securely closed immediately upon discovering power loss; log the temperature reading ($+14\ ^\circ\text{C}$) on the official temperature chart.
  2. *Step 2 (10 pts):* Prepare emergency transport cold box with conditioned ice-packs (packs wiped until condensation/rattling is observed, avoiding direct freezing).
  3. *Step 3 (10 pts) [CRITICAL FAIL]:* Systematically inspect Vaccine Vial Monitors (VVM): correctly distinguish usable vials (Stages 1 & 2) from condemned vials (Stage 3: inner square matches outer circle; Stage 4: inner square darker than circle) and condemn non-viable biologicals.
  4. *Step 4 (10 pts):* Differentiate heat-sensitive vaccines (OPV, Measles, Yellow Fever) and transfer viable stock into the conditioned cold box maintaining $+2\ ^\circ\text{C}$ to $+8\ ^\circ\text{C}$.
  5. *Step 5 (10 pts):* Differentiate freeze-sensitive aluminium-adsorbed vaccines (Pentavalent DTP-HepB-Hib, Td, PCV) and explain the Shake Test protocol for detecting freeze precipitation.
  6. *Step 6 (10 pts) [CRITICAL FAIL]:* Triage the acute diarrhea presentation using WHO IMCI criteria: identify lethargy, sunken eyes, skin pinch $> 2\text{s}$, and weak pulse as "Severe Dehydration".
  7. *Step 7 (10 pts):* Initiate WHO Plan C rehydration protocol: establish rapid IV access and administer Ringer's Lactate $100\text{ mL/kg}$ ($30\text{ mL/kg}$ in first 30 mins, $70\text{ mL/kg}$ over next 2.5 hours).
  8. *Step 8 (10 pts):* Demonstrate accurate reconstitution of standard WHO low-osmolarity ORS: dissolve 1 sachet in exactly 1,000 mL (1 liter) of clean drinking water, verbalizing 24-hour expiry.
  9. *Step 9 (10 pts):* Implement epidemic WASH infection control: prepare $0.5\%$ active chlorine solution for patient vomit/feces disinfection and $0.05\%$ solution for hand hygiene.
  10. *Step 10 (10 pts):* Complete the IDSR 001 Epidemic Disease Notification form for suspected Cholera within 24 hours to the LGA Disease Surveillance and Notification Officer (DSNO).
- **10 Linked Cognitive MCQs (Bloom's Taxonomy / NMCN Licensure):**
  1. *Q1 (Knowledge):* Mandated international storage temperature range for routine EPI vaccines ($+2\ ^\circ\text{C}$ to $+8\ ^\circ\text{C}$).
  2. *Q2 (Analysis):* Visual interpretation of VVM stages indicating the definitive discard point (Stage 3 and Stage 4).
  3. *Q3 (Comprehension):* Vaccines ruined by sub-zero freezing due to aluminium adjuvant detachment (Pentavalent, Tetanus, Hepatitis B).
  4. *Q4 (Application):* Mechanism and diagnostic principle of the vaccine Shake Test.
  5. *Q5 (Analysis):* IMCI classification criteria for Severe Dehydration (presence of 2 or more cardinal clinical signs).
  6. *Q6 (Pharmacology):* Fluid of choice for cholera resuscitation (Ringer's Lactate restoring electrolyte losses and buffering acidosis).
  7. *Q7 (Application):* Standard reconstitution fluid volume for one packet of WHO low-osmolarity ORS ($1,000\text{ mL}$).
  8. *Q8 (Public Health):* Maximum safe storage duration for reconstituted liquid ORS at room temperature ($24\text{ hours}$).
  9. *Q9 (Biosafety):* Chlorine concentration required for disinfecting cholera corpses and biological excreta ($0.5\%$ or $5,000\text{ ppm}$).
  10. *Q10 (Epidemiology/Law):* Statutory reporting timeline for epidemic-prone diseases under IDSR guidelines (within 24 hours).

---

### STATION 6: EMERGENCY, TRAUMA & CRITICAL CARE NURSING
- **Domain Specialization:** Advanced Trauma Life Support (ATLS), Primary Survey, Needle Thoracostomy & START Disaster Triage
- **Station Duration:** 10 Minutes Practical | 10 Minutes MCQ
- **Clinical Scenario:**
  > A 32-year-old unrestrained female driver is transported to the emergency trauma bay following a high-speed head-on vehicular collision. She is cyanotic, gasping, exhibiting severe air hunger, with visible bruising over the right hemithorax. Examination reveals tracheal deviation to the left, absent breath sounds over the right chest, hyper-resonance to percussion, and distended neck veins.
- **Entry Vital Signs:**
  - Blood Pressure: $72/40\text{ mmHg (Decompensated Shock)}$
  - Heart Rate: $142\text{ bpm (Extreme Tachycardia, thready pulse)}$
  - Respiratory Rate: $34\text{ cpm (Marked Tachypnea)}$
  - Temperature: $35.8\ ^\circ\text{C}$
  - $\text{SpO}_2$: $74\%\text{ on ambient air}$
- **Standardized Equipment Tray (NMCN Standard):**
  Rigid cervical extrication collar and manual in-line head blocks, $14\text{G}/16\text{G}$ ($8\text{ cm}$ long) over-the-needle cannula for thoracostomy, high-flow non-rebreather oxygen mask with reservoir bag and oxygen source, dual large-bore IV cannulae ($14\text{G}$ Orange / $16\text{G}$ Gray), warmed Ringer's Lactate infusion with pressure bag, underwater seal chest drainage system ($28\text{F}/32\text{F}$ chest tube), START disaster triage tags (Red, Yellow, Green, Black).
- **10-Step Psychomotor Checklist & Points Allocation:**
  1. *Step 1 (10 pts) [CRITICAL FAIL]:* Maintain immediate manual in-line cervical spine stabilization while opening the airway using the modified jaw-thrust maneuver without head extension.
  2. *Step 2 (10 pts):* Inspect and clear the oral airway: suction secretions/blood under direct vision using a rigid Yankauer catheter, inserting an oropharyngeal airway if unconscious.
  3. *Step 3 (10 pts):* Assess breathing: auscultate bilateral breath sounds, percuss hemithoraces, and inspect for asymmetry, tracheal shift, and distended jugular veins.
  4. *Step 4 (10 pts) [CRITICAL FAIL]:* Rapidly diagnose clinical tension pneumothorax; do NOT delay life-saving decompression to await a chest X-ray.
  5. *Step 5 (10 pts) [CRITICAL FAIL]:* Perform emergency needle thoracostomy: insert a $14\text{G}$ ($8\text{ cm}$) cannula into the 2nd intercostal space in the mid-clavicular line directly superior to the 3rd rib (or 4th/5th ICS anterior-axillary line).
  6. *Step 6 (10 pts):* Observe for the immediate rush of pressurized escaping air, withdraw the introducing needle, secure the plastic cannula in place, and prep for tube thoracostomy.
  7. *Step 7 (10 pts):* Administer $100\%$ high-flow oxygen via non-rebreather mask at $12\text{--}15\text{ L/min}$, ensuring the reservoir bag remains inflated.
  8. *Step 8 (10 pts):* Assess circulation: insert two large-bore ($14\text{G}$ or $16\text{G}$) peripheral IV lines, send blood for cross-match and trauma labs, and infuse warmed balanced crystalloids.
  9. *Step 9 (10 pts):* Assess disability: calculate Glasgow Coma Scale score (Eye 3, Verbal 4, Motor 5 = 12/15) and evaluate bilateral pupillary light reflexes.
  10. *Step 10 (10 pts):* Expose patient to inspect for occult hemorrhages while protecting against hypothermia, and assign START disaster triage RED TAG (Immediate).
- **10 Linked Cognitive MCQs (Bloom's Taxonomy / NMCN Licensure):**
  1. *Q1 (Trauma Airway):* Mandatory airway maneuver in cervical spine trauma (modified jaw-thrust vs contraindicated head-tilt).
  2. *Q2 (Pathophysiology):* Classic clinical triad of tension pneumothorax (unilateral absent breath sounds, contralateral tracheal shift, JVD with obstructive shock).
  3. *Q3 (Clinical Decision):* Absolute contraindication to delaying needle thoracostomy for diagnostic chest radiography.
  4. *Q4 (Anatomy):* Anatomical safety margin for needle thoracostomy insertion (superior border of rib to avoid intercostal neurovascular bundle).
  5. *Q5 (Trauma Science):* Pathophysiology of the 'lethal trauma triad' (hypothermia, acidosis, coagulopathy) prevented by warmed fluids.
  6. *Q6 (Assessment):* Glasgow Coma Scale calculation and severity categorization ($\text{GCS } 12 = \text{Moderate Head Injury}$).
  7. *Q7 (Triage):* START disaster triage classification criteria for Red Tag (Immediate survival threat).
  8. *Q8 (Fluid Dynamics):* Application of Poiseuille's law in vascular access (short large-bore $14\text{G}/16\text{G}$ delivering exponential flow rates).
  9. *Q9 (Differential Diagnosis):* Differentiating cardiac tamponade (Beck's triad with bilateral equal breath sounds) from tension pneumothorax.
  10. *Q10 (Critical Care):* Universal reversible causes of cardiopulmonary arrest in trauma (the 5 H's and 5 T's).

---

## 6. COMPLETE DATA SCHEMA & SCORING MATHEMATICS

### 6.1 Psychometric Weighting Formula
$$\text{Station Practical Score } (P_i) = \left( \frac{\sum \text{Earned Checklist Points}_i}{100} \right) \times 100$$
$$\text{Station MCQ Score } (M_i) = \left( \frac{\sum \text{Correct MCQs}_i}{10} \right) \times 100$$
$$\text{Station Composite Score } (S_i) = (0.50 \times P_i) + (0.50 \times M_i)$$
$$\text{Final NMCN Aggregate Grade } (G) = \frac{1}{6} \sum_{i=1}^{6} S_i$$

### 6.2 NMCN Board Classifications:
- **Distinction:** $G \ge 75.0\%$ (with 0 critical safety failures)
- **Credit:** $60.0\% \le G < 75.0\%$
- **Pass:** $50.0\% \le G < 60.0\%$
- **Referred / Remedial Required:** $G < 50.0\%$ OR any uncorrected Critical Safety Violation.

---

## 7. UNIVERSAL MASTER PROMPT FOR SOFTWARE ENGINEERS & AI AGENTS

Copy and paste the following prompt into any AI agent, coding assistant, or engineering sprint to construct this system in any technology stack:

```text
Build a production-ready, 100% Autonomous 6-Station CAOSCE (Computer-Assisted Objective Structured Clinical Examination) web application adhering strictly to the Nursing and Midwifery Council of Nigeria (NMCN) and WHO/AMEE International Licensure Standards.

System Specifications:
1. Operational Model: 100% fully online, autonomous digital execution without human examiners or invigilators. The platform acts as the proctor, timer, patient simulator, and grading engine.
2. Clinical Blueprint: Exactly 6 sequential stations covering:
   - Station 1: Medical-Surgical Nursing (Aseptic Wound Care, CVC & Sepsis Screening)
   - Station 2: Maternal & Obstetric Nursing (Active Management of 3rd Stage of Labour - AMTSL)
   - Station 3: Pediatric & Neonatal Nursing (Neonatal Resuscitation Protocol - NRP)
   - Station 4: Mental Health & Psychiatric Nursing (Acute Psychosis De-escalation & MSE)
   - Station 5: Community & Public Health Nursing (EPI Cold-Chain & Cholera Outbreak Triage)
   - Station 6: Emergency, Trauma & Critical Care (ABCDE Primary Survey & Needle Thoracostomy)
3. Timing Matrix:
   - Strictly 10 minutes per station for the Practical Clinical Exam phase.
   - Strictly 10 minutes per station for the linked 10 MCQs phase (60 seconds/question).
   - 30-second automated station changeover bell between stations.
   - Total circuit time: 120 minutes (2.0 hours).
4. Lockstep State Progression:
   - Station 1 Practical -> Station 1 MCQs -> Station 2 Practical -> Station 2 MCQs ... strictly in sequence.
   - Auto-advance and auto-lock upon timer expiration. Backward editing and forward skipping are prohibited.
5. Patient Safety & Red Flags:
   - Predefined Critical Fail Steps (e.g. failing to exclude a second twin; performing head-tilt in trauma; administering VVM Stage 4 vaccine).
   - Missing a critical fail step triggers an automated Critical Safety Flag on the candidate's transcript.
6. Scoring & Analytics:
   - 50% Practical Score + 50% MCQ Score per station.
   - Overall NMCN Pass Mark: 50%, Distinction: 75%.
   - Detailed radar/bar chart of clinical discipline mastery, full question review with clinical rationales, and an official printable Council Result Slip with cryptographic verification hash.
7. User Interface:
   - High-contrast, clean hospital-grade dark-slate/emerald theme. Fully responsive (mobile, tablet, desktop) with accessibility compliance.
```
