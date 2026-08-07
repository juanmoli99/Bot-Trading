import { z } from 'zod';

export const alpacaAccountSchema = z.object({
  id: z.string(),
  status: z.string(),
  currency: z.string(),
  buying_power: z.string(),
  cash: z.string(),
  portfolio_value: z.string(),
  equity: z.string(),
});

export type AlpacaAccountSchema = z.infer<typeof alpacaAccountSchema>;
