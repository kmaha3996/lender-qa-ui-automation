import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class DashboardPage extends BasePage {
  // Verified selectors from live site inspection
  readonly createNewAppButton = '[data-testid="create-new-application-button"]';
  readonly profileButton = '[data-testid="profile-button"]';
  readonly emiTab = '[data-testid="emi-tab-navigation-button"]';
  readonly insuranceTab = '[data-testid="ins-tab-navigation-button"]';
  readonly autoPaymentsTab = '[data-testid="ad-tab-navigation-button"]';
  readonly transactionHistoryTab = '[data-testid="pg-tab-navigation-button"]';
  readonly loadMoreButton = '[data-testid="load-more-button"]';

  // Modal selectors (appears when existing incomplete app exists)
  readonly modalCompleteNowButton = '[data-testid="emi-card-action-button"]';
  readonly modalCreateNewButton =
    'button:has-text("CREATE NEW APPLICATION"):not([data-testid])';

  constructor(page: Page) {
    super(page);
  }

  async waitForDashboard() {
    await this.page.waitForURL("**/my-applications", { timeout: 15000 });
    await this.page.waitForSelector(this.createNewAppButton, {
      timeout: 10000,
    });
  }

  async clickCreateNewApplication() {
    // Clicking before the applications list has loaded is silently ignored, and a
    // "Before you proceed" modal opens if there are existing incomplete applications.
    // Retry the click until either the modal or the student-details page shows up.
    const modalCreate = this.page
      .getByRole("dialog")
      .locator(this.modalCreateNewButton);
    for (let attempt = 0; attempt < 3; attempt++) {
      await this.click(this.createNewAppButton);
      const outcome = await Promise.race([
        modalCreate
          .waitFor({ state: "visible", timeout: 7000 })
          .then(() => "modal"),
        this.page
          .waitForURL("**/student-details", { timeout: 7000 })
          .then(() => "page"),
      ]).catch(() => "none");
      if (outcome === "modal") {
        await modalCreate.click();
        return;
      }
      if (outcome === "page") return;
    }
  }

  async isDashboardDisplayed(): Promise<boolean> {
    return this.page.locator(this.createNewAppButton).isVisible();
  }

  async clickTab(
    tab: "emi" | "insurance" | "autoPayments" | "transactionHistory",
  ) {
    const tabMap = {
      emi: this.emiTab,
      insurance: this.insuranceTab,
      autoPayments: this.autoPaymentsTab,
      transactionHistory: this.transactionHistoryTab,
    };
    await this.click(tabMap[tab]);
  }
}
