import { Injectable } from '@nestjs/common';

import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

@Injectable()
export class CloseAllAlpacaPositionsUseCase {
  constructor(private readonly alpacaHttpClient: AlpacaHttpClient) {}

  async execute(): Promise<void> {
    await this.alpacaHttpClient.deleteTrading('/v2/positions');
  }
}
