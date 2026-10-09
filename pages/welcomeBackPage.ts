import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

// Shown in renewal (nth-application) flow after Choose Plan
export class WelcomeBackPage extends BasePage {
  readonly continueButton = 'button:has-text("CONTINUE WITH THESE DETAILS")';
  readonly changeApplicant =
    'button:has-text("CHANGE APPLICANT DETAILS"), button:has-text("Click to change applicant")';
  readonly title = 'xpath=//span[normalize-space()="Welcome"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/renewal-confirmation**", { timeout: 15000 });
    await this.page
      .locator(this.continueButton)
      .waitFor({ state: "visible", timeout: 10000 });
  }

  async continueWithExistingDetails() {
    await this.page.locator(this.continueButton).click();
  }

  async changeApplicantDetails() {
    await this.page.locator(this.changeApplicant).first().click();
  }
}
