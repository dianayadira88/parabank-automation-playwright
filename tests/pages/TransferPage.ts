import { Page, Locator } from '@playwright/test';

export class TransferPage {
  readonly page: Page;
  readonly amountInput: Locator;
  readonly fromAccountSelect: Locator;
  readonly toAccountSelect: Locator;
  readonly transferButton: Locator;
  readonly resultTitle: Locator;
  readonly amountResult: Locator;
  readonly fromAccountResult: Locator;
  readonly toAccountResult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amountInput = page.locator('#amount');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.toAccountSelect = page.locator('#toAccountId');
    this.transferButton = page.locator('input[value="Transfer"]');
    // Comprobante que ParaBank muestra después de transferir
    this.resultTitle = page.locator('#showResult h1.title');
    this.amountResult = page.locator('#amountResult');
    this.fromAccountResult = page.locator('#fromAccountIdResult');
    this.toAccountResult = page.locator('#toAccountIdResult');
  }

  async goto() {
    // Sin "/" al inicio, igual que en las otras páginas
    await this.page.goto('transfer.htm');
  }

  async transfer(amount: string, fromAccountId: string, toAccountId: string) {
    await this.amountInput.fill(amount);
    // selectOption espera a que las cuentas terminen de cargar en el desplegable
    await this.fromAccountSelect.selectOption(fromAccountId);
    await this.toAccountSelect.selectOption(toAccountId);
    await this.transferButton.click();
  }
}