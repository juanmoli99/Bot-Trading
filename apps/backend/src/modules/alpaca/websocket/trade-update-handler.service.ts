import { Injectable } from '@nestjs/common';

import { TradeEventService } from '../../trade-events/services/trade-event.service.js';
import { TradeOrderStatus } from '../../trade-orders/entities/trade-order.entity.js';
import { TradeOrderService } from '../../trade-orders/services/trade-order.service.js';

export interface TradeUpdateMessage {
  stream?: string;

  data?: {
    event?: string;

    event_id?: string;

    order?: {
      id?: string;

      status?: string;
    };
  };
}

@Injectable()
export class TradeUpdateHandlerService {
  constructor(
    private readonly tradeOrderService: TradeOrderService,

    private readonly tradeEventService: TradeEventService,
  ) {}

  async handle(message: TradeUpdateMessage): Promise<void> {
    if (
      message.stream !== 'trade_updates' ||
      !message.data?.order?.id ||
      !message.data.event_id
    ) {
      return;
    }

    const eventId = message.data.event_id;

    const alreadyProcessed = await this.tradeEventService.hasProcessed(eventId);

    if (alreadyProcessed) {
      return;
    }

    const alpacaOrderId = message.data.order.id;

    await this.tradeEventService.register({
      eventId,

      orderId: alpacaOrderId,

      eventType: message.data.event ?? 'unknown',
    });

    const tradeOrder =
      await this.tradeOrderService.findByAlpacaOrderId(alpacaOrderId);

    if (!tradeOrder) {
      return;
    }

    const status = this.mapStatus(message.data.order.status);

    if (!status) {
      return;
    }

    if (tradeOrder.status === status) {
      return;
    }

    await this.tradeOrderService.updateStatus(tradeOrder.id, status);
  }

  private mapStatus(status?: string): TradeOrderStatus | null {
    switch (status) {
      case 'new':
      case 'accepted':
        return TradeOrderStatus.ACCEPTED;

      case 'partially_filled':
        return TradeOrderStatus.PARTIALLY_FILLED;

      case 'filled':
        return TradeOrderStatus.FILLED;

      case 'canceled':
        return TradeOrderStatus.CANCELED;

      case 'rejected':
        return TradeOrderStatus.REJECTED;

      default:
        return null;
    }
  }
}
