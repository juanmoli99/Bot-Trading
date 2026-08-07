import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import type { TradeEventEntity } from '../entities/trade-event.entity.js';
import type { TradeEventRepository } from '../interfaces/trade-event-repository.interface.js';

@Injectable()
export class TradeEventService {
  constructor(private readonly tradeEventRepository: TradeEventRepository) {}

  async hasProcessed(eventId: string): Promise<boolean> {
    const event = await this.tradeEventRepository.findByEventId(eventId);

    return Boolean(event);
  }

  async register(data: {
    eventId: string;
    orderId: string;
    eventType: string;
  }): Promise<TradeEventEntity> {
    const existingEvent = await this.tradeEventRepository.findByEventId(
      data.eventId,
    );

    if (existingEvent) {
      return existingEvent;
    }

    const event: TradeEventEntity = {
      id: randomUUID(),

      eventId: data.eventId,

      orderId: data.orderId,

      eventType: data.eventType,

      createdAt: new Date(),
    };

    return await this.tradeEventRepository.create(event);
  }
}
