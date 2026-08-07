import { Injectable } from '@nestjs/common';

import type { AlpacaRetryOptions } from '../interfaces/alpaca-retry-options.interface.js';

@Injectable()
export class AlpacaRetryService {
  private readonly defaultOptions: AlpacaRetryOptions = {
    maxRetries: 3,
    initialDelayMs: 250,
    maxDelayMs: 3000,
    jitter: true,
  };

  async execute<T>(
    operation: () => Promise<T>,
    options?: Partial<AlpacaRetryOptions>,
  ): Promise<T> {
    const config = {
      ...this.defaultOptions,
      ...options,
    };

    let attempt = 0;

    while (true) {
      try {
        return await operation();
      } catch (error: unknown) {
        if (!this.shouldRetry(error) || attempt >= config.maxRetries) {
          throw error;
        }

        await this.delay(this.calculateDelay(attempt, error, config));

        attempt++;
      }
    }
  }

  private shouldRetry(error: unknown): boolean {
    if (error instanceof Error && error.name === 'AlpacaTimeoutError') {
      return true;
    }

    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      const statusCode = (error as { statusCode?: number }).statusCode;

      return (
        statusCode === 429 ||
        statusCode === 500 ||
        statusCode === 502 ||
        statusCode === 503 ||
        statusCode === 504
      );
    }

    return false;
  }

  private calculateDelay(
    attempt: number,
    error: unknown,
    options: AlpacaRetryOptions,
  ): number {
    const retryAfter = this.getRetryAfter(error);

    if (retryAfter !== null) {
      return retryAfter;
    }

    const exponentialDelay = options.initialDelayMs * 2 ** attempt;

    const cappedDelay = Math.min(exponentialDelay, options.maxDelayMs);

    if (!options.jitter) {
      return cappedDelay;
    }

    return Math.floor(cappedDelay * (0.5 + Math.random()));
  }

  private getRetryAfter(error: unknown): number | null {
    if (
      typeof error !== 'object' ||
      error === null ||
      !('statusCode' in error)
    ) {
      return null;
    }

    const responseHeaders = (
      error as {
        headers?: Record<string, string>;
      }
    ).headers;

    if (!responseHeaders) {
      return null;
    }

    const retryAfter = responseHeaders['retry-after'];

    if (!retryAfter) {
      return null;
    }

    const seconds = Number(retryAfter);

    if (Number.isNaN(seconds)) {
      return null;
    }

    return seconds * 1000;
  }

  private async delay(milliseconds: number): Promise<void> {
    await new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
}
