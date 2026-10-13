export interface ClinicalReflection {
  id: string;
  title: string;
  authorAlias: string; // e.g., "Student Nurse B., 300L"
  level: string; // "100L" | "200L" | "300L" | "400L" | "500L"
  specialty: string;
  dateSubmitted: string;
  preceptorVerified: boolean;
  preceptorFeedback?: string;
  gibbsCycle: {
    description: string;
    feelings: string;
    evaluation: string;
    analysis: string;
    conclusion: string;
    actionPlan: string;
  };
  keyLearningPoints: string[];
  tags: string[];
  peerComments: {
    id: string;
    author: string;
    comment: string;
    date: string;
  }[];
}

export const REFLECTION_CATEGORIES = [
  "All Specialties",
  "Medical-Surgical Nursing",
  "Maternal & Child Health / Midwifery",
  "Pediatric & Neonatal Care",
  "Emergency & Intensive Care",
  "Psychiatric & Mental Health",
  "Community & Public Health",
  "Ethics, Communication & Patient Advocacy",
];

export const INITIAL_CLINICAL_REFLECTIONS: ClinicalReflection[] = [
  {
    id: "refl-01",
    title: "Navigating Sudden Desaturation Post-Extubation in a High-Dependency Unit",
    authorAlias: "Student Nurse A.O. (400L ICU Posting)",
    level: "400L",
    specialty: "Emergency & Intensive Care",
    dateSubmitted: "October 10, 2026",
    preceptorVerified: true,
    preceptorFeedback: "Exemplary reflection following Gibbs' framework. Demonstrates prompt escalation and clear understanding of postoperative atelectasis vs. laryngeal edema.",
    gibbsCycle: {
      description: "During my clinical rotation on the post-operative recovery unit, a 45-year-old adult patient (Patient Case #A) underwent successful thyroidectomy and was extubated. Twenty minutes later, the patient displayed stridor, agitation, and oxygen saturation plummeted from 98% to 84% on room air.",
      feelings: "Initially, I felt a surge of panic because the patient looked terrified and was gripping the bed rail. However, remembering our emergency airway drills helped me maintain focus and call the rapid response team immediately.",
      evaluation: "What went well: I maintained airway patency with a chin-lift, applied high-flow oxygen via non-rebreather mask (15 L/min), and checked for neck wound hematoma. What was difficult: Balancing communication to comfort the family while maintaining rapid emergency handoff.",
      analysis: "Post-thyroidectomy respiratory distress is a surgical emergency often caused by tension hematoma, bilateral recurrent laryngeal nerve injury, or acute laryngeal edema. Auscultation confirmed inspiratory stridor. Emergency administration of IV dexamethasone and nebulized adrenaline stabilized the patient before re-intubation was required.",
      conclusion: "I recognized that early detection of inspiratory stridor is critical; waiting for severe cyanosis is dangerous. Immediate bedside availability of a tracheostomy tray and suctioning apparatus is indispensable.",
      actionPlan: "In future postoperative cases, I will always pre-inspect the emergency airway kit at the bedside prior to receiving extubated head and neck surgical patients, and maintain continuous plethysmographic pulse oximetry monitoring."
    },
    keyLearningPoints: [
      "Stridor post-thyroid surgery demands immediate high-flow O2 and surgeon notification.",
      "Check neck circumference for concealed expanding wound hematoma.",
      "Effective communication reduces patient anxiety during acute dyspnea."
    ],
    tags: ["AirwayEmergency", "PostOpCare", "Thyroidectomy", "RapidEscalation"],
    peerComments: [
      {
        id: "c-1",
        author: "Student Nurse K.E. (500L)",
        comment: "Excellent handling! In our 500L research seminar, we reviewed evidence showing bedside tracheostomy kits save valuable minutes during post-op hemorrhage.",
        date: "October 11, 2026"
      }
    ]
  },
  {
    id: "refl-02",
    title: "Overcoming Hesitation During Active Management of Third Stage of Labor (AMTSL)",
    authorAlias: "Student Midwife T.M. (300L Labor Ward)",
    level: "300L",
    specialty: "Maternal & Child Health / Midwifery",
    dateSubmitted: "October 8, 2026",
    preceptorVerified: true,
    preceptorFeedback: "Well-articulated self-reflection. Uterotonic administration timing is vital in preventing postpartum hemorrhage. Validated for clinical logbook portfolio.",
    gibbsCycle: {
      description: "Assisting a multiparous mother during spontaneous vaginal delivery. Following the birth of a 3.5 kg infant, I was responsible for administering the prophylactic uterotonic and performing controlled cord traction (CCT) under direct supervision of the senior preceptor.",
      feelings: "I was excited yet hesitant. Because the baby had just cried, I momentarily paused to check the neonatal APGAR rather than immediately palpating the mother's abdomen for a second twin.",
      evaluation: "The preceptor promptly prompted me: 'Rule out second twin, then give Oxytocin!' I recovered quickly, palpated the fundus, verified single pregnancy, and administered 10 IU Oxytocin IM into the vastus lateralis within 45 seconds of birth.",
      analysis: "WHO and NMCN guidelines dictate AMTSL within 1 minute of birth to prevent uterine atony, which accounts for over 70% of primary postpartum hemorrhage. Delays increase maternal blood loss exponentially.",
      conclusion: "Dual-tasking in the labor ward requires prioritizing simultaneous clinical roles: the lead midwife and assistant have distinct, synchronous responsibilities.",
      actionPlan: "I have rehearsed the mental checklist for third-stage labor so that AMTSL execution becomes an instinctive, rapid sequence without second-guessing."
    },
    keyLearningPoints: [
      "Always palpate abdomen to rule out second twin before oxytocin administration.",
      "Administer 10 IU Oxytocin IM within 60 seconds of delivery.",
      "Counter-traction above symphysis pubis protects against uterine inversion."
    ],
    tags: ["Midwifery", "AMTSL", "PPHPrevention", "LaborWard"],
    peerComments: [
      {
        id: "c-2",
        author: "Student Nurse D.A. (300L)",
        comment: "This happened to me during my first night shift too. Dividing tasks with the birth partner or junior nurse is a life saver.",
        date: "October 9, 2026"
      }
    ]
  },
  {
    id: "refl-03",
    title: "Therapeutic Communication with a Caregiver Experiencing Extreme Fatigue in Pediatrics",
    authorAlias: "Student Nurse S.Y. (200L Pediatric Ward)",
    level: "200L",
    specialty: "Pediatric & Neonatal Care",
    dateSubmitted: "October 5, 2026",
    preceptorVerified: true,
    preceptorFeedback: "Compassionate, holistic care exemplified. Demonstrates high emotional intelligence in family-centered pediatric nursing.",
    gibbsCycle: {
      description: "A mother caring for an 18-month-old admitted with severe bronchopneumonia became tearful and frustrated during our evening medication rounds, stating she felt overwhelmed and helpless after three sleepless nights.",
      feelings: "I initially felt protective and concerned that she might decline the prescribed antibiotic nebulization, but I recognized her distress was root-caused by emotional exhaustion rather than hostility.",
      evaluation: "Rather than insisting on immediate medication delivery, I sat down at eye level, listened empathetically for four minutes without interrupting, validated her exhaustion, and offered to hold and soothe the toddler while she took a short restorative walk and had a warm beverage.",
      analysis: "Family-centered care acknowledges that caregiver stress directly impacts pediatric recovery. Providing psychological first aid and actively listening fosters therapeutic alliance, improving treatment adherence.",
      conclusion: "Nurses care for both the pediatric patient and their family unit. Empathy and active listening are as clinically efficacious as pharmacotherapy.",
      actionPlan: "I will routinely assess caregiver fatigue levels during pediatric shift handoffs and incorporate respite support into our daily pediatric nursing care plans."
    },
    keyLearningPoints: [
      "Acknowledge and validate caregiver burden in long pediatric admissions.",
      "Therapeutic presence and open-ended listening de-escalate tension.",
      "Family-centered care yields higher treatment compliance."
    ],
    tags: ["PediatricNursing", "TherapeuticCommunication", "FamilyCenteredCare", "Empathy"],
    peerComments: []
  }
];
