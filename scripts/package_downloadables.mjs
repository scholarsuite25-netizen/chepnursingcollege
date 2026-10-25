import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const workspaceRoot = process.cwd();
const brainDir = 'C:\\Users\\Registrar\\.gemini\\antigravity-ide\\brain\\ae1fec37-b909-493c-acd3-c76fde7b4686';
const packageDir = path.resolve(workspaceRoot, 'GLOBAL_CAOSCE_STANDARDS_AND_PROJECT_PACKAGE');
const publicDownloadsDir = path.resolve(workspaceRoot, 'public/downloads');
const zipOutputRoot = path.resolve(workspaceRoot, 'GLOBAL_CAOSCE_EXAMINATION_SYSTEM_STANDARDS.zip');
const zipOutputPublic = path.resolve(publicDownloadsDir, 'GLOBAL_CAOSCE_EXAMINATION_SYSTEM_STANDARDS.zip');

// Clean and create target folders
if (fs.existsSync(packageDir)) {
  fs.rmSync(packageDir, { recursive: true, force: true });
}
fs.mkdirSync(packageDir, { recursive: true });
fs.mkdirSync(path.join(packageDir, '01_STANDARDS_AND_GLOBAL_PROMPTS'), { recursive: true });
fs.mkdirSync(path.join(packageDir, '02_TECHNICAL_WALKTHROUGHS_AND_ARCHITECTURE'), { recursive: true });
fs.mkdirSync(path.join(packageDir, '03_STANDALONE_PROJECT_MODULES/data'), { recursive: true });
fs.mkdirSync(path.join(packageDir, '03_STANDALONE_PROJECT_MODULES/lib'), { recursive: true });
fs.mkdirSync(path.join(packageDir, '03_STANDALONE_PROJECT_MODULES/components'), { recursive: true });
fs.mkdirSync(path.join(packageDir, '03_STANDALONE_PROJECT_MODULES/actions'), { recursive: true });
fs.mkdirSync(publicDownloadsDir, { recursive: true });

