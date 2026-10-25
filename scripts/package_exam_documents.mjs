import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const workspaceRoot = process.cwd();
const targetDir = path.resolve(workspaceRoot, 'EXAM_PROMPTS_AND_REGULATORY_DOCUMENTS');
const downloadsDir = 'C:\\Users\\Registrar\\Downloads';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const filesToInclude = [
  'GLOBAL_CAOSCE_SYSTEM_SPECIFICATION_PROMPT.md',
  'GLOBAL_CAOSCE_SYSTEM_SPECIFICATION_PROMPT.txt',
  'GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.docx',
  'GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.md',
  'GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.txt',
  'GLOBAL_ENTERPRISE_WEB_APP_AUDIT_STANDARD.docx',
  'GLOBAL_ENTERPRISE_WEB_APP_AUDIT_STANDARD.md',
  'GLOBAL_ENTERPRISE_WEB_APP_AUDIT_STANDARD.txt',
  'CHEP_College_Institutional_Management_System_Handbook.docx',
  'CHEP_College_Final_Development_Report_and_Audit.docx'
];

console.log('=== Assembling Final Exam Prompts & Regulatory Documents ===');

for (const f of filesToInclude) {
  const src = path.join(workspaceRoot, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(targetDir, f));
    fs.copyFileSync(src, path.join(downloadsDir, f));
    console.log(`✓ Copied: ${f}`);
  } else {
    console.warn(`! Not found: ${f}`);
  }
}

const zipDest = path.resolve(workspaceRoot, 'CHEP_FINAL_EXAM_PROMPTS_AND_STANDARDS.zip');
if (fs.existsSync(zipDest)) fs.unlinkSync(zipDest);

const psCmd = `powershell -Command "Compress-Archive -Path '${targetDir}\\*' -DestinationPath '${zipDest}' -Force"`;
execSync(psCmd, { stdio: 'inherit' });

const zipDownloads = path.join(downloadsDir, 'CHEP_FINAL_EXAM_PROMPTS_AND_STANDARDS.zip');
fs.copyFileSync(zipDest, zipDownloads);

console.log(`\n======================================================`);
console.log(`SUCCESS: Final Exam Prompts & Documents Packaged!`);
console.log(`Workspace ZIP: ${zipDest} (${(fs.statSync(zipDest).size / 1024).toFixed(1)} KB)`);
console.log(`Downloads ZIP: ${zipDownloads}`);
console.log(`======================================================\n`);
