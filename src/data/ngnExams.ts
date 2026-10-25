/**
 * Unfolding Next-Generation NCLEX (NGN) EHR Case Study Simulator Data
 * Built strictly according to NCSBN Clinical Judgment Measurement Model (CJMM)
 */

export interface EHRNote {
  timestamp: string;
  author: string;
  text: string;
}

export interface EHRVitalEntry {
  time: string;
  bp: string;
  hr: number;
  rr: number;
  temp: string;
  spo2: number;
  o2device: string;
}

export interface EHRLabResult {
  test: string;
  result: string;
  reference: string;
  flag: "normal" | "abnormal" | "critical";
}

export interface EHROrder {
  time: string;
  order: string;
  status: "active" | "completed" | "stat";
}

export interface NGNHighlightCue {
  id: string;
  phrase: string;
  isCorrectCue: boolean;
  explanation: string;
}

export interface NGNMatrixRow {
  id: string;
  action: string;
  expectedStatus: "indicated" | "contraindicated" | "non-essential";
  rationale: string;
}

export interface NGNBowTieOption {
  id: string;
  text: string;
}

export interface NGNCaseStudy {
  id: string;
  title: string;
  clientProfile: {
    name: string;
    age: number;
    gender: string;
    mrn: string;
    admissionDiagnosis: string;
    allergies: string;
    codeStatus: string;
  };
  ehr: {
    nurseNotes: EHRNote[];
    vitalsFlowsheet: EHRVitalEntry[];
    labs: EHRLabResult[];
    orders: EHROrder[];
  };
  questions: {
    step1Highlight: {
      prompt: string;
      cues: NGNHighlightCue[];
    };
    step2Matrix: {
      prompt: string;
      rows: NGNMatrixRow[];
    };
    step3BowTie: {
      prompt: string;
      conditionOptions: NGNBowTieOption[];
      correctConditionId: string;
      actionOptions: NGNBowTieOption[];
      correctActionIds: string[];
      parameterOptions: NGNBowTieOption[];
      correctParameterIds: string[];
      rationale: string;
    };
  };
}

