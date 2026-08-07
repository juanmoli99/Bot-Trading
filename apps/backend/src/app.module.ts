import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { PrismaModule } from './common/database/prisma.module.js';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js';
import { LoggerModule } from './common/logger/logger.module.js';
import envConfig from './config/env.config.js';
import { AlpacaModule } from './modules/alpaca/alpaca.module.js';
import { EquityHistoryModule } from './modules/equity-history/equity-history.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { OperationalSafetyModule } from './modules/operational-safety/operational-safety.module.js';
import { PortfolioModule } from './modules/portfolio/portfolio.module.js';
import { PreTradeChecksModule } from './modules/pre-trade-checks/pre-trade-checks.module.js';
import { RiskManagementModule } from './modules/risk-management/risk-management.module.js';
import { TradeOrdersModule } from './modules/trade-orders/trade-orders.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),

    LoggerModule,

    PrismaModule,

    HealthModule,

    AlpacaModule,

    TradeOrdersModule,

    EquityHistoryModule,

    OperationalSafetyModule,

    PortfolioModule,

    PreTradeChecksModule,

    RiskManagementModule,
  ],

  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
