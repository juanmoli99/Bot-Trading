import { Injectable } from '@nestjs/common';

import type { AlpacaAccount } from '../interfaces/alpaca-account.interface.js';
import { alpacaAccountSchema } from '../schemas/alpaca-account.schema.js';
import type { AlpacaHttpClient } from './alpaca-http.client.js';

@Injectable()
export class AlpacaHealthService {
  constructor(private readonly alpacaHttpClient: AlpacaHttpClient) {}

  async checkConnection(): Promise<{
    connected: boolean;
  }> {
    try {
      await this.alpacaHttpClient.getTrading<AlpacaAccount>(
        '/v2/account',
        alpacaAccountSchema,
      );

      return {
        connected: true,
      };
    } catch {
      return {
        connected: false,
      };
    }
  }
}
