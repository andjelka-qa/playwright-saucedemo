import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly inventoryTitle: Locator;
    readonly addToCartButtons: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.inventoryTitle = page.locator('.title');
        this.addToCartButtons = page.locator('button[data-test^="add-to-cart"]');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    }

    async expectOnInventoryPage() {
        await expect(this.page).toHaveURL(/.*inventory/);
        await expect(this.inventoryTitle).toHaveText('Products');
    }

    async getInventoryItemCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    async addFirstItemToCart() {
        await this.addToCartButtons.first().click();
    }

    async expectCartItemCount(count : string) {
        await expect(this.shoppingCartBadge).toHaveText(count);
    }

}