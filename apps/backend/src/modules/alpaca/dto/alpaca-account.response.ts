import type { AlpacaAccount } from '../interfaces/alpaca-account.interface.js';

export class AlpacaAccountResponseDto {
  id: string;
  status: string;
  currency: string;
  buying_power: string;
  cash: string;
  portfolio_value: string;
  equity: string;

  constructor(account: AlpacaAccount) {
    this.id = account.id;
    this.status = account.status;
    this.currency = account.currency;
    this.buying_power = account.buying_power;
    this.cash = account.cash;
    this.portfolio_value = account.portfolio_value;
    this.equity = account.equity;
  }
}
