import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class ApplicantResidentialDetailsPage extends BasePage {
  readonly title = '[data-testid="residential-details-title"]';
  readonly addressSummary = '[data-testid="address-summary"]';
  readonly editButton = '[data-testid="edit-button"]';
  readonly addrLine1 = '[data-testid="addr-line-1-input"]';
  readonly addrLine2 = '[data-testid="addr-line-2-input"]';
  readonly pincodeInput = '[data-testid="pincode-input"]';
  readonly cityState = '[data-testid="city-state"]';
  readonly cityInput = '[data-testid="city-input"]';
  readonly stateSelect = '[data-testid="state-react-select"]';
  readonly residenceType = '[data-testid="residence-type-title"]';
  readonly typeRadio = '[data-testid="type-radio"]';
  readonly proceedButton = '[data-testid="proceed-button"]';
  readonly addrLine1Error = '[data-testid="addr-line-1-input-error"]';
  readonly pincodeError = '[data-testid="pincode-input-error"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/applicant-residential-details", {
      timeout: 15000,
    });
    await this.page.waitForSelector(this.title, { timeout: 10000 });
  }

  async fillResidentialDetails(data: {
    addrLine1: string;
    addrLine2?: string;
    pincode: string;
    residenceType?: string;
  }) {
    await this.fill(this.addrLine1, data.addrLine1);
    if (data.addrLine2) await this.fill(this.addrLine2, data.addrLine2);
    await this.fill(this.pincodeInput, data.pincode);
    await this.page.waitForTimeout(1500); // wait for pincode lookup
  }

  // Two-step form: the first Proceed saves the address and swaps to an address summary
  // with the residence-type question; a second Proceed moves on to the next page.
  async clickProceed(residenceType = "Self Owned") {
    await this.click(this.proceedButton);
    const typeOption = this.page.getByRole("radio", {
      name: residenceType,
      exact: true,
    });
    await typeOption.waitFor({ state: "visible", timeout: 15000 });
    if (!(await typeOption.isChecked())) await typeOption.click();
    // The summary step's Proceed button has no data-testid
    await this.page.getByRole("button", { name: /proceed/i }).click();
    await this.page.waitForURL(
      (url) => !url.pathname.includes("applicant-residential-details"),
      { timeout: 30000 },
    );
  }
}
