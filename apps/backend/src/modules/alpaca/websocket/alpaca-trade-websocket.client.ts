import { Injectable } from '@nestjs/common';

import WebSocket from 'ws';

import alpacaConfig from '../alpaca.config.js';

import type { TradeUpdateMessage } from './trade-update-handler.service.js';

@Injectable()
export class AlpacaTradeWebsocketClient {
  private socket: WebSocket | null = null;

  private readonly url = 'wss://paper-api.alpaca.markets/stream';

  connect(
    onMessage: (message: TradeUpdateMessage) => void,

    onClose: () => void,

    onError: (error: Error) => void,

    onOpen: () => void,
  ): void {
    this.socket = new WebSocket(this.url);

    this.socket.on('open', () => {
      this.authenticate();

      this.subscribe();

      onOpen();
    });

    this.socket.on('message', (data: WebSocket.RawData) => {
      const rawMessage = Array.isArray(data)
        ? Buffer.concat(data).toString('utf8')
        : Buffer.isBuffer(data)
          ? data.toString('utf8')
          : Buffer.from(new Uint8Array(data)).toString('utf8');

      const message = JSON.parse(rawMessage) as TradeUpdateMessage;

      onMessage(message);
    });

    this.socket.on('close', () => {
      onClose();
    });

    this.socket.on('error', (error: Error) => {
      onError(error);
    });
  }

  disconnect(): void {
    if (!this.socket) {
      return;
    }

    this.socket.close();

    this.socket = null;
  }

  send(payload: unknown): void {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      return;
    }

    this.socket.send(JSON.stringify(payload));
  }

  private authenticate(): void {
    this.send({
      action: 'auth',

      key: alpacaConfig().apiKey,

      secret: alpacaConfig().secretKey,
    });
  }

  private subscribe(): void {
    this.send({
      action: 'listen',

      data: {
        streams: ['trade_updates'],
      },
    });
  }
}
