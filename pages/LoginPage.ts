import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.error = page.locator("h3[data-test='error']");
  }

  async goToLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async inputUsername(username: string) {
    await this.usernameField.fill(username);
  }

  async inputPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickOnLoginButton() {
    await this.loginButton.click();
  }
}