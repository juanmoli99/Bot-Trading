import { Injectable } from '@nestjs/common';

import type { AlpacaHttpClient } from '../services/alpaca-http.client.js';

@Injectable()
export class CancelAllAlpacaOrdersUseCase {
  constructor(private readonly alpacaHttpClient: AlpacaHttpClient) {}

  async execute(): Promise<void> {
    await this.alpacaHttpClient.deleteTrading('/v2/orders');
  }
}
