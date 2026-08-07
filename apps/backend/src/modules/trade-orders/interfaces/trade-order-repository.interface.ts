import type { TradeOrderEntity } from '../entities/trade-order.entity.js';

export interface TradeOrderRepository {
  create(order: TradeOrderEntity): Promise<TradeOrderEntity>;

  findById(id: string): Promise<TradeOrderEntity | null>;

  findByClientOrderId(clientOrderId: string): Promise<TradeOrderEntity | null>;

  findByAlpacaOrderId(alpacaOrderId: string): Promise<TradeOrderEntity | null>;

  update(
    id: string,
    data: Partial<TradeOrderEntity>,
  ): Promise<TradeOrderEntity>;
}
