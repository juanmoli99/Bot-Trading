export interface AlpacaOrder {
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
