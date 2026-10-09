import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class OtpPage extends BasePage {
  // Verified selectors from live site inspection
  readonly otpInput = '[data-testid="otp-input"]';
  readonly verifyOtpButton = '[data-testid="verify-otp-button"]';
  readonly backButton = '[data-testid="back-button"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForOtpPage() {
    await this.page.waitForSelector(this.otpInput, { timeout: 15000 });
  }

  async enterOTP(otp: string) {
    await this.fill(this.otpInput, otp);
  }

  async clickVerifyOTP() {
    await this.click(this.verifyOtpButton);
  }

  async clickBack() {
    await this.click(this.backButton);
  }

  async isOtpPageDisplayed(): Promise<boolean> {
    return this.page.locator(this.otpInput).isVisible();
  }
}
