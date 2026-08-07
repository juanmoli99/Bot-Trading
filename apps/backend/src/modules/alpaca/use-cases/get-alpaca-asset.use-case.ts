import { Injectable } from '@nestjs/common';

import type { AlpacaAsset } from '../interfaces/alpaca-asset.interface.js';

import { AlpacaHttpClient } from '../services/alpaca-http.client.js';

import { AlpacaAssetMapper } from '../mappers/alpaca-asset.mapper.js';

import { alpacaAssetSchema } from '../schemas/alpaca-asset.schema.js';

@Injectable()
export class GetAlpacaAssetUseCase {
  constructor(private readonly alpacaHttpClient: AlpacaHttpClient) {}

  async execute(symbol: string): Promise<AlpacaAsset> {
    const response = await this.alpacaHttpClient.getTrading(
      `/v2/assets/${symbol}`,
      alpacaAssetSchema,
    );

    return AlpacaAssetMapper.toDomain(response);
  }
}
