export class AlpacaApiError extends Error {
  constructor(
    message: string,
    readonly statusCode?: number,
    readonly endpoint?: string,
    readonly retryable = false,
  ) {
    super(message);

    this.name = 'AlpacaApiError';
  }
}
