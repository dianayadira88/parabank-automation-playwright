import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly title: Locator;
  readonly rightPanel: Locator;

  // Aquí guardamos el usuario que se registra, para usarlo después (por ejemplo en el login)
  createdUsername = '';
  createdPassword = '';

  constructor(page: Page) {
    this.page = page;
    // Los ids de ParaBank tienen puntos, por eso se escriben así: [id="..."]
    this.firstNameInput = page.locator('[id="customer.firstName"]');
    this.lastNameInput = page.locator('[id="customer.lastName"]');
    this.addressInput = page.locator('[id="customer.address.street"]');
    this.cityInput = page.locator('[id="customer.address.city"]');
    this.stateInput = page.locator('[id="customer.address.state"]');
    this.zipCodeInput = page.locator('[id="customer.address.zipCode"]');
    this.phoneInput = page.locator('[id="customer.phoneNumber"]');
    this.ssnInput = page.locator('[id="customer.ssn"]');
    this.usernameInput = page.locator('[id="customer.username"]');
    this.passwordInput = page.locator('[id="customer.password"]');
    this.confirmPasswordInput = page.locator('[id="repeatedPassword"]');
    this.registerButton = page.locator('input[value="Register"]');
    this.title = page.locator('#rightPanel h1.title');
    this.rightPanel = page.locator('#rightPanel');
  }

  async goto() {
    // OJO: sin "/" al inicio. Con "/" se pierde "/parabank/" de la baseURL
    await this.page.goto('register.htm');
  }

  async registerNewUser() {
    // Usuario distinto en cada ejecución: ParaBank no permite repetir usernames
    const suffix = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    this.createdUsername = `sofka_${suffix}`;
    this.createdPassword = 'Sofka1234';

    await this.firstNameInput.fill('Diana');
    await this.lastNameInput.fill('Rojas');
    await this.addressInput.fill('Calle 10 No 5-20');
    await this.cityInput.fill('Bogota');
    await this.stateInput.fill('Cundinamarca');
    await this.zipCodeInput.fill('110111');
    await this.phoneInput.fill('3001234567');
    await this.ssnInput.fill('123-45-6789');
    await this.usernameInput.fill(this.createdUsername);
    await this.passwordInput.fill(this.createdPassword);
    await this.confirmPasswordInput.fill(this.createdPassword);
    await this.registerButton.click();
  }
}