"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export interface ApplicationInput {
  fullName: string;
  email: string;
  phone: string;
  program: string;
  olevelExam: string;
  examYear: string;
  creditsCount: string;
  jambScore?: string;
}

export async function submitApplication(data: ApplicationInput) {
  try {
    const supabase = createAdminClient();

    const { data: result, error } = await supabase
      .from("applications")
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        program: data.program,
        olevel_exam: data.olevelExam,
        exam_year: data.examYear,
        credits_count: data.creditsCount,
        jamb_score: data.jambScore || null,
        status: "pending",
        payment_status: "unpaid", // SEC-006: Default to unpaid until Remita payment verification
        batch: "Batch A-01",
      })
      .select("id, full_name, email, program, status, rrr_number, payment_status, batch, created_at")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, application: result };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit application";
    console.error("Unexpected error submitting application:", message);
    return { success: false, error: message };
  }
}

export async function checkApplicationStatus(searchTerm: string) {
  try {
    const supabase = createAdminClient();
    const cleanTerm = searchTerm.trim();

    // SEC-005: Require minimum 4 characters to prevent broad single-character enumeration
    if (!cleanTerm || cleanTerm.length < 4) {
      return { success: false, message: "Please enter a valid Remita RRR, Application ID, or Email address (min 4 characters)." };
    }

    // Search by RRR, Email, or Application ID only (eliminating full_name enumeration)
    const { data, error } = await supabase
      .from("applications")
      .select("id, full_name, program, status, batch, rrr_number, payment_status, created_at")
      .or(`rrr_number.ilike.%${cleanTerm}%,email.ilike.%${cleanTerm}%,id.eq.${cleanTerm.includes("-") ? cleanTerm : "00000000-0000-0000-0000-000000000000"}`)
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Status lookup error:", error);
      return { success: false, message: "Could not retrieve dossier from registry." };
    }

    if (!data || data.length === 0) {
      return { success: false, message: "No application dossier found matching this search criteria." };
    }

    return { success: true, applications: data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Status lookup service unavailable.";
    return { success: false, message };
  }
}
