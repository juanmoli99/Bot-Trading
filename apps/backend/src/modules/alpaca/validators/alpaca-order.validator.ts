import type { CreateAlpacaOrderDto } from '../dto/create-alpaca-order.dto.js';
import { AlpacaOrderValidationError } from '../errors/alpaca-order-validation.error.js';

export class AlpacaOrderValidator {
  static validate(order: CreateAlpacaOrderDto): void {
    if (!order.symbol) {
      throw new AlpacaOrderValidationError('Symbol is required');
    }

    if (!order.qty && !order.notional) {
      throw new AlpacaOrderValidationError(
        'Either qty or notional is required',
      );
    }

    if (order.qty && order.notional) {
      throw new AlpacaOrderValidationError(
        'qty and notional cannot be used together',
      );
    }

    if (order.type === 'limit' && !order.limit_price) {
      throw new AlpacaOrderValidationError(
        'limit_price is required for limit orders',
      );
    }

    if (order.type === 'stop' && !order.stop_price) {
      throw new AlpacaOrderValidationError(
        'stop_price is required for stop orders',
      );
    }

    if (order.type === 'stop_limit') {
      if (!order.limit_price || !order.stop_price) {
        throw new AlpacaOrderValidationError(
          'stop_limit orders require limit_price and stop_price',
        );
      }
    }

    if (order.type === 'market') {
      if (order.limit_price || order.stop_price) {
        throw new AlpacaOrderValidationError(
          'market orders cannot contain price fields',
        );
      }
    }
  }
}
