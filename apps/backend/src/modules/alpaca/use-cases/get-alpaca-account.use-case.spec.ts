import { Test } from '@nestjs/testing';

import type { AlpacaAccount } from '../interfaces/alpaca-account.interface.js';
import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

import { GetAlpacaAccountUseCase } from './get-alpaca-account.use-case.js';

describe('GetAlpacaAccountUseCase', () => {
  let useCase: GetAlpacaAccountUseCase;

  const alpacaAccount: AlpacaAccount = {
    id: 'account-id',
    status: 'ACTIVE',
    currency: 'USD',
    buying_power: '10000',
    cash: '10000',
    portfolio_value: '10000',
    equity: '10000',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetAlpacaAccountUseCase,
        {
          provide: AlpacaHttpClient,
          useValue: {
            getTrading: (): Promise<AlpacaAccount> =>
              Promise.resolve(alpacaAccount),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetAlpacaAccountUseCase>(GetAlpacaAccountUseCase);
  });

  it('should return Alpaca account data', async () => {
    const result = await useCase.execute();

    expect(result.id).toBe('account-id');
    expect(result.status).toBe('ACTIVE');
  });
});
