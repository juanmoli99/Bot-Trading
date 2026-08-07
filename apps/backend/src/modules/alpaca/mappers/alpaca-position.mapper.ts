import type { AlpacaPosition } from '../interfaces/alpaca-position.interface.js';

export interface AlpacaPositionApiResponse {
  asset_id: string;
  symbol: string;
  exchange: string;
  asset_class: string;
  qty: string;
  side: string;
  avg_entry_price: string;
  market_value: string;
  cost_basis: string;
  unrealized_pl: string;
  unrealized_plpc: string;
  current_price: string;
  lastday_price: string;
  change_today: string;
}

export class AlpacaPositionMapper {
  static toDomain(response: AlpacaPositionApiResponse): AlpacaPosition {
    return {
      asset_id: response.asset_id,
      symbol: response.symbol,
      exchange: response.exchange,
      asset_class: response.asset_class,
      qty: response.qty,
      side: response.side,
      avg_entry_price: response.avg_entry_price,
      market_value: response.market_value,
      cost_basis: response.cost_basis,
      unrealized_pl: response.unrealized_pl,
      unrealized_plpc: response.unrealized_plpc,
      current_price: response.current_price,
      lastday_price: response.lastday_price,
      change_today: response.change_today,
    };
  }
}
