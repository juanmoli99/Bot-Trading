import { Injectable } from '@nestjs/common';

import type { AlpacaPosition } from '../interfaces/alpaca-position.interface.js';
import { AlpacaPositionMapper } from '../mappers/alpaca-position.mapper.js';
import { alpacaPositionSchema } from '../schemas/alpaca-position.schema.js';
import type { AlpacaHttpClient } from '../services/alpaca-http.client.js';

@Injectable()
export class GetAlpacaPositionsUseCase {
  constructor(private readonly alpacaHttpClient: AlpacaHttpClient) {}

  async execute(): Promise<AlpacaPosition[]> {
    const response = await this.alpacaHttpClient.getTrading(
      '/v2/positions',
      alpacaPositionSchema,
    );

    return response.map((position) => AlpacaPositionMapper.toDomain(position));
  }
}
