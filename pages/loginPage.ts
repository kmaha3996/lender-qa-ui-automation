import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  // Verified selectors from live site inspection
  readonly mobileInput = '[data-testid="mobile-number-input"]';
  readonly consentCheckbox = '[data-testid="consent-checkbox"]';
  readonly sendOtpButton = '[data-testid="send-otp-button"]';

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await this.goto("/");
    await this.page.waitForSelector(this.mobileInput, { timeout: 10000 });
  }

  async enterPhone(phone: string) {
    await this.fill(this.mobileInput, phone);
  }

  async acceptTNC() {
    await this.page.locator(this.consentCheckbox).check();
  }

  async clickSendOTP() {
    await this.click(this.sendOtpButton);
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    return this.page.locator(this.mobileInput).isVisible();
  }
}