function copySafe(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${path.basename(src)} -> ${path.relative(packageDir, dest)}`);
  } else {
    console.warn(`Source not found: ${src}`);
  }
}

// 1. Standards and Global Prompts
const standards = [
  'GLOBAL_CAOSCE_SYSTEM_SPECIFICATION_PROMPT.md',
  'GLOBAL_CAOSCE_SYSTEM_SPECIFICATION_PROMPT.txt',
  'GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.md',
  'GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.txt',
  'GLOBAL_ENTERPRISE_WEB_APP_AUDIT_STANDARD.md',
  'GLOBAL_ENTERPRISE_WEB_APP_AUDIT_STANDARD.txt'
];

for (const f of standards) {
  copySafe(path.join(workspaceRoot, f), path.join(packageDir, '01_STANDARDS_AND_GLOBAL_PROMPTS', f));
}

// DOCX artifacts from brain
copySafe(
  path.join(brainDir, 'GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.docx'),
  path.join(packageDir, '01_STANDARDS_AND_GLOBAL_PROMPTS/GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.docx')
);
copySafe(
  path.join(brainDir, 'GLOBAL_ENTERPRISE_WEB_APP_AUDIT_STANDARD.docx'),
  path.join(packageDir, '01_STANDARDS_AND_GLOBAL_PROMPTS/GLOBAL_ENTERPRISE_WEB_APP_AUDIT_STANDARD.docx')
);

// 2. Technical Walkthroughs & Architecture
copySafe(
  path.join(brainDir, 'walkthrough_frontier_capabilities.md'),
  path.join(packageDir, '02_TECHNICAL_WALKTHROUGHS_AND_ARCHITECTURE/walkthrough_frontier_capabilities.md')
);
copySafe(
  path.join(brainDir, 'caosce_six_station_architecture_plan.md'),
  path.join(packageDir, '02_TECHNICAL_WALKTHROUGHS_AND_ARCHITECTURE/caosce_six_station_architecture_plan.md')
);

// 3. Standalone Project Modules (Ready to drop into any new Next.js or React web app)
const dataFiles = [
  'caosceExams.ts',
  'ospeExams.ts',
  'dosageMathExams.ts',
  'partographExams.ts',
  'triageExams.ts',
  'ngnExams.ts',
  'ncpExams.ts',
  'aiPreceptorExams.ts',
  'nursingExams.ts'
];
for (const f of dataFiles) {
  copySafe(
    path.join(workspaceRoot, 'src/data', f),
    path.join(packageDir, '03_STANDALONE_PROJECT_MODULES/data', f)
  );
}

copySafe(
  path.join(workspaceRoot, 'src/lib/irtCatEngine.ts'),
  path.join(packageDir, '03_STANDALONE_PROJECT_MODULES/lib/irtCatEngine.ts')
);

copySafe(
  path.join(workspaceRoot, 'src/components/HemodynamicWaveformEngine.tsx'),
  path.join(packageDir, '03_STANDALONE_PROJECT_MODULES/components/HemodynamicWaveformEngine.tsx')
);

copySafe(
  path.join(workspaceRoot, 'src/components/EdgeProctoringHUD.tsx'),
  path.join(packageDir, '03_STANDALONE_PROJECT_MODULES/components/EdgeProctoringHUD.tsx')
);

copySafe(
  path.join(workspaceRoot, 'src/app/actions/clinical-ai.ts'),
  path.join(packageDir, '03_STANDALONE_PROJECT_MODULES/actions/clinical-ai.ts')
);

// Create Master README for the Package
const readmeContent = `# Global CAOSCE & Advanced Nursing Examination System Blueprint
## Complete Standalone Project Package

This archive contains the complete institutional standards, regulatory prompts, technical architecture, and modular TypeScript source files for deploying an international-standard clinical examination portal.

---

### Folder Contents

\`\`\`text
GLOBAL_CAOSCE_STANDARDS_AND_PROJECT_PACKAGE/
│
├── README_PACKAGE_GUIDE.md                              <-- You are here
│
├── 01_STANDARDS_AND_GLOBAL_PROMPTS/                     <-- Universal Specifications
│   ├── GLOBAL_CAOSCE_SYSTEM_SPECIFICATION_PROMPT.md    (Markdown specification prompt for AI/Human build)
│   ├── GLOBAL_CAOSCE_SYSTEM_SPECIFICATION_PROMPT.txt   (Plain text prompt for LLM ingestion)
│   ├── GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.docx (Institutional Word standard)
│   ├── GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.md
│   ├── GLOBAL_FUTURE_NURSING_EXAMINATION_AI_STANDARD.txt
│   ├── GLOBAL_ENTERPRISE_WEB_APP_AUDIT_STANDARD.docx   (Enterprise security & DevOps audit standard)
│   ├── GLOBAL_ENTERPRISE_WEB_APP_AUDIT_STANDARD.md
│   └── GLOBAL_ENTERPRISE_WEB_APP_AUDIT_STANDARD.txt
│
├── 02_TECHNICAL_WALKTHROUGHS_AND_ARCHITECTURE/          <-- Deep Dive Engineering Specs
│   ├── walkthrough_frontier_capabilities.md            (3PL IRT, Oscilloscope, Proctoring, GenAI docs)
│   └── caosce_six_station_architecture_plan.md         (Autonomous 6-station rotation circuit plan)
│
└── 03_STANDALONE_PROJECT_MODULES/                       <-- Ready-to-Use Codebase Files
    ├── data/
    │   ├── caosceExams.ts       (6 clinical stations + 60 high-discrimination MCQs)
    │   ├── ospeExams.ts         (Objective Structured Practical Exam diagnostic datasets)
    │   ├── dosageMathExams.ts   (Pediatric & Parkland zero-tolerance math formulas)
    │   ├── partographExams.ts   (Interactive WHO Partograph scenario & alert/action lines)
    │   ├── triageExams.ts       (START Mass-Casualty Disaster Triage engine)
    │   ├── ngnExams.ts          (Next-Gen NCLEX Unfolding EHR clinical case study)
    │   ├── ncpExams.ts          (Nursing Care Plan 5-step clinical reasoning matrix)
    │   ├── aiPreceptorExams.ts  (Conversational AI Preceptor & Algorithmic Stewardship)
    │   └── nursingExams.ts      (CBT question bank & NMCN Essay marking guide)
    ├── lib/
    │   └── irtCatEngine.ts      (3-Parameter Logistic IRT Computerized Adaptive Testing engine)
    ├── components/
    │   ├── HemodynamicWaveformEngine.tsx (60FPS Canvas oscilloscope + Web Audio + ACLS)
    │   └── EdgeProctoringHUD.tsx         (Edge AI proctoring, webcam gaze, acoustic whisper meter)
    └── actions/
        └── clinical-ai.ts       (Server Action dynamic emergency scenario synthesizer)
\`\`\`

---

### How to Use This in a New Web App

1. **To feed into another AI builder / LLM**:
   Open \`01_STANDARDS_AND_GLOBAL_PROMPTS/GLOBAL_CAOSCE_SYSTEM_SPECIFICATION_PROMPT.txt\` or \`.md\` and copy-paste it directly as your system prompt.

2. **To use in a Next.js / React project**:
   - Copy \`03_STANDALONE_PROJECT_MODULES/data\` into your project's \`src/data/\` folder.
   - Copy \`03_STANDALONE_PROJECT_MODULES/lib\` into your project's \`src/lib/\` folder.
   - Copy \`03_STANDALONE_PROJECT_MODULES/components\` into your project's \`src/components/\` folder.
   - Copy \`03_STANDALONE_PROJECT_MODULES/actions\` into your project's \`src/app/actions/\` folder.

3. **Compliance Reference**:
   Share the \`.docx\` and \`.md\` files in \`01_STANDARDS_AND_GLOBAL_PROMPTS\` with academic boards, Nursing and Midwifery Councils (NMCN), and regulatory inspection teams.
`;

fs.writeFileSync(path.join(packageDir, 'README_PACKAGE_GUIDE.md'), readmeContent, 'utf8');
console.log('README_PACKAGE_GUIDE.md created.');

// Compress into ZIP using PowerShell Compress-Archive
console.log('Compressing package directory to ZIP...');
try {
  // Remove existing zips if any
  if (fs.existsSync(zipOutputRoot)) fs.unlinkSync(zipOutputRoot);
  if (fs.existsSync(zipOutputPublic)) fs.unlinkSync(zipOutputPublic);

  const psCommand = `powershell -Command "Compress-Archive -Path '${packageDir}\\*' -DestinationPath '${zipOutputRoot}' -Force"`;
  execSync(psCommand, { stdio: 'inherit' });
  
  // Also copy to public/downloads for live web download
  fs.copyFileSync(zipOutputRoot, zipOutputPublic);
  console.log(`ZIP successfully created at: ${zipOutputRoot}`);
  console.log(`ZIP also placed in public directory at: ${zipOutputPublic}`);
} catch (e) {
  console.error('Failed to compress archive:', e);
}
