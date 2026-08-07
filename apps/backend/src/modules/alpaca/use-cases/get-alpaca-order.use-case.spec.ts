import { Test } from '@nestjs/testing';

import type { AlpacaOrder } from '../interfaces/alpaca-order.interface.js';
import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

import { GetAlpacaOrderUseCase } from './get-alpaca-order.use-case.js';

describe('GetAlpacaOrderUseCase', () => {
  let useCase: GetAlpacaOrderUseCase;

  const alpacaOrder: AlpacaOrder = {
    id: 'order-id',
    client_order_id: 'client-order-id',
    created_at: '2026-08-06T14:00:00Z',
    updated_at: '2026-08-06T14:00:00Z',
    submitted_at: '2026-08-06T14:00:00Z',
    filled_at: null,
    canceled_at: null,
    expired_at: null,
    failed_at: null,
    replaced_at: null,
    asset_id: 'asset-id',
    symbol: 'AAPL',
    asset_class: 'us_equity',
    qty: '1',
    filled_qty: '0',
    type: 'market',
    side: 'buy',
    time_in_force: 'day',
    status: 'new',
    limit_price: null,
    stop_price: null,
    filled_avg_price: null,
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetAlpacaOrderUseCase,
        {
          provide: AlpacaHttpClient,
          useValue: {
            getTrading: (): Promise<AlpacaOrder> =>
              Promise.resolve(alpacaOrder),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetAlpacaOrderUseCase>(GetAlpacaOrderUseCase);
  });

  it('should return an Alpaca order', async () => {
    const result = await useCase.execute('order-id');

    expect(result.id).toBe('order-id');
    expect(result.symbol).toBe('AAPL');
  });
});
