import { expect, test } from "@playwright/test";

test("Welcome page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.locator("h2")).toHaveText("Olá, seja bem-vindo!");
  await page.fill('input[name="userName"]', "Pedro Guilherme");
  await page.click("text=Entrar");
  await expect(page.locator("text=Olá, Pedro Guilherme!")).toBeVisible();
});
