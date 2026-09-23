import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[value="Log In"]');
    this.errorMessage = page.locator('.error');
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
  }

  async goto() {
    // Sin "/" al inicio: con "/" se pierde "/parabank/" de la baseURL
    await this.page.goto('index.htm');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutLink.click();
    // Al cerrar sesión vuelve el formulario de login
    await expect(this.loginButton).toBeVisible();
  }
}