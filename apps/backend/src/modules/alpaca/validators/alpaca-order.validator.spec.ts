import { AlpacaOrderValidationError } from '../errors/alpaca-order-validation.error.js';

import { AlpacaOrderValidator } from './alpaca-order.validator.js';

describe('AlpacaOrderValidator', () => {
  it('should accept a valid market order', () => {
    expect(() =>
      AlpacaOrderValidator.validate({
        symbol: 'AAPL',
        qty: '1',
        side: 'buy',
        type: 'market',
        time_in_force: 'day',
      }),
    ).not.toThrow();
  });

  it('should reject when symbol is missing', () => {
    expect(() =>
      AlpacaOrderValidator.validate({
        symbol: '',
        qty: '1',
        side: 'buy',
        type: 'market',
        time_in_force: 'day',
      }),
    ).toThrow(AlpacaOrderValidationError);
  });

  it('should reject when qty and notional are both provided', () => {
    expect(() =>
      AlpacaOrderValidator.validate({
        symbol: 'AAPL',
        qty: '1',
        notional: '100',
        side: 'buy',
        type: 'market',
        time_in_force: 'day',
      }),
    ).toThrow(AlpacaOrderValidationError);
  });

  it('should reject limit orders without limit_price', () => {
    expect(() =>
      AlpacaOrderValidator.validate({
        symbol: 'AAPL',
        qty: '1',
        side: 'buy',
        type: 'limit',
        time_in_force: 'day',
      }),
    ).toThrow(AlpacaOrderValidationError);
  });

  it('should reject stop orders without stop_price', () => {
    expect(() =>
      AlpacaOrderValidator.validate({
        symbol: 'AAPL',
        qty: '1',
        side: 'buy',
        type: 'stop',
        time_in_force: 'day',
      }),
    ).toThrow(AlpacaOrderValidationError);
  });

  it('should reject market orders with price fields', () => {
    expect(() =>
      AlpacaOrderValidator.validate({
        symbol: 'AAPL',
        qty: '1',
        side: 'buy',
        type: 'market',
        time_in_force: 'day',
        limit_price: '150',
      }),
    ).toThrow(AlpacaOrderValidationError);
  });
});
