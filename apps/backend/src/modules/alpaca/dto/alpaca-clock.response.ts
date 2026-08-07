import type { AlpacaClock } from '../interfaces/alpaca-clock.interface.js';

export class AlpacaClockResponseDto {
  timestamp: string;
  is_open: boolean;
  next_open: string;
  next_close: string;

  constructor(clock: AlpacaClock) {
    this.timestamp = clock.timestamp;
    this.is_open = clock.is_open;
    this.next_open = clock.next_open;
    this.next_close = clock.next_close;
  }
}
