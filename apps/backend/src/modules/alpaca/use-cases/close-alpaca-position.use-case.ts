import { Injectable } from '@nestjs/common';

import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

@Injectable()
export class CloseAlpacaPositionUseCase {
  constructor(private readonly alpacaHttpClient: AlpacaHttpClient) {}

  async execute(symbol: string): Promise<void> {
    await this.alpacaHttpClient.deleteTrading(`/v2/positions/${symbol}`);
  }
}
