/**
 * Nursing Care Plan (NCP) 5-Step Clinical Reasoning Matrix
 * Aligned with NMCN Practical Hospital Ward Standards & NANDA-I / NOC / NIC taxonomies
 */

export interface NCPAssessmentFinding {
  id: string;
  finding: string;
  type: "subjective" | "objective";
}

export interface NCPDiagnosisOption {
  id: string;
  nandaCode: string;
  diagnosis: string;
  isPriority: boolean;
  rationale: string;
}

export interface NCPOutcomeOption {
  id: string;
  goal: string;
  isSmart: boolean;
  rationale: string;
}

export interface NCPInterventionOption {
  id: string;
  intervention: string;
  category: "independent" | "dependent" | "collaborative";
  isAppropriate: boolean;
  scientificRationale: string;
}

export interface NCPEvaluationScenario {
  reassessmentData: string;
  correctVerdict: "met" | "partially_met" | "unmet";
  rationale: string;
}

export interface NCPCaseStudy {
  id: string;
  title: string;
  patientScenario: {
    demographics: string;
    clinicalContext: string;
    vitals: string;
  };
  assessmentPool: NCPAssessmentFinding[];
  diagnosisPool: NCPDiagnosisOption[];
  outcomePool: NCPOutcomeOption[];
  interventionPool: NCPInterventionOption[];
  evaluationScenario: NCPEvaluationScenario;
}

