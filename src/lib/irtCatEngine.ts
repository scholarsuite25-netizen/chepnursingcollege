/**
 * 3-Parameter Logistic (3PL) Item Response Theory (IRT)
 * Computerized Adaptive Testing (CAT) Engine
 * Modeled strictly after NCSBN Next-Generation NCLEX & psychometric standards
 */

export interface CATItem {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  a: number; // Discrimination parameter (0.5 to 2.5)
  b: number; // Difficulty parameter (-2.5 to +2.5)
  c: number; // Guessing parameter (typically 0.20 or 0.25)
  domain: string;
  rationale: string;
}

export interface CATResponse {
  itemId: string;
  selectedOption: number;
  isCorrect: boolean;
  thetaEstimateAfter: number;
  semAfter: number;
}

export interface CATSessionState {
  candidateId: string;
  theta: number; // Current latent ability estimate (-3.0 to +3.0, 0.0 = average)
  sem: number;   // Standard Error of Measurement
  responses: CATResponse[];
  administeredItemIds: string[];
  isComplete: boolean;
  finalDecision: "PASS" | "FAIL" | "IN_PROGRESS";
  confidenceInterval: [number, number]; // [theta - 1.96*sem, theta + 1.96*sem]
}

/**
 * 3PL Probability Function P_i(theta)
 */
export function probability3PL(theta: number, a: number, b: number, c: number): number {
  const exponent = -a * (theta - b);
  // Guard against exponential overflow
  if (exponent > 40) return c;
  if (exponent < -40) return 1.0;
  return c + (1.0 - c) / (1.0 + Math.exp(exponent));
}

/**
 * Fisher Information Function I_i(theta)
 */
export function fisherInformation(theta: number, a: number, b: number, c: number): number {
  const p = probability3PL(theta, a, b, c);
  if (p <= c || p >= 1.0) return 0.001;
  const pStar = (p - c) / (1.0 - c);
  const q = 1.0 - p;
  return (a * a) * (q / p) * (pStar * pStar);
}

/**
 * Update candidate ability theta using Newton-Raphson MLE with Bayesian regularization
 */
export function estimateAbility(
  responses: { isCorrect: boolean; item: CATItem }[],
  currentTheta: number = 0.0
): { theta: number; sem: number } {
  if (responses.length === 0) {
    return { theta: 0.0, sem: 1.0 };
  }

  let theta = currentTheta;
  const maxIterations = 15;
  const convergenceThreshold = 0.001;

  for (let iter = 0; iter < maxIterations; iter++) {
    let score = 0; // First derivative of log-likelihood + prior
    let info = 0;  // Second derivative (Fisher Information) + prior

    // Bayesian normal prior N(0, 1) to prevent divergence with all-correct or all-wrong items
    const priorVariance = 1.0;
    score -= theta / priorVariance;
    info += 1.0 / priorVariance;

    for (const { isCorrect, item } of responses) {
      const p = probability3PL(theta, item.a, item.b, item.c);
      const q = 1.0 - p;
      const u = isCorrect ? 1.0 : 0.0;
      
      const pStar = (p - item.c) / (1.0 - item.c);
      const derivP = item.a * (1.0 - item.c) * pStar * (1.0 - pStar);
      
      score += (derivP * (u - p)) / (p * q);
      info += fisherInformation(theta, item.a, item.b, item.c);
    }

    if (info <= 0) break;
    const delta = score / info;
    theta += Math.max(-0.6, Math.min(0.6, delta)); // Step damping
    theta = Math.max(-3.5, Math.min(3.5, theta));  // Bounded scale

    if (Math.abs(delta) < convergenceThreshold) break;
  }

  // Calculate Standard Error of Measurement (SEM)
  let totalInfo = 1.0; // Prior information
  for (const { item } of responses) {
    totalInfo += fisherInformation(theta, item.a, item.b, item.c);
  }
  const sem = 1.0 / Math.sqrt(totalInfo);

  return { theta: Math.round(theta * 1000) / 1000, sem: Math.round(sem * 1000) / 1000 };
}

/**
 * 95% Confidence Interval Stopping Rule (NCSBN CAT Standard)
 */
