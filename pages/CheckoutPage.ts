import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly postalCodeField: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.locator('#first-name');
    this.lastNameField = page.locator('#last-name');
    this.postalCodeField = page.locator('#postal-code');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.successMessage = page.locator('.complete-header');
  }

  async fillCheckoutForm(first: string, last: string, zip: string) {
    await this.firstNameField.fill(first);
    await this.lastNameField.fill(last);
    await this.postalCodeField.fill(zip);
    await this.continueButton.click();
  }

  async completeOrder() {
    await this.finishButton.click();
  }

  async verifySuccessMessage() {
    await expect(this.successMessage).toHaveText('Thank you for your order!');
  }
}