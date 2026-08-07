export enum TradeOrderStatus {
  CREATED = 'CREATED',
  SUBMITTED = 'SUBMITTED',
  ACCEPTED = 'ACCEPTED',
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  FILLED = 'FILLED',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED',
  FAILED = 'FAILED',
}

export class TradeOrderEntity {
  id!: string;

  clientOrderId!: string;

  alpacaOrderId!: string | null;

  symbol!: string;

  side!: 'buy' | 'sell';

  type!: 'market' | 'limit' | 'stop' | 'stop_limit';

  timeInForce!: 'day' | 'gtc' | 'opg' | 'cls';

  qty!: string | null;

  notional!: string | null;

  status!: TradeOrderStatus;

  createdAt!: Date;

  updatedAt!: Date;
}
