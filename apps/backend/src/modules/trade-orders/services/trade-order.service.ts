import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import type { TradeOrderEntity } from '../entities/trade-order.entity.js';
import { TradeOrderStatus } from '../entities/trade-order.entity.js';
import type { TradeOrderRepository } from '../interfaces/trade-order-repository.interface.js';

type CreateTradeOrderData = Omit<
  TradeOrderEntity,
  | 'id'
  | 'clientOrderId'
  | 'alpacaOrderId'
  | 'status'
  | 'createdAt'
  | 'updatedAt'
> & {
  clientOrderId?: string;
};

@Injectable()
export class TradeOrderService {
  constructor(private readonly tradeOrderRepository: TradeOrderRepository) {}

  async createPendingOrder(
    data: Omit<CreateTradeOrderData, 'qty' | 'notional'> & {
      qty?: string | null;
      notional?: string | null;
    },
  ): Promise<TradeOrderEntity> {
    const clientOrderId = data.clientOrderId ?? this.generateClientOrderId();

    const existingOrder = await this.findByClientOrderId(clientOrderId);

    if (existingOrder) {
      return existingOrder;
    }

    const order: TradeOrderEntity = {
      id: randomUUID(),

      clientOrderId,

      alpacaOrderId: null,

      symbol: data.symbol,

      side: data.side,

      type: data.type,

      timeInForce: data.timeInForce,

      qty: data.qty ?? null,

      notional: data.notional ?? null,

      status: TradeOrderStatus.CREATED,

      createdAt: new Date(),

      updatedAt: new Date(),
    };

    return await this.tradeOrderRepository.create(order);
  }

  async markAsSubmitted(
    id: string,
    alpacaOrderId: string,
  ): Promise<TradeOrderEntity> {
    return await this.tradeOrderRepository.update(id, {
      alpacaOrderId,

      status: TradeOrderStatus.SUBMITTED,

      updatedAt: new Date(),
    });
  }

  async markAsAccepted(id: string): Promise<TradeOrderEntity> {
    return await this.updateStatus(id, TradeOrderStatus.ACCEPTED);
  }

  async markAsPartiallyFilled(id: string): Promise<TradeOrderEntity> {
    return await this.updateStatus(id, TradeOrderStatus.PARTIALLY_FILLED);
  }

  async markAsFilled(id: string): Promise<TradeOrderEntity> {
    return await this.updateStatus(id, TradeOrderStatus.FILLED);
  }

  async markAsCanceled(id: string): Promise<TradeOrderEntity> {
    return await this.updateStatus(id, TradeOrderStatus.CANCELED);
  }

  async markAsRejected(id: string): Promise<TradeOrderEntity> {
    return await this.updateStatus(id, TradeOrderStatus.REJECTED);
  }

  async updateStatus(
    id: string,
    status: TradeOrderStatus,
  ): Promise<TradeOrderEntity> {
    return await this.tradeOrderRepository.update(id, {
      status,

      updatedAt: new Date(),
    });
  }

  async findByClientOrderId(
    clientOrderId: string,
  ): Promise<TradeOrderEntity | null> {
    return await this.tradeOrderRepository.findByClientOrderId(clientOrderId);
  }

  async findByAlpacaOrderId(
    alpacaOrderId: string,
  ): Promise<TradeOrderEntity | null> {
    return await this.tradeOrderRepository.findByAlpacaOrderId(alpacaOrderId);
  }

  private generateClientOrderId(): string {
    return `bot-${Date.now()}-${randomUUID()}`;
  }
}
