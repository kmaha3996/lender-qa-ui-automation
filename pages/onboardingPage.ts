import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class OnboardingPage extends BasePage {
  readonly title = '[data-testid="onboarding-title"]';
  readonly infoOne = '[data-testid="onboarding-info-one"]';
  readonly infoTwo = '[data-testid="onboarding-info-two"]';
  readonly infoThree = '[data-testid="onboarding-info-three"]';
  readonly proceedButton = '[data-testid="proceed-button"]';
  readonly backButton = '[data-testid="back-button"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/onboarding", { timeout: 15000 });
    await this.page.waitForSelector(this.proceedButton, { timeout: 10000 });
  }

  async clickProceed() {
    await this.click(this.proceedButton);
  }
}
