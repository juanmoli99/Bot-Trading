import { z } from 'zod';

export const alpacaPositionSchema = z.array(
  z.object({
    asset_id: z.string(),
    symbol: z.string(),
    exchange: z.string(),
    asset_class: z.string(),
    qty: z.string(),
    side: z.string(),
    avg_entry_price: z.string(),
    market_value: z.string(),
    cost_basis: z.string(),
    unrealized_pl: z.string(),
    unrealized_plpc: z.string(),
    current_price: z.string(),
    lastday_price: z.string(),
    change_today: z.string(),
  }),
);

export type AlpacaPositionSchema = z.infer<typeof alpacaPositionSchema>;
