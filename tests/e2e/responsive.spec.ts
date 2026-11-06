import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "Mobile 320px", width: 320, height: 720 },
  { name: "Mobile 375px", width: 375, height: 812 },
  { name: "Tablet 768px", width: 768, height: 1024 },
  { name: "Laptop 1024px", width: 1024, height: 768 },
  { name: "Desktop 1440px", width: 1440, height: 900 },
];

for (const vp of VIEWPORTS) {
  test.describe(`Responsiveness on ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test(`home page renders with no horizontal overflow on ${vp.name}`, async ({ page }) => {
      await page.goto("/");
      await expect(page.locator("h3:has-text('Simulasi Penuh SKD CPNS')")).toBeVisible();

      // Check horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // 2px margin tolerance
    });

    test(`simulation confirmation page renders properly on ${vp.name}`, async ({ page }) => {
      await page.goto("/simulasi");
      await expect(page.locator("h1:has-text('Konfirmasi Pelaksanaan Ujian')")).toBeVisible();

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
    });

    test(`practice configuration page renders properly on ${vp.name}`, async ({ page }) => {
      await page.goto("/latihan");
      await expect(page.locator("h1:has-text('Konfigurasi Latihan Kategori')")).toBeVisible();

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
    });
  });
}
