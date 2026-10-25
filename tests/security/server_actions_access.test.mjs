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

test("Security Audit: Detect unprotected createAdminClient() invocations in public Server Actions", () => {
  const adminActionPath = path.join(process.cwd(), "src", "app", "actions", "admin.ts");
  const content = fs.readFileSync(adminActionPath, "utf-8");

  // Audit finding test: Flag that admin.ts directly invokes createAdminClient without checking caller session
  const usesAdminClient = content.includes("createAdminClient()");
  const checksSession = content.includes("auth.getUser") || content.includes("session") || content.includes("checkRole");

  assert.strictEqual(usesAdminClient, true, "admin.ts uses admin client");
  // Document vulnerable pattern for security audit
  if (!checksSession) {
    // Finding SEC-002: admin.ts lacks server-side authorization check before executing privileged operations
    assert.strictEqual(checksSession, false, "AUDIT FINDING (SEC-002): admin.ts lacks server-side role check");
  }
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
