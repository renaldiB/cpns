import { test, expect } from "@playwright/test";

test.describe("E2E CAT SKD Simulation Flow", () => {
  test("full simulation flow from briefing to exam, reload, finish, result, and review", async ({ page }) => {
    // 1. Visit Home
    await page.goto("/");
    await expect(page.locator("h3:has-text('Simulasi Penuh SKD CPNS')")).toBeVisible();

    // 2. Click Mulai Simulasi Penuh -> /simulasi
    await page.click("a:has-text('Mulai Simulasi Penuh')");
    await expect(page).toHaveURL(/\/simulasi/);
    await expect(page.locator("h1:has-text('Konfirmasi Pelaksanaan Ujian')")).toBeVisible();

    // 3. Confirm and Start Exam
    await page.click("button:has-text('Mulai Ujian Sekarang')");
    await page.waitForURL(/\/ujian\//, { timeout: 15000 });

    // 4. In Exam Screen
    await expect(page.locator("text=SIMULASI PENUH SKD")).toBeVisible();
    await expect(page.locator("text=Soal 1 dari 110")).toBeVisible();

    // 5. Select Option A
    await page.locator('[data-testid="option-A"]').click();

    // 6. Toggle Ragu-ragu
    await page.click("button[aria-label='Tandai Ragu']");
    await expect(page.locator("text=Ditandai Ragu")).toBeVisible();

    // 7. Test Navigation: Click Berikutnya then Sebelumnya
    await page.click("button[aria-label='Berikutnya']");
    await expect(page.locator("text=Soal 2 dari 110")).toBeVisible();
    await page.click("button[aria-label='Sebelumnya']");
    await expect(page.locator("text=Soal 1 dari 110")).toBeVisible();

    // 8. Reload Browser (Testing Session Recovery and Local Persistence)
    await page.reload();
    await expect(page.locator("text=SIMULASI PENUH SKD")).toBeVisible();
    await expect(page.locator("text=Soal 1 dari 110")).toBeVisible();

    // 9. Verify answer & flag are preserved across reload
    await expect(page.locator("text=Ditandai Ragu")).toBeVisible();

    // 10. Open Selesai Confirmation Dialog
    await page.click('[data-testid="finish-exam-btn"]');
    await expect(page.locator("h3:has-text('Konfirmasi Akhiri Ujian')")).toBeVisible();

    // 11. Finalize Exam
    await page.click("button:has-text('Ya, Akhiri Ujian')");
    await page.waitForURL(/\/hasil\//, { timeout: 15000 });

    // 12. Check Results Page
    await expect(page.locator("text=Total Skor SKD")).toBeVisible();
    await expect(page.locator("text=Statistik Distribusi Pilihan TKP")).toBeVisible();

    // 13. Open Pembahasan
    await page.click("a:has-text('Lihat Pembahasan Lengkap')");
    await page.waitForURL(/\/pembahasan\//, { timeout: 15000 });
    await expect(page.locator("h1:has-text('Pembahasan & Review Soal')")).toBeVisible();
    await expect(page.locator("text=Pembahasan Detail")).toBeVisible();

    // 14. Check History Page
    await page.goto("/riwayat");
    await expect(page.locator("h1:has-text('Riwayat Simulasi & Latihan')")).toBeVisible();
    await expect(page.locator("td:has-text('SIMULASI')").first()).toBeVisible();
  });
});
