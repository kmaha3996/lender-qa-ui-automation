import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SelectApplicantPage extends BasePage {
  readonly title = '[data-testid="select-applicant-title"]';
  readonly parentOption = '[data-testid="Parent/Guardian-0"]';
  readonly studentOption = '[data-testid="Student-1"]';
  readonly ageCheckbox = 'input[type="checkbox"]#age';
  readonly salaryCheckbox = 'input[type="checkbox"]#salary';
  readonly consentError = '[data-testid="conset-error"]'; // typo intentional — matches source
  readonly applicantError = '[data-testid="applicant-type-error"]';
  readonly submitButton = '[data-testid="submit-applicant-type-button"]';
  readonly backButton = '[data-testid="back-button"]';
  readonly closeButton = 'button[aria-label="Close"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/select-applicant", { timeout: 15000 });
    await this.page.waitForSelector(this.title, { timeout: 10000 });
  }

  async selectParentGuardian() {
    await this.click(this.parentOption);
  }

  async selectStudent() {
    await this.click(this.studentOption);
  }

  async checkEligibilityConsents() {
    const age = this.page.locator(this.ageCheckbox);
    const salary = this.page.locator(this.salaryCheckbox);
    if (await age.isVisible()) {
      if (!(await age.isChecked())) await age.check();
    }
    if (await salary.isVisible()) {
      if (!(await salary.isChecked())) await salary.check();
    }
  }

  async clickSubmit() {
    await this.click(this.submitButton);
  }
}
