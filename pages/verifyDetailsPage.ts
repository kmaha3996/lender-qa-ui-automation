import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class VerifyDetailsPage extends BasePage {
  // Employment type selection (re-used on this page for editing)
  readonly salariedCard = '[data-testid="salaried"]';
  readonly selfEmployedCard = '[data-testid="self-employed"]';

  // Salaried fields
  readonly employerNameInput = '[data-testid="employer-name-input"]';
  readonly salaryInput = '[data-testid="net-monthly-salary-input"]';
  readonly employerNameError = '[data-testid="employer-name-input-error"]';
  readonly salaryError = '[data-testid="net-monthly-salary-input-error"]';

  // Self-employed fields
  readonly businessNameInput = '[data-testid="business-name-input"]';
  readonly annualIncomeInput = '[data-testid="business-annual-income-input"]';
  readonly yearsInput = '[data-testid="years-of-current-business-input"]';
  readonly descriptionInput = '[data-testid="business-description-input"]';

  // Address fields
  readonly addrLine1 = '[data-testid="addr-line-1-input"]';
  readonly addrLine2 = '[data-testid="addr-line-2-input"]';
  readonly pincodeInput = '[data-testid="pincode-input"]';
  readonly pincodeError = '[data-testid="pincode-input-error"]';
  readonly typeRadio = '[data-testid="type-radio"]';
  readonly typeRadioAlt = '[data-testid="type-radio-container-1"]';

  readonly consent = '[data-testid="consent-checkbox"]';
  readonly proceedButton = '[data-testid="proceed-button"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/verify-details**", { timeout: 15000 });
    await this.page.waitForSelector(this.proceedButton, { timeout: 10000 });
  }

  async clickProceed() {
    await this.click(this.proceedButton);
  }
}
