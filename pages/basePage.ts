import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async click(selector: string) {
    await this.page
      .locator(selector)
      .waitFor({ state: "visible", timeout: 10000 });
    await this.page.locator(selector).click();
  }

  async fill(selector: string, text: string) {
    await this.page
      .locator(selector)
      .waitFor({ state: "visible", timeout: 10000 });
    await this.page.locator(selector).fill(text);
  }

  async getText(selector: string): Promise<string> {
    return (await this.page.textContent(selector)) || "";
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).isVisible();
  }

  async waitForURL(pattern: string, timeout = 10000) {
    await this.page.waitForURL(`**/${pattern}`, { timeout });
  }
}
