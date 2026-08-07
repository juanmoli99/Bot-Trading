import { Test } from '@nestjs/testing';

import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

import { CloseAlpacaPositionUseCase } from './close-alpaca-position.use-case.js';

describe('CloseAlpacaPositionUseCase', () => {
  let useCase: CloseAlpacaPositionUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CloseAlpacaPositionUseCase,

        {
          provide: AlpacaHttpClient,

          useValue: {
            deleteTrading: (): Promise<void> => Promise.resolve(undefined),
          },
        },
      ],
    }).compile();

    useCase = module.get<CloseAlpacaPositionUseCase>(
      CloseAlpacaPositionUseCase,
    );
  });

  it('should close an Alpaca position', async () => {
    await expect(useCase.execute('AAPL')).resolves.toBeUndefined();
  });
});
