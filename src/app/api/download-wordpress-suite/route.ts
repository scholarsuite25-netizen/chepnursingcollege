import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const candidates = [
      path.resolve(process.cwd(), 'CHEP_WORDPRESS_THEME_AND_PLUGINS_SUITE.zip'),
      path.resolve(process.cwd(), 'public/downloads/CHEP_WORDPRESS_THEME_AND_PLUGINS_SUITE.zip'),
      path.resolve(process.cwd(), 'wordpress_export/CHEP_WORDPRESS_THEME_AND_PLUGINS_SUITE.zip'),
    ];

    let zipPath: string | null = null;
    for (const c of candidates) {
      if (fs.existsSync(c) && fs.statSync(c).size > 1000) {
        zipPath = c;
        break;
      }
    }

    if (!zipPath) {
      return NextResponse.json(
        {
          error: 'Package archive not found on server.',
          hint: 'The master WordPress package is available in the repository root as CHEP_WORDPRESS_THEME_AND_PLUGINS_SUITE.zip.',
        },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(zipPath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="CHEP_WORDPRESS_THEME_AND_PLUGINS_SUITE.zip"',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600, immutable',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Internal error streaming WordPress package', details: err.message },
      { status: 500 }
    );
  }
}
