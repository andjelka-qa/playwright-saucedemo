import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout process', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goToLoginPage();
    await loginPage.inputUsername('standard_user');
    await loginPage.inputPassword('secret_sauce');
    await loginPage.clickOnLoginButton();

    await inventoryPage.addFirstItemToCart();
    await page.click('.shopping_cart_link');
    await cartPage.clickCheckout();
  });

  test('Can complete checkout with valid data', async () => {
    await checkoutPage.fillCheckoutForm('Ana', 'Petrovic', '11000');
    await checkoutPage.completeOrder();
    await checkoutPage.verifySuccessMessage();
  });

  test('Should not continue with empty form', async () => {
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.page.locator('.error-message-container')).toBeVisible();
  });
});