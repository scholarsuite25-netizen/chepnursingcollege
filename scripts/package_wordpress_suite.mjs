import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

const workspaceRoot = process.cwd();
const exportDir = path.resolve(workspaceRoot, 'wordpress_export');
const themeDir = path.resolve(exportDir, 'chep-college-theme');
const clinicalPluginDir = path.resolve(exportDir, 'chep-clinical-caosce-suite');
const portalPluginDir = path.resolve(exportDir, 'chep-academic-portal');
const readmeFile = path.resolve(exportDir, 'README_WORDPRESS_INSTALLATION.md');

const themeZip = path.resolve(exportDir, 'chep-college-theme.zip');
const clinicalZip = path.resolve(exportDir, 'chep-clinical-caosce-suite.zip');
const portalZip = path.resolve(exportDir, 'chep-academic-portal.zip');

const bundleDir = path.resolve(exportDir, 'CHEP_WORDPRESS_THEME_AND_PLUGINS_SUITE');
const masterZipRoot = path.resolve(workspaceRoot, 'CHEP_WORDPRESS_THEME_AND_PLUGINS_SUITE.zip');
const publicDownloadsDir = path.resolve(workspaceRoot, 'public/downloads');
const masterZipPublic = path.resolve(publicDownloadsDir, 'CHEP_WORDPRESS_THEME_AND_PLUGINS_SUITE.zip');
const masterZipExport = path.resolve(exportDir, 'CHEP_WORDPRESS_THEME_AND_PLUGINS_SUITE.zip');

console.log('=== CHEP College WordPress Suite Packaging Script ===');

function runPs(cmd) {
  execSync(`powershell -Command "${cmd}"`, { stdio: 'inherit' });
}

function getChecksum(file) {
  const fileBuffer = fs.readFileSync(file);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

// Ensure public/downloads directory exists
fs.mkdirSync(publicDownloadsDir, { recursive: true });

// 1. Compress Theme
console.log('\n[1/5] Compressing chep-college-theme...');
if (fs.existsSync(themeZip)) fs.unlinkSync(themeZip);
runPs(`Compress-Archive -Path '${themeDir}' -DestinationPath '${themeZip}' -Force`);
console.log(`✓ Created: ${themeZip} (${(fs.statSync(themeZip).size / (1024 * 1024)).toFixed(2)} MB)`);

// 2. Compress Clinical Exam Suite Plugin
console.log('\n[2/5] Compressing chep-clinical-caosce-suite...');
if (fs.existsSync(clinicalZip)) fs.unlinkSync(clinicalZip);
runPs(`Compress-Archive -Path '${clinicalPluginDir}' -DestinationPath '${clinicalZip}' -Force`);
console.log(`✓ Created: ${clinicalZip} (${(fs.statSync(clinicalZip).size / 1024).toFixed(1)} KB)`);

// 3. Compress Academic Portal Plugin
console.log('\n[3/5] Compressing chep-academic-portal...');
if (fs.existsSync(portalZip)) fs.unlinkSync(portalZip);
runPs(`Compress-Archive -Path '${portalPluginDir}' -DestinationPath '${portalZip}' -Force`);
console.log(`✓ Created: ${portalZip} (${(fs.statSync(portalZip).size / 1024).toFixed(1)} KB)`);

// 4. Assemble Consolidated Master Bundle Folder
console.log('\n[4/5] Assembling Master Bundle Folder...');
if (fs.existsSync(bundleDir)) {
  fs.rmSync(bundleDir, { recursive: true, force: true });
}
fs.mkdirSync(bundleDir, { recursive: true });

// Copy ready-to-upload zip files
fs.copyFileSync(themeZip, path.join(bundleDir, 'chep-college-theme.zip'));
fs.copyFileSync(clinicalZip, path.join(bundleDir, 'chep-clinical-caosce-suite.zip'));
fs.copyFileSync(portalZip, path.join(bundleDir, 'chep-academic-portal.zip'));
fs.copyFileSync(readmeFile, path.join(bundleDir, 'README_WORDPRESS_INSTALLATION.md'));

console.log('✓ Master bundle directory assembled with theme, clinical plugin, portal plugin, and manual.');

// 5. Compress Master Bundle into final Zip files
console.log('\n[5/5] Compressing Master Consolidated Archive...');
[masterZipRoot, masterZipPublic, masterZipExport].forEach(target => {
  if (fs.existsSync(target)) fs.unlinkSync(target);
});

runPs(`Compress-Archive -Path '${bundleDir}\\*' -DestinationPath '${masterZipRoot}' -Force`);
fs.copyFileSync(masterZipRoot, masterZipPublic);
fs.copyFileSync(masterZipRoot, masterZipExport);

const masterSizeMB = (fs.statSync(masterZipRoot).size / (1024 * 1024)).toFixed(2);
const masterHash = getChecksum(masterZipRoot);

console.log('\n======================================================');
console.log('SUCCESS: Master WordPress Suite Packed Successfully!');
console.log(`Root Archive:   ${masterZipRoot}`);
console.log(`Public Archive: ${masterZipPublic}`);
console.log(`Size:           ${masterSizeMB} MB`);
console.log(`SHA-256:        ${masterHash}`);
console.log('======================================================\n');
