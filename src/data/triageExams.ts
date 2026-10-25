/**
 * START (SIMPLE TRIAGE AND RAPID TREATMENT) DISASTER MASS-CASUALTY SIMULATOR
 * NMCN & International Humanitarian Triage Standards
 * Cadence: 30-60 Seconds per Casualty. Zero tolerance for dangerous undertriaging.
 */

export interface TriageCasualty {
  id: string;
  casualtyNumber: number;
  ageGender: string;
  sceneVignette: string;
  ambulatoryStatus: "Ambulatory (Can Walk)" | "Non-Ambulatory (Unable to Walk)";
  respiratoryRate: string;
  perfusionRadialPulse: string;
  mentalStatus: string;
  correctTag: "RED" | "YELLOW" | "GREEN" | "BLACK";
  tagTitle: "RED (Immediate / P1)" | "YELLOW (Delayed / P2)" | "GREEN (Minor / Walking Wounded / P3)" | "BLACK (Expectant / Deceased / P0)";
  clinicalRationale: string;
}

export const DISASTER_TRIAGE_CASUALTIES: TriageCasualty[] = [
  {
    id: "tri-01",
    casualtyNumber: 1,
    ageGender: "26-year-old male",
    sceneVignette: "Found sitting by the road shoulder holding his left forearm with a minor abrasion. Complains of mild wrist soreness. Walks over when rescuer calls out: 'Anyone who can hear my voice and walk, come to me'.",
    ambulatoryStatus: "Ambulatory (Can Walk)",
    respiratoryRate: "18 breaths/min (Normal)",
    perfusionRadialPulse: "Strong radial pulse, CRT < 2 seconds",
    mentalStatus: "Alert and oriented x 4, obeys commands",
    correctTag: "GREEN",
    tagTitle: "GREEN (Minor / Walking Wounded / P3)",
    clinicalRationale: "Under the START algorithm, any casualty who is able to walk following verbal direction is automatically categorized as GREEN (Minor / Walking Wounded) and directed to a secondary holding zone.",
  },
  {
    id: "tri-02",
    casualtyNumber: 2,
    ageGender: "38-year-old female",
    sceneVignette: "Trapped under collapsed roofing timber. Unable to walk. Respiratory rate is 36 breaths/min. Breathing is rapid and shallow with visible intercostal retractions.",
    ambulatoryStatus: "Non-Ambulatory (Unable to Walk)",
    respiratoryRate: "36 breaths/min (Marked Tachypnea > 30)",
    perfusionRadialPulse: "Weak radial pulse",
    mentalStatus: "Anxious, groans to pain",
    correctTag: "RED",
    tagTitle: "RED (Immediate / P1)",
    clinicalRationale: "A non-ambulatory casualty with a respiratory rate > 30 breaths per minute automatically triggers a RED TAG (Immediate / P1) requiring immediate airway stabilization and emergency evacuation.",
  },
  {
    id: "tri-03",
    casualtyNumber: 3,
    ageGender: "45-year-old male",
    sceneVignette: "Lying motionless in the wreckage. Not breathing upon initial approach. The rescuer repositions the airway with a modified jaw-thrust maneuver. Apnea persists for 10 seconds; no respiratory effort or chest rise is detected.",
    ambulatoryStatus: "Non-Ambulatory (Unable to Walk)",
    respiratoryRate: "0 breaths/min (Apnea persists after airway opening)",
    perfusionRadialPulse: "Absent carotid and radial pulses",
    mentalStatus: "Unresponsive to verbal and painful stimuli",
    correctTag: "BLACK",
    tagTitle: "BLACK (Expectant / Deceased / P0)",
    clinicalRationale: "In a mass-casualty disaster, if an adult casualty does not breathe after a single attempt to open and reposition the airway, they are triaged as BLACK (Deceased / Expectant). CPR is not initiated in disaster triage due to resource rationing.",
  },
  {
    id: "tri-04",
    casualtyNumber: 4,
    ageGender: "19-year-old female",
    sceneVignette: "Found lying on the ground with a closed fracture of the right femur. Cannot walk. Respiratory rate is 22 breaths/min. Radial pulse is absent, and capillary refill time is 4.5 seconds.",
    ambulatoryStatus: "Non-Ambulatory (Unable to Walk)",
    respiratoryRate: "22 breaths/min (< 30 bpm)",
    perfusionRadialPulse: "Absent radial pulse, Capillary Refill Time > 2 seconds",
    mentalStatus: "Alert, follows commands",
    correctTag: "RED",
    tagTitle: "RED (Immediate / P1)",
    clinicalRationale: "Although respiratory rate is normal (< 30), an absent radial pulse or delayed capillary refill time (> 2 seconds) signifies decompensated hemorrhagic shock, categorizing the casualty as RED TAG (Immediate).",
  },
  {
    id: "tri-05",
    casualtyNumber: 5,
    ageGender: "52-year-old male",
    sceneVignette: "Pinned against a concrete pillar with open tib-fib fracture. Unable to walk. Respiratory rate is 20 breaths/min. Radial pulse is palpable and strong with capillary refill time of 1.5 seconds. Follows simple commands promptly ('Squeeze my hand').",
    ambulatoryStatus: "Non-Ambulatory (Unable to Walk)",
    respiratoryRate: "20 breaths/min (< 30)",
    perfusionRadialPulse: "Radial pulse present, CRT < 2s",
    mentalStatus: "Obeys simple commands",
    correctTag: "YELLOW",
    tagTitle: "YELLOW (Delayed / P2)",
    clinicalRationale: "A non-ambulatory casualty with stable respiration (< 30), intact radial perfusion (CRT < 2s), and normal mental status (follows commands) is triaged as YELLOW (Delayed / P2). Their injuries are serious but not immediately life-threatening.",
  },
];
