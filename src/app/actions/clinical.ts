"use server";

import { createAdminClient } from "@/lib/supabase/admin";

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
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit clinical log" };
  }
}

export async function getClinicalLogs() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("clinical_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (err: any) {
    return { success: false, data: [] };
  }
}

export async function approveClinicalLog(logId: string) {
  try {
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
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
