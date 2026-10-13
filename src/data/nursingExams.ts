export interface MCQQuestion {
  id: string;
  level: string; // "100 Level" | "200 Level" | "300 Level" | "400 Level" | "500 Level" | "NMCN Licensure" | "Midwifery Qualifying" | "Post-UTME Entrance"
  category: string;
  examType: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, or 3 (strictly one correct answer)
  rationale: string;
}

export interface EssayQuestion {
  id: string;
  level: string;
  category: string;
  scenario?: string;
  question: string;
  marks: number;
  timeAllowed: string;
  modelAnswer: {
    keyPoints: string[];
    markingRubric: { section: string; points: number; criterion: string }[];
    clinicalSignificance: string;
  };
}

export interface OSCEStation {
  id: string;
  stationNumber: number;
  title: string;
  level: string;
  category: string;
  durationMinutes: number;
  candidateInstructions: string;
  simulatedPatientBrief: string;
  requiredEquipment: string[];
  checklist: {
    step: number;
    description: string;
    points: number;
    criticalFailStep?: boolean;
  }[];
  examinerNotes: string;
  clinicalTips: string[];
}

export const EXAM_LEVELS = [
  "All Levels",
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "500 Level",
  "NMCN Licensure",
  "Midwifery Qualifying",
  "Post-UTME Entrance",
];

export const EXAM_CATEGORIES = [
  "All Categories",
  "Foundations & Clinical Skills",
  "Anatomy & Physiology",
  "Medical-Surgical Nursing",
  "Maternal & Child Health / Midwifery",
  "Pharmacology & Safe Dosage",
  "Pediatrics & Child Health",
  "Psychiatric & Mental Health",
  "Community Health & Epidemiology",
  "Emergency & Intensive Care",
  "Ethics, Law & Professional Nursing",
];

