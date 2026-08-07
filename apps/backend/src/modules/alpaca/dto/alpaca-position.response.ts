import type { AlpacaPosition } from '../interfaces/alpaca-position.interface.js';

export class AlpacaPositionResponseDto {
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

  constructor(position: AlpacaPosition) {
    this.asset_id = position.asset_id;
    this.symbol = position.symbol;
    this.exchange = position.exchange;
    this.asset_class = position.asset_class;
    this.qty = position.qty;
    this.side = position.side;
    this.avg_entry_price = position.avg_entry_price;
    this.market_value = position.market_value;
    this.cost_basis = position.cost_basis;
    this.unrealized_pl = position.unrealized_pl;
    this.unrealized_plpc = position.unrealized_plpc;
    this.current_price = position.current_price;
    this.lastday_price = position.lastday_price;
    this.change_today = position.change_today;
  }
}
