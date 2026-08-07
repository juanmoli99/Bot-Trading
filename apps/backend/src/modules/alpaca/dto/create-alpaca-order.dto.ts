export class CreateAlpacaOrderDto {
  symbol!: string;

  qty?: string;

  notional?: string;

  side!: 'buy' | 'sell';

  type!: 'market' | 'limit' | 'stop' | 'stop_limit';

  time_in_force!: 'day' | 'gtc' | 'opg' | 'cls';

  limit_price?: string;

  stop_price?: string;
}
