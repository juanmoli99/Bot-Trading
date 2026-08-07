import { z } from 'zod';

export const alpacaAssetSchema = z.object({
  id: z.string(),

  symbol: z.string(),

  name: z.string(),

  exchange: z.string(),

  class: z.string(),

  tradable: z.boolean(),

  fractionable: z.boolean(),

  shortable: z.boolean(),

  easy_to_borrow: z.boolean(),

  status: z.string(),
});
