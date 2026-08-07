import { Module, type Provider } from '@nestjs/common';

import { PrismaEquityHistoryRepository } from './repositories/prisma-equity-history.repository.js';

import { EquityHistoryService } from './services/equity-history.service.js';

const equityHistoryProviders: Provider[] = [
  EquityHistoryService,

  {
    provide: 'EquityHistoryRepository',

    useClass: PrismaEquityHistoryRepository,
  },
];

@Module({
  providers: equityHistoryProviders,

  exports: [EquityHistoryService],
})
export class EquityHistoryModule {}
