import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import { PreTradeCheckService } from '../../pre-trade-checks/services/pre-trade-check.service.js';

import { TradeOrderService } from '../../trade-orders/services/trade-order.service.js';
import { TradeOrderStatus } from '../../trade-orders/entities/trade-order.entity.js';

import type { CreateAlpacaOrderDto } from '../dto/create-alpaca-order.dto.js';
import type { AlpacaOrder } from '../interfaces/alpaca-order.interface.js';

import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

import { GetAlpacaAssetUseCase } from './get-alpaca-asset.use-case.js';

import { AlpacaOrderMapper } from '../mappers/alpaca-order.mapper.js';
import { AlpacaOrderRequestMapper } from '../mappers/alpaca-order-request.mapper.js';

import { alpacaOrderResponseSchema } from '../schemas/alpaca-order-response.schema.js';

import { AlpacaAssetValidator } from '../validators/alpaca-asset.validator.js';
import { AlpacaOrderValidator } from '../validators/alpaca-order.validator.js';

@Injectable()
export class CreateAlpacaOrderUseCase {
  constructor(
    private readonly alpacaHttpClient: AlpacaHttpClient,

    private readonly tradeOrderService: TradeOrderService,

    private readonly preTradeCheckService: PreTradeCheckService,

    private readonly getAlpacaAssetUseCase: GetAlpacaAssetUseCase,
  ) {}

  async execute(dto: CreateAlpacaOrderDto): Promise<AlpacaOrder> {
    AlpacaOrderValidator.validate(dto);

    const asset = await this.getAlpacaAssetUseCase.execute(dto.symbol);

    AlpacaAssetValidator.validate(asset, {
      requiresFractional: Boolean(dto.notional),

      requiresShort: dto.side === 'sell',
    });

    const checkResult = await this.preTradeCheckService.canExecuteOrder({
      symbol: dto.symbol,

      side: dto.side,

      qty: dto.qty,

      notional: dto.notional,

      type: dto.type,

      timeInForce: dto.time_in_force,
    });

    if (!checkResult.allowed) {
      throw new Error(checkResult.reasons.join(', '));
    }

    const clientOrderId = this.generateClientOrderId();

    const existingOrder =
      await this.tradeOrderService.findByClientOrderId(clientOrderId);

    if (existingOrder?.alpacaOrderId) {
      const response = await this.alpacaHttpClient.getTrading(
        `/v2/orders/${existingOrder.alpacaOrderId}`,
        alpacaOrderResponseSchema,
      );

      return AlpacaOrderMapper.toDomain(response);
    }

    const pendingOrder = await this.tradeOrderService.createPendingOrder({
      clientOrderId,

      symbol: dto.symbol,

      ...(dto.qty && {
        qty: dto.qty,
      }),

      ...(dto.notional && {
        notional: dto.notional,
      }),

      side: dto.side,

      type: dto.type,

      timeInForce: dto.time_in_force,
    });

    try {
      const orderRequest = AlpacaOrderRequestMapper.toApi(
        dto,
        pendingOrder.clientOrderId,
      );

      const response = await this.alpacaHttpClient.postTrading(
        '/v2/orders',
        orderRequest,
        alpacaOrderResponseSchema,
      );

      await this.tradeOrderService.markAsSubmitted(
        pendingOrder.id,
        response.id,
      );

      return AlpacaOrderMapper.toDomain(response);
    } catch (error) {
      await this.tradeOrderService.updateStatus(
        pendingOrder.id,
        TradeOrderStatus.FAILED,
      );

      throw error;
    }
  }

  private generateClientOrderId(): string {
    return `bot-${Date.now()}-${randomUUID()}`;
  }
}
