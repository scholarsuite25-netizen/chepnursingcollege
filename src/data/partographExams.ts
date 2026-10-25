/**
 * INTERACTIVE WHO MODIFIED PARTOGRAPH SIMULATION ENGINE
 * Official NMCN & International Midwifery Council Licensure Standard
 * Clinical Focus: Labor progress monitoring, cervical dilation plotting, Alert Line breach,
 * Action Line intervention, and obstructed labor emergency decision-making.
 */

export interface PartographObservationPoint {
  timeHours: number; // 0, 1, 2, 3, 4, 5, 6
  clockTime: string; // "08:00", "09:00", etc.
  fetalHeartRateBpm: number;
  liquorState: "I" | "C" | "M" | "B"; // Intact, Clear, Meconium, Blood
  molding: "0" | "+" | "++" | "+++";
  cervicalDilationCm: number; // 4 to 10 cm
  fetalHeadDescentFifths: number; // 5/5 down to 0/5
  contractionsPer10Min: number; // 1 to 5
  contractionDurationCategory: "<20s" | "20-40s" | ">40s";
  maternalPulseBpm: number;
  maternalBpSystolic: number;
  maternalBpDiastolic: number;
}

export interface PartographScenario {
  id: string;
  motherName: string;
  gravidaPara: string;
  gestationalAge: string;
  admissionSummary: string;
  baselineDilationAtAdmission: number;
  observations: PartographObservationPoint[];
  criticalEvents: {
    alertLineCrossedAtHour?: number;
    actionLineCrossedAtHour?: number;
    clinicalDiagnosis: string;
    mandatoryEmergencyIntervention: string;
  };
  evaluationQuestions: {
    question: string;
    options: [string, string, string, string];
    correctIndex: number;
    rationale: string;
  }[];
}

export const WHO_PARTOGRAPH_SCENARIO: PartographScenario = {
  id: "partograph-case-01",
  motherName: "Mrs. Zainab Aliyu",
  gravidaPara: "Gravida 2 Para 1",
  gestationalAge: "39 Weeks + 4 Days",
  admissionSummary: "Admitted in active phase of first stage of spontaneous labour at 08:00 with cervical dilatation of 4 cm and intact membranes.",
  baselineDilationAtAdmission: 4,
  observations: [
    {
      timeHours: 0,
      clockTime: "08:00",
      fetalHeartRateBpm: 140,
      liquorState: "I",
      molding: "0",
      cervicalDilationCm: 4,
      fetalHeadDescentFifths: 4,
      contractionsPer10Min: 2,
      contractionDurationCategory: "20-40s",
      maternalPulseBpm: 80,
      maternalBpSystolic: 118,
      maternalBpDiastolic: 76,
    },
    {
      timeHours: 2,
      clockTime: "10:00",
      fetalHeartRateBpm: 136,
      liquorState: "I",
      molding: "0",
      cervicalDilationCm: 5,
      fetalHeadDescentFifths: 3,
      contractionsPer10Min: 3,
      contractionDurationCategory: "20-40s",
      maternalPulseBpm: 82,
      maternalBpSystolic: 120,
      maternalBpDiastolic: 78,
    },
    {
      timeHours: 4,
      clockTime: "12:00",
      fetalHeartRateBpm: 132,
      liquorState: "C",
      molding: "+",
      cervicalDilationCm: 5.5,
      fetalHeadDescentFifths: 3,
      contractionsPer10Min: 3,
      contractionDurationCategory: "20-40s",
      maternalPulseBpm: 86,
      maternalBpSystolic: 122,
      maternalBpDiastolic: 80,
    },
    {
      timeHours: 6,
      clockTime: "14:00",
      fetalHeartRateBpm: 124,
      liquorState: "M",
      molding: "++",
      cervicalDilationCm: 6,
      fetalHeadDescentFifths: 3,
      contractionsPer10Min: 2,
      contractionDurationCategory: "<20s",
      maternalPulseBpm: 96,
      maternalBpSystolic: 126,
      maternalBpDiastolic: 82,
    },
  ],
  criticalEvents: {
    alertLineCrossedAtHour: 4,
    actionLineCrossedAtHour: 6,
    clinicalDiagnosis: "Secondary Arrest of Dilatation / Protracted Active Phase with Cephalopelvic Disproportion (CPD) and Fetal Distress (Thick Meconium & Excessive Molding)",
    mandatoryEmergencyIntervention: "Immediate Obstetrician notification, IV fluid hydration, discontinuation of any uterotonics, and immediate preparation for emergency cesarean section.",
  },
  evaluationQuestions: [
    {
      question: "On the WHO Modified Partograph, what is the slope of the Alert Line in the active phase of labor?",
      options: [
        "1 cm per hour cervical dilatation from 4 cm to 10 cm",
        "0.5 cm per hour cervical dilatation",
        "2 cm per hour cervical dilatation",
        "Horizontal line indicating static progress",
      ],
      correctIndex: 0,
      rationale: "The WHO Alert Line starts at 4 cm of cervical dilatation and slopes upward at a rate of 1 cm per hour until reaching 10 cm (full dilatation at 6 hours). It represents the minimum expected rate of progress for 90% of laboring women.",
    },
    {
      question: "At 12:00 (Hour 4), the mother's cervical dilation is 5.5 cm, crossing to the RIGHT of the Alert Line. What is the mandatory midwifery action?",
      options: [
        "Alert the medical team, evaluate for cephalopelvic disproportion (CPD) or uterine inertia, and prepare for potential transfer or augmentation",
        "Discharge the mother home for resting",
        "Instruct the mother to push forcefully against an undilated cervix",
        "Administer intramuscular Ergometrine immediately",
      ],
      correctIndex: 0,
      rationale: "Crossing the Alert Line warns the midwife that labor progress is abnormally slow. In a health center, transfer to a comprehensive obstetric facility must occur; in a hospital, obstetric review and diagnosis of the cause of delay are mandatory.",
    },
    {
      question: "At 14:00 (Hour 6), labor progress crosses the ACTION LINE with thick meconium liquor ('M') and ++ molding. What is the definitive management?",
      options: [
        "Immediate emergency Cesarean delivery to prevent uterine rupture and fetal asphyxia",
        "Wait an additional 6 hours to assess spontaneous delivery",
        "Encourage oral solid food intake to regain maternal energy",
        "Administer high-dose intravenous oxytocin infusion without medical review",
      ],
      correctIndex: 0,
      rationale: "Reaching the Action Line (4 hours to the right of the Alert Line), combined with signs of disproportion (++ molding, high head descent 3/5) and fetal distress (meconium), confirms obstructed labor. Immediate cesarean section is mandatory.",
    },
  ],
};
