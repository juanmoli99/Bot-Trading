import { Injectable } from '@nestjs/common';

import { GetAlpacaOrdersUseCase } from '../../alpaca/use-cases/get-alpaca-orders.use-case.js';
import type { AlpacaOrder } from '../../alpaca/interfaces/alpaca-order.interface.js';

import { AlpacaTradeOrderStatusMapper } from '../mappers/alpaca-trade-order-status.mapper.js';
import { TradeOrderService } from '../services/trade-order.service.js';

@Injectable()
export class SyncAlpacaOrdersUseCase {
  constructor(
    private readonly getAlpacaOrdersUseCase: GetAlpacaOrdersUseCase,

    private readonly tradeOrderService: TradeOrderService,
  ) {}

  async execute(): Promise<void> {
    const alpacaOrders = await this.getAlpacaOrdersUseCase.execute();

    for (const alpacaOrder of alpacaOrders) {
      await this.syncOrder(alpacaOrder);
    }
  }

  private async syncOrder(alpacaOrder: AlpacaOrder): Promise<void> {
    const tradeOrder = await this.tradeOrderService.findByAlpacaOrderId(
      alpacaOrder.id,
    );

    if (!tradeOrder) {
      return;
    }

    const status = AlpacaTradeOrderStatusMapper.toDomain(alpacaOrder.status);

    if (tradeOrder.status === status) {
      return;
    }

    await this.tradeOrderService.updateStatus(tradeOrder.id, status);
  }
}
