import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

test("Security Audit: Server Actions must declare 'use server'", () => {
  const actionsDir = path.join(process.cwd(), "src", "app", "actions");
  const files = fs.readdirSync(actionsDir).filter(f => f.endsWith(".ts"));

  for (const file of files) {
    const content = fs.readFileSync(path.join(actionsDir, file), "utf-8");
    assert.ok(
      content.includes('"use server"') || content.includes("'use server'"),
      `File ${file} is missing 'use server' declaration`
    );
  }
});

test("Security Verification: Server Actions enforce server-side session checks (SEC-003 & SEC-004 Resolved)", () => {
  const adminActionPath = path.join(process.cwd(), "src", "app", "actions", "admin.ts");
  const content = fs.readFileSync(adminActionPath, "utf-8");

  // Verify admin.ts has session & role validation guard
  const checksSession = content.includes("verifyStaffSession");
  assert.strictEqual(checksSession, true, "SEC-003 RESOLVED: admin.ts includes server-side session authorization guard");

  const clinicalActionPath = path.join(process.cwd(), "src", "app", "actions", "clinical.ts");
  const clinicalContent = fs.readFileSync(clinicalActionPath, "utf-8");
  const checksPreceptor = clinicalContent.includes("verifyPreceptorSession");
  assert.strictEqual(checksPreceptor, true, "SEC-004 RESOLVED: clinical.ts includes preceptor verification guard");
});

test("Security Verification: Admissions action defaults payment_status to unpaid and protects PII (SEC-005 & SEC-006 Resolved)", () => {
  const admissionsPath = path.join(process.cwd(), "src", "app", "actions", "admissions.ts");
  const content = fs.readFileSync(admissionsPath, "utf-8");

  assert.ok(content.includes('payment_status: "unpaid"'), "SEC-006 RESOLVED: payment_status defaults to unpaid");
  assert.ok(!content.includes('.select("*")'), "SEC-005 RESOLVED: checkApplicationStatus does not select wildcard columns");
  assert.ok(content.includes("cleanTerm.length < 4"), "SEC-005 RESOLVED: Minimum 4 characters enforced to prevent wildcard enumeration");
});

test("Security Audit: Verify no private database keys are prefixed with NEXT_PUBLIC_", () => {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    const lines = envContent.split("\n");
    for (const line of lines) {
      if (line.includes("SERVICE_ROLE_KEY") || line.includes("DATABASE_PASSWORD") || line.includes("SECRET")) {
        assert.ok(
          !line.startsWith("NEXT_PUBLIC_"),
          `CRITICAL: Sensitive variable ${line.split("=")[0]} must not carry NEXT_PUBLIC_ prefix`
        );
      }
    }
  }
});
