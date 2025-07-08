import { test, expect } from "@playwright/test";

test("Creating User", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.locator("h2")).toHaveText("Olá, seja bem-vindo!");
  await page.fill('input[name="userName"]', "Pedro Guilherme");
  await page.click("text=Entrar");
  await expect(page.locator("text=Olá, Pedro Guilherme!")).toBeVisible();

  await page.goto("http://localhost:3000/customers");
  await page.click("text=Criar cliente");
  await expect(page.locator("h3")).toHaveText("Criar cliente:");
  await page.fill('input[name="name"]', "Pedro Guilherme");
  await page.fill('input[name="salary"]', "10000");
  await page.fill('input[name="companyValuation"]', "1000000");
  await page.waitForTimeout(2000);
  await page.click("#create-customer-button");
  await page.waitForTimeout(1000);
  await expect(page.locator("text=Cliente criado com sucesso")).toBeVisible();
});

test("Editing User", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.locator("h2")).toHaveText("Olá, seja bem-vindo!");
  await page.fill('input[name="userName"]', "Pedro Guilherme");
  await page.click("text=Entrar");
  await expect(page.locator("text=Olá, Pedro Guilherme!")).toBeVisible();
  await page.goto("http://localhost:3000/customers");

  await page.click("text=Criar cliente");
  await expect(page.locator("h3")).toHaveText("Criar cliente:");
  await page.fill('input[name="name"]', "Pedro Guilherme");
  await page.fill('input[name="salary"]', "10000");
  await page.fill('input[name="companyValuation"]', "1000000");
  await page.waitForTimeout(2000);
  await page.click("#create-customer-button");
  await page.waitForTimeout(1000);
  await page.waitForSelector(".client_card_wrapper", { timeout: 2000 });
  await page
    .locator('.client_card_clickable img[src*="pencil"]')
    .first()
    .click();
  await expect(page.locator("h3")).toHaveText("Editar cliente:");
  await page.fill('input[name="name"]', "Pedro Guilherme Editado");
  await page.fill('input[name="salary"]', "15000");
  await page.fill('input[name="companyValuation"]', "2000000");
  await page.waitForTimeout(2000);
  await page.locator("#edit-customer-button").first().click();
  await page.waitForTimeout(500);
  await expect(page.locator("text=Cliente editado com sucesso")).toBeVisible();
});