// Rich MCQ bank covering 100L - 500L, NMCN, Midwifery, Post-UTME with strictly ONE correct answer
export const NURSING_MCQ_BANK: MCQQuestion[] = [
  // 100 Level
  {
    id: "mcq-101",
    level: "100 Level",
    category: "Anatomy & Physiology",
    examType: "First Semester Examination",
    question: "Which of the following heart valves prevents the backflow of blood from the left ventricle into the left atrium during ventricular systole?",
    options: [
      "Tricuspid valve",
      "Mitral (Bicuspid) valve",
      "Aortic semilunar valve",
      "Pulmonary semilunar valve"
    ],
    correctIndex: 1,
    rationale: "The mitral (bicuspid) valve is located between the left atrium and left ventricle. During ventricular contraction (systole), high pressure closes the mitral valve to prevent regurgitation into the atrium. The tricuspid valve is on the right side."
  },
  {
    id: "mcq-102",
    level: "100 Level",
    category: "Foundations & Clinical Skills",
    examType: "Foundations of Nursing CBT",
    question: "When measuring a patient's arterial blood pressure using a sphygmomanometer, the first distinct tapping sound heard through the stethoscope corresponds to which parameter?",
    options: [
      "Diastolic pressure (Phase V)",
      "Mean arterial pressure (MAP)",
      "Systolic pressure (Phase I Korotkoff sound)",
      "Pulse pressure"
    ],
    correctIndex: 2,
    rationale: "Phase I of the Korotkoff sounds is characterized by the first appearance of faint, clear tapping sounds which gradually increase in intensity; this reading signifies the systolic blood pressure."
  },
  {
    id: "mcq-103",
    level: "100 Level",
    category: "Anatomy & Physiology",
    examType: "General Human Biology",
    question: "What is the primary anatomical functional unit of the human kidney responsible for filtration, reabsorption, and urine formation?",
    options: [
      "Glomerulus",
      "Renal pelvis",
      "Nephron",
      "Loop of Henle"
    ],
    correctIndex: 2,
    rationale: "The nephron is the microscopic structural and functional unit of the kidney. Each human kidney contains approximately 1 to 1.3 million nephrons, which comprise both renal corpuscles and renal tubule systems."
  },
  {
    id: "mcq-104",
    level: "100 Level",
    category: "Foundations & Clinical Skills",
    examType: "Infection Control Test",
    question: "According to standard World Health Organization (WHO) hand hygiene protocols, what is the minimum duration recommended for washing hands with soap and water?",
    options: [
      "10 to 15 seconds",
      "40 to 60 seconds",
      "90 to 120 seconds",
      "5 to 10 seconds"
    ],
    correctIndex: 1,
    rationale: "WHO Guidelines on Hand Hygiene in Health Care specify that handwashing with soap and clean running water should last between 40 to 60 seconds to ensure adequate pathogen reduction."
  },

  // 200 Level
  {
    id: "mcq-201",
    level: "200 Level",
    category: "Pharmacology & Safe Dosage",
    examType: "Clinical Pharmacology Continuous Assessment",
    question: "A physician orders Digoxin 0.125 mg PO daily for a cardiac patient. Prior to administering this medication, which essential nursing assessment must be documented?",
    options: [
      "Check respiratory rate for 30 seconds",
      "Auscultate apical pulse for one full minute and withhold if below 60 bpm",
      "Check blood glucose level with a glucometer",
      "Measure calf circumference bilaterally"
    ],
    correctIndex: 1,
    rationale: "Digoxin exerts a negative chronotropic effect. The nurse must auscultate the apical pulse for 60 full seconds. If the pulse rate is below 60 beats per minute in an adult, the medication must be withheld and the prescribing physician notified immediately."
  },
  {
    id: "mcq-202",
    level: "200 Level",
    category: "Foundations & Clinical Skills",
    examType: "Health Assessment Examination",
    question: "During physical examination of the abdomen, in what specific sequence must the physical examination techniques be performed to avoid altering baseline bowel sounds?",
    options: [
      "Inspection, Palpation, Percussion, Auscultation",
      "Inspection, Auscultation, Percussion, Palpation",
      "Palpation, Percussion, Inspection, Auscultation",
      "Auscultation, Inspection, Palpation, Percussion"
    ],
    correctIndex: 1,
    rationale: "In abdominal assessment, auscultation must precede percussion and palpation because manual manipulation or tapping of the abdominal wall can stimulate peristalsis or cause muscle guarding, artificially altering bowel sounds."
  },
  {
    id: "mcq-203",
    level: "200 Level",
    category: "Pharmacology & Safe Dosage",
    examType: "Parenteral Therapy CBT",
    question: "When administering an intramuscular (IM) injection of 3 mL in an adult, which anatomical landmark provides the safest site with lowest risk of sciatic nerve injury?",
    options: [
      "Dorsogluteal site",
      "Deltoid muscle",
      "Ventrogluteal site",
      "Vastus intermedius"
    ],
    correctIndex: 2,
    rationale: "The ventrogluteal site (gluteus medius and minimus) is the preferred anatomical site for adult IM injections over 1 mL because it is free of major blood vessels and large nerves (unlike the dorsogluteal site which risks sciatic nerve damage) and has thick muscle depth."
  },
  {
    id: "mcq-204",
    level: "200 Level",
    category: "Medical-Surgical Nursing",
    examType: "Pathophysiology Mid-Term",
    question: "Which arterial blood gas (ABG) result is characteristic of uncompensated metabolic acidosis?",
    options: [
      "pH 7.48, PaCO2 40 mmHg, HCO3 30 mEq/L",
      "pH 7.30, PaCO2 38 mmHg, HCO3 16 mEq/L",
      "pH 7.28, PaCO2 55 mmHg, HCO3 24 mEq/L",
      "pH 7.50, PaCO2 25 mmHg, HCO3 24 mEq/L"
    ],
    correctIndex: 1,
    rationale: "Normal arterial blood values: pH 7.35-7.45, PaCO2 35-45 mmHg, HCO3 22-26 mEq/L. In uncompensated metabolic acidosis, the pH is acidic (< 7.35), bicarbonate is depleted (< 22 mEq/L), and PaCO2 remains within normal limits (35-45 mmHg) because respiratory compensation has not occurred."
  },

  // 300 Level
  {
    id: "mcq-301",
    level: "300 Level",
    category: "Medical-Surgical Nursing",
    examType: "Adult Health Nursing I",
    question: "A 58-year-old post-cholecystectomy patient suddenly complains of severe chest pain, shortness of breath, tachycardia, and blood-streaked sputum. What is the nurse's priority emergency action?",
    options: [
      "Administer an oral analgesic and assist to ambulate",
      "Place the patient in High Fowler's position, apply oxygen, and alert the rapid response team for suspected pulmonary embolism",
      "Perform deep chest physiotherapy and postural drainage",
      "Clamp the nasogastric tube and administer antacids"
    ],
    correctIndex: 1,
    rationale: "The patient displays classic signs of acute pulmonary embolism (dyspnea, tachypnea, pleuritic chest pain, hemoptysis). Immediate elevation into High Fowler's improves lung expansion, supplemental oxygen combats hypoxemia, and emergency medical assistance is vital."
  },
  {
    id: "mcq-302",
    level: "300 Level",
    category: "Maternal & Child Health / Midwifery",
    examType: "Obstetrics & Gynecology Nursing",
    question: "A pregnant client at 34 weeks gestation presents with sudden painless, bright-red vaginal bleeding and a soft, non-tender uterus. Which diagnostic condition is most strongly suspected?",
    options: [
      "Abruptio Placentae",
      "Placenta Previa",
      "Uterine Rupture",
      "Ectopic Pregnancy"
    ],
    correctIndex: 1,
    rationale: "Placenta previa is classically characterized by painless, bright-red vaginal bleeding in the second or third trimester with a relaxed, soft uterus. Abruptio placentae is characterized by painful dark vaginal bleeding and a rigid, board-like abdomen."
  },
  {
    id: "mcq-303",
    level: "300 Level",
    category: "Medical-Surgical Nursing",
    examType: "Endocrine Disorders CBT",
    question: "A patient with Type 1 Diabetes Mellitus presents to the ED with Kussmaul respirations, fruity breath odor, blood glucose 480 mg/dL, and arterial pH 7.18. Which intravenous fluid is initial first choice?",
    options: [
      "Dextrose 5% in Water (D5W)",
      "0.9% Normal Saline (0.9% NaCl)",
      "Dextrose 10% in Saline",
      "3% Hypertonic Saline"
    ],
    correctIndex: 1,
    rationale: "In Diabetic Ketoacidosis (DKA), rapid volume resuscitation with isotonic crystalloid (0.9% Normal Saline) at 15-20 mL/kg/hr is the immediate priority to restore intravascular volume and perfuse vital organs before initiating IV regular insulin."
  },
  {
    id: "mcq-304",
    level: "300 Level",
    category: "Pharmacology & Safe Dosage",
    examType: "Clinical Drug Calculations",
    question: "An order reads: Administer 1,000 mL of 0.9% Normal Saline over 8 hours. The drop factor of the IV infusion administration set is 15 drops/mL. What is the calculated flow rate in drops per minute (gtts/min)?",
    options: [
      "21 drops/min",
      "31 drops/min",
      "42 drops/min",
      "52 drops/min"
    ],
    correctIndex: 1,
    rationale: "Formula: (Total volume in mL * Drop factor) / (Time in minutes). (1,000 mL * 15) / (8 hr * 60 min) = 15,000 / 480 = 31.25 drops/min. Rounded to the nearest whole drop = 31 drops/min."
  },

  // 400 Level
  {
    id: "mcq-401",
    level: "400 Level",
    category: "Emergency & Intensive Care",
    examType: "Critical Care Nursing",
    question: "During neurological assessment of a head injury patient, you observe: eye opening to pain (2), incomprehensible sounds (2), and abnormal flexion/decorticate posturing (3). What is the total Glasgow Coma Scale (GCS) score?",
    options: [
      "5",
      "7",
      "9",
      "11"
    ],
    correctIndex: 1,
    rationale: "Glasgow Coma Scale: Eye opening to pain = 2; Verbal response with incomprehensible sounds = 2; Motor response with abnormal decorticate flexion = 3. Total score = 2 + 2 + 3 = 7. A GCS of 8 or less indicates severe brain injury requiring airway protection."
  },
  {
    id: "mcq-402",
    level: "400 Level",
    category: "Pediatrics & Child Health",
    examType: "Advanced Pediatric Nursing",
    question: "A 9-month-old infant is admitted with acute watery diarrhea and severe dehydration. According to the Integrated Management of Childhood Illness (IMCI) guidelines, which cluster of clinical signs denotes severe dehydration?",
    options: [
      "Alert, eager to drink, normal skin pinch",
      "Lethargic or unconscious, sunken eyes, skin pinch goes back very slowly (> 2 seconds)",
      "Restless, irritable, skin pinch goes back in 1 second",
      "Mild thirst, normal anterior fontanelle, moist mucus membranes"
    ],
    correctIndex: 1,
    rationale: "Under IMCI protocols, severe dehydration requires two or more of: lethargy or unconsciousness, sunken eyes, inability to drink or drinking poorly, and a skin pinch retracting very slowly (> 2 seconds). Immediate IV Ringer's Lactate is indicated."
  },
  {
    id: "mcq-403",
    level: "400 Level",
    category: "Psychiatric & Mental Health",
    examType: "Psychiatric & Mental Health Nursing",
    question: "A client prescribed Haloperidol for acute schizophrenia develops sudden high fever (40.2°C), severe muscle 'lead-pipe' rigidity, diaphoresis, and fluctuating blood pressure. Which life-threatening emergency should the nurse suspect?",
    options: [
      "Serotonin Syndrome",
      "Neuroleptic Malignant Syndrome (NMS)",
      "Tardive Dyskinesia",
      "Acute Dystonic Reaction"
    ],
    correctIndex: 1,
    rationale: "Neuroleptic Malignant Syndrome (NMS) is an idiosyncratic, life-threatening reaction to dopamine antagonists. Hallmark manifestations include hyperpyrexia, generalized muscle rigidity, autonomic instability, and altered mental status. Treatment involves stopping the antipsychotic and giving Dantrolene/Bromocriptine."
  },
  {
    id: "mcq-404",
    level: "400 Level",
    category: "Emergency & Intensive Care",
    examType: "Cardiovascular Nursing",
    question: "The telemetry monitor displays a sudden rhythm with no discernible P waves, wide bizarre QRS complexes at 180 bpm, and the nurse verifies the patient is pulseless and unresponsive. What is the immediate priority intervention?",
    options: [
      "Administer IV Adenosine 6 mg rapid push",
      "Initiate high-quality CPR and deliver unsynchronized defibrillation (shock)",
      "Perform carotid sinus massage",
      "Prepare for synchronized cardioversion at 50 Joules"
    ],
    correctIndex: 1,
    rationale: "Pulseless Ventricular Tachycardia (pVT) is a cardiac arrest shockable rhythm. The ACLS algorithm dictates immediate chest compressions and immediate unsynchronized defibrillation with high energy (e.g. 200J biphasic)."
  },

  // 500 Level
  {
    id: "mcq-501",
    level: "500 Level",
    category: "Community Health & Epidemiology",
    examType: "Advanced Public Health Nursing",
    question: "In an epidemiological outbreak investigation of Cholera in a peri-urban community, which measure provides the attack rate calculation?",
    options: [
      "Total deaths from cholera divided by mid-year population",
      "(Number of new cases who developed illness during period / Population at risk at the beginning of the period) * 100",
      "Number of current cases at a single point in time divided by total hospital admissions",
      "Ratio of confirmed lab cases to unconfirmed suspected cases"
    ],
    correctIndex: 1,
    rationale: "The cumulative incidence or attack rate in epidemiology is defined as the number of new cases diagnosed during the outbreak divided by the total susceptible population exposed at the start of the risk period, expressed as a percentage."
  },
  {
    id: "mcq-502",
    level: "500 Level",
    category: "Ethics, Law & Professional Nursing",
    examType: "Nursing Jurisprudence & Health Policy",
    question: "Under Nigerian and international medical law, administering medical or surgical interventions to a competent adult patient without voluntary, informed consent constitutes which legal tort?",
    options: [
      "Defamation of character",
      "Battery",
      "Breach of contract",
      "Vicarious liability"
    ],
    correctIndex: 1,
    rationale: "Battery in tort law is the intentional, non-consensual touching of another individual. Performing an operation or invasive procedure without valid informed consent constitutes battery, even if the treatment was therapeutically successful."
  },
  {
    id: "mcq-503",
    level: "500 Level",
    category: "Foundations & Clinical Skills",
    examType: "Nursing Research & Biostatistics",
    question: "In quantitative nursing research, when the p-value obtained from a two-tailed hypothesis test is p = 0.012 at an alpha level of 0.05, which conclusion is statistically correct?",
    options: [
      "Accept the null hypothesis as there is no significant difference",
      "Reject the null hypothesis and conclude there is a statistically significant effect",
      "Determine that a Type I error has conclusively occurred",
      "Discard the study data because p is below 0.05"
    ],
    correctIndex: 1,
    rationale: "When the calculated p-value is less than the predetermined significance threshold (alpha = 0.05), the researcher rejects the null hypothesis (H0) and concludes that the observed findings are statistically significant and unlikely due to random chance."
  },

  // NMCN Licensure Exam
  {
    id: "mcq-601",
    level: "NMCN Licensure",
    category: "Medical-Surgical Nursing",
    examType: "NMCN Professional Qualifying Exam (General Nursing)",
    question: "A 45-year-old post-thyroidectomy patient in the recovery room reports perioral tingling and muscle spasms in the hands. The nurse inflates the BP cuff above systolic pressure and notices carpopedal spasm. This sign is known as:",
    options: [
      "Chvostek's sign, indicating hypokalemia",
      "Trousseau's sign, indicating acute hypocalcemia",
      "Brudzinski's sign, indicating meningeal irritation",
      "Cullen's sign, indicating retroperitoneal hemorrhage"
    ],
    correctIndex: 1,
    rationale: "Trousseau's sign is an indicator of latent tetany caused by hypocalcemia (often resulting from accidental excision or devascularization of parathyroid glands during thyroidectomy). The nurse must keep IV calcium gluconate readily accessible."
  },
  {
    id: "mcq-602",
    level: "NMCN Licensure",
    category: "Foundations & Clinical Skills",
    examType: "NMCN Professional Qualifying Exam",
    question: "What is the critical minimum urinary output per hour for an adult weighing 70 kg to indicate adequate renal perfusion and prevent acute kidney injury?",
    options: [
      "10 mL/hr",
      "30 mL/hr (or 0.5 mL/kg/hr)",
      "75 mL/hr",
      "100 mL/hr"
    ],
    correctIndex: 1,
    rationale: "Adequate adult renal perfusion is clinically defined as a minimum urine output of 30 mL/hour or 0.5 mL/kg/hour. Oliguria (< 30 mL/hr) requires prompt clinical investigation to prevent acute tubular necrosis."
  },
  {
    id: "mcq-603",
    level: "NMCN Licensure",
    category: "Pharmacology & Safe Dosage",
    examType: "NMCN Pharmacology Licensure",
    question: "A post-operative patient receives Morphine Sulphate IV for severe pain. Thirty minutes later, the nurse notes: RR 6 breaths/minute, pinpoint pupils, and lethargy. Which specific antagonist must be administered immediately?",
    options: [
      "Flumazenil",
      "Naloxone (Narcan)",
      "Atropine Sulphate",
      "Protamine Sulphate"
    ],
    correctIndex: 1,
    rationale: "Naloxone is the specific pure opioid antagonist that rapidly reverses opioid-induced respiratory depression and central nervous system depression. Flumazenil reverses benzodiazepines; Protamine sulphate reverses heparin."
  },

  // Midwifery Qualifying
  {
    id: "mcq-701",
    level: "Midwifery Qualifying",
    category: "Maternal & Child Health / Midwifery",
    examType: "Midwives Registration Board Exam",
    question: "In plotting the World Health Organization Partograph during active labour, what does crossing the 'Action Line' (4 hours to the right of the Alert Line) signify to the midwife?",
    options: [
      "Normal physiological progress of labor",
      "Cephalopelvic disproportion, prolonged labor requiring immediate obstetric intervention or delivery",
      "Precipitate labor requiring immediate tocolysis",
      "Initiation of epidural analgesia"
    ],
    correctIndex: 1,
    rationale: "On the partograph, the Alert line represents cervical dilation at 1 cm/hr in the active phase. If cervical dilation crosses the Action Line (4 hours parallel to the Alert line), labor is abnormally prolonged and immediate obstetric intervention (e.g., cesarean section or augmentation) is mandatory."
  },
  {
    id: "mcq-702",
    level: "Midwifery Qualifying",
    category: "Maternal & Child Health / Midwifery",
    examType: "Midwives Registration Board Exam",
    question: "Which of the following constitutes the primary and most common cause of immediate primary Postpartum Hemorrhage (PPH) within 24 hours of childbirth?",
    options: [
      "Retained placental fragments",
      "Uterine Atony (failure of uterine musculature to contract)",
      "Genital tract lacerations",
      "Disseminated Intravascular Coagulation (DIC)"
    ],
    correctIndex: 1,
    rationale: "Uterine atony accounts for 70% to 80% of all primary postpartum hemorrhages. The lack of adequate myometrial contraction fails to compress the maternal spiral arterioles traversing the placental site."
  },

  // Post-UTME Entrance
  {
    id: "mcq-801",
    level: "Post-UTME Entrance",
    category: "Anatomy & Physiology",
    examType: "CHEP College of Nursing Screening CBT",
    question: "Which blood component is predominantly responsible for transporting oxygen throughout the human cardiovascular system?",
    options: [
      "Platelets (thrombocytes)",
      "Hemoglobin in Red Blood Cells (erythrocytes)",
      "White Blood Cells (leukocytes)",
      "Blood plasma albumins"
    ],
    correctIndex: 1,
    rationale: "Hemoglobin is an iron-rich metalloprotein found within erythrocytes (RBCs) that binds reversibly to oxygen in pulmonary capillaries and transports it to cellular tissues throughout the body."
  },
  {
    id: "mcq-802",
    level: "Post-UTME Entrance",
    category: "Foundations & Clinical Skills",
    examType: "CHEP College of Nursing Screening CBT",
    question: "What is considered the normal physiological resting pulse rate range for a healthy adult human at rest?",
    options: [
      "40 to 50 beats per minute",
      "60 to 100 beats per minute",
      "110 to 140 beats per minute",
      "150 to 180 beats per minute"
    ],
    correctIndex: 1,
    rationale: "Normal physiological adult resting heart rate is between 60 and 100 beats per minute (bpm). A heart rate below 60 is termed bradycardia, while a heart rate exceeding 100 is termed tachycardia."
  }
];

