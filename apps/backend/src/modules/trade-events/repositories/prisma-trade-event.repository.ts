import { Injectable } from '@nestjs/common';

import type { PrismaService } from '../../../common/database/prisma.service.js';

import type { TradeEventEntity } from '../entities/trade-event.entity.js';
import type { TradeEventRepository } from '../interfaces/trade-event-repository.interface.js';

@Injectable()
export class PrismaTradeEventRepository implements TradeEventRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(event: TradeEventEntity): Promise<TradeEventEntity> {
    return await this.prismaService.tradeEvent.create({
      data: {
        id: event.id,
        eventId: event.eventId,
        orderId: event.orderId,
        eventType: event.eventType,
      },
    });
  }

  async findByEventId(eventId: string): Promise<TradeEventEntity | null> {
    return await this.prismaService.tradeEvent.findUnique({
      where: {
        eventId,
      },
    });
  }
}
