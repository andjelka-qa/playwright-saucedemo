import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart functionality', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goToLoginPage();
    await loginPage.inputUsername('standard_user');
    await loginPage.inputPassword('secret_sauce');
    await loginPage.clickOnLoginButton();

    await inventoryPage.expectOnInventoryPage();
    await inventoryPage.addFirstItemToCart();
    await page.click('.shopping_cart_link'); 
    await cartPage.expectOnCartPage();
  });

  test('Cart shows added item', async () => {
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(1);
  });

  test('Can remove item from cart', async () => {
    await cartPage.removeFirstItem();
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(0);
  });

  test('Can proceed to checkout', async () => {
    await cartPage.clickCheckout();
    await expect(cartPage.page).toHaveURL(/.*checkout-step-one/);
  });

});