// Rich Essay Bank covering 100L through 500L and NMCN Licensure with Marking Rubrics
export const NURSING_ESSAY_BANK: EssayQuestion[] = [
  {
    id: "essay-101",
    level: "100 Level",
    category: "Foundations & Clinical Skills",
    marks: 20,
    timeAllowed: "30 Minutes",
    scenario: "You are assigned to the clinical skills laboratory as a 100-level nursing student preparing for your first hospital ward attachment.",
    question: "Discuss the Chain of Infection in clinical nursing practice. (a) Enumerate and clearly explain all six (6) links in the chain of infection (12 marks). (b) Explain specific nursing interventions to break the chain at each link to protect patients and health workers (8 marks).",
    modelAnswer: {
      keyPoints: [
        "Link 1: Infectious Agent (Bacteria, viruses, fungi, protozoa)",
        "Link 2: Reservoir (Human, animals, environment, soiled equipment)",
        "Link 3: Portal of Exit (Respiratory tract, GI tract, skin/mucous membranes, blood)",
        "Link 4: Mode of Transmission (Contact [direct/indirect], droplet, airborne, vector-borne)",
        "Link 5: Portal of Entry (Broken skin, inhalation, ingestion, invasive lines/catheters)",
        "Link 6: Susceptible Host (Immunocompromised, neonates, elderly, surgical patients)"
      ],
      markingRubric: [
        { section: "Introduction & Definition of Chain of Infection", points: 2, criterion: "Accurate theoretical grounding of nosocomial transmission dynamics" },
        { section: "Identification of 6 Links", points: 6, criterion: "1 mark for each correctly identified link with medical examples" },
        { section: "Detailed Elaboration of Links", points: 4, criterion: "Thorough explanation of clinical transmission mechanisms" },
        { section: "Breaking the Chain Interventions", points: 6, criterion: "Actionable protocols: hand hygiene, sterilization, PPE, isolation, immunization, asepsis" },
        { section: "Conclusion & Professional Formatting", points: 2, criterion: "Clear structure, professional terminology, and clinical synthesis" }
      ],
      clinicalSignificance: "Fundamental principle underlying all infection prevention and control (IPC) protocols, protecting both vulnerable patients and front-line healthcare workers."
    }
  },
  {
    id: "essay-201",
    level: "200 Level",
    category: "Pharmacology & Safe Dosage",
    marks: 25,
    timeAllowed: "35 Minutes",
    scenario: "A 200-level nursing student is posted to the medical ward and assigned to participate in medication rounds under supervision of a Registered Nurse.",
    question: "Safe medication administration is a sacred professional duty in nursing. (a) Detail the traditional and modern 'Rights of Medication Administration' (10 marks). (b) Describe the three (3) critical label checks every nurse must perform before administering any parenteral or oral drug (6 marks). (c) Formulate a step-by-step nursing action protocol when a medication error occurs on a clinical ward (9 marks).",
    modelAnswer: {
      keyPoints: [
        "10 Rights: Right Patient (2 identifiers), Right Drug, Right Dose, Right Route, Right Time/Frequency, Right Documentation, Right Reason/Indication, Right Response/Assessment, Right to Refuse, Right Patient Education.",
        "3 Label Checks: (1) When removing drug from storage/PYXIS, (2) When preparing/drawing up dose, (3) At bedside immediately before administering.",
        "Error Protocol: Assess patient immediately for physiological instability; notify attending physician and nurse-in-charge; implement emergency reversal if needed; complete incident report honestly; document facts without punitive bias."
      ],
      markingRubric: [
        { section: "Rights of Medication Administration", points: 10, criterion: "Full enumeration and clinical explanation of 10 Rights" },
        { section: "Three Label Checks", points: 6, criterion: "Clear definition of timing and verification steps for each check" },
        { section: "Medication Error Protocol", points: 7, criterion: "Patient safety first, clinical reporting, open disclosure, incident reporting" },
        { section: "Quality & Critical Thinking", points: 2, criterion: "Adherence to NMCN code of professional conduct and patient advocacy" }
      ],
      clinicalSignificance: "Prevents fatal drug events, ensures legal and ethical adherence to NMCN practice standards, and fosters high-reliability healthcare culture."
    }
  },
  {
    id: "essay-301",
    level: "300 Level",
    category: "Medical-Surgical Nursing",
    marks: 25,
    timeAllowed: "40 Minutes",
    scenario: "Mr. Chukwuma, a 52-year-old executive, presents to the A&E with severe crushing retrosternal chest pain radiating to his left shoulder and jaw, profuse diaphoresis, nausea, and shortness of breath lasting 90 minutes.",
    question: "Acute Myocardial Infarction (STEMI) Management: (a) Outline the immediate emergency nursing management using the MONA/O-BAM protocol upon arrival (8 marks). (b) Develop a comprehensive Nursing Care Plan (NCP) including three (3) priority NANDA nursing diagnoses with specific goals, interventions, and rationales (12 marks). (c) List five (5) critical patient discharge education points regarding lifestyle and medication compliance (5 marks).",
    modelAnswer: {
      keyPoints: [
        "MONA Protocol: Morphine for pain and cardiac preload reduction; Oxygen for SpO2 < 90%; Nitroglycerin sublingual for coronary vasodilation; Aspirin 300 mg chewable antiplatelet.",
        "Nursing Diagnoses: (1) Acute Pain r/t myocardial ischemia; (2) Decreased Cardiac Output r/t altered inotropy and dysrhythmias; (3) Ineffective Tissue Perfusion (Cardiopulmonary) r/t coronary thrombus.",
        "Interventions: Continuous 12-lead ECG, establish dual IV access, serial cardiac troponin tests, bed rest, anti-emetic.",
        "Discharge Teaching: Low sodium/fat diet, smoking cessation, cardiac rehab, daily compliance with statins and antiplatelets, recognizing angina red flags."
      ],
      markingRubric: [
        { section: "Immediate Emergency MONA/O-BAM Care", points: 8, criterion: "Correct pharmacological sequencing, indications, and nursing precautions" },
        { section: "Comprehensive Nursing Care Plan (3 Diagnoses)", points: 12, criterion: "4 marks per diagnosis with NANDA phrasing, SMART goals, evidence-based rationales" },
        { section: "Discharge & Secondary Prevention", points: 5, criterion: "Practical lifestyle adjustments and pharmacotherapy compliance" }
      ],
      clinicalSignificance: "Time is muscle: rapid nursing intervention halts ischemic progression, prevents cardiogenic shock, and saves myocardium."
    }
  },
  {
    id: "essay-401",
    level: "400 Level",
    category: "Emergency & Intensive Care",
    marks: 25,
    timeAllowed: "40 Minutes",
    scenario: "A 28-year-old motorcycle accident victim is brought to the Trauma ICU with severe blunt chest trauma, exhibiting paradoxical chest movement, cyanosis, hypotension (BP 80/50), tracheal deviation to the right, and absent breath sounds on the left.",
    question: "Tension Pneumothorax and Flail Chest: (a) Differentiate between simple pneumothorax, open pneumothorax, and tension pneumothorax with focus on their hemodynamics (8 marks). (b) Explain the immediate life-saving emergency needle decompression technique and subsequent underwater seal drainage management (10 marks). (c) Formulate critical nursing interventions for monitoring and maintaining underwater seal chest tube systems (7 marks).",
    modelAnswer: {
      keyPoints: [
        "Pathophysiology: One-way valve mechanism traps air in pleural space, elevating intrathoracic pressure, collapsing lung, shifting mediastinum to the contralateral side, kinking vena cava, precipitating obstructive shock.",
        "Needle Thoracostomy: 14G cannula inserted into 2nd intercostal space mid-clavicular line (or 4th/5th intercostal space anterior axillary line) on affected side.",
        "Chest Tube Management: Keep drainage system below chest level, monitor tidaling (fluctuation in water seal chamber), avoid routine milking/stripping, observe for air leaks (continuous bubbling in water seal), keep sterile gauze and clamps at bedside."
      ],
      markingRubric: [
        { section: "Pathophysiological Differentiation", points: 8, criterion: "Clear comparative analysis of pulmonary hemodynamics and mediastinal shift" },
        { section: "Emergency Decompression & Chest Drainage", points: 10, criterion: "Anatomical landmarks, sterile preparation, underwater seal mechanics" },
        { section: "Chest Tube Nursing Care Protocol", points: 7, criterion: "Assessment of patency, tidaling, complications, troubleshooting dislodgement" }
      ],
      clinicalSignificance: "Immediate recognition of tension pneumothorax averts imminent cardiac arrest from severe obstructive shock."
    }
  },
  {
    id: "essay-501",
    level: "500 Level",
    category: "Ethics, Law & Professional Nursing",
    marks: 25,
    timeAllowed: "45 Minutes",
    scenario: "You are the Nurse Manager of a tertiary teaching hospital facing severe staff shortages and an ethical dilemma involving clinical triage and surrogate consent for an unconscious patient.",
    question: "Nursing Leadership, Jurisprudence, and Ethics: (a) Critically analyze the four fundamental principles of biomedical ethics (Autonomy, Beneficence, Non-maleficence, Justice) in the context of clinical nursing leadership (10 marks). (b) Examine the legal doctrines of 'Respondeat Superior' (Vicarious Liability) and 'Res Ipsa Loquitur' as they apply to clinical nurse negligence and hospital administration in Nigeria (8 marks). (c) Design an evidence-based clinical governance framework to prevent nursing burn-out and maintain clinical safety standards (7 marks).",
    modelAnswer: {
      keyPoints: [
        "Biomedical Principles: Autonomy (respecting self-determination, informed refusal), Beneficence (acting in patient's best interest), Non-maleficence (first do no harm), Justice (fair allocation of healthcare resources during scarcity).",
        "Legal Doctrines: Respondeat Superior holds hospital vicariously liable for torts committed by nurses within scope of employment; Res Ipsa Loquitur ('the thing speaks for itself') applies when injury could only occur through negligence (e.g., retained surgical swab).",
        "Clinical Governance: Nurse-to-patient staffing ratios, continuous professional development (CPD), psychological debriefing, anonymous incident reporting, robust clinical audits."
      ],
      markingRubric: [
        { section: "Analysis of 4 Biomedical Principles", points: 10, criterion: "Philosophical depth, real nursing dilemma applications, balancing competing duties" },
        { section: "Legal Doctrines & Tort Liability", points: 8, criterion: "Accuracy of legal definitions, Nigerian healthcare case law relevance" },
        { section: "Clinical Governance & Staff Retention Model", points: 7, criterion: "Holistic strategy addressing system factors, psychological safety, and quality metrics" }
      ],
      clinicalSignificance: "Empowers senior nurse leaders to uphold statutory compliance, protect human rights, and ensure institutional resilience."
    }
  },
  {
    id: "essay-601",
    level: "NMCN Licensure",
    category: "Maternal & Child Health / Midwifery",
    marks: 25,
    timeAllowed: "40 Minutes",
    scenario: "A 24-year-old primigravida at 38 weeks gestation is admitted to the labor ward in active labor. At full cervical dilation, she delivers a live male infant weighing 3.4 kg. Ten minutes later, heavy vaginal bleeding starts before placental expulsion.",
    question: "Postpartum Hemorrhage (PPH) Management: (a) Define Postpartum Hemorrhage and classify it into Primary and Secondary PPH (4 marks). (b) Explain the '4 Ts' etiology of PPH with clinical examples (8 marks). (c) Detail the comprehensive Active Management of the Third Stage of Labor (AMTSL) protocol recommended by NMCN and WHO to prevent PPH (8 marks). (d) Describe immediate resuscitative nursing interventions when massive obstetric hemorrhage occurs (5 marks).",
    modelAnswer: {
      keyPoints: [
        "Definition: Blood loss >= 500 mL following vaginal delivery or >= 1000 mL following cesarean delivery within 24 hours (Primary) or 24 hours to 6 weeks postpartum (Secondary).",
        "4 Ts: Tone (Uterine atony - 70%), Tissue (retained placenta/membranes), Trauma (perineal/cervical lacerations, uterine rupture), Thrombin (coagulopathies).",
        "AMTSL Steps: (1) Administration of uterotonic (Oxytocin 10 IU IM within 1 minute of birth), (2) Controlled Cord Traction (CCT) with counter-traction to prevent uterine inversion, (3) Uterine massage immediately after delivery of placenta and every 15 min for 2 hours.",
        "Resuscitation: Shout for help, Call obstetric team, High-flow O2, Two large-bore IV cannulae (14/16G), Rapid crystalloid infusion, Continuous bimanual uterine compression, Catheterize bladder, Administer uterotonics (Oxytocin, Misoprostol, Tranexamic acid)."
      ],
      markingRubric: [
        { section: "Definition & Classification of PPH", points: 4, criterion: "Precise quantitative thresholds and temporal classification" },
        { section: "Etiological 4 Ts Breakdown", points: 8, criterion: "2 marks per 'T' with clinical manifestations and predisposing factors" },
        { section: "AMTSL Protocol Steps", points: 8, criterion: "Correct sequencing and execution of uterotonics, CCT, and massage" },
        { section: "Emergency Resuscitative Protocol", points: 5, criterion: "Multidisciplinary emergency response, hemodynamic resuscitation" }
      ],
      clinicalSignificance: "PPH remains the leading cause of maternal mortality in Sub-Saharan Africa. Rigorous AMTSL adherence reduces fatal hemorrhage by up to 60%."
    }
  }
];

