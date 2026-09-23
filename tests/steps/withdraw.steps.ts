import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/pages.fixture';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('un cliente registrado con una cuenta activa', async ({ registerPage, bankApi }) => {
  // 1. Registra un usuario nuevo (ParaBank le da una cuenta)
  await registerPage.goto();
  await registerPage.registerNewUser();
  // 2. Busca el número de esa cuenta por la API
  bankApi.accountId = await bankApi.getFirstAccountId(
    registerPage.createdUsername,
    registerPage.createdPassword,
  );
});

When('retira {int} dólares de su cuenta', async ({ bankApi }, amount: number) => {
  // Guarda el saldo ANTES de retirar, para comparar después
  bankApi.balanceBefore = await bankApi.getBalance(bankApi.accountId);
  await bankApi.withdraw(bankApi.accountId, amount);
});

Then('el servicio confirma el retiro', async ({ bankApi }) => {
  expect(bankApi.lastStatus).toBe(200);
  expect(bankApi.lastBody.toLowerCase()).toContain('withdr');
});

Then('el saldo de la cuenta disminuye en {int} dólares', async ({ bankApi }, amount: number) => {
  const balanceAfter = await bankApi.getBalance(bankApi.accountId);
  expect(balanceAfter).toBeCloseTo(bankApi.balanceBefore - amount, 2);
});