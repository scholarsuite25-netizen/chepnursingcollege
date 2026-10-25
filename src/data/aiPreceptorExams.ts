/**
 * Conversational AI Clinical Preceptor, Simulated Patient & SBAR Handover Simulator
 * Aligned with Frontier AI Assessment Standards, NCSBN CJMM & ICN Communication Framework
 */

export interface PatientDialogueTurn {
  id: string;
  nurseQuestion: string;
  patientResponse: string;
  category: "pqrst_pain" | "allergies" | "history" | "psychosocial" | "inappropriate";
  clinicalRelevance: string;
}

export interface SBARRubricItem {
  id: string;
  domain: "Situation" | "Background" | "Assessment" | "Recommendation";
  criterion: string;
  expectedInputSnippet: string;
  points: number;
}

export interface AlgorithmicStewardshipChallenge {
  aiProposalTitle: string;
  aiSuggestedOrder: string;
  aiConfidenceScore: string;
  hiddenLethalTrap: string;
  correctNurseAction: "accept" | "override_reject";
  clinicalRationale: string;
}

export interface AIPreceptorScenario {
  id: string;
  title: string;
  simulatedPatient: {
    name: string;
    age: number;
    avatar: string;
    setting: string;
    chiefComplaint: string;
    vitalSigns: string;
    ecgTelemetry: string;
  };
  dialogueBank: PatientDialogueTurn[];
  sbarRubric: SBARRubricItem[];
  aiStewardship: AlgorithmicStewardshipChallenge;
}

export const AI_PRECEPTOR_STEMI_SCENARIO: AIPreceptorScenario = {
  id: "ai-sim-stemi-01",
  title: "Conversational Simulated Patient: Acute Inferior Wall STEMI & SBAR Handover",
  simulatedPatient: {
    name: "Chief Babatunde Balogun",
    age: 58,
    avatar: "person",
    setting: "Emergency Observation Unit - Bed 4",
    chiefComplaint: "Severe retrosternal pressure radiating to jaw and left shoulder for 45 minutes",
    vitalSigns: "BP: 86/52 mmHg, HR: 48 bpm (sinus bradycardia with 2nd-degree Mobitz I block), RR: 22, SpO2: 95% on room air",
    ecgTelemetry: "ST-segment elevation of 3.5 mm in inferior leads II, III, and aVF with reciprocal ST depression in I and aVL.",
  },
  dialogueBank: [
    {
      id: "turn-1",
      nurseQuestion: "Chief Balogun, can you describe exactly what the pain feels like and where it spreads?",
      patientResponse:
        "It feels like an elephant is sitting on my chest! It started about 45 minutes ago while climbing the stairs. It is spreading right up into my left jaw and down my left arm. It is suffocating, Nurse!",
      category: "pqrst_pain",
      clinicalRelevance: "Confirms classic radiation and quality of acute coronary ischemia.",
    },
    {
      id: "turn-2",
      nurseQuestion: "On a scale of 0 to 10, how severe is your chest discomfort right now?",
      patientResponse:
        "It is at least a 9 out of 10! I have never felt pain this intense in my entire life.",
      category: "pqrst_pain",
      clinicalRelevance: "Quantifies severity for baseline analgesic response and STEMI urgency.",
    },
    {
      id: "turn-3",
      nurseQuestion: "Do you have any known drug allergies, especially to Aspirin or pain medications?",
      patientResponse:
        "No allergies to Aspirin or medicines at all. I occasionally take Paracetamol for headaches with no problem.",
      category: "allergies",
      clinicalRelevance: "Safety prerequisite before chewing 300 mg soluble Aspirin.",
    },
    {
      id: "turn-4",
      nurseQuestion: "Have you taken any medications for erectile dysfunction, like Sildenafil (Viagra), in the last 24 to 48 hours?",
      patientResponse:
        "Yes, my doctor prescribed Sildenafil for me, and I took one tablet yesterday evening around 8:00 PM.",
      category: "history",
      clinicalRelevance:
        "CRITICAL SAFETY DISCOVERY: Nitrates are strictly contraindicated within 24-48 hours of PDE-5 inhibitors due to fatal refractory hypotension.",
    },
    {
      id: "turn-5",
      nurseQuestion: "What is your favorite football club in the Premier League?",
      patientResponse:
        "Nurse, I am in terrible pain here! Why are you asking me about football right now?",
      category: "inappropriate",
      clinicalRelevance: "Distracting question with zero clinical utility during acute myocardial infarction.",
    },
  ],
  sbarRubric: [
    {
      id: "sbar-s",
      domain: "Situation",
      criterion: "Identify candidate name, unit, patient name, and immediate life-threatening emergency (Acute Inferior STEMI).",
      expectedInputSnippet: "Calling from Emergency regarding Chief Balogun in Bed 4 who is having an acute STEMI.",
      points: 25,
    },
    {
      id: "sbar-b",
      domain: "Background",
      criterion: "State time of pain onset, past hypertension history, and recent PDE-5 inhibitor use prohibiting nitrates.",
      expectedInputSnippet: "Onset 45 mins ago, severe 9/10 chest pain, client took Sildenafil 18 hours ago.",
      points: 25,
    },
    {
      id: "sbar-a",
      domain: "Assessment",
      criterion: "Communicate hypotension (BP 86/52), bradycardia (HR 48), and 3.5mm ST-elevation in leads II, III, aVF.",
      expectedInputSnippet: "Hypotensive BP 86/52, HR 48 bpm, 12-lead ECG reveals acute inferior wall STEMI.",
      points: 25,
    },
    {
      id: "sbar-r",
      domain: "Recommendation",
      criterion: "Request emergent Cath Lab activation for Primary PCI, Hold Nitrates/Beta-blockers, administer Aspirin and IV fluid support.",
      expectedInputSnippet: "Immediate Cath lab activation for PCI, hold nitrates and beta-blockers, prepare Atropine/fluids.",
      points: 25,
    },
  ],
  aiStewardship: {
    aiProposalTitle: "Clinical AI Copilot Diagnostic Recommendation v4.2",
    aiSuggestedOrder:
      "Administer 5 mg IV Metoprolol every 5 minutes x 3 doses to decrease myocardial oxygen consumption, and apply 0.4 mg Sublingual Nitroglycerin.",
    aiConfidenceScore: "97.4% High Confidence Match (AHA/ACC Coronary Protocol)",
    hiddenLethalTrap:
      "The client is hypotensive (BP 86/52) and bradycardic (HR 48 bpm) with inferior STEMI and took Sildenafil within 24 hours. Administering Metoprolol or Nitroglycerin will induce fatal circulatory collapse and cardiac arrest!",
    correctNurseAction: "override_reject",
    clinicalRationale:
      "The nurse MUST OVERRIDE and REJECT the AI Copilot order. Beta-blockers are contraindicated in severe bradycardia/hypotension, and Nitrates are fatal in right ventricular/inferior infarction combined with recent PDE-5 inhibitor ingestion. The nurse's human vigilance protects the patient from algorithmic error.",
  },
};
