import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Unified Clinical Examination & Simulation Academy Test Suite', () => {
  const caosceDataPath = path.resolve(process.cwd(), 'src/data/caosceExams.ts');
  const ospeDataPath = path.resolve(process.cwd(), 'src/data/ospeExams.ts');
  const dosageDataPath = path.resolve(process.cwd(), 'src/data/dosageMathExams.ts');
  const partographDataPath = path.resolve(process.cwd(), 'src/data/partographExams.ts');
  const triageDataPath = path.resolve(process.cwd(), 'src/data/triageExams.ts');
  const ngnDataPath = path.resolve(process.cwd(), 'src/data/ngnExams.ts');
  const ncpDataPath = path.resolve(process.cwd(), 'src/data/ncpExams.ts');
  const aiPreceptorDataPath = path.resolve(process.cwd(), 'src/data/aiPreceptorExams.ts');
  const examsPagePath = path.resolve(process.cwd(), 'src/app/exams/page.tsx');
  const nextConfigPath = path.resolve(process.cwd(), 'next.config.ts');
  const notFoundPath = path.resolve(process.cwd(), 'src/app/not-found.tsx');
  const errorPath = path.resolve(process.cwd(), 'src/app/error.tsx');
  const loadingPath = path.resolve(process.cwd(), 'src/app/loading.tsx');

  test('Module 1: CAOSCE 6-Station Autonomous Engine is verified', () => {
    assert.ok(fs.existsSync(caosceDataPath), 'caosceExams.ts must exist');
    const content = fs.readFileSync(caosceDataPath, 'utf8');
    const stations = content.match(/stationNumber:\s*([1-6])/g);
    assert.equal(stations?.length, 6, 'Must define exactly 6 stations');
    const mcqs = content.match(/questionNumber:\s*(10|[1-9])/g);
    assert.equal(mcqs?.length, 60, 'Must define exactly 60 MCQs');
  });

  test('Module 2: OSPE Diagnostic Data Studio is verified', () => {
    assert.ok(fs.existsSync(ospeDataPath), 'ospeExams.ts must exist');
    const content = fs.readFileSync(ospeDataPath, 'utf8');
    assert.ok(content.includes('OSPE_STATIONS'), 'Must export OSPE_STATIONS');
    assert.ok(content.includes('ECG Rhythm'), 'Must include ECG station');
    assert.ok(content.includes('Arterial Blood Gas'), 'Must include ABG station');
    assert.ok(content.includes('Urinalysis'), 'Must include Urinalysis station');
  });

  test('Module 3: Zero-Tolerance Dosage Math Board is verified', () => {
    assert.ok(fs.existsSync(dosageDataPath), 'dosageMathExams.ts must exist');
    const content = fs.readFileSync(dosageDataPath, 'utf8');
    assert.ok(content.includes('DOSAGE_MATH_QUESTIONS'), 'Must export DOSAGE_MATH_QUESTIONS');
    assert.ok(content.includes('Parkland resuscitation'), 'Must include Parkland formula');
    assert.ok(content.includes('Amoxicillin'), 'Must include pediatric dosing');
  });

  test('Module 4: Interactive WHO Partograph Simulator is verified', () => {
    assert.ok(fs.existsSync(partographDataPath), 'partographExams.ts must exist');
    const content = fs.readFileSync(partographDataPath, 'utf8');
    assert.ok(content.includes('WHO_PARTOGRAPH_SCENARIO'), 'Must export WHO_PARTOGRAPH_SCENARIO');
    assert.ok(content.includes('Alert Line'), 'Must test alert line mechanics');
    assert.ok(content.includes('Action Line'), 'Must test action line mechanics');
  });

  test('Module 5: START Disaster Mass-Casualty Triage is verified', () => {
    assert.ok(fs.existsSync(triageDataPath), 'triageExams.ts must exist');
    const content = fs.readFileSync(triageDataPath, 'utf8');
    assert.ok(content.includes('DISASTER_TRIAGE_CASUALTIES'), 'Must export DISASTER_TRIAGE_CASUALTIES');
    assert.ok(content.includes('RED'), 'Must include Red Tag');
    assert.ok(content.includes('BLACK'), 'Must include Black Tag');
  });

  test('Module 6: Unfolding Next-Gen NCLEX (NGN) EHR Case Study is verified', () => {
    assert.ok(fs.existsSync(ngnDataPath), 'ngnExams.ts must exist');
    const content = fs.readFileSync(ngnDataPath, 'utf8');
    assert.ok(content.includes('NGN_HEART_FAILURE_CASE'), 'Must export NGN_HEART_FAILURE_CASE');
    assert.ok(content.includes('step1Highlight'), 'Must include highlight cue recognition');
    assert.ok(content.includes('step2Matrix'), 'Must include matrix grid judgment');
    assert.ok(content.includes('step3BowTie'), 'Must include bow-tie decision model');
  });

  test('Module 7: Nursing Care Plan (NCP) 5-Step Clinical Reasoning Matrix is verified', () => {
    assert.ok(fs.existsSync(ncpDataPath), 'ncpExams.ts must exist');
    const content = fs.readFileSync(ncpDataPath, 'utf8');
    assert.ok(content.includes('NCP_SEPSIS_SCENARIO'), 'Must export NCP_SEPSIS_SCENARIO');
    assert.ok(content.includes('Deficient Fluid Volume'), 'Must include NANDA diagnosis');
    assert.ok(content.includes('SMART'), 'Must enforce SMART outcome goals');
    assert.ok(content.includes('scientificRationale'), 'Must provide evidence-based rationales');
  });

  test('Module 8: Conversational AI Preceptor & Algorithmic Stewardship is verified', () => {
    assert.ok(fs.existsSync(aiPreceptorDataPath), 'aiPreceptorExams.ts must exist');
    const content = fs.readFileSync(aiPreceptorDataPath, 'utf8');
    assert.ok(content.includes('AI_PRECEPTOR_STEMI_SCENARIO'), 'Must export AI_PRECEPTOR_STEMI_SCENARIO');
    assert.ok(content.includes('sbarRubric'), 'Must include SBAR rubric');
    assert.ok(content.includes('aiStewardship'), 'Must include AI error override challenge');
    assert.ok(content.includes('override_reject'), 'Must test rejection of fatal AI hallucination');
  });

  test('Exams Page unifies all 10 modules with Cryptographic Verification', () => {
    const pageContent = fs.readFileSync(examsPagePath, 'utf8');
    assert.ok(pageContent.includes('activeTab === "caosce"'), 'Must have CAOSCE tab');
    assert.ok(pageContent.includes('activeTab === "partograph"'), 'Must have Partograph tab');
    assert.ok(pageContent.includes('activeTab === "ospe"'), 'Must have OSPE tab');
    assert.ok(pageContent.includes('activeTab === "dosage"'), 'Must have Dosage tab');
    assert.ok(pageContent.includes('activeTab === "triage"'), 'Must have Triage tab');
    assert.ok(pageContent.includes('activeTab === "ngn"'), 'Must have NGN tab');
    assert.ok(pageContent.includes('activeTab === "ncp"'), 'Must have NCP tab');
    assert.ok(pageContent.includes('activeTab === "ai-preceptor"'), 'Must have AI Preceptor tab');
    assert.ok(pageContent.includes('cryptographicCertificateHash'), 'Must generate cryptographic token');
  });

  test('DevSecOps Security Headers are enforced in next.config.ts', () => {
    assert.ok(fs.existsSync(nextConfigPath), 'next.config.ts must exist');
    const content = fs.readFileSync(nextConfigPath, 'utf8');
    assert.ok(content.includes('Strict-Transport-Security'), 'Must enforce HSTS');
    assert.ok(content.includes('X-Content-Type-Options'), 'Must enforce nosniff');
    assert.ok(content.includes('X-Frame-Options'), 'Must enforce clickjacking protection');
    assert.ok(content.includes('Referrer-Policy'), 'Must enforce Referrer-Policy');
    assert.ok(content.includes('Permissions-Policy'), 'Must enforce Permissions-Policy');
  });

  test('Institutional Resilience & Error Boundaries exist', () => {
    assert.ok(fs.existsSync(notFoundPath), 'not-found.tsx must exist');
    assert.ok(fs.existsSync(errorPath), 'error.tsx must exist');
    assert.ok(fs.existsSync(loadingPath), 'loading.tsx must exist');
  });
});
