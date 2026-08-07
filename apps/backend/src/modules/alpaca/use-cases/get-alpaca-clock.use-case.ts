import { Injectable } from '@nestjs/common';

import { AlpacaClockMapper } from '../mappers/alpaca-clock.mapper.js';
import type { AlpacaClock } from '../interfaces/alpaca-clock.interface.js';
import { alpacaClockSchema } from '../schemas/alpaca-clock.schema.js';
import type { AlpacaHttpClient } from '../services/alpaca-http.client.js';

@Injectable()
export class GetAlpacaClockUseCase {
  constructor(private readonly alpacaHttpClient: AlpacaHttpClient) {}

  async execute(): Promise<AlpacaClock> {
    const response = await this.alpacaHttpClient.getTrading(
      '/v2/clock',
      alpacaClockSchema,
    );

    return AlpacaClockMapper.toDomain(response);
  }
}
