import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { SyncAlpacaOrdersUseCase } from '../../trade-orders/use-cases/sync-alpaca-orders.use-case.js';

import type { TradeUpdateMessage } from './trade-update-handler.service.js';
import { TradeUpdateHandlerService } from './trade-update-handler.service.js';
import { AlpacaTradeWebsocketClient } from './alpaca-trade-websocket.client.js';

@Injectable()
export class AlpacaTradeWebsocketService
  implements OnModuleInit, OnModuleDestroy
{
  private reconnectAttempts = 0;

  private reconnectTimer: NodeJS.Timeout | null = null;

  constructor(
    private readonly websocketClient: AlpacaTradeWebsocketClient,

    private readonly tradeUpdateHandlerService: TradeUpdateHandlerService,

    private readonly syncAlpacaOrdersUseCase: SyncAlpacaOrdersUseCase,
  ) {}

  onModuleInit(): void {
    this.connect();
  }

  onModuleDestroy(): void {
    this.clearReconnectTimer();

    this.websocketClient.disconnect();
  }

  private connect(): void {
    this.websocketClient.connect(
      (message) => {
        void this.handleMessage(message);
      },

      () => {
        this.scheduleReconnect();
      },

      () => {
        this.scheduleReconnect();
      },

      () => {
        void this.handleReconnect();
      },
    );
  }

  private async handleReconnect(): Promise<void> {
    this.reconnectAttempts = 0;

    await this.syncAlpacaOrdersUseCase.execute();
  }

  private async handleMessage(message: TradeUpdateMessage): Promise<void> {
    await this.tradeUpdateHandlerService.handle(message);
  }

  private scheduleReconnect(): void {
    this.clearReconnectTimer();

    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 30000);

    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts++;

      this.connect();
    }, delay);
  }

  private clearReconnectTimer(): void {
    if (!this.reconnectTimer) {
      return;
    }

    clearTimeout(this.reconnectTimer);

    this.reconnectTimer = null;
  }
}
