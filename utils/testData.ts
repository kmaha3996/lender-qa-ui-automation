export const TEST_DATA = {
  login: {
    mobile: process.env.MOBILE || "9000000000",
    otp: process.env.OTP || "9999",
  },
  studentDetails: {
    institute: process.env.INSTITUTE || "Sample High School",
    firstName: process.env.STUDENT_FIRST_NAME || "Alex",
    lastName: process.env.STUDENT_LAST_NAME || "Doe",
    loanAmount: process.env.LOAN_AMOUNT || "50000",
  },
  applicant: {
    firstName: process.env.APP_FIRST_NAME || "Test",
    lastName: process.env.APP_LAST_NAME || "User",
    pan: process.env.PAN || "ABCDE1234F",
    email: process.env.EMAIL || "test@example.com",
    dobYear: process.env.DOB_YEAR || "1990",
    dobMonth: process.env.DOB_MONTH || "January",
    dobDay: process.env.DOB_DAY || "15",
    addrLine1: process.env.ADDR_LINE1 || "123 Test Street",
    pincode: process.env.PINCODE || "400001",
    employerName: process.env.EMPLOYER_NAME || "Test Company",
    monthlySalary: process.env.MONTHLY_SALARY || "50000",
  },
};
