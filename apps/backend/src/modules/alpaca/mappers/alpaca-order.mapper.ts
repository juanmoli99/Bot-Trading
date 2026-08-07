import type { AlpacaOrder } from '../interfaces/alpaca-order.interface.js';

export interface AlpacaOrderApiResponse {
  id: string;
  client_order_id: string;
  created_at: string;
  updated_at: string;
  submitted_at: string;
  filled_at: string | null;
  canceled_at: string | null;
  expired_at: string | null;
  failed_at: string | null;
  replaced_at: string | null;
  asset_id: string;
  symbol: string;
  asset_class: string;
  qty: string;
  filled_qty: string;
  type: string;
  side: string;
  time_in_force: string;
  status: string;
  limit_price: string | null;
  stop_price: string | null;
  filled_avg_price: string | null;
}

export class AlpacaOrderMapper {
  static toDomain(response: AlpacaOrderApiResponse): AlpacaOrder {
    return {
      id: response.id,
      client_order_id: response.client_order_id,
      created_at: response.created_at,
      updated_at: response.updated_at,
      submitted_at: response.submitted_at,
      filled_at: response.filled_at,
      canceled_at: response.canceled_at,
      expired_at: response.expired_at,
      failed_at: response.failed_at,
      replaced_at: response.replaced_at,
      asset_id: response.asset_id,
      symbol: response.symbol,
      asset_class: response.asset_class,
      qty: response.qty,
      filled_qty: response.filled_qty,
      type: response.type,
      side: response.side,
      time_in_force: response.time_in_force,
      status: response.status,
      limit_price: response.limit_price,
      stop_price: response.stop_price,
      filled_avg_price: response.filled_avg_price,
    };
  }
}
