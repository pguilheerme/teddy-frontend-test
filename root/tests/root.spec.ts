import { test, expect } from "@playwright/test";

test("customer feature test", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const title = await page.title();
  expect(title).toBe("Teste Teddy - Frontend");
});
