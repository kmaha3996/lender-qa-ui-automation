import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class ViewApplicantDetailsPage extends BasePage {
  readonly viewDetailsButton = '[data-testid="view-application-details"]';
  readonly optionButton = '[data-testid="emi-card-option-button"]';
  readonly backButton = '[data-testid="back-button"]';
  readonly closeButton = 'button[aria-label="Close"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/application-details**", { timeout: 15000 });
    await this.page.waitForSelector(this.backButton, { timeout: 10000 });
  }
}
