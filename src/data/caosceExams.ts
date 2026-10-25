/**
 * 6-STATION COMPUTER-ASSISTED OBJECTIVE STRUCTURED CLINICAL EXAMINATION (CAOSCE)
 * Official Nursing & Midwifery Council of Nigeria (NMCN) & Global Licensure Standard
 *
 * Structure:
 * - 6 Clinical Stations covering 6 Core Nursing Disciplines
 * - 10 Minutes per Practical Station
 * - Exactly 10 Linked Multiple Choice Questions (MCQs) per Station (60 MCQs total)
 * - Sequential Lockstep Progression:
 *   Station 1 Practical -> Station 1 MCQs -> Station 2 Practical -> Station 2 MCQs ... -> Station 6 -> Composite Scorecard
 */

export interface CAOSCEChecklistStep {
  step: number;
  description: string;
  points: number;
  criticalFailStep?: boolean;
  examinerGuidance: string;
}

export interface CAOSCEMCQ {
  id: string;
  stationId: string;
  questionNumber: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  rationale: string;
  competencyDomain: string;
}

export interface CAOSCEStation {
  id: string;
  stationNumber: number;
  discipline: string;
  title: string;
  durationMinutes: number; // Strictly 10 minutes
  scenario: string;
  candidateInstructions: string;
  simulatedPatientBrief: string;
  vitalSignsAtEntry: {
    bloodPressure: string;
    heartRate: string;
    respiratoryRate: string;
    temperature: string;
    spO2: string;
    painScore?: string;
  };
  requiredEquipment: string[];
  checklist: CAOSCEChecklistStep[];
  leadExaminerKeyPoints: string[];
  clinicalSignificance: string;
  mcqs: CAOSCEMCQ[]; // Exactly 10 MCQs
}

