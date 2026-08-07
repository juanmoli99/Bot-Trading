import { registerAs } from '@nestjs/config';

export default registerAs('alpaca', () => {
  const mode = process.env.ALPACA_MODE ?? 'paper';

  const tradingUrl =
    process.env.ALPACA_TRADING_URL ?? 'https://paper-api.alpaca.markets';

  if (mode !== 'paper' && mode !== 'live') {
    throw new Error('Invalid ALPACA_MODE. Allowed values: paper, live');
  }

  if (mode === 'live' && !process.env.ALPACA_ENABLE_LIVE_TRADING) {
    throw new Error(
      'Live trading is disabled. Set ALPACA_ENABLE_LIVE_TRADING=true to enable it.',
    );
  }

  return {
    mode,

    apiKey: process.env.ALPACA_API_KEY ?? '',

    secretKey: process.env.ALPACA_SECRET_KEY ?? '',

    tradingUrl,

    dataUrl: process.env.ALPACA_DATA_URL ?? 'https://data.alpaca.markets',

    timeoutMs: Number(process.env.ALPACA_TIMEOUT_MS ?? 10000),
  };
});
