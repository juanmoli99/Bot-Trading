import { Test } from '@nestjs/testing';

import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

import { CancelAlpacaOrderUseCase } from './cancel-alpaca-order.use-case.js';

describe('CancelAlpacaOrderUseCase', () => {
  let useCase: CancelAlpacaOrderUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CancelAlpacaOrderUseCase,
        {
          provide: AlpacaHttpClient,
          useValue: {
            deleteTrading: (): Promise<void> => Promise.resolve(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CancelAlpacaOrderUseCase>(CancelAlpacaOrderUseCase);
  });

  it('should cancel an Alpaca order', async () => {
    await expect(useCase.execute('order-id')).resolves.toBeUndefined();
  });
});
