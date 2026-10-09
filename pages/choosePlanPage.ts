import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class ChoosePlanPage extends BasePage {
  readonly title = '[data-testid="choose-plan-title"]';
  readonly plansCount = '[data-testid="plans-count"]';
  readonly noPlansFound = '[data-testid="no-plans-found"]';
  readonly planList = '[data-testid="plan-list-container"]';
  readonly firstPlanCard =
    '[data-testid="plan-list-container"] > div:first-child';
  readonly submitButton = '[data-testid="submit-plan-details-button"]';
  readonly backButton = '[data-testid="back-button"]';
  readonly closeButton = 'button[aria-label="Close"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/choose-plan", { timeout: 15000 });
    await this.page.waitForSelector(this.title, { timeout: 10000 });
  }

  async selectFirstPlan() {
    await this.page
      .locator(this.firstPlanCard)
      .waitFor({ state: "visible", timeout: 15000 });
    await this.page.locator(this.firstPlanCard).click();
  }

  // Plan cards show the plan name as text (e.g. "LenderA-09-EMI-Interest"). Waits for the
  // list, selects the first card containing planText, and returns false if none does.
  async selectPlanByText(planText: string): Promise<boolean> {
    const anyCard = this.page.locator(this.firstPlanCard);
    const loaded = await anyCard
      .waitFor({ state: "visible", timeout: 15000 })
      .then(
        () => true,
        () => false,
      );
    if (!loaded) return false;
    const card = this.page
      .locator(`${this.planList} > div`, { hasText: planText })
      .first();
    if ((await card.count()) === 0) return false;
    await card.click();
    return true;
  }

  async listPlanNames(): Promise<string[]> {
    const texts = await this.page
      .locator(`${this.planList} > div`)
      .allInnerTexts();
    return texts.map((t) => t.split("\n").pop() || t);
  }

  async clickSubmit() {
    await this.click(this.submitButton);
  }

  async isPlansAvailable(): Promise<boolean> {
    return this.page.locator(this.planList).isVisible();
  }
}