export const CAOSCE_STATIONS: CAOSCEStation[] = [
  // =========================================================================
  // STATION 1: MEDICAL-SURGICAL NURSING (ADULT HEALTH)
  // =========================================================================
  {
    id: "caosce-st1-medsurg",
    stationNumber: 1,
    discipline: "Medical-Surgical Nursing (Adult Health)",
    title: "Aseptic Surgical Wound Care, Debridement & Central Venous Line Site Management",
    durationMinutes: 10,
    scenario:
      "A 48-year-old male on Post-Op Day 4 following an exploratory laparotomy for perforated appendicitis reports sudden onset of worsening surgical site throbbing pain and chills. On examination, the abdominal dressing is saturated with purulent yellowish discharge with foul odor. A triple-lumen subclavian central venous catheter is also in situ.",
    candidateInstructions:
      "You have 10 minutes to: (1) Perform hand hygiene and don appropriate sterile PPE, (2) Remove and inspect soiled dressings, (3) Perform an aseptic surgical wound inspection and cleanse the wound using the aseptic non-touch technique (ANTT), (4) Collect an aseptic wound swab for culture and sensitivity before antimicrobial application, (5) Inspect and dress the central venous catheter insertion site observing catheter line-associated bloodstream infection (CLABSI) bundles, and (6) Document your findings and dispose of biological waste according to standard infection control protocols.",
    simulatedPatientBrief:
      "The simulated patient acts anxious, wincing when the abdomen is touched, and expresses fear of wound dehiscence ('Nurse, is my operation bursting open?'). Cooperates when calmed with therapeutic reassurance.",
    vitalSignsAtEntry: {
      bloodPressure: "138/86 mmHg",
      heartRate: "104 bpm (sinus tachycardia)",
      respiratoryRate: "22 cpm",
      temperature: "38.6 °C (febrile)",
      spO2: "97% on room air",
      painScore: "7/10 on numeric rating scale",
    },
    requiredEquipment: [
      "Sterile dressing pack (forceps, gallipot, gauze swabs)",
      "Sterile gloves (two pairs) & clean examination gloves",
      "Sterile normal saline 0.9% for irrigation",
      "Sterile transport wound swab with Amies transport medium",
      "Chlorhexidine gluconate 2% in 70% isopropyl alcohol skin prep applicator",
      "Transparent semi-permeable adhesive dressing (Tegaderm) for central line",
      "Clinical biohazard waste bin and sharps disposal container",
      "Sterile surgical face mask with eye visor",
    ],
    checklist: [
      {
        step: 1,
        description: "Verify candidate identity, confirm patient identity using 2 unique identifiers (Full Name & Hospital Number), and obtain informed consent.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Candidate must not begin procedure on an unidentified or unconsented patient.",
      },
      {
        step: 2,
        description: "Perform clinical hand hygiene according to WHO 5 Moments guidelines and don clean disposable examination gloves and apron/mask.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Observes correct 6-step hand rub technique for minimum 20 seconds.",
      },
      {
        step: 3,
        description: "Gently remove soiled outer dressings using clean gloves, inspect discharge (color, volume, odor, consistency), and dispose in clinical biohazard waste.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Removes dressing parallel to skin surface to minimize shear and tissue trauma.",
      },
      {
        step: 4,
        description: "Doff contaminated clean gloves, perform hand hygiene again, and open sterile dressing pack maintaining strict sterile field integrity.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Does not turn back or reach over the sterile field.",
      },
      {
        step: 5,
        description: "Don sterile gloves using closed/open aseptic glove technique without touching outside surface with bare skin.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Touch of sterile glove outer surface with bare fingers constitutes a critical break in asepsis.",
      },
      {
        step: 6,
        description: "Cleanse surgical wound edges using sterile normal saline 0.9% from least contaminated to most contaminated area (center-outward / top-to-bottom), using single stroke per swab.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Never double-dips or reuse a swab back onto a cleaned area.",
      },
      {
        step: 7,
        description: "Collect microbiological wound swab using Levine technique (rotating swab tip over 1 cm² of clean viable granulation tissue with sufficient pressure to express fluid) avoiding superficial pus and skin edges.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Swabbing pool of stagnant superficial exudate yields colonizers rather than true invasive pathogen.",
      },
      {
        step: 8,
        description: "Apply sterile non-adherent primary dressing followed by absorbent secondary gauze pad and secure edges neatly with hypoallergenic tape.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Ensures dressing is occlusive yet comfortable with no pressure points.",
      },
      {
        step: 9,
        description: "Inspect central venous catheter insertion site for erythema, induration, or tracking, cleanse with 2% chlorhexidine in 70% alcohol using back-and-forth friction for 30s, allow to air dry completely, and apply sterile transparent dressing.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Adheres strictly to CDC/NMCN CLABSI prevention bundle rules.",
      },
      {
        step: 10,
        description: "Safely dispose of sharps and biohazards, remove PPE, perform terminal hand hygiene, document wound status in clinical notes, and reassure the patient.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Complete documentation must note wound length, exudate characteristics, and specimen label details.",
      },
    ],
    leadExaminerKeyPoints: [
      "Strict ANTT (Aseptic Non-Touch Technique) compliance throughout.",
      "Levine swab method is mandatory for accurate wound culture.",
      "2% chlorhexidine air-drying takes minimum 30-120 seconds; blowing on skin violates asepsis.",
    ],
    clinicalSignificance:
      "Prevents fatal post-laparotomy necrotizing fasciitis, burst abdomen, and central catheter-associated bloodstream infections.",
    mcqs: [
      {
        id: "mcq-st1-01",
        stationId: "caosce-st1-medsurg",
        questionNumber: 1,
        question: "Which microbiological swabbing method is recognized as providing the most accurate representation of true invasive wound bioburden?",
        options: [
          "Levine technique: rotating swab over 1 cm² of viable tissue after cleansing",
          "Z-stroke technique sweeping across margins of necrotic slough",
          "Sampling pooled surface purulent exudate without cleansing",
          "Dry scraping of the peripheral intact epidermis",
        ],
        correctIndex: 0,
        rationale: "The Levine technique has demonstrated the highest correlation with quantitative tissue biopsy culture by capturing microorganisms within active wound bed tissue rather than superficial surface colonizers.",
        competencyDomain: "Microbiology & Infection Control",
      },
      {
        id: "mcq-st1-02",
        stationId: "caosce-st1-medsurg",
        questionNumber: 2,
        question: "When applying 2% chlorhexidine gluconate in 70% isopropyl alcohol to a central line site, what is the critical requirement before applying the transparent dressing?",
        options: [
          "Allowing the solution to air dry completely without fanning or blotting",
          "Wiping off residual solution immediately with dry sterile cotton wool",
          "Blowing gently across the site to accelerate chemical evaporation",
          "Covering while still damp to lock in antibacterial moisture",
        ],
        correctIndex: 0,
        rationale: "Chlorhexidine achieves its maximum bactericidal effect and prevents chemical contact burns only when allowed to air dry completely (at least 30 to 120 seconds). Fanning or blowing introduces respiratory pathogens.",
        competencyDomain: "CLABSI Bundle & Catheter Safety",
      },
      {
        id: "mcq-st1-03",
        stationId: "caosce-st1-medsurg",
        questionNumber: 3,
        question: "The patient's temperature is 38.6 °C and heart rate is 104 bpm. Which clinical diagnostic criterion should the nurse immediately evaluate for systemic sepsis?",
        options: [
          "qSOFA score (altered mentation, systolic BP <= 100 mmHg, RR >= 22 cpm)",
          "Braden scale score for sensory impairment",
          "Glasgow Coma Scale for acute intracranial hemorrhage",
          "Morse Fall Risk score for ambulatory balance",
        ],
        correctIndex: 0,
        rationale: "Quick SOFA (qSOFA) criteria include respiratory rate >= 22 cpm, altered mental status, and systolic blood pressure <= 100 mmHg. Presence of 2 or more indicates high risk of sepsis-related mortality.",
        competencyDomain: "Critical Assessment & Sepsis Recognition",
      },
      {
        id: "mcq-st1-04",
        stationId: "caosce-st1-medsurg",
        questionNumber: 4,
        question: "During surgical wound inspection, the nurse notices pink, moist, highly vascular tissue filling the wound base. What stage of wound healing does this represent?",
        options: [
          "Proliferative phase with healthy granulation tissue",
          "Hemostatic phase with fibrin clot formation",
          "Inflammatory phase with neutrophilic migration",
          "Maturation phase with cross-linked type I collagen",
        ],
        correctIndex: 0,
        rationale: "Healthy granulation tissue appears beefy red to pink, moist, and granular due to new capillary loops (angiogenesis) characteristic of the proliferative phase.",
        competencyDomain: "Wound Pathophysiology",
      },
      {
        id: "mcq-st1-05",
        stationId: "caosce-st1-medsurg",
        questionNumber: 5,
        question: "If sudden separation of surgical fascial edges occurs with protrusion of visceral bowel loops (wound evisceration), what is the nurse's immediate emergency intervention?",
        options: [
          "Cover the protruding viscera with sterile gauze soaked in warm normal saline and call the surgeon immediately",
          "Gently push the bowel loops back into the abdominal cavity using clean gloved hands",
          "Apply an elastic abdominal binder tightly around the waist to compress the defect",
          "Administer oral analgesics and instruct the patient to cough vigorously",
        ],
        correctIndex: 0,
        rationale: "Evisceration is a surgical emergency. The protruding bowel must be kept moist and sterile with warm normal saline dressings while the patient is placed in low Fowler's with knees flexed and the surgical team summoned immediately. Never attempt to reduce eviscerated organs.",
        competencyDomain: "Surgical Emergencies",
      },
      {
        id: "mcq-st1-06",
        stationId: "caosce-st1-medsurg",
        questionNumber: 6,
        question: "Which of the following intravenous antimicrobial classes requires therapeutic drug monitoring of trough levels to avoid nephrotoxicity and ototoxicity?",
        options: [
          "Aminoglycosides (e.g., Gentamicin, Amikacin)",
          "Macrolides (e.g., Azithromycin)",
          "Penicillins (e.g., Ampicillin)",
          "Cephalosporins (e.g., Ceftriaxone)",
        ],
        correctIndex: 0,
        rationale: "Aminoglycosides (and Vancomycin) possess narrow therapeutic indices. Trough serum levels must be measured immediately prior to the next scheduled dose to prevent permanent inner ear and renal tubular damage.",
        competencyDomain: "Pharmacology & Medication Safety",
      },
      {
        id: "mcq-st1-07",
        stationId: "caosce-st1-medsurg",
        questionNumber: 7,
        question: "What is the recommended frequency for changing a transparent semi-permeable polyurethane central line dressing in the absence of dampness, loosening, or soiling?",
        options: [
          "Every 7 days",
          "Every 24 hours",
          "Every 48 hours",
          "Every 14 days",
        ],
        correctIndex: 0,
        rationale: "CDC and NMCN guidelines recommend replacing transparent central venous catheter dressings at least every 7 days, and gauze dressings every 48 hours, unless soiled, loose, or damp.",
        competencyDomain: "Infection Prevention Bundles",
      },
      {
        id: "mcq-st1-08",
        stationId: "caosce-st1-medsurg",
        questionNumber: 8,
        question: "When cleaning a linear closed surgical wound with stitches in place, what directional stroke order maintains asepsis?",
        options: [
          "Wiping down the incision line first from top to bottom, then outer lateral margins, using a new swab for each stroke",
          "Wiping outward in a circular spiral starting from surrounding outer skin towards the suture line",
          "Wiping vigorously back and forth across the incision with a single sponge",
          "Scrubbing from the inferior pole upward to the superior pole repeatedly",
        ],
        correctIndex: 0,
        rationale: "Cleaning principles dictate moving from the cleanest (incision line) to less clean areas (adjacent skin margins), moving top to bottom in single strokes to avoid transferring skin microflora into the wound.",
        competencyDomain: "Surgical Asepsis",
      },
      {
        id: "mcq-st1-09",
        stationId: "caosce-st1-medsurg",
        questionNumber: 9,
        question: "Which laboratory finding in a post-laparotomy patient most strongly suggests systemic septic response?",
        options: [
          "Serum lactate > 2.0 mmol/L with leukocytosis (> 12,000 /uL)",
          "Serum sodium 138 mEq/L with normal serum potassium",
          "Fasting blood glucose 95 mg/dL",
          "Urine specific gravity of 1.015",
        ],
        correctIndex: 0,
        rationale: "Elevated serum lactate (> 2 mmol/L) reflects anaerobic metabolism and cellular hypoperfusion characteristic of severe sepsis and impending septic shock.",
        competencyDomain: "Pathophysiology & Diagnostics",
      },
      {
        id: "mcq-st1-10",
        stationId: "caosce-st1-medsurg",
        questionNumber: 10,
        question: "Under universal healthcare biohazard standards, into which color-coded disposal receptacle should a heavily blood-soaked abdominal dressing be discarded?",
        options: [
          "Yellow biohazard clinical waste bag",
          "Black domestic non-clinical trash bag",
          "Red puncture-resistant rigid sharps bin",
          "Clear general office recycling bin",
        ],
        correctIndex: 0,
        rationale: "Yellow biohazard bags are universally designated for clinical infectious waste containing human blood, body fluids, or dressings intended for high-temperature incineration.",
        competencyDomain: "Waste Management & Biosafety",
      },
    ],
  },

  // =========================================================================
  // STATION 2: MATERNAL & OBSTETRIC HEALTH NURSING (MIDWIFERY)
  // =========================================================================
  {
    id: "caosce-st2-midwifery",
    stationNumber: 2,
    discipline: "Maternal & Obstetric Nursing (Midwifery)",
    title: "Active Management of Third Stage of Labour (AMTSL) & Postpartum Hemorrhage Prevention",
    durationMinutes: 10,
    scenario:
      "A 27-year-old Gravida 3 Para 2 mother has just given birth to a vigorous 3.4 kg baby boy at 39 weeks gestation. The baby has been placed skin-to-skin on the maternal abdomen and dried. The umbilical cord has just been clamped and cut. You are the registered nurse-midwife responsible for the active management of the third stage of labour.",
    candidateInstructions:
      "You have 10 minutes to: (1) Palpate the maternal abdomen to rule out the presence of an undiagnosed second twin, (2) Administer the prophylactic uterotonic drug within 1 minute of birth, (3) Perform Controlled Cord Traction (CCT) with counter-traction using the Brandt-Andrews maneuver during uterine contraction, (4) Deliver and inspect the placenta and membranes for completeness, (5) Massage the uterine fundus until contracted and evaluate maternal vital signs and blood loss, and (6) Document the duration, estimated blood loss, and findings.",
    simulatedPatientBrief:
      "The mother is relieved and smiling at her newborn but fatigued. She asks: 'Nurse, is the afterbirth ready to come out yet? Am I bleeding too much?'. She tolerates gentle abdominal palpation.",
    vitalSignsAtEntry: {
      bloodPressure: "116/74 mmHg",
      heartRate: "82 bpm",
      respiratoryRate: "18 cpm",
      temperature: "36.8 °C",
      spO2: "99% on ambient air",
    },
    requiredEquipment: [
      "Ampoule of Oxytocin (10 International Units)",
      "Sterile 2 ml syringe with 21G/23G intramuscular needle",
      "Sterile gloves & waterproof apron/goggles",
      "Placenta kidney dish / receptacle",
      "Pair of sterile Spencer Wells artery forceps",
      "Alcohol swab 70%",
      "Underpad / calibrated blood collection drape (V-drape)",
    ],
    checklist: [
      {
        step: 1,
        description: "Palpate the maternal abdomen thoroughly to rule out the presence of an additional unborn fetus prior to uterotonic administration.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Administering oxytocin without ruling out a twin constitutes a critical clinical failure (causes intrauterine fetal demise of twin).",
      },
      {
        step: 2,
        description: "Administer 10 International Units (IU) of Oxytocin intramuscularly into the anterior-lateral aspect of maternal thigh within 1 minute of birth.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Ensures correct drug, dose, route, and anatomical site (vastus lateralis preferred).",
      },
      {
        step: 3,
        description: "Observe for classical signs of placental separation (lengthening of the cord, sudden trickle/gush of blood, fundus rising and becoming globular).",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Does not apply forceful traction on an unseparated placenta.",
      },
      {
        step: 4,
        description: "Place one hand above the pubic symphysis applying firm upward counter-traction on the lower uterine segment while the other hand grasps the umbilical cord clamp.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Pulling cord without suprapubic counter-traction risks uterine inversion (critical life-threatening complication).",
      },
      {
        step: 5,
        description: "Perform gentle, steady downward Controlled Cord Traction (CCT) strictly during a uterine contraction, following the curve of the pelvic axis.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Never jerks or pulls vigorously on the cord.",
      },
      {
        step: 6,
        description: "As the placenta crowns at the introitus, support it with cupped hands and gently twist in a continuous circular rotation to peel membranes intact.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Prevents shearing or tearing of trailing chorionic membranes.",
      },
      {
        step: 7,
        description: "Immediately perform vigorous fundal massage through the abdominal wall until the uterus is firm, hard, and centrally located at or below the umbilicus.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Monitors fundal tone continuously.",
      },
      {
        step: 8,
        description: "Examine maternal surface of the placenta to ensure all cotyledons are present and intact with no missing lobes.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Inspects maternal cotyledons thoroughly by piecing them together.",
      },
      {
        step: 9,
        description: "Examine fetal surface, umbilical cord insertion, 3 vessels (2 arteries, 1 vein), and inspect membranes (amnion and chorion) for completeness.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Checks for succenturiate lobes or vessel branches crossing the membrane edge.",
      },
      {
        step: 10,
        description: "Measure calibrated blood loss, assess perineum for tears, ensure mother and baby are comfortable in skin-to-skin contact, dispose of sharps, and document.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Accurate EBL documentation and encouragement of immediate early breastfeeding.",
      },
    ],
    leadExaminerKeyPoints: [
      "Rule out second twin prior to oxytocic injection.",
      "Brandt-Andrews counter-traction prevents catastrophic uterine inversion.",
      "Continuous fundal massage is the primary defense against uterine atony PPH.",
    ],
    clinicalSignificance:
      "Active Management of the Third Stage of Labour (AMTSL) reduces postpartum hemorrhage rates by over 60%, the leading cause of maternal mortality in developing nations.",
    mcqs: [
      {
        id: "mcq-st2-01",
        stationId: "caosce-st2-midwifery",
        questionNumber: 1,
        question: "What is the primary rationale for palpating the maternal abdomen immediately after fetal delivery before administering intramuscular oxytocin?",
        options: [
          "To rule out the presence of an undiagnosed second twin",
          "To check if the urinary bladder requires catheterization",
          "To measure fundal height in centimeters for dating",
          "To manually detach the placenta from the myometrial wall",
        ],
        correctIndex: 0,
        rationale: "Administering a potent uterotonic while an undiagnosed twin is still in utero causes tetanic uterine contractions leading to fetal hypoxia, asphyxia, or uterine rupture.",
        competencyDomain: "Obstetric Safety & Pharmacology",
      },
      {
        id: "mcq-st2-02",
        stationId: "caosce-st2-midwifery",
        questionNumber: 2,
        question: "What is the first-line WHO and NMCN recommended uterotonic drug and standard dosage for routine active management of the third stage of labour?",
        options: [
          "Oxytocin 10 International Units (IU) intramuscularly",
          "Ergometrine 0.5 mg intravenously push",
          "Misoprostol 800 mcg sublingually only",
          "Tranexamic acid 1 g intravenous infusion",
        ],
        correctIndex: 0,
        rationale: "Oxytocin 10 IU IM is the gold standard prophylactic uterotonic due to its rapid onset (2-3 minutes), efficacy in producing physiological rhythmic contractions, and absence of hypertensive side effects.",
        competencyDomain: "Obstetric Pharmacology",
      },
      {
        id: "mcq-st2-03",
        stationId: "caosce-st2-midwifery",
        questionNumber: 3,
        question: "Which sign is a reliable clinical indicator that the placenta has detached from the uterine wall?",
        options: [
          "The umbilical cord lengthens at the introitus and does not retract when the uterus is pushed upward",
          "The maternal blood pressure suddenly drops by 30 mmHg",
          "The uterus becomes soft, doughy, and flaccid above the umbilicus",
          "The fetal heart rate drops below 100 bpm",
        ],
        correctIndex: 0,
        rationale: "Lengthening of the umbilical cord without retraction during suprapubic elevation, accompanied by a small gush of blood and a firm globular fundus, confirms placental separation.",
        competencyDomain: "Clinical Midwifery Assessment",
      },
      {
        id: "mcq-st2-04",
        stationId: "caosce-st2-midwifery",
        questionNumber: 4,
        question: "What critical complication can result if strong traction is applied to the umbilical cord without simultaneous counter-traction on the lower uterine segment?",
        options: [
          "Acute uterine inversion with profound neurogenic shock",
          "Amniotic fluid embolism",
          "Precipitous neonatal hypoglycemia",
          "Chorioamnionitis and pelviperitonitis",
        ],
        correctIndex: 0,
        rationale: "Traction on the cord without suprapubic counter-traction (Brandt-Andrews technique) can pull the fundus down through the cervix, causing acute uterine inversion—a life-threatening obstetric emergency.",
        competencyDomain: "Obstetric Complications",
      },
      {
        id: "mcq-st2-05",
        stationId: "caosce-st2-midwifery",
        questionNumber: 5,
        question: "What is the most frequent primary cause of primary postpartum hemorrhage (PPH) within the first 24 hours of childbirth?",
        options: [
          "Uterine atony (failure of myometrium to contract and compress spiral arterioles)",
          "Genital tract lacerations and cervical tears",
          "Disseminated intravascular coagulation (DIC)",
          "Uterine rupture",
        ],
        correctIndex: 0,
        rationale: "Uterine atony accounts for approximately 70-80% of all primary postpartum hemorrhages (the 'Tone' in the 4 T's: Tone, Tissue, Trauma, Thrombin).",
        competencyDomain: "Maternal Morbidity & Pathophysiology",
      },
      {
        id: "mcq-st2-06",
        stationId: "caosce-st2-midwifery",
        questionNumber: 6,
        question: "In a woman with chronic hypertension or pre-eclampsia, which uterotonic agent is strictly contraindicated due to the risk of severe hypertensive crisis and intracranial hemorrhage?",
        options: [
          "Ergometrine / Methylergonovine",
          "Oxytocin",
          "Misoprostol",
          "Carboprost tromethamine",
        ],
        correctIndex: 0,
        rationale: "Ergot alkaloids (Ergometrine) cause generalized vasoconstriction and can provoke life-threatening hypertensive encephalopathy or stroke in hypertensive mothers.",
        competencyDomain: "Pharmacological Contraindications",
      },
      {
        id: "mcq-st2-07",
        stationId: "caosce-st2-midwifery",
        questionNumber: 7,
        question: "During placental inspection, the midwife notes an irregular defect on the maternal surface with missing cotyledon fragments. What is the immediate clinical risk?",
        options: [
          "Secondary postpartum hemorrhage and persistent puerperal sepsis",
          "Neonatal jaundice and hyperbilirubinemia",
          "Immediate pelvic organ prolapse",
          "Postpartum psychosis",
        ],
        correctIndex: 0,
        rationale: "Retained placental cotyledons prevent complete myometrial contraction and provide a nidus for microbial colonization, leading to severe late PPH and endometritis.",
        competencyDomain: "Placental Pathology",
      },
      {
        id: "mcq-st2-08",
        stationId: "caosce-st2-midwifery",
        questionNumber: 8,
        question: "By definition under WHO guidelines, primary postpartum hemorrhage following a vaginal birth is defined as blood loss exceeding:",
        options: [
          "500 mL within 24 hours of delivery",
          "200 mL within 6 hours of delivery",
          "1,000 mL strictly reserved only for vaginal births",
          "50 mL accompanied by mild nausea",
        ],
        correctIndex: 0,
        rationale: "Primary PPH is conventionally defined as cumulative blood loss >= 500 mL following vaginal delivery or >= 1,000 mL following cesarean section within 24 hours.",
        competencyDomain: "Obstetric Diagnostic Criteria",
      },
      {
        id: "mcq-st2-09",
        stationId: "caosce-st2-midwifery",
        questionNumber: 9,
        question: "How frequently should fundal tone be assessed during the first hour following completion of the third stage of labour?",
        options: [
          "Every 15 minutes",
          "Every 60 minutes",
          "Every 4 hours",
          "Once at discharge from the delivery suite",
        ],
        correctIndex: 0,
        rationale: "During the immediate 4th stage of labour (first hour postpartum), fundal palpation and vital signs must be conducted every 15 minutes to detect early occult uterine relaxation and hemorrhage.",
        competencyDomain: "Postnatal Monitoring Protocol",
      },
      {
        id: "mcq-st2-10",
        stationId: "caosce-st2-midwifery",
        questionNumber: 10,
        question: "How does encouraging immediate initiation of skin-to-skin contact and early breastfeeding within the first 30 minutes of birth physiologically aid the third stage?",
        options: [
          "Nipple stimulation triggers endogenous maternal oxytocin release, augmenting uterine contraction",
          "It eliminates the necessity for administering pharmacological oxytocics",
          "It raises maternal cortisol levels to prevent uterine cramping",
          "It accelerates immediate neonatal meconium excretion only",
        ],
        correctIndex: 0,
        rationale: "Suckling and skin-to-skin contact stimulate the maternal posterior pituitary gland to release endogenous pulsatile oxytocin, promoting sustained uterine involution and reducing bleeding.",
        competencyDomain: "Physiological Postpartum Mechanisms",
      },
    ],
  },

  // =========================================================================
  // STATION 3: PEDIATRIC & NEONATAL NURSING
  // =========================================================================
  {
    id: "caosce-st3-pediatrics",
    stationNumber: 3,
    discipline: "Pediatric & Child Health Nursing (Neonatology)",
    title: "Neonatal Resuscitation Protocol (NRP) & Pediatric Emergency Medication Calculation",
    durationMinutes: 10,
    scenario:
      "A term male infant is delivered by emergency cesarean section due to prolonged fetal distress with thick meconium-stained liquor. At birth, the baby is limp, cyanotic, and not breathing. Apgar score at 1 minute is 2. The radiant warmer is ready at your station.",
    candidateInstructions:
      "You have 10 minutes to: (1) Transfer the infant to the pre-heated radiant warmer, dry thoroughly, and remove wet linen, (2) Position the airway in the neutral 'sniffing' position and clear secretions if indicated, (3) Assess heart rate and breathing; initiate Positive Pressure Ventilation (PPV) with Bag-Valve-Mask at 40-60 breaths/min for persistent apnea or HR < 100 bpm, (4) Evaluate response using MR. SOPA corrective steps if chest is not moving, (5) Initiate synchronized chest compressions at 3:1 ratio if HR remains < 60 bpm despite effective ventilation, and (6) Accurately calculate the emergency pediatric epinephrine dose for a 3.0 kg neonate.",
    simulatedPatientBrief:
      "The neonate is a high-fidelity task trainer. Initially presents with no respiratory effort and heart rate audio simulator pulsing at 45 bpm. Improves to HR 110 bpm and spontaneous crying when effective PPV and airway maneuvers are demonstrated.",
    vitalSignsAtEntry: {
      bloodPressure: "Unobtainable at birth",
      heartRate: "45 bpm (severe bradycardia)",
      respiratoryRate: "0 cpm (apneic)",
      temperature: "35.5 °C (hypothermic vulnerability)",
      spO2: "58% at 1 minute of life",
    },
    requiredEquipment: [
      "Neonatal radiant warmer with pre-warmed towels",
      "Neonatal self-inflating resuscitation bag (250-500 mL) with pressure release valve",
      "Correctly sized cushioned neonatal face masks (sizes 0 and 1)",
      "Bulb syringe & mechanical suction catheter (8F/10F set to 80-100 mmHg)",
      "Pulse oximeter with neonatal probe",
      "Stethoscope with pediatric diaphragm",
      "Epinephrine 1:10,000 (0.1 mg/mL) ampoule & 1 mL syringe",
    ],
    checklist: [
      {
        step: 1,
        description: "Place infant under radiant warmer, dry thoroughly, immediately discard wet towel, and position head in slight extension ('sniffing position').",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Avoids hyperextension or flexion of the delicate neonatal neck.",
      },
      {
        step: 2,
        description: "Suction gently first mouth then nose ('M before N') with bulb syringe or suction catheter set at <= 80-100 mmHg if airway is obstructed by secretions.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Suctioning nose before mouth can trigger deep reflex gasp and aspiration.",
      },
      {
        step: 3,
        description: "Provide tactile stimulation by gently rubbing the back or flicking the soles of feet for no more than 5-10 seconds.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Never vigorously shake or slap the neonate.",
      },
      {
        step: 4,
        description: "Auscultate apex heart rate for 6 seconds and multiply by 10; identify persistent apnea and heart rate < 100 bpm requiring immediate PPV.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Delaying PPV beyond the 'Golden Minute' (first 60s of life) constitutes a critical failure.",
      },
      {
        step: 5,
        description: "Apply face mask using the E-C clamp technique ensuring tight seal over nose and mouth without pressing on the eyes or covering the chin.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Air leaks around the mask prevent alveolar expansion.",
      },
      {
        step: 6,
        description: "Deliver positive pressure ventilation with room air (21% O2 for term neonates) at a rate of 40 to 60 breaths per minute ('Breathe, two, three...').",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Uses correct cadence and observes for visible bilateral chest rise.",
      },
      {
        step: 7,
        description: "Recognize inadequate chest rise and state the MR. SOPA corrective steps (Mask readjustment, Reposition airway, Suction mouth/nose, Open mouth, Pressure increase, Alternative airway).",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Must recall ventilation troubleshooting steps systematically.",
      },
      {
        step: 8,
        description: "Re-evaluate heart rate after 30 seconds of effective PPV; note HR remains < 60 bpm and initiate coordinated chest compressions with ventilation.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Must recognize indication for compressions (HR < 60 despite 30s effective PPV).",
      },
      {
        step: 9,
        description: "Perform 2-thumb encircling technique over lower third of sternum delivering 3:1 ratio (3 compressions to 1 ventilation; 90 compressions and 30 breaths per minute).",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Compresses one-third of anterior-posterior chest diameter with complete recoil.",
      },
      {
        step: 10,
        description: "Accurately compute intravenous Epinephrine dosage: calculate 0.02 mg/kg of 1:10,000 solution (0.2 mL/kg) for 3.0 kg infant = 0.6 mL IV push.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Calculation error in pediatric resuscitation drugs constitutes a critical fail.",
      },
    ],
    leadExaminerKeyPoints: [
      "The 'Golden Minute': Initial steps and PPV must be established within first 60 seconds.",
      "Ventilation is the single most important intervention in neonatal resuscitation.",
      "MR. SOPA memory tool must be applied whenever chest expansion is not observed.",
    ],
    clinicalSignificance:
      "Perinatal asphyxia accounts for 24% of all neonatal deaths. Rapid skilled intervention prevents hypoxic-ischemic encephalopathy (HIE) and long-term neurodevelopmental disability.",
    mcqs: [
      {
        id: "mcq-st3-01",
        stationId: "caosce-st3-pediatrics",
        questionNumber: 1,
        question: "Under standard Neonatal Resuscitation Program (NRP) protocols, what is the initial recommended gas mixture for resuscitating a term newborn (>= 35 weeks)?",
        options: [
          "21% oxygen (medical room air)",
          "100% pure oxygen via non-rebreather reservoir",
          "50% oxygen blended with nitrous oxide",
          "10% oxygen with carbon dioxide mixture",
        ],
        correctIndex: 0,
        rationale: "Evidence demonstrates that resuscitating term neonates with 100% oxygen increases mortality and oxidative tissue injury. Resuscitation should begin with room air (21% O2) and titrated using pulse oximetry.",
        competencyDomain: "Neonatal Resuscitation Physiology",
      },
      {
        id: "mcq-st3-02",
        stationId: "caosce-st3-pediatrics",
        questionNumber: 2,
        question: "When clearing the neonatal airway with a bulb syringe, which anatomical sequence must always be followed to prevent reflex aspiration?",
        options: [
          "Suction the mouth first, then the nose ('M before N')",
          "Suction the nose first, then the mouth",
          "Suction deep posterior pharynx before anterior mouth",
          "Suction left nostril followed by right nostril only",
        ],
        correctIndex: 0,
        rationale: "Suctioning the nose first induces a reflex gasp, causing the infant to aspirate secretions present in the oral cavity. Suctioning 'Mouth before Nose' prevents this.",
        competencyDomain: "Airway Management",
      },
      {
        id: "mcq-st3-03",
        stationId: "caosce-st3-pediatrics",
        questionNumber: 3,
        question: "What is the targeted ventilation rate when providing Bag-Valve-Mask positive pressure ventilation to an apneic newborn?",
        options: [
          "40 to 60 breaths per minute",
          "15 to 20 breaths per minute",
          "80 to 100 breaths per minute",
          "10 to 12 breaths per minute",
        ],
        correctIndex: 0,
        rationale: "The standard neonatal PPV cadence is 40-60 breaths per minute, rhythmically delivered by squeezing the bag on 'Breathe' and releasing on 'Two, Three'.",
        competencyDomain: "Resuscitation Cadence",
      },
      {
        id: "mcq-st3-04",
        stationId: "caosce-st3-pediatrics",
        questionNumber: 4,
        question: "What mnemonic is universally utilized to systematically troubleshoot positive pressure ventilation when bilateral chest rise is not observed?",
        options: [
          "MR. SOPA (Mask, Reposition, Suction, Open mouth, Pressure increase, Alternate airway)",
          "FAST (Face, Arms, Speech, Time)",
          "ABCDE (Airway, Breathing, Circulation, Disability, Exposure)",
          "SAMPLE (Signs, Allergies, Meds, Past history, Last meal, Events)",
        ],
        correctIndex: 0,
        rationale: "MR. SOPA outlines the standard corrective ventilation steps in neonatal resuscitation to overcome poor seal, malpositioned airway, or airway obstruction.",
        competencyDomain: "NRP Troubleshooting",
      },
      {
        id: "mcq-st3-05",
        stationId: "caosce-st3-pediatrics",
        questionNumber: 5,
        question: "Chest compressions in a neonate are indicated when the heart rate remains:",
        options: [
          "Less than 60 beats per minute despite at least 30 seconds of effective PPV with chest movement",
          "Less than 100 beats per minute immediately at delivery",
          "Between 60 and 80 beats per minute while spontaneously crying",
          "Less than 120 beats per minute during maternal skin-to-skin",
        ],
        correctIndex: 0,
        rationale: "Chest compressions are initiated only when the heart rate remains below 60 bpm after at least 30 seconds of confirmed effective positive-pressure ventilation that moves the chest.",
        competencyDomain: "Resuscitation Algorithms",
      },
      {
        id: "mcq-st3-06",
        stationId: "caosce-st3-pediatrics",
        questionNumber: 6,
        question: "What is the correct ratio of chest compressions to ventilations during neonatal cardiopulmonary resuscitation?",
        options: [
          "3 compressions to 1 ventilation (3:1 ratio)",
          "15 compressions to 2 ventilations (15:2 ratio)",
          "30 compressions to 2 ventilations (30:2 ratio)",
          "5 compressions to 1 ventilation (5:1 ratio)",
        ],
        correctIndex: 0,
        rationale: "Neonatal cardiac arrest is almost exclusively asphyxial in origin. A 3:1 ratio provides 90 compressions and 30 breaths per minute (120 total events/min), maximizing oxygenation.",
        competencyDomain: "Neonatal BLS Standards",
      },
      {
        id: "mcq-st3-07",
        stationId: "caosce-st3-pediatrics",
        questionNumber: 7,
        question: "A 3.0 kg infant requires intravenous Epinephrine (1:10,000 concentration). Using the recommended dose of 0.02 mg/kg (0.2 mL/kg), what exact volume should be drawn into the syringe?",
        options: [
          "0.6 mL",
          "6.0 mL",
          "0.06 mL",
          "3.0 mL",
        ],
        correctIndex: 0,
        rationale: "Calculation: 3.0 kg x 0.2 mL/kg = 0.6 mL of 1:10,000 (0.1 mg/mL) epinephrine solution.",
        competencyDomain: "Pediatric Dosage Calculations",
      },
      {
        id: "mcq-st3-08",
        stationId: "caosce-st3-pediatrics",
        questionNumber: 8,
        question: "What preferred chest compression technique provides superior coronary perfusion pressure in a neonate?",
        options: [
          "Two-thumb encircling-hands technique with fingers supporting the back",
          "Two-finger technique utilizing index and middle finger tips",
          "One-handed palm heel compression",
          "Back slaps in prone head-down position",
        ],
        correctIndex: 0,
        rationale: "The two-thumb encircling technique is preferred because it generates higher blood pressure, superior coronary artery perfusion, and more consistent compression depth with less rescuer fatigue.",
        competencyDomain: "Compression Technique",
      },
      {
        id: "mcq-st3-09",
        stationId: "caosce-st3-pediatrics",
        questionNumber: 9,
        question: "Where should the pulse oximeter probe be attached on a newborn to measure accurate pre-ductal arterial oxygen saturation?",
        options: [
          "Right wrist or palm",
          "Left foot or ankle",
          "Right earlobe",
          "Umbilical cord stump",
        ],
        correctIndex: 0,
        rationale: "Blood flowing to the right upper extremity originates from the brachiocephalic artery proximal to the ductus arteriosus, reflecting true pre-ductal blood oxygen supply to the neonatal brain.",
        competencyDomain: "Neonatal Monitoring",
      },
      {
        id: "mcq-st3-10",
        stationId: "caosce-st3-pediatrics",
        questionNumber: 10,
        question: "What is the expected normal physiological pre-ductal oxygen saturation (SpO2) at 1 minute after birth in a healthy newborn?",
        options: [
          "60% to 65%",
          "95% to 100%",
          "85% to 90%",
          "30% to 40%",
        ],
        correctIndex: 0,
        rationale: "Normal intra-uterine fetal saturation is 60%. Following birth, SpO2 rises gradually over 10 minutes: 60-65% at 1 min, 70-75% at 3 min, and >= 85-95% by 10 minutes.",
        competencyDomain: "Neonatal Physiological Transition",
      },
    ],
  },

  // =========================================================================
  // STATION 4: MENTAL HEALTH & PSYCHIATRIC NURSING
  // =========================================================================
  {
    id: "caosce-st4-psychiatry",
    stationNumber: 4,
    discipline: "Mental Health & Psychiatric Nursing",
    title: "Acute Psychosis De-escalation, Mental State Examination (MSE) & Suicide Risk Assessment",
    durationMinutes: 10,
    scenario:
      "A 24-year-old university student is brought to the emergency psychiatric assessment suite by his roommate. He is pacing rapidly, muttering, shouting at unseen figures, and clutching a broken glass ornament. His roommate reports he has not slept in 4 days, stopped eating, and sent a farewell text saying 'The voices tell me to end it all tonight to save the world'.",
    candidateInstructions:
      "You have 10 minutes to: (1) Ensure environmental safety and maintain personal security exit route, (2) Apply verbal de-escalation skills to establish rapport and calm the client, (3) Safely negotiate relinquishment of the broken glass without physical struggle, (4) Conduct a targeted Mental State Examination (MSE) focusing on perception, thought content, and risk, (5) Complete a structured suicide and homicide risk tiering, and (6) Formulate an immediate safety contract and nurse-led psychiatric observation plan.",
    simulatedPatientBrief:
      "The standardized actor is intensely vigilant, pacing near the corner, glaring with wide eyes, and gripping the glass. Speaks rapidly: 'Stay back! Can't you hear them whispering? They said I am condemned!'. If the candidate displays calm, non-threatening body language and validates feelings without arguing delusions, the actor lowers the glass and consents to sit down.",
    vitalSignsAtEntry: {
      bloodPressure: "144/92 mmHg",
      heartRate: "112 bpm (tachycardia secondary to acute arousal)",
      respiratoryRate: "24 cpm",
      temperature: "37.1 °C",
      spO2: "98% on room air",
    },
    requiredEquipment: [
      "Simulated safe clinical consultation room (clear egress, heavy furniture anchored, no sharp objects)",
      "Standardized Suicide Risk Assessment Tool (Columbia-Suicide Severity Rating Scale - C-SSRS)",
      "Emergency panic button / alarm lanyard",
      "Oral antipsychotic and anxiolytic medication demonstration set (Haloperidol, Olanzapine, Lorazepam)",
    ],
    checklist: [
      {
        step: 1,
        description: "Verify personal and team safety: ensure clear physical exit path, position self between client and door, and notify security/colleague of interview.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Positioning self in a corner behind an agitated armed client without an exit constitutes a critical safety failure.",
      },
      {
        step: 2,
        description: "Maintain non-threatening stance: stand at a 45-degree angle at a safe distance (minimum 2 arm lengths), hands open and visible, relaxed posture.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Does not cross arms, clench fists, or invade personal space.",
      },
      {
        step: 3,
        description: "Use calm, low-pitched, slow, and clear verbal communication, introducing self by name and stating purpose empathetically.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Speaks respectfully without shouting, arguing, or matching client's volume.",
      },
      {
        step: 4,
        description: "Validate client's emotional distress without validating or reinforcing delusional beliefs ('I can see you are terrified right now; I am here to help you stay safe').",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Does not tell client 'The voices are fake and you are crazy'.",
      },
      {
        step: 5,
        description: "Negotiate relinquishment of the weapon by requesting the client to place the broken glass on a nearby table rather than grabbing or tackling.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Physically lunging to snatch the weapon triggers violence and is a critical safety failure.",
      },
      {
        step: 6,
        description: "Conduct structured Mental State Examination evaluating: Appearance, Behavior, Speech, Mood/Affect, Perception (command auditory hallucinations), and Thought Content.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Explores what the voices are instructing the patient to do.",
      },
      {
        step: 7,
        description: "Assess suicide risk directly and explicitly: ask about current suicidal ideation, intent, plan, access to lethal means, and previous attempts.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Avoiding the word 'suicide' out of discomfort is an evaluation failure.",
      },
      {
        step: 8,
        description: "Identify command auditory hallucinations instructing self-harm as an immediate high-risk psychiatric emergency requiring Level 1 (Constant 1:1) observation.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Correctly stratifies to High / Acute risk tier.",
      },
      {
        step: 9,
        description: "Offer rapid calming medication (oral second-generation antipsychotic or short-acting benzodiazepine) explaining purpose collaboratively.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Discusses medication respectfully to obtain assent rather than threatening forced injection.",
      },
      {
        step: 10,
        description: "Document MSE findings thoroughly, establish environmental ligature checks, and hand over to nursing team for continuous line-of-sight monitoring.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Completes C-SSRS documentation and handover according to Mental Health Nursing Standards.",
      },
    ],
    leadExaminerKeyPoints: [
      "Safety first: Never trap the patient or allow the patient to trap the nurse.",
      "Command hallucinations directing harm are the highest clinical indicator of imminent risk.",
      "Direct questioning about suicide does not implant suicidal ideas; it provides life-saving relief.",
    ],
    clinicalSignificance:
      "Prevents completed inpatient suicide, staff assault, and facilitates rapid stabilization of acute psychiatric crisis within human-rights-based mental healthcare guidelines.",
    mcqs: [
      {
        id: "mcq-st4-01",
        stationId: "caosce-st4-psychiatry",
        questionNumber: 1,
        question: "When interviewing an agitated client experiencing paranoid delusions who is carrying a sharp object, what is the nurse's first environmental safety priority?",
        options: [
          "Ensuring an unobstructed path to the exit and positioning self between the client and the door",
          "Closing and locking all consultation room doors to prevent the client from escaping",
          "Attempting an immediate physical tackle to disarm the client",
          "Leaving the client alone in the locked room for 2 hours to calm down",
        ],
        correctIndex: 0,
        rationale: "Safety principles dictate that the nurse must never allow an agitated patient to block the room exit. The nurse must maintain clear egress at all times.",
        competencyDomain: "Psychiatric Milieu & Personal Safety",
      },
      {
        id: "mcq-st4-02",
        stationId: "caosce-st4-psychiatry",
        questionNumber: 2,
        question: "A client states: 'The radio is broadcasting secret messages instructing me to jump off the bridge tonight.' How should the nurse therapeutically respond?",
        options: [
          "'I do not hear the radio messages, but I can hear how frightened you are, and I am here to keep you safe.'",
          "'That is completely impossible because the radio is unplugged.'",
          "'Yes, I can hear them too, what else are they telling you to do?'",
          "'You must stop thinking such nonsensical thoughts immediately.'",
        ],
        correctIndex: 0,
        rationale: "Therapeutic communication acknowledges and validates the client's genuine emotional distress and fear without validating or reinforcing the hallucinatory/delusional content.",
        competencyDomain: "Therapeutic Communication",
      },
      {
        id: "mcq-st4-03",
        stationId: "caosce-st4-psychiatry",
        questionNumber: 3,
        question: "Which type of perceptual disturbance carries the highest statistical risk for imminent violent or self-injurious behavior?",
        options: [
          "Command auditory hallucinations compelling specific destructive actions",
          "Transient visual hypnagogic illusions upon falling asleep",
          "Gustatory hallucinations of bitter taste",
          "Olfactory perception of burning rubber",
        ],
        correctIndex: 0,
        rationale: "Command auditory hallucinations, particularly when paired with delusions and impaired reality testing, carry the highest risk of compliance and violent or suicidal behavior.",
        competencyDomain: "Risk Stratification",
      },
      {
        id: "mcq-st4-04",
        stationId: "caosce-st4-psychiatry",
        questionNumber: 4,
        question: "What is the recommended level of nursing observation for a patient with acute command auditory hallucinations to commit suicide and expressed intent?",
        options: [
          "Level 1: Continuous one-to-one (1:1) arm's-length or line-of-sight observation",
          "Level 3: Intermittent checks every 30 to 60 minutes",
          "Level 4: General ward observation once per shift",
          "Discharge home with an outpatient referral card",
        ],
        correctIndex: 0,
        rationale: "Patients with acute suicidal intent and command hallucinations must be placed under continuous 1:1 line-of-sight nursing supervision with environmental ligature searches.",
        competencyDomain: "Psychiatric Nursing Interventions",
      },
      {
        id: "mcq-st4-05",
        stationId: "caosce-st4-psychiatry",
        questionNumber: 5,
        question: "A client receiving typical high-potency antipsychotic therapy (Haloperidol) develops acute painful spasm of the neck muscles and upward oculogyric crisis. Which extrapyramidal symptom (EPS) is this?",
        options: [
          "Acute dystonic reaction",
          "Akathisia",
          "Tardive dyskinesia",
          "Neuroleptic malignant syndrome",
        ],
        correctIndex: 0,
        rationale: "Acute dystonia involves sudden, painful sustained contractions of muscle groups (torticollis, oculogyric crisis) occurring within hours to days of starting typical antipsychotics, rapidly reversed by anticholinergics.",
        competencyDomain: "Psychopharmacology Adverse Effects",
      },
      {
        id: "mcq-st4-06",
        stationId: "caosce-st4-psychiatry",
        questionNumber: 6,
        question: "What is the immediate pharmacological antidote to administer for acute antipsychotic-induced severe dystonia?",
        options: [
          "Intravenous or intramuscular Benztropine or Diphenhydramine (anticholinergic)",
          "Flumazenil",
          "Naloxone hydrochloride",
          "Oral Haloperidol booster dose",
        ],
        correctIndex: 0,
        rationale: "Anticholinergic agents (Benztropine mesylate 1-2 mg or Diphenhydramine 50 mg IM/IV) rapidly restore the dopamine-acetylcholine balance in the basal ganglia, relieving dystonia within minutes.",
        competencyDomain: "Emergency Psychopharmacology",
      },
      {
        id: "mcq-st4-07",
        stationId: "caosce-st4-psychiatry",
        questionNumber: 7,
        question: "Which constellation of symptoms characterizes the life-threatening psychiatric emergency known as Neuroleptic Malignant Syndrome (NMS)?",
        options: [
          "High fever (hyperthermia), extreme 'lead-pipe' muscle rigidity, autonomic instability, and elevated creatine kinase (CK)",
          "Hypothermia, flaccid paralysis, and polyuria",
          "Hyperactivity, euphoria, and rapid pressured speech",
          "Mild skin rash with pruritus and eosinophilia",
        ],
        correctIndex: 0,
        rationale: "NMS is a medical emergency characterized by hyperthermia, extreme generalized muscle rigidity, autonomic dysregulation (tachycardia, labile BP), altered consciousness, and elevated serum CK.",
        competencyDomain: "Psychiatric Emergencies",
      },
      {
        id: "mcq-st4-08",
        stationId: "caosce-st4-psychiatry",
        questionNumber: 8,
        question: "What common misconception regarding suicide assessment must nurses actively discard?",
        options: [
          "Asking a patient directly about suicide triggers or plants the idea in their mind",
          "Most people who die by suicide communicate warning signs beforehand",
          "Direct questioning provides an opportunity for therapeutic intervention",
          "Suicidal ideation can fluctuate rapidly over short periods",
        ],
        correctIndex: 0,
        rationale: "Research confirms that asking directly, openly, and non-judgmentally about suicide does NOT cause or increase suicidal thoughts; rather, it lowers anxiety and invites life-saving disclosure.",
        competencyDomain: "Suicide Assessment Principles",
      },
      {
        id: "mcq-st4-09",
        stationId: "caosce-st4-psychiatry",
        questionNumber: 9,
        question: "In a patient maintained on Lithium carbonate for bipolar affective disorder, what therapeutic serum concentration range must be maintained for maintenance therapy?",
        options: [
          "0.6 to 1.0 mEq/L (or mmol/L)",
          "2.0 to 3.5 mEq/L",
          "0.1 to 0.3 mEq/L",
          "5.0 to 10.0 mEq/L",
        ],
        correctIndex: 0,
        rationale: "The standard therapeutic window for lithium maintenance is 0.6 to 1.0 mEq/L (0.8-1.2 in acute mania). Levels >= 1.5 mEq/L cause toxic tremors, ataxia, and renal failure.",
        competencyDomain: "Psychopharmacology & Therapeutic Monitoring",
      },
      {
        id: "mcq-st4-10",
        stationId: "caosce-st4-psychiatry",
        questionNumber: 10,
        question: "Under mental health legislation, when may an involuntary emergency psychiatric admission be legally justified?",
        options: [
          "When the individual has a severe mental illness causing imminent risk of serious physical harm to themselves or others",
          "Whenever family members disagree with the client's political beliefs",
          "Whenever a person chooses an eccentric lifestyle without self-harm",
          "Only after a criminal conviction has been processed in court",
        ],
        correctIndex: 0,
        rationale: "Involuntary psychiatric detention is strictly restricted to situations where severe mental impairment causes substantial and imminent danger to self or others, and voluntary treatment is refused.",
        competencyDomain: "Mental Health Law & Ethics",
      },
    ],
  },

  // =========================================================================
  // STATION 5: COMMUNITY & PUBLIC HEALTH NURSING
  // =========================================================================
  {
    id: "caosce-st5-community",
    stationNumber: 5,
    discipline: "Community & Public Health Nursing",
    title: "EPI Vaccine Cold-Chain Management, Potency Validation & Acute Epidemic Outbreak Response",
    durationMinutes: 10,
    scenario:
      "You are the public health nurse-in-charge at a rural Primary Healthcare Centre. Following an overnight 14-hour electrical power grid failure, you arrive at 07:30 to find the solar backup inverter beeped off. The top-opening ice-lined vaccine refrigerator digital thermometer reads +14 °C (target +2 °C to +8 °C). Furthermore, 4 community members have just presented with acute profuse watery 'rice-water' diarrhea and severe dehydration.",
    candidateInstructions:
      "You have 10 minutes to: (1) Execute the immediate emergency cold-chain breach contingency protocol, (2) Inspect the Vaccine Vial Monitors (VVM) on heat-sensitive vaccines (OPV, Measles, BCG, Rotavirus) to determine viability versus condemnation, (3) Perform the Shake Test protocol or determine freeze-damage risk on freeze-sensitive vaccines (Pentavalent, Tetanus, Hepatitis B), (4) Triage the acute diarrhea presentation using WHO cholera dehydration scale (Severe, Some, No dehydration), (5) Calculate and initiate emergency Oral Rehydration Solution (ORS) / IV Ringer's Lactate resuscitation, and (6) Notify the local Disease Surveillance and Notification Officer (DSNO) under IDSR guidelines.",
    simulatedPatientBrief:
      "A simulated mother sits with a lethargic 4-year-old child presenting with sunken eyes, skin pinch retracting very slowly (> 2 seconds), and weak thready pulse. The mother is weeping: 'Nurse, three of our neighbors died yesterday from this purging and vomiting!'.",
    vitalSignsAtEntry: {
      bloodPressure: "76/48 mmHg (hypotensive shock)",
      heartRate: "136 bpm (marked tachycardia)",
      respiratoryRate: "28 cpm (deep rapid Kussmaul-type breathing)",
      temperature: "36.2 °C (cool peripheries)",
      spO2: "95% on room air",
    },
    requiredEquipment: [
      "Vaccine cold box with conditioned ice-packs",
      "Assortment of vaccine vials with simulated VVM stages (Stage 1, 2, 3, and 4)",
      "Stem and dial thermometers with log sheet",
      "WHO Cholera rapid diagnostic dipstick test kit",
      "ORS sachets and 1-liter clean water measuring container",
      "IV infusion equipment: Ringer's Lactate 500 mL, 22G/24G pediatric cannulae, IV infusion set",
      "Integrated Disease Surveillance and Response (IDSR) 001 reporting form",
    ],
    checklist: [
      {
        step: 1,
        description: "Maintain refrigerator door closed immediately to preserve residual cold air; do not leave lid open while inspecting.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Opening and leaving lid wide open rapidly warms the internal chamber.",
      },
      {
        step: 2,
        description: "Verify internal temperature on certified dial thermometer, log reading (+14 °C), and prepare conditioned ice-packs in transport cold box.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Conditioning ice-packs until moisture/rattling appears prevents freeze damage.",
      },
      {
        step: 3,
        description: "Examine Vaccine Vial Monitors (VVM) systematically: differentiate Stage 1 & 2 (usable if expiry valid) from Stage 3 & 4 (inner square matches or darker than circle = discard/condemn).",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Administering vaccine with VVM Stage 3 or 4 constitutes a critical failure (ineffective/spoiled biological).",
      },
      {
        step: 4,
        description: "Identify heat-sensitive vaccines (OPV, Measles) and transfer viable vials into prepared cold box maintaining strict +2 °C to +8 °C.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Organizes cold box neatly with foam pad separating vaccines from ice.",
      },
      {
        step: 5,
        description: "Differentiate freeze-sensitive vaccines (Pentavalent DTP-HepB-Hib, PCV, Td) from heat-sensitive vaccines; demonstrate knowledge of the Shake Test.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Correctly identifies that freeze-sensitive vaccines lose potency if frozen and precipitate.",
      },
      {
        step: 6,
        description: "Triage the acute watery diarrhea child: identify sunken eyes, skin pinch > 2 seconds, lethargy, and low BP as WHO 'Severe Dehydration'.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Misdiagnosing severe dehydration in cholera as mild dehydration leads to fatal hypovolemic collapse.",
      },
      {
        step: 7,
        description: "Initiate Plan C fluid resuscitation: establish immediate IV access and prescribe Ringer's Lactate 100 mL/kg (30 mL/kg in first 30 mins, 70 mL/kg over 2.5 hours).",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Knows correct pediatric Plan C hydration formula for children over 1 year.",
      },
      {
        step: 8,
        description: "Explain proper reconstitution of standard ORS (dissolve 1 sachet in exactly 1 liter of clean drinking water; discard unused portion after 24 hours).",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Incorrect water volumes alter osmolarity (hypertonic solution exacerbates diarrhea).",
      },
      {
        step: 9,
        description: "Perform infection prevention: isolate suspected cholera cases, don protective apron/gloves, prepare 0.5% chlorine solution for excreta/disinfection and 0.05% for hand hygiene.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Demonstrates standard cholera outbreak WASH (Water, Sanitation, Hygiene) protocols.",
      },
      {
        step: 10,
        description: "Complete IDSR epidemic notification form within 24 hours to the LGA Disease Surveillance Officer and initiate community contact tracing.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Cholera is an epidemic-prone notifiable disease requiring immediate reporting.",
      },
    ],
    leadExaminerKeyPoints: [
      "VVM Stage 3 and 4 vials must never be administered.",
      "WHO Plan C resuscitation saves lives in severe cholera dehydration within hours.",
      "IDSR reporting within 24 hours is mandatory under national public health law.",
    ],
    clinicalSignificance:
      "Maintains community immunization efficacy preventing measles/polio outbreaks, and controls cholera case-fatality rates below the 1% international humanitarian benchmark.",
    mcqs: [
      {
        id: "mcq-st5-01",
        stationId: "caosce-st5-community",
        questionNumber: 1,
        question: "What is the universally mandated standard cold-chain temperature range for storing routine Expanded Programme on Immunization (EPI) vaccines at the health facility level?",
        options: [
          "+2 °C to +8 °C",
          "-10 °C to -20 °C only",
          "+10 °C to +15 °C",
          "0 °C to +4 °C only",
        ],
        correctIndex: 0,
        rationale: "The standard international cold-chain storage temperature range for health facility refrigerators is +2 °C to +8 °C.",
        competencyDomain: "Cold-Chain Standards",
      },
      {
        id: "mcq-st5-02",
        stationId: "caosce-st5-community",
        questionNumber: 2,
        question: "When reading a Vaccine Vial Monitor (VVM), what visual appearance indicates that the vaccine has reached its discard point and MUST NOT be used?",
        options: [
          "The color of the inner square matches or is darker than the surrounding outer circle (Stage 3 or 4)",
          "The inner square is completely white while the outer circle is dark (Stage 1)",
          "The inner square is slightly lighter than the outer circle and before expiry (Stage 2)",
          "The entire label is transparent and reflective",
        ],
        correctIndex: 0,
        rationale: "Stage 3 (inner square color matches outer circle) and Stage 4 (inner square is darker than outer circle) indicate cumulative heat exposure beyond safe limits; such vaccines must be discarded immediately.",
        competencyDomain: "Vaccine Vial Monitor Interpretation",
      },
      {
        id: "mcq-st5-03",
        stationId: "caosce-st5-community",
        questionNumber: 3,
        question: "Which of the following routine childhood vaccines is most sensitive to irreversible potency destruction if accidentally frozen?",
        options: [
          "Pentavalent (DTP-HepB-Hib) vaccine",
          "Oral Polio Vaccine (OPV)",
          "Measles vaccine",
          "BCG vaccine",
        ],
        correctIndex: 0,
        rationale: "Adsorbed vaccines containing aluminium adjuvants (such as Pentavalent, Tetanus toxoid, Hepatitis B) are destroyed when frozen because ice crystals strip the antigen from the adjuvant.",
        competencyDomain: "Vaccine Thermostability",
      },
      {
        id: "mcq-st5-04",
        stationId: "caosce-st5-community",
        questionNumber: 4,
        question: "What is the purpose of performing the 'Shake Test' in a community health clinic?",
        options: [
          "To determine if an aluminium-adsorbed freeze-sensitive vaccine has suffered irreversible freeze damage",
          "To mix the live attenuated measles virus with diluent",
          "To test whether Oral Polio Vaccine drops have expired",
          "To dissolve clumps of vitamin A capsules",
        ],
        correctIndex: 0,
        rationale: "The Shake Test compares the sedimentation rate of a suspected frozen vial against a deliberately frozen control. Frozen vials sediment much faster due to lattice crystallization of the adjuvant.",
        competencyDomain: "Vaccine Quality Assurance",
      },
      {
        id: "mcq-st5-05",
        stationId: "caosce-st5-community",
        questionNumber: 5,
        question: "According to the WHO Integrated Management of Childhood Illness (IMCI) classification, a child with acute diarrhea who is lethargic, has sunken eyes, and whose skin pinch goes back very slowly (> 2 seconds) is classified as:",
        options: [
          "Severe Dehydration (requiring Plan C IV resuscitation)",
          "Some Dehydration (requiring Plan B ORS therapy)",
          "No Dehydration (requiring Plan A home fluids)",
          "Mild Intolerance to Lactose",
        ],
        correctIndex: 0,
        rationale: "Presence of two or more signs: lethargy/unconsciousness, sunken eyes, unable to drink/drinking poorly, or skin pinch > 2 seconds categorizes the child as having Severe Dehydration.",
        competencyDomain: "IMCI Dehydration Assessment",
      },
      {
        id: "mcq-st5-06",
        stationId: "caosce-st5-community",
        questionNumber: 6,
        question: "What is the intravenous fluid of first choice for rapid rehydration of a patient presenting with severe dehydration due to suspected cholera?",
        options: [
          "Ringer's Lactate solution (or Hartmann's)",
          "5% Dextrose in Water (D5W)",
          "0.45% Half-Normal Saline",
          "10% Dextrose with Potassium Chloride bolus",
        ],
        correctIndex: 0,
        rationale: "Ringer's Lactate is the fluid of choice because its electrolyte composition closely mimics cholera stool losses and provides lactate to buffer metabolic acidosis.",
        competencyDomain: "Fluid Resuscitation Protocols",
      },
      {
        id: "mcq-st5-07",
        stationId: "caosce-st5-community",
        questionNumber: 7,
        question: "What is the total volume of clean drinking water required to properly reconstitute one standard WHO low-osmolarity Oral Rehydration Salt (ORS) packet?",
        options: [
          "Exactly 1,000 mL (1.0 liter)",
          "500 mL (half liter)",
          "2,000 mL (2.0 liters)",
          "250 mL (one drinking cup)",
        ],
        correctIndex: 0,
        rationale: "One standard sachet must be dissolved in exactly 1 liter (1,000 mL) of water to achieve the target low osmolarity (245 mOsm/L). Diluting with too little water creates hyperosmolar diarrhea.",
        competencyDomain: "Oral Rehydration Therapy",
      },
      {
        id: "mcq-st5-08",
        stationId: "caosce-st5-community",
        questionNumber: 8,
        question: "Once reconstituted, what is the maximum duration that prepared liquid ORS solution may be safely kept at room temperature before discarding?",
        options: [
          "24 hours",
          "72 hours",
          "1 hour",
          "7 days",
        ],
        correctIndex: 0,
        rationale: "Reconstituted ORS must be covered and discarded after 24 hours to prevent bacterial contamination and enteropathogen proliferation in warm environments.",
        competencyDomain: "Safe Community Preparation",
      },
      {
        id: "mcq-st5-09",
        stationId: "caosce-st5-community",
        questionNumber: 9,
        question: "Which chlorine bleach concentration is recommended for disinfecting patient excreta, corpses, and severe cholera vomit spills?",
        options: [
          "0.5% (5,000 ppm) active chlorine solution",
          "0.05% (500 ppm) active chlorine solution",
          "0.005% active chlorine solution",
          "Undiluted pure ammonia",
        ],
        correctIndex: 0,
        rationale: "0.5% chlorine is required for biological spills, vomit, feces, and dead bodies in cholera wards. 0.05% is used for handwashing and bare skin.",
        competencyDomain: "Outbreak Environmental Sanitization",
      },
      {
        id: "mcq-st5-10",
        stationId: "caosce-st5-community",
        questionNumber: 10,
        question: "Under Integrated Disease Surveillance and Response (IDSR) guidelines, within what timeframe must suspected cholera cases be officially reported to the health authority?",
        options: [
          "Immediately within 24 hours",
          "At the end of the calendar month",
          "Within 14 days",
          "Only after laboratory stool PCR confirmation 2 weeks later",
        ],
        correctIndex: 0,
        rationale: "Cholera is an epidemic-prone notifiable disease requiring immediate verbal and electronic/paper notification within 24 hours to mobilize containment and ring vaccination.",
        competencyDomain: "Public Health Surveillance & Law",
      },
    ],
  },

  // =========================================================================
  // STATION 6: EMERGENCY, TRAUMA & CRITICAL CARE NURSING
  // =========================================================================
  {
    id: "caosce-st6-emergency",
    stationNumber: 6,
    discipline: "Emergency, Trauma & Critical Care Nursing",
    title: "ABCDE Primary Trauma Survey, Needle Thoracostomy & Mass-Casualty Disaster Triage",
    durationMinutes: 10,
    scenario:
      "A 32-year-old female driver is rushed into the trauma resuscitation bay following a high-speed head-on motor vehicle collision. She was unrestrained. On arrival, she is cyanotic, gasping for breath, clutching her right hemithorax, with tracheal deviation to the left side and absent breath sounds over the right chest. Distended neck veins are noted.",
    candidateInstructions:
      "You have 10 minutes to: (1) Don protective PPE and secure immediate manual in-line cervical spine immobilization, (2) Conduct systematic ABCDE Primary Survey, (3) Rapidly identify the life-threatening emergency (right-sided tension pneumothorax) and perform/verbalize emergency needle thoracostomy decompression, (4) Re-assess breathing and apply high-flow oxygen via non-rebreather mask, (5) Assess circulation: establish two large-bore IV access lines (14G/16G) and initiate balanced warmed crystalloids for class III hemorrhagic shock, (6) Calculate Glasgow Coma Scale (GCS) and assign START mass-casualty triage color tag.",
    simulatedPatientBrief:
      "High-fidelity trauma manikin. Trachea displaced visibly to left, right chest hyper-resonant to percussion with no vesicular breath sounds. Blood pressure rapidly falling. After successful needle decompression in the 2nd intercostal space mid-clavicular line, simulated hiss of air escapes and oxygen saturation rises.",
    vitalSignsAtEntry: {
      bloodPressure: "72/40 mmHg (decompensated shock)",
      heartRate: "142 bpm (severe sinus tachycardia, weak radial pulse)",
      respiratoryRate: "34 cpm (tachypneic, accessory muscle use)",
      temperature: "35.8 °C",
      spO2: "74% on room air",
      painScore: "Unable to state due to severe distress",
    },
    requiredEquipment: [
      "Rigid cervical collar and manual head immobilizer blocks",
      "14-gauge / 16-gauge (8 cm long) over-the-needle cannula for thoracostomy",
      "Chest drainage tube (28F/32F) with underwater seal drain system",
      "High-flow non-rebreather oxygen mask with reservoir bag and O2 cylinder",
      "Two large-bore IV cannulae (14G orange or 16G gray) & tourniquet",
      "Warmed Ringer's Lactate IV bags and rapid pressure infuser",
      "START triage color bands (Red, Yellow, Green, Black)",
    ],
    checklist: [
      {
        step: 1,
        description: "Maintain cervical spine control immediately using manual in-line immobilization while opening airway with jaw-thrust maneuver without head-tilt.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Performing head-tilt chin-lift on a polytrauma patient risks transecting damaged cervical spinal cord.",
      },
      {
        step: 2,
        description: "Assess airway patency: clear blood/teeth with rigid Yankauer suction under direct vision, insert appropriate oropharyngeal airway if tolerated.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Ensures unobstructed airflow while protecting spine.",
      },
      {
        step: 3,
        description: "Assess breathing: inspect chest expansion, auscultate bilateral breath sounds, percuss hemithoraces, and palpate for surgical emphysema.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Detects absent right breath sounds, hyper-resonance, and tracheal deviation.",
      },
      {
        step: 4,
        description: "Diagnose clinical tension pneumothorax immediately; do NOT delay decompression to await a chest X-ray.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Sending an unstable tension pneumothorax patient for X-ray causes cardiac arrest and is a critical failure.",
      },
      {
        step: 5,
        description: "Perform emergency needle thoracostomy: insert 14-gauge 8 cm needle at 2nd intercostal space mid-clavicular line (or 4th/5th ICS anterior-axillary line) directly above the rib margin.",
        points: 10,
        criticalFailStep: true,
        examinerGuidance: "Inserting below rib damages intercostal neurovascular bundle.",
      },
      {
        step: 6,
        description: "Confirm immediate rush of escaping air, remove stylet leaving plastic catheter in place, and prepare for definitive tube thoracostomy (chest drain).",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Connects one-way valve or underwater seal.",
      },
      {
        step: 7,
        description: "Apply 100% high-flow oxygen via non-rebreather mask with reservoir bag filled at 12-15 L/min.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Ensures reservoir bag does not completely deflate on inspiration.",
      },
      {
        step: 8,
        description: "Circulation: insert two large-bore (14G or 16G) peripheral IV lines, draw blood for cross-match and trauma labs, and start warmed crystalloid/blood.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Recognizes class III shock (tachycardia + hypotension).",
      },
      {
        step: 9,
        description: "Disability: calculate Glasgow Coma Scale (Eye opening, Verbal response, Motor response: E3 V4 M5 = 12/15) and assess pupillary light reflex.",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Accurate GCS scoring without missing components.",
      },
      {
        step: 10,
        description: "Exposure/Environment: expose patient to inspect for occult hemorrhage while preventing hypothermia, and assign START triage Red Tag (Immediate).",
        points: 10,
        criticalFailStep: false,
        examinerGuidance: "Covers patient with warm blankets; correctly categorizes as RED.",
      },
    ],
    leadExaminerKeyPoints: [
      "Tension pneumothorax is a purely clinical diagnosis: never delay decompression for radiography.",
      "C-spine control must never be released until cleared by imaging or clinical protocol.",
      "Needle decompression converts a fatal tension pneumothorax into a manageable simple pneumothorax.",
    ],
    clinicalSignificance:
      "Immediate recognition and needle thoracostomy prevents obstructive shock and PEA cardiac arrest within minutes of blunt or penetrating thoracic trauma.",
    mcqs: [
      {
        id: "mcq-st6-01",
        stationId: "caosce-st6-emergency",
        questionNumber: 1,
        question: "In a blunt polytrauma victim, what airway opening maneuver must be utilized to maintain cervical spine alignment?",
        options: [
          "Modified jaw-thrust maneuver without head extension",
          "Head-tilt chin-lift maneuver",
          "Hyperextension of neck over a rolled towel",
          "Prone positioning with lateral head rotation",
        ],
        correctIndex: 0,
        rationale: "Head-tilt chin-lift produces cervical spine movement that can exacerbate occult cervical vertebral fractures and transect the spinal cord. The jaw-thrust maneuver opens the airway while maintaining spinal immobilization.",
        competencyDomain: "Trauma Airway & Spine Protection",
      },
      {
        id: "mcq-st6-02",
        stationId: "caosce-st6-emergency",
        questionNumber: 2,
        question: "Which classic triad of clinical signs confirms the emergency diagnosis of tension pneumothorax?",
        options: [
          "Unilateral absent breath sounds, tracheal deviation to opposite side, and distended neck veins with hypotension",
          "Bilateral wheezing, pedal edema, and bounding peripheral pulse",
          "Dullness to percussion, fever, and purulent sputum production",
          "Normal breath sounds, constricted pinpoint pupils, and bradycardia",
        ],
        correctIndex: 0,
        rationale: "Tension pneumothorax causes increased intrathoracic pressure leading to mediastinal shift, contralateral tracheal deviation, absent breath sounds on the affected side, and compression of the vena cava producing jugular venous distension and obstructive shock.",
        competencyDomain: "Thoracic Trauma Pathophysiology",
      },
      {
        id: "mcq-st6-03",
        stationId: "caosce-st6-emergency",
        questionNumber: 3,
        question: "When clinical signs of tension pneumothorax are identified in an unstable patient, what is the immediate mandatory course of action?",
        options: [
          "Immediate emergency needle decompression before any radiography",
          "Ordering an urgent portable upright chest X-ray",
          "Performing a 12-lead electrocardiogram",
          "Injecting intramuscular adrenaline",
        ],
        correctIndex: 0,
        rationale: "Tension pneumothorax is a life-threatening clinical diagnosis. Delaying decompression to obtain an X-ray can lead to rapid cardiovascular collapse and cardiac arrest.",
        competencyDomain: "Emergency Decision-Making",
      },
      {
        id: "mcq-st6-04",
        stationId: "caosce-st6-emergency",
        questionNumber: 4,
        question: "What is the recommended anatomical landmark for needle thoracostomy in the anterior chest under ATLS guidelines?",
        options: [
          "Second intercostal space in the mid-clavicular line, directly superior to the 3rd rib",
          "Second intercostal space directly inferior to the 2nd rib margin",
          "Sixth intercostal space in the posterior scapular line",
          "Xiphoid process notch angled into the pericardium",
        ],
        correctIndex: 0,
        rationale: "Inserting the needle in the 2nd intercostal space mid-clavicular line directly over the top of the 3rd rib avoids the intercostal neurovascular bundle (nerve, artery, vein) running along the inferior groove of the rib above.",
        competencyDomain: "Surgical Decompression Anatomy",
      },
      {
        id: "mcq-st6-05",
        stationId: "caosce-st6-emergency",
        questionNumber: 5,
        question: "Why should a polytrauma patient with hemorrhagic shock be resuscitated with warmed rather than room-temperature intravenous fluids?",
        options: [
          "To prevent the 'lethal trauma triad' of hypothermia, acidosis, and coagulopathy",
          "To accelerate urine production and avoid bladder spasms",
          "To artificially elevate core temperature above 39 °C",
          "To increase systemic peripheral vascular resistance",
        ],
        correctIndex: 0,
        rationale: "Cold IV fluids induce hypothermia, which inhibits enzymatic clotting factor cascades, exacerbating acidosis and coagulopathy—the deadly trauma triad.",
        competencyDomain: "Trauma Resuscitation Principles",
      },
      {
        id: "mcq-st6-06",
        stationId: "caosce-st6-emergency",
        questionNumber: 6,
        question: "A patient in the trauma unit opens eyes to speech (3), utters inappropriate confused words (4), and localizes to painful stimuli (5). What is the total Glasgow Coma Scale (GCS) score?",
        options: [
          "12 (Moderate head injury)",
          "15 (Normal mentation)",
          "8 (Severe head injury requiring intubation)",
          "5 (Deep coma)",
        ],
        correctIndex: 0,
        rationale: "GCS = Eye (3) + Verbal (4) + Motor (5) = 12. Scores between 9 and 12 indicate moderate head injury.",
        competencyDomain: "Neurological Assessment (GCS)",
      },
      {
        id: "mcq-st6-07",
        stationId: "caosce-st6-emergency",
        questionNumber: 7,
        question: "Under the Simple Triage and Rapid Treatment (START) disaster protocol, which color triage tag represents an individual with critical compromise of Airway, Breathing, or Circulation who has a high probability of survival with immediate care?",
        options: [
          "Red Tag (Immediate)",
          "Yellow Tag (Delayed)",
          "Green Tag (Minor / Walking Wounded)",
          "Black Tag (Expectant / Deceased)",
        ],
        correctIndex: 0,
        rationale: "Red tag (Immediate) is assigned to casualties who have life-threatening injuries but can be saved with immediate intervention (e.g., RR > 30, absent radial pulse, or inability to follow simple commands).",
        competencyDomain: "Disaster Triage (START Protocol)",
      },
      {
        id: "mcq-st6-08",
        stationId: "caosce-st6-emergency",
        questionNumber: 8,
        question: "What minimum gauge of peripheral intravenous cannula is considered standard for rapid adult trauma volume resuscitation?",
        options: [
          "14-gauge (orange) or 16-gauge (gray)",
          "22-gauge (blue)",
          "24-gauge (yellow)",
          "20-gauge (pink)",
        ],
        correctIndex: 0,
        rationale: "According to Poiseuille's law, flow rate increases exponentially with catheter radius. Large-bore short peripheral cannulae (14G or 16G) deliver significantly higher flow rates than narrow catheters.",
        competencyDomain: "Vascular Access & Flow Dynamics",
      },
      {
        id: "mcq-st6-09",
        stationId: "caosce-st6-emergency",
        questionNumber: 9,
        question: "Which clinical sign indicates that a victim of blunt chest trauma has developed cardiac tamponade rather than a simple tension pneumothorax?",
        options: [
          "Muffled/distant heart sounds with bilateral equal breath sounds (Beck's triad)",
          "Unilateral absent breath sounds with hyper-resonance",
          "Tracheal deviation away from the affected side",
          "Subcutaneous emphysema spreading across the chest wall",
        ],
        correctIndex: 0,
        rationale: "Beck's triad for cardiac tamponade consists of hypotension, distended neck veins, and muffled heart sounds, while breath sounds remain bilaterally present and resonant, differentiating it from tension pneumothorax.",
        competencyDomain: "Differential Diagnosis in Trauma",
      },
      {
        id: "mcq-st6-10",
        stationId: "caosce-st6-emergency",
        questionNumber: 10,
        question: "When managing an adult in cardiac arrest following trauma, what reversible causes are represented by the '5 H's and 5 T's' framework?",
        options: [
          "Hypovolemia, Hypoxia, Hydrogen ion, Hypo/hyperkalemia, Hypothermia & Tension pneumo, Tamponade, Toxins, Thrombosis (pulm/coronary)",
          "Headache, Hypertension, Hyperactivity, Hematuria, Hernia & Tachycardia, Tremor, Tetanus, Thyroid, Trauma",
          "Hepatitis, HIV, Herpes, Hemophilia, Hypercalcemia & Triage, Trauma, Tests, Time, Team",
          "None; it applies exclusively to pediatric medical resuscitation",
        ],
        correctIndex: 0,
        rationale: "The 5 H's (Hypovolemia, Hypoxia, Hydrogen ion acidosis, Hypo/Hyperkalemia, Hypothermia) and 5 T's (Tension pneumothorax, Tamponade, Toxins, Thrombosis pulmonary, Thrombosis coronary) constitute the universal reversible causes of cardiopulmonary arrest.",
        competencyDomain: "ACLS Resuscitation Science",
      },
    ],
  },
];

// Helper to scramble MCQs and options
export function scrambleCAOSCEMCQs(mcqs: CAOSCEMCQ[]): CAOSCEMCQ[] {
  return mcqs.map((q) => {
    const originalCorrectText = q.options[q.correctIndex];
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5) as [string, string, string, string];
    const newCorrectIndex = shuffledOptions.indexOf(originalCorrectText);
    return {
      ...q,
      options: shuffledOptions,
      correctIndex: newCorrectIndex,
    };
  });
}
