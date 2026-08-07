import { registerAs } from '@nestjs/config';

export default registerAs('alpaca', () => ({
  apiKey: process.env.ALPACA_API_KEY ?? '',

  secretKey: process.env.ALPACA_SECRET_KEY ?? '',

  tradingUrl:
    process.env.ALPACA_TRADING_URL ?? 'https://paper-api.alpaca.markets',

  dataUrl: process.env.ALPACA_DATA_URL ?? 'https://data.alpaca.markets',
}));
