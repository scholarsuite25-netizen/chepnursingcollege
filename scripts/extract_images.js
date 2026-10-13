const fs = require('fs');
const path = require('path');

const contentPath = 'C:/Users/Registrar/.gemini/antigravity-ide/brain/ae277b8f-4b05-467c-a5d0-147405c37bb3/.system_generated/steps/630/content.md';
const content = fs.readFileSync(contentPath, 'utf8');

// Match all wp-content/uploads image URLs
const regex = /https:\/\/chepnursingcollege\.org\/wp-content\/uploads\/[^\s"'()><\\]+\.(?:png|jpg|jpeg|webp|svg)/gi;
const matches = [...new Set(content.match(regex) || [])];

console.log('Total images found on home page:', matches.length);
matches.forEach((m, i) => console.log(`${i + 1}: ${m}`));
