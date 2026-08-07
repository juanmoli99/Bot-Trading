import { Injectable } from '@nestjs/common';

import { AlpacaAccountMapper } from '../mappers/alpaca-account.mapper.js';
import type { AlpacaAccount } from '../interfaces/alpaca-account.interface.js';
import { alpacaAccountSchema } from '../schemas/alpaca-account.schema.js';
import type { AlpacaHttpClient } from '../services/alpaca-http.client.js';

@Injectable()
export class GetAlpacaAccountUseCase {
  constructor(private readonly alpacaHttpClient: AlpacaHttpClient) {}

  async execute(): Promise<AlpacaAccount> {
    const response = await this.alpacaHttpClient.getTrading(
      '/v2/account',
      alpacaAccountSchema,
    );

    return AlpacaAccountMapper.toDomain(response);
  }
}
