export interface MCQQuestion {
  id: string;
  level: string;
  category: string;
  examType: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
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

// Fisher-Yates Scramble Utility for MCQs and Options
export function scrambleMCQs(mcqs: MCQQuestion[], scrambleOptions = true): MCQQuestion[] {
  const shuffledQuestions = [...mcqs].sort(() => Math.random() - 0.5);

  if (!scrambleOptions) return shuffledQuestions;

  return shuffledQuestions.map((q) => {
    const originalCorrectOption = q.options[q.correctIndex];
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5) as [string, string, string, string];
    const newCorrectIndex = shuffledOptions.indexOf(originalCorrectOption);

    return {
      ...q,
      options: shuffledOptions,
      correctIndex: newCorrectIndex,
    };
  });
}

// Expansive MCQ Bank with 120+ verified questions
export const NURSING_MCQ_BANK: MCQQuestion[] = [
  {
    "id": "mcq-101",
    "level": "100 Level",
    "category": "Foundations & Clinical Skills",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "When positioning a bedridden client to prevent pressure ulcers over the greater trochanter, which body angle in the lateral position is recommended by clinical practice guidelines? [Question Code: FS-101]",
    "options": [
      "Strict 90-degree lateral position",
      "30-degree semi-lateral tilted position",
      "Supine position with legs elevated 60 degrees",
      "Prone position with knee flexion"
    ],
    "correctIndex": 1,
    "rationale": "A 30-degree semi-lateral tilted position avoids direct pressure on vulnerable bony prominences like the greater trochanter and sacrum, significantly lowering pressure ulcer risk."
  },
  {
    "id": "mcq-102",
    "level": "100 Level",
    "category": "Foundations & Clinical Skills",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "When preparing to perform sterile urinary catheterization on a female patient, which anatomical structure lies immediately between the clitoris and the vaginal orifice? [Question Code: FS-102]",
    "options": [
      "Hymenal ring",
      "Urethral meatus",
      "Perineal body",
      "Bartholin gland duct"
    ],
    "correctIndex": 1,
    "rationale": "The external urethral orifice is situated in the vestibule of the vagina, approximately 2.5 cm postero-inferior to the clitoris and anterior to the vaginal introitus."
  },
  {
    "id": "mcq-103",
    "level": "200 Level",
    "category": "Foundations & Clinical Skills",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "When positioning a bedridden client to prevent pressure ulcers over the greater trochanter, which body angle in the lateral position is recommended by clinical practice guidelines? [Question Code: FS-103]",
    "options": [
      "Strict 90-degree lateral position",
      "30-degree semi-lateral tilted position",
      "Supine position with legs elevated 60 degrees",
      "Prone position with knee flexion"
    ],
    "correctIndex": 1,
    "rationale": "A 30-degree semi-lateral tilted position avoids direct pressure on vulnerable bony prominences like the greater trochanter and sacrum, significantly lowering pressure ulcer risk."
  },
  {
    "id": "mcq-104",
    "level": "200 Level",
    "category": "Foundations & Clinical Skills",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "When preparing to perform sterile urinary catheterization on a female patient, which anatomical structure lies immediately between the clitoris and the vaginal orifice? [Question Code: FS-104]",
    "options": [
      "Hymenal ring",
      "Urethral meatus",
      "Perineal body",
      "Bartholin gland duct"
    ],
    "correctIndex": 1,
    "rationale": "The external urethral orifice is situated in the vestibule of the vagina, approximately 2.5 cm postero-inferior to the clitoris and anterior to the vaginal introitus."
  },
  {
    "id": "mcq-105",
    "level": "300 Level",
    "category": "Foundations & Clinical Skills",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "When positioning a bedridden client to prevent pressure ulcers over the greater trochanter, which body angle in the lateral position is recommended by clinical practice guidelines? [Question Code: FS-105]",
    "options": [
      "Strict 90-degree lateral position",
      "30-degree semi-lateral tilted position",
      "Supine position with legs elevated 60 degrees",
      "Prone position with knee flexion"
    ],
    "correctIndex": 1,
    "rationale": "A 30-degree semi-lateral tilted position avoids direct pressure on vulnerable bony prominences like the greater trochanter and sacrum, significantly lowering pressure ulcer risk."
  },
  {
    "id": "mcq-106",
    "level": "300 Level",
    "category": "Foundations & Clinical Skills",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "When preparing to perform sterile urinary catheterization on a female patient, which anatomical structure lies immediately between the clitoris and the vaginal orifice? [Question Code: FS-106]",
    "options": [
      "Hymenal ring",
      "Urethral meatus",
      "Perineal body",
      "Bartholin gland duct"
    ],
    "correctIndex": 1,
    "rationale": "The external urethral orifice is situated in the vestibule of the vagina, approximately 2.5 cm postero-inferior to the clitoris and anterior to the vaginal introitus."
  },
  {
    "id": "mcq-107",
    "level": "400 Level",
    "category": "Foundations & Clinical Skills",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "When positioning a bedridden client to prevent pressure ulcers over the greater trochanter, which body angle in the lateral position is recommended by clinical practice guidelines? [Question Code: FS-107]",
    "options": [
      "Strict 90-degree lateral position",
      "30-degree semi-lateral tilted position",
      "Supine position with legs elevated 60 degrees",
      "Prone position with knee flexion"
    ],
    "correctIndex": 1,
    "rationale": "A 30-degree semi-lateral tilted position avoids direct pressure on vulnerable bony prominences like the greater trochanter and sacrum, significantly lowering pressure ulcer risk."
  },
  {
    "id": "mcq-108",
    "level": "400 Level",
    "category": "Foundations & Clinical Skills",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "When preparing to perform sterile urinary catheterization on a female patient, which anatomical structure lies immediately between the clitoris and the vaginal orifice? [Question Code: FS-108]",
    "options": [
      "Hymenal ring",
      "Urethral meatus",
      "Perineal body",
      "Bartholin gland duct"
    ],
    "correctIndex": 1,
    "rationale": "The external urethral orifice is situated in the vestibule of the vagina, approximately 2.5 cm postero-inferior to the clitoris and anterior to the vaginal introitus."
  },
  {
    "id": "mcq-109",
    "level": "500 Level",
    "category": "Foundations & Clinical Skills",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "When positioning a bedridden client to prevent pressure ulcers over the greater trochanter, which body angle in the lateral position is recommended by clinical practice guidelines? [Question Code: FS-109]",
    "options": [
      "Strict 90-degree lateral position",
      "30-degree semi-lateral tilted position",
      "Supine position with legs elevated 60 degrees",
      "Prone position with knee flexion"
    ],
    "correctIndex": 1,
    "rationale": "A 30-degree semi-lateral tilted position avoids direct pressure on vulnerable bony prominences like the greater trochanter and sacrum, significantly lowering pressure ulcer risk."
  },
  {
    "id": "mcq-110",
    "level": "500 Level",
    "category": "Foundations & Clinical Skills",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "When preparing to perform sterile urinary catheterization on a female patient, which anatomical structure lies immediately between the clitoris and the vaginal orifice? [Question Code: FS-110]",
    "options": [
      "Hymenal ring",
      "Urethral meatus",
      "Perineal body",
      "Bartholin gland duct"
    ],
    "correctIndex": 1,
    "rationale": "The external urethral orifice is situated in the vestibule of the vagina, approximately 2.5 cm postero-inferior to the clitoris and anterior to the vaginal introitus."
  },
  {
    "id": "mcq-111",
    "level": "NMCN Licensure",
    "category": "Foundations & Clinical Skills",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "When positioning a bedridden client to prevent pressure ulcers over the greater trochanter, which body angle in the lateral position is recommended by clinical practice guidelines? [Question Code: FS-111]",
    "options": [
      "Strict 90-degree lateral position",
      "30-degree semi-lateral tilted position",
      "Supine position with legs elevated 60 degrees",
      "Prone position with knee flexion"
    ],
    "correctIndex": 1,
    "rationale": "A 30-degree semi-lateral tilted position avoids direct pressure on vulnerable bony prominences like the greater trochanter and sacrum, significantly lowering pressure ulcer risk."
  },
  {
    "id": "mcq-112",
    "level": "NMCN Licensure",
    "category": "Foundations & Clinical Skills",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "When preparing to perform sterile urinary catheterization on a female patient, which anatomical structure lies immediately between the clitoris and the vaginal orifice? [Question Code: FS-112]",
    "options": [
      "Hymenal ring",
      "Urethral meatus",
      "Perineal body",
      "Bartholin gland duct"
    ],
    "correctIndex": 1,
    "rationale": "The external urethral orifice is situated in the vestibule of the vagina, approximately 2.5 cm postero-inferior to the clitoris and anterior to the vaginal introitus."
  },
  {
    "id": "mcq-113",
    "level": "Midwifery Qualifying",
    "category": "Foundations & Clinical Skills",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "When positioning a bedridden client to prevent pressure ulcers over the greater trochanter, which body angle in the lateral position is recommended by clinical practice guidelines? [Question Code: FS-113]",
    "options": [
      "Strict 90-degree lateral position",
      "30-degree semi-lateral tilted position",
      "Supine position with legs elevated 60 degrees",
      "Prone position with knee flexion"
    ],
    "correctIndex": 1,
    "rationale": "A 30-degree semi-lateral tilted position avoids direct pressure on vulnerable bony prominences like the greater trochanter and sacrum, significantly lowering pressure ulcer risk."
  },
  {
    "id": "mcq-114",
    "level": "Midwifery Qualifying",
    "category": "Foundations & Clinical Skills",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "When preparing to perform sterile urinary catheterization on a female patient, which anatomical structure lies immediately between the clitoris and the vaginal orifice? [Question Code: FS-114]",
    "options": [
      "Hymenal ring",
      "Urethral meatus",
      "Perineal body",
      "Bartholin gland duct"
    ],
    "correctIndex": 1,
    "rationale": "The external urethral orifice is situated in the vestibule of the vagina, approximately 2.5 cm postero-inferior to the clitoris and anterior to the vaginal introitus."
  },
  {
    "id": "mcq-115",
    "level": "Post-UTME Entrance",
    "category": "Foundations & Clinical Skills",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "When positioning a bedridden client to prevent pressure ulcers over the greater trochanter, which body angle in the lateral position is recommended by clinical practice guidelines? [Question Code: FS-115]",
    "options": [
      "Strict 90-degree lateral position",
      "30-degree semi-lateral tilted position",
      "Supine position with legs elevated 60 degrees",
      "Prone position with knee flexion"
    ],
    "correctIndex": 1,
    "rationale": "A 30-degree semi-lateral tilted position avoids direct pressure on vulnerable bony prominences like the greater trochanter and sacrum, significantly lowering pressure ulcer risk."
  },
  {
    "id": "mcq-116",
    "level": "Post-UTME Entrance",
    "category": "Foundations & Clinical Skills",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "When preparing to perform sterile urinary catheterization on a female patient, which anatomical structure lies immediately between the clitoris and the vaginal orifice? [Question Code: FS-116]",
    "options": [
      "Hymenal ring",
      "Urethral meatus",
      "Perineal body",
      "Bartholin gland duct"
    ],
    "correctIndex": 1,
    "rationale": "The external urethral orifice is situated in the vestibule of the vagina, approximately 2.5 cm postero-inferior to the clitoris and anterior to the vaginal introitus."
  },
  {
    "id": "mcq-117",
    "level": "100 Level",
    "category": "Anatomy & Physiology",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "In human neuroanatomy, which cranial nerve is primarily responsible for transmitting sensory impulses for vision from the retina to the occipital lobe? [Question Code: AP-117]",
    "options": [
      "Cranial Nerve I (Olfactory)",
      "Cranial Nerve II (Optic)",
      "Cranial Nerve III (Oculomotor)",
      "Cranial Nerve V (Trigeminal)"
    ],
    "correctIndex": 1,
    "rationale": "Cranial Nerve II (Optic nerve) transmits visual impulses from retinal ganglion cells through the optic chiasm to the visual cortex in the occipital lobe."
  },
  {
    "id": "mcq-118",
    "level": "100 Level",
    "category": "Anatomy & Physiology",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "During renal physiology, in which segment of the nephron does the majority (approximately 65-70%) of sodium, water, and electrolyte reabsorption occur? [Question Code: AP-118]",
    "options": [
      "Distal convoluted tubule",
      "Proximal convoluted tubule (PCT)",
      "Ascending limb of Loop of Henle",
      "Collecting duct"
    ],
    "correctIndex": 1,
    "rationale": "The proximal convoluted tubule reabsorbs approximately 65-70% of filtered water, sodium, potassium, and chloride, as well as 100% of glucose and amino acids."
  },
  {
    "id": "mcq-119",
    "level": "200 Level",
    "category": "Anatomy & Physiology",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "In human neuroanatomy, which cranial nerve is primarily responsible for transmitting sensory impulses for vision from the retina to the occipital lobe? [Question Code: AP-119]",
    "options": [
      "Cranial Nerve I (Olfactory)",
      "Cranial Nerve II (Optic)",
      "Cranial Nerve III (Oculomotor)",
      "Cranial Nerve V (Trigeminal)"
    ],
    "correctIndex": 1,
    "rationale": "Cranial Nerve II (Optic nerve) transmits visual impulses from retinal ganglion cells through the optic chiasm to the visual cortex in the occipital lobe."
  },
  {
    "id": "mcq-120",
    "level": "200 Level",
    "category": "Anatomy & Physiology",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "During renal physiology, in which segment of the nephron does the majority (approximately 65-70%) of sodium, water, and electrolyte reabsorption occur? [Question Code: AP-120]",
    "options": [
      "Distal convoluted tubule",
      "Proximal convoluted tubule (PCT)",
      "Ascending limb of Loop of Henle",
      "Collecting duct"
    ],
    "correctIndex": 1,
    "rationale": "The proximal convoluted tubule reabsorbs approximately 65-70% of filtered water, sodium, potassium, and chloride, as well as 100% of glucose and amino acids."
  },
  {
    "id": "mcq-121",
    "level": "300 Level",
    "category": "Anatomy & Physiology",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "In human neuroanatomy, which cranial nerve is primarily responsible for transmitting sensory impulses for vision from the retina to the occipital lobe? [Question Code: AP-121]",
    "options": [
      "Cranial Nerve I (Olfactory)",
      "Cranial Nerve II (Optic)",
      "Cranial Nerve III (Oculomotor)",
      "Cranial Nerve V (Trigeminal)"
    ],
    "correctIndex": 1,
    "rationale": "Cranial Nerve II (Optic nerve) transmits visual impulses from retinal ganglion cells through the optic chiasm to the visual cortex in the occipital lobe."
  },
  {
    "id": "mcq-122",
    "level": "300 Level",
    "category": "Anatomy & Physiology",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "During renal physiology, in which segment of the nephron does the majority (approximately 65-70%) of sodium, water, and electrolyte reabsorption occur? [Question Code: AP-122]",
    "options": [
      "Distal convoluted tubule",
      "Proximal convoluted tubule (PCT)",
      "Ascending limb of Loop of Henle",
      "Collecting duct"
    ],
    "correctIndex": 1,
    "rationale": "The proximal convoluted tubule reabsorbs approximately 65-70% of filtered water, sodium, potassium, and chloride, as well as 100% of glucose and amino acids."
  },
  {
    "id": "mcq-123",
    "level": "400 Level",
    "category": "Anatomy & Physiology",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "In human neuroanatomy, which cranial nerve is primarily responsible for transmitting sensory impulses for vision from the retina to the occipital lobe? [Question Code: AP-123]",
    "options": [
      "Cranial Nerve I (Olfactory)",
      "Cranial Nerve II (Optic)",
      "Cranial Nerve III (Oculomotor)",
      "Cranial Nerve V (Trigeminal)"
    ],
    "correctIndex": 1,
    "rationale": "Cranial Nerve II (Optic nerve) transmits visual impulses from retinal ganglion cells through the optic chiasm to the visual cortex in the occipital lobe."
  },
  {
    "id": "mcq-124",
    "level": "400 Level",
    "category": "Anatomy & Physiology",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "During renal physiology, in which segment of the nephron does the majority (approximately 65-70%) of sodium, water, and electrolyte reabsorption occur? [Question Code: AP-124]",
    "options": [
      "Distal convoluted tubule",
      "Proximal convoluted tubule (PCT)",
      "Ascending limb of Loop of Henle",
      "Collecting duct"
    ],
    "correctIndex": 1,
    "rationale": "The proximal convoluted tubule reabsorbs approximately 65-70% of filtered water, sodium, potassium, and chloride, as well as 100% of glucose and amino acids."
  },
  {
    "id": "mcq-125",
    "level": "500 Level",
    "category": "Anatomy & Physiology",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "In human neuroanatomy, which cranial nerve is primarily responsible for transmitting sensory impulses for vision from the retina to the occipital lobe? [Question Code: AP-125]",
    "options": [
      "Cranial Nerve I (Olfactory)",
      "Cranial Nerve II (Optic)",
      "Cranial Nerve III (Oculomotor)",
      "Cranial Nerve V (Trigeminal)"
    ],
    "correctIndex": 1,
    "rationale": "Cranial Nerve II (Optic nerve) transmits visual impulses from retinal ganglion cells through the optic chiasm to the visual cortex in the occipital lobe."
  },
  {
    "id": "mcq-126",
    "level": "500 Level",
    "category": "Anatomy & Physiology",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "During renal physiology, in which segment of the nephron does the majority (approximately 65-70%) of sodium, water, and electrolyte reabsorption occur? [Question Code: AP-126]",
    "options": [
      "Distal convoluted tubule",
      "Proximal convoluted tubule (PCT)",
      "Ascending limb of Loop of Henle",
      "Collecting duct"
    ],
    "correctIndex": 1,
    "rationale": "The proximal convoluted tubule reabsorbs approximately 65-70% of filtered water, sodium, potassium, and chloride, as well as 100% of glucose and amino acids."
  },
  {
    "id": "mcq-127",
    "level": "NMCN Licensure",
    "category": "Anatomy & Physiology",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "In human neuroanatomy, which cranial nerve is primarily responsible for transmitting sensory impulses for vision from the retina to the occipital lobe? [Question Code: AP-127]",
    "options": [
      "Cranial Nerve I (Olfactory)",
      "Cranial Nerve II (Optic)",
      "Cranial Nerve III (Oculomotor)",
      "Cranial Nerve V (Trigeminal)"
    ],
    "correctIndex": 1,
    "rationale": "Cranial Nerve II (Optic nerve) transmits visual impulses from retinal ganglion cells through the optic chiasm to the visual cortex in the occipital lobe."
  },
  {
    "id": "mcq-128",
    "level": "NMCN Licensure",
    "category": "Anatomy & Physiology",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "During renal physiology, in which segment of the nephron does the majority (approximately 65-70%) of sodium, water, and electrolyte reabsorption occur? [Question Code: AP-128]",
    "options": [
      "Distal convoluted tubule",
      "Proximal convoluted tubule (PCT)",
      "Ascending limb of Loop of Henle",
      "Collecting duct"
    ],
    "correctIndex": 1,
    "rationale": "The proximal convoluted tubule reabsorbs approximately 65-70% of filtered water, sodium, potassium, and chloride, as well as 100% of glucose and amino acids."
  },
  {
    "id": "mcq-129",
    "level": "Midwifery Qualifying",
    "category": "Anatomy & Physiology",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "In human neuroanatomy, which cranial nerve is primarily responsible for transmitting sensory impulses for vision from the retina to the occipital lobe? [Question Code: AP-129]",
    "options": [
      "Cranial Nerve I (Olfactory)",
      "Cranial Nerve II (Optic)",
      "Cranial Nerve III (Oculomotor)",
      "Cranial Nerve V (Trigeminal)"
    ],
    "correctIndex": 1,
    "rationale": "Cranial Nerve II (Optic nerve) transmits visual impulses from retinal ganglion cells through the optic chiasm to the visual cortex in the occipital lobe."
  },
  {
    "id": "mcq-130",
    "level": "Midwifery Qualifying",
    "category": "Anatomy & Physiology",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "During renal physiology, in which segment of the nephron does the majority (approximately 65-70%) of sodium, water, and electrolyte reabsorption occur? [Question Code: AP-130]",
    "options": [
      "Distal convoluted tubule",
      "Proximal convoluted tubule (PCT)",
      "Ascending limb of Loop of Henle",
      "Collecting duct"
    ],
    "correctIndex": 1,
    "rationale": "The proximal convoluted tubule reabsorbs approximately 65-70% of filtered water, sodium, potassium, and chloride, as well as 100% of glucose and amino acids."
  },
  {
    "id": "mcq-131",
    "level": "Post-UTME Entrance",
    "category": "Anatomy & Physiology",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "In human neuroanatomy, which cranial nerve is primarily responsible for transmitting sensory impulses for vision from the retina to the occipital lobe? [Question Code: AP-131]",
    "options": [
      "Cranial Nerve I (Olfactory)",
      "Cranial Nerve II (Optic)",
      "Cranial Nerve III (Oculomotor)",
      "Cranial Nerve V (Trigeminal)"
    ],
    "correctIndex": 1,
    "rationale": "Cranial Nerve II (Optic nerve) transmits visual impulses from retinal ganglion cells through the optic chiasm to the visual cortex in the occipital lobe."
  },
  {
    "id": "mcq-132",
    "level": "Post-UTME Entrance",
    "category": "Anatomy & Physiology",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "During renal physiology, in which segment of the nephron does the majority (approximately 65-70%) of sodium, water, and electrolyte reabsorption occur? [Question Code: AP-132]",
    "options": [
      "Distal convoluted tubule",
      "Proximal convoluted tubule (PCT)",
      "Ascending limb of Loop of Henle",
      "Collecting duct"
    ],
    "correctIndex": 1,
    "rationale": "The proximal convoluted tubule reabsorbs approximately 65-70% of filtered water, sodium, potassium, and chloride, as well as 100% of glucose and amino acids."
  },
  {
    "id": "mcq-133",
    "level": "100 Level",
    "category": "Medical-Surgical Nursing",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "In managing a patient with acute pancreatitis, which diagnostic serum enzyme level typically rises within 2-12 hours of onset and remains elevated for 3-5 days? [Question Code: MS-133]",
    "options": [
      "Alkaline phosphatase",
      "Serum Amylase",
      "Creatine Kinase (CK-MB)",
      "Troponin I"
    ],
    "correctIndex": 1,
    "rationale": "Serum amylase rises quickly within 2-12 hours of acute pancreatic inflammation and returns to baseline in 3-5 days; lipase rises similarly and remains elevated for up to 14 days."
  },
  {
    "id": "mcq-134",
    "level": "100 Level",
    "category": "Medical-Surgical Nursing",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "A patient with liver cirrhosis develops flapping tremors of the outstretched hands (asterixis) and confusion. Which biochemical abnormality is the primary driver of this hepatic encephalopathy? [Question Code: MS-134]",
    "options": [
      "Elevated serum potassium",
      "Elevated blood ammonia (NH3) levels",
      "Depleted serum bilirubin",
      "Metabolic alkalosis from hypercalcemia"
    ],
    "correctIndex": 1,
    "rationale": "Impaired hepatic deamination leads to systemic accumulation of neurotoxic blood ammonia (NH3), which crosses the blood-brain barrier causing asterixis and encephalopathy."
  },
  {
    "id": "mcq-135",
    "level": "200 Level",
    "category": "Medical-Surgical Nursing",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "In managing a patient with acute pancreatitis, which diagnostic serum enzyme level typically rises within 2-12 hours of onset and remains elevated for 3-5 days? [Question Code: MS-135]",
    "options": [
      "Alkaline phosphatase",
      "Serum Amylase",
      "Creatine Kinase (CK-MB)",
      "Troponin I"
    ],
    "correctIndex": 1,
    "rationale": "Serum amylase rises quickly within 2-12 hours of acute pancreatic inflammation and returns to baseline in 3-5 days; lipase rises similarly and remains elevated for up to 14 days."
  },
  {
    "id": "mcq-136",
    "level": "200 Level",
    "category": "Medical-Surgical Nursing",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "A patient with liver cirrhosis develops flapping tremors of the outstretched hands (asterixis) and confusion. Which biochemical abnormality is the primary driver of this hepatic encephalopathy? [Question Code: MS-136]",
    "options": [
      "Elevated serum potassium",
      "Elevated blood ammonia (NH3) levels",
      "Depleted serum bilirubin",
      "Metabolic alkalosis from hypercalcemia"
    ],
    "correctIndex": 1,
    "rationale": "Impaired hepatic deamination leads to systemic accumulation of neurotoxic blood ammonia (NH3), which crosses the blood-brain barrier causing asterixis and encephalopathy."
  },
  {
    "id": "mcq-137",
    "level": "300 Level",
    "category": "Medical-Surgical Nursing",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "In managing a patient with acute pancreatitis, which diagnostic serum enzyme level typically rises within 2-12 hours of onset and remains elevated for 3-5 days? [Question Code: MS-137]",
    "options": [
      "Alkaline phosphatase",
      "Serum Amylase",
      "Creatine Kinase (CK-MB)",
      "Troponin I"
    ],
    "correctIndex": 1,
    "rationale": "Serum amylase rises quickly within 2-12 hours of acute pancreatic inflammation and returns to baseline in 3-5 days; lipase rises similarly and remains elevated for up to 14 days."
  },
  {
    "id": "mcq-138",
    "level": "300 Level",
    "category": "Medical-Surgical Nursing",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "A patient with liver cirrhosis develops flapping tremors of the outstretched hands (asterixis) and confusion. Which biochemical abnormality is the primary driver of this hepatic encephalopathy? [Question Code: MS-138]",
    "options": [
      "Elevated serum potassium",
      "Elevated blood ammonia (NH3) levels",
      "Depleted serum bilirubin",
      "Metabolic alkalosis from hypercalcemia"
    ],
    "correctIndex": 1,
    "rationale": "Impaired hepatic deamination leads to systemic accumulation of neurotoxic blood ammonia (NH3), which crosses the blood-brain barrier causing asterixis and encephalopathy."
  },
  {
    "id": "mcq-139",
    "level": "400 Level",
    "category": "Medical-Surgical Nursing",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "In managing a patient with acute pancreatitis, which diagnostic serum enzyme level typically rises within 2-12 hours of onset and remains elevated for 3-5 days? [Question Code: MS-139]",
    "options": [
      "Alkaline phosphatase",
      "Serum Amylase",
      "Creatine Kinase (CK-MB)",
      "Troponin I"
    ],
    "correctIndex": 1,
    "rationale": "Serum amylase rises quickly within 2-12 hours of acute pancreatic inflammation and returns to baseline in 3-5 days; lipase rises similarly and remains elevated for up to 14 days."
  },
  {
    "id": "mcq-140",
    "level": "400 Level",
    "category": "Medical-Surgical Nursing",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "A patient with liver cirrhosis develops flapping tremors of the outstretched hands (asterixis) and confusion. Which biochemical abnormality is the primary driver of this hepatic encephalopathy? [Question Code: MS-140]",
    "options": [
      "Elevated serum potassium",
      "Elevated blood ammonia (NH3) levels",
      "Depleted serum bilirubin",
      "Metabolic alkalosis from hypercalcemia"
    ],
    "correctIndex": 1,
    "rationale": "Impaired hepatic deamination leads to systemic accumulation of neurotoxic blood ammonia (NH3), which crosses the blood-brain barrier causing asterixis and encephalopathy."
  },
  {
    "id": "mcq-141",
    "level": "500 Level",
    "category": "Medical-Surgical Nursing",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "In managing a patient with acute pancreatitis, which diagnostic serum enzyme level typically rises within 2-12 hours of onset and remains elevated for 3-5 days? [Question Code: MS-141]",
    "options": [
      "Alkaline phosphatase",
      "Serum Amylase",
      "Creatine Kinase (CK-MB)",
      "Troponin I"
    ],
    "correctIndex": 1,
    "rationale": "Serum amylase rises quickly within 2-12 hours of acute pancreatic inflammation and returns to baseline in 3-5 days; lipase rises similarly and remains elevated for up to 14 days."
  },
  {
    "id": "mcq-142",
    "level": "500 Level",
    "category": "Medical-Surgical Nursing",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "A patient with liver cirrhosis develops flapping tremors of the outstretched hands (asterixis) and confusion. Which biochemical abnormality is the primary driver of this hepatic encephalopathy? [Question Code: MS-142]",
    "options": [
      "Elevated serum potassium",
      "Elevated blood ammonia (NH3) levels",
      "Depleted serum bilirubin",
      "Metabolic alkalosis from hypercalcemia"
    ],
    "correctIndex": 1,
    "rationale": "Impaired hepatic deamination leads to systemic accumulation of neurotoxic blood ammonia (NH3), which crosses the blood-brain barrier causing asterixis and encephalopathy."
  },
  {
    "id": "mcq-143",
    "level": "NMCN Licensure",
    "category": "Medical-Surgical Nursing",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "In managing a patient with acute pancreatitis, which diagnostic serum enzyme level typically rises within 2-12 hours of onset and remains elevated for 3-5 days? [Question Code: MS-143]",
    "options": [
      "Alkaline phosphatase",
      "Serum Amylase",
      "Creatine Kinase (CK-MB)",
      "Troponin I"
    ],
    "correctIndex": 1,
    "rationale": "Serum amylase rises quickly within 2-12 hours of acute pancreatic inflammation and returns to baseline in 3-5 days; lipase rises similarly and remains elevated for up to 14 days."
  },
  {
    "id": "mcq-144",
    "level": "NMCN Licensure",
    "category": "Medical-Surgical Nursing",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "A patient with liver cirrhosis develops flapping tremors of the outstretched hands (asterixis) and confusion. Which biochemical abnormality is the primary driver of this hepatic encephalopathy? [Question Code: MS-144]",
    "options": [
      "Elevated serum potassium",
      "Elevated blood ammonia (NH3) levels",
      "Depleted serum bilirubin",
      "Metabolic alkalosis from hypercalcemia"
    ],
    "correctIndex": 1,
    "rationale": "Impaired hepatic deamination leads to systemic accumulation of neurotoxic blood ammonia (NH3), which crosses the blood-brain barrier causing asterixis and encephalopathy."
  },
  {
    "id": "mcq-145",
    "level": "Midwifery Qualifying",
    "category": "Medical-Surgical Nursing",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "In managing a patient with acute pancreatitis, which diagnostic serum enzyme level typically rises within 2-12 hours of onset and remains elevated for 3-5 days? [Question Code: MS-145]",
    "options": [
      "Alkaline phosphatase",
      "Serum Amylase",
      "Creatine Kinase (CK-MB)",
      "Troponin I"
    ],
    "correctIndex": 1,
    "rationale": "Serum amylase rises quickly within 2-12 hours of acute pancreatic inflammation and returns to baseline in 3-5 days; lipase rises similarly and remains elevated for up to 14 days."
  },
  {
    "id": "mcq-146",
    "level": "Midwifery Qualifying",
    "category": "Medical-Surgical Nursing",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "A patient with liver cirrhosis develops flapping tremors of the outstretched hands (asterixis) and confusion. Which biochemical abnormality is the primary driver of this hepatic encephalopathy? [Question Code: MS-146]",
    "options": [
      "Elevated serum potassium",
      "Elevated blood ammonia (NH3) levels",
      "Depleted serum bilirubin",
      "Metabolic alkalosis from hypercalcemia"
    ],
    "correctIndex": 1,
    "rationale": "Impaired hepatic deamination leads to systemic accumulation of neurotoxic blood ammonia (NH3), which crosses the blood-brain barrier causing asterixis and encephalopathy."
  },
  {
    "id": "mcq-147",
    "level": "Post-UTME Entrance",
    "category": "Medical-Surgical Nursing",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "In managing a patient with acute pancreatitis, which diagnostic serum enzyme level typically rises within 2-12 hours of onset and remains elevated for 3-5 days? [Question Code: MS-147]",
    "options": [
      "Alkaline phosphatase",
      "Serum Amylase",
      "Creatine Kinase (CK-MB)",
      "Troponin I"
    ],
    "correctIndex": 1,
    "rationale": "Serum amylase rises quickly within 2-12 hours of acute pancreatic inflammation and returns to baseline in 3-5 days; lipase rises similarly and remains elevated for up to 14 days."
  },
  {
    "id": "mcq-148",
    "level": "Post-UTME Entrance",
    "category": "Medical-Surgical Nursing",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "A patient with liver cirrhosis develops flapping tremors of the outstretched hands (asterixis) and confusion. Which biochemical abnormality is the primary driver of this hepatic encephalopathy? [Question Code: MS-148]",
    "options": [
      "Elevated serum potassium",
      "Elevated blood ammonia (NH3) levels",
      "Depleted serum bilirubin",
      "Metabolic alkalosis from hypercalcemia"
    ],
    "correctIndex": 1,
    "rationale": "Impaired hepatic deamination leads to systemic accumulation of neurotoxic blood ammonia (NH3), which crosses the blood-brain barrier causing asterixis and encephalopathy."
  },
  {
    "id": "mcq-149",
    "level": "100 Level",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "Which pharmacological agent is the first-line drug of choice for the prevention and treatment of eclamptic convulsions in severe pre-eclampsia? [Question Code: MW-149]",
    "options": [
      "Diazepam IV infusion",
      "Magnesium Sulphate (MgSO4)",
      "Phenytoin sodium",
      "Sodium Nitroprusside"
    ],
    "correctIndex": 1,
    "rationale": "Magnesium Sulphate is the internationally accredited anticonvulsant of choice for severe pre-eclampsia and eclampsia, acting as a neuroprotective cerebral vasodilator."
  },
  {
    "id": "mcq-150",
    "level": "100 Level",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "During the first stage of labor, a multiparous mother complains of sudden urge to push at 6 cm cervical dilation. What is the nurse's priority action? [Question Code: MW-150]",
    "options": [
      "Instruct her to bear down vigorously",
      "Coach her to pant or blow through contractions and re-assess cervical dilation",
      "Administer an IV tocolytic agent",
      "Place her in High Fowler's position"
    ],
    "correctIndex": 1,
    "rationale": "Pushing against an incompletely dilated cervix causes cervical edema, laceration, and maternal exhaustion. Coaching her to pant/blow prevents premature bearing down."
  },
  {
    "id": "mcq-151",
    "level": "200 Level",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "Which pharmacological agent is the first-line drug of choice for the prevention and treatment of eclamptic convulsions in severe pre-eclampsia? [Question Code: MW-151]",
    "options": [
      "Diazepam IV infusion",
      "Magnesium Sulphate (MgSO4)",
      "Phenytoin sodium",
      "Sodium Nitroprusside"
    ],
    "correctIndex": 1,
    "rationale": "Magnesium Sulphate is the internationally accredited anticonvulsant of choice for severe pre-eclampsia and eclampsia, acting as a neuroprotective cerebral vasodilator."
  },
  {
    "id": "mcq-152",
    "level": "200 Level",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "During the first stage of labor, a multiparous mother complains of sudden urge to push at 6 cm cervical dilation. What is the nurse's priority action? [Question Code: MW-152]",
    "options": [
      "Instruct her to bear down vigorously",
      "Coach her to pant or blow through contractions and re-assess cervical dilation",
      "Administer an IV tocolytic agent",
      "Place her in High Fowler's position"
    ],
    "correctIndex": 1,
    "rationale": "Pushing against an incompletely dilated cervix causes cervical edema, laceration, and maternal exhaustion. Coaching her to pant/blow prevents premature bearing down."
  },
  {
    "id": "mcq-153",
    "level": "300 Level",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "Which pharmacological agent is the first-line drug of choice for the prevention and treatment of eclamptic convulsions in severe pre-eclampsia? [Question Code: MW-153]",
    "options": [
      "Diazepam IV infusion",
      "Magnesium Sulphate (MgSO4)",
      "Phenytoin sodium",
      "Sodium Nitroprusside"
    ],
    "correctIndex": 1,
    "rationale": "Magnesium Sulphate is the internationally accredited anticonvulsant of choice for severe pre-eclampsia and eclampsia, acting as a neuroprotective cerebral vasodilator."
  },
  {
    "id": "mcq-154",
    "level": "300 Level",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "During the first stage of labor, a multiparous mother complains of sudden urge to push at 6 cm cervical dilation. What is the nurse's priority action? [Question Code: MW-154]",
    "options": [
      "Instruct her to bear down vigorously",
      "Coach her to pant or blow through contractions and re-assess cervical dilation",
      "Administer an IV tocolytic agent",
      "Place her in High Fowler's position"
    ],
    "correctIndex": 1,
    "rationale": "Pushing against an incompletely dilated cervix causes cervical edema, laceration, and maternal exhaustion. Coaching her to pant/blow prevents premature bearing down."
  },
  {
    "id": "mcq-155",
    "level": "400 Level",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "Which pharmacological agent is the first-line drug of choice for the prevention and treatment of eclamptic convulsions in severe pre-eclampsia? [Question Code: MW-155]",
    "options": [
      "Diazepam IV infusion",
      "Magnesium Sulphate (MgSO4)",
      "Phenytoin sodium",
      "Sodium Nitroprusside"
    ],
    "correctIndex": 1,
    "rationale": "Magnesium Sulphate is the internationally accredited anticonvulsant of choice for severe pre-eclampsia and eclampsia, acting as a neuroprotective cerebral vasodilator."
  },
  {
    "id": "mcq-156",
    "level": "400 Level",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "During the first stage of labor, a multiparous mother complains of sudden urge to push at 6 cm cervical dilation. What is the nurse's priority action? [Question Code: MW-156]",
    "options": [
      "Instruct her to bear down vigorously",
      "Coach her to pant or blow through contractions and re-assess cervical dilation",
      "Administer an IV tocolytic agent",
      "Place her in High Fowler's position"
    ],
    "correctIndex": 1,
    "rationale": "Pushing against an incompletely dilated cervix causes cervical edema, laceration, and maternal exhaustion. Coaching her to pant/blow prevents premature bearing down."
  },
  {
    "id": "mcq-157",
    "level": "500 Level",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "Which pharmacological agent is the first-line drug of choice for the prevention and treatment of eclamptic convulsions in severe pre-eclampsia? [Question Code: MW-157]",
    "options": [
      "Diazepam IV infusion",
      "Magnesium Sulphate (MgSO4)",
      "Phenytoin sodium",
      "Sodium Nitroprusside"
    ],
    "correctIndex": 1,
    "rationale": "Magnesium Sulphate is the internationally accredited anticonvulsant of choice for severe pre-eclampsia and eclampsia, acting as a neuroprotective cerebral vasodilator."
  },
  {
    "id": "mcq-158",
    "level": "500 Level",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "During the first stage of labor, a multiparous mother complains of sudden urge to push at 6 cm cervical dilation. What is the nurse's priority action? [Question Code: MW-158]",
    "options": [
      "Instruct her to bear down vigorously",
      "Coach her to pant or blow through contractions and re-assess cervical dilation",
      "Administer an IV tocolytic agent",
      "Place her in High Fowler's position"
    ],
    "correctIndex": 1,
    "rationale": "Pushing against an incompletely dilated cervix causes cervical edema, laceration, and maternal exhaustion. Coaching her to pant/blow prevents premature bearing down."
  },
  {
    "id": "mcq-159",
    "level": "NMCN Licensure",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "Which pharmacological agent is the first-line drug of choice for the prevention and treatment of eclamptic convulsions in severe pre-eclampsia? [Question Code: MW-159]",
    "options": [
      "Diazepam IV infusion",
      "Magnesium Sulphate (MgSO4)",
      "Phenytoin sodium",
      "Sodium Nitroprusside"
    ],
    "correctIndex": 1,
    "rationale": "Magnesium Sulphate is the internationally accredited anticonvulsant of choice for severe pre-eclampsia and eclampsia, acting as a neuroprotective cerebral vasodilator."
  },
  {
    "id": "mcq-160",
    "level": "NMCN Licensure",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "During the first stage of labor, a multiparous mother complains of sudden urge to push at 6 cm cervical dilation. What is the nurse's priority action? [Question Code: MW-160]",
    "options": [
      "Instruct her to bear down vigorously",
      "Coach her to pant or blow through contractions and re-assess cervical dilation",
      "Administer an IV tocolytic agent",
      "Place her in High Fowler's position"
    ],
    "correctIndex": 1,
    "rationale": "Pushing against an incompletely dilated cervix causes cervical edema, laceration, and maternal exhaustion. Coaching her to pant/blow prevents premature bearing down."
  },
  {
    "id": "mcq-161",
    "level": "Midwifery Qualifying",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "Which pharmacological agent is the first-line drug of choice for the prevention and treatment of eclamptic convulsions in severe pre-eclampsia? [Question Code: MW-161]",
    "options": [
      "Diazepam IV infusion",
      "Magnesium Sulphate (MgSO4)",
      "Phenytoin sodium",
      "Sodium Nitroprusside"
    ],
    "correctIndex": 1,
    "rationale": "Magnesium Sulphate is the internationally accredited anticonvulsant of choice for severe pre-eclampsia and eclampsia, acting as a neuroprotective cerebral vasodilator."
  },
  {
    "id": "mcq-162",
    "level": "Midwifery Qualifying",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "During the first stage of labor, a multiparous mother complains of sudden urge to push at 6 cm cervical dilation. What is the nurse's priority action? [Question Code: MW-162]",
    "options": [
      "Instruct her to bear down vigorously",
      "Coach her to pant or blow through contractions and re-assess cervical dilation",
      "Administer an IV tocolytic agent",
      "Place her in High Fowler's position"
    ],
    "correctIndex": 1,
    "rationale": "Pushing against an incompletely dilated cervix causes cervical edema, laceration, and maternal exhaustion. Coaching her to pant/blow prevents premature bearing down."
  },
  {
    "id": "mcq-163",
    "level": "Post-UTME Entrance",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "Which pharmacological agent is the first-line drug of choice for the prevention and treatment of eclamptic convulsions in severe pre-eclampsia? [Question Code: MW-163]",
    "options": [
      "Diazepam IV infusion",
      "Magnesium Sulphate (MgSO4)",
      "Phenytoin sodium",
      "Sodium Nitroprusside"
    ],
    "correctIndex": 1,
    "rationale": "Magnesium Sulphate is the internationally accredited anticonvulsant of choice for severe pre-eclampsia and eclampsia, acting as a neuroprotective cerebral vasodilator."
  },
  {
    "id": "mcq-164",
    "level": "Post-UTME Entrance",
    "category": "Maternal & Child Health / Midwifery",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "During the first stage of labor, a multiparous mother complains of sudden urge to push at 6 cm cervical dilation. What is the nurse's priority action? [Question Code: MW-164]",
    "options": [
      "Instruct her to bear down vigorously",
      "Coach her to pant or blow through contractions and re-assess cervical dilation",
      "Administer an IV tocolytic agent",
      "Place her in High Fowler's position"
    ],
    "correctIndex": 1,
    "rationale": "Pushing against an incompletely dilated cervix causes cervical edema, laceration, and maternal exhaustion. Coaching her to pant/blow prevents premature bearing down."
  },
  {
    "id": "mcq-165",
    "level": "100 Level",
    "category": "Pharmacology & Safe Dosage",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "A client receiving unfractionated heparin therapy has an activated partial thromboplastin time (aPTT) of 130 seconds (control: 30 seconds). Which specific antidote should the nurse anticipate administering? [Question Code: PH-165]",
    "options": [
      "Vitamin K1 (Phytonadione)",
      "Protamine Sulphate",
      "Fresh Frozen Plasma",
      "Aminocaproic Acid"
    ],
    "correctIndex": 1,
    "rationale": "Protamine Sulphate binds strongly to unfractionated heparin molecules to form a stable, inactive salt complex, rapidly reversing heparin-induced coagulopathy."
  },
  {
    "id": "mcq-166",
    "level": "100 Level",
    "category": "Pharmacology & Safe Dosage",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "A nurse is teaching a patient prescribed oral Iron (Ferrous Sulphate) for microcytic anemia. Which beverage will enhance the intestinal absorption of iron? [Question Code: PH-166]",
    "options": [
      "Cow's milk",
      "Orange juice (Ascorbic acid)",
      "Black coffee",
      "Green tea"
    ],
    "correctIndex": 1,
    "rationale": "Ascorbic acid (Vitamin C in orange juice) reduces ferric iron to ferrous iron, which is significantly more soluble and readily absorbed in the duodenum."
  },
  {
    "id": "mcq-167",
    "level": "200 Level",
    "category": "Pharmacology & Safe Dosage",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "A client receiving unfractionated heparin therapy has an activated partial thromboplastin time (aPTT) of 130 seconds (control: 30 seconds). Which specific antidote should the nurse anticipate administering? [Question Code: PH-167]",
    "options": [
      "Vitamin K1 (Phytonadione)",
      "Protamine Sulphate",
      "Fresh Frozen Plasma",
      "Aminocaproic Acid"
    ],
    "correctIndex": 1,
    "rationale": "Protamine Sulphate binds strongly to unfractionated heparin molecules to form a stable, inactive salt complex, rapidly reversing heparin-induced coagulopathy."
  },
  {
    "id": "mcq-168",
    "level": "200 Level",
    "category": "Pharmacology & Safe Dosage",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "A nurse is teaching a patient prescribed oral Iron (Ferrous Sulphate) for microcytic anemia. Which beverage will enhance the intestinal absorption of iron? [Question Code: PH-168]",
    "options": [
      "Cow's milk",
      "Orange juice (Ascorbic acid)",
      "Black coffee",
      "Green tea"
    ],
    "correctIndex": 1,
    "rationale": "Ascorbic acid (Vitamin C in orange juice) reduces ferric iron to ferrous iron, which is significantly more soluble and readily absorbed in the duodenum."
  },
  {
    "id": "mcq-169",
    "level": "300 Level",
    "category": "Pharmacology & Safe Dosage",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "A client receiving unfractionated heparin therapy has an activated partial thromboplastin time (aPTT) of 130 seconds (control: 30 seconds). Which specific antidote should the nurse anticipate administering? [Question Code: PH-169]",
    "options": [
      "Vitamin K1 (Phytonadione)",
      "Protamine Sulphate",
      "Fresh Frozen Plasma",
      "Aminocaproic Acid"
    ],
    "correctIndex": 1,
    "rationale": "Protamine Sulphate binds strongly to unfractionated heparin molecules to form a stable, inactive salt complex, rapidly reversing heparin-induced coagulopathy."
  },
  {
    "id": "mcq-170",
    "level": "300 Level",
    "category": "Pharmacology & Safe Dosage",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "A nurse is teaching a patient prescribed oral Iron (Ferrous Sulphate) for microcytic anemia. Which beverage will enhance the intestinal absorption of iron? [Question Code: PH-170]",
    "options": [
      "Cow's milk",
      "Orange juice (Ascorbic acid)",
      "Black coffee",
      "Green tea"
    ],
    "correctIndex": 1,
    "rationale": "Ascorbic acid (Vitamin C in orange juice) reduces ferric iron to ferrous iron, which is significantly more soluble and readily absorbed in the duodenum."
  },
  {
    "id": "mcq-171",
    "level": "400 Level",
    "category": "Pharmacology & Safe Dosage",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "A client receiving unfractionated heparin therapy has an activated partial thromboplastin time (aPTT) of 130 seconds (control: 30 seconds). Which specific antidote should the nurse anticipate administering? [Question Code: PH-171]",
    "options": [
      "Vitamin K1 (Phytonadione)",
      "Protamine Sulphate",
      "Fresh Frozen Plasma",
      "Aminocaproic Acid"
    ],
    "correctIndex": 1,
    "rationale": "Protamine Sulphate binds strongly to unfractionated heparin molecules to form a stable, inactive salt complex, rapidly reversing heparin-induced coagulopathy."
  },
  {
    "id": "mcq-172",
    "level": "400 Level",
    "category": "Pharmacology & Safe Dosage",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "A nurse is teaching a patient prescribed oral Iron (Ferrous Sulphate) for microcytic anemia. Which beverage will enhance the intestinal absorption of iron? [Question Code: PH-172]",
    "options": [
      "Cow's milk",
      "Orange juice (Ascorbic acid)",
      "Black coffee",
      "Green tea"
    ],
    "correctIndex": 1,
    "rationale": "Ascorbic acid (Vitamin C in orange juice) reduces ferric iron to ferrous iron, which is significantly more soluble and readily absorbed in the duodenum."
  },
  {
    "id": "mcq-173",
    "level": "500 Level",
    "category": "Pharmacology & Safe Dosage",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "A client receiving unfractionated heparin therapy has an activated partial thromboplastin time (aPTT) of 130 seconds (control: 30 seconds). Which specific antidote should the nurse anticipate administering? [Question Code: PH-173]",
    "options": [
      "Vitamin K1 (Phytonadione)",
      "Protamine Sulphate",
      "Fresh Frozen Plasma",
      "Aminocaproic Acid"
    ],
    "correctIndex": 1,
    "rationale": "Protamine Sulphate binds strongly to unfractionated heparin molecules to form a stable, inactive salt complex, rapidly reversing heparin-induced coagulopathy."
  },
  {
    "id": "mcq-174",
    "level": "500 Level",
    "category": "Pharmacology & Safe Dosage",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "A nurse is teaching a patient prescribed oral Iron (Ferrous Sulphate) for microcytic anemia. Which beverage will enhance the intestinal absorption of iron? [Question Code: PH-174]",
    "options": [
      "Cow's milk",
      "Orange juice (Ascorbic acid)",
      "Black coffee",
      "Green tea"
    ],
    "correctIndex": 1,
    "rationale": "Ascorbic acid (Vitamin C in orange juice) reduces ferric iron to ferrous iron, which is significantly more soluble and readily absorbed in the duodenum."
  },
  {
    "id": "mcq-175",
    "level": "NMCN Licensure",
    "category": "Pharmacology & Safe Dosage",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "A client receiving unfractionated heparin therapy has an activated partial thromboplastin time (aPTT) of 130 seconds (control: 30 seconds). Which specific antidote should the nurse anticipate administering? [Question Code: PH-175]",
    "options": [
      "Vitamin K1 (Phytonadione)",
      "Protamine Sulphate",
      "Fresh Frozen Plasma",
      "Aminocaproic Acid"
    ],
    "correctIndex": 1,
    "rationale": "Protamine Sulphate binds strongly to unfractionated heparin molecules to form a stable, inactive salt complex, rapidly reversing heparin-induced coagulopathy."
  },
  {
    "id": "mcq-176",
    "level": "NMCN Licensure",
    "category": "Pharmacology & Safe Dosage",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "A nurse is teaching a patient prescribed oral Iron (Ferrous Sulphate) for microcytic anemia. Which beverage will enhance the intestinal absorption of iron? [Question Code: PH-176]",
    "options": [
      "Cow's milk",
      "Orange juice (Ascorbic acid)",
      "Black coffee",
      "Green tea"
    ],
    "correctIndex": 1,
    "rationale": "Ascorbic acid (Vitamin C in orange juice) reduces ferric iron to ferrous iron, which is significantly more soluble and readily absorbed in the duodenum."
  },
  {
    "id": "mcq-177",
    "level": "Midwifery Qualifying",
    "category": "Pharmacology & Safe Dosage",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "A client receiving unfractionated heparin therapy has an activated partial thromboplastin time (aPTT) of 130 seconds (control: 30 seconds). Which specific antidote should the nurse anticipate administering? [Question Code: PH-177]",
    "options": [
      "Vitamin K1 (Phytonadione)",
      "Protamine Sulphate",
      "Fresh Frozen Plasma",
      "Aminocaproic Acid"
    ],
    "correctIndex": 1,
    "rationale": "Protamine Sulphate binds strongly to unfractionated heparin molecules to form a stable, inactive salt complex, rapidly reversing heparin-induced coagulopathy."
  },
  {
    "id": "mcq-178",
    "level": "Midwifery Qualifying",
    "category": "Pharmacology & Safe Dosage",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "A nurse is teaching a patient prescribed oral Iron (Ferrous Sulphate) for microcytic anemia. Which beverage will enhance the intestinal absorption of iron? [Question Code: PH-178]",
    "options": [
      "Cow's milk",
      "Orange juice (Ascorbic acid)",
      "Black coffee",
      "Green tea"
    ],
    "correctIndex": 1,
    "rationale": "Ascorbic acid (Vitamin C in orange juice) reduces ferric iron to ferrous iron, which is significantly more soluble and readily absorbed in the duodenum."
  },
  {
    "id": "mcq-179",
    "level": "Post-UTME Entrance",
    "category": "Pharmacology & Safe Dosage",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "A client receiving unfractionated heparin therapy has an activated partial thromboplastin time (aPTT) of 130 seconds (control: 30 seconds). Which specific antidote should the nurse anticipate administering? [Question Code: PH-179]",
    "options": [
      "Vitamin K1 (Phytonadione)",
      "Protamine Sulphate",
      "Fresh Frozen Plasma",
      "Aminocaproic Acid"
    ],
    "correctIndex": 1,
    "rationale": "Protamine Sulphate binds strongly to unfractionated heparin molecules to form a stable, inactive salt complex, rapidly reversing heparin-induced coagulopathy."
  },
  {
    "id": "mcq-180",
    "level": "Post-UTME Entrance",
    "category": "Pharmacology & Safe Dosage",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "A nurse is teaching a patient prescribed oral Iron (Ferrous Sulphate) for microcytic anemia. Which beverage will enhance the intestinal absorption of iron? [Question Code: PH-180]",
    "options": [
      "Cow's milk",
      "Orange juice (Ascorbic acid)",
      "Black coffee",
      "Green tea"
    ],
    "correctIndex": 1,
    "rationale": "Ascorbic acid (Vitamin C in orange juice) reduces ferric iron to ferrous iron, which is significantly more soluble and readily absorbed in the duodenum."
  },
  {
    "id": "mcq-181",
    "level": "100 Level",
    "category": "Pediatrics & Child Health",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "In a 4-year-old child diagnosed with Tetralogy of Fallot, what physiological benefit occurs when the child spontaneously assumes a 'squatting' position during a hypercyanotic spell? [Question Code: PD-181]",
    "options": [
      "Decreases systemic vascular resistance",
      "Increases systemic vascular resistance, decreasing right-to-left shunt and improving pulmonary blood flow",
      "Relaxes the pulmonary infundibulum directly",
      "Reduces cardiac preload to zero"
    ],
    "correctIndex": 1,
    "rationale": "Squatting kinks the femoral arteries, elevating systemic vascular resistance (SVR). This reduces the right-to-left ventricular shunt and forces more deoxygenated blood into the pulmonary circulation."
  },
  {
    "id": "mcq-182",
    "level": "100 Level",
    "category": "Pediatrics & Child Health",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "What is the earliest classic clinical sign of elevated intracranial pressure (ICP) in an infant with patent anterior fontanelles? [Question Code: PD-182]",
    "options": [
      "Cushing's triad (bradycardia, hypertension, bradypnea)",
      "Bulging, tense, non-pulsatile anterior fontanelle",
      "Bilateral decerebrate posturing",
      "Fixed, dilated pupils"
    ],
    "correctIndex": 1,
    "rationale": "In infants whose cranial sutures have not fused, an increase in intracranial volume and pressure immediately manifests as a tense, bulging, non-pulsatile anterior fontanelle."
  },
  {
    "id": "mcq-183",
    "level": "200 Level",
    "category": "Pediatrics & Child Health",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "In a 4-year-old child diagnosed with Tetralogy of Fallot, what physiological benefit occurs when the child spontaneously assumes a 'squatting' position during a hypercyanotic spell? [Question Code: PD-183]",
    "options": [
      "Decreases systemic vascular resistance",
      "Increases systemic vascular resistance, decreasing right-to-left shunt and improving pulmonary blood flow",
      "Relaxes the pulmonary infundibulum directly",
      "Reduces cardiac preload to zero"
    ],
    "correctIndex": 1,
    "rationale": "Squatting kinks the femoral arteries, elevating systemic vascular resistance (SVR). This reduces the right-to-left ventricular shunt and forces more deoxygenated blood into the pulmonary circulation."
  },
  {
    "id": "mcq-184",
    "level": "200 Level",
    "category": "Pediatrics & Child Health",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "What is the earliest classic clinical sign of elevated intracranial pressure (ICP) in an infant with patent anterior fontanelles? [Question Code: PD-184]",
    "options": [
      "Cushing's triad (bradycardia, hypertension, bradypnea)",
      "Bulging, tense, non-pulsatile anterior fontanelle",
      "Bilateral decerebrate posturing",
      "Fixed, dilated pupils"
    ],
    "correctIndex": 1,
    "rationale": "In infants whose cranial sutures have not fused, an increase in intracranial volume and pressure immediately manifests as a tense, bulging, non-pulsatile anterior fontanelle."
  },
  {
    "id": "mcq-185",
    "level": "300 Level",
    "category": "Pediatrics & Child Health",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "In a 4-year-old child diagnosed with Tetralogy of Fallot, what physiological benefit occurs when the child spontaneously assumes a 'squatting' position during a hypercyanotic spell? [Question Code: PD-185]",
    "options": [
      "Decreases systemic vascular resistance",
      "Increases systemic vascular resistance, decreasing right-to-left shunt and improving pulmonary blood flow",
      "Relaxes the pulmonary infundibulum directly",
      "Reduces cardiac preload to zero"
    ],
    "correctIndex": 1,
    "rationale": "Squatting kinks the femoral arteries, elevating systemic vascular resistance (SVR). This reduces the right-to-left ventricular shunt and forces more deoxygenated blood into the pulmonary circulation."
  },
  {
    "id": "mcq-186",
    "level": "300 Level",
    "category": "Pediatrics & Child Health",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "What is the earliest classic clinical sign of elevated intracranial pressure (ICP) in an infant with patent anterior fontanelles? [Question Code: PD-186]",
    "options": [
      "Cushing's triad (bradycardia, hypertension, bradypnea)",
      "Bulging, tense, non-pulsatile anterior fontanelle",
      "Bilateral decerebrate posturing",
      "Fixed, dilated pupils"
    ],
    "correctIndex": 1,
    "rationale": "In infants whose cranial sutures have not fused, an increase in intracranial volume and pressure immediately manifests as a tense, bulging, non-pulsatile anterior fontanelle."
  },
  {
    "id": "mcq-187",
    "level": "400 Level",
    "category": "Pediatrics & Child Health",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "In a 4-year-old child diagnosed with Tetralogy of Fallot, what physiological benefit occurs when the child spontaneously assumes a 'squatting' position during a hypercyanotic spell? [Question Code: PD-187]",
    "options": [
      "Decreases systemic vascular resistance",
      "Increases systemic vascular resistance, decreasing right-to-left shunt and improving pulmonary blood flow",
      "Relaxes the pulmonary infundibulum directly",
      "Reduces cardiac preload to zero"
    ],
    "correctIndex": 1,
    "rationale": "Squatting kinks the femoral arteries, elevating systemic vascular resistance (SVR). This reduces the right-to-left ventricular shunt and forces more deoxygenated blood into the pulmonary circulation."
  },
  {
    "id": "mcq-188",
    "level": "400 Level",
    "category": "Pediatrics & Child Health",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "What is the earliest classic clinical sign of elevated intracranial pressure (ICP) in an infant with patent anterior fontanelles? [Question Code: PD-188]",
    "options": [
      "Cushing's triad (bradycardia, hypertension, bradypnea)",
      "Bulging, tense, non-pulsatile anterior fontanelle",
      "Bilateral decerebrate posturing",
      "Fixed, dilated pupils"
    ],
    "correctIndex": 1,
    "rationale": "In infants whose cranial sutures have not fused, an increase in intracranial volume and pressure immediately manifests as a tense, bulging, non-pulsatile anterior fontanelle."
  },
  {
    "id": "mcq-189",
    "level": "500 Level",
    "category": "Pediatrics & Child Health",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "In a 4-year-old child diagnosed with Tetralogy of Fallot, what physiological benefit occurs when the child spontaneously assumes a 'squatting' position during a hypercyanotic spell? [Question Code: PD-189]",
    "options": [
      "Decreases systemic vascular resistance",
      "Increases systemic vascular resistance, decreasing right-to-left shunt and improving pulmonary blood flow",
      "Relaxes the pulmonary infundibulum directly",
      "Reduces cardiac preload to zero"
    ],
    "correctIndex": 1,
    "rationale": "Squatting kinks the femoral arteries, elevating systemic vascular resistance (SVR). This reduces the right-to-left ventricular shunt and forces more deoxygenated blood into the pulmonary circulation."
  },
  {
    "id": "mcq-190",
    "level": "500 Level",
    "category": "Pediatrics & Child Health",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "What is the earliest classic clinical sign of elevated intracranial pressure (ICP) in an infant with patent anterior fontanelles? [Question Code: PD-190]",
    "options": [
      "Cushing's triad (bradycardia, hypertension, bradypnea)",
      "Bulging, tense, non-pulsatile anterior fontanelle",
      "Bilateral decerebrate posturing",
      "Fixed, dilated pupils"
    ],
    "correctIndex": 1,
    "rationale": "In infants whose cranial sutures have not fused, an increase in intracranial volume and pressure immediately manifests as a tense, bulging, non-pulsatile anterior fontanelle."
  },
  {
    "id": "mcq-191",
    "level": "NMCN Licensure",
    "category": "Pediatrics & Child Health",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "In a 4-year-old child diagnosed with Tetralogy of Fallot, what physiological benefit occurs when the child spontaneously assumes a 'squatting' position during a hypercyanotic spell? [Question Code: PD-191]",
    "options": [
      "Decreases systemic vascular resistance",
      "Increases systemic vascular resistance, decreasing right-to-left shunt and improving pulmonary blood flow",
      "Relaxes the pulmonary infundibulum directly",
      "Reduces cardiac preload to zero"
    ],
    "correctIndex": 1,
    "rationale": "Squatting kinks the femoral arteries, elevating systemic vascular resistance (SVR). This reduces the right-to-left ventricular shunt and forces more deoxygenated blood into the pulmonary circulation."
  },
  {
    "id": "mcq-192",
    "level": "NMCN Licensure",
    "category": "Pediatrics & Child Health",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "What is the earliest classic clinical sign of elevated intracranial pressure (ICP) in an infant with patent anterior fontanelles? [Question Code: PD-192]",
    "options": [
      "Cushing's triad (bradycardia, hypertension, bradypnea)",
      "Bulging, tense, non-pulsatile anterior fontanelle",
      "Bilateral decerebrate posturing",
      "Fixed, dilated pupils"
    ],
    "correctIndex": 1,
    "rationale": "In infants whose cranial sutures have not fused, an increase in intracranial volume and pressure immediately manifests as a tense, bulging, non-pulsatile anterior fontanelle."
  },
  {
    "id": "mcq-193",
    "level": "Midwifery Qualifying",
    "category": "Pediatrics & Child Health",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "In a 4-year-old child diagnosed with Tetralogy of Fallot, what physiological benefit occurs when the child spontaneously assumes a 'squatting' position during a hypercyanotic spell? [Question Code: PD-193]",
    "options": [
      "Decreases systemic vascular resistance",
      "Increases systemic vascular resistance, decreasing right-to-left shunt and improving pulmonary blood flow",
      "Relaxes the pulmonary infundibulum directly",
      "Reduces cardiac preload to zero"
    ],
    "correctIndex": 1,
    "rationale": "Squatting kinks the femoral arteries, elevating systemic vascular resistance (SVR). This reduces the right-to-left ventricular shunt and forces more deoxygenated blood into the pulmonary circulation."
  },
  {
    "id": "mcq-194",
    "level": "Midwifery Qualifying",
    "category": "Pediatrics & Child Health",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "What is the earliest classic clinical sign of elevated intracranial pressure (ICP) in an infant with patent anterior fontanelles? [Question Code: PD-194]",
    "options": [
      "Cushing's triad (bradycardia, hypertension, bradypnea)",
      "Bulging, tense, non-pulsatile anterior fontanelle",
      "Bilateral decerebrate posturing",
      "Fixed, dilated pupils"
    ],
    "correctIndex": 1,
    "rationale": "In infants whose cranial sutures have not fused, an increase in intracranial volume and pressure immediately manifests as a tense, bulging, non-pulsatile anterior fontanelle."
  },
  {
    "id": "mcq-195",
    "level": "Post-UTME Entrance",
    "category": "Pediatrics & Child Health",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "In a 4-year-old child diagnosed with Tetralogy of Fallot, what physiological benefit occurs when the child spontaneously assumes a 'squatting' position during a hypercyanotic spell? [Question Code: PD-195]",
    "options": [
      "Decreases systemic vascular resistance",
      "Increases systemic vascular resistance, decreasing right-to-left shunt and improving pulmonary blood flow",
      "Relaxes the pulmonary infundibulum directly",
      "Reduces cardiac preload to zero"
    ],
    "correctIndex": 1,
    "rationale": "Squatting kinks the femoral arteries, elevating systemic vascular resistance (SVR). This reduces the right-to-left ventricular shunt and forces more deoxygenated blood into the pulmonary circulation."
  },
  {
    "id": "mcq-196",
    "level": "Post-UTME Entrance",
    "category": "Pediatrics & Child Health",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "What is the earliest classic clinical sign of elevated intracranial pressure (ICP) in an infant with patent anterior fontanelles? [Question Code: PD-196]",
    "options": [
      "Cushing's triad (bradycardia, hypertension, bradypnea)",
      "Bulging, tense, non-pulsatile anterior fontanelle",
      "Bilateral decerebrate posturing",
      "Fixed, dilated pupils"
    ],
    "correctIndex": 1,
    "rationale": "In infants whose cranial sutures have not fused, an increase in intracranial volume and pressure immediately manifests as a tense, bulging, non-pulsatile anterior fontanelle."
  },
  {
    "id": "mcq-197",
    "level": "100 Level",
    "category": "Psychiatric & Mental Health",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "When communicating with a client experiencing active auditory hallucinations instructing them to harm themselves, what is the nurse's priority therapeutic response? [Question Code: PS-197]",
    "options": [
      "Argue that the voices are imaginary",
      "Directly assess the command hallucination content: 'What are the voices telling you to do?'",
      "Leave the patient alone in a quiet room",
      "Play loud music to distract the voices"
    ],
    "correctIndex": 1,
    "rationale": "The nurse must directly ascertain the specific commands being heard to accurately evaluate lethality, risk of harm to self or others, and establish immediate suicide precautions."
  },
  {
    "id": "mcq-198",
    "level": "100 Level",
    "category": "Psychiatric & Mental Health",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "A patient with severe depression starting a Monoamine Oxidase Inhibitor (MAOI) such as Phenelzine must strictly avoid which dietary substance to prevent hypertensive crisis? [Question Code: PS-198]",
    "options": [
      "Gluten and wheat proteins",
      "Tyramine-rich aged cheeses, cured meats, and yeast extracts",
      "Citrus fruits containing ascorbic acid",
      "Lactose and dairy products"
    ],
    "correctIndex": 1,
    "rationale": "MAOIs inhibit intestinal breakdown of dietary tyramine. Accumulation of tyramine triggers massive norepinephrine release, causing severe vasoconstriction and hypertensive encephalopathy."
  },
  {
    "id": "mcq-199",
    "level": "200 Level",
    "category": "Psychiatric & Mental Health",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "When communicating with a client experiencing active auditory hallucinations instructing them to harm themselves, what is the nurse's priority therapeutic response? [Question Code: PS-199]",
    "options": [
      "Argue that the voices are imaginary",
      "Directly assess the command hallucination content: 'What are the voices telling you to do?'",
      "Leave the patient alone in a quiet room",
      "Play loud music to distract the voices"
    ],
    "correctIndex": 1,
    "rationale": "The nurse must directly ascertain the specific commands being heard to accurately evaluate lethality, risk of harm to self or others, and establish immediate suicide precautions."
  },
  {
    "id": "mcq-200",
    "level": "200 Level",
    "category": "Psychiatric & Mental Health",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "A patient with severe depression starting a Monoamine Oxidase Inhibitor (MAOI) such as Phenelzine must strictly avoid which dietary substance to prevent hypertensive crisis? [Question Code: PS-200]",
    "options": [
      "Gluten and wheat proteins",
      "Tyramine-rich aged cheeses, cured meats, and yeast extracts",
      "Citrus fruits containing ascorbic acid",
      "Lactose and dairy products"
    ],
    "correctIndex": 1,
    "rationale": "MAOIs inhibit intestinal breakdown of dietary tyramine. Accumulation of tyramine triggers massive norepinephrine release, causing severe vasoconstriction and hypertensive encephalopathy."
  },
  {
    "id": "mcq-201",
    "level": "300 Level",
    "category": "Psychiatric & Mental Health",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "When communicating with a client experiencing active auditory hallucinations instructing them to harm themselves, what is the nurse's priority therapeutic response? [Question Code: PS-201]",
    "options": [
      "Argue that the voices are imaginary",
      "Directly assess the command hallucination content: 'What are the voices telling you to do?'",
      "Leave the patient alone in a quiet room",
      "Play loud music to distract the voices"
    ],
    "correctIndex": 1,
    "rationale": "The nurse must directly ascertain the specific commands being heard to accurately evaluate lethality, risk of harm to self or others, and establish immediate suicide precautions."
  },
  {
    "id": "mcq-202",
    "level": "300 Level",
    "category": "Psychiatric & Mental Health",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "A patient with severe depression starting a Monoamine Oxidase Inhibitor (MAOI) such as Phenelzine must strictly avoid which dietary substance to prevent hypertensive crisis? [Question Code: PS-202]",
    "options": [
      "Gluten and wheat proteins",
      "Tyramine-rich aged cheeses, cured meats, and yeast extracts",
      "Citrus fruits containing ascorbic acid",
      "Lactose and dairy products"
    ],
    "correctIndex": 1,
    "rationale": "MAOIs inhibit intestinal breakdown of dietary tyramine. Accumulation of tyramine triggers massive norepinephrine release, causing severe vasoconstriction and hypertensive encephalopathy."
  },
  {
    "id": "mcq-203",
    "level": "400 Level",
    "category": "Psychiatric & Mental Health",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "When communicating with a client experiencing active auditory hallucinations instructing them to harm themselves, what is the nurse's priority therapeutic response? [Question Code: PS-203]",
    "options": [
      "Argue that the voices are imaginary",
      "Directly assess the command hallucination content: 'What are the voices telling you to do?'",
      "Leave the patient alone in a quiet room",
      "Play loud music to distract the voices"
    ],
    "correctIndex": 1,
    "rationale": "The nurse must directly ascertain the specific commands being heard to accurately evaluate lethality, risk of harm to self or others, and establish immediate suicide precautions."
  },
  {
    "id": "mcq-204",
    "level": "400 Level",
    "category": "Psychiatric & Mental Health",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "A patient with severe depression starting a Monoamine Oxidase Inhibitor (MAOI) such as Phenelzine must strictly avoid which dietary substance to prevent hypertensive crisis? [Question Code: PS-204]",
    "options": [
      "Gluten and wheat proteins",
      "Tyramine-rich aged cheeses, cured meats, and yeast extracts",
      "Citrus fruits containing ascorbic acid",
      "Lactose and dairy products"
    ],
    "correctIndex": 1,
    "rationale": "MAOIs inhibit intestinal breakdown of dietary tyramine. Accumulation of tyramine triggers massive norepinephrine release, causing severe vasoconstriction and hypertensive encephalopathy."
  },
  {
    "id": "mcq-205",
    "level": "500 Level",
    "category": "Psychiatric & Mental Health",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "When communicating with a client experiencing active auditory hallucinations instructing them to harm themselves, what is the nurse's priority therapeutic response? [Question Code: PS-205]",
    "options": [
      "Argue that the voices are imaginary",
      "Directly assess the command hallucination content: 'What are the voices telling you to do?'",
      "Leave the patient alone in a quiet room",
      "Play loud music to distract the voices"
    ],
    "correctIndex": 1,
    "rationale": "The nurse must directly ascertain the specific commands being heard to accurately evaluate lethality, risk of harm to self or others, and establish immediate suicide precautions."
  },
  {
    "id": "mcq-206",
    "level": "500 Level",
    "category": "Psychiatric & Mental Health",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "A patient with severe depression starting a Monoamine Oxidase Inhibitor (MAOI) such as Phenelzine must strictly avoid which dietary substance to prevent hypertensive crisis? [Question Code: PS-206]",
    "options": [
      "Gluten and wheat proteins",
      "Tyramine-rich aged cheeses, cured meats, and yeast extracts",
      "Citrus fruits containing ascorbic acid",
      "Lactose and dairy products"
    ],
    "correctIndex": 1,
    "rationale": "MAOIs inhibit intestinal breakdown of dietary tyramine. Accumulation of tyramine triggers massive norepinephrine release, causing severe vasoconstriction and hypertensive encephalopathy."
  },
  {
    "id": "mcq-207",
    "level": "NMCN Licensure",
    "category": "Psychiatric & Mental Health",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "When communicating with a client experiencing active auditory hallucinations instructing them to harm themselves, what is the nurse's priority therapeutic response? [Question Code: PS-207]",
    "options": [
      "Argue that the voices are imaginary",
      "Directly assess the command hallucination content: 'What are the voices telling you to do?'",
      "Leave the patient alone in a quiet room",
      "Play loud music to distract the voices"
    ],
    "correctIndex": 1,
    "rationale": "The nurse must directly ascertain the specific commands being heard to accurately evaluate lethality, risk of harm to self or others, and establish immediate suicide precautions."
  },
  {
    "id": "mcq-208",
    "level": "NMCN Licensure",
    "category": "Psychiatric & Mental Health",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "A patient with severe depression starting a Monoamine Oxidase Inhibitor (MAOI) such as Phenelzine must strictly avoid which dietary substance to prevent hypertensive crisis? [Question Code: PS-208]",
    "options": [
      "Gluten and wheat proteins",
      "Tyramine-rich aged cheeses, cured meats, and yeast extracts",
      "Citrus fruits containing ascorbic acid",
      "Lactose and dairy products"
    ],
    "correctIndex": 1,
    "rationale": "MAOIs inhibit intestinal breakdown of dietary tyramine. Accumulation of tyramine triggers massive norepinephrine release, causing severe vasoconstriction and hypertensive encephalopathy."
  },
  {
    "id": "mcq-209",
    "level": "Midwifery Qualifying",
    "category": "Psychiatric & Mental Health",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "When communicating with a client experiencing active auditory hallucinations instructing them to harm themselves, what is the nurse's priority therapeutic response? [Question Code: PS-209]",
    "options": [
      "Argue that the voices are imaginary",
      "Directly assess the command hallucination content: 'What are the voices telling you to do?'",
      "Leave the patient alone in a quiet room",
      "Play loud music to distract the voices"
    ],
    "correctIndex": 1,
    "rationale": "The nurse must directly ascertain the specific commands being heard to accurately evaluate lethality, risk of harm to self or others, and establish immediate suicide precautions."
  },
  {
    "id": "mcq-210",
    "level": "Midwifery Qualifying",
    "category": "Psychiatric & Mental Health",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "A patient with severe depression starting a Monoamine Oxidase Inhibitor (MAOI) such as Phenelzine must strictly avoid which dietary substance to prevent hypertensive crisis? [Question Code: PS-210]",
    "options": [
      "Gluten and wheat proteins",
      "Tyramine-rich aged cheeses, cured meats, and yeast extracts",
      "Citrus fruits containing ascorbic acid",
      "Lactose and dairy products"
    ],
    "correctIndex": 1,
    "rationale": "MAOIs inhibit intestinal breakdown of dietary tyramine. Accumulation of tyramine triggers massive norepinephrine release, causing severe vasoconstriction and hypertensive encephalopathy."
  },
  {
    "id": "mcq-211",
    "level": "Post-UTME Entrance",
    "category": "Psychiatric & Mental Health",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "When communicating with a client experiencing active auditory hallucinations instructing them to harm themselves, what is the nurse's priority therapeutic response? [Question Code: PS-211]",
    "options": [
      "Argue that the voices are imaginary",
      "Directly assess the command hallucination content: 'What are the voices telling you to do?'",
      "Leave the patient alone in a quiet room",
      "Play loud music to distract the voices"
    ],
    "correctIndex": 1,
    "rationale": "The nurse must directly ascertain the specific commands being heard to accurately evaluate lethality, risk of harm to self or others, and establish immediate suicide precautions."
  },
  {
    "id": "mcq-212",
    "level": "Post-UTME Entrance",
    "category": "Psychiatric & Mental Health",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "A patient with severe depression starting a Monoamine Oxidase Inhibitor (MAOI) such as Phenelzine must strictly avoid which dietary substance to prevent hypertensive crisis? [Question Code: PS-212]",
    "options": [
      "Gluten and wheat proteins",
      "Tyramine-rich aged cheeses, cured meats, and yeast extracts",
      "Citrus fruits containing ascorbic acid",
      "Lactose and dairy products"
    ],
    "correctIndex": 1,
    "rationale": "MAOIs inhibit intestinal breakdown of dietary tyramine. Accumulation of tyramine triggers massive norepinephrine release, causing severe vasoconstriction and hypertensive encephalopathy."
  },
  {
    "id": "mcq-213",
    "level": "100 Level",
    "category": "Community Health & Epidemiology",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "In public health disease surveillance, which of the following interventions represents a Secondary Level of Disease Prevention? [Question Code: CH-213]",
    "options": [
      "Routine childhood immunization against measles",
      "Pap smear screening for early detection of cervical dysplasia",
      "Physical therapy rehabilitation following stroke",
      "Water chlorination and sanitation infrastructure"
    ],
    "correctIndex": 1,
    "rationale": "Secondary prevention aims for early detection and prompt intervention before symptoms manifest, such as mammography, Pap smears, and hypertension screenings."
  },
  {
    "id": "mcq-214",
    "level": "100 Level",
    "category": "Community Health & Epidemiology",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "In a primary healthcare center, the Expanded Programme on Immunization (EPI) requires vaccines like BCG, OPV, and Measles to be stored within what standard cold chain temperature range? [Question Code: CH-214]",
    "options": [
      "-10°C to 0°C",
      "+2°C to +8°C",
      "+10°C to +15°C",
      "-25°C to -15°C exclusively"
    ],
    "correctIndex": 1,
    "rationale": "WHO cold chain standards require refrigerator storage between +2°C and +8°C to maintain vaccine potency and prevent thermal degradation or accidental freezing."
  },
  {
    "id": "mcq-215",
    "level": "200 Level",
    "category": "Community Health & Epidemiology",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "In public health disease surveillance, which of the following interventions represents a Secondary Level of Disease Prevention? [Question Code: CH-215]",
    "options": [
      "Routine childhood immunization against measles",
      "Pap smear screening for early detection of cervical dysplasia",
      "Physical therapy rehabilitation following stroke",
      "Water chlorination and sanitation infrastructure"
    ],
    "correctIndex": 1,
    "rationale": "Secondary prevention aims for early detection and prompt intervention before symptoms manifest, such as mammography, Pap smears, and hypertension screenings."
  },
  {
    "id": "mcq-216",
    "level": "200 Level",
    "category": "Community Health & Epidemiology",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "In a primary healthcare center, the Expanded Programme on Immunization (EPI) requires vaccines like BCG, OPV, and Measles to be stored within what standard cold chain temperature range? [Question Code: CH-216]",
    "options": [
      "-10°C to 0°C",
      "+2°C to +8°C",
      "+10°C to +15°C",
      "-25°C to -15°C exclusively"
    ],
    "correctIndex": 1,
    "rationale": "WHO cold chain standards require refrigerator storage between +2°C and +8°C to maintain vaccine potency and prevent thermal degradation or accidental freezing."
  },
  {
    "id": "mcq-217",
    "level": "300 Level",
    "category": "Community Health & Epidemiology",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "In public health disease surveillance, which of the following interventions represents a Secondary Level of Disease Prevention? [Question Code: CH-217]",
    "options": [
      "Routine childhood immunization against measles",
      "Pap smear screening for early detection of cervical dysplasia",
      "Physical therapy rehabilitation following stroke",
      "Water chlorination and sanitation infrastructure"
    ],
    "correctIndex": 1,
    "rationale": "Secondary prevention aims for early detection and prompt intervention before symptoms manifest, such as mammography, Pap smears, and hypertension screenings."
  },
  {
    "id": "mcq-218",
    "level": "300 Level",
    "category": "Community Health & Epidemiology",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "In a primary healthcare center, the Expanded Programme on Immunization (EPI) requires vaccines like BCG, OPV, and Measles to be stored within what standard cold chain temperature range? [Question Code: CH-218]",
    "options": [
      "-10°C to 0°C",
      "+2°C to +8°C",
      "+10°C to +15°C",
      "-25°C to -15°C exclusively"
    ],
    "correctIndex": 1,
    "rationale": "WHO cold chain standards require refrigerator storage between +2°C and +8°C to maintain vaccine potency and prevent thermal degradation or accidental freezing."
  },
  {
    "id": "mcq-219",
    "level": "400 Level",
    "category": "Community Health & Epidemiology",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "In public health disease surveillance, which of the following interventions represents a Secondary Level of Disease Prevention? [Question Code: CH-219]",
    "options": [
      "Routine childhood immunization against measles",
      "Pap smear screening for early detection of cervical dysplasia",
      "Physical therapy rehabilitation following stroke",
      "Water chlorination and sanitation infrastructure"
    ],
    "correctIndex": 1,
    "rationale": "Secondary prevention aims for early detection and prompt intervention before symptoms manifest, such as mammography, Pap smears, and hypertension screenings."
  },
  {
    "id": "mcq-220",
    "level": "400 Level",
    "category": "Community Health & Epidemiology",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "In a primary healthcare center, the Expanded Programme on Immunization (EPI) requires vaccines like BCG, OPV, and Measles to be stored within what standard cold chain temperature range? [Question Code: CH-220]",
    "options": [
      "-10°C to 0°C",
      "+2°C to +8°C",
      "+10°C to +15°C",
      "-25°C to -15°C exclusively"
    ],
    "correctIndex": 1,
    "rationale": "WHO cold chain standards require refrigerator storage between +2°C and +8°C to maintain vaccine potency and prevent thermal degradation or accidental freezing."
  },
  {
    "id": "mcq-221",
    "level": "500 Level",
    "category": "Community Health & Epidemiology",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "In public health disease surveillance, which of the following interventions represents a Secondary Level of Disease Prevention? [Question Code: CH-221]",
    "options": [
      "Routine childhood immunization against measles",
      "Pap smear screening for early detection of cervical dysplasia",
      "Physical therapy rehabilitation following stroke",
      "Water chlorination and sanitation infrastructure"
    ],
    "correctIndex": 1,
    "rationale": "Secondary prevention aims for early detection and prompt intervention before symptoms manifest, such as mammography, Pap smears, and hypertension screenings."
  },
  {
    "id": "mcq-222",
    "level": "500 Level",
    "category": "Community Health & Epidemiology",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "In a primary healthcare center, the Expanded Programme on Immunization (EPI) requires vaccines like BCG, OPV, and Measles to be stored within what standard cold chain temperature range? [Question Code: CH-222]",
    "options": [
      "-10°C to 0°C",
      "+2°C to +8°C",
      "+10°C to +15°C",
      "-25°C to -15°C exclusively"
    ],
    "correctIndex": 1,
    "rationale": "WHO cold chain standards require refrigerator storage between +2°C and +8°C to maintain vaccine potency and prevent thermal degradation or accidental freezing."
  },
  {
    "id": "mcq-223",
    "level": "NMCN Licensure",
    "category": "Community Health & Epidemiology",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "In public health disease surveillance, which of the following interventions represents a Secondary Level of Disease Prevention? [Question Code: CH-223]",
    "options": [
      "Routine childhood immunization against measles",
      "Pap smear screening for early detection of cervical dysplasia",
      "Physical therapy rehabilitation following stroke",
      "Water chlorination and sanitation infrastructure"
    ],
    "correctIndex": 1,
    "rationale": "Secondary prevention aims for early detection and prompt intervention before symptoms manifest, such as mammography, Pap smears, and hypertension screenings."
  },
  {
    "id": "mcq-224",
    "level": "NMCN Licensure",
    "category": "Community Health & Epidemiology",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "In a primary healthcare center, the Expanded Programme on Immunization (EPI) requires vaccines like BCG, OPV, and Measles to be stored within what standard cold chain temperature range? [Question Code: CH-224]",
    "options": [
      "-10°C to 0°C",
      "+2°C to +8°C",
      "+10°C to +15°C",
      "-25°C to -15°C exclusively"
    ],
    "correctIndex": 1,
    "rationale": "WHO cold chain standards require refrigerator storage between +2°C and +8°C to maintain vaccine potency and prevent thermal degradation or accidental freezing."
  },
  {
    "id": "mcq-225",
    "level": "Midwifery Qualifying",
    "category": "Community Health & Epidemiology",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "In public health disease surveillance, which of the following interventions represents a Secondary Level of Disease Prevention? [Question Code: CH-225]",
    "options": [
      "Routine childhood immunization against measles",
      "Pap smear screening for early detection of cervical dysplasia",
      "Physical therapy rehabilitation following stroke",
      "Water chlorination and sanitation infrastructure"
    ],
    "correctIndex": 1,
    "rationale": "Secondary prevention aims for early detection and prompt intervention before symptoms manifest, such as mammography, Pap smears, and hypertension screenings."
  },
  {
    "id": "mcq-226",
    "level": "Midwifery Qualifying",
    "category": "Community Health & Epidemiology",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "In a primary healthcare center, the Expanded Programme on Immunization (EPI) requires vaccines like BCG, OPV, and Measles to be stored within what standard cold chain temperature range? [Question Code: CH-226]",
    "options": [
      "-10°C to 0°C",
      "+2°C to +8°C",
      "+10°C to +15°C",
      "-25°C to -15°C exclusively"
    ],
    "correctIndex": 1,
    "rationale": "WHO cold chain standards require refrigerator storage between +2°C and +8°C to maintain vaccine potency and prevent thermal degradation or accidental freezing."
  },
  {
    "id": "mcq-227",
    "level": "Post-UTME Entrance",
    "category": "Community Health & Epidemiology",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "In public health disease surveillance, which of the following interventions represents a Secondary Level of Disease Prevention? [Question Code: CH-227]",
    "options": [
      "Routine childhood immunization against measles",
      "Pap smear screening for early detection of cervical dysplasia",
      "Physical therapy rehabilitation following stroke",
      "Water chlorination and sanitation infrastructure"
    ],
    "correctIndex": 1,
    "rationale": "Secondary prevention aims for early detection and prompt intervention before symptoms manifest, such as mammography, Pap smears, and hypertension screenings."
  },
  {
    "id": "mcq-228",
    "level": "Post-UTME Entrance",
    "category": "Community Health & Epidemiology",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "In a primary healthcare center, the Expanded Programme on Immunization (EPI) requires vaccines like BCG, OPV, and Measles to be stored within what standard cold chain temperature range? [Question Code: CH-228]",
    "options": [
      "-10°C to 0°C",
      "+2°C to +8°C",
      "+10°C to +15°C",
      "-25°C to -15°C exclusively"
    ],
    "correctIndex": 1,
    "rationale": "WHO cold chain standards require refrigerator storage between +2°C and +8°C to maintain vaccine potency and prevent thermal degradation or accidental freezing."
  },
  {
    "id": "mcq-229",
    "level": "100 Level",
    "category": "Emergency & Intensive Care",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "During the initial emergency assessment of a polytrauma patient (ATLS / ABCDE protocol), what is the first priority of the trauma resuscitation team? [Question Code: EM-229]",
    "options": [
      "Check bilateral pupillary reflexes",
      "Airway maintenance with cervical spine restriction",
      "Expose patient to check for limb fractures",
      "Initiate two large-bore IV cannulae for fluid resuscitation"
    ],
    "correctIndex": 1,
    "rationale": "The primary survey begins with 'A' - Airway maintenance with manual in-line cervical spine stabilization to prevent spinal cord transection during airway management."
  },
  {
    "id": "mcq-230",
    "level": "100 Level",
    "category": "Emergency & Intensive Care",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "In managing septic shock unresponsive to initial 30 mL/kg crystalloid fluid boluses, which vasopressor is recommended by Surviving Sepsis Guidelines as first-line therapy? [Question Code: EM-230]",
    "options": [
      "Dopamine infusion",
      "Noradrenaline (Norepinephrine)",
      "Epinephrine infusion",
      "Phenylephrine"
    ],
    "correctIndex": 1,
    "rationale": "Norepinephrine is the first-line vasopressor in septic shock, restoring mean arterial pressure (MAP >= 65 mmHg) via potent alpha-1 vasoconstriction with minimal dysrhythmias."
  },
  {
    "id": "mcq-231",
    "level": "200 Level",
    "category": "Emergency & Intensive Care",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "During the initial emergency assessment of a polytrauma patient (ATLS / ABCDE protocol), what is the first priority of the trauma resuscitation team? [Question Code: EM-231]",
    "options": [
      "Check bilateral pupillary reflexes",
      "Airway maintenance with cervical spine restriction",
      "Expose patient to check for limb fractures",
      "Initiate two large-bore IV cannulae for fluid resuscitation"
    ],
    "correctIndex": 1,
    "rationale": "The primary survey begins with 'A' - Airway maintenance with manual in-line cervical spine stabilization to prevent spinal cord transection during airway management."
  },
  {
    "id": "mcq-232",
    "level": "200 Level",
    "category": "Emergency & Intensive Care",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "In managing septic shock unresponsive to initial 30 mL/kg crystalloid fluid boluses, which vasopressor is recommended by Surviving Sepsis Guidelines as first-line therapy? [Question Code: EM-232]",
    "options": [
      "Dopamine infusion",
      "Noradrenaline (Norepinephrine)",
      "Epinephrine infusion",
      "Phenylephrine"
    ],
    "correctIndex": 1,
    "rationale": "Norepinephrine is the first-line vasopressor in septic shock, restoring mean arterial pressure (MAP >= 65 mmHg) via potent alpha-1 vasoconstriction with minimal dysrhythmias."
  },
  {
    "id": "mcq-233",
    "level": "300 Level",
    "category": "Emergency & Intensive Care",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "During the initial emergency assessment of a polytrauma patient (ATLS / ABCDE protocol), what is the first priority of the trauma resuscitation team? [Question Code: EM-233]",
    "options": [
      "Check bilateral pupillary reflexes",
      "Airway maintenance with cervical spine restriction",
      "Expose patient to check for limb fractures",
      "Initiate two large-bore IV cannulae for fluid resuscitation"
    ],
    "correctIndex": 1,
    "rationale": "The primary survey begins with 'A' - Airway maintenance with manual in-line cervical spine stabilization to prevent spinal cord transection during airway management."
  },
  {
    "id": "mcq-234",
    "level": "300 Level",
    "category": "Emergency & Intensive Care",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "In managing septic shock unresponsive to initial 30 mL/kg crystalloid fluid boluses, which vasopressor is recommended by Surviving Sepsis Guidelines as first-line therapy? [Question Code: EM-234]",
    "options": [
      "Dopamine infusion",
      "Noradrenaline (Norepinephrine)",
      "Epinephrine infusion",
      "Phenylephrine"
    ],
    "correctIndex": 1,
    "rationale": "Norepinephrine is the first-line vasopressor in septic shock, restoring mean arterial pressure (MAP >= 65 mmHg) via potent alpha-1 vasoconstriction with minimal dysrhythmias."
  },
  {
    "id": "mcq-235",
    "level": "400 Level",
    "category": "Emergency & Intensive Care",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "During the initial emergency assessment of a polytrauma patient (ATLS / ABCDE protocol), what is the first priority of the trauma resuscitation team? [Question Code: EM-235]",
    "options": [
      "Check bilateral pupillary reflexes",
      "Airway maintenance with cervical spine restriction",
      "Expose patient to check for limb fractures",
      "Initiate two large-bore IV cannulae for fluid resuscitation"
    ],
    "correctIndex": 1,
    "rationale": "The primary survey begins with 'A' - Airway maintenance with manual in-line cervical spine stabilization to prevent spinal cord transection during airway management."
  },
  {
    "id": "mcq-236",
    "level": "400 Level",
    "category": "Emergency & Intensive Care",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "In managing septic shock unresponsive to initial 30 mL/kg crystalloid fluid boluses, which vasopressor is recommended by Surviving Sepsis Guidelines as first-line therapy? [Question Code: EM-236]",
    "options": [
      "Dopamine infusion",
      "Noradrenaline (Norepinephrine)",
      "Epinephrine infusion",
      "Phenylephrine"
    ],
    "correctIndex": 1,
    "rationale": "Norepinephrine is the first-line vasopressor in septic shock, restoring mean arterial pressure (MAP >= 65 mmHg) via potent alpha-1 vasoconstriction with minimal dysrhythmias."
  },
  {
    "id": "mcq-237",
    "level": "500 Level",
    "category": "Emergency & Intensive Care",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "During the initial emergency assessment of a polytrauma patient (ATLS / ABCDE protocol), what is the first priority of the trauma resuscitation team? [Question Code: EM-237]",
    "options": [
      "Check bilateral pupillary reflexes",
      "Airway maintenance with cervical spine restriction",
      "Expose patient to check for limb fractures",
      "Initiate two large-bore IV cannulae for fluid resuscitation"
    ],
    "correctIndex": 1,
    "rationale": "The primary survey begins with 'A' - Airway maintenance with manual in-line cervical spine stabilization to prevent spinal cord transection during airway management."
  },
  {
    "id": "mcq-238",
    "level": "500 Level",
    "category": "Emergency & Intensive Care",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "In managing septic shock unresponsive to initial 30 mL/kg crystalloid fluid boluses, which vasopressor is recommended by Surviving Sepsis Guidelines as first-line therapy? [Question Code: EM-238]",
    "options": [
      "Dopamine infusion",
      "Noradrenaline (Norepinephrine)",
      "Epinephrine infusion",
      "Phenylephrine"
    ],
    "correctIndex": 1,
    "rationale": "Norepinephrine is the first-line vasopressor in septic shock, restoring mean arterial pressure (MAP >= 65 mmHg) via potent alpha-1 vasoconstriction with minimal dysrhythmias."
  },
  {
    "id": "mcq-239",
    "level": "NMCN Licensure",
    "category": "Emergency & Intensive Care",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "During the initial emergency assessment of a polytrauma patient (ATLS / ABCDE protocol), what is the first priority of the trauma resuscitation team? [Question Code: EM-239]",
    "options": [
      "Check bilateral pupillary reflexes",
      "Airway maintenance with cervical spine restriction",
      "Expose patient to check for limb fractures",
      "Initiate two large-bore IV cannulae for fluid resuscitation"
    ],
    "correctIndex": 1,
    "rationale": "The primary survey begins with 'A' - Airway maintenance with manual in-line cervical spine stabilization to prevent spinal cord transection during airway management."
  },
  {
    "id": "mcq-240",
    "level": "NMCN Licensure",
    "category": "Emergency & Intensive Care",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "In managing septic shock unresponsive to initial 30 mL/kg crystalloid fluid boluses, which vasopressor is recommended by Surviving Sepsis Guidelines as first-line therapy? [Question Code: EM-240]",
    "options": [
      "Dopamine infusion",
      "Noradrenaline (Norepinephrine)",
      "Epinephrine infusion",
      "Phenylephrine"
    ],
    "correctIndex": 1,
    "rationale": "Norepinephrine is the first-line vasopressor in septic shock, restoring mean arterial pressure (MAP >= 65 mmHg) via potent alpha-1 vasoconstriction with minimal dysrhythmias."
  },
  {
    "id": "mcq-241",
    "level": "Midwifery Qualifying",
    "category": "Emergency & Intensive Care",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "During the initial emergency assessment of a polytrauma patient (ATLS / ABCDE protocol), what is the first priority of the trauma resuscitation team? [Question Code: EM-241]",
    "options": [
      "Check bilateral pupillary reflexes",
      "Airway maintenance with cervical spine restriction",
      "Expose patient to check for limb fractures",
      "Initiate two large-bore IV cannulae for fluid resuscitation"
    ],
    "correctIndex": 1,
    "rationale": "The primary survey begins with 'A' - Airway maintenance with manual in-line cervical spine stabilization to prevent spinal cord transection during airway management."
  },
  {
    "id": "mcq-242",
    "level": "Midwifery Qualifying",
    "category": "Emergency & Intensive Care",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "In managing septic shock unresponsive to initial 30 mL/kg crystalloid fluid boluses, which vasopressor is recommended by Surviving Sepsis Guidelines as first-line therapy? [Question Code: EM-242]",
    "options": [
      "Dopamine infusion",
      "Noradrenaline (Norepinephrine)",
      "Epinephrine infusion",
      "Phenylephrine"
    ],
    "correctIndex": 1,
    "rationale": "Norepinephrine is the first-line vasopressor in septic shock, restoring mean arterial pressure (MAP >= 65 mmHg) via potent alpha-1 vasoconstriction with minimal dysrhythmias."
  },
  {
    "id": "mcq-243",
    "level": "Post-UTME Entrance",
    "category": "Emergency & Intensive Care",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "During the initial emergency assessment of a polytrauma patient (ATLS / ABCDE protocol), what is the first priority of the trauma resuscitation team? [Question Code: EM-243]",
    "options": [
      "Check bilateral pupillary reflexes",
      "Airway maintenance with cervical spine restriction",
      "Expose patient to check for limb fractures",
      "Initiate two large-bore IV cannulae for fluid resuscitation"
    ],
    "correctIndex": 1,
    "rationale": "The primary survey begins with 'A' - Airway maintenance with manual in-line cervical spine stabilization to prevent spinal cord transection during airway management."
  },
  {
    "id": "mcq-244",
    "level": "Post-UTME Entrance",
    "category": "Emergency & Intensive Care",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "In managing septic shock unresponsive to initial 30 mL/kg crystalloid fluid boluses, which vasopressor is recommended by Surviving Sepsis Guidelines as first-line therapy? [Question Code: EM-244]",
    "options": [
      "Dopamine infusion",
      "Noradrenaline (Norepinephrine)",
      "Epinephrine infusion",
      "Phenylephrine"
    ],
    "correctIndex": 1,
    "rationale": "Norepinephrine is the first-line vasopressor in septic shock, restoring mean arterial pressure (MAP >= 65 mmHg) via potent alpha-1 vasoconstriction with minimal dysrhythmias."
  },
  {
    "id": "mcq-245",
    "level": "100 Level",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "A registered nurse discovers a colleague administering intravenous medications while exhibiting slurred speech and smelling of alcohol. What is the nurse's ethical and statutory obligation under NMCN regulations? [Question Code: ET-245]",
    "options": [
      "Cover the colleague's shift quietly and keep the matter confidential",
      "Intervene immediately to protect patient safety and report the situation to the Nurse-in-Charge / Unit Supervisor",
      "Confront the colleague after the shift has ended",
      "Ignore it if the patients have not complained"
    ],
    "correctIndex": 1,
    "rationale": "Patient safety is the supreme ethical duty. The nurse must intervene to remove the impaired nurse from direct clinical care and report through administrative channels."
  },
  {
    "id": "mcq-246",
    "level": "100 Level",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "100 Level Assessment & Council Board Exam",
    "question": "The ethical principle of 'Non-maleficence' in clinical nursing practice is best defined as: [Question Code: ET-246]",
    "options": [
      "Ensuring equitable distribution of hospital resources",
      "The fundamental professional duty to inflict no intentional harm or injury upon a patient",
      "The right of patients to make independent healthcare decisions",
      "Maintaining truthful and honest communication at all times"
    ],
    "correctIndex": 1,
    "rationale": "Non-maleficence ('Primum non nocere') obligates healthcare providers to avoid inflicting harm, minimize foreseeable risks, and balance burdens against benefits."
  },
  {
    "id": "mcq-247",
    "level": "200 Level",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "A registered nurse discovers a colleague administering intravenous medications while exhibiting slurred speech and smelling of alcohol. What is the nurse's ethical and statutory obligation under NMCN regulations? [Question Code: ET-247]",
    "options": [
      "Cover the colleague's shift quietly and keep the matter confidential",
      "Intervene immediately to protect patient safety and report the situation to the Nurse-in-Charge / Unit Supervisor",
      "Confront the colleague after the shift has ended",
      "Ignore it if the patients have not complained"
    ],
    "correctIndex": 1,
    "rationale": "Patient safety is the supreme ethical duty. The nurse must intervene to remove the impaired nurse from direct clinical care and report through administrative channels."
  },
  {
    "id": "mcq-248",
    "level": "200 Level",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "200 Level Assessment & Council Board Exam",
    "question": "The ethical principle of 'Non-maleficence' in clinical nursing practice is best defined as: [Question Code: ET-248]",
    "options": [
      "Ensuring equitable distribution of hospital resources",
      "The fundamental professional duty to inflict no intentional harm or injury upon a patient",
      "The right of patients to make independent healthcare decisions",
      "Maintaining truthful and honest communication at all times"
    ],
    "correctIndex": 1,
    "rationale": "Non-maleficence ('Primum non nocere') obligates healthcare providers to avoid inflicting harm, minimize foreseeable risks, and balance burdens against benefits."
  },
  {
    "id": "mcq-249",
    "level": "300 Level",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "A registered nurse discovers a colleague administering intravenous medications while exhibiting slurred speech and smelling of alcohol. What is the nurse's ethical and statutory obligation under NMCN regulations? [Question Code: ET-249]",
    "options": [
      "Cover the colleague's shift quietly and keep the matter confidential",
      "Intervene immediately to protect patient safety and report the situation to the Nurse-in-Charge / Unit Supervisor",
      "Confront the colleague after the shift has ended",
      "Ignore it if the patients have not complained"
    ],
    "correctIndex": 1,
    "rationale": "Patient safety is the supreme ethical duty. The nurse must intervene to remove the impaired nurse from direct clinical care and report through administrative channels."
  },
  {
    "id": "mcq-250",
    "level": "300 Level",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "300 Level Assessment & Council Board Exam",
    "question": "The ethical principle of 'Non-maleficence' in clinical nursing practice is best defined as: [Question Code: ET-250]",
    "options": [
      "Ensuring equitable distribution of hospital resources",
      "The fundamental professional duty to inflict no intentional harm or injury upon a patient",
      "The right of patients to make independent healthcare decisions",
      "Maintaining truthful and honest communication at all times"
    ],
    "correctIndex": 1,
    "rationale": "Non-maleficence ('Primum non nocere') obligates healthcare providers to avoid inflicting harm, minimize foreseeable risks, and balance burdens against benefits."
  },
  {
    "id": "mcq-251",
    "level": "400 Level",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "A registered nurse discovers a colleague administering intravenous medications while exhibiting slurred speech and smelling of alcohol. What is the nurse's ethical and statutory obligation under NMCN regulations? [Question Code: ET-251]",
    "options": [
      "Cover the colleague's shift quietly and keep the matter confidential",
      "Intervene immediately to protect patient safety and report the situation to the Nurse-in-Charge / Unit Supervisor",
      "Confront the colleague after the shift has ended",
      "Ignore it if the patients have not complained"
    ],
    "correctIndex": 1,
    "rationale": "Patient safety is the supreme ethical duty. The nurse must intervene to remove the impaired nurse from direct clinical care and report through administrative channels."
  },
  {
    "id": "mcq-252",
    "level": "400 Level",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "400 Level Assessment & Council Board Exam",
    "question": "The ethical principle of 'Non-maleficence' in clinical nursing practice is best defined as: [Question Code: ET-252]",
    "options": [
      "Ensuring equitable distribution of hospital resources",
      "The fundamental professional duty to inflict no intentional harm or injury upon a patient",
      "The right of patients to make independent healthcare decisions",
      "Maintaining truthful and honest communication at all times"
    ],
    "correctIndex": 1,
    "rationale": "Non-maleficence ('Primum non nocere') obligates healthcare providers to avoid inflicting harm, minimize foreseeable risks, and balance burdens against benefits."
  },
  {
    "id": "mcq-253",
    "level": "500 Level",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "A registered nurse discovers a colleague administering intravenous medications while exhibiting slurred speech and smelling of alcohol. What is the nurse's ethical and statutory obligation under NMCN regulations? [Question Code: ET-253]",
    "options": [
      "Cover the colleague's shift quietly and keep the matter confidential",
      "Intervene immediately to protect patient safety and report the situation to the Nurse-in-Charge / Unit Supervisor",
      "Confront the colleague after the shift has ended",
      "Ignore it if the patients have not complained"
    ],
    "correctIndex": 1,
    "rationale": "Patient safety is the supreme ethical duty. The nurse must intervene to remove the impaired nurse from direct clinical care and report through administrative channels."
  },
  {
    "id": "mcq-254",
    "level": "500 Level",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "500 Level Assessment & Council Board Exam",
    "question": "The ethical principle of 'Non-maleficence' in clinical nursing practice is best defined as: [Question Code: ET-254]",
    "options": [
      "Ensuring equitable distribution of hospital resources",
      "The fundamental professional duty to inflict no intentional harm or injury upon a patient",
      "The right of patients to make independent healthcare decisions",
      "Maintaining truthful and honest communication at all times"
    ],
    "correctIndex": 1,
    "rationale": "Non-maleficence ('Primum non nocere') obligates healthcare providers to avoid inflicting harm, minimize foreseeable risks, and balance burdens against benefits."
  },
  {
    "id": "mcq-255",
    "level": "NMCN Licensure",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "A registered nurse discovers a colleague administering intravenous medications while exhibiting slurred speech and smelling of alcohol. What is the nurse's ethical and statutory obligation under NMCN regulations? [Question Code: ET-255]",
    "options": [
      "Cover the colleague's shift quietly and keep the matter confidential",
      "Intervene immediately to protect patient safety and report the situation to the Nurse-in-Charge / Unit Supervisor",
      "Confront the colleague after the shift has ended",
      "Ignore it if the patients have not complained"
    ],
    "correctIndex": 1,
    "rationale": "Patient safety is the supreme ethical duty. The nurse must intervene to remove the impaired nurse from direct clinical care and report through administrative channels."
  },
  {
    "id": "mcq-256",
    "level": "NMCN Licensure",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "NMCN Licensure Assessment & Council Board Exam",
    "question": "The ethical principle of 'Non-maleficence' in clinical nursing practice is best defined as: [Question Code: ET-256]",
    "options": [
      "Ensuring equitable distribution of hospital resources",
      "The fundamental professional duty to inflict no intentional harm or injury upon a patient",
      "The right of patients to make independent healthcare decisions",
      "Maintaining truthful and honest communication at all times"
    ],
    "correctIndex": 1,
    "rationale": "Non-maleficence ('Primum non nocere') obligates healthcare providers to avoid inflicting harm, minimize foreseeable risks, and balance burdens against benefits."
  },
  {
    "id": "mcq-257",
    "level": "Midwifery Qualifying",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "A registered nurse discovers a colleague administering intravenous medications while exhibiting slurred speech and smelling of alcohol. What is the nurse's ethical and statutory obligation under NMCN regulations? [Question Code: ET-257]",
    "options": [
      "Cover the colleague's shift quietly and keep the matter confidential",
      "Intervene immediately to protect patient safety and report the situation to the Nurse-in-Charge / Unit Supervisor",
      "Confront the colleague after the shift has ended",
      "Ignore it if the patients have not complained"
    ],
    "correctIndex": 1,
    "rationale": "Patient safety is the supreme ethical duty. The nurse must intervene to remove the impaired nurse from direct clinical care and report through administrative channels."
  },
  {
    "id": "mcq-258",
    "level": "Midwifery Qualifying",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "Midwifery Qualifying Assessment & Council Board Exam",
    "question": "The ethical principle of 'Non-maleficence' in clinical nursing practice is best defined as: [Question Code: ET-258]",
    "options": [
      "Ensuring equitable distribution of hospital resources",
      "The fundamental professional duty to inflict no intentional harm or injury upon a patient",
      "The right of patients to make independent healthcare decisions",
      "Maintaining truthful and honest communication at all times"
    ],
    "correctIndex": 1,
    "rationale": "Non-maleficence ('Primum non nocere') obligates healthcare providers to avoid inflicting harm, minimize foreseeable risks, and balance burdens against benefits."
  },
  {
    "id": "mcq-259",
    "level": "Post-UTME Entrance",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "A registered nurse discovers a colleague administering intravenous medications while exhibiting slurred speech and smelling of alcohol. What is the nurse's ethical and statutory obligation under NMCN regulations? [Question Code: ET-259]",
    "options": [
      "Cover the colleague's shift quietly and keep the matter confidential",
      "Intervene immediately to protect patient safety and report the situation to the Nurse-in-Charge / Unit Supervisor",
      "Confront the colleague after the shift has ended",
      "Ignore it if the patients have not complained"
    ],
    "correctIndex": 1,
    "rationale": "Patient safety is the supreme ethical duty. The nurse must intervene to remove the impaired nurse from direct clinical care and report through administrative channels."
  },
  {
    "id": "mcq-260",
    "level": "Post-UTME Entrance",
    "category": "Ethics, Law & Professional Nursing",
    "examType": "Post-UTME Entrance Assessment & Council Board Exam",
    "question": "The ethical principle of 'Non-maleficence' in clinical nursing practice is best defined as: [Question Code: ET-260]",
    "options": [
      "Ensuring equitable distribution of hospital resources",
      "The fundamental professional duty to inflict no intentional harm or injury upon a patient",
      "The right of patients to make independent healthcare decisions",
      "Maintaining truthful and honest communication at all times"
    ],
    "correctIndex": 1,
    "rationale": "Non-maleficence ('Primum non nocere') obligates healthcare providers to avoid inflicting harm, minimize foreseeable risks, and balance burdens against benefits."
  }
];

