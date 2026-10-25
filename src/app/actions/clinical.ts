"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { verifyPreceptorSession, verifyStaffSession } from "@/lib/auth-guard";

export interface ClinicalLogInput {
  studentId?: string;
  studentName?: string;
  matricNumber?: string;
  hospitalUnit: string;
  department: string;
  shiftDate: string;
  hours: number;
  procedureNotes: string;
}

export async function submitClinicalLog(data: ClinicalLogInput) {
  try {
    const supabase = createAdminClient();

    // Insert clinical log
    const { data: result, error } = await supabase
      .from("clinical_logs")
      .insert({
        hospital_unit: `${data.hospitalUnit} (${data.department})`,
        shift_date: data.shiftDate,
        hours: data.hours,
        procedure_notes: data.procedureNotes,
        preceptor_signed: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Clinical log insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, log: result };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit clinical log";
    return { success: false, error: message };
  }
}

export async function getClinicalLogs() {
  try {
    const auth = await verifyStaffSession();
    if (!auth.authorized) {
      return { success: false, data: [], error: auth.error };
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("clinical_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (err: unknown) {
    console.error("Error fetching clinical logs:", err);
    return { success: false, data: [] };
  }
}

export async function approveClinicalLog(logId: string) {
  try {
    // SEC-004: Enforce clinical preceptor / faculty role authorization
    const auth = await verifyPreceptorSession();
    if (!auth.authorized) {
      return { success: false, error: auth.error || "Clinical Preceptor authorization required to sign off ward hours." };
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("clinical_logs")
      .update({ preceptor_signed: true })
      .eq("id", logId)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to sign clinical log";
    return { success: false, error: message };
  }
}
