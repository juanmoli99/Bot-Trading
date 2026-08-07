import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { ZodType } from 'zod';

import { AlpacaApiError } from '../errors/alpaca-api.error.js';
import { AlpacaTimeoutError } from '../errors/alpaca-timeout.error.js';
import { AlpacaRetryService } from './alpaca-retry.service.js';

@Injectable()
export class AlpacaHttpClient {
  private readonly apiKey: string;
  private readonly secretKey: string;
  private readonly tradingUrl: string;
  private readonly dataUrl: string;
  private readonly timeoutMs: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly alpacaRetryService: AlpacaRetryService,
  ) {
    this.apiKey = this.configService.getOrThrow<string>('alpaca.apiKey');

    this.secretKey = this.configService.getOrThrow<string>('alpaca.secretKey');

    this.tradingUrl =
      this.configService.getOrThrow<string>('alpaca.tradingUrl');

    this.dataUrl = this.configService.getOrThrow<string>('alpaca.dataUrl');

    this.timeoutMs = this.configService.getOrThrow<number>('alpaca.timeoutMs');
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
    const response = await this.executeRequest(`${this.tradingUrl}${path}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new AlpacaApiError(
        'Alpaca request failed',
        response.status,
        path,
        response.status >= 500,
      );
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

    if (body !== undefined) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await this.executeRequest(url, requestOptions);

    if (!response.ok) {
      throw new AlpacaApiError(
        'Alpaca request failed',
        response.status,
        url,
        response.status >= 500,
      );
    }

    const data: unknown = await response.json();

    const result = schema.safeParse(data);

    if (!result.success) {
      throw new AlpacaApiError(
        'Invalid Alpaca response format',
        response.status,
        url,
        false,
      );
    }

    return result.data;
  }

  private async executeRequest(
    url: string,
    options: RequestInit,
  ): Promise<Response> {
    return await this.alpacaRetryService.execute(async () => {
      const controller = new AbortController();

      const timeout = setTimeout(() => {
        controller.abort();
      }, this.timeoutMs);

      try {
        return await fetch(url, {
          ...options,
          signal: controller.signal,
        });
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          throw new AlpacaTimeoutError(url);
        }

        throw error;
      } finally {
        clearTimeout(timeout);
      }
    });
  }

  private getHeaders(): Record<string, string> {
    return {
      'APCA-API-KEY-ID': this.apiKey,
      'APCA-API-SECRET-KEY': this.secretKey,
    };
  }
}
