import type { AlpacaClock } from '../interfaces/alpaca-clock.interface.js';

export interface AlpacaClockApiResponse {
  timestamp: string;
  is_open: boolean;
  next_open: string;
  next_close: string;
}

export class AlpacaClockMapper {
  static toDomain(response: AlpacaClockApiResponse): AlpacaClock {
    return {
      timestamp: response.timestamp,
      is_open: response.is_open,
      next_open: response.next_open,
      next_close: response.next_close,
    };
  }
}
