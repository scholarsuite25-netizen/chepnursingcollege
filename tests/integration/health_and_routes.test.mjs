import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

test("Integration Test: Health check endpoint exports dynamic GET handler", async () => {
  const healthPath = path.join(process.cwd(), "src", "app", "api", "health", "route.ts");
  assert.ok(fs.existsSync(healthPath), "Health check route file must exist at src/app/api/health/route.ts");

  const content = fs.readFileSync(healthPath, "utf-8");
  assert.ok(content.includes("export async function GET"), "Health check must export GET handler");
  assert.ok(content.includes("status: \"healthy\""), "Health check must return status healthy");
});

test("Integration Test: Verify /verify route is completely neutralized from sitemap", () => {
  const sitemapPath = path.join(process.cwd(), "src", "app", "sitemap.ts");
  const content = fs.readFileSync(sitemapPath, "utf-8");
  assert.strictEqual(content.includes('"/verify"'), false, "Sitemap must not list deprecated /verify route");
});

test("Integration Test: Verify About is registered in top navigation", () => {
  const navbarPath = path.join(process.cwd(), "src", "components", "Navbar.tsx");
  const content = fs.readFileSync(navbarPath, "utf-8");
  assert.ok(content.includes('label: "About"'), "Navbar must have top-level About menu item");
  assert.ok(content.includes('href: "/about"'), "Navbar About must link to /about");
});
