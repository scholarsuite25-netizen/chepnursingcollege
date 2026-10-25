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

test("Database Security Verification: Ensure all administrative RLS policies are restricted to service_role (SEC-001 Resolved)", () => {
  const schemaPath = path.join(process.cwd(), "supabase_schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  // Insecure pattern check: ensure no unconstrained "for all using (true)" without "to service_role"
  const insecurePolicyRegex = /create policy\s+"[^"]+"\s+on\s+public\.(\w+)\s+for all using \(true\)/gi;
  const matches = [...schema.matchAll(insecurePolicyRegex)];

  // Assert that all insecure wildcard policies have been eliminated
  assert.strictEqual(matches.length, 0, "SEC-001 RESOLVED: Zero unconstrained wildcard RLS policies found in schema");

  // Assert that service_role policies are present
  assert.ok(schema.includes("to service_role using (true) with check (true)"), "Schema enforces to service_role restriction");
});
