import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { OpenAccountPage } from '../pages/OpenAccountPage';
import { TransferPage } from '../pages/TransferPage';
import { BankApi } from '../api/BankApi';

type Pages = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  openAccountPage: OpenAccountPage;
  transferPage: TransferPage;
  bankApi: BankApi;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  openAccountPage: async ({ page }, use) => {
    await use(new OpenAccountPage(page));
  },
  transferPage: async ({ page }, use) => {
    await use(new TransferPage(page));
  },
  bankApi: async ({ request }, use) => {
    await use(new BankApi(request));
  },
});

export { expect } from '@playwright/test';