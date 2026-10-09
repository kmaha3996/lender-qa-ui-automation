import { test, expect } from "../fixtures/authenticatedPage";
import { DashboardPage } from "../pages/dashboardPage";
import { StudentDetailsPage } from "../pages/studentDetailsPage";
import { TEST_DATA } from "../utils/testData";
import { takeScreenshot } from "../utils/helpers";

test.describe("Application Flow", () => {
  test("should navigate to student details from dashboard", async ({
    authenticatedPage: page,
  }) => {
    const dashboard = new DashboardPage(page);
    const studentDetails = new StudentDetailsPage(page);
    await dashboard.clickCreateNewApplication();
    await studentDetails.waitForPage();
    expect(page.url()).toContain("student-details");
    await takeScreenshot(page, "app-student-details");
  });

  test("should fill student details form completely", async ({
    authenticatedPage: page,
  }) => {
    const dashboard = new DashboardPage(page);
    const studentDetails = new StudentDetailsPage(page);
    await dashboard.clickCreateNewApplication();
    await studentDetails.waitForPage();
    await studentDetails.fillStudentDetails(TEST_DATA.studentDetails);
    await takeScreenshot(page, "app-form-filled");
  });
});