// Rich OSCE Practical Stations with Timers, Candidate Briefs, Equipment, and Examiner Checklists
export const NURSING_OSCE_STATIONS: OSCEStation[] = [
  {
    id: "osce-01",
    stationNumber: 1,
    title: "Aseptic Wound Dressing & Sterile Technique",
    level: "200-300 Level / NMCN",
    category: "Foundations & Clinical Skills",
    durationMinutes: 7,
    candidateInstructions: "You are the staff nurse on a surgical ward. Mr. Aliu, a 42-year-old patient on Post-Op Day 3 after laparotomy, requires an aseptic dressing change. You are expected to perform the procedure following strict surgical asepsis within the 7-minute station time.",
    simulatedPatientBrief: "Simulated patient lying comfortably supine. Surgical abdominal wound with 10 staples in situ, slight serosanguinous exudate on dressing pad. The patient may express mild discomfort upon dressing removal.",
    requiredEquipment: [
      "Sterile dressing pack (cotton balls, gauze swabs, gallipots, dissecting forceps, sinus forceps)",
      "Normal Saline 0.9% for wound irrigation",
      "Sterile dressing gloves & non-sterile clean gloves",
      "Alcohol hand rub & protective apron",
      "Adhesive surgical island dressing",
      "Yellow clinical waste bag and sharps disposal container"
    ],
    checklist: [
      { step: 1, description: "Greets patient, confirms identity with 2 identifiers (Name & Hospital number), and explains procedure clearly.", points: 1 },
      { step: 2, description: "Obtains informed verbal consent and ensures patient privacy (closes curtains/screen).", points: 1 },
      { step: 3, description: "Performs 6-step hand hygiene with alcohol hand rub and dons clean disposable apron.", points: 1 },
      { step: 4, description: "Opens sterile dressing pack on trolley using sterile corners technique without contaminating sterile field.", points: 1 },
      { step: 5, description: "Pours 0.9% Normal Saline into sterile gallipot maintaining 15 cm distance without splashing.", points: 1 },
      { step: 6, description: "Dons clean non-sterile gloves and gently removes soiled dressing; inspects exudate color and odor.", points: 1 },
      { step: 7, description: "Disposes soiled dressing directly into yellow biohazard bag and discards dirty gloves; performs hand hygiene.", points: 1 },
      { step: 8, description: "Dons sterile gloves OR uses sterile forceps technique appropriately (Surgical Asepsis maintained).", points: 1, criticalFailStep: true },
      { step: 9, description: "Cleans wound from center outwards (cleanest to dirtiest) using each sterile swab for only ONE single stroke.", points: 1, criticalFailStep: true },
      { step: 10, description: "Dries wound, applies sterile island dressing smoothly, ensures patient comfort, and disposes waste correctly.", points: 1 }
    ],
    examinerNotes: "Candidate must not touch sterile tips with unsterile hands. Reusing a swab for a second stroke or dragging soiled swab back over the incision is a critical asepsis breach (Deduct points immediately).",
    clinicalTips: [
      "Always clean from least contaminated to most contaminated.",
      "Never turn your back on the sterile field.",
      "Check expiration date on the sterile pack before opening."
    ]
  },
  {
    id: "osce-02",
    stationNumber: 2,
    title: "Vital Signs & National Early Warning Score (NEWS2) Calculation",
    level: "100-200 Level / Post-UTME",
    category: "Foundations & Clinical Skills",
    durationMinutes: 6,
    candidateInstructions: "You are the triage nurse in the Emergency Department. Measure the vital signs of Mrs. Kalu, a 64-year-old patient presenting with acute fever and productive cough. Document all parameters, calculate her aggregate NEWS2 score, and state your clinical escalation action.",
    simulatedPatientBrief: "Simulated adult female patient sitting upright in examination chair, breathing at 24 breaths/min, warm to touch, coughing occasionally.",
    requiredEquipment: [
      "Aneroid Sphygmomanometer & stethoscope with antiseptic alcohol wipes",
      "Pulse Oximeter with plethysmograph waveform",
      "Digital infrared tympanic thermometer with probe covers",
      "Watch with second hand for counting respiratory rate",
      "NEWS2 Standard Observation Chart and pen"
    ],
    checklist: [
      { step: 1, description: "Introduces self, identifies patient using wristband, and explains the rationale for full vital signs.", points: 1 },
      { step: 2, description: "Decontaminates hands and cleans stethoscope earpieces/diaphragm with alcohol swab.", points: 1 },
      { step: 3, description: "Discreetly counts respiratory rate for one full minute without alerting patient to avoid conscious alteration.", points: 1, criticalFailStep: true },
      { step: 4, description: "Attaches pulse oximeter probe to warm index finger and notes oxygen saturation on room air.", points: 1 },
      { step: 5, description: "Measures tympanic temperature using a clean disposable probe cover correctly angled in ear canal.", points: 1 },
      { step: 6, description: "Palpates radial pulse for 60 seconds noting rate, rhythm, and volume accurately.", points: 1 },
      { step: 7, description: "Applies blood pressure cuff correctly 2.5 cm above antecubital fossa and measures systolic/diastolic pressure.", points: 1 },
      { step: 8, description: "Documents all parameters systematically on the official NEWS2 observation chart.", points: 1 },
      { step: 9, description: "Accurately calculates total NEWS2 aggregate score and assigns appropriate clinical risk tier.", points: 1, criticalFailStep: true },
      { step: 10, description: "States correct clinical escalation protocol (e.g. notify Medical Officer, increase monitoring frequency).", points: 1 }
    ],
    examinerNotes: "Watch for false respiratory counts (candidates must count for full 60 seconds). NEWS2 score calculation must precisely match recorded figures.",
    clinicalTips: [
      "Never announce you are counting respirations; keep fingers on wrist as if taking pulse.",
      "Ensure proper cuff bladder size: width 40% of arm circumference, length 80%."
    ]
  },
  {
    id: "osce-03",
    stationNumber: 3,
    title: "Intramuscular Injection Administration (Ventrogluteal)",
    level: "200-300 Level / NMCN",
    category: "Pharmacology & Safe Dosage",
    durationMinutes: 7,
    candidateInstructions: "Administer prescribed Diclofenac Sodium 75 mg (3 mL) IM to Mr. Ibrahim for acute severe renal colic. Locate the ventrogluteal site accurately using anatomical landmarks and administer safely.",
    simulatedPatientBrief: "Buttock/pelvic injection trainer manikin placed in lateral position with hips and knees slightly flexed to relax gluteal muscles.",
    requiredEquipment: [
      "Medication ampoule: Diclofenac Sodium 75 mg / 3 mL with filter needle",
      "21G / 23G 1.5-inch needle and 5 mL syringe",
      "Alcohol skin prep pads and clean gloves",
      "Sharps disposal container at arm's reach",
      "Medication Administration Record (MAR) chart and pen"
    ],
    checklist: [
      { step: 1, description: "Verifies prescription on MAR chart against the 10 Rights of Medication Administration.", points: 1 },
      { step: 2, description: "Performs first 2 medication checks (at storage and during draw-up), verifies drug name, dose, and expiry date.", points: 1 },
      { step: 3, description: "Draws up medication using filter needle, changes to injection needle, expels air bubble safely without losing dose.", points: 1 },
      { step: 4, description: "Greets patient, verifies identity, screens allergies, explains injection purpose and sensations.", points: 1 },
      { step: 5, description: "Performs hand hygiene and dons clean disposable gloves.", points: 1 },
      { step: 6, description: "Accurately locates ventrogluteal site: Palm on greater trochanter, index finger on anterior superior iliac spine, middle finger towards iliac crest forming 'V'.", points: 1, criticalFailStep: true },
      { step: 7, description: "Cleans skin with alcohol swab using circular motion outward 5 cm; allows to dry completely for 30 seconds.", points: 1 },
      { step: 8, description: "Applies Z-track technique (displaces skin 2.5 cm laterally) and inserts needle firmly at 90-degree angle.", points: 1, criticalFailStep: true },
      { step: 9, description: "Aspirates 5-10 seconds to verify absence of blood; injects slowly at 10 seconds per mL; waits 10 seconds before smooth withdrawal.", points: 1 },
      { step: 10, description: "Immediately activates safety needle shield and discards into sharps box un-recapped; documents on MAR.", points: 1, criticalFailStep: true }
    ],
    examinerNotes: "Recapping a contaminated needle results in immediate failure for sharps safety. Failure to locate the ventrogluteal 'V' correctly results in failure of the station.",
    clinicalTips: [
      "The ventrogluteal site prevents sciatic nerve damage and superior gluteal artery puncture.",
      "Z-track technique seals medication in muscle and prevents painful subcutaneous leakage."
    ]
  },
  {
    id: "osce-04",
    stationNumber: 4,
    title: "Basic Life Support (BLS) & Adult CPR with Automated External Defibrillator (AED)",
    level: "300-400 Level / NMCN / Licensure",
    category: "Emergency & Intensive Care",
    durationMinutes: 8,
    candidateInstructions: "You witness an adult visitor collapse suddenly in the hospital reception corridor. Manage the cardiac arrest event from initial assessment through two cycles of CPR and AED deployment.",
    simulatedPatientBrief: "Resusci-Anne full-body adult CPR manikin lying motionless supine on floor. No responsive movements.",
    requiredEquipment: [
      "CPR Feedback Adult Torso Manikin",
      "Pocket mask with one-way valve / Bag-Valve-Mask (BVM)",
      "Automated External Defibrillator (AED) training unit with adult electrode pads",
      "Personal Protective Equipment (Gloves, face shield)"
    ],
    checklist: [
      { step: 1, description: "Checks environment for hazards (ensures scene safety for self, patient, and bystanders).", points: 1 },
      { step: 2, description: "Assesses responsiveness: Taps shoulders firmly and shouts loudly: 'Hello, are you alright?'.", points: 1 },
      { step: 3, description: "Shouts loudly for help and directs a specific bystander to call emergency team (Code Blue) and bring AED.", points: 1 },
      { step: 4, description: "Simultaneously checks for carotid pulse and normal breathing (chest rise) for minimum 5, maximum 10 seconds.", points: 1, criticalFailStep: true },
      { step: 5, description: "Immediately commences high-quality chest compressions upon confirming no pulse: center of chest (lower half of sternum).", points: 1 },
      { step: 6, description: "Maintains optimal compression parameters: depth 5-6 cm (2-2.4 in), rate 100-120/min, complete chest recoil.", points: 1, criticalFailStep: true },
      { step: 7, description: "Delivers 2 rescue breaths after 30 compressions using head-tilt chin-lift and pocket mask over 1 second each.", points: 1 },
      { step: 8, description: "As soon as AED arrives, powers it ON immediately and adheres precisely to audio voice prompts.", points: 1 },
      { step: 9, description: "Applies AED pads correctly: right upper sternal border below clavicle, and left lower anterolateral chest (mid-axillary line).", points: 1 },
      { step: 10, description: "Commands loudly: 'CLEAR ALL!' during analysis and shock delivery; immediately resumes CPR post-shock.", points: 1, criticalFailStep: true }
    ],
    examinerNotes: "Candidate must deliver high-quality compressions with minimal interruptions (< 10 seconds). Touching patient during shock delivery is a critical failure.",
    clinicalTips: [
      "Push hard and push fast (100-120 bpm) to the rhythm of 'Stayin' Alive'.",
      "Never pause compressions while AED pads are being placed if a second rescuer is present."
    ]
  },
  {
    id: "osce-05",
    stationNumber: 5,
    title: "Partograph Interpretation & Active Management of Third Stage of Labor (AMTSL)",
    level: "300-500 Level / Midwifery Board",
    category: "Maternal & Child Health / Midwifery",
    durationMinutes: 7,
    candidateInstructions: "Mrs. Okonkwo is a 27-year-old Gravida 2 Para 1 who has just delivered a healthy 3.2 kg infant. Demonstrate the complete Active Management of the Third Stage of Labor (AMTSL) to prevent postpartum hemorrhage.",
    simulatedPatientBrief: "Birthing simulator pelvis with newborn manikin on maternal abdomen (skin-to-skin), umbilical cord clamped, placenta undelivered in utero.",
    requiredEquipment: [
      "Birthing delivery manikin with placenta and umbilical cord model",
      "Oxytocin 10 IU ampoule with 2 mL syringe and needle",
      "Umbilical cord clamps (2) and sterile Mayo scissors",
      "Kidney dish / placenta receptacle for examination",
      "Clean gloves, sterile gloves, waterproof apron, and eye protection"
    ],
    checklist: [
      { step: 1, description: "Palpates maternal abdomen immediately following birth to rule out presence of an undiagnosed second twin.", points: 1, criticalFailStep: true },
      { step: 2, description: "Administers Oxytocin 10 IU IM into maternal vastus lateralis muscle within one minute of birth.", points: 1, criticalFailStep: true },
      { step: 3, description: "Clamps umbilical cord close to perineum when cord pulsations cease (1-3 minutes after delivery).", points: 1 },
      { step: 4, description: "Applies Controlled Cord Traction (CCT): Holds cord with dominant hand while placing non-dominant hand above symphysis pubis for counter-traction.", points: 1, criticalFailStep: true },
      { step: 5, description: "Applies gentle continuous downward and backward traction only during uterine contraction; maintains counter-traction to prevent uterine inversion.", points: 1 },
      { step: 6, description: "As placenta emerges from introitus, catches it with both hands and gently twists in clockwise motion to peel membranes intact.", points: 1 },
      { step: 7, description: "Immediately performs vigorous circular transabdominal uterine massage until fundus becomes firm and contracted like a cricket ball.", points: 1, criticalFailStep: true },
      { step: 8, description: "Thoroughly inspects maternal (cotyledons) and fetal (membranes, 3 vessels) surfaces of placenta for completeness.", points: 1 },
      { step: 9, description: "Inspects perineum, vagina, and cervix for tears or active arterial bleeding requiring suture repair.", points: 1 },
      { step: 10, description: "Estimates and records blood loss, instructs mother on fundal self-massage, and schedules 15-minute postpartum monitoring.", points: 1 }
    ],
    examinerNotes: "Traction on the umbilical cord without counter-traction over the lower uterine segment can cause uterine inversion, a life-threatening obstetric emergency (immediate station failure).",
    clinicalTips: [
      "Rule out a second twin before administering oxytocin.",
      "Gentle rotation of the placenta prevents torn membranes from remaining in the uterine cavity."
    ]
  },
  {
    id: "osce-06",
    stationNumber: 6,
    title: "Pediatric Dehydration Assessment & ORS Demonstration",
    level: "300-400 Level / NMCN",
    category: "Pediatrics & Child Health",
    durationMinutes: 7,
    candidateInstructions: "A 14-month-old child, Chidi, is brought to the clinic by his mother with a 2-day history of watery diarrhea. Perform an IMCI dehydration assessment, explain how to prepare and administer Oral Rehydration Salts (ORS) + Zinc, and counsel the mother.",
    simulatedPatientBrief: "Standard pediatric manikin with simulated mother actor. The mother is worried, asking if she should stop breastfeeding.",
    requiredEquipment: [
      "Pediatric assessment manikin",
      "Sachet of WHO low-osmolarity Oral Rehydration Salts (ORS)",
      "Clean 1-litre measured jug and clean drinking cup with teaspoon",
      "Blister pack of Zinc Sulphate dispersible tablets 20 mg",
      "IMCI chart booklet and parent counseling guide"
    ],
    checklist: [
      { step: 1, description: "Greets mother warmly, establishes rapport, and elicits history of stool frequency, vomiting, and urine output.", points: 1 },
      { step: 2, description: "Assesses child's general condition (alert, restless/irritable, or lethargic/unconscious).", points: 1 },
      { step: 3, description: "Checks for sunken eyes and tests skin pinch on abdomen (pinches longitudinally, notes if retracts promptly or slowly).", points: 1, criticalFailStep: true },
      { step: 4, description: "Offers child clean water from cup to assess thirst (drinks eagerly, normally, or unable to drink).", points: 1 },
      { step: 5, description: "Accurately classifies dehydration status according to IMCI guidelines (No Dehydration, Some Dehydration, or Severe Dehydration).", points: 1 },
      { step: 6, description: "Demonstrates ORS preparation step-by-step: Wash hands, pour whole sachet into 1 litre of clean boiled water, mix until dissolved.", points: 1, criticalFailStep: true },
      { step: 7, description: "Instructs mother to administer frequent small sips by cup or spoon (e.g. 1 teaspoon every 1-2 minutes).", points: 1 },
      { step: 8, description: "Prescribes Zinc Sulphate 20 mg daily for 10-14 days; demonstrates dissolving tablet in a teaspoon of breast milk/ORS.", points: 1 },
      { step: 9, description: "Emphatically counsels mother to CONTINUE frequent breastfeeding throughout diarrheal episode.", points: 1 },
      { step: 10, description: "Explains critical danger signs requiring immediate return (blood in stool, unable to drink, persistent vomiting, high fever).", points: 1 }
    ],
    examinerNotes: "Candidate must emphasize dissolving the ENTIRE sachet in exactly 1 litre of water. Making it too concentrated causes hypernatremic osmotic diarrhea.",
    clinicalTips: [
      "Never split an ORS packet into halves unless using a standardized half-packet with verified measuring container.",
      "Zinc shortens duration of diarrhea and prevents recurrence for up to 3 months."
    ]
  }
];
