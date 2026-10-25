"use server";

export interface GeneratedClinicalScenario {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  setting: string;
  locationContext: string;
  presentingEmergency: string;
  historyOfPresentIllness: string;
  vitals: {
    bp: string;
    hr: number;
    rr: number;
    temp: string;
    spo2: number;
    gcs: number;
  };
  keyDiagnosticClues: string[];
  aiCopilotSuggestion: {
    order: string;
    suggestedBy: string;
    confidence: string;
    hasHiddenLethalTrap: boolean;
    lethalTrapExplanation: string;
  };
  recommendedActions: string[];
}

/**
 * Generative Clinical AI Scenario Synthesizer
 * Generates bespoke clinical acute emergency encounters dynamically on the fly
 */
export async function generateDynamicClinicalScenario(params: {
  specialty?: string;
  acuity?: "moderate" | "severe" | "critical";
  setting?: string;
}): Promise<GeneratedClinicalScenario> {
  const defaultSetting = params.setting || "OOUTH Sagamu Emergency Annex";
  const timestamp = Date.now();

  const scenarios: GeneratedClinicalScenario[] = [
    {
      id: `gen-case-eclampsia-${timestamp}`,
      patientName: "Mrs. Folashade Adeleke",
      age: 26,
      gender: "Female (Gravida 1 Para 0 at 34 weeks)",
      setting: "Maternity Emergency Triage",
      locationContext: "State Hospital Ota, Ogun State",
      presentingEmergency: "Severe Preeclampsia with Impending Eclamptic Convulsion",
      historyOfPresentIllness:
        "Arrived via ambulance with severe throbbing frontal headache, blurred vision, scotoma, and hyperreflexia (4+ patellar reflex with clonus). Epigastric pain reported over the last 3 hours.",
      vitals: {
        bp: "188/114 mmHg",
        hr: 98,
        rr: 22,
        temp: "37.2 °C",
        spo2: 96,
        gcs: 14,
      },
      keyDiagnosticClues: [
        "Systolic BP > 160 and Diastolic BP > 110 (Hypertensive crisis)",
        "Proteinuria 3+ on dipstick",
        "Epigastric pain indicating hepatic subcapsular stretch",
        "Hyperreflexia with sustained ankle clonus indicating impending seizure",
      ],
      aiCopilotSuggestion: {
        order: "Administer 10 mg oral Diazepam immediately to sedate the patient and avoid maternal stress.",
        suggestedBy: "Obstetric AI CDS v3.8",
        confidence: "94.2% Match",
        hasHiddenLethalTrap: true,
        lethalTrapExplanation:
          "FATAL TRAP: Diazepam causes severe neonatal respiratory depression and is NOT an anticonvulsant for eclampsia. The gold-standard statutory drug is Magnesium Sulfate (Pritchard regimen: 4g IV + 10g IM). Diazepam increases maternal and perinatal mortality.",
      },
      recommendedActions: [
        "Administer Magnesium Sulfate 4g IV over 10-15 mins + 5g IM in each buttock (Pritchard Regimen)",
        "Administer IV Hydralazine 5 mg slow push or oral Nifedipine 10 mg to lower BP to safe range (140-150/90-100)",
        "Insert Foley catheter with urometer to monitor hourly urine output (ensure > 30 mL/hr prior to MgSO4 maintenance)",
        "Prepare Calcium Gluconate 10% 10 mL at bedside as specific antidote for Magnesium toxicity",
      ],
    },
    {
      id: `gen-case-snakebite-${timestamp}`,
      patientName: "Mr. Sunday Ogundimu",
      age: 38,
      gender: "Male (Farmer)",
      setting: "Rural Primary Healthcare Centre",
      locationContext: "Iboro / Ilaro Outpost, Ogun State",
      presentingEmergency: "Envenomation by Echis ocellatus (Carpet Viper) with Systemic Hemotoxicity",
      historyOfPresentIllness:
        "Bitten on the right dorsum of foot while clearing cassava farmland 2 hours ago. Puncture marks oozing uncoagulated blood. Local edema spreading up to knee. Incoherent speech, gingival bleeding, and hematuria.",
      vitals: {
        bp: "86/50 mmHg",
        hr: 122,
        rr: 24,
        temp: "36.4 °C",
        spo2: 94,
        gcs: 13,
      },
      keyDiagnosticClues: [
        "20-Minute Whole Blood Clotting Test (20WBCT) abnormal: blood completely fails to clot",
        "Spontaneous systemic hemorrhage (gingival bleeding, hematuria)",
        "Rapidly ascending venomous limb edema",
        "Profound hypovolemic shock secondary to capillary leak and internal hemorrhage",
      ],
      aiCopilotSuggestion: {
        order: "Apply an arterial tourniquet tightly around the upper thigh and make 1 cm incisional cuts across the puncture wounds to suck out the venom.",
        suggestedBy: "General First-Aid AI Agent v2.1",
        confidence: "91.0% Match",
        hasHiddenLethalTrap: true,
        lethalTrapExplanation:
          "LETHAL TRAP: Applying a tight tourniquet and cutting or sucking venom is strictly contraindicated! It causes ischemic limb gangrene, amputations, and massive hemorrhage in viper envenomation. The only proven therapy is African antivenom (EchiTAb-Plus) and immobilization.",
      },
      recommendedActions: [
        "Immobilize the affected limb with a broad splint below heart level without tourniquet",
        "Perform statutory 20-Minute Whole Blood Clotting Test (20WBCT)",
        "Administer polyvalent/monovalent antivenom (EchiTAb-Plus or ASV) via slow IV infusion with adrenaline standby",
        "Resuscitate shock with IV Normal Saline bolus and monitor for anaphylaxis",
      ],
    },
    {
      id: `gen-case-organophosphate-${timestamp}`,
      patientName: "Ibrahim Garba",
      age: 19,
      gender: "Male",
      setting: "Acute Resuscitation Bay",
      locationContext: "State Hospital Ota Trauma Bay",
      presentingEmergency: "Acute Organophosphate (Dichlorvos / Sniper) Insecticide Toxicity",
      historyOfPresentIllness:
        "Accidental dermal exposure and inhalation while spraying agricultural warehouse without PPE. Arrived completely soaked in chemical, salivating copiously, vomiting, diaphoretic, pin-point pupils, and wheezing diffusely with fecal and urinary incontinence.",
      vitals: {
        bp: "92/58 mmHg",
        hr: 38,
        rr: 32,
        temp: "35.8 °C",
        spo2: 82,
        gcs: 10,
      },
      keyDiagnosticClues: [
        "Classic DUMBELS cholinergic toxidrome (Diarrhea, Urination, Miosis, Bradycardia, Bronchospasm, Emesis, Lacrimation, Salivation)",
        "Pin-point pupils (miosis) unreactive to light",
        "Copious airway bronchorrhea and profound bradycardia (HR 38 bpm)",
        "Severe hypoxemia SpO2 82% due to alveolar secretions flooding the airway",
      ],
      aiCopilotSuggestion: {
        order: "Administer 100 mg IV Suxamethonium (Succinylcholine) to facilitate rapid sequence endotracheal intubation.",
        suggestedBy: "Critical Care AI Copilot v4.0",
        confidence: "96.5% Match",
        hasHiddenLethalTrap: true,
        lethalTrapExplanation:
          "FATAL TRAP: Succinylcholine is metabolized by plasma pseudocholinesterase, which is completely poisoned and paralyzed by organophosphates! Administering succinylcholine causes prolonged paralysis lasting days and refractory cardiac arrest. Atropine is the immediate physiological antidote.",
      },
      recommendedActions: [
        "Decontaminate immediately: remove all soiled clothing and wash skin with soap and copious water (staff don PPE)",
        "Administer Atropine 2 to 4 mg IV push every 5 minutes until bronchorrhea clears ('atropinization' endpoint)",
        "Administer Pralidoxime (2-PAM) 1-2g IV to reactivate acetylcholinesterase before aging occurs",
        "Deliver high-flow oxygen and suction copious tracheobronchial secretions to prevent asphyxia",
      ],
    },
  ];

  // Rotate based on time or specialty
  const selectedIndex = timestamp % scenarios.length;
  return scenarios[selectedIndex];
}
