import { TradeOrderStatus } from '../entities/trade-order.entity.js';

export class AlpacaTradeOrderStatusMapper {
  static toDomain(alpacaStatus: string): TradeOrderStatus {
    switch (alpacaStatus) {
      case 'new':
      case 'pending_new':
        return TradeOrderStatus.SUBMITTED;

      case 'accepted':
        return TradeOrderStatus.ACCEPTED;

      case 'partially_filled':
        return TradeOrderStatus.PARTIALLY_FILLED;

      case 'filled':
        return TradeOrderStatus.FILLED;

      case 'canceled':
      case 'done_for_day':
      case 'expired':
        return TradeOrderStatus.CANCELED;

      case 'rejected':
      case 'replaced':
        return TradeOrderStatus.REJECTED;

      case 'pending_cancel':
      case 'pending_replace':
        return TradeOrderStatus.SUBMITTED;

      default:
        return TradeOrderStatus.FAILED;
    }
  }
}
