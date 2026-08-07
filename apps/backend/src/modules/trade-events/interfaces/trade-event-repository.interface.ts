import type { TradeEventEntity } from '../entities/trade-event.entity.js';

export interface TradeEventRepository {
  create(event: TradeEventEntity): Promise<TradeEventEntity>;

  findByEventId(eventId: string): Promise<TradeEventEntity | null>;
}
