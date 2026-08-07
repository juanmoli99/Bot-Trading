import { Injectable } from '@nestjs/common';

import type { PrismaService } from '../../../common/database/prisma.service';
import type { TradeOrderEntity } from '../entities/trade-order.entity.js';
import type { TradeOrderRepository } from '../interfaces/trade-order-repository.interface.js';
import { PrismaTradeOrderMapper } from '../mappers/prisma-trade-order.mapper.js';

@Injectable()
export class PrismaTradeOrderRepository implements TradeOrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(order: TradeOrderEntity): Promise<TradeOrderEntity> {
    const result = await this.prismaService.tradeOrder.create({
      data: {
        id: order.id,
        clientOrderId: order.clientOrderId,
        alpacaOrderId: order.alpacaOrderId,
        symbol: order.symbol,
        side: order.side,
        type: order.type,
        timeInForce: order.timeInForce,
        qty: order.qty,
        notional: order.notional,
        status: order.status,
      },
    });

    return PrismaTradeOrderMapper.toDomain(result);
  }

  async findById(id: string): Promise<TradeOrderEntity | null> {
    const result = await this.prismaService.tradeOrder.findUnique({
      where: {
        id,
      },
    });

    return result ? PrismaTradeOrderMapper.toDomain(result) : null;
  }

  async findByClientOrderId(
    clientOrderId: string,
  ): Promise<TradeOrderEntity | null> {
    const result = await this.prismaService.tradeOrder.findUnique({
      where: {
        clientOrderId,
      },
    });

    return result ? PrismaTradeOrderMapper.toDomain(result) : null;
  }

  async findByAlpacaOrderId(
    alpacaOrderId: string,
  ): Promise<TradeOrderEntity | null> {
    const result = await this.prismaService.tradeOrder.findUnique({
      where: {
        alpacaOrderId,
      },
    });

    return result ? PrismaTradeOrderMapper.toDomain(result) : null;
  }

  async update(
    id: string,
    data: Partial<TradeOrderEntity>,
  ): Promise<TradeOrderEntity> {
    const result = await this.prismaService.tradeOrder.update({
      where: {
        id,
      },
      data,
    });

    return PrismaTradeOrderMapper.toDomain(result);
  }
}
