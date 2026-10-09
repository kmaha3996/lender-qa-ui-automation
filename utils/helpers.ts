import { Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

export async function takeScreenshot(page: Page, name: string): Promise<void> {
  const dir = path.join(__dirname, "..", "screenshots");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({
    path: path.join(dir, `${name}.png`),
    fullPage: false,
  });
}

export async function waitAndClick(
  page: Page,
  selector: string,
  timeout = 10000,
): Promise<void> {
  await page.locator(selector).waitFor({ state: "visible", timeout });
  await page.locator(selector).click();
}
