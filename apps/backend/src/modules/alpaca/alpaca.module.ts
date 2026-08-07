import { Module, type Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AlpacaHealthController } from './controllers/alpaca-health.controller.js';
import { AlpacaController } from './controllers/alpaca.controller.js';
import alpacaConfig from './alpaca.config.js';
import { AlpacaHttpClient } from './services/alpaca-http.client.js';
import { AlpacaHealthService } from './services/alpaca-health.service.js';
import { CreateAlpacaOrderUseCase } from './use-cases/create-alpaca-order.use-case.js';
import { GetAlpacaAccountUseCase } from './use-cases/get-alpaca-account.use-case.js';
import { GetAlpacaClockUseCase } from './use-cases/get-alpaca-clock.use-case.js';
import { GetAlpacaOrdersUseCase } from './use-cases/get-alpaca-orders.use-case.js';
import { GetAlpacaPositionsUseCase } from './use-cases/get-alpaca-positions.use-case.js';

const alpacaProviders: Provider[] = [
  AlpacaHttpClient,
  GetAlpacaAccountUseCase,
  GetAlpacaClockUseCase,
  GetAlpacaPositionsUseCase,
  GetAlpacaOrdersUseCase,
  CreateAlpacaOrderUseCase,
  AlpacaHealthService,
];

@Module({
  imports: [ConfigModule.forFeature(alpacaConfig)],
  controllers: [AlpacaController, AlpacaHealthController],
  providers: alpacaProviders,
  exports: [
    GetAlpacaAccountUseCase,
    GetAlpacaClockUseCase,
    GetAlpacaPositionsUseCase,
    GetAlpacaOrdersUseCase,
    CreateAlpacaOrderUseCase,
  ],
})
export class AlpacaModule {}
