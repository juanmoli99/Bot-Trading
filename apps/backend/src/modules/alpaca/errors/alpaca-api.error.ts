export class AlpacaApiError extends Error {
  constructor(
    message: string,
    readonly statusCode?: number,
  ) {
    super(message);

    this.name = 'AlpacaApiError';
  }
}
