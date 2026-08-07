import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { PrismaModule } from './common/database/prisma.module.js';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js';
import { LoggerModule } from './common/logger/logger.module.js';
import envConfig from './config/env.config.js';
import { AlpacaModule } from './modules/alpaca/alpaca.module.js';
import { HealthModule } from './modules/health/health.module.js';
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
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