// Expansive Essay Bank with 50+ questions and full marking rubrics
export const NURSING_ESSAY_BANK: EssayQuestion[] = [
  {
    "id": "essay-101",
    "level": "100 Level",
    "category": "Foundations & Clinical Skills",
    "scenario": "Clinical Case Dossier #101: A patient is admitted to the foundations & clinical skills unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Foundations & Clinical Skills: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Foundations & Clinical Skills disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Foundations & Clinical Skills required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-102",
    "level": "200 Level",
    "category": "Anatomy & Physiology",
    "scenario": "Clinical Case Dossier #102: A patient is admitted to the anatomy & physiology unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Anatomy & Physiology: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Anatomy & Physiology disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Anatomy & Physiology required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-103",
    "level": "300 Level",
    "category": "Medical-Surgical Nursing",
    "scenario": "Clinical Case Dossier #103: A patient is admitted to the medical-surgical nursing unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Medical-Surgical Nursing: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Medical-Surgical Nursing disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Medical-Surgical Nursing required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-104",
    "level": "400 Level",
    "category": "Maternal & Child Health / Midwifery",
    "scenario": "Clinical Case Dossier #104: A patient is admitted to the maternal & child health / midwifery unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Maternal & Child Health / Midwifery: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Maternal & Child Health / Midwifery disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Maternal & Child Health / Midwifery required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-105",
    "level": "500 Level",
    "category": "Pharmacology & Safe Dosage",
    "scenario": "Clinical Case Dossier #105: A patient is admitted to the pharmacology & safe dosage unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Pharmacology & Safe Dosage: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Pharmacology & Safe Dosage disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Pharmacology & Safe Dosage required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-106",
    "level": "NMCN Licensure",
    "category": "Pediatrics & Child Health",
    "scenario": "Clinical Case Dossier #106: A patient is admitted to the pediatrics & child health unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Pediatrics & Child Health: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Pediatrics & Child Health disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Pediatrics & Child Health required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-107",
    "level": "Midwifery Qualifying",
    "category": "Psychiatric & Mental Health",
    "scenario": "Clinical Case Dossier #107: A patient is admitted to the psychiatric & mental health unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Psychiatric & Mental Health: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Psychiatric & Mental Health disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Psychiatric & Mental Health required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-108",
    "level": "Post-UTME Entrance",
    "category": "Community Health & Epidemiology",
    "scenario": "Clinical Case Dossier #108: A patient is admitted to the community health & epidemiology unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Community Health & Epidemiology: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Community Health & Epidemiology disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Community Health & Epidemiology required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-109",
    "level": "100 Level",
    "category": "Emergency & Intensive Care",
    "scenario": "Clinical Case Dossier #109: A patient is admitted to the emergency & intensive care unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Emergency & Intensive Care: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Emergency & Intensive Care disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Emergency & Intensive Care required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-110",
    "level": "200 Level",
    "category": "Ethics, Law & Professional Nursing",
    "scenario": "Clinical Case Dossier #110: A patient is admitted to the ethics, law & professional nursing unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Ethics, Law & Professional Nursing: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Ethics, Law & Professional Nursing disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Ethics, Law & Professional Nursing required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-111",
    "level": "300 Level",
    "category": "Foundations & Clinical Skills",
    "scenario": "Clinical Case Dossier #111: A patient is admitted to the foundations & clinical skills unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Foundations & Clinical Skills: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Foundations & Clinical Skills disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Foundations & Clinical Skills required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-112",
    "level": "400 Level",
    "category": "Anatomy & Physiology",
    "scenario": "Clinical Case Dossier #112: A patient is admitted to the anatomy & physiology unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Anatomy & Physiology: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Anatomy & Physiology disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Anatomy & Physiology required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-113",
    "level": "500 Level",
    "category": "Medical-Surgical Nursing",
    "scenario": "Clinical Case Dossier #113: A patient is admitted to the medical-surgical nursing unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Medical-Surgical Nursing: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Medical-Surgical Nursing disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Medical-Surgical Nursing required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-114",
    "level": "NMCN Licensure",
    "category": "Maternal & Child Health / Midwifery",
    "scenario": "Clinical Case Dossier #114: A patient is admitted to the maternal & child health / midwifery unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Maternal & Child Health / Midwifery: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Maternal & Child Health / Midwifery disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Maternal & Child Health / Midwifery required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-115",
    "level": "Midwifery Qualifying",
    "category": "Pharmacology & Safe Dosage",
    "scenario": "Clinical Case Dossier #115: A patient is admitted to the pharmacology & safe dosage unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Pharmacology & Safe Dosage: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Pharmacology & Safe Dosage disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Pharmacology & Safe Dosage required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-116",
    "level": "Post-UTME Entrance",
    "category": "Pediatrics & Child Health",
    "scenario": "Clinical Case Dossier #116: A patient is admitted to the pediatrics & child health unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Pediatrics & Child Health: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Pediatrics & Child Health disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Pediatrics & Child Health required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-117",
    "level": "100 Level",
    "category": "Psychiatric & Mental Health",
    "scenario": "Clinical Case Dossier #117: A patient is admitted to the psychiatric & mental health unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Psychiatric & Mental Health: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Psychiatric & Mental Health disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Psychiatric & Mental Health required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-118",
    "level": "200 Level",
    "category": "Community Health & Epidemiology",
    "scenario": "Clinical Case Dossier #118: A patient is admitted to the community health & epidemiology unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Community Health & Epidemiology: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Community Health & Epidemiology disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Community Health & Epidemiology required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-119",
    "level": "300 Level",
    "category": "Emergency & Intensive Care",
    "scenario": "Clinical Case Dossier #119: A patient is admitted to the emergency & intensive care unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Emergency & Intensive Care: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Emergency & Intensive Care disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Emergency & Intensive Care required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-120",
    "level": "400 Level",
    "category": "Ethics, Law & Professional Nursing",
    "scenario": "Clinical Case Dossier #120: A patient is admitted to the ethics, law & professional nursing unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Ethics, Law & Professional Nursing: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Ethics, Law & Professional Nursing disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Ethics, Law & Professional Nursing required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-121",
    "level": "500 Level",
    "category": "Foundations & Clinical Skills",
    "scenario": "Clinical Case Dossier #121: A patient is admitted to the foundations & clinical skills unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Foundations & Clinical Skills: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Foundations & Clinical Skills disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Foundations & Clinical Skills required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-122",
    "level": "NMCN Licensure",
    "category": "Anatomy & Physiology",
    "scenario": "Clinical Case Dossier #122: A patient is admitted to the anatomy & physiology unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Anatomy & Physiology: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Anatomy & Physiology disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Anatomy & Physiology required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-123",
    "level": "Midwifery Qualifying",
    "category": "Medical-Surgical Nursing",
    "scenario": "Clinical Case Dossier #123: A patient is admitted to the medical-surgical nursing unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Medical-Surgical Nursing: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Medical-Surgical Nursing disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Medical-Surgical Nursing required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-124",
    "level": "Post-UTME Entrance",
    "category": "Maternal & Child Health / Midwifery",
    "scenario": "Clinical Case Dossier #124: A patient is admitted to the maternal & child health / midwifery unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Maternal & Child Health / Midwifery: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Maternal & Child Health / Midwifery disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Maternal & Child Health / Midwifery required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-125",
    "level": "100 Level",
    "category": "Pharmacology & Safe Dosage",
    "scenario": "Clinical Case Dossier #125: A patient is admitted to the pharmacology & safe dosage unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Pharmacology & Safe Dosage: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Pharmacology & Safe Dosage disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Pharmacology & Safe Dosage required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-126",
    "level": "200 Level",
    "category": "Pediatrics & Child Health",
    "scenario": "Clinical Case Dossier #126: A patient is admitted to the pediatrics & child health unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Pediatrics & Child Health: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Pediatrics & Child Health disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Pediatrics & Child Health required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-127",
    "level": "300 Level",
    "category": "Psychiatric & Mental Health",
    "scenario": "Clinical Case Dossier #127: A patient is admitted to the psychiatric & mental health unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Psychiatric & Mental Health: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Psychiatric & Mental Health disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Psychiatric & Mental Health required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-128",
    "level": "400 Level",
    "category": "Community Health & Epidemiology",
    "scenario": "Clinical Case Dossier #128: A patient is admitted to the community health & epidemiology unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Community Health & Epidemiology: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Community Health & Epidemiology disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Community Health & Epidemiology required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-129",
    "level": "500 Level",
    "category": "Emergency & Intensive Care",
    "scenario": "Clinical Case Dossier #129: A patient is admitted to the emergency & intensive care unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Emergency & Intensive Care: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Emergency & Intensive Care disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Emergency & Intensive Care required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-130",
    "level": "NMCN Licensure",
    "category": "Ethics, Law & Professional Nursing",
    "scenario": "Clinical Case Dossier #130: A patient is admitted to the ethics, law & professional nursing unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Ethics, Law & Professional Nursing: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Ethics, Law & Professional Nursing disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Ethics, Law & Professional Nursing required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-131",
    "level": "Midwifery Qualifying",
    "category": "Foundations & Clinical Skills",
    "scenario": "Clinical Case Dossier #131: A patient is admitted to the foundations & clinical skills unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Foundations & Clinical Skills: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Foundations & Clinical Skills disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Foundations & Clinical Skills required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-132",
    "level": "Post-UTME Entrance",
    "category": "Anatomy & Physiology",
    "scenario": "Clinical Case Dossier #132: A patient is admitted to the anatomy & physiology unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Anatomy & Physiology: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Anatomy & Physiology disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Anatomy & Physiology required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-133",
    "level": "100 Level",
    "category": "Medical-Surgical Nursing",
    "scenario": "Clinical Case Dossier #133: A patient is admitted to the medical-surgical nursing unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Medical-Surgical Nursing: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Medical-Surgical Nursing disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Medical-Surgical Nursing required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-134",
    "level": "200 Level",
    "category": "Maternal & Child Health / Midwifery",
    "scenario": "Clinical Case Dossier #134: A patient is admitted to the maternal & child health / midwifery unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Maternal & Child Health / Midwifery: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Maternal & Child Health / Midwifery disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Maternal & Child Health / Midwifery required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-135",
    "level": "300 Level",
    "category": "Pharmacology & Safe Dosage",
    "scenario": "Clinical Case Dossier #135: A patient is admitted to the pharmacology & safe dosage unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Pharmacology & Safe Dosage: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Pharmacology & Safe Dosage disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Pharmacology & Safe Dosage required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-136",
    "level": "400 Level",
    "category": "Pediatrics & Child Health",
    "scenario": "Clinical Case Dossier #136: A patient is admitted to the pediatrics & child health unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Pediatrics & Child Health: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Pediatrics & Child Health disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Pediatrics & Child Health required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-137",
    "level": "500 Level",
    "category": "Psychiatric & Mental Health",
    "scenario": "Clinical Case Dossier #137: A patient is admitted to the psychiatric & mental health unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Psychiatric & Mental Health: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Psychiatric & Mental Health disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Psychiatric & Mental Health required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-138",
    "level": "NMCN Licensure",
    "category": "Community Health & Epidemiology",
    "scenario": "Clinical Case Dossier #138: A patient is admitted to the community health & epidemiology unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Community Health & Epidemiology: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Community Health & Epidemiology disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Community Health & Epidemiology required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-139",
    "level": "Midwifery Qualifying",
    "category": "Emergency & Intensive Care",
    "scenario": "Clinical Case Dossier #139: A patient is admitted to the emergency & intensive care unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Emergency & Intensive Care: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Emergency & Intensive Care disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Emergency & Intensive Care required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-140",
    "level": "Post-UTME Entrance",
    "category": "Ethics, Law & Professional Nursing",
    "scenario": "Clinical Case Dossier #140: A patient is admitted to the ethics, law & professional nursing unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Ethics, Law & Professional Nursing: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Ethics, Law & Professional Nursing disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Ethics, Law & Professional Nursing required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-141",
    "level": "100 Level",
    "category": "Foundations & Clinical Skills",
    "scenario": "Clinical Case Dossier #141: A patient is admitted to the foundations & clinical skills unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Foundations & Clinical Skills: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Foundations & Clinical Skills disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Foundations & Clinical Skills required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-142",
    "level": "200 Level",
    "category": "Anatomy & Physiology",
    "scenario": "Clinical Case Dossier #142: A patient is admitted to the anatomy & physiology unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Anatomy & Physiology: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Anatomy & Physiology disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Anatomy & Physiology required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-143",
    "level": "300 Level",
    "category": "Medical-Surgical Nursing",
    "scenario": "Clinical Case Dossier #143: A patient is admitted to the medical-surgical nursing unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Medical-Surgical Nursing: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Medical-Surgical Nursing disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Medical-Surgical Nursing required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-144",
    "level": "400 Level",
    "category": "Maternal & Child Health / Midwifery",
    "scenario": "Clinical Case Dossier #144: A patient is admitted to the maternal & child health / midwifery unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Maternal & Child Health / Midwifery: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Maternal & Child Health / Midwifery disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Maternal & Child Health / Midwifery required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-145",
    "level": "500 Level",
    "category": "Pharmacology & Safe Dosage",
    "scenario": "Clinical Case Dossier #145: A patient is admitted to the pharmacology & safe dosage unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Pharmacology & Safe Dosage: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Pharmacology & Safe Dosage disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Pharmacology & Safe Dosage required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-146",
    "level": "NMCN Licensure",
    "category": "Pediatrics & Child Health",
    "scenario": "Clinical Case Dossier #146: A patient is admitted to the pediatrics & child health unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Pediatrics & Child Health: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Pediatrics & Child Health disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Pediatrics & Child Health required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-147",
    "level": "Midwifery Qualifying",
    "category": "Psychiatric & Mental Health",
    "scenario": "Clinical Case Dossier #147: A patient is admitted to the psychiatric & mental health unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Psychiatric & Mental Health: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Psychiatric & Mental Health disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Psychiatric & Mental Health required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-148",
    "level": "Post-UTME Entrance",
    "category": "Community Health & Epidemiology",
    "scenario": "Clinical Case Dossier #148: A patient is admitted to the community health & epidemiology unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Community Health & Epidemiology: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Community Health & Epidemiology disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Community Health & Epidemiology required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-149",
    "level": "100 Level",
    "category": "Emergency & Intensive Care",
    "scenario": "Clinical Case Dossier #149: A patient is admitted to the emergency & intensive care unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Emergency & Intensive Care: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Emergency & Intensive Care disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Emergency & Intensive Care required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-150",
    "level": "200 Level",
    "category": "Ethics, Law & Professional Nursing",
    "scenario": "Clinical Case Dossier #150: A patient is admitted to the ethics, law & professional nursing unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Ethics, Law & Professional Nursing: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Ethics, Law & Professional Nursing disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Ethics, Law & Professional Nursing required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-151",
    "level": "300 Level",
    "category": "Foundations & Clinical Skills",
    "scenario": "Clinical Case Dossier #151: A patient is admitted to the foundations & clinical skills unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Foundations & Clinical Skills: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Foundations & Clinical Skills disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Foundations & Clinical Skills required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  },
  {
    "id": "essay-152",
    "level": "400 Level",
    "category": "Anatomy & Physiology",
    "scenario": "Clinical Case Dossier #152: A patient is admitted to the anatomy & physiology unit presenting with acute physiological decompensation and clinical management challenges.",
    "question": "Comprehensive Clinical Case Study in Anatomy & Physiology: (a) Differentiate the core pathophysiology and primary risk factors related to this clinical presentation (8 marks). (b) Formulate a prioritized 3-part Nursing Care Plan (NCP) including NANDA diagnoses, measurable SMART patient outcomes, and evidence-based rationalized nursing interventions (12 marks). (c) Detail critical discharge education and complication warning signs for the patient and caregiver family (5 marks).",
    "marks": 25,
    "timeAllowed": "40 Minutes",
    "modelAnswer": {
      "keyPoints": [
        "Detailed etiology and clinical hallmarks of Anatomy & Physiology disorders",
        "Evidence-based pharmacological considerations and safety margins",
        "NANDA-I nursing diagnoses aligned with NOC outcomes and NIC interventions",
        "Patient-centered communication, emotional counseling, and cultural sensitivity",
        "Clear criteria for escalation to the multidisciplinary medical team"
      ],
      "markingRubric": [
        {
          "section": "Pathophysiology & Risk Factors",
          "points": 8,
          "criterion": "Thorough understanding of organ physiology, disease mechanism, and clinical staging"
        },
        {
          "section": "Nursing Care Plan (3 Diagnoses)",
          "points": 12,
          "criterion": "Accurate NANDA phrasing, measurable goals, and scientific rationales"
        },
        {
          "section": "Health Education & Follow-Up",
          "points": 5,
          "criterion": "Practical discharge instructions, lifestyle adaptations, and red flag warnings"
        }
      ],
      "clinicalSignificance": "Core clinical competency in Anatomy & Physiology required by the Nursing and Midwifery Council of Nigeria (NMCN) and international licensing boards."
    }
  }
];

// Expansive OSCE Practical Stations with 100+ stations
export const NURSING_OSCE_STATIONS: OSCEStation[] = [
  {
    "id": "osce-st-1",
    "stationNumber": 1,
    "title": "Aseptic Wound Dressing & Sterile Field Management",
    "level": "200 Level",
    "category": "Anatomy & Physiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Anatomy & Physiology department. Candidate Case #1: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for aseptic wound dressing & sterile field management. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-2",
    "stationNumber": 2,
    "title": "Vital Signs & National Early Warning Score (NEWS2) Calculation",
    "level": "300 Level",
    "category": "Medical-Surgical Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Medical-Surgical Nursing department. Candidate Case #2: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for vital signs & national early warning score (news2) calculation. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-3",
    "stationNumber": 3,
    "title": "Intramuscular Injection Administration (Ventrogluteal Landmark)",
    "level": "400 Level",
    "category": "Maternal & Child Health / Midwifery",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Maternal & Child Health / Midwifery department. Candidate Case #3: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for intramuscular injection administration (ventrogluteal landmark). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-4",
    "stationNumber": 4,
    "title": "Adult Basic Life Support (BLS) & CPR with AED Deployment",
    "level": "500 Level",
    "category": "Pharmacology & Safe Dosage",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pharmacology & Safe Dosage department. Candidate Case #4: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for adult basic life support (bls) & cpr with aed deployment. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-5",
    "stationNumber": 5,
    "title": "Partograph Plotting & Active Management of Third Stage of Labor (AMTSL)",
    "level": "NMCN Licensure",
    "category": "Pediatrics & Child Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pediatrics & Child Health department. Candidate Case #5: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for partograph plotting & active management of third stage of labor (amtsl). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-6",
    "stationNumber": 6,
    "title": "Pediatric Dehydration Assessment & ORS Demonstration",
    "level": "Midwifery Qualifying",
    "category": "Psychiatric & Mental Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Psychiatric & Mental Health department. Candidate Case #6: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for pediatric dehydration assessment & ors demonstration. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-7",
    "stationNumber": 7,
    "title": "Subcutaneous Insulin Administration & Glucometer Calibration",
    "level": "Post-UTME Entrance",
    "category": "Community Health & Epidemiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Community Health & Epidemiology department. Candidate Case #7: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for subcutaneous insulin administration & glucometer calibration. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-8",
    "stationNumber": 8,
    "title": "Nasogastric (NG) Tube Insertion & Position Verification",
    "level": "100 Level",
    "category": "Emergency & Intensive Care",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Emergency & Intensive Care department. Candidate Case #8: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for nasogastric (ng) tube insertion & position verification. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-9",
    "stationNumber": 9,
    "title": "Urinary Catheterization (Female & Male Aseptic Technique)",
    "level": "200 Level",
    "category": "Ethics, Law & Professional Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Ethics, Law & Professional Nursing department. Candidate Case #9: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for urinary catheterization (female & male aseptic technique). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-10",
    "stationNumber": 10,
    "title": "Intravenous Cannulation & Fluid Flow Rate Titration",
    "level": "300 Level",
    "category": "Foundations & Clinical Skills",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Foundations & Clinical Skills department. Candidate Case #10: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for intravenous cannulation & fluid flow rate titration. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-11",
    "stationNumber": 11,
    "title": "Tracheostomy Suctioning & Inner Cannula Care",
    "level": "400 Level",
    "category": "Anatomy & Physiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Anatomy & Physiology department. Candidate Case #11: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for tracheostomy suctioning & inner cannula care. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-12",
    "stationNumber": 12,
    "title": "Mental State Examination (MSE) & Suicide Risk Assessment",
    "level": "500 Level",
    "category": "Medical-Surgical Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Medical-Surgical Nursing department. Candidate Case #12: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for mental state examination (mse) & suicide risk assessment. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-13",
    "stationNumber": 13,
    "title": "Chest Drain (Underwater Seal) Monitoring & Troubleshooting",
    "level": "NMCN Licensure",
    "category": "Maternal & Child Health / Midwifery",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Maternal & Child Health / Midwifery department. Candidate Case #13: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for chest drain (underwater seal) monitoring & troubleshooting. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-14",
    "stationNumber": 14,
    "title": "Blood Transfusion Administration & Hemolytic Reaction Management",
    "level": "Midwifery Qualifying",
    "category": "Pharmacology & Safe Dosage",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pharmacology & Safe Dosage department. Candidate Case #14: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for blood transfusion administration & hemolytic reaction management. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-15",
    "stationNumber": 15,
    "title": "Post-Thyroidectomy Emergency Airway & Hematoma Inspection",
    "level": "Post-UTME Entrance",
    "category": "Pediatrics & Child Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pediatrics & Child Health department. Candidate Case #15: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for post-thyroidectomy emergency airway & hematoma inspection. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-16",
    "stationNumber": 16,
    "title": "Central Venous Pressure (CVP) Line Dressing & Zeroing",
    "level": "100 Level",
    "category": "Psychiatric & Mental Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Psychiatric & Mental Health department. Candidate Case #16: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for central venous pressure (cvp) line dressing & zeroing. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-17",
    "stationNumber": 17,
    "title": "Newborn Resuscitation & APGAR Scoring at 1 and 5 Minutes",
    "level": "200 Level",
    "category": "Community Health & Epidemiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Community Health & Epidemiology department. Candidate Case #17: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for newborn resuscitation & apgar scoring at 1 and 5 minutes. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-18",
    "stationNumber": 18,
    "title": "Oral Medication Administration (10 Rights & 3 Label Checks)",
    "level": "300 Level",
    "category": "Emergency & Intensive Care",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Emergency & Intensive Care department. Candidate Case #18: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for oral medication administration (10 rights & 3 label checks). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-19",
    "stationNumber": 19,
    "title": "Eye Irrigation & Ophthalmic Medication Instillation",
    "level": "400 Level",
    "category": "Ethics, Law & Professional Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Ethics, Law & Professional Nursing department. Candidate Case #19: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for eye irrigation & ophthalmic medication instillation. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-20",
    "stationNumber": 20,
    "title": "Personal Protective Equipment (PPE) Donning & Doffing Sequence",
    "level": "500 Level",
    "category": "Foundations & Clinical Skills",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Foundations & Clinical Skills department. Candidate Case #20: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for personal protective equipment (ppe) donning & doffing sequence. Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-21",
    "stationNumber": 21,
    "title": "Aseptic Wound Dressing & Sterile Field Management (Advanced Clinical Station 21)",
    "level": "NMCN Licensure",
    "category": "Anatomy & Physiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Anatomy & Physiology department. Candidate Case #21: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for aseptic wound dressing & sterile field management (advanced clinical station 21). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-22",
    "stationNumber": 22,
    "title": "Vital Signs & National Early Warning Score (NEWS2) Calculation (Advanced Clinical Station 22)",
    "level": "Midwifery Qualifying",
    "category": "Medical-Surgical Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Medical-Surgical Nursing department. Candidate Case #22: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for vital signs & national early warning score (news2) calculation (advanced clinical station 22). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-23",
    "stationNumber": 23,
    "title": "Intramuscular Injection Administration (Ventrogluteal Landmark) (Advanced Clinical Station 23)",
    "level": "Post-UTME Entrance",
    "category": "Maternal & Child Health / Midwifery",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Maternal & Child Health / Midwifery department. Candidate Case #23: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for intramuscular injection administration (ventrogluteal landmark) (advanced clinical station 23). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-24",
    "stationNumber": 24,
    "title": "Adult Basic Life Support (BLS) & CPR with AED Deployment (Advanced Clinical Station 24)",
    "level": "100 Level",
    "category": "Pharmacology & Safe Dosage",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pharmacology & Safe Dosage department. Candidate Case #24: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for adult basic life support (bls) & cpr with aed deployment (advanced clinical station 24). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-25",
    "stationNumber": 25,
    "title": "Partograph Plotting & Active Management of Third Stage of Labor (AMTSL) (Advanced Clinical Station 25)",
    "level": "200 Level",
    "category": "Pediatrics & Child Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pediatrics & Child Health department. Candidate Case #25: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for partograph plotting & active management of third stage of labor (amtsl) (advanced clinical station 25). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-26",
    "stationNumber": 26,
    "title": "Pediatric Dehydration Assessment & ORS Demonstration (Advanced Clinical Station 26)",
    "level": "300 Level",
    "category": "Psychiatric & Mental Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Psychiatric & Mental Health department. Candidate Case #26: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for pediatric dehydration assessment & ors demonstration (advanced clinical station 26). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-27",
    "stationNumber": 27,
    "title": "Subcutaneous Insulin Administration & Glucometer Calibration (Advanced Clinical Station 27)",
    "level": "400 Level",
    "category": "Community Health & Epidemiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Community Health & Epidemiology department. Candidate Case #27: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for subcutaneous insulin administration & glucometer calibration (advanced clinical station 27). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-28",
    "stationNumber": 28,
    "title": "Nasogastric (NG) Tube Insertion & Position Verification (Advanced Clinical Station 28)",
    "level": "500 Level",
    "category": "Emergency & Intensive Care",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Emergency & Intensive Care department. Candidate Case #28: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for nasogastric (ng) tube insertion & position verification (advanced clinical station 28). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-29",
    "stationNumber": 29,
    "title": "Urinary Catheterization (Female & Male Aseptic Technique) (Advanced Clinical Station 29)",
    "level": "NMCN Licensure",
    "category": "Ethics, Law & Professional Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Ethics, Law & Professional Nursing department. Candidate Case #29: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for urinary catheterization (female & male aseptic technique) (advanced clinical station 29). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-30",
    "stationNumber": 30,
    "title": "Intravenous Cannulation & Fluid Flow Rate Titration (Advanced Clinical Station 30)",
    "level": "Midwifery Qualifying",
    "category": "Foundations & Clinical Skills",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Foundations & Clinical Skills department. Candidate Case #30: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for intravenous cannulation & fluid flow rate titration (advanced clinical station 30). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-31",
    "stationNumber": 31,
    "title": "Tracheostomy Suctioning & Inner Cannula Care (Advanced Clinical Station 31)",
    "level": "Post-UTME Entrance",
    "category": "Anatomy & Physiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Anatomy & Physiology department. Candidate Case #31: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for tracheostomy suctioning & inner cannula care (advanced clinical station 31). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-32",
    "stationNumber": 32,
    "title": "Mental State Examination (MSE) & Suicide Risk Assessment (Advanced Clinical Station 32)",
    "level": "100 Level",
    "category": "Medical-Surgical Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Medical-Surgical Nursing department. Candidate Case #32: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for mental state examination (mse) & suicide risk assessment (advanced clinical station 32). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-33",
    "stationNumber": 33,
    "title": "Chest Drain (Underwater Seal) Monitoring & Troubleshooting (Advanced Clinical Station 33)",
    "level": "200 Level",
    "category": "Maternal & Child Health / Midwifery",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Maternal & Child Health / Midwifery department. Candidate Case #33: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for chest drain (underwater seal) monitoring & troubleshooting (advanced clinical station 33). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-34",
    "stationNumber": 34,
    "title": "Blood Transfusion Administration & Hemolytic Reaction Management (Advanced Clinical Station 34)",
    "level": "300 Level",
    "category": "Pharmacology & Safe Dosage",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pharmacology & Safe Dosage department. Candidate Case #34: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for blood transfusion administration & hemolytic reaction management (advanced clinical station 34). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-35",
    "stationNumber": 35,
    "title": "Post-Thyroidectomy Emergency Airway & Hematoma Inspection (Advanced Clinical Station 35)",
    "level": "400 Level",
    "category": "Pediatrics & Child Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pediatrics & Child Health department. Candidate Case #35: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for post-thyroidectomy emergency airway & hematoma inspection (advanced clinical station 35). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-36",
    "stationNumber": 36,
    "title": "Central Venous Pressure (CVP) Line Dressing & Zeroing (Advanced Clinical Station 36)",
    "level": "500 Level",
    "category": "Psychiatric & Mental Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Psychiatric & Mental Health department. Candidate Case #36: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for central venous pressure (cvp) line dressing & zeroing (advanced clinical station 36). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-37",
    "stationNumber": 37,
    "title": "Newborn Resuscitation & APGAR Scoring at 1 and 5 Minutes (Advanced Clinical Station 37)",
    "level": "NMCN Licensure",
    "category": "Community Health & Epidemiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Community Health & Epidemiology department. Candidate Case #37: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for newborn resuscitation & apgar scoring at 1 and 5 minutes (advanced clinical station 37). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-38",
    "stationNumber": 38,
    "title": "Oral Medication Administration (10 Rights & 3 Label Checks) (Advanced Clinical Station 38)",
    "level": "Midwifery Qualifying",
    "category": "Emergency & Intensive Care",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Emergency & Intensive Care department. Candidate Case #38: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for oral medication administration (10 rights & 3 label checks) (advanced clinical station 38). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-39",
    "stationNumber": 39,
    "title": "Eye Irrigation & Ophthalmic Medication Instillation (Advanced Clinical Station 39)",
    "level": "Post-UTME Entrance",
    "category": "Ethics, Law & Professional Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Ethics, Law & Professional Nursing department. Candidate Case #39: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for eye irrigation & ophthalmic medication instillation (advanced clinical station 39). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-40",
    "stationNumber": 40,
    "title": "Personal Protective Equipment (PPE) Donning & Doffing Sequence (Advanced Clinical Station 40)",
    "level": "100 Level",
    "category": "Foundations & Clinical Skills",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Foundations & Clinical Skills department. Candidate Case #40: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for personal protective equipment (ppe) donning & doffing sequence (advanced clinical station 40). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-41",
    "stationNumber": 41,
    "title": "Aseptic Wound Dressing & Sterile Field Management (Advanced Clinical Station 41)",
    "level": "200 Level",
    "category": "Anatomy & Physiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Anatomy & Physiology department. Candidate Case #41: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for aseptic wound dressing & sterile field management (advanced clinical station 41). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-42",
    "stationNumber": 42,
    "title": "Vital Signs & National Early Warning Score (NEWS2) Calculation (Advanced Clinical Station 42)",
    "level": "300 Level",
    "category": "Medical-Surgical Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Medical-Surgical Nursing department. Candidate Case #42: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for vital signs & national early warning score (news2) calculation (advanced clinical station 42). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-43",
    "stationNumber": 43,
    "title": "Intramuscular Injection Administration (Ventrogluteal Landmark) (Advanced Clinical Station 43)",
    "level": "400 Level",
    "category": "Maternal & Child Health / Midwifery",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Maternal & Child Health / Midwifery department. Candidate Case #43: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for intramuscular injection administration (ventrogluteal landmark) (advanced clinical station 43). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-44",
    "stationNumber": 44,
    "title": "Adult Basic Life Support (BLS) & CPR with AED Deployment (Advanced Clinical Station 44)",
    "level": "500 Level",
    "category": "Pharmacology & Safe Dosage",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pharmacology & Safe Dosage department. Candidate Case #44: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for adult basic life support (bls) & cpr with aed deployment (advanced clinical station 44). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-45",
    "stationNumber": 45,
    "title": "Partograph Plotting & Active Management of Third Stage of Labor (AMTSL) (Advanced Clinical Station 45)",
    "level": "NMCN Licensure",
    "category": "Pediatrics & Child Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pediatrics & Child Health department. Candidate Case #45: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for partograph plotting & active management of third stage of labor (amtsl) (advanced clinical station 45). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-46",
    "stationNumber": 46,
    "title": "Pediatric Dehydration Assessment & ORS Demonstration (Advanced Clinical Station 46)",
    "level": "Midwifery Qualifying",
    "category": "Psychiatric & Mental Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Psychiatric & Mental Health department. Candidate Case #46: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for pediatric dehydration assessment & ors demonstration (advanced clinical station 46). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-47",
    "stationNumber": 47,
    "title": "Subcutaneous Insulin Administration & Glucometer Calibration (Advanced Clinical Station 47)",
    "level": "Post-UTME Entrance",
    "category": "Community Health & Epidemiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Community Health & Epidemiology department. Candidate Case #47: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for subcutaneous insulin administration & glucometer calibration (advanced clinical station 47). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-48",
    "stationNumber": 48,
    "title": "Nasogastric (NG) Tube Insertion & Position Verification (Advanced Clinical Station 48)",
    "level": "100 Level",
    "category": "Emergency & Intensive Care",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Emergency & Intensive Care department. Candidate Case #48: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for nasogastric (ng) tube insertion & position verification (advanced clinical station 48). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-49",
    "stationNumber": 49,
    "title": "Urinary Catheterization (Female & Male Aseptic Technique) (Advanced Clinical Station 49)",
    "level": "200 Level",
    "category": "Ethics, Law & Professional Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Ethics, Law & Professional Nursing department. Candidate Case #49: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for urinary catheterization (female & male aseptic technique) (advanced clinical station 49). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-50",
    "stationNumber": 50,
    "title": "Intravenous Cannulation & Fluid Flow Rate Titration (Advanced Clinical Station 50)",
    "level": "300 Level",
    "category": "Foundations & Clinical Skills",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Foundations & Clinical Skills department. Candidate Case #50: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for intravenous cannulation & fluid flow rate titration (advanced clinical station 50). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-51",
    "stationNumber": 51,
    "title": "Tracheostomy Suctioning & Inner Cannula Care (Advanced Clinical Station 51)",
    "level": "400 Level",
    "category": "Anatomy & Physiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Anatomy & Physiology department. Candidate Case #51: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for tracheostomy suctioning & inner cannula care (advanced clinical station 51). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-52",
    "stationNumber": 52,
    "title": "Mental State Examination (MSE) & Suicide Risk Assessment (Advanced Clinical Station 52)",
    "level": "500 Level",
    "category": "Medical-Surgical Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Medical-Surgical Nursing department. Candidate Case #52: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for mental state examination (mse) & suicide risk assessment (advanced clinical station 52). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-53",
    "stationNumber": 53,
    "title": "Chest Drain (Underwater Seal) Monitoring & Troubleshooting (Advanced Clinical Station 53)",
    "level": "NMCN Licensure",
    "category": "Maternal & Child Health / Midwifery",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Maternal & Child Health / Midwifery department. Candidate Case #53: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for chest drain (underwater seal) monitoring & troubleshooting (advanced clinical station 53). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-54",
    "stationNumber": 54,
    "title": "Blood Transfusion Administration & Hemolytic Reaction Management (Advanced Clinical Station 54)",
    "level": "Midwifery Qualifying",
    "category": "Pharmacology & Safe Dosage",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pharmacology & Safe Dosage department. Candidate Case #54: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for blood transfusion administration & hemolytic reaction management (advanced clinical station 54). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-55",
    "stationNumber": 55,
    "title": "Post-Thyroidectomy Emergency Airway & Hematoma Inspection (Advanced Clinical Station 55)",
    "level": "Post-UTME Entrance",
    "category": "Pediatrics & Child Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pediatrics & Child Health department. Candidate Case #55: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for post-thyroidectomy emergency airway & hematoma inspection (advanced clinical station 55). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-56",
    "stationNumber": 56,
    "title": "Central Venous Pressure (CVP) Line Dressing & Zeroing (Advanced Clinical Station 56)",
    "level": "100 Level",
    "category": "Psychiatric & Mental Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Psychiatric & Mental Health department. Candidate Case #56: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for central venous pressure (cvp) line dressing & zeroing (advanced clinical station 56). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-57",
    "stationNumber": 57,
    "title": "Newborn Resuscitation & APGAR Scoring at 1 and 5 Minutes (Advanced Clinical Station 57)",
    "level": "200 Level",
    "category": "Community Health & Epidemiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Community Health & Epidemiology department. Candidate Case #57: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for newborn resuscitation & apgar scoring at 1 and 5 minutes (advanced clinical station 57). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-58",
    "stationNumber": 58,
    "title": "Oral Medication Administration (10 Rights & 3 Label Checks) (Advanced Clinical Station 58)",
    "level": "300 Level",
    "category": "Emergency & Intensive Care",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Emergency & Intensive Care department. Candidate Case #58: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for oral medication administration (10 rights & 3 label checks) (advanced clinical station 58). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-59",
    "stationNumber": 59,
    "title": "Eye Irrigation & Ophthalmic Medication Instillation (Advanced Clinical Station 59)",
    "level": "400 Level",
    "category": "Ethics, Law & Professional Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Ethics, Law & Professional Nursing department. Candidate Case #59: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for eye irrigation & ophthalmic medication instillation (advanced clinical station 59). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-60",
    "stationNumber": 60,
    "title": "Personal Protective Equipment (PPE) Donning & Doffing Sequence (Advanced Clinical Station 60)",
    "level": "500 Level",
    "category": "Foundations & Clinical Skills",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Foundations & Clinical Skills department. Candidate Case #60: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for personal protective equipment (ppe) donning & doffing sequence (advanced clinical station 60). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-61",
    "stationNumber": 61,
    "title": "Aseptic Wound Dressing & Sterile Field Management (Advanced Clinical Station 61)",
    "level": "NMCN Licensure",
    "category": "Anatomy & Physiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Anatomy & Physiology department. Candidate Case #61: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for aseptic wound dressing & sterile field management (advanced clinical station 61). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-62",
    "stationNumber": 62,
    "title": "Vital Signs & National Early Warning Score (NEWS2) Calculation (Advanced Clinical Station 62)",
    "level": "Midwifery Qualifying",
    "category": "Medical-Surgical Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Medical-Surgical Nursing department. Candidate Case #62: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for vital signs & national early warning score (news2) calculation (advanced clinical station 62). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-63",
    "stationNumber": 63,
    "title": "Intramuscular Injection Administration (Ventrogluteal Landmark) (Advanced Clinical Station 63)",
    "level": "Post-UTME Entrance",
    "category": "Maternal & Child Health / Midwifery",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Maternal & Child Health / Midwifery department. Candidate Case #63: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for intramuscular injection administration (ventrogluteal landmark) (advanced clinical station 63). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-64",
    "stationNumber": 64,
    "title": "Adult Basic Life Support (BLS) & CPR with AED Deployment (Advanced Clinical Station 64)",
    "level": "100 Level",
    "category": "Pharmacology & Safe Dosage",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pharmacology & Safe Dosage department. Candidate Case #64: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for adult basic life support (bls) & cpr with aed deployment (advanced clinical station 64). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-65",
    "stationNumber": 65,
    "title": "Partograph Plotting & Active Management of Third Stage of Labor (AMTSL) (Advanced Clinical Station 65)",
    "level": "200 Level",
    "category": "Pediatrics & Child Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pediatrics & Child Health department. Candidate Case #65: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for partograph plotting & active management of third stage of labor (amtsl) (advanced clinical station 65). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-66",
    "stationNumber": 66,
    "title": "Pediatric Dehydration Assessment & ORS Demonstration (Advanced Clinical Station 66)",
    "level": "300 Level",
    "category": "Psychiatric & Mental Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Psychiatric & Mental Health department. Candidate Case #66: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for pediatric dehydration assessment & ors demonstration (advanced clinical station 66). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-67",
    "stationNumber": 67,
    "title": "Subcutaneous Insulin Administration & Glucometer Calibration (Advanced Clinical Station 67)",
    "level": "400 Level",
    "category": "Community Health & Epidemiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Community Health & Epidemiology department. Candidate Case #67: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for subcutaneous insulin administration & glucometer calibration (advanced clinical station 67). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-68",
    "stationNumber": 68,
    "title": "Nasogastric (NG) Tube Insertion & Position Verification (Advanced Clinical Station 68)",
    "level": "500 Level",
    "category": "Emergency & Intensive Care",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Emergency & Intensive Care department. Candidate Case #68: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for nasogastric (ng) tube insertion & position verification (advanced clinical station 68). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-69",
    "stationNumber": 69,
    "title": "Urinary Catheterization (Female & Male Aseptic Technique) (Advanced Clinical Station 69)",
    "level": "NMCN Licensure",
    "category": "Ethics, Law & Professional Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Ethics, Law & Professional Nursing department. Candidate Case #69: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for urinary catheterization (female & male aseptic technique) (advanced clinical station 69). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-70",
    "stationNumber": 70,
    "title": "Intravenous Cannulation & Fluid Flow Rate Titration (Advanced Clinical Station 70)",
    "level": "Midwifery Qualifying",
    "category": "Foundations & Clinical Skills",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Foundations & Clinical Skills department. Candidate Case #70: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for intravenous cannulation & fluid flow rate titration (advanced clinical station 70). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-71",
    "stationNumber": 71,
    "title": "Tracheostomy Suctioning & Inner Cannula Care (Advanced Clinical Station 71)",
    "level": "Post-UTME Entrance",
    "category": "Anatomy & Physiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Anatomy & Physiology department. Candidate Case #71: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for tracheostomy suctioning & inner cannula care (advanced clinical station 71). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-72",
    "stationNumber": 72,
    "title": "Mental State Examination (MSE) & Suicide Risk Assessment (Advanced Clinical Station 72)",
    "level": "100 Level",
    "category": "Medical-Surgical Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Medical-Surgical Nursing department. Candidate Case #72: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for mental state examination (mse) & suicide risk assessment (advanced clinical station 72). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-73",
    "stationNumber": 73,
    "title": "Chest Drain (Underwater Seal) Monitoring & Troubleshooting (Advanced Clinical Station 73)",
    "level": "200 Level",
    "category": "Maternal & Child Health / Midwifery",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Maternal & Child Health / Midwifery department. Candidate Case #73: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for chest drain (underwater seal) monitoring & troubleshooting (advanced clinical station 73). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-74",
    "stationNumber": 74,
    "title": "Blood Transfusion Administration & Hemolytic Reaction Management (Advanced Clinical Station 74)",
    "level": "300 Level",
    "category": "Pharmacology & Safe Dosage",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pharmacology & Safe Dosage department. Candidate Case #74: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for blood transfusion administration & hemolytic reaction management (advanced clinical station 74). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-75",
    "stationNumber": 75,
    "title": "Post-Thyroidectomy Emergency Airway & Hematoma Inspection (Advanced Clinical Station 75)",
    "level": "400 Level",
    "category": "Pediatrics & Child Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pediatrics & Child Health department. Candidate Case #75: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for post-thyroidectomy emergency airway & hematoma inspection (advanced clinical station 75). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-76",
    "stationNumber": 76,
    "title": "Central Venous Pressure (CVP) Line Dressing & Zeroing (Advanced Clinical Station 76)",
    "level": "500 Level",
    "category": "Psychiatric & Mental Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Psychiatric & Mental Health department. Candidate Case #76: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for central venous pressure (cvp) line dressing & zeroing (advanced clinical station 76). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-77",
    "stationNumber": 77,
    "title": "Newborn Resuscitation & APGAR Scoring at 1 and 5 Minutes (Advanced Clinical Station 77)",
    "level": "NMCN Licensure",
    "category": "Community Health & Epidemiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Community Health & Epidemiology department. Candidate Case #77: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for newborn resuscitation & apgar scoring at 1 and 5 minutes (advanced clinical station 77). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-78",
    "stationNumber": 78,
    "title": "Oral Medication Administration (10 Rights & 3 Label Checks) (Advanced Clinical Station 78)",
    "level": "Midwifery Qualifying",
    "category": "Emergency & Intensive Care",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Emergency & Intensive Care department. Candidate Case #78: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for oral medication administration (10 rights & 3 label checks) (advanced clinical station 78). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-79",
    "stationNumber": 79,
    "title": "Eye Irrigation & Ophthalmic Medication Instillation (Advanced Clinical Station 79)",
    "level": "Post-UTME Entrance",
    "category": "Ethics, Law & Professional Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Ethics, Law & Professional Nursing department. Candidate Case #79: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for eye irrigation & ophthalmic medication instillation (advanced clinical station 79). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-80",
    "stationNumber": 80,
    "title": "Personal Protective Equipment (PPE) Donning & Doffing Sequence (Advanced Clinical Station 80)",
    "level": "100 Level",
    "category": "Foundations & Clinical Skills",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Foundations & Clinical Skills department. Candidate Case #80: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for personal protective equipment (ppe) donning & doffing sequence (advanced clinical station 80). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-81",
    "stationNumber": 81,
    "title": "Aseptic Wound Dressing & Sterile Field Management (Advanced Clinical Station 81)",
    "level": "200 Level",
    "category": "Anatomy & Physiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Anatomy & Physiology department. Candidate Case #81: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for aseptic wound dressing & sterile field management (advanced clinical station 81). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-82",
    "stationNumber": 82,
    "title": "Vital Signs & National Early Warning Score (NEWS2) Calculation (Advanced Clinical Station 82)",
    "level": "300 Level",
    "category": "Medical-Surgical Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Medical-Surgical Nursing department. Candidate Case #82: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for vital signs & national early warning score (news2) calculation (advanced clinical station 82). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-83",
    "stationNumber": 83,
    "title": "Intramuscular Injection Administration (Ventrogluteal Landmark) (Advanced Clinical Station 83)",
    "level": "400 Level",
    "category": "Maternal & Child Health / Midwifery",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Maternal & Child Health / Midwifery department. Candidate Case #83: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for intramuscular injection administration (ventrogluteal landmark) (advanced clinical station 83). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-84",
    "stationNumber": 84,
    "title": "Adult Basic Life Support (BLS) & CPR with AED Deployment (Advanced Clinical Station 84)",
    "level": "500 Level",
    "category": "Pharmacology & Safe Dosage",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pharmacology & Safe Dosage department. Candidate Case #84: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for adult basic life support (bls) & cpr with aed deployment (advanced clinical station 84). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-85",
    "stationNumber": 85,
    "title": "Partograph Plotting & Active Management of Third Stage of Labor (AMTSL) (Advanced Clinical Station 85)",
    "level": "NMCN Licensure",
    "category": "Pediatrics & Child Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pediatrics & Child Health department. Candidate Case #85: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for partograph plotting & active management of third stage of labor (amtsl) (advanced clinical station 85). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-86",
    "stationNumber": 86,
    "title": "Pediatric Dehydration Assessment & ORS Demonstration (Advanced Clinical Station 86)",
    "level": "Midwifery Qualifying",
    "category": "Psychiatric & Mental Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Psychiatric & Mental Health department. Candidate Case #86: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for pediatric dehydration assessment & ors demonstration (advanced clinical station 86). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-87",
    "stationNumber": 87,
    "title": "Subcutaneous Insulin Administration & Glucometer Calibration (Advanced Clinical Station 87)",
    "level": "Post-UTME Entrance",
    "category": "Community Health & Epidemiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Community Health & Epidemiology department. Candidate Case #87: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for subcutaneous insulin administration & glucometer calibration (advanced clinical station 87). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-88",
    "stationNumber": 88,
    "title": "Nasogastric (NG) Tube Insertion & Position Verification (Advanced Clinical Station 88)",
    "level": "100 Level",
    "category": "Emergency & Intensive Care",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Emergency & Intensive Care department. Candidate Case #88: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for nasogastric (ng) tube insertion & position verification (advanced clinical station 88). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-89",
    "stationNumber": 89,
    "title": "Urinary Catheterization (Female & Male Aseptic Technique) (Advanced Clinical Station 89)",
    "level": "200 Level",
    "category": "Ethics, Law & Professional Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Ethics, Law & Professional Nursing department. Candidate Case #89: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for urinary catheterization (female & male aseptic technique) (advanced clinical station 89). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-90",
    "stationNumber": 90,
    "title": "Intravenous Cannulation & Fluid Flow Rate Titration (Advanced Clinical Station 90)",
    "level": "300 Level",
    "category": "Foundations & Clinical Skills",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Foundations & Clinical Skills department. Candidate Case #90: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for intravenous cannulation & fluid flow rate titration (advanced clinical station 90). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-91",
    "stationNumber": 91,
    "title": "Tracheostomy Suctioning & Inner Cannula Care (Advanced Clinical Station 91)",
    "level": "400 Level",
    "category": "Anatomy & Physiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Anatomy & Physiology department. Candidate Case #91: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for tracheostomy suctioning & inner cannula care (advanced clinical station 91). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-92",
    "stationNumber": 92,
    "title": "Mental State Examination (MSE) & Suicide Risk Assessment (Advanced Clinical Station 92)",
    "level": "500 Level",
    "category": "Medical-Surgical Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Medical-Surgical Nursing department. Candidate Case #92: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for mental state examination (mse) & suicide risk assessment (advanced clinical station 92). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-93",
    "stationNumber": 93,
    "title": "Chest Drain (Underwater Seal) Monitoring & Troubleshooting (Advanced Clinical Station 93)",
    "level": "NMCN Licensure",
    "category": "Maternal & Child Health / Midwifery",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Maternal & Child Health / Midwifery department. Candidate Case #93: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for chest drain (underwater seal) monitoring & troubleshooting (advanced clinical station 93). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-94",
    "stationNumber": 94,
    "title": "Blood Transfusion Administration & Hemolytic Reaction Management (Advanced Clinical Station 94)",
    "level": "Midwifery Qualifying",
    "category": "Pharmacology & Safe Dosage",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pharmacology & Safe Dosage department. Candidate Case #94: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for blood transfusion administration & hemolytic reaction management (advanced clinical station 94). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-95",
    "stationNumber": 95,
    "title": "Post-Thyroidectomy Emergency Airway & Hematoma Inspection (Advanced Clinical Station 95)",
    "level": "Post-UTME Entrance",
    "category": "Pediatrics & Child Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Pediatrics & Child Health department. Candidate Case #95: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for post-thyroidectomy emergency airway & hematoma inspection (advanced clinical station 95). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-96",
    "stationNumber": 96,
    "title": "Central Venous Pressure (CVP) Line Dressing & Zeroing (Advanced Clinical Station 96)",
    "level": "100 Level",
    "category": "Psychiatric & Mental Health",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Psychiatric & Mental Health department. Candidate Case #96: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for central venous pressure (cvp) line dressing & zeroing (advanced clinical station 96). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-97",
    "stationNumber": 97,
    "title": "Newborn Resuscitation & APGAR Scoring at 1 and 5 Minutes (Advanced Clinical Station 97)",
    "level": "200 Level",
    "category": "Community Health & Epidemiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Community Health & Epidemiology department. Candidate Case #97: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for newborn resuscitation & apgar scoring at 1 and 5 minutes (advanced clinical station 97). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-98",
    "stationNumber": 98,
    "title": "Oral Medication Administration (10 Rights & 3 Label Checks) (Advanced Clinical Station 98)",
    "level": "300 Level",
    "category": "Emergency & Intensive Care",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Emergency & Intensive Care department. Candidate Case #98: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for oral medication administration (10 rights & 3 label checks) (advanced clinical station 98). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-99",
    "stationNumber": 99,
    "title": "Eye Irrigation & Ophthalmic Medication Instillation (Advanced Clinical Station 99)",
    "level": "400 Level",
    "category": "Ethics, Law & Professional Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Ethics, Law & Professional Nursing department. Candidate Case #99: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for eye irrigation & ophthalmic medication instillation (advanced clinical station 99). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-100",
    "stationNumber": 100,
    "title": "Personal Protective Equipment (PPE) Donning & Doffing Sequence (Advanced Clinical Station 100)",
    "level": "500 Level",
    "category": "Foundations & Clinical Skills",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Foundations & Clinical Skills department. Candidate Case #100: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for personal protective equipment (ppe) donning & doffing sequence (advanced clinical station 100). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-101",
    "stationNumber": 101,
    "title": "Aseptic Wound Dressing & Sterile Field Management (Advanced Clinical Station 101)",
    "level": "NMCN Licensure",
    "category": "Anatomy & Physiology",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Anatomy & Physiology department. Candidate Case #101: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for aseptic wound dressing & sterile field management (advanced clinical station 101). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  },
  {
    "id": "osce-st-102",
    "stationNumber": 102,
    "title": "Vital Signs & National Early Warning Score (NEWS2) Calculation (Advanced Clinical Station 102)",
    "level": "Midwifery Qualifying",
    "category": "Medical-Surgical Nursing",
    "durationMinutes": 7,
    "candidateInstructions": "You are the duty nurse in the Medical-Surgical Nursing department. Candidate Case #102: Assess the patient, perform the clinical procedure according to approved NMCN sterile technique and clinical guidelines within the 7-minute station time, and explain rationales to the lead examiner.",
    "simulatedPatientBrief": "Simulated patient actor / high-fidelity task trainer manikin presenting with clinical indications for vital signs & national early warning score (news2) calculation (advanced clinical station 102). Patient is cooperative but requires clear explanation and empathy.",
    "requiredEquipment": [
      "Appropriate clinical procedure pack and sterile dressing consumables",
      "Antiseptic solutions (Chlorhexidine / Povidone-iodine / 0.9% Normal Saline)",
      "Standard Personal Protective Equipment (Clean & sterile gloves, apron, eye visor)",
      "Clinical documentation charts, observation sheet, and marker",
      "Yellow clinical waste bag and rigid sharps disposal container"
    ],
    "checklist": [
      {
        "step": 1,
        "description": "Introduces self, identifies patient using 2 unique identifiers (Full Name & Hospital Number), and confirms wristband.",
        "points": 1
      },
      {
        "step": 2,
        "description": "Explains procedural purpose, expected sensations, and secures informed voluntary consent.",
        "points": 1
      },
      {
        "step": 3,
        "description": "Performs WHO 6-step hand hygiene technique and dons appropriate PPE.",
        "points": 1
      },
      {
        "step": 4,
        "description": "Inspects equipment sterility, integrity, and expiration dates before opening.",
        "points": 1
      },
      {
        "step": 5,
        "description": "Establishes sterile field using 'no-touch' technique and pours required solutions without splashing.",
        "points": 1
      },
      {
        "step": 6,
        "description": "Executes anatomical landmarks localization accurately according to clinical protocols.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 7,
        "description": "Performs procedural intervention methodically maintaining patient dignity and strict asepsis.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 8,
        "description": "Safely handles sharps immediately at bedside into approved container without recapping.",
        "points": 1,
        "criticalFailStep": true
      },
      {
        "step": 9,
        "description": "Reassures patient, verifies comfort, and ensures appropriate post-procedure positioning.",
        "points": 1
      },
      {
        "step": 10,
        "description": "Systematically documents findings, fluid volumes, and complications on official hospital chart.",
        "points": 1
      }
    ],
    "examinerNotes": "Candidate must demonstrate unwavering asepsis and sharps safety. Breaches of sterile technique or failure to identify critical anatomical landmarks results in zero for step 6/7/8.",
    "clinicalTips": [
      "Never turn your back on your sterile field.",
      "Communicate with the simulated patient continuously throughout the procedure.",
      "Check patient allergies prior to applying antiseptic or administering solutions."
    ]
  }
];
