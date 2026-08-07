import { Injectable } from '@nestjs/common';

import type { AlpacaOrder } from '../interfaces/alpaca-order.interface.js';
import { AlpacaOrderMapper } from '../mappers/alpaca-order.mapper.js';
import { alpacaOrderSchema } from '../schemas/alpaca-order.schema.js';
import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

@Injectable()
export class GetAlpacaOrdersUseCase {
  constructor(private readonly alpacaHttpClient: AlpacaHttpClient) {}

  async execute(): Promise<AlpacaOrder[]> {
    const response = await this.alpacaHttpClient.getTrading(
      '/v2/orders',
      alpacaOrderSchema,
    );

    return response.map((order) => AlpacaOrderMapper.toDomain(order));
  }
}
