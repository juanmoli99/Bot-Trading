import { Module, type Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TradeEventsModule } from '../trade-events/trade-events.module.js';
import { TradeOrdersModule } from '../trade-orders/trade-orders.module.js';

import { AlpacaHealthController } from './controllers/alpaca-health.controller.js';
import { AlpacaController } from './controllers/alpaca.controller.js';
import alpacaConfig from './alpaca.config.js';

import { AlpacaRetryService } from './services/alpaca-retry.service.js';
import { AlpacaHttpClient } from './services/alpaca-http.client.js';
import { AlpacaHealthService } from './services/alpaca-health.service.js';

import { AlpacaTradeWebsocketClient } from './websocket/alpaca-trade-websocket.client.js';
import { AlpacaTradeWebsocketService } from './websocket/alpaca-trade-websocket.service.js';
import { TradeUpdateHandlerService } from './websocket/trade-update-handler.service.js';

import { CloseAllAlpacaPositionsUseCase } from './use-cases/close-all-alpaca-positions.use-case.js';
import { CloseAlpacaPositionUseCase } from './use-cases/close-alpaca-position.use-case.js';
import { CreateAlpacaOrderUseCase } from './use-cases/create-alpaca-order.use-case.js';
import { GetAlpacaAccountUseCase } from './use-cases/get-alpaca-account.use-case.js';
import { GetAlpacaAssetUseCase } from './use-cases/get-alpaca-asset.use-case.js';
import { GetAlpacaClockUseCase } from './use-cases/get-alpaca-clock.use-case.js';
import { GetAlpacaOrdersUseCase } from './use-cases/get-alpaca-orders.use-case.js';
import { GetAlpacaPositionsUseCase } from './use-cases/get-alpaca-positions.use-case.js';

const alpacaProviders: Provider[] = [
  AlpacaHttpClient,
  AlpacaRetryService,

  AlpacaTradeWebsocketClient,
  AlpacaTradeWebsocketService,
  TradeUpdateHandlerService,

  GetAlpacaAccountUseCase,
  GetAlpacaAssetUseCase,
  GetAlpacaClockUseCase,
  GetAlpacaPositionsUseCase,
  GetAlpacaOrdersUseCase,

  CloseAlpacaPositionUseCase,
  CloseAllAlpacaPositionsUseCase,

  CreateAlpacaOrderUseCase,

  AlpacaHealthService,
];

@Module({
  imports: [
    ConfigModule.forFeature(alpacaConfig),

    TradeOrdersModule,

    TradeEventsModule,
  ],

  controllers: [AlpacaController, AlpacaHealthController],

  providers: alpacaProviders,

  exports: [
    GetAlpacaAccountUseCase,

    GetAlpacaAssetUseCase,

    GetAlpacaClockUseCase,

    GetAlpacaPositionsUseCase,

    GetAlpacaOrdersUseCase,

    CloseAlpacaPositionUseCase,

    CloseAllAlpacaPositionsUseCase,

    CreateAlpacaOrderUseCase,

    AlpacaTradeWebsocketService,
  ],
})
export class AlpacaModule {}
