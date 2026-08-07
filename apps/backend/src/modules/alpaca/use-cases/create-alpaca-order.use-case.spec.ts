import { Test } from '@nestjs/testing';

import { PreTradeCheckService } from '../../pre-trade-checks/services/pre-trade-check.service.js';
import type { AlpacaOrder } from '../interfaces/alpaca-order.interface.js';
import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

import { TradeOrderService } from '../../trade-orders/services/trade-order.service.js';

import { CreateAlpacaOrderUseCase } from './create-alpaca-order.use-case.js';
import { GetAlpacaAssetUseCase } from './get-alpaca-asset.use-case.js';

describe('CreateAlpacaOrderUseCase', () => {
  let useCase: CreateAlpacaOrderUseCase;

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
        CreateAlpacaOrderUseCase,

        {
          provide: AlpacaHttpClient,

          useValue: {
            postTrading: (): Promise<AlpacaOrder> =>
              Promise.resolve(alpacaOrder),

            getTrading: (): Promise<AlpacaOrder> =>
              Promise.resolve(alpacaOrder),
          },
        },

        {
          provide: TradeOrderService,

          useValue: {
            findByClientOrderId: (): Promise<null> => Promise.resolve(null),

            createPendingOrder: (): Promise<{
              id: string;
              clientOrderId: string;
              alpacaOrderId: null;
            }> =>
              Promise.resolve({
                id: 'trade-order-id',

                clientOrderId: 'client-order-id',

                alpacaOrderId: null,
              }),

            markAsSubmitted: (): Promise<void> => Promise.resolve(undefined),

            updateStatus: (): Promise<void> => Promise.resolve(undefined),
          },
        },

        {
          provide: PreTradeCheckService,

          useValue: {
            canExecuteOrder: (): Promise<{
              allowed: boolean;
              reasons: string[];
            }> =>
              Promise.resolve({
                allowed: true,

                reasons: [],
              }),
          },
        },

        {
          provide: GetAlpacaAssetUseCase,

          useValue: {
            execute: (): Promise<{
              id: string;
              symbol: string;
              name: string;
              exchange: string;
              assetClass: string;
              tradable: boolean;
              fractionable: boolean;
              shortable: boolean;
              easyToBorrow: boolean;
              status: string;
            }> =>
              Promise.resolve({
                id: 'asset-id',

                symbol: 'AAPL',

                name: 'Apple Inc.',

                exchange: 'NASDAQ',

                assetClass: 'us_equity',

                tradable: true,

                fractionable: true,

                shortable: true,

                easyToBorrow: true,

                status: 'active',
              }),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateAlpacaOrderUseCase>(CreateAlpacaOrderUseCase);
  });

  it('should create an Alpaca order', async () => {
    const result = await useCase.execute({
      symbol: 'AAPL',

      qty: '1',

      side: 'buy',

      type: 'market',

      time_in_force: 'day',
    });

    expect(result.symbol).toBe('AAPL');

    expect(result.side).toBe('buy');
  });
});
