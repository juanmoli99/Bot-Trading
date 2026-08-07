import { Injectable } from '@nestjs/common';

import type { CreateAlpacaOrderDto } from '../dto/create-alpaca-order.dto.js';
import type { AlpacaOrder } from '../interfaces/alpaca-order.interface.js';
import { AlpacaOrderMapper } from '../mappers/alpaca-order.mapper.js';
import { AlpacaOrderRequestMapper } from '../mappers/alpaca-order-request.mapper.js';
import { alpacaOrderResponseSchema } from '../schemas/alpaca-order-response.schema.js';
import { AlpacaOrderValidator } from '../validators/alpaca-order.validator.js';
import type { AlpacaHttpClient } from '../services/alpaca-http.client.js';

@Injectable()
export class CreateAlpacaOrderUseCase {
  constructor(private readonly alpacaHttpClient: AlpacaHttpClient) {}

  async execute(dto: CreateAlpacaOrderDto): Promise<AlpacaOrder> {
    AlpacaOrderValidator.validate(dto);

    const orderRequest = AlpacaOrderRequestMapper.toApi(dto);

    const response = await this.alpacaHttpClient.postTrading(
      '/v2/orders',
      orderRequest,
      alpacaOrderResponseSchema,
    );

    return AlpacaOrderMapper.toDomain(response);
  }
}
