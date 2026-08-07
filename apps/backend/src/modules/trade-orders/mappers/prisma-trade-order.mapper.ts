import type { TradeOrder } from '../../../generated/prisma/index.js';

import {
  TradeOrderEntity,
  TradeOrderStatus,
} from '../entities/trade-order.entity.js';

export class PrismaTradeOrderMapper {
  static toDomain(raw: TradeOrder): TradeOrderEntity {
    const entity = new TradeOrderEntity();

    entity.id = raw.id;
    entity.clientOrderId = raw.clientOrderId;
    entity.alpacaOrderId = raw.alpacaOrderId;
    entity.symbol = raw.symbol;

    entity.side = this.mapSide(raw.side);
    entity.type = this.mapType(raw.type);
    entity.timeInForce = this.mapTimeInForce(raw.timeInForce);

    entity.qty = raw.qty;
    entity.notional = raw.notional;

    entity.status = this.mapStatus(raw.status);

    entity.createdAt = raw.createdAt;
    entity.updatedAt = raw.updatedAt;

    return entity;
  }

  private static mapSide(value: string): 'buy' | 'sell' {
    if (value !== 'buy' && value !== 'sell') {
      throw new Error(`Invalid trade order side: ${value}`);
    }

    return value;
  }

  private static mapType(
    value: string,
  ): 'market' | 'limit' | 'stop' | 'stop_limit' {
    if (
      value !== 'market' &&
      value !== 'limit' &&
      value !== 'stop' &&
      value !== 'stop_limit'
    ) {
      throw new Error(`Invalid trade order type: ${value}`);
    }

    return value;
  }

  private static mapTimeInForce(value: string): 'day' | 'gtc' | 'opg' | 'cls' {
    if (
      value !== 'day' &&
      value !== 'gtc' &&
      value !== 'opg' &&
      value !== 'cls'
    ) {
      throw new Error(`Invalid time in force: ${value}`);
    }

    return value;
  }

  private static mapStatus(value: string): TradeOrderStatus {
    if (!Object.values(TradeOrderStatus).includes(value as TradeOrderStatus)) {
      throw new Error(`Invalid trade order status: ${value}`);
    }

    return value as TradeOrderStatus;
  }
}
