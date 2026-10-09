import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class OkycPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/okyc/**", { timeout: 30000 });
  }

  async isOnOkycPage(): Promise<boolean> {
    return this.page.url().includes("/okyc/");
  }

  getAppIdFromUrl(): string {
    const url = this.page.url();
    return url.split("/okyc/")[1]?.split("?")[0]?.replace(/\/$/, "") || "";
  }
}