export const NCP_SEPSIS_SCENARIO: NCPCaseStudy = {
  id: "ncp-case-sepsis",
  title: "Clinical Nursing Care Plan: Severe Post-Operative Peritonitis & Sepsis",
  patientScenario: {
    demographics: "Mr. Emmanuel Adeyemi, 42 years old, Male, Ward 3 Surgical Annex",
    clinicalContext:
      "Post-operative Day 2 following emergency exploratory laparotomy and appendectomy for perforated gangrenous appendicitis. Patient is disoriented to time and place. Skin is hot and flushed with delayed capillary refill of 4 seconds. Surgical midline dressing has moderate foul-smelling purulent discharge. Abdomen is rigid and tender to palpation.",
    vitals: "BP: 88/54 mmHg, HR: 126 bpm, Temp: 39.4 °C, RR: 28 breaths/min, SpO2: 92% on room air, Urine Output: 15 mL/hr over past 2 hours.",
  },
  assessmentPool: [
    { id: "af-1", finding: "Patient complains: 'I feel burning pain all over my belly and I cannot catch my breath'", type: "subjective" },
    { id: "af-2", finding: "Heart rate is 126 beats per minute regular", type: "objective" },
    { id: "af-3", finding: "Blood pressure is 88/54 mmHg (Mean Arterial Pressure 65 mmHg)", type: "objective" },
    { id: "af-4", finding: "Patient states: 'I am so cold and shivering under this blanket'", type: "subjective" },
    { id: "af-5", finding: "Urine output is 15 mL/hour with dark amber concentration", type: "objective" },
    { id: "af-6", finding: "Foul-smelling purulent exudate observed on surgical midline dressing", type: "objective" },
  ],
  diagnosisPool: [
    {
      id: "diag-1",
      nandaCode: "00027",
      diagnosis: "Deficient Fluid Volume related to active fluid shifts and systemic vasodilation as evidenced by BP 88/54 mmHg, HR 126 bpm, and oliguria < 0.5 mL/kg/hr",
      isPriority: true,
      rationale: "Hypovolemia and distributive septic shock compromise organ perfusion and take absolute Maslow life-threatening priority over comfort.",
    },
    {
      id: "diag-2",
      nandaCode: "00132",
      diagnosis: "Acute Pain related to surgical incision and peritoneal inflammation as evidenced by verbal score 9/10 and abdominal guarding",
      isPriority: false,
      rationale: "Pain management is crucial, but airway and circulatory hemodynamic collapse take strict ABC precedence.",
    },
    {
      id: "diag-3",
      nandaCode: "00007",
      diagnosis: "Hyperthermia related to systemic inflammatory response to bacterial peritonitis as evidenced by temperature 39.4 °C and diaphoresis",
      isPriority: false,
      rationale: "Fever is a secondary symptom; treating hypoperfusion and underlying infection resolves hyperthermia.",
    },
    {
      id: "diag-4",
      nandaCode: "00146",
      diagnosis: "Anxiety related to unfamiliar hospital environment as evidenced by restlessness",
      isPriority: false,
      rationale: "Psychological diagnoses are lower priority during acute septic shock.",
    },
  ],
  outcomePool: [
    {
      id: "out-1",
      goal: "Within 2 hours of initiating fluid resuscitation, client will maintain Mean Arterial Pressure (MAP) >= 65 mmHg and urine output >= 30 mL/hr.",
      isSmart: true,
      rationale: "Specific, Measurable, Achievable, Relevant, and Time-bound goal targeting essential organ perfusion.",
    },
    {
      id: "out-2",
      goal: "Client will feel better soon and have normal blood pressure whenever possible.",
      isSmart: false,
      rationale: "Vague, unmeasurable, lacks specific numeric parameters and lacks an exact timeframe.",
    },
    {
      id: "out-3",
      goal: "Client will maintain temperature between 36.5 °C and 37.5 °C within 4 hours following antipyretics and broad-spectrum antibiotics.",
      isSmart: true,
      rationale: "Well-formulated SMART physiological outcome for thermal regulation.",
    },
    {
      id: "out-4",
      goal: "Client will stop coughing and sleep for 8 hours without disruption.",
      isSmart: false,
      rationale: "Inappropriate target for post-laparotomy sepsis with abdominal infection.",
    },
  ],
  interventionPool: [
    {
      id: "int-1",
      intervention: "Administer 30 mL/kg of IV Crystalloid (0.9% Normal Saline or Ringer's Lactate) rapidly within the first 1 to 3 hours as prescribed.",
      category: "dependent",
      isAppropriate: true,
      scientificRationale: "Restores intravascular circulating volume, increases venous return to the heart, and raises mean arterial pressure in septic hypoperfusion.",
    },
    {
      id: "int-2",
      intervention: "Obtain two sets of blood cultures (aerobic and anaerobic) from separate venipuncture sites PRIOR to initiating broad-spectrum IV antibiotics.",
      category: "collaborative",
      isAppropriate: true,
      scientificRationale: "Identifies causative pathogen and antimicrobial sensitivity before antimicrobial agents inhibit bacterial recovery.",
    },
    {
      id: "int-3",
      intervention: "Insert indwelling urinary catheter and record urine output every 60 minutes with strict fluid balance charting.",
      category: "independent",
      isAppropriate: true,
      scientificRationale: "Provides the most immediate non-invasive indicator of renal arterial perfusion and resuscitation adequacy.",
    },
    {
      id: "int-4",
      intervention: "Encourage vigorous active resistance leg exercises and ambulation in the hallway immediately.",
      category: "independent",
      isAppropriate: false,
      scientificRationale: "Contraindicated. Ambulation in severe hypotensive septic shock precipitates syncope, falls, and worsening cerebral hypoperfusion.",
    },
    {
      id: "int-5",
      intervention: "Administer prescribed IV Piperacillin-Tazobactam within 60 minutes of sepsis recognition.",
      category: "dependent",
      isAppropriate: true,
      scientificRationale: "Early empiric broad-spectrum antibiotic administration within the golden hour reduces mortality by 7.6% per hour of delay in septic shock.",
    },
  ],
  evaluationScenario: {
    reassessmentData:
      "At Hour 3 post-resuscitation: Client has received 2,000 mL IV Ringer's Lactate and first dose of IV antibiotics. Current BP is 106/68 mmHg (MAP 80 mmHg). HR is 94 bpm regular. Urine output over the past hour was 45 mL. Mentation has cleared; client is alert and oriented x 3.",
    correctVerdict: "met",
    rationale:
      "Hemodynamic goals were fully achieved: MAP exceeded 65 mmHg (80 mmHg), urine output recovered past the 30 mL/hr threshold (45 mL), and cerebral perfusion normalized.",
  },
};
