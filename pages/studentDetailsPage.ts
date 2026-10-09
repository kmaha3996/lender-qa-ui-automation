import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class StudentDetailsPage extends BasePage {
  // GILE dropdowns
  readonly instituteDropdown = '[data-testid="institute-id-react-select"]';
  readonly locationDropdown = '[data-testid="location-id-react-select"]';
  readonly boardDropdown = '[data-testid="board-id-react-select"]';
  readonly academicYearDropdown =
    '[data-testid="academic-year-id-react-select"]';

  // Student personal details (visible after GILE is filled)
  readonly firstNameInput = '[data-testid="first-name-input"]';
  readonly lastNameInput = '[data-testid="last-name-input"]';
  readonly studentTypeRadio = '[data-testid="student-type-radio"]';
  readonly classDropdown = '[data-testid="class-id-react-select"]';
  readonly studentIdInput = '[data-testid="student-id-input"]';
  readonly loanAmountInput = '[data-testid="loan-amount-input"]';

  // NOTE: show-plans-button uses 'testidfor', not 'data-testid'
  readonly showPlansButton = '[testidfor="show-plans-button"]';
  readonly closeButton = 'button[aria-label="Close"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/student-details", { timeout: 10000 });
    await this.page.waitForSelector(this.instituteDropdown, { timeout: 10000 });
  }

  // React Select: type to search, then ArrowDown + Enter (menu is portalled outside DOM)
  private async selectReactDropdown(selector: string, searchText?: string) {
    await this.page
      .locator(selector)
      .waitFor({ state: "visible", timeout: 10000 });
    await this.page.locator(selector).click();
    if (searchText) {
      await this.page.keyboard.type(searchText);
      await this.page.waitForTimeout(2000);
    } else {
      await this.page.waitForTimeout(500);
    }
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(500);
  }

  async selectInstitute(searchText: string) {
    await this.selectReactDropdown(this.instituteDropdown, searchText);
  }

  async selectLocation() {
    await this.selectReactDropdown(this.locationDropdown);
  }

  async selectBoard() {
    await this.selectReactDropdown(this.boardDropdown);
  }

  async selectAcademicYear(year?: string) {
    await this.selectReactDropdown(this.academicYearDropdown, year);
  }

  async selectClass() {
    await this.selectReactDropdown(this.classDropdown);
  }

  async fillStudentDetails(data: {
    institute: string;
    firstName: string;
    lastName: string;
    studentId?: string;
    loanAmount: string;
    admissionType?: "Existing Student" | "New Admission";
    academicYear?: string;
  }) {
    await this.selectInstitute(data.institute);
    await this.selectLocation();
    await this.selectBoard();
    await this.selectAcademicYear(data.academicYear);

    // Personal details section appears after GILE is filled
    await this.page.waitForSelector(this.firstNameInput, { timeout: 15000 });
    await this.fill(this.firstNameInput, data.firstName);
    await this.fill(this.lastNameInput, data.lastName);
    // Admission type is mandatory — Show Plans silently fails validation without it
    await this.page
      .getByRole("radio", { name: data.admissionType ?? "Existing Student" })
      .click();
    await this.selectClass();
    if (data.studentId) {
      await this.fill(this.studentIdInput, data.studentId);
    }
    await this.fill(this.loanAmountInput, data.loanAmount);
  }

  async clickShowPlans() {
    await this.page
      .locator(this.showPlansButton)
      .waitFor({ state: "visible", timeout: 30000 });
    await this.page.locator(this.showPlansButton).click();
  }

  async close() {
    await this.click(this.closeButton);
  }
}
