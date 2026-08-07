import { Module, type Provider } from '@nestjs/common';

import { PrismaTradeEventRepository } from './repositories/prisma-trade-event.repository.js';
import { TradeEventService } from './services/trade-event.service.js';

const tradeEventProviders: Provider[] = [
  TradeEventService,

  {
    provide: 'TradeEventRepository',
    useClass: PrismaTradeEventRepository,
  },
];

@Module({
  providers: tradeEventProviders,

  exports: [TradeEventService],
})
export class TradeEventsModule {}
