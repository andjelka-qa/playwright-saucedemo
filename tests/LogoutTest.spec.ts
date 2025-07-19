import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { SidebarMenu } from '../pages/SidebarMenu';

test.describe('Logout functionality', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let sidebarMenu: SidebarMenu;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    sidebarMenu = new SidebarMenu(page);

    await loginPage.goToLoginPage();
    await loginPage.inputUsername('standard_user');
    await loginPage.inputPassword('secret_sauce');
    await loginPage.clickOnLoginButton();
    await inventoryPage.expectOnInventoryPage();
  });

  test('User can log out from menu', async () => {
    await sidebarMenu.logout();
    await sidebarMenu.expectRedirectToLogin();
  });
});