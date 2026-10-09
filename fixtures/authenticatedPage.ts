import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { OtpPage } from "../pages/otpPage";
import { TEST_DATA } from "../utils/testData";

type AuthFixture = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixture>({
  authenticatedPage: async ({ page }, use) => {
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
    await use(page);
  },
});

export { expect } from "@playwright/test";
