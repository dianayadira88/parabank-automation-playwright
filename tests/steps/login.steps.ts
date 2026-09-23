import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/pages.fixture';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('un usuario registrado en ParaBank que cerró sesión', async ({ registerPage, loginPage }) => {
  await registerPage.goto();
  await registerPage.registerNewUser();
  await loginPage.logout();
});

When('ingresa su usuario y contraseña', async ({ registerPage, loginPage }) => {
  // Usa el usuario que se acaba de registrar
  await loginPage.usernameInput.fill(registerPage.createdUsername);
  await loginPage.passwordInput.fill(registerPage.createdPassword);
});

When('hace clic en el botón de iniciar sesión', async ({ loginPage }) => {
  await loginPage.loginButton.click();
});

Then('debería ver la página de resumen de cuentas', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
});