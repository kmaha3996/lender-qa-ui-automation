import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class ConfirmApplicationPage extends BasePage {
  readonly title = '[data-testid="confirm-application-title"]';
  readonly form = '[data-testid="confirm-application-form"]';
  readonly consent = '[data-testid="consent-checkbox"]';
  readonly proceedButton = '[data-testid="proceed-button"]';

  // Edit buttons for each section
  readonly studentDetailsEdit = '[data-testid="student-details-edit-button"]';
  readonly emiPlanEdit = '[data-testid="emi-plan-details-edit-button"]';
  readonly whoApplyingEdit = '[data-testid="who-is-applying?-edit-button"]';
  readonly generalDetailsEdit =
    '[data-testid="your-general-details-edit-button"]';
  readonly residentialEdit =
    '[data-testid="your-residential-details-edit-button"]';
  readonly employmentEdit =
    '[data-testid="your-employment-details-edit-button"]';

  // Referral code
  readonly skipButton = '[data-testid="skip-button"]';
  readonly referralCodeHeading = '[data-testid="referral-code-heading"]';
  readonly referralCodeValue = '[data-testid="code-value"]';
  readonly referralCodeEdit = '[data-testid="referral-code-edit-button"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/confirm-application", { timeout: 15000 });
    await this.page.waitForSelector(this.title, { timeout: 10000 });
  }

  async acceptConsentAndProceed() {
    await this.page.locator(this.consent).check();
    await this.click(this.proceedButton);
  }

  // The referral-code modal opens a moment after the page renders — give it a few
  // seconds to appear before deciding there's nothing to skip.
  async skipReferralCode() {
    const skip = this.page
      .getByRole("dialog")
      .getByRole("button", { name: /skip/i })
      .or(this.page.locator(this.skipButton))
      .first();
    const appeared = await skip
      .waitFor({ state: "visible", timeout: 8000 })
      .then(
        () => true,
        () => false,
      );
    if (appeared) {
      await skip.click();
      await this.page
        .getByRole("dialog")
        .waitFor({ state: "hidden", timeout: 5000 })
        .catch(() => {});
    }
  }
}
