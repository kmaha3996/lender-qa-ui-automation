# Playwright UI Automation Framework

An end-to-end UI test automation framework built with **Playwright + TypeScript**, using the **Page Object Model (POM)** to keep tests readable and locators maintainable.

It drives a multi-step loan/onboarding application flow — login (OTP), dashboard, applicant and student details, document upload, plan selection, e-sign, and confirmation — as a real-world example of automating a complex, multi-page customer journey.

## Tech stack

- [Playwright Test](https://playwright.dev/) — cross-browser test runner (Chromium, Firefox, WebKit)
- TypeScript
- Page Object Model for UI abstraction
- GitHub Actions for CI
- `npx playwright codegen` based recorder scripts for quickly scaffolding new flows

## Project structure

```
pages/        Page objects — one class per screen, exposing actions/locators
tests/        Spec files (customer-journey, login, application flows)
fixtures/     Custom Playwright fixtures (e.g. pre-authenticated page)
utils/        Shared helpers and test data (env-var driven, no real data committed)
automation/   Codegen-based recorder/replay scripts for bootstrapping new specs
.github/      CI workflow (GitHub Actions)
```

## Getting started

```bash
npm install
npx playwright install --with-deps
```

Run the suite:

```bash
npm test                # headless, all browsers
npm run test:ui         # Playwright UI mode
npm run test:headed     # headed browser
npm run test:debug      # step-through debugger
npm run test:report     # open the last HTML report
```

## Configuration

The framework reads its target URL and test data from environment variables (see [`utils/testData.ts`](utils/testData.ts) and [`playwright.config.ts`](playwright.config.ts)), so it can point at any environment without code changes:

```bash
BASE_URL=https://your-app.example.com \
MOBILE=9000000000 OTP=1234 \
npx playwright test
```

## CI

Every push/PR to `main` runs the suite headless on GitHub Actions (`.github/workflows/playwright.yml`), with the HTML report uploaded as a build artifact.

## Design notes

- **Page Object Model**: every screen is its own class extending a shared `BasePage`, exposing intent-revealing methods (`selectPlanByText`, `fillPersonalDetails`, …) rather than raw locators in tests.
- **Fixtures over setup boilerplate**: `fixtures/authenticatedPage.ts` provides a pre-logged-in page to tests that don't need to exercise login themselves.
- **No hardcoded environment or personal data**: all test data defaults to generic placeholders and is overridable via environment variables, so the same codebase runs safely against any environment.
