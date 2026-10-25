/**
 * CHEP College of Nursing Sciences - Master Examination Data Repository
 * Full clinical datasets for CAOSCE, OSPE, Dosage Math, Partograph, Triage, NGN, NCP & 3PL IRT
 */
(function() {
    window.CHEP_CAOSCE_STATIONS = [
        {
            id: "station-1",
            stationNumber: 1,
            title: "Medical-Surgical Nursing: Acute Respiratory Distress & Chest Tube Drainage",
            domain: "Medical-Surgical Specialty",
            clinicalScenario: "Mr. Chukwudi Okafor, a 54-year-old male with left-sided traumatic hemothorax following a road traffic collision, is 24 hours post-closed underwater seal chest tube insertion. He suddenly complains of acute shortness of breath (RR: 32/min, SpO2: 88% on room air). Bubbling in the water seal chamber has ceased, and the drainage tubing has a dependent loop filled with clotted blood.",
            candidateInstructions: [
                "1. Introduce yourself, sanitize hands, and perform a rapid systematic respiratory assessment.",
                "2. Systematically inspect the underwater-seal drainage system from the chest insertion site to the collection unit.",
                "3. Correct the dependent loop and check for kinks, fluid fluctuation (tidaling), and air leaks.",
                "4. Implement immediate high-flow oxygen therapy via non-rebreather mask and position the patient appropriately.",
                "5. Verbalize key emergency actions if the chest tube accidentally becomes dislodged from the patient."
            ],
            criticalChecklist: [
                "Performs hand hygiene before touching the patient or drainage apparatus",
                "Applies 10-15 L/min O2 via non-rebreather reservoir mask immediately",
                "Positions patient in Semi-Fowler's or High-Fowler's position to maximize lung expansion",
                "Milks tubing gently towards chamber without high-pressure stripping",
                "Verbalizes emergency protocol: occlude site with sterile petroleum gauze taped on 3 sides if tube dislodges",
                "Maintains collection unit strictly below the level of the patient's chest at all times"
            ],
            mcqs: [
                {
                    id: "st1-q1",
                    questionNumber: 1,
                    question: "What is the physiological purpose of 'tidaling' (fluid oscillation) in the water-seal chamber of a chest drainage system?",
                    options: [
                        "It indicates continuous air leakage from the pleural space",
                        "It reflects normal intrapleural pressure changes during spontaneous breathing (rises on inspiration, falls on expiration)",
                        "It signifies complete re-expansion of the affected lung",
                        "It shows that active negative wall suction is functioning correctly"
                    ],
                    correctIndex: 1,
                    rationale: "Tidaling reflects normal pressure fluctuations in the pleural cavity during inspiration (negative pressure draws water up) and expiration (fluid drops)."
                },
                {
                    id: "st1-q2",
                    questionNumber: 2,
                    question: "If continuous vigorous bubbling is observed in the water-seal chamber (not suction control), what is the primary clinical interpretation?",
                    options: [
                        "The lung has achieved full physiological expansion",
                        "There is an active structural air leak in the system or persistent pneumothorax",
                        "Suction pressure must be immediately increased to -40 cmH2O",
                        "The collection canister is completely full and must be emptied"
                    ],
                    correctIndex: 1,
                    rationale: "Continuous bubbling in the water seal indicates air entering the system—either through an active air leak in the patient or loose connection."
                },
                {
                    id: "st1-q3",
                    questionNumber: 3,
                    question: "If a patient's chest tube is accidentally dislodged from the thoracic cavity, what is the immediate first nursing action?",
                    options: [
                        "Instruct patient to inhale deeply while clamping the remaining opening",
                        "Cover insertion site immediately with sterile petroleum gauze taped on three sides",
                        "Quickly push the tube back into the intercostal space",
                        "Submerge the external skin opening in a bowl of sterile water"
                    ],
                    correctIndex: 1,
                    rationale: "Taping on 3 sides creates a one-way flutter valve: air escapes during expiration and external air cannot enter on inspiration."
                }
            ]
        },
        {
            id: "station-2",
            stationNumber: 2,
            title: "Maternal & Child Health Nursing: Postpartum Hemorrhage & Uterine Atony",
            domain: "Maternal & Child Health",
            clinicalScenario: "Mrs. Amina Bello, a 28-year-old Para 4+0, delivered a 4.2 kg male infant 30 minutes ago via spontaneous vaginal delivery. The midwife notes sudden massive vaginal bleeding soaking the delivery bed. Vital signs: BP 85/50 mmHg, HR 128 bpm (weak, thready), RR 26/min. Palpation reveals a soft, boggy uterus elevated above the umbilicus and deviated to the right.",
            candidateInstructions: [
                "1. Call for emergency multi-disciplinary help (Code Crimson / PPH Protocol).",
                "2. Perform immediate bimanual uterine massage until contracted and firm.",
                "3. Ensure the bladder is catheterized to remove urinary retention.",
                "4. Administer first-line uterotonic pharmacotherapy according to NMCN protocols.",
                "5. Establish two large-bore IV access lines (14G or 16G) and initiate fluid resuscitation."
            ],
            criticalChecklist: [
                "Shouts for emergency assistance immediately without leaving the patient",
                "Performs vigorous continuous external fundal/bimanual uterine massage",
                "Inserts Foley catheter to decompress displaced urinary bladder",
                "Verbalizes/Administers Oxytocin 10-20 IU in 500 mL normal saline IV rapid infusion",
                "Establishes two large-bore (14G/16G) peripheral IV cannulas for crystalloid resuscitation",
                "Inspects perineum, cervix, and placenta for retained cotyledons"
            ],
            mcqs: [
                {
                    id: "st2-q1",
                    questionNumber: 1,
                    question: "What is the foremost common etiology of primary Postpartum Hemorrhage (PPH) within the first 24 hours of delivery?",
                    options: [
                        "Genital tract lacerations",
                        "Uterine atony (failure of myometrium to contract)",
                        "Retained placental fragments",
                        "Disseminated intravascular coagulation (DIC)"
                    ],
                    correctIndex: 1,
                    rationale: "Uterine atony accounts for approximately 70-80% of all primary postpartum hemorrhage cases."
                },
                {
                    id: "st2-q2",
                    questionNumber: 2,
                    question: "In managing severe PPH with uterine atony, what is the standard first-line uterotonic medication recommended by WHO and NMCN?",
                    options: [
                        "Ergometrine 0.5 mg IM in hypertensive patient",
                        "Oxytocin 10-20 IU IV infusion in crystalloids",
                        "Carboprost tromethamine IV bolus",
                        "Tranexamic acid without uterotonics"
                    ],
                    correctIndex: 1,
                    rationale: "Oxytocin is the first-line drug of choice due to rapid onset, minimal side effects, and predictable myometrial contraction."
                }
            ]
        },
        {
            id: "station-3",
            stationNumber: 3,
            title: "Pediatric Nursing: Severe Dehydration & Pediatric Resuscitation",
            domain: "Pediatric Specialty",
            clinicalScenario: "An 18-month-old infant, Master Emeka, is brought to the pediatric emergency unit with a 3-day history of acute watery diarrhea and vomiting (10 episodes in 24 hours). Weight is 10 kg. The infant is lethargic, eyes deeply sunken, skin pinch retracts in > 3 seconds, radial pulses barely palpable, capillary refill time is 4 seconds. BP 70/40 mmHg, HR 178 bpm, RR 48 bpm.",
            candidateInstructions: [
                "1. Rapidly classify the dehydration degree using WHO Integrated Management of Childhood Illness (IMCI).",
                "2. Establish immediate IV/IO vascular access.",
                "3. Calculate and order Plan C fluid resuscitation (Ringer's Lactate 100 mL/kg total).",
                "4. Calculate the first rapid bolus (30 mL/kg over 30 minutes for child >= 12 months).",
                "5. Outline monitoring parameters during rehydration."
            ],
            criticalChecklist: [
                "Correctly classifies child as WHO Plan C: Severe Dehydration with Shock",
                "Attempts IV access; states Intraosseous (IO) needle insertion within 90 seconds if IV fails",
                "Calculates total 100 mL/kg = 1,000 mL Ringer's Lactate or Normal Saline",
                "Orders initial bolus: 30 mL/kg (300 mL) administered over 30 minutes",
                "Orders remaining 70 mL/kg (700 mL) administered over 2.5 hours",
                "Monitors fontanelle tension, pulse volume, and lung sounds for fluid overload"
            ],
            mcqs: [
                {
                    id: "st3-q1",
                    questionNumber: 1,
                    question: "According to WHO IMCI Plan C guidelines for a child aged 18 months with severe dehydration, how is the initial 30 mL/kg fluid bolus timed?",
                    options: [
                        "Over 1 hour",
                        "Over 30 minutes",
                        "Over 15 minutes rapid IV push",
                        "Over 2 hours"
                    ],
                    correctIndex: 1,
                    rationale: "For children aged 12 months to 5 years, the initial 30 mL/kg is infused over 30 minutes; for infants < 12 months, over 1 hour."
                }
            ]
        },
        {
            id: "station-4",
            stationNumber: 4,
            title: "Mental Health & Psychiatric Nursing: Acute Agitation & Suicidal Ideation",
            domain: "Mental Health Specialty",
            clinicalScenario: "Mr. Babatunde Sanusi, a 32-year-old bank executive, is admitted involuntarily after his spouse found him with an empty bottle of organophosphate insecticide and a farewell note. He is pacing aggressively in the examination triage room, shouting 'Nobody can save me, I have to end this torment tonight!' He clenched his fists and advances towards the exit door.",
            candidateInstructions: [
                "1. Maintain personal safety and establish an unblocked escape exit route.",
                "2. Employ trauma-informed verbal de-escalation communication techniques.",
                "3. Perform a structured suicide lethality risk assessment.",
                "4. Enforce immediate 1-to-1 continuous observation protocol.",
                "5. Remove potential ligature points and harmful environmental hazards."
            ],
            criticalChecklist: [
                "Positions self between the agitated patient and an unblocked exit",
                "Speaks in a calm, low, non-confrontational, and empathetic tone of voice",
                "Validates emotional distress without validating delusional thoughts or agreeing to harm",
                "Establishes immediate Level 1: One-to-One Constant Eyesight Observation",
                "Removes shoelaces, belts, sharps, medications, and cords from the immediate surroundings",
                "Documents explicit verbal contracts for safety and immediate escalation to psychiatrist"
            ],
            mcqs: [
                {
                    id: "st4-q1",
                    questionNumber: 1,
                    question: "What is the most critical environmental safety intervention for a patient admitted with acute suicidal ideation?",
                    options: [
                        "Placing patient in solitary seclusion room with door locked",
                        "Continuous 1-to-1 direct eyesight nursing observation within arm's reach",
                        "Administering high-dose sedatives every 2 hours as needed",
                        "Allowing unrestricted phone contact with family members"
                    ],
                    correctIndex: 1,
                    rationale: "1-to-1 constant eyesight observation ensures immediate life-saving physical intervention before suicidal acts can occur."
                }
            ]
        },
        {
            id: "station-5",
            stationNumber: 5,
            title: "Community & Public Health Nursing: Outbreak Investigation & Cold Chain",
            domain: "Public Health Specialty",
            clinicalScenario: "Nurse Alabi conducts an inspection at Ilogbo Primary Health Center during a reported measles outbreak in Ado-Odo/Ota LGA. Ten children under 5 years present with high fever, maculopapular rash starting from the hairline, conjunctivitis, and Koplik spots in the buccal mucosa. The health post refrigerator thermometer registers +14°C due to an unmonitored solar inverter battery failure.",
            candidateInstructions: [
                "1. Identify the vaccine storage temperature breach and calculate duration of cold-chain failure.",
                "2. Immediately quarantine all compromised vaccines with a 'DO NOT USE' label.",
                "3. Outline the notification protocol under the Integrated Disease Surveillance and Response (IDSR).",
                "4. Calculate herd immunity threshold targets for the affected community.",
                "5. Formulate an emergency ring vaccination campaign protocol."
            ],
            criticalChecklist: [
                "Identifies that +14°C violates the mandatory +2°C to +8°C vaccine storage range",
                "Quarantines compromised vaccine vials immediately with clear warning labels",
                "Completes IDSR 002 Disease Notification Form within 24 hours to the LGA DSNO",
                "Recommends immediate Vitamin A therapeutic supplementation for all infected children",
                "Establishes active case finding and contact tracing in a 5 km radius",
                "Arranges emergency backup cold boxes with frozen ice packs for valid replacement stock"
            ],
            mcqs: [
                {
                    id: "st5-q1",
                    questionNumber: 1,
                    question: "What is the standard mandatory temperature range for storing live attenuated vaccines (e.g. Measles, BCG, Yellow Fever) in a cold chain refrigerator?",
                    options: [
                        "-10°C to 0°C",
                        "+2°C to +8°C",
                        "+10°C to +15°C",
                        "Sub-zero -20°C only"
                    ],
                    correctIndex: 1,
                    rationale: "WHO and NPHCDA standard cold-chain storage for standard vaccines is strictly maintained between +2°C and +8°C."
                }
            ]
        },
        {
            id: "station-6",
            stationNumber: 6,
            title: "Nursing Leadership, Ethics & Clinical Governance: Medication Error Disclosure",
            domain: "Leadership & Jurisprudence",
            clinicalScenario: "During morning hand-over, Staff Nurse Kemi confesses to you (the Nursing Sister in charge) that at 03:00 AM, she inadvertently administered IV Potassium Chloride 40 mEq directly as an IV push instead of diluting it in 1,000 mL Normal Saline, confusing it with IV Ceftriaxone. The patient, an elderly postoperative woman, is currently somnolent, bradycardic (HR: 44 bpm), and telemetry shows tall, peaked T-waves with widened QRS complexes.",
            candidateInstructions: [
                "1. Prioritize immediate emergency clinical stabilization of the patient.",
                "2. Administer IV Calcium Gluconate 10% stat to stabilize cardiac myocardium.",
                "3. Demonstrate non-punitive, transparent incident reporting under clinical governance.",
                "4. Conduct open, compassionate disclosure to the patient and legal family.",
                "5. Complete the NMCN Statutory Root-Cause Analysis (RCA) incident dossier."
            ],
            criticalChecklist: [
                "Calls Code Blue / Emergency Physician immediately; attaches cardiac monitor",
                "Orders/administers IV 10% Calcium Gluconate 10 mL over 5-10 minutes to protect myocardium",
                "Administers IV regular insulin with 50% dextrose to drive potassium back into cells",
                "Ensures nurse does not administer undiluted IV potassium ever again; locks high-alert meds",
                "Conducts honest, compassionate error disclosure without defaming the staff nurse or hiding facts",
                "Files an immutable institutional Sentinel Event Incident Report within 12 hours"
            ],
            mcqs: [
                {
                    id: "st6-q1",
                    questionNumber: 1,
                    question: "What is the emergency mechanism of action of IV Calcium Gluconate 10% in severe acute hyperkalemia with ECG abnormalities?",
                    options: [
                        "It rapidly excretes potassium through renal tubules",
                        "It stabilizes cardiac myocyte membranes against fatal arrhythmias without altering serum potassium levels",
                        "It shifts potassium into intracellular fluid space within 5 minutes",
                        "It neutralizes metabolic acidosis by binding hydrogen ions"
                    ],
                    correctIndex: 1,
                    rationale: "Calcium gluconate does not lower serum potassium; it antagonizes the cardiac membrane excitability of hyperkalemia, preventing fatal ventricular fibrillation."
                }
            ]
        }
    ];

    // Calibrated 3PL IRT Pool
    window.CHEP_CAT_ITEM_POOL = [
        {
            id: "cat-1",
            prompt: "A 45-year-old male is admitted with acute pancreatitis. Which clinical sign indicates retroperitoneal hemorrhage?",
            options: ["Chvostek's sign", "Trousseau's sign", "Grey Turner's sign (flank ecchymosis)", "Kernig's sign"],
            correctIndex: 2,
            a: 1.85, b: 0.10, c: 0.25,
            rationale: "Grey Turner's sign is ecchymosis of the flanks resulting from retroperitoneal blood dissection in severe necrotizing pancreatitis."
        },
        {
            id: "cat-2",
            prompt: "Which medication is contraindicated in a pregnant client with severe preeclampsia receiving Magnesium Sulfate?",
            options: ["Nifedipine", "Labetalol", "Diazepam IV bolus as first line", "Hydralazine"],
            correctIndex: 2,
            a: 1.95, b: 0.65, c: 0.20,
            rationale: "Diazepam causes severe neonatal respiratory depression, hypotonia, and is inferior to Magnesium Sulfate for seizure control."
        },
        {
            id: "cat-3",
            prompt: "Calculate the total 24-hour fluid requirement using Parkland Formula for an 80 kg adult with 40% Total Body Surface Area partial-thickness burns:",
            options: ["6,400 mL", "9,600 mL", "12,800 mL (80 x 40 x 4 mL)", "16,000 mL"],
            correctIndex: 2,
            a: 2.10, b: 1.15, c: 0.25,
            rationale: "Parkland Formula: 4 mL x Weight (kg) x % TBSA = 4 x 80 x 40 = 12,800 mL Ringer's Lactate (half in first 8 hours)."
        }
    ];
})();