export function evaluateCATStoppingRule(
  theta: number,
  sem: number,
  questionCount: number,
  minQuestions: number = 10,
  maxQuestions: number = 30,
  passingCutoff: number = 0.0
): { isComplete: boolean; decision: "PASS" | "FAIL" | "IN_PROGRESS" } {
  const lowerBound = theta - 1.96 * sem;
  const upperBound = theta + 1.96 * sem;

  if (questionCount < minQuestions) {
    return { isComplete: false, decision: "IN_PROGRESS" };
  }

  // Rule 1: 95% Confidence Interval cleanly above passing cutoff
  if (lowerBound > passingCutoff) {
    return { isComplete: true, decision: "PASS" };
  }

  // Rule 2: 95% Confidence Interval cleanly below passing cutoff
  if (upperBound < passingCutoff) {
    return { isComplete: true, decision: "FAIL" };
  }

  // Rule 3: Maximum item limit reached (Maximum length rule)
  if (questionCount >= maxQuestions) {
    return {
      isComplete: true,
      decision: theta >= passingCutoff ? "PASS" : "FAIL",
    };
  }

  return { isComplete: false, decision: "IN_PROGRESS" };
}

/**
 * Maximum Information Item Selection:
 * Selects the unadministered item that provides the highest Fisher Information at the candidate's current ability
 */
export function selectNextCATItem(
  theta: number,
  itemPool: CATItem[],
  administeredIds: string[]
): CATItem | null {
  const eligibleItems = itemPool.filter((item) => !administeredIds.includes(item.id));
  if (eligibleItems.length === 0) return null;

  let bestItem = eligibleItems[0];
  let maxInfo = -1;

  for (const item of eligibleItems) {
    const info = fisherInformation(theta, item.a, item.b, item.c);
    if (info > maxInfo) {
      maxInfo = info;
      bestItem = item;
    }
  }

  return bestItem;
}

/**
 * Calibrated CAT Question Pool (Stratified across difficulties and discrimination parameters)
 */
