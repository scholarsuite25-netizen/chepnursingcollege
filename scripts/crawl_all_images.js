const fs = require('fs');
const https = require('https');
const path = require('path');

const pages = [
  'https://chepnursingcollege.org/',
  'https://chepnursingcollege.org/about-us/',
  'https://chepnursingcollege.org/programmes/',
  'https://chepnursingcollege.org/admission/',
  'https://chepnursingcollege.org/gallery/',
  'https://chepnursingcollege.org/contact-us/',
  'https://chepnursingcollege.org/library/',
  'https://chepnursingcollege.org/news/',
  'https://chepnursingcollege.org/blog/'
];

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (err) => {
      console.log(`Failed to fetch ${url}: ${err.message}`);
      resolve('');
    });
  });
}

async function run() {
  const allImages = new Set();
  const regex = /https:\/\/chepnursingcollege\.org\/wp-content\/uploads\/[^\s"'()><\\]+\.(?:png|jpg|jpeg|webp|svg)/gi;

  for (const page of pages) {
    console.log(`Scanning ${page}...`);
    const html = await fetchUrl(page);
    const matches = html.match(regex) || [];
    matches.forEach(m => {
      // filter out resized thumbnails like -150x150, -300x199, -40x40 if original exists
      allImages.add(m);
    });
  }

  console.log(`\nFound ${allImages.size} total image links across pages.`);
  const sorted = Array.from(allImages).sort();
  fs.writeFileSync('scripts/all_images.json', JSON.stringify(sorted, null, 2));
  console.log('Saved to scripts/all_images.json');
}

run();
