import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class EsignPage extends BasePage {
  readonly title = '[data-testid="agreement-title"]';
  readonly summaryTitle = '[data-testid="agreement-summary-title"]';
  readonly customerName = '[data-testid="customer-name"]';
  readonly lenderName = '[data-testid="lender-name"]';
  readonly emiAmount = '[data-testid="emi-amount"]';
  readonly tenure = '[data-testid="tenure"]';
  readonly totalFeeAmount = '[data-testid="total-fee-amount"]';
  readonly payableToday = '[data-testid="payable-today"]';
  readonly aprValue = '[data-testid="apr-value"]';
  readonly debitedDate = '[data-testid="debited-date"]';
  readonly mobileValue = '[data-testid="mobile-number-value"]';
  readonly emailValue = '[data-testid="email-value"]';
  readonly nameValue = '[data-testid="name-value"]';
  readonly instituteName = '[data-testid="institute_name"]';
  readonly studentName = '[data-testid="student_name"]';
  readonly viewAgreementButton = '[data-testid="view-agreement-button"]';
  readonly acceptTCButton = '[data-testid="accept-terms-conditions-button"]';
  readonly previewProceedButton =
    '[data-testid="agreement-preview-proceed-button"]';
  readonly consent = '[data-testid="consent-checkbox"]';
  readonly consentError = '[data-testid="consent-checkbox-error"]';
  readonly backButton = '[data-testid="back-button"]';
  readonly closeButton = 'button[aria-label="Close"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/esign/**", { timeout: 15000 });
    await this.page.waitForSelector(this.title, { timeout: 10000 });
  }

  async acceptAndProceed() {
    await this.page.locator(this.consent).check();
    await this.click(this.previewProceedButton);
  }

  async viewAndAcceptAgreement() {
    await this.click(this.viewAgreementButton);
    await this.page
      .locator(this.acceptTCButton)
      .waitFor({ state: "visible", timeout: 10000 });
    await this.click(this.acceptTCButton);
  }
}
