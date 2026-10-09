import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class LenderSelectionPage extends BasePage {
  // LenderSelection is now rendered at application-loader/:app_code (swapped in for
  // the old AutoFlowLoader) rather than a dedicated /lender-selection route.
  readonly proceedButton = '[data-testid="Proceed"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/application-loader/**", { timeout: 15000 });
    await this.page.waitForSelector(this.proceedButton, { timeout: 10000 });
  }

  // Cards are rendered per-lender with a continue button carrying the lender's display name
  // (button text is "CONTINUE WITH {LENDER}", so a substring match on the name still works).
  isLenderVisible(lenderName: string) {
    return this.page.locator(`button:has-text("${lenderName}")`).first();
  }

  async selectLenderByName(lenderName: string) {
    const lenderCard = this.page
      .locator("div", {
        has: this.page.locator(`h3:has-text("${lenderName}")`),
      })
      .first();
    const kfsCheckbox = lenderCard.locator(
      'label:has-text("Key Fact Statement (KFS)") input[type="checkbox"]',
    );

    // Some lenders require KFS consent before the Continue button will proceed.
    if ((await kfsCheckbox.count()) > 0 && !(await kfsCheckbox.isChecked())) {
      await kfsCheckbox.check({ force: true });
    }

    const lenderButton = this.isLenderVisible(lenderName);
    await lenderButton.waitFor({ state: "visible", timeout: 15000 });
    await lenderButton.click();
  }
}
