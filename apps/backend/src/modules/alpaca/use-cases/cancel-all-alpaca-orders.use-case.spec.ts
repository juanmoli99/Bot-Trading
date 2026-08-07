import { Test } from '@nestjs/testing';

import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

import { CancelAllAlpacaOrdersUseCase } from './cancel-all-alpaca-orders.use-case.js';

describe('CancelAllAlpacaOrdersUseCase', () => {
  let useCase: CancelAllAlpacaOrdersUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CancelAllAlpacaOrdersUseCase,
        {
          provide: AlpacaHttpClient,
          useValue: {
            deleteTrading: (): Promise<void> => Promise.resolve(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CancelAllAlpacaOrdersUseCase>(
      CancelAllAlpacaOrdersUseCase,
    );
  });

  it('should cancel all Alpaca orders', async () => {
    await expect(useCase.execute()).resolves.toBeUndefined();
  });
});
