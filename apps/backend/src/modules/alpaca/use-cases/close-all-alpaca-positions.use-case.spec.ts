import { Test } from '@nestjs/testing';

import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

import { CloseAllAlpacaPositionsUseCase } from './close-all-alpaca-positions.use-case.js';

describe('CloseAllAlpacaPositionsUseCase', () => {
  let useCase: CloseAllAlpacaPositionsUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CloseAllAlpacaPositionsUseCase,

        {
          provide: AlpacaHttpClient,

          useValue: {
            deleteTrading: (): Promise<void> => Promise.resolve(undefined),
          },
        },
      ],
    }).compile();

    useCase = module.get<CloseAllAlpacaPositionsUseCase>(
      CloseAllAlpacaPositionsUseCase,
    );
  });

  it('should close all Alpaca positions', async () => {
    await expect(useCase.execute()).resolves.toBeUndefined();
  });
});
