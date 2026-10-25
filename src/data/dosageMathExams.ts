/**
 * HIGH-STAKES ZERO-TOLERANCE DOSAGE & IV FLUID CALCULATION BOARD
 * NMCN & Hospital Medication Administration Credentialing Standard
 * Pass mark: 90% - 100% (Zero tolerance for computational units error)
 */

export interface DosageQuestion {
  id: string;
  category: "Pediatric Dosing" | "IV Drop Rate" | "Burn Resuscitation" | "Infusion Titration" | "Reconstitution";
  clinicalVignette: string;
  prescriptionOrder: string;
  drugSupplied: string;
  promptQuestion: string;
  correctAnswerNumerical: number;
  unit: string;
  acceptableTolerance: number; // e.g., 0.1
  options: [string, string, string, string];
  correctIndex: number;
  formulaAndStepByStepCalculation: string[];
}

export const DOSAGE_MATH_QUESTIONS: DosageQuestion[] = [
  {
    id: "dose-01",
    category: "IV Drop Rate",
    promptQuestion: "Calculate the required intravenous infusion drip rate in drops per minute (gtt/min):",
    clinicalVignette: "A post-operative adult patient is prescribed 1,000 mL of Normal Saline 0.9% to be infused over 8 hours.",
    prescriptionOrder: "1,000 mL Normal Saline 0.9% IV over 8 hours",
    drugSupplied: "Standard IV administration macrodrip tubing with a drop factor of 20 drops/mL (20 gtt/mL)",
    correctAnswerNumerical: 42,
    unit: "gtt/min",
    acceptableTolerance: 0,
    options: [
      "42 drops/min (gtt/min)",
      "35 drops/min (gtt/min)",
      "52 drops/min (gtt/min)",
      "21 drops/min (gtt/min)",
    ],
    correctIndex: 0,
    formulaAndStepByStepCalculation: [
      "Formula: Drop Rate (gtt/min) = (Total Volume in mL x Drop Factor) / Time in Minutes",
      "Total Volume = 1,000 mL",
      "Time in minutes = 8 hours x 60 minutes = 480 minutes",
      "Calculation: (1,000 x 20) / 480 = 20,000 / 480 = 41.666...",
      "Rounding Rule: Drops must be whole integers -> 42 gtt/min.",
    ],
  },
  {
    id: "dose-02",
    category: "Pediatric Dosing",
    promptQuestion: "Calculate the exact volume in milliliters (mL) to administer per single dose:",
    clinicalVignette: "A 4-year-old child weighing 18 kg is diagnosed with acute otitis media. The pediatrician orders Amoxicillin oral suspension at 40 mg/kg/day divided into 3 equal doses every 8 hours.",
    prescriptionOrder: "Amoxicillin 40 mg/kg/day PO divided Q8H",
    drugSupplied: "Amoxicillin oral suspension reconstituted at 250 mg / 5 mL",
    correctAnswerNumerical: 4.8,
    unit: "mL",
    acceptableTolerance: 0.1,
    options: [
      "4.8 mL per dose",
      "7.2 mL per dose",
      "14.4 mL per dose",
      "2.4 mL per dose",
    ],
    correctIndex: 0,
    formulaAndStepByStepCalculation: [
      "Step 1: Total daily dose = 18 kg x 40 mg/kg/day = 720 mg/day",
      "Step 2: Single dose (Q8H = 3 doses per day) = 720 mg / 3 = 240 mg per dose",
      "Step 3: Concentration formula = (Desired / On Hand) x Vehicle Volume",
      "Calculation: (240 mg / 250 mg) x 5 mL = 0.96 x 5 mL = 4.8 mL per dose.",
    ],
  },
  {
    id: "dose-03",
    category: "Burn Resuscitation",
    promptQuestion: "Using the Parkland formula, calculate the volume of Ringer's Lactate to infuse during the FIRST 8 hours:",
    clinicalVignette: "A 70 kg firefighter sustains 36% Total Body Surface Area (TBSA) thermal burns. Fluid resuscitation is initiated according to the Parkland formula.",
    prescriptionOrder: "Parkland resuscitation: 4 mL x Weight (kg) x % TBSA burn",
    drugSupplied: "Intravenous Ringer's Lactate solution (500 mL and 1,000 mL bags)",
    correctAnswerNumerical: 5040,
    unit: "mL",
    acceptableTolerance: 0,
    options: [
      "5,040 mL in the first 8 hours (630 mL/hr)",
      "10,080 mL in the first 8 hours",
      "2,520 mL in the first 8 hours",
      "3,600 mL in the first 8 hours",
    ],
    correctIndex: 0,
    formulaAndStepByStepCalculation: [
      "Formula: Total 24-hour Fluid = 4 mL x Body Weight (kg) x % TBSA",
      "Total 24-hr Volume = 4 mL x 70 kg x 36 = 10,080 mL",
      "Timing Rule: Half of the total volume is given in the first 8 hours from time of burn injury.",
      "First 8 Hours Volume = 10,080 mL / 2 = 5,040 mL (Infusion rate: 5,040 mL / 8 hrs = 630 mL/hr).",
    ],
  },
  {
    id: "dose-04",
    category: "Infusion Titration",
    promptQuestion: "Calculate the required electronic infusion pump rate in milliliters per hour (mL/hr):",
    clinicalVignette: "A patient with deep vein thrombosis (DVT) is prescribed a continuous intravenous Heparin infusion at 1,200 Units/hour.",
    prescriptionOrder: "Heparin Sodium continuous infusion at 1,200 Units/hour IV",
    drugSupplied: "Premixed IV bag containing Heparin 25,000 Units in 500 mL of 5% Dextrose in Water (D5W)",
    correctAnswerNumerical: 24,
    unit: "mL/hr",
    acceptableTolerance: 0,
    options: [
      "24 mL/hr",
      "12 mL/hr",
      "48 mL/hr",
      "30 mL/hr",
    ],
    correctIndex: 0,
    formulaAndStepByStepCalculation: [
      "Step 1: Calculate concentration on hand = 25,000 Units / 500 mL = 50 Units/mL",
      "Step 2: Desired dose rate = 1,200 Units/hour",
      "Step 3: Flow rate (mL/hr) = Desired Dose (Units/hr) / Concentration (Units/mL)",
      "Calculation: 1,200 Units/hr / 50 Units/mL = 24 mL/hr.",
    ],
  },
  {
    id: "dose-05",
    category: "Pediatric Dosing",
    promptQuestion: "Calculate the exact volume in milliliters (mL) to administer via tuberculin syringe:",
    clinicalVignette: "An infant weighing 6 kg diagnosed with congestive heart failure is prescribed Digoxin elixir 0.035 mg once daily.",
    prescriptionOrder: "Digoxin 0.035 mg PO once daily (35 micrograms)",
    drugSupplied: "Digoxin pediatric oral solution containing 50 mcg/mL (0.05 mg/mL) with calibrated dropper",
    correctAnswerNumerical: 0.7,
    unit: "mL",
    acceptableTolerance: 0.05,
    options: [
      "0.7 mL",
      "1.4 mL",
      "0.35 mL",
      "0.07 mL",
    ],
    correctIndex: 0,
    formulaAndStepByStepCalculation: [
      "Unit Conversion: 0.035 mg = 35 micrograms (mcg)",
      "On Hand: 50 mcg per 1 mL",
      "Calculation: (Desired / On Hand) x Volume = (35 mcg / 50 mcg) x 1 mL = 0.7 mL",
      "Safety Rule: Must be verified with a second Registered Nurse prior to administration.",
    ],
  },
];
