import { test, expect } from "../fixtures/authenticatedPage";
import { LoginPage } from "../pages/loginPage";
import { OtpPage } from "../pages/otpPage";
import { DashboardPage } from "../pages/dashboardPage";
import { StudentDetailsPage } from "../pages/studentDetailsPage";
import { ChoosePlanPage } from "../pages/choosePlanPage";
import { SelectApplicantPage } from "../pages/selectApplicantPage";
import { ApplicantBasicDetailsPage } from "../pages/applicantBasicDetailsPage";
import { OnboardingPage } from "../pages/onboardingPage";
import { ApplicantPersonalDetailsPage } from "../pages/applicantPersonalDetailsPage";
import { ApplicantResidentialDetailsPage } from "../pages/applicantResidentialDetailsPage";
import { EmploymentTypePage } from "../pages/employmentTypePage";
import { ApplicantEmploymentPage } from "../pages/applicantEmploymentPage";
import { ConfirmApplicationPage } from "../pages/confirmApplicationPage";
import { takeScreenshot } from "../utils/helpers";
import { TEST_DATA } from "../utils/testData";

// ─── Login Flow ────────────────────────────────────────────────────────────────
test.describe("TC-01 Login Flow", () => {
  test("Login page loads with all required elements", async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await expect(
      page.locator('[data-testid="mobile-number-input"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="consent-checkbox"]'),
    ).toBeVisible();
    await expect(page.locator('[data-testid="send-otp-button"]')).toBeVisible();
    await takeScreenshot(page, "TC-01-login-page");
  });

  test("OTP page appears after entering mobile", async ({ page }) => {
    const login = new LoginPage(page);
    const otp = new OtpPage(page);
    await login.navigate();
    await login.enterPhone(TEST_DATA.login.mobile);
    await login.acceptTNC();
    await login.clickSendOTP();
    await otp.waitForOtpPage();
    await expect(page.locator('[data-testid="otp-input"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="verify-otp-button"]'),
    ).toBeVisible();
    await takeScreenshot(page, "TC-01-otp-page");
  });

  test("Successful login lands on dashboard", async ({ page }) => {
    const login = new LoginPage(page);
    const otp = new OtpPage(page);
    await login.navigate();
    await login.enterPhone(TEST_DATA.login.mobile);
    await login.acceptTNC();
    await login.clickSendOTP();
    await otp.waitForOtpPage();
    await otp.enterOTP(TEST_DATA.login.otp);
    await otp.clickVerifyOTP();
    await page.waitForURL("**/my-applications", { timeout: 15000 });
    expect(page.url()).toContain("my-applications");
    await takeScreenshot(page, "TC-01-dashboard");
  });
});

// ─── Dashboard ─────────────────────────────────────────────────────────────────
test.describe("TC-02 Dashboard", () => {
  test("Dashboard elements are visible after login", async ({
    authenticatedPage: page,
  }) => {
    await expect(
      page.locator('[data-testid="create-new-application-button"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="emi-tab-navigation-button"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="ins-tab-navigation-button"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="ad-tab-navigation-button"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="pg-tab-navigation-button"]'),
    ).toBeVisible();
    await takeScreenshot(page, "TC-02-dashboard");
  });

  test("Create New Application opens student details", async ({
    authenticatedPage: page,
  }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.clickCreateNewApplication();
    await page.waitForURL("**/student-details", { timeout: 10000 });
    expect(page.url()).toContain("student-details");
    await takeScreenshot(page, "TC-02-student-details");
  });
});

// ─── Student Details ───────────────────────────────────────────────────────────
test.describe("TC-03 Student Details", () => {
  test("All GILE dropdowns are visible", async ({
    authenticatedPage: page,
  }) => {
    const dashboard = new DashboardPage(page);
    const studentDetails = new StudentDetailsPage(page);
    await dashboard.clickCreateNewApplication();
    await studentDetails.waitForPage();
    await expect(
      page.locator('[data-testid="institute-id-react-select"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="location-id-react-select"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="board-id-react-select"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="academic-year-id-react-select"]'),
    ).toBeVisible();
    await takeScreenshot(page, "TC-03-student-details-dropdowns");
  });

  test("Personal details section appears after GILE is filled", async ({
    authenticatedPage: page,
  }) => {
    const dashboard = new DashboardPage(page);
    const studentDetails = new StudentDetailsPage(page);
    await dashboard.clickCreateNewApplication();
    await studentDetails.waitForPage();
    await studentDetails.selectInstitute(TEST_DATA.studentDetails.institute);
    await studentDetails.selectLocation();
    await studentDetails.selectBoard();
    await studentDetails.selectAcademicYear();
    await expect(
      page.locator('[data-testid="student-details-title"]'),
    ).toBeVisible({ timeout: 15000 });
    await takeScreenshot(page, "TC-03-personal-details-appeared");
  });

  test("Fill all student details and click Show Plans", async ({
    authenticatedPage: page,
  }) => {
    const dashboard = new DashboardPage(page);
    const studentDetails = new StudentDetailsPage(page);
    await dashboard.clickCreateNewApplication();
    await studentDetails.waitForPage();
    await studentDetails.fillStudentDetails(TEST_DATA.studentDetails);
    await studentDetails.clickShowPlans();
    await page.waitForURL("**/choose-plan", { timeout: 15000 });
    expect(page.url()).toContain("choose-plan");
    await takeScreenshot(page, "TC-03-choose-plan");
  });
});

