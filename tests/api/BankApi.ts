import { APIRequestContext, expect } from '@playwright/test';

// Pedimos las respuestas en formato JSON
const headers = { Accept: 'application/json' };

export class BankApi {
  // Datos que se guardan para usarlos entre los pasos del escenario
  accountId = '';
  balanceBefore = 0;
  lastStatus = 0;
  lastBody = '';

  constructor(private readonly request: APIRequestContext) {}

  // Busca el número de la primera cuenta del usuario
  async getFirstAccountId(username: string, password: string): Promise<string> {
    // Ruta relativa, SIN "/" al inicio (igual que en las páginas)
    const loginRes = await this.request.get(`services/bank/login/${username}/${password}`, { headers });
    expect(loginRes.ok()).toBeTruthy();
    const customer = await loginRes.json();

    const accountsRes = await this.request.get(`services/bank/customers/${customer.id}/accounts`, { headers });
    expect(accountsRes.ok()).toBeTruthy();
    const data = await accountsRes.json();

    const accounts = Array.isArray(data) ? data : [data.account].flat();
    return String(accounts[0].id);
  }

  // Consulta el saldo actual de una cuenta
  async getBalance(accountId: string): Promise<number> {
    const res = await this.request.get(`services/bank/accounts/${accountId}`, { headers });
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    return Number((data.account ?? data).balance);
  }

  // Hace el retiro y guarda la respuesta del servicio
  async withdraw(accountId: string, amount: number) {
    const res = await this.request.post('services/bank/withdraw', {
      headers,
      params: { accountId, amount },
    });
    this.lastStatus = res.status();
    this.lastBody = await res.text();
  }
}