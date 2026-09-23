import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/pages.fixture';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('el visitante está en la página de registro', async ({ registerPage }) => {
  await registerPage.goto();
});

When('completa el formulario con datos válidos y envía el registro', async ({ registerPage }) => {
  await registerPage.registerNewUser();
});

Then('debería ver el mensaje de bienvenida con su nombre de usuario', async ({ registerPage }) => {
  await expect(registerPage.title).toHaveText(`Welcome ${registerPage.createdUsername}`);
});

Then('debería ver el mensaje {string}', async ({ registerPage }, message: string) => {
  await expect(registerPage.rightPanel).toContainText(message);
});