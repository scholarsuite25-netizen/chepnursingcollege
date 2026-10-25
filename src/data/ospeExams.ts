/**
 * OSPE (OBJECTIVE STRUCTURED PRACTICAL EXAMINATION) DIAGNOSTIC STUDIO
 * NMCN & International Clinical Assessment Standard
 * Focus: ECG Rhythm Strips, Arterial Blood Gases (ABGs), Urinalysis Dipsticks, 
 * Radiographic Imaging, and Surgical Instruments.
 */

export interface OSPEStation {
  id: string;
  stationNumber: number;
  category: "ECG Rhythm" | "Arterial Blood Gas" | "Urinalysis" | "Radiography" | "Surgical Tray" | "Clinical Chemistry";
  title: string;
  clinicalVignette: string;
  exhibitType: "data" | "strip" | "dipstick" | "table";
  diagnosticExhibit: {
    label: string;
    readings: Record<string, string>;
    visualIndicator?: string;
  };
  promptQuestion: string;
  options: [string, string, string, string];
  correctIndex: number;
  clinicalRationale: string;
  remedialReference: string;
}

export const OSPE_STATIONS: OSPEStation[] = [
  {
    id: "ospe-st-01",
    stationNumber: 1,
    category: "ECG Rhythm",
    title: "12-Lead Electrocardiogram Rhythm Strip Analysis",
    clinicalVignette: "A 56-year-old hypertensive male presents with crushing retrosternal chest pain radiating to the left arm and jaw for 90 minutes. A stat 12-lead ECG is obtained.",
    exhibitType: "strip",
    diagnosticExhibit: {
      label: "Lead V1 through V4 Rhythm Strip Findings",
      readings: {
        "Rhythm": "Regular Sinus",
        "Ventricular Rate": "94 bpm",
        "PR Interval": "0.16 seconds (Normal)",
        "ST Segment": "3.5 mm convex elevation in Leads V1, V2, V3, and V4",
        "Reciprocal Changes": "ST depression in inferior leads II, III, and aVF",
        "T Waves": "Hyperacute peaked T waves",
      },
      visualIndicator: "ST-Elevation > 2mm in contiguous anterior precordial leads",
    },
    promptQuestion: "Based on the 12-lead ECG telemetry exhibit, what is the definitive primary diagnosis?",
    options: [
      "Acute Anterior Wall ST-Elevation Myocardial Infarction (STEMI)",
      "Benign Early Repolarization (BER)",
      "Acute Pericarditis with diffuse PR depression",
      "Left Bundle Branch Block without acute ischemia",
    ],
    correctIndex: 0,
    clinicalRationale: "ST-segment elevation >= 2 mm in two contiguous precordial leads (V1-V4) accompanied by reciprocal depression in inferior leads confirms an acute anterior STEMI (LAD occlusion). Immediate reperfusion therapy (primary PCI within 90 minutes or thrombolysis) is mandatory.",
    remedialReference: "NMCN Adult Critical Care Guidelines Section 3.1 & AHA STEMI Guidelines",
  },
  {
    id: "ospe-st-02",
    stationNumber: 2,
    category: "Arterial Blood Gas",
    title: "Arterial Blood Gas (ABG) & Acid-Base Balance Interpretation",
    clinicalVignette: "A 68-year-old female with a 30-year history of Chronic Obstructive Pulmonary Disease (COPD) is admitted with acute lethargy, somnolence, and shallow breathing (RR 10 cpm). An arterial blood gas sample on room air reveals:",
    exhibitType: "data",
    diagnosticExhibit: {
      label: "Stat Arterial Blood Gas (ABG) Panel",
      readings: {
        "pH": "7.26 (Normal: 7.35 - 7.45)",
        "PaCO2": "64 mmHg (Normal: 35 - 45 mmHg)",
        "PaO2": "52 mmHg (Normal: 80 - 100 mmHg)",
        "HCO3-": "28 mEq/L (Normal: 22 - 26 mEq/L)",
        "Base Excess": "+3.0 mEq/L",
        "SaO2": "84% on room air",
      },
      visualIndicator: "Acidemic pH with elevated PaCO2 and slight compensatory HCO3- retention",
    },
    promptQuestion: "Classify this client's primary acid-base status and compensation level:",
    options: [
      "Partially compensated Respiratory Acidosis with severe hypoxemia",
      "Uncompensated Metabolic Acidosis",
      "Fully compensated Respiratory Alkalosis",
      "Mixed Metabolic Alkalosis and Lactic Acidosis",
    ],
    correctIndex: 0,
    clinicalRationale: "pH 7.26 is acidemic (< 7.35). PaCO2 is elevated at 64 mmHg, identifying the respiratory etiology. The kidneys have begun retaining bicarbonate (HCO3- 28 mEq/L > 26 mEq/L) to buffer the acid, but pH has not yet normalized; thus it is partially compensated respiratory acidosis with hypoxemia.",
    remedialReference: "NMCN Medical-Surgical Nursing: Blood Gas Analysis Protocol",
  },
  {
    id: "ospe-st-03",
    stationNumber: 3,
    category: "Urinalysis",
    title: "Diagnostic Urinalysis Reagent Strip (Dipstick) Colorimetry",
    clinicalVignette: "A 22-year-old primigravida at 34 weeks gestation presents for routine antenatal booking complaining of bilateral ankle swelling and severe frontal headaches. A fresh midstream urine sample is tested with a 10-parameter reagent dipstick.",
    exhibitType: "dipstick",
    diagnosticExhibit: {
      label: "Urine Multistix Reagent Pad Analysis",
      readings: {
        "Color / Appearance": "Cloudy amber yellow",
        "Specific Gravity": "1.025",
        "pH": "6.0",
        "Protein": "+++ (300 mg/dL / intense green colorimetric change)",
        "Glucose": "Negative",
        "Ketones": "Trace",
        "Leukocyte Esterase": "Negative",
        "Blood": "Negative",
      },
      visualIndicator: "Heavy Proteinuria (+++) in hypertensive pregnancy",
    },
    promptQuestion: "In the presence of a blood pressure of 164/108 mmHg, what clinical syndrome does this urinalysis finding establish?",
    options: [
      "Severe Pre-Eclampsia requiring immediate Magnesium Sulfate and anti-hypertensive therapy",
      "Benign Orthostatic Proteinuria of Pregnancy",
      "Acute Bacterial Pyelonephritis",
      "Gestational Diabetes Mellitus",
    ],
    correctIndex: 0,
    clinicalRationale: "New-onset hypertension (>= 140/90 or >= 160/110) after 20 weeks gestation accompanied by significant proteinuria (>= ++ or 300 mg/dL) establishes pre-eclampsia. Severe features (BP >= 160/110, severe headache, heavy proteinuria) mandate seizure prophylaxis with Magnesium Sulfate.",
    remedialReference: "NMCN Midwifery Council Manual: Management of Hypertensive Disorders in Pregnancy",
  },
  {
    id: "ospe-st-04",
    stationNumber: 4,
    category: "Radiography",
    title: "Portable Chest Radiograph (X-Ray) Clinical Orientation",
    clinicalVignette: "A 28-year-old male stabbed in the right anterior chest is brought to resuscitation. An immediate portable supine AP chest radiograph is performed following clinical deterioration.",
    exhibitType: "data",
    diagnosticExhibit: {
      label: "Radiological Scout Observations",
      readings: {
        "Right Hemithorax": "Complete radiolucency (hyper-transparency) with total lung collapse towards the hilum",
        "Mediastinal Shift": "Marked displacement of trachea and cardiac silhouette to the LEFT hemithorax",
        "Diaphragm": "Depressed and flattened right hemidiaphragm with deep sulcus sign",
        "Vascular Markings": "Completely absent throughout peripheral right hemithorax",
        "Left Lung": "Compressed parenchyma secondary to mediastinal shift",
      },
      visualIndicator: "Right Tension Pneumothorax with contralateral mediastinal herniation",
    },
    promptQuestion: "What is the emergency diagnosis confirmed by this radiograph?",
    options: [
      "Right-sided Tension Pneumothorax with life-threatening mediastinal shift",
      "Right Massive Hemothorax with fluid meniscus",
      "Right Middle Lobe Lobar Consolidation",
      "Pericardial Tamponade with water-bottle heart",
    ],
    correctIndex: 0,
    clinicalRationale: "Complete absence of peripheral vascular lung markings with lung collapse, contralateral mediastinal and tracheal shift, and flattened diaphragm are classic radiological signs of tension pneumothorax.",
    remedialReference: "ATLS / NMCN Trauma Emergency Life Support Standards",
  },
  {
    id: "ospe-st-05",
    stationNumber: 5,
    category: "Surgical Tray",
    title: "Operating Theatre Surgical Instrument Identification & Classification",
    clinicalVignette: "You are the scrub nurse preparing the Mayo trolley for a caesarean section and exploratory laparotomy. The following instrument is presented on the sterile field: Length 20 cm, curved slender jaws with horizontal serrations running along the entire length of the blade, with a ratchet locking mechanism.",
    exhibitType: "table",
    diagnosticExhibit: {
      label: "Surgical Instrument Morphological Features",
      readings: {
        "Jaw Type": "Fully serrated transversely from tip to hinge",
        "Curvature": "Gentle longitudinal curve",
        "Tips": "Blunt atraumatic tips without teeth",
        "Ratchet": "3-position finger-ring locking mechanism",
        "Primary Surgical Action": "Hemostasis (clamping bleeding blood vessels) and tissue grasping",
      },
      visualIndicator: "Rochester-Pean / Spencer Wells Artery Forceps",
    },
    promptQuestion: "Identify this surgical instrument and its primary surgical indication:",
    options: [
      "Spencer Wells / Rochester-Pean Artery Forceps (for vascular clamping and hemostasis)",
      "Allis Tissue Forceps (for grasping fascial planes)",
      "Babcock Forceps (for grasping delicate tubular organs)",
      "Backhaus Towel Clamp (for securing sterile drapes)",
    ],
    correctIndex: 0,
    clinicalRationale: "Spencer Wells and Rochester-Pean artery forceps feature transverse serrations along the entire length of the jaws without teeth at the tip, specifically engineered for clamping blood vessels to achieve hemostasis without severing vessel walls.",
    remedialReference: "NMCN Perioperative Nursing Curriculum Section 2.4",
  },
  {
    id: "ospe-st-06",
    stationNumber: 6,
    category: "Clinical Chemistry",
    title: "Electrolytes, Urea & Creatinine (E/U/Cr) Critical Value Triage",
    clinicalVignette: "A 52-year-old male with end-stage renal disease (ESRD) missed his last 2 hemodialysis sessions. He is admitted with profound generalized muscle weakness and palpitations. The laboratory phones in the following critical lab results:",
    exhibitType: "data",
    diagnosticExhibit: {
      label: "Serum Biochemistry Critical Value Panel",
      readings: {
        "Sodium (Na+)": "136 mEq/L (Normal: 135 - 145)",
        "Potassium (K+)": "7.1 mEq/L (CRITICAL HIGH: Normal 3.5 - 5.0)",
        "Chloride (Cl-)": "100 mEq/L (Normal: 98 - 106)",
        "Bicarbonate": "14 mEq/L (Normal: 22 - 28)",
        "Blood Urea": "38 mmol/L (Normal: 2.5 - 7.5)",
        "Serum Creatinine": "680 umol/L (Normal: 60 - 110)",
      },
      visualIndicator: "Severe Hyperkalemia (7.1 mEq/L) at extreme risk of ventricular fibrillation",
    },
    promptQuestion: "What is the nurse's immediate priority emergency intervention for a potassium level of 7.1 mEq/L?",
    options: [
      "Administer IV Calcium Gluconate 10% immediately to stabilize the cardiac myocyte membrane",
      "Administer oral potassium supplements with fruit juice",
      "Place the client in high Fowler's and encourage deep breathing only",
      "Re-check the blood sample in 12 hours before notifying the physician",
    ],
    correctIndex: 0,
    clinicalRationale: "Serum potassium > 6.5-7.0 mEq/L is a medical emergency that induces fatal ventricular arrhythmias and asystole. Intravenous Calcium Gluconate (10 mL of 10% over 2-3 minutes) immediately antagonizes potassium's membrane excitability, cardioprotecting the patient while insulin/dextrose and dialysis shift and eliminate potassium.",
    remedialReference: "NMCN Emergency & Nephrology Nursing Clinical Protocols",
  },
];
