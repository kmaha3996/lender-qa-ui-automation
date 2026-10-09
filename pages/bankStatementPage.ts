import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class BankStatementPage extends BasePage {
  readonly pageHeading = 'h1[data-testid="verify-your-income-title"]';
  readonly bankSearchInput = 'input[role="combobox"]';
  readonly firstBankOption = '[role="option"]';
  readonly proceedButton = '[data-testid="proceed-button"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/bank-statement/**", { timeout: 15000 });
    await this.page.waitForSelector(this.pageHeading, { timeout: 10000 });
  }

  async searchAndSelectBank(bankName: string) {
    await this.page.locator(this.bankSearchInput).click();
    await this.page.keyboard.type(bankName);
    await this.page
      .locator(this.firstBankOption)
      .first()
      .waitFor({ state: "visible", timeout: 10000 });
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
  }

  async clickProceed() {
    await this.click(this.proceedButton);
  }
}
