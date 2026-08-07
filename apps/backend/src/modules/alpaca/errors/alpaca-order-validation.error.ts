export class AlpacaOrderValidationError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'AlpacaOrderValidationError';
  }
}
