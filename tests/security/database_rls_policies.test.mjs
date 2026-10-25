import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

test("Database Audit: Verify all tables have Row-Level Security (RLS) enabled", () => {
  const schemaPath = path.join(process.cwd(), "supabase_schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  const expectedTables = ["applications", "news_dispatches", "students", "clinical_logs", "site_users", "media_gallery", "site_settings"];

  for (const table of expectedTables) {
    const rlsPattern = new RegExp(`alter table public\\.${table} enable row level security`, "i");
    assert.ok(rlsPattern.test(schema), `Table ${table} must have RLS explicitly enabled in schema`);
  }
});

test("Database Audit: Detect insecure wildcard RLS policies granting full access to public", () => {
  const schemaPath = path.join(process.cwd(), "supabase_schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  // Insecure pattern: create policy ... for all using (true) without TO service_role or auth check
  const insecurePolicyRegex = /create policy\s+"[^"]+"\s+on\s+public\.(\w+)\s+for all using \(true\)/gi;
  const matches = [...schema.matchAll(insecurePolicyRegex)];

  // Finding SEC-001: The schema contains wildcard policies that grant anonymous users full CRUD access
  assert.ok(matches.length > 0, "Audit confirms insecure wildcard RLS policies exist in schema");
});
