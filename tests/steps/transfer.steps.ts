import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/pages.fixture';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('un cliente registrado con dos cuentas', async ({ registerPage, openAccountPage }) => {
  // 1. Registra un usuario nuevo (ParaBank le da una cuenta y deja la sesión iniciada)
  await registerPage.goto();
  await registerPage.registerNewUser();
  // 2. Abre una segunda cuenta (de ahorros)
  await openAccountPage.goto();
  await openAccountPage.openSavingsAccount();
});

When('transfiere {int} dólares de su primera cuenta a su segunda cuenta', async ({ transferPage, openAccountPage }, amount: number) => {
  await transferPage.goto();
  await transferPage.transfer(String(amount), openAccountPage.firstAccountId, openAccountPage.secondAccountId);
});

Then('se muestra la confirmación {string}', async ({ transferPage }, title: string) => {
  await expect(transferPage.resultTitle).toHaveText(title);
});

Then('el comprobante muestra {int} dólares y las cuentas utilizadas', async ({ transferPage, openAccountPage }, amount: number) => {
  await expect(transferPage.amountResult).toContainText(`${amount}.00`);
  await expect(transferPage.fromAccountResult).toHaveText(openAccountPage.firstAccountId);
  await expect(transferPage.toAccountResult).toHaveText(openAccountPage.secondAccountId);
});