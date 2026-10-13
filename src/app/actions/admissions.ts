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
        payment_status: "paid",
        batch: "Batch A-01",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, application: result };
  } catch (err: any) {
    console.error("Unexpected error submitting application:", err);
    return { success: false, error: err.message || "Failed to submit application" };
  }
}

export async function checkApplicationStatus(searchTerm: string) {
  try {
    const supabase = createAdminClient();
    const cleanTerm = searchTerm.trim();

    if (!cleanTerm) {
      return { success: false, message: "Please enter an RRR number, Application ID, or Email." };
    }

    // Search by RRR, Email, or Full Name
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .or(`rrr_number.ilike.%${cleanTerm}%,email.ilike.%${cleanTerm}%,full_name.ilike.%${cleanTerm}%`)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Status lookup error:", error);
      return { success: false, message: "Could not retrieve dossier from registry." };
    }

    if (!data || data.length === 0) {
      return { success: false, message: "No application dossier found matching this search criteria." };
    }

    return { success: true, applications: data };
  } catch (err: any) {
    return { success: false, message: err.message || "Status lookup service unavailable." };
  }
}
