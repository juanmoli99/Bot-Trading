import { Module, type Provider } from '@nestjs/common';

import { AlpacaModule } from '../alpaca/alpaca.module.js';

import { SyncAlpacaOrdersUseCase } from './use-cases/sync-alpaca-orders.use-case.js';
import { PrismaTradeOrderRepository } from './repositories/prisma-trade-order.repository.js';
import { TradeOrderService } from './services/trade-order.service.js';

const tradeOrderProviders: Provider[] = [
  TradeOrderService,

  SyncAlpacaOrdersUseCase,

  {
    provide: 'TradeOrderRepository',
    useClass: PrismaTradeOrderRepository,
  },
];

@Module({
  imports: [AlpacaModule],

  providers: tradeOrderProviders,

  exports: [TradeOrderService, SyncAlpacaOrdersUseCase],
})
export class TradeOrdersModule {}
