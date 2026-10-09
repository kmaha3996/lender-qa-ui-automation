import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { OtpPage } from "../pages/otpPage";
import { TEST_DATA } from "../utils/testData";
import { takeScreenshot } from "../utils/helpers";

test.describe("Login Page", () => {
  test("should display login page with all required elements", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await expect(
      page.locator('[data-testid="mobile-number-input"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="consent-checkbox"]'),
    ).toBeVisible();
    await expect(page.locator('[data-testid="send-otp-button"]')).toBeVisible();
    await takeScreenshot(page, "login-page");
  });

  test("should send OTP and show OTP verification page", async ({ page }) => {
    const login = new LoginPage(page);
    const otp = new OtpPage(page);
    await login.navigate();
    await login.enterPhone(TEST_DATA.login.mobile);
    await login.acceptTNC();
    await login.clickSendOTP();
    await otp.waitForOtpPage();
    await expect(page.locator('[data-testid="otp-input"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="verify-otp-button"]'),
    ).toBeVisible();
    await takeScreenshot(page, "otp-page");
  });

  test("should verify OTP and land on dashboard", async ({ page }) => {
    const login = new LoginPage(page);
    const otp = new OtpPage(page);
    await login.navigate();
    await login.enterPhone(TEST_DATA.login.mobile);
    await login.acceptTNC();
    await login.clickSendOTP();
    await otp.waitForOtpPage();
    await otp.enterOTP(TEST_DATA.login.otp);
    await otp.clickVerifyOTP();
    await page.waitForURL("**/my-applications", { timeout: 15000 });
    expect(page.url()).toContain("my-applications");
    await takeScreenshot(page, "post-login-dashboard");
  });
});
