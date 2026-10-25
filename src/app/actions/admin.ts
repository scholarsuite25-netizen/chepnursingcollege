"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { verifyStaffSession } from "@/lib/auth-guard";

export async function getApplications() {
  try {
    const auth = await verifyStaffSession();
    if (!auth.authorized) {
      return { success: false, data: [], error: auth.error };
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching applications:", error);
      return { success: false, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (err: unknown) {
    console.error("Unexpected error fetching applications:", err);
    return { success: false, data: [] };
  }
}

export async function updateApplicationStatus(id: string, status: string) {
  try {
    const auth = await verifyStaffSession();
    if (!auth.authorized) {
      return { success: false, error: auth.error || "Unauthorized access." };
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update application status";
    return { success: false, error: message };
  }
}

export async function publishDispatch(data: {
  title: string;
  category: string;
  summary?: string;
  content?: string;
  author?: string;
}) {
  try {
    const auth = await verifyStaffSession();
    if (!auth.authorized) {
      return { success: false, error: auth.error || "Unauthorized access." };
    }

    const supabase = createAdminClient();
    const { data: result, error } = await supabase
      .from("news_dispatches")
      .insert({
        title: data.title,
        category: data.category,
        summary: data.summary || "",
        content: data.content || "",
        author: data.author || "Academic Affairs Registry",
        published: true,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, result };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to publish dispatch";
    return { success: false, error: message };
  }
}

export async function getNewsDispatches() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("news_dispatches")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (err: unknown) {
    console.error("Error fetching news dispatches:", err);
    return { success: false, data: [] };
  }
}

export async function updateDispatch(id: string, data: Partial<{
  title: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  image_url: string;
  published: boolean;
}>) {
  try {
    const auth = await verifyStaffSession();
    if (!auth.authorized) {
      return { success: false, error: auth.error || "Unauthorized access." };
    }

    const supabase = createAdminClient();
    const { data: result, error } = await supabase
      .from("news_dispatches")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, result };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update dispatch";
    return { success: false, error: message };
  }
}

export async function deleteDispatch(id: string) {
  try {
    const auth = await verifyStaffSession();
    if (!auth.authorized) {
      return { success: false, error: auth.error || "Unauthorized access." };
    }

    const supabase = createAdminClient();
    const { error } = await supabase
      .from("news_dispatches")
      .delete()
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete dispatch";
    return { success: false, error: message };
  }
}

// ----------------------------------------------------
// Institutional User Directory & Role-Based Access
// ----------------------------------------------------
export async function getSiteUsers() {
  try {
    const auth = await verifyStaffSession();
    if (!auth.authorized) {
      return { success: false, data: [], error: auth.error };
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("site_users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, data: [] };
    }
    return { success: true, data: data || [] };
  } catch (err: unknown) {
    console.error("Error fetching site users:", err);
    return { success: false, data: [] };
  }
}

export async function createSiteUser(user: {
  full_name: string;
  email: string;
  role: string;
  department?: string;
  status?: string;
  avatar_url?: string | null;
}) {
  try {
    const auth = await verifyStaffSession(["Super Admin"]);
    if (!auth.authorized) {
      return { success: false, error: auth.error || "Super Admin privileges required." };
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("site_users")
      .insert({
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        department: user.department || "Academic Registry",
        status: user.status || "active",
        avatar_url: user.avatar_url || null,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create site user";
    return { success: false, error: message };
  }
}

export async function updateSiteUser(id: string, updates: Partial<{
  full_name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}>) {
  try {
    const auth = await verifyStaffSession(["Super Admin"]);
    if (!auth.authorized) {
      return { success: false, error: auth.error || "Super Admin privileges required." };
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("site_users")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update site user";
    return { success: false, error: message };
  }
}

export async function deleteSiteUser(id: string) {
  try {
    const auth = await verifyStaffSession(["Super Admin"]);
    if (!auth.authorized) {
      return { success: false, error: auth.error || "Super Admin privileges required." };
    }

    const supabase = createAdminClient();
    const { error } = await supabase
      .from("site_users")
      .delete()
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete site user";
    return { success: false, error: message };
  }
}

// ----------------------------------------------------
// Media & Gallery Management
// ----------------------------------------------------
export async function getMediaGallery() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("media_gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, data: [] };
    }
    return { success: true, data: data || [] };
  } catch (err: unknown) {
    console.error("Error fetching media gallery:", err);
    return { success: false, data: [] };
  }
}

export async function addMediaPhoto(item: {
  title: string;
  category: string;
  image_url: string;
  caption?: string;
  uploaded_by?: string;
}) {
  try {
    const auth = await verifyStaffSession();
    if (!auth.authorized) {
      return { success: false, error: auth.error || "Staff authorization required." };
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("media_gallery")
      .insert(item)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to add media photo";
    return { success: false, error: message };
  }
}

export async function deleteMediaPhoto(id: string) {
  try {
    const auth = await verifyStaffSession();
    if (!auth.authorized) {
      return { success: false, error: auth.error || "Staff authorization required." };
    }

    const supabase = createAdminClient();
    const { error } = await supabase
      .from("media_gallery")
      .delete()
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete media photo";
    return { success: false, error: message };
  }
}
