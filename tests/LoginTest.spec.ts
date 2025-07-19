import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login functionality', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach('Page set up', async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
  });

  test('User can log in', async ({ page }) => {
    await loginPage.inputUsername('standard_user');
    await loginPage.inputPassword('secret_sauce');
    await loginPage.clickOnLoginButton();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('User cannot log in with invalid credentials', async ({ page }) => {
    await loginPage.inputUsername('invalid_user');
    await loginPage.inputPassword('invalid_pass');
    await loginPage.clickOnLoginButton();

    await expect(loginPage.error).toBeVisible();
    await expect(loginPage.error).toContainText('Username and password do not match')
  });

  test('User cannot log in with empty username', async ({ page }) => {
    await loginPage.inputPassword('secret_sauce');
    await loginPage.clickOnLoginButton();

    await expect(loginPage.error).toBeVisible();
    await expect(loginPage.error).toContainText('Username is required');
  });

  test.only('User cannot log in with empty password', async ({ page }) => {
    await loginPage.inputUsername('standard_user');
    await loginPage.clickOnLoginButton();

    await expect(loginPage.error).toBeVisible();
    await expect(loginPage.error).toContainText('Password is required');
  });

  test.only('Adding item to the cart and cart bedge appearing', async () => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.expectCartItemCount('1');
  })


});
