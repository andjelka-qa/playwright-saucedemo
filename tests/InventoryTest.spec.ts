import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory page functionality', () => {

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goToLoginPage();
    await loginPage.inputUsername('standard_user');
    await loginPage.inputPassword('secret_sauce');
    await loginPage.clickOnLoginButton();

    await inventoryPage.expectOnInventoryPage();    
  });

  test('All 6 products are displayed', async () => {
    const count = await inventoryPage.getInventoryItemCount();
    expect(count).toBe(6);
  });

  



})