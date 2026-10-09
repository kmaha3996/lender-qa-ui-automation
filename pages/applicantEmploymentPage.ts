import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class ApplicantEmploymentPage extends BasePage {
  readonly title = '[data-testid="work-title"]';

  // Salaried fields
  readonly employerNameInput = '[data-testid="employer-name-input"]';
  readonly salaryInput = '[data-testid="net-monthly-salary-input"]';
  readonly inWords = '[data-testid="in-words"]';
  readonly employerNameError = '[data-testid="employer-name-input-error"]';
  readonly salaryError = '[data-testid="net-monthly-salary-input-error"]';

  // Self-employed fields
  readonly businessNameInput = '[data-testid="business-name-input"]';
  readonly annualIncomeInput = '[data-testid="business-annual-income-input"]';
  readonly yearsInput = '[data-testid="years-of-current-business-input"]';
  readonly descriptionInput = '[data-testid="business-description-input"]';
  readonly businessNameError = '[data-testid="business-name-input-error"]';
  readonly annualIncomeError =
    '[data-testid="business-annual-income-input-error"]';
  readonly yearsError = '[data-testid="years-of-current-business-input-error"]';

  readonly consent = '[data-testid="consent-checkbox"]';
  readonly consentError = '[data-testid="consent-checkbox-error"]';
  readonly proceedButton = '[data-testid="proceed-button"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/applicant-employment-details", {
      timeout: 15000,
    });
    await this.page.waitForSelector(this.title, { timeout: 10000 });
  }

  async fillSalariedDetails(data: {
    employerName: string;
    monthlySalary: string;
  }) {
    await this.fill(this.employerNameInput, data.employerName);
    await this.fill(this.salaryInput, data.monthlySalary);
    await this.checkConsentIfPresent();
  }

  async fillSelfEmployedDetails(data: {
    businessName: string;
    annualIncome: string;
    yearsInBusiness: string;
    description?: string;
  }) {
    await this.fill(this.businessNameInput, data.businessName);
    await this.fill(this.annualIncomeInput, data.annualIncome);
    await this.fill(this.yearsInput, data.yearsInBusiness);
    if (data.description)
      await this.fill(this.descriptionInput, data.description);
    await this.checkConsentIfPresent();
  }

  // The consent checkbox has been removed from the salaried form on UAT; keep
  // checking it where it still renders.
  private async checkConsentIfPresent() {
    const consent = this.page.locator(this.consent);
    if (await consent.isVisible()) await consent.check();
  }

  async clickProceed() {
    // Proceed lost its data-testid on the revamped form — match by role instead
    await this.page.getByRole("button", { name: /proceed/i }).click();
  }
}
