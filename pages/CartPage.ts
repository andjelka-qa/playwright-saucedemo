import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartTitle: Locator;
  readonly checkoutButton: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.cartTitle = page.locator('.title');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.removeButtons = page.locator('button[data-test^="remove"]');
  }

  async expectOnCartPage() {
    await expect(this.page).toHaveURL(/.*cart/);
    await expect(this.cartTitle).toHaveText('Your Cart');
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async removeFirstItem() {
    await this.removeButtons.first().click();
  }
}
