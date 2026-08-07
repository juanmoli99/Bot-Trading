import { Test } from '@nestjs/testing';

import type { AlpacaPosition } from '../interfaces/alpaca-position.interface.js';
import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

import { GetAlpacaPositionsUseCase } from './get-alpaca-positions.use-case.js';

describe('GetAlpacaPositionsUseCase', () => {
  let useCase: GetAlpacaPositionsUseCase;

  const alpacaPositions: AlpacaPosition[] = [
    {
      asset_id: 'asset-id',
      symbol: 'AAPL',
      exchange: 'NASDAQ',
      asset_class: 'us_equity',
      qty: '10',
      side: 'long',
      avg_entry_price: '150',
      market_value: '1550',
      cost_basis: '1500',
      unrealized_pl: '50',
      unrealized_plpc: '0.033',
      current_price: '155',
      lastday_price: '154',
      change_today: '0.006',
    },
  ];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetAlpacaPositionsUseCase,
        {
          provide: AlpacaHttpClient,
          useValue: {
            getTrading: (): Promise<AlpacaPosition[]> =>
              Promise.resolve(alpacaPositions),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetAlpacaPositionsUseCase>(GetAlpacaPositionsUseCase);
  });

  it('should return Alpaca positions data', async () => {
    const result = await useCase.execute();

    expect(result[0]?.symbol).toBe('AAPL');
    expect(result[0]?.qty).toBe('10');
  });
});
