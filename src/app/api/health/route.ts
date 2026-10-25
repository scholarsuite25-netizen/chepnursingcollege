import { NextResponse } from "next/server";

export async function GET() {
  const uptime = process.uptime();
  const timestamp = new Date().toISOString();

  return NextResponse.json(
    {
      status: "healthy",
      service: "CHEP College of Nursing Sciences Academic Portal",
      timestamp,
      uptimeSeconds: Math.floor(uptime),
      environment: process.env.NODE_ENV || "production",
      checks: {
        application: "operational",
        supabaseConfigured: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      },
    },
    { status: 200 }
  );
}
