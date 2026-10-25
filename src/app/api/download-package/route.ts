import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function GET() {
  try {
    const primaryPath = path.resolve(process.cwd(), "public/downloads/GLOBAL_CAOSCE_EXAMINATION_SYSTEM_STANDARDS.zip");
    const fallbackPath = path.resolve(process.cwd(), "GLOBAL_CAOSCE_EXAMINATION_SYSTEM_STANDARDS.zip");

    const targetPath = fs.existsSync(primaryPath) ? primaryPath : fallbackPath;

    if (!fs.existsSync(targetPath)) {
      return new NextResponse("Package archive not found on server", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(targetPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="GLOBAL_CAOSCE_EXAMINATION_SYSTEM_STANDARDS.zip"',
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=3600, must-revalidate",
      },
    });
  } catch (error) {
    return new NextResponse("Failed to process download request", { status: 500 });
  }
}
