import type { AlpacaAccount } from '../interfaces/alpaca-account.interface.js';

export interface AlpacaAccountApiResponse {
  id: string;
  status: string;
  currency: string;
  buying_power: string;
  cash: string;
  portfolio_value: string;
  equity: string;
}

export class AlpacaAccountMapper {
  static toDomain(response: AlpacaAccountApiResponse): AlpacaAccount {
    return {
      id: response.id,
      status: response.status,
      currency: response.currency,
      buying_power: response.buying_power,
      cash: response.cash,
      portfolio_value: response.portfolio_value,
      equity: response.equity,
    };
  }
}
