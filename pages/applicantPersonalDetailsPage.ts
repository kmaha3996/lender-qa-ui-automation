import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class ApplicantPersonalDetailsPage extends BasePage {
  readonly title = '[data-testid="personal-details-title"]';
  readonly panInput = '[data-testid="pan-number-input"]';
  readonly panError = '[data-testid="pan-number-input-error"]';
  readonly genderSelect = '[data-testid="gender-react-select"]';
  readonly genderError = '[data-testid="gender-react-select-error"]';
  readonly yearSelect = '[data-testid="year-react-select"]';
  readonly monthSelect = '[data-testid="month-react-select"]';
  readonly daySelect = '[data-testid="day-react-select"]';
  readonly dobError = '[data-testid="dob-error"]';
  readonly maritalRadio = '[data-testid="marital-status-radio"]';
  readonly maritalError = '[data-testid="marital-status-radio-error"]';
  readonly emailInput = '[data-testid="email-input"]';
  readonly emailError = '[data-testid="email-input-error"]';
  readonly consent = '[data-testid="consent-checkbox"]';
  readonly consentError = '[data-testid="consent-checkbox-error"]';
  readonly proceedButton = '[data-testid="proceed-button"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/applicant-personal-details", {
      timeout: 15000,
    });
    await this.page.waitForSelector(this.panInput, { timeout: 10000 });
  }

  private async selectReactDropdown(selector: string, value?: string) {
    await this.page.locator(selector).click();
    await this.page.waitForTimeout(500);
    if (value) {
      await this.page.keyboard.type(value);
      await this.page.waitForTimeout(500);
      // Prefer the exact-text option: typing "9" also matches "19"/"29", so
      // ArrowDown+Enter would pick the wrong one.
      const exact = this.page.getByRole("option", { name: value, exact: true });
      if ((await exact.count()) > 0) {
        await exact.first().click();
        return;
      }
    }
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
  }

  async fillPersonalDetails(data: {
    pan: string;
    gender: string;
    dobYear: string;
    dobMonth: string;
    dobDay: string;
    maritalStatus: string;
    email: string;
  }) {
    await this.fill(this.panInput, data.pan);
    // Gender is now a radio group (the testid kept its old "react-select" name).
    await this.page
      .getByRole("radio", { name: data.gender, exact: true })
      .click();
    await this.selectReactDropdown(this.yearSelect, data.dobYear);
    await this.selectReactDropdown(this.monthSelect, data.dobMonth);
    await this.selectReactDropdown(this.daySelect, data.dobDay);
    // Marital status — click the requested option if present, else the first radio
    const marital = this.page.getByRole("radio", {
      name: data.maritalStatus,
      exact: true,
    });
    if ((await marital.count()) > 0) {
      await marital.click();
    } else {
      await this.page.locator(this.maritalRadio).first().click();
    }
    await this.fill(this.emailInput, data.email);
    await this.page.locator(this.consent).check();
  }

  async clickProceed() {
    await this.click(this.proceedButton);
  }
}
