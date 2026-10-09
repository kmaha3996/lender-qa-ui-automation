import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class RepaymentSchedulePage extends BasePage {
  readonly actionButton = '[data-testid="emi-card-action-button"]';
  readonly optionButton = '[data-testid="emi-card-option-button"]';
  readonly payNowButton = '[data-testid="pay-now-button"]';
  // No back button exists on this page (Repayment.jsx) - kept only for other pages' use.
  readonly backButton = '[data-testid="back-button"]';
  readonly closeButton = 'button[aria-label="Close"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    // Real route is repayment/:app_code, not repayment-schedule.
    await this.page.waitForURL("**/repayment/**", { timeout: 15000 });
    await this.page.waitForSelector("text=EMI Repayment Schedule", {
      timeout: 10000,
    });
  }

  async clickPayNow() {
    await this.click(this.payNowButton);
  }
}
