import { Page, Locator, expect } from '@playwright/test';

export class OpenAccountPage {
  readonly page: Page;
  readonly accountTypeSelect: Locator;
  readonly fromAccountSelect: Locator;
  readonly openButton: Locator;
  readonly newAccountId: Locator;

  // Números de cuenta del usuario (se llenan al abrir la segunda cuenta)
  firstAccountId = '';
  secondAccountId = '';

  constructor(page: Page) {
    this.page = page;
    this.accountTypeSelect = page.locator('#type');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.openButton = page.locator('input[value="Open New Account"]');
    this.newAccountId = page.locator('#newAccountId');
  }

  async goto() {
    // Sin "/" al inicio, igual que en las otras páginas
    await this.page.goto('openaccount.htm');
  }

  async openSavingsAccount() {
    await this.accountTypeSelect.selectOption({ label: 'SAVINGS' });

    // Las cuentas del usuario se cargan en el desplegable unos instantes después de abrir la página
    await expect(this.fromAccountSelect.locator('option').first()).toBeAttached();
    this.firstAccountId = await this.fromAccountSelect.inputValue();

    await this.openButton.click();

    // ParaBank muestra el número de la cuenta nueva
    await expect(this.newAccountId).toBeVisible();
    this.secondAccountId = (await this.newAccountId.innerText()).trim();
  }
}