export const NGN_HEART_FAILURE_CASE: NGNCaseStudy = {
  id: "ngn-case-01",
  title: "Unfolding Case Study: Acute Decompensated Heart Failure & Flash Pulmonary Edema",
  clientProfile: {
    name: "Mrs. Victoria Adeleke",
    age: 68,
    gender: "Female",
    mrn: "EHR-NGN-2026-904",
    admissionDiagnosis: "Hypertensive Crisis with Congestive Heart Failure Exacerbation",
    allergies: "Sulfa medications (Urticaria/Rash)",
    codeStatus: "Full Code",
  },
  ehr: {
    nurseNotes: [
      {
        timestamp: "07:00 Shift Intake",
        author: "A. Ibrahim, RN",
        text: "Received client sitting upright in high Fowler position. Reports persistent dry cough and inability to sleep flat due to orthopnea. Pitting peripheral edema (2+) noted in bilateral lower extremities. Breath sounds clear anteriorly with faint end-inspiratory crackles at posterior lung bases.",
      },
      {
        timestamp: "09:30 Clinical Deterioration Note",
        author: "A. Ibrahim, RN",
        text: "Client is in acute respiratory distress, restless and anxious. Diaphoretic with marked circumoral pallor. Productive cough with copious pink, frothy sputum. Coarse bubbling crackles audible throughout all lung fields. S3 gallop audible at cardiac apex. Client speaks in 1- to 2-word gasps, stating 'I feel like I am drowning.' Intercostal retractions noted.",
      },
    ],
    vitalsFlowsheet: [
      {
        time: "07:00",
        bp: "154/90 mmHg",
        hr: 88,
        rr: 20,
        temp: "36.8 °C",
        spo2: 94,
        o2device: "Room Air",
      },
      {
        time: "08:30",
        bp: "172/98 mmHg",
        hr: 104,
        rr: 26,
        temp: "37.0 °C",
        spo2: 91,
        o2device: "Nasal Cannula 2 L/min",
      },
      {
        time: "09:30",
        bp: "208/116 mmHg",
        hr: 128,
        rr: 36,
        temp: "37.1 °C",
        spo2: 83,
        o2device: "Nasal Cannula 2 L/min",
      },
    ],
    labs: [
      {
        test: "B-Type Natriuretic Peptide (BNP)",
        result: "2,650 pg/mL",
        reference: "< 100 pg/mL",
        flag: "critical",
      },
      {
        test: "Serum Potassium (K+)",
        result: "4.3 mEq/L",
        reference: "3.5 - 5.0 mEq/L",
        flag: "normal",
      },
      {
        test: "Serum Creatinine",
        result: "1.4 mg/dL",
        reference: "0.6 - 1.2 mg/dL",
        flag: "abnormal",
      },
      {
        test: "Troponin I",
        result: "0.04 ng/mL",
        reference: "< 0.04 ng/mL",
        flag: "normal",
      },
      {
        test: "Arterial Blood Gas (ABG) pH",
        result: "7.31",
        reference: "7.35 - 7.45",
        flag: "abnormal",
      },
      {
        test: "ABG PaCO2",
        result: "49 mmHg",
        reference: "35 - 45 mmHg",
        flag: "abnormal",
      },
      {
        test: "ABG PaO2",
        result: "58 mmHg",
        reference: "80 - 100 mmHg",
        flag: "critical",
      },
    ],
    orders: [
      {
        time: "09:35",
        order: "Initiate Non-Invasive Positive Pressure Ventilation (BiPAP: IPAP 12 cmH2O, EPAP 5 cmH2O, FiO2 60%) stat",
        status: "stat",
      },
      {
        time: "09:35",
        order: "Furosemide 80 mg IV push slow over 3 minutes stat",
        status: "stat",
      },
      {
        time: "09:35",
        order: "Nitroglycerin sublingual 0.4 mg stat; repeat every 5 minutes x 3 for SBP > 160 mmHg",
        status: "active",
      },
      {
        time: "09:35",
        order: "Insert Indwelling Foley Catheter with urometer to gravity stat",
        status: "stat",
      },
      {
        time: "09:35",
        order: "HOLD oral Carvedilol 25 mg until respiratory failure resolves",
        status: "completed",
      },
    ],
  },
  questions: {
    step1Highlight: {
      prompt:
        "Click to HIGHLIGHT the 4 distinct clinical cues from the 09:30 nurse note that most urgently indicate acute flash pulmonary edema and impending respiratory failure.",
      cues: [
        {
          id: "cue-1",
          phrase: "copious pink, frothy sputum",
          isCorrectCue: true,
          explanation: "Pink frothy sputum is the hallmark sign of alveolar capillary rupture and severe acute pulmonary edema.",
        },
        {
          id: "cue-2",
          phrase: "restless and anxious",
          isCorrectCue: true,
          explanation: "Acute cerebral hypoxia triggers severe anxiety, agitation, and impending doom in flash pulmonary edema.",
        },
        {
          id: "cue-3",
          phrase: "coarse bubbling crackles audible throughout all lung fields",
          isCorrectCue: true,
          explanation: "Widespread coarse bubbling crackles indicate fluid filling both lower and mid-upper alveolar beds.",
        },
        {
          id: "cue-4",
          phrase: "speaks in 1- to 2-word gasps",
          isCorrectCue: true,
          explanation: "Severe dyspnea limiting speech to 1-2 words is a cardinal sign of imminent ventilatory fatigue.",
        },
        {
          id: "cue-5",
          phrase: "client is sitting in room",
          isCorrectCue: false,
          explanation: "General body position alone does not uniquely specify acute pulmonary capillary transudation.",
        },
        {
          id: "cue-6",
          phrase: "diaphoretic with marked circumoral pallor",
          isCorrectCue: false,
          explanation: "While consistent with sympathetic discharge, it is less specific than alveolar fluid signs.",
        },
      ],
    },
    step2Matrix: {
      prompt:
        "For each potential nursing action below, determine whether it is 'Indicated' (beneficial & mandatory), 'Contraindicated' (harmful/unsafe), or 'Non-Essential' for this client right now.",
      rows: [
        {
          id: "row-1",
          action: "Place the client in high Fowler's position with legs dependent over the bedside",
          expectedStatus: "indicated",
          rationale: "Fowler's position with dependent legs pools venous blood in lower extremities, reducing preload and cardiac workload.",
        },
        {
          id: "row-2",
          action: "Administer 1,000 mL 0.9% Normal Saline IV bolus over 30 minutes",
          expectedStatus: "contraindicated",
          rationale: "Administering IV fluid boluses into hypervolemic pulmonary edema accelerates cardiac arrest and fluid overload.",
        },
        {
          id: "row-3",
          action: "Apply high-flow CPAP or BiPAP non-invasive ventilation",
          expectedStatus: "indicated",
          rationale: "Positive airway pressure pushes fluid out of the alveoli back into pulmonary vasculature and recruits atelectatic units.",
        },
        {
          id: "row-4",
          action: "Administer prescribed oral Carvedilol 25 mg with a sip of water",
          expectedStatus: "contraindicated",
          rationale: "Negative inotropic beta-blockers must never be initiated or acutely escalated during acute decompensated shock/pulmonary edema.",
        },
        {
          id: "row-5",
          action: "Insert indwelling urinary catheter to monitor hourly output",
          expectedStatus: "indicated",
          rationale: "Essential to immediately verify diuresis response to IV Furosemide and avoid bladder distension.",
        },
        {
          id: "row-6",
          action: "Collect routine stool sample for occult blood screening",
          expectedStatus: "non-essential",
          rationale: "Stool testing has no relevance to acute emergent airway and cardiopulmonary resuscitation.",
        },
      ],
    },
    step3BowTie: {
      prompt:
        "Complete the Bow-Tie diagram: Select the primary Condition Most Likely to Occur in the center, two Actions to Take on the left, and two Parameters to Monitor on the right.",
      conditionOptions: [
        { id: "c-1", text: "Acute Decompensated Heart Failure with Flash Pulmonary Edema" },
        { id: "c-2", text: "Spontaneous Tension Pneumothorax" },
        { id: "c-3", text: "Acute Diabetic Ketoacidosis with Kussmaul Breathing" },
        { id: "c-4", text: "Aspiration Pneumonia without Volume Overload" },
      ],
      correctConditionId: "c-1",
      actionOptions: [
        { id: "a-1", text: "Administer IV Furosemide 80 mg push slowly over 3 minutes" },
        { id: "a-2", text: "Initiate BiPAP Non-Invasive Ventilation stat" },
        { id: "a-3", text: "Prepare 14-gauge needle for thoracic decompression" },
        { id: "a-4", text: "Infuse regular insulin at 0.1 units/kg/hr IV piggyback" },
      ],
      correctActionIds: ["a-1", "a-2"],
      parameterOptions: [
        { id: "p-1", text: "Hourly urine output via urometer (target > 100 mL/hr post-loop diuretic)" },
        { id: "p-2", text: "Continuous pulse oximetry and respiratory rate every 15 minutes" },
        { id: "p-3", text: "Capillary blood glucose every hour" },
        { id: "p-4", text: "Serial serum amylase and lipase levels" },
      ],
      correctParameterIds: ["p-1", "p-2"],
      rationale:
        "The client has acute decompensated heart failure with flash pulmonary edema. Immediate life-saving actions are rapid loop diuresis to unload preload and BiPAP to recruit alveolar volume and reduce afterload. Key monitoring targets are diuresis output and oxygenation recovery.",
    },
  },
};
