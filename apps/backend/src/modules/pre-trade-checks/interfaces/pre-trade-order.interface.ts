export interface PreTradeOrder {
  symbol: string;

  side: 'buy' | 'sell';

  qty?: string | null | undefined;

  notional?: string | null | undefined;

  type: string;

  timeInForce: string;
}