// ─── Choose Plan ───────────────────────────────────────────────────────────────
test.describe("TC-04 Choose Plan", () => {
  test("Plan list is visible", async ({ authenticatedPage: page }) => {
    const dashboard = new DashboardPage(page);
    const studentDetails = new StudentDetailsPage(page);
    const choosePlan = new ChoosePlanPage(page);
    await dashboard.clickCreateNewApplication();
    await studentDetails.waitForPage();
    await studentDetails.fillStudentDetails(TEST_DATA.studentDetails);
    await studentDetails.clickShowPlans();
    await choosePlan.waitForPage();
    await expect(
      page.locator('[data-testid="choose-plan-title"]'),
    ).toBeVisible();
    await takeScreenshot(page, "TC-04-choose-plan-page");
  });

  test("Select first plan and proceed", async ({ authenticatedPage: page }) => {
    const dashboard = new DashboardPage(page);
    const studentDetails = new StudentDetailsPage(page);
    const choosePlan = new ChoosePlanPage(page);
    await dashboard.clickCreateNewApplication();
    await studentDetails.waitForPage();
    await studentDetails.fillStudentDetails(TEST_DATA.studentDetails);
    await studentDetails.clickShowPlans();
    await choosePlan.waitForPage();
    await choosePlan.selectFirstPlan();
    await choosePlan.clickSubmit();
    await page.waitForURL("**/select-applicant", { timeout: 15000 });
    expect(page.url()).toContain("select-applicant");
    await takeScreenshot(page, "TC-04-select-applicant");
  });
});

// ─── Select Applicant ──────────────────────────────────────────────────────────
test.describe("TC-05 Select Applicant", () => {
  test("Both applicant options are visible", async ({
    authenticatedPage: page,
  }) => {
    // Navigate directly via URL (session is active)
    await page.goto("/select-applicant");
    await expect(
      page.locator('[data-testid="Parent/Guardian-0"]'),
    ).toBeVisible();
    await expect(page.locator('[data-testid="Student-1"]')).toBeVisible();
    await takeScreenshot(page, "TC-05-select-applicant");
  });
});

// ─── Full End-to-End Journey ───────────────────────────────────────────────────
test.describe("TC-09 End-to-End Customer Journey", () => {
  test("Complete journey: Login → Dashboard → Student Details → Plan → Applicant", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const otp = new OtpPage(page);
    const dashboard = new DashboardPage(page);
    const studentDetails = new StudentDetailsPage(page);
    const choosePlan = new ChoosePlanPage(page);
    const selectApplicant = new SelectApplicantPage(page);
    const basicDetails = new ApplicantBasicDetailsPage(page);
    const onboarding = new OnboardingPage(page);

    // Step 1 — Login
    console.log("\n── STEP 1: Login ──");
    await login.navigate();
    await login.enterPhone(TEST_DATA.login.mobile);
    await login.acceptTNC();
    await login.clickSendOTP();
    await otp.waitForOtpPage();
    await otp.enterOTP(TEST_DATA.login.otp);
    await otp.clickVerifyOTP();
    await dashboard.waitForDashboard();
    await takeScreenshot(page, "E2E-01-dashboard");

    // Step 2 — Start new application
    console.log("\n── STEP 2: Create New Application ──");
    await dashboard.clickCreateNewApplication();
    await studentDetails.waitForPage();
    await takeScreenshot(page, "E2E-02-student-details");

    // Step 3 — Fill Student Details
    console.log("\n── STEP 3: Student Details ──");
    await studentDetails.fillStudentDetails(TEST_DATA.studentDetails);
    await studentDetails.clickShowPlans();
    await choosePlan.waitForPage();
    await takeScreenshot(page, "E2E-03-choose-plan");

    // Step 4 — Choose Plan
    console.log("\n── STEP 4: Choose Plan ──");
    await choosePlan.selectFirstPlan();
    await choosePlan.clickSubmit();
    await selectApplicant.waitForPage();
    await takeScreenshot(page, "E2E-04-select-applicant");

    // Step 5 — Select Applicant Type
    console.log("\n── STEP 5: Select Applicant ──");
    await selectApplicant.selectParentGuardian();
    await selectApplicant.clickSubmit();
    await basicDetails.waitForPage();
    await takeScreenshot(page, "E2E-05-basic-details");

    // Step 6 — Applicant Basic Details
    console.log("\n── STEP 6: Basic Details ──");
    await basicDetails.fillBasicDetails(
      TEST_DATA.applicant.firstName,
      TEST_DATA.applicant.lastName,
    );
    await basicDetails.acceptConsent();
    await basicDetails.clickSubmit();
    await takeScreenshot(page, "E2E-06-after-basic-details");

    console.log("\n── JOURNEY COMPLETE (up to basic details) ──");
    expect(page.url()).not.toContain("my-applications");
  });
});
