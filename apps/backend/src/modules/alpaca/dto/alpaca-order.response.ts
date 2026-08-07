import type { AlpacaOrder } from '../interfaces/alpaca-order.interface.js';

export class AlpacaOrderResponseDto {
  id: string;
  client_order_id: string;
  created_at: string;
  symbol: string;
  qty: string;
  filled_qty: string;
  type: string;
  side: string;
  status: string;
  filled_avg_price: string | null;

  constructor(order: AlpacaOrder) {
    this.id = order.id;
    this.client_order_id = order.client_order_id;
    this.created_at = order.created_at;
    this.symbol = order.symbol;
    this.qty = order.qty;
    this.filled_qty = order.filled_qty;
    this.type = order.type;
    this.side = order.side;
    this.status = order.status;
    this.filled_avg_price = order.filled_avg_price;
  }
}
