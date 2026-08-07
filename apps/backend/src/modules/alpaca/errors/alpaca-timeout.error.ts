import { AlpacaApiError } from './alpaca-api.error.js';

export class AlpacaTimeoutError extends AlpacaApiError {
  constructor(endpoint: string) {
    super('Alpaca request timeout', undefined, endpoint, true);

    this.name = 'AlpacaTimeoutError';
  }
}
