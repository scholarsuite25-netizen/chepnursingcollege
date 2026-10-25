import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();
const wpZip = path.resolve(cwd, 'CHEP_WORDPRESS_THEME_AND_PLUGINS_SUITE.zip');
const promptsZip = path.resolve(cwd, 'CHEP_FINAL_EXAM_PROMPTS_AND_STANDARDS.zip');

const server = http.createServer((req, res) => {
  const url = req.url || '/';

  if (url.includes('prompts') || url.includes('STANDARDS')) {
    if (fs.existsSync(promptsZip)) {
      const stat = fs.statSync(promptsZip);
      res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="CHEP_FINAL_EXAM_PROMPTS_AND_STANDARDS.zip"',
        'Content-Length': stat.size,
        'Access-Control-Allow-Origin': '*',
      });
      fs.createReadStream(promptsZip).pipe(res);
      return;
    }
  }

  if (url.includes('wordpress') || url.includes('theme') || url.includes('plugins') || url.includes('.zip')) {
    if (fs.existsSync(wpZip)) {
      const stat = fs.statSync(wpZip);
      res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="CHEP_WORDPRESS_THEME_AND_PLUGINS_SUITE.zip"',
        'Content-Length': stat.size,
        'Access-Control-Allow-Origin': '*',
      });
      fs.createReadStream(wpZip).pipe(res);
      return;
    }
  }

  // Dashboard page with both download buttons
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>CHEP College - Local Download Hub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: system-ui, sans-serif; background: #0f172a; color: #fff; padding: 40px 20px; text-align: center; }
          .card { max-width: 580px; margin: 0 auto; background: #1e293b; border: 1px solid #334155; border-radius: 24px; padding: 32px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
          h1 { color: #34d399; font-size: 24px; margin-bottom: 8px; }
          p { color: #94a3b8; font-size: 14px; line-height: 1.6; }
          .btn { display: block; margin: 16px 0; padding: 14px 20px; border-radius: 14px; text-decoration: none; font-weight: bold; font-size: 14px; transition: all 0.2s; }
          .btn-prompts { background: #3b82f6; color: #fff; }
          .btn-prompts:hover { background: #2563eb; }
          .btn-wp { background: #10b981; color: #022c22; }
          .btn-wp:hover { background: #34d399; }
          .meta { font-size: 12px; color: #64748b; margin-top: 4px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>CHEP College Download Hub</h1>
          <p>Instant high-speed local downloads (Zero internet required)</p>

          <a href="/prompts" class="btn btn-prompts">
            📥 Download Final Exam Prompts &amp; Regulatory Documents
          </a>
          <div class="meta">Includes Word DOCX, System Prompts (.txt &amp; .md), and Standards (213 KB)</div>

          <a href="/wordpress" class="btn btn-wp">
            📦 Download WordPress Theme &amp; Plugins Suite
          </a>
          <div class="meta">Includes Theme, CAOSCE Exam Suite &amp; Academic Portal (12.27 MB)</div>
        </div>
      </body>
    </html>
  `);
});

server.listen(8080, '127.0.0.1', () => {
  console.log('Local instant download hub running at: http://localhost:8080/');
});
