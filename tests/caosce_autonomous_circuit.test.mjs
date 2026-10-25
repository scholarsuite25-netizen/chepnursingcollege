import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('6-Station Autonomous CAOSCE Examination Engine Test Suite', () => {
  const dataFilePath = path.resolve(process.cwd(), 'src/data/caosceExams.ts');
  const examsPagePath = path.resolve(process.cwd(), 'src/app/exams/page.tsx');

  test('CAOSCE Data Module exists and is populated', () => {
    assert.ok(fs.existsSync(dataFilePath), 'src/data/caosceExams.ts must exist');
    const content = fs.readFileSync(dataFilePath, 'utf8');
    assert.ok(content.includes('CAOSCE_STATIONS'), 'Must export CAOSCE_STATIONS');
    assert.ok(content.includes('scrambleCAOSCEMCQs'), 'Must export scrambleCAOSCEMCQs');
  });

  test('Exactly 6 clinical practice stations are defined covering 6 core nursing domains', () => {
    const content = fs.readFileSync(dataFilePath, 'utf8');
    const matches = content.match(/stationNumber:\s*([1-6])/g);
    assert.ok(matches && matches.length === 6, 'Must define exactly 6 stations numbered 1 to 6');

    // Verify the 6 disciplines
    assert.ok(content.includes('Medical-Surgical Nursing (Adult Health)'), 'Must include Med-Surg domain');
    assert.ok(content.includes('Maternal & Obstetric Nursing (Midwifery)'), 'Must include Midwifery domain');
    assert.ok(content.includes('Pediatric & Child Health Nursing (Neonatology)'), 'Must include Pediatric domain');
    assert.ok(content.includes('Mental Health & Psychiatric Nursing'), 'Must include Psychiatry domain');
    assert.ok(content.includes('Community & Public Health Nursing'), 'Must include Community Health domain');
    assert.ok(content.includes('Emergency, Trauma & Critical Care Nursing'), 'Must include Emergency/Trauma domain');
  });

  test('Each station has strictly 10 minutes duration', () => {
    const content = fs.readFileSync(dataFilePath, 'utf8');
    const durations = content.match(/durationMinutes:\s*10/g);
    assert.ok(durations && durations.length === 6, 'All 6 stations must have durationMinutes: 10');
  });

  test('Exactly 10 linked MCQs are defined per station (60 total MCQs)', () => {
    const content = fs.readFileSync(dataFilePath, 'utf8');
    const mcqMatches = content.match(/questionNumber:\s*(10|[1-9])/g);
    assert.ok(mcqMatches && mcqMatches.length === 60, `Must define exactly 60 MCQs (found ${mcqMatches?.length})`);

    // Verify all 6 station question IDs exist
    for (let s = 1; s <= 6; s++) {
      for (let q = 1; q <= 10; q++) {
        const idPattern = `mcq-st${s}-${q.toString().padStart(2, '0')}`;
        assert.ok(content.includes(idPattern), `MCQ ${idPattern} must exist`);
      }
    }
  });

  test('Checklist has critical patient safety flags defined', () => {
    const content = fs.readFileSync(dataFilePath, 'utf8');
    assert.ok(content.includes('criticalFailStep: true'), 'Must include critical safety fail steps');
  });

  test('Legacy manual OSCE tab is deleted from exams page and replaced by autonomous CAOSCE', () => {
    const content = fs.readFileSync(examsPagePath, 'utf8');
    // Ensure activeTab uses "caosce"
    assert.ok(content.includes('activeTab === "caosce"'), 'Must have activeTab === "caosce"');
    assert.ok(content.includes('6-Station CAOSCE Circuit (Autonomous)'), 'Must render autonomous CAOSCE tab');
    // Verify 10-minute timers
    assert.ok(content.includes('practicalTimeRemaining'), 'Must manage practical timer');
    assert.ok(content.includes('mcqTimeRemaining'), 'Must manage MCQ timer');
    assert.ok(content.includes('transitionTimeRemaining'), 'Must manage 30s transition timer');
    // Verify composite scoring
    assert.ok(content.includes('overallAggregateScore'), 'Must compute composite aggregate score');
    assert.ok(content.includes('anyCriticalViolations'), 'Must audit critical safety violations');
  });

  test('Global downloadable specification files exist in workspace root', () => {
    const mdSpecPath = path.resolve(process.cwd(), 'GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.md');
    const txtSpecPath = path.resolve(process.cwd(), 'GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.txt');
    assert.ok(fs.existsSync(mdSpecPath), 'GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.md must exist');
    assert.ok(fs.existsSync(txtSpecPath), 'GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.txt must exist');
    
    const mdContent = fs.readFileSync(mdSpecPath, 'utf8');
    assert.ok(mdContent.includes('GLOBAL-NURSE-EXAM-SPEC-2026-ULTIMA'), 'Must contain document ID');
    assert.ok(mdContent.includes('THE ROLE OF ARTIFICIAL INTELLIGENCE IN NURSING EXAMINATIONS'), 'Must contain AI section');
  });
});
