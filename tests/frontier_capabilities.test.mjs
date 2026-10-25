import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('4 Advanced Frontier Capabilities Test Suite', () => {
  const irtPath = path.resolve(process.cwd(), 'src/lib/irtCatEngine.ts');
  const hemodynamicsPath = path.resolve(process.cwd(), 'src/components/HemodynamicWaveformEngine.tsx');
  const proctoringPath = path.resolve(process.cwd(), 'src/components/EdgeProctoringHUD.tsx');
  const clinicalAiPath = path.resolve(process.cwd(), 'src/app/actions/clinical-ai.ts');
  const examsPagePath = path.resolve(process.cwd(), 'src/app/exams/page.tsx');

  test('Frontier 1: Edge AI Computer Vision Anti-Tamper & Proctoring Telemetry exists and is robust', () => {
    assert.ok(fs.existsSync(proctoringPath), 'EdgeProctoringHUD.tsx must exist');
    const content = fs.readFileSync(proctoringPath, 'utf8');

    // Proctoring features verification
    assert.ok(content.includes('mediaDevices.getUserMedia'), 'Must request client-side webcam feed');
    assert.ok(content.includes('audioLevel') && content.includes('setAudioLevel'), 'Must measure acoustic audio level variance in decibels');
    assert.ok(content.includes('visibilitychange'), 'Must listen to visibilitychange events for tab-switching infractions');
    assert.ok(content.includes('blur'), 'Must listen to window blur events');
    assert.ok(content.includes('gazeDirection'), 'Must track biometric gaze vector status');
    assert.ok(content.includes('integrityScore'), 'Must compute real-time integrity telemetry score');
    assert.ok(content.includes('export default function EdgeProctoringHUD'), 'Must export EdgeProctoringHUD default component');
  });

  test('Frontier 2: 60FPS Dynamic Hemodynamic Vector Oscilloscope Engine exists and meets medical fidelity', () => {
    assert.ok(fs.existsSync(hemodynamicsPath), 'HemodynamicWaveformEngine.tsx must exist');
    const content = fs.readFileSync(hemodynamicsPath, 'utf8');

    // Oscilloscope features verification
    assert.ok(content.includes('requestAnimationFrame'), 'Must execute 60FPS animation frame loop');
    assert.ok(content.includes('<canvas'), 'Must render high-performance HTML5 canvas');
    assert.ok(content.includes('LEAD II • ECG'), 'Must render continuous Lead II ECG waveform');
    assert.ok(content.includes('Dicrotic notch'), 'Must render ABP pulse wave with dicrotic notch');
    assert.ok(content.includes('PLETH • SpO2'), 'Must render SpO2 photoplethysmogram');
    assert.ok(content.includes('playCardiacBeep'), 'Must synthesize pitch-shifted synchronous audio pulse beeps');
    
    // ACLS Emergency interventions
    assert.ok(content.includes('Push Atropine 1mg IV'), 'Must support IV Atropine intervention');
    assert.ok(content.includes('Push Adenosine 6mg IV'), 'Must support IV Adenosine intervention');
    assert.ok(content.includes('Deliver 200J Biphasic Shock'), 'Must support Defibrillation intervention');
    assert.ok(content.includes('500 mL Saline Bolus'), 'Must support Saline Bolus intervention');
    assert.ok(content.includes('export default function HemodynamicWaveformEngine'), 'Must export HemodynamicWaveformEngine default component');
  });

  test('Frontier 3: Computerized Adaptive Testing (CAT) 3PL IRT Psychometric Engine executes accurately', () => {
    assert.ok(fs.existsSync(irtPath), 'irtCatEngine.ts must exist');
    const content = fs.readFileSync(irtPath, 'utf8');

    // 3PL Mathematical formulation verification
    assert.ok(content.includes('export function probability3PL'), 'Must export probability3PL function');
    assert.ok(content.includes('export function fisherInformation'), 'Must export fisherInformation function');
    assert.ok(content.includes('export function estimateAbility'), 'Must export Newton-Raphson estimateAbility function');
    assert.ok(content.includes('export function evaluateCATStoppingRule'), 'Must implement 95% Confidence Interval stopping rule');
    assert.ok(content.includes('export function selectNextCATItem'), 'Must implement item selection via Maximum Fisher Information');
    assert.ok(content.includes('CALIBRATED_CAT_ITEM_POOL'), 'Must include calibrated 3PL item bank with a, b, c parameters');

    // Mathematical parameters check
    assert.ok(content.includes('a: number; // Discrimination'), 'Item interface must contain discrimination parameter a');
    assert.ok(content.includes('b: number; // Difficulty'), 'Item interface must contain difficulty parameter b');
    assert.ok(content.includes('c: number; // Guessing'), 'Item interface must contain guessing parameter c');
    assert.ok(content.includes('1.96 * sem'), 'Must use 1.96 * sem for 95% two-tailed confidence interval');
  });

  test('Frontier 4: Generative Clinical AI Scenario & Algorithmic Error Audit Engine exists and enforces safety', () => {
    assert.ok(fs.existsSync(clinicalAiPath), 'clinical-ai.ts must exist');
    const content = fs.readFileSync(clinicalAiPath, 'utf8');

    // Server action verification
    assert.ok(content.includes('use server'), 'Must declare use server directive');
    assert.ok(content.includes('export async function generateDynamicClinicalScenario'), 'Must export generateDynamicClinicalScenario');
    assert.ok(content.includes('confidence:'), 'Must provide AI copilot confidence telemetry');
    assert.ok(content.includes('aiCopilotSuggestion'), 'Must present AI Copilot recommendation');
    assert.ok(content.includes('hasHiddenLethalTrap'), 'Must contain deliberate algorithmic error trap for candidate audit');
    assert.ok(content.includes('lethalTrapExplanation'), 'Must provide clinical explanation of the lethal algorithmic trap');
    
    // Nigerian clinical emergency case mix
    assert.ok(content.includes('Severe Preeclampsia'), 'Must model Severe Preeclampsia / Eclampsia with MgSO4 protocol');
    assert.ok(content.includes('Carpet Viper'), 'Must model Echis ocellatus Envenomation with 20WBCT and ASV');
    assert.ok(content.includes('Organophosphate'), 'Must model Agricultural Organophosphate Poisoning with Atropinization');
  });

  test('Exams Page Integration: All 4 Frontier Capabilities are mounted into the interactive exams portal', () => {
    assert.ok(fs.existsSync(examsPagePath), 'page.tsx must exist');
    const content = fs.readFileSync(examsPagePath, 'utf8');

    // Verify imports
    assert.ok(content.includes('HemodynamicWaveformEngine'), 'Must import HemodynamicWaveformEngine');
    assert.ok(content.includes('EdgeProctoringHUD'), 'Must import EdgeProctoringHUD');
    assert.ok(content.includes('CALIBRATED_CAT_ITEM_POOL') && content.includes('estimateAbility'), 'Must import IRT engine');
    assert.ok(content.includes('generateDynamicClinicalScenario'), 'Must import generative AI scenario action');

    // Verify tabs and HUD activation
    assert.ok(content.includes('"hemodynamics"'), 'Must contain hemodynamics tab');
    assert.ok(content.includes('"cat"'), 'Must contain cat tab');
    assert.ok(content.includes('"generative-ai"'), 'Must contain generative-ai tab');
    assert.ok(content.includes('<EdgeProctoringHUD'), 'Must render EdgeProctoringHUD component');
    assert.ok(content.includes('<HemodynamicWaveformEngine />'), 'Must render HemodynamicWaveformEngine component');
  });
});
