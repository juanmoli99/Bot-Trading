import { ConfigService } from '@nestjs/config';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { z } from 'zod';

import { AlpacaApiError } from '../errors/alpaca-api.error.js';
import type { AlpacaRetryService } from './alpaca-retry.service.js';
import { AlpacaHttpClient } from './alpaca-http.client.js';

describe('AlpacaHttpClient', () => {
  let client: AlpacaHttpClient;

  const alpacaRetryService = {
    execute: vi.fn(
      async <T>(operation: () => Promise<T>): Promise<T> => await operation(),
    ),
  } as unknown as AlpacaRetryService;

  beforeEach(() => {
    client = new AlpacaHttpClient(
      new ConfigService({
        alpaca: {
          apiKey: 'test-key',
          secretKey: 'test-secret',
          tradingUrl: 'https://paper-api.alpaca.markets',
          dataUrl: 'https://data.alpaca.markets',
          timeoutMs: 10000,
        },
      }),
      alpacaRetryService,
    );
  });

  it('should return parsed response when request succeeds', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            id: '123',
          }),
          {
            status: 200,
          },
        ),
      ),
    );

    const result = await client.getTrading(
      '/test',
      z.object({
        id: z.string(),
      }),
    );

    expect(result).toEqual({
      id: '123',
    });
  });

  it('should throw AlpacaApiError with response metadata', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            code: 40010000,
            message: 'invalid request',
          }),
          {
            status: 422,
            headers: {
              'x-request-id': 'request-123',
            },
          },
        ),
      ),
    );

    await expect(
      client.getTrading(
        '/test',
        z.object({
          id: z.string(),
        }),
      ),
    ).rejects.toBeInstanceOf(AlpacaApiError);
  });
});
