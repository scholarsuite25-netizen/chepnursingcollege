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
  const examsPagePath = path.resolve(process.cwd(), 'src/app/exams/page.tsx');

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

  test('Exams Page unifies all modules with Cryptographic Verification', () => {
    const pageContent = fs.readFileSync(examsPagePath, 'utf8');
    assert.ok(pageContent.includes('activeTab === "caosce"'), 'Must have CAOSCE tab');
    assert.ok(pageContent.includes('activeTab === "partograph"'), 'Must have Partograph tab');
    assert.ok(pageContent.includes('activeTab === "ospe"'), 'Must have OSPE tab');
    assert.ok(pageContent.includes('activeTab === "dosage"'), 'Must have Dosage tab');
    assert.ok(pageContent.includes('activeTab === "triage"'), 'Must have Triage tab');
    assert.ok(pageContent.includes('cryptographicCertificateHash'), 'Must generate cryptographic token');
  });
});
