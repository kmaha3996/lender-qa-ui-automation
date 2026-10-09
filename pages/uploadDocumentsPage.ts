import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class UploadDocumentsPage extends BasePage {
  // This is the Dms page (dms/:app_code) - there is no /upload-documents route.
  // The doc dropzone's data-testid is shared across every document in the list
  // (DmsUploadForm always passes testIdFor='dms-doc-upload'), so index into it per document.
  readonly additionalDocsTitle =
    '[data-testid="additional-documents-required-title"]';
  readonly uploadDocuments =
    '[data-testid="dms-doc-upload-upload-container-input"]';
  readonly optionButton = '[data-testid="emi-card-option-button"]';
  readonly backButton = '[data-testid="back-button"]';
  readonly closeButton = 'button[aria-label="Close"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForPage() {
    await this.page.waitForURL("**/dms/**", { timeout: 15000 });
    await this.page.waitForSelector(this.additionalDocsTitle, {
      timeout: 10000,
    });
  }
}