export const CALIBRATED_CAT_ITEM_POOL: CATItem[] = [
  {
    id: "cat-item-01",
    prompt: "A client with acute heart failure has been prescribed IV Furosemide. Which laboratory parameter is most critical for the nurse to evaluate prior to administration?",
    options: ["Serum Potassium", "Serum Calcium", "Serum Amylase", "Total Bilirubin"],
    correctIndex: 0,
    a: 1.45,
    b: -1.2, // Moderate easy foundational
    c: 0.25,
    domain: "Pharmacology & Parenteral Therapies",
    rationale: "Loop diuretics cause massive renal excretion of potassium; hypokalemia increases the risk of fatal cardiac arrhythmias.",
  },
  {
    id: "cat-item-02",
    prompt: "A 2-day-old infant is observed with persistent jaundice extending to the palms and soles. The serum total bilirubin is 18.5 mg/dL. What is the immediate nursing priority?",
    options: [
      "Prepare the infant for immediate intensive phototherapy and hydration",
      "Advise the mother to feed only sterile plain water for 24 hours",
      "Reassure the parents that this is harmless breast milk jaundice",
      "Administer oral phenobarbital 30 mg immediately",
    ],
    correctIndex: 0,
    a: 1.6,
    b: -0.4,
    c: 0.25,
    domain: "Maternal & Newborn Nursing",
    rationale: "Bilirubin levels above 15-18 mg/dL in the first 48 hours present a severe risk of acute bilirubin encephalopathy (kernicterus).",
  },
  {
    id: "cat-item-03",
    prompt: "A client who underwent subtotal thyroidectomy 6 hours ago suddenly develops stridor, restlessness, and acute dyspnea. What is the priority nursing action?",
    options: [
      "Immediately open the incision using a tracheostomy tray at the bedside to relieve tracheal compression",
      "Administer 2 mg oral Lorazepam for acute post-operative panic",
      "Place the client in the Trendelenburg position to increase venous return",
      "Encourage deep breathing exercises and cough forcefully",
    ],
    correctIndex: 0,
    a: 1.9,
    b: 0.8, // Moderate difficult
    c: 0.25,
    domain: "Physiological Adaptation & Surgical Care",
    rationale: "Stridor following thyroidectomy is a surgical emergency indicating tracheal compression from an expanding hematoma. Relieving compression takes immediate life-saving precedence.",
  },
  {
    id: "cat-item-04",
    prompt: "An arterial blood gas (ABG) analysis reveals: pH 7.28, PaCO2 56 mmHg, HCO3 25 mEq/L, and PaO2 62 mmHg. How should the nurse interpret this acid-base imbalance?",
    options: [
      "Uncompensated Respiratory Acidosis with Hypoxemia",
      "Fully Compensated Metabolic Acidosis",
      "Uncompensated Respiratory Alkalosis",
      "Partially Compensated Metabolic Alkalosis",
    ],
    correctIndex: 0,
    a: 1.8,
    b: 0.2,
    c: 0.25,
    domain: "Reduction of Risk Potential",
    rationale: "pH < 7.35 indicates acidosis; PaCO2 > 45 indicates respiratory origin; normal HCO3 indicates kidneys have not yet compensated.",
  },
  {
    id: "cat-item-05",
    prompt: "A client with severe traumatic brain injury (TBI) has an ICP of 24 mmHg and a Mean Arterial Pressure (MAP) of 74 mmHg. Calculate the Cerebral Perfusion Pressure (CPP) and determine clinical adequacy.",
    options: [
      "CPP = 50 mmHg; Critically inadequate cerebral perfusion requiring immediate intervention",
      "CPP = 98 mmHg; Excessively high perfusion risking cerebral hemorrhage",
      "CPP = 74 mmHg; Perfectly normal cerebral perfusion requiring no action",
      "CPP = 24 mmHg; Near brain death requiring hyperventilation to PaCO2 20",
    ],
    correctIndex: 0,
    a: 2.1,
    b: 1.6, // High difficulty
    c: 0.25,
    domain: "Complex Critical Care",
    rationale: "CPP = MAP - ICP = 74 - 24 = 50 mmHg. Target CPP in TBI is 60-70 mmHg. A CPP < 50 mmHg indicates severe cerebral ischemia.",
  },
  {
    id: "cat-item-06",
    prompt: "The nurse is reviewing orders for a client admitted with acute right ventricular myocardial infarction. Which prescribed medication order must the nurse question and hold?",
    options: [
      "Sublingual Nitroglycerin 0.4 mg PRN for chest pain",
      "Intravenous 0.9% Normal Saline fluid bolus 500 mL",
      "Aspirin 300 mg chewed stat",
      "Oxygen via nasal cannula at 2 L/min",
    ],
    correctIndex: 0,
    a: 2.2,
    b: 1.9, // Very high difficulty (Next-Gen NCLEX Master)
    c: 0.25,
    domain: "Pharmacological & Parenteral Therapies",
    rationale: "Right ventricular infarction relies heavily on right ventricular preload to maintain cardiac output. Nitrates cause venodilation, precipitously collapsing preload and causing refractory cardiogenic shock.",
  },
  {
    id: "cat-item-07",
    prompt: "During early active labor, the nurse observes early decelerations on the electronic fetal monitoring strip. What is the pathophysiological cause?",
    options: [
      "Fetal head compression stimulating the vagus nerve",
      "Uteroplacental insufficiency during contractions",
      "Umbilical cord compression",
      "Maternal hypovolemic hypotension",
    ],
    correctIndex: 0,
    a: 1.5,
    b: -0.8, // Foundational
    c: 0.25,
    domain: "Maternal & Child Health",
    rationale: "Early decelerations mirror contractions and represent benign transient fetal head compression.",
  },
  {
    id: "cat-item-08",
    prompt: "A psychiatric nurse is de-escalating a client experiencing acute auditory command hallucinations telling them to harm staff. What is the most therapeutic opening response?",
    options: [
      "I see you are feeling frightened right now. You are safe here, and I will not let anything happen to you.",
      "The voices you hear are not real; there is nobody else in this room.",
      "Why are the voices telling you to harm us when we only want to help you?",
      "If you do not sit down right now, we will be forced to place you in physical restraints.",
    ],
    correctIndex: 0,
    a: 1.7,
    b: 0.1,
    c: 0.25,
    domain: "Psychosocial Integrity",
    rationale: "Validates the client's emotional state without validating the delusion/hallucination, and communicates immediate safety.",
  },
];
