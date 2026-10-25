import test from "node:test";
import assert from "node:assert";

// Core business logic: NMCN Basic Nursing Criteria validation
function validateAdmissionCriteria(input) {
  const errors = [];
  if (!input.fullName || input.fullName.trim().length < 3) {
    errors.push("Full name must be at least 3 characters.");
  }
  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.push("Invalid email address format.");
  }
  if (!input.phone || !/^\+?[0-9]{10,14}$/.test(input.phone.replace(/[\s-]/g, ""))) {
    errors.push("Invalid telephone contact number.");
  }
  const credits = parseInt(input.creditsCount, 10);
  if (isNaN(credits) || credits < 5) {
    errors.push("NMCN statutory criteria requires a minimum of 5 O-Level credits in one or two sittings.");
  }
  if (input.program !== "Basic Nursing" && input.program !== "Post-Basic Midwifery" && input.program !== "Public Health Nursing") {
    errors.push("Selected academic program is not accredited.");
  }
  return { valid: errors.length === 0, errors };
}

// Remita RRR validation
function validateRemitaRRR(rrr) {
  if (!rrr) return false;
  const clean = rrr.replace(/[^0-9]/g, "");
  // Remita RRR is exactly 12 digits or standard institutional format
  return clean.length >= 10 && clean.length <= 12;
}

test("Admissions Unit Test: Valid candidate passes NMCN statutory requirements", () => {
  const validCandidate = {
    fullName: "Adebayo Comfort Olufunke",
    email: "comfort.adebayo@gmail.com",
    phone: "+2348031234567",
    program: "Basic Nursing",
    creditsCount: "5",
  };
  const result = validateAdmissionCriteria(validCandidate);
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.errors.length, 0);
});

test("Admissions Unit Test: Candidate with fewer than 5 credits is rejected", () => {
  const deficientCandidate = {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "08012345678",
    program: "Basic Nursing",
    creditsCount: "4",
  };
  const result = validateAdmissionCriteria(deficientCandidate);
  assert.strictEqual(result.valid, false);
  assert.ok(result.errors.some(e => e.includes("minimum of 5 O-Level credits")));
});

test("Admissions Unit Test: Remita RRR validation checks format strictly", () => {
  assert.strictEqual(validateRemitaRRR("RRR-123456789012"), true);
  assert.strictEqual(validateRemitaRRR("230491829102"), true);
  assert.strictEqual(validateRemitaRRR("123"), false);
  assert.strictEqual(validateRemitaRRR(""), false);
});
