import { Injectable } from '@nestjs/common';

import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

@Injectable()
export class CancelAlpacaOrderUseCase {
  constructor(private readonly alpacaHttpClient: AlpacaHttpClient) {}

  async execute(orderId: string): Promise<void> {
    await this.alpacaHttpClient.deleteTrading(`/v2/orders/${orderId}`);
  }
}
