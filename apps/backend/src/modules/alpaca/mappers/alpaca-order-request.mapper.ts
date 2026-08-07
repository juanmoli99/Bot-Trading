import type { CreateAlpacaOrderDto } from '../dto/create-alpaca-order.dto.js';
import type { AlpacaOrderRequest } from '../interfaces/alpaca-order-request.interface.js';

export class AlpacaOrderRequestMapper {
  static toApi(
    dto: CreateAlpacaOrderDto,
    clientOrderId: string,
  ): AlpacaOrderRequest {
    return {
      client_order_id: clientOrderId,

      symbol: dto.symbol,

      side: dto.side,

      type: dto.type,

      time_in_force: dto.time_in_force,

      ...(dto.qty && {
        qty: dto.qty,
      }),

      ...(dto.notional && {
        notional: dto.notional,
      }),

      ...(dto.limit_price && {
        limit_price: dto.limit_price,
      }),

      ...(dto.stop_price && {
        stop_price: dto.stop_price,
      }),
    };
  }
}
