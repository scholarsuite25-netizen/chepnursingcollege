const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const ibbLinks = [
  "https://ibb.co/nqqXX3Jk",
  "https://ibb.co/JRVGgZPt",
  "https://ibb.co/Sw79XCwz",
  "https://ibb.co/rG4wxKtZ",
  "https://ibb.co/qY7VDmnj",
  "https://ibb.co/g1tf8Hw",
  "https://ibb.co/7dnpJtGR",
  "https://ibb.co/xqjPWD38",
  "https://ibb.co/hx2Wkr2v",
  "https://ibb.co/RGDs4qrZ",
  "https://ibb.co/DPsCvYNw",
  "https://ibb.co/ycvvtW5D",
  "https://ibb.co/5Wp56J0R",
  "https://ibb.co/RTDcQsPR",
  "https://ibb.co/Hp9btHqv",
  "https://ibb.co/4RDWVxGh",
  "https://ibb.co/84Qmfz4m",
  "https://ibb.co/d4XfTmGj",
  "https://ibb.co/YFpSbD2B",
  "https://ibb.co/TC216D1",
  "https://ibb.co/TMQXFtNX",
  "https://ibb.co/zWtNNLt2"
];

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchText(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlink(dest, () => {});
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(true)));
      } else {
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  const results = [];
  const targetDir = path.join(__dirname, '../public/images/chep');

  for (let i = 0; i < ibbLinks.length; i++) {
    const link = ibbLinks[i];
    try {
      console.log(`[${i+1}/${ibbLinks.length}] Scraping ${link}...`);
      const html = await fetchText(link);

      // Extract og:image, og:title, width, height
      const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
      const viewerImgMatch = html.match(/<div id="image-viewer-container"[^>]*>[\s\S]*?<img [^>]*src="([^"]+)"/);
      const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/) || html.match(/<title>([^<]+)<\/title>/);
      const widthMatch = html.match(/<meta property="og:image:width" content="([^"]+)"/) || html.match(/width="(\d+)"/);
      const heightMatch = html.match(/<meta property="og:image:height" content="([^"]+)"/) || html.match(/height="(\d+)"/);
      const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/);

      const rawImgUrl = (viewerImgMatch && viewerImgMatch[1]) || (ogImageMatch && ogImageMatch[1]);
      let rawTitle = titleMatch ? titleMatch[1].replace(' hosted at ImgBB — ImgBB', '').replace(' hosted at ImgBB', '').trim() : `image_${i+1}`;
      const width = widthMatch ? parseInt(widthMatch[1], 10) : 0;
      const height = heightMatch ? parseInt(heightMatch[1], 10) : 0;

      // Clean filename
      let cleanName = rawTitle.toLowerCase().replace(/[^a-z0-9_-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
      if (!cleanName.endsWith('.jpg') && !cleanName.endsWith('.png') && !cleanName.endsWith('.jpeg')) {
        cleanName += '.jpg';
      }

      console.log(`  Found: "${rawTitle}" -> ${cleanName} (${width}x${height}) : ${rawImgUrl}`);

      let downloaded = false;
      if (rawImgUrl) {
        const destPath = path.join(targetDir, cleanName);
        try {
          await downloadFile(rawImgUrl, destPath);
          downloaded = true;
          console.log(`  ✓ Saved to ${destPath}`);
        } catch (err) {
          console.error(`  ✗ Download failed: ${err.message}`);
        }
      }

      results.push({
        id: i + 1,
        sourceUrl: link,
        title: rawTitle,
        fileName: cleanName,
        localPath: `/images/chep/${cleanName}`,
        imgUrl: rawImgUrl,
        width,
        height,
        isLandscape: width > height,
        aspectRatio: height > 0 ? (width / height).toFixed(2) : "unknown",
        description: descMatch ? descMatch[1] : "",
        downloaded
      });
    } catch (err) {
      console.error(`Error processing ${link}:`, err.message);
    }
  }

  const manifestPath = path.join(__dirname, 'ibb_images_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(results, null, 2));
  console.log(`\nAll done! Manifest written to ${manifestPath}`);
}

main();
