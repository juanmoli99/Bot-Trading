import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { ZodType } from 'zod';

import { AlpacaApiError } from '../errors/alpaca-api.error.js';

@Injectable()
export class AlpacaHttpClient {
  private readonly apiKey: string;
  private readonly secretKey: string;
  private readonly tradingUrl: string;
  private readonly dataUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.getOrThrow<string>('alpaca.apiKey');

    this.secretKey = this.configService.getOrThrow<string>('alpaca.secretKey');

    this.tradingUrl =
      this.configService.getOrThrow<string>('alpaca.tradingUrl');

    this.dataUrl = this.configService.getOrThrow<string>('alpaca.dataUrl');
  }

  async getTrading<T>(path: string, schema: ZodType<T>): Promise<T> {
    return await this.request<T>(`${this.tradingUrl}${path}`, schema, 'GET');
  }

  async postTrading<T>(
    path: string,
    body: unknown,
    schema: ZodType<T>,
  ): Promise<T> {
    return await this.request<T>(
      `${this.tradingUrl}${path}`,
      schema,
      'POST',
      body,
    );
  }

  async deleteTrading(path: string): Promise<void> {
    const response = await fetch(`${this.tradingUrl}${path}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new AlpacaApiError('Alpaca request failed', response.status);
    }
  }

  async getMarketData<T>(path: string, schema: ZodType<T>): Promise<T> {
    return await this.request<T>(`${this.dataUrl}${path}`, schema, 'GET');
  }

  private async request<T>(
    url: string,
    schema: ZodType<T>,
    method: 'GET' | 'POST',
    body?: unknown,
  ): Promise<T> {
    const requestOptions: RequestInit = {
      method,
      headers: {
        ...this.getHeaders(),
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new AlpacaApiError('Alpaca request failed', response.status);
    }

    const data: unknown = await response.json();

    const result = schema.safeParse(data);

    if (!result.success) {
      throw new AlpacaApiError(
        'Invalid Alpaca response format',
        response.status,
      );
    }

    return result.data;
  }

  private getHeaders(): Record<string, string> {
    return {
      'APCA-API-KEY-ID': this.apiKey,
      'APCA-API-SECRET-KEY': this.secretKey,
    };
  }
}
