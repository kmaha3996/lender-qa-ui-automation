import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class EmploymentTypePage extends BasePage {
  readonly title = '[data-testid="select-employment-type-title"]';
  readonly salariedCard = '[data-testid="salaried"]';
  readonly selfEmployedCard = '[data-testid="self-employed"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/select-employment", { timeout: 15000 });
    await this.page.waitForSelector(this.title, { timeout: 10000 });
  }

  async selectSalaried() {
    await this.click(this.salariedCard);
  }

  async selectSelfEmployed() {
    await this.click(this.selfEmployedCard);
  }
}
