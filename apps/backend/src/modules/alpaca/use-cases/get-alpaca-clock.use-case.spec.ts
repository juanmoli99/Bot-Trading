import { Test } from '@nestjs/testing';

import type { AlpacaClock } from '../interfaces/alpaca-clock.interface.js';
import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

import { GetAlpacaClockUseCase } from './get-alpaca-clock.use-case.js';

describe('GetAlpacaClockUseCase', () => {
  let useCase: GetAlpacaClockUseCase;

  const alpacaClock: AlpacaClock = {
    timestamp: '2026-08-06T14:00:00Z',
    is_open: true,
    next_open: '2026-08-07T13:30:00Z',
    next_close: '2026-08-06T20:00:00Z',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetAlpacaClockUseCase,
        {
          provide: AlpacaHttpClient,
          useValue: {
            getTrading: (): Promise<AlpacaClock> =>
              Promise.resolve(alpacaClock),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetAlpacaClockUseCase>(GetAlpacaClockUseCase);
  });

  it('should return Alpaca clock data', async () => {
    const result = await useCase.execute();

    expect(result.is_open).toBe(true);
    expect(result.timestamp).toBe('2026-08-06T14:00:00Z');
  });
});
