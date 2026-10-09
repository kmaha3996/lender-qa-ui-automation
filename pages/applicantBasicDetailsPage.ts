import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class ApplicantBasicDetailsPage extends BasePage {
  readonly title = '[data-testid="applicant-basic-details-title"]';
  readonly firstNameInput = '[data-testid="first-name-input"]';
  readonly lastNameInput = '[data-testid="last-name-input"]';
  readonly firstNameError = '[data-testid="first-name-input-error"]';
  readonly lastNameError = '[data-testid="last-name-input-error"]';
  readonly consent = '[data-testid="consent-checkbox"]';
  readonly consentError = '[data-testid="consent-checkbox-error"]';
  readonly submitButton = '[data-testid="submit-button"]';
  readonly backButton = '[data-testid="back-button"]';
  readonly closeButton = 'button[aria-label="Close"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/applicant-basic-details", {
      timeout: 15000,
    });
    await this.page.waitForSelector(this.firstNameInput, { timeout: 10000 });
  }

  async fillBasicDetails(firstName: string, lastName: string) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
  }

  async acceptConsent() {
    await this.page.locator(this.consent).check();
  }

  async clickSubmit() {
    await this.click(this.submitButton);
  }
}
