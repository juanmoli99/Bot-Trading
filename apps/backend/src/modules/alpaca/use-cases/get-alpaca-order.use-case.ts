import { Injectable } from '@nestjs/common';

import type { AlpacaOrder } from '../interfaces/alpaca-order.interface.js';
import { AlpacaOrderMapper } from '../mappers/alpaca-order.mapper.js';
import { alpacaOrderResponseSchema } from '../schemas/alpaca-order-response.schema.js';
import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

@Injectable()
export class GetAlpacaOrderUseCase {
  constructor(private readonly alpacaHttpClient: AlpacaHttpClient) {}

  async execute(orderId: string): Promise<AlpacaOrder> {
    const response = await this.alpacaHttpClient.getTrading(
      `/v2/orders/${orderId}`,
      alpacaOrderResponseSchema,
    );

    return AlpacaOrderMapper.toDomain(response);
  }
}
