import type { AlpacaAsset } from '../interfaces/alpaca-asset.interface.js';

export interface AlpacaAssetApiResponse {
  id: string;

  symbol: string;

  name: string;

  exchange: string;

  class: string;

  tradable: boolean;

  fractionable: boolean;

  shortable: boolean;

  easy_to_borrow: boolean;

  status: string;
}

export class AlpacaAssetMapper {
  static toDomain(response: AlpacaAssetApiResponse): AlpacaAsset {
    return {
      id: response.id,

      symbol: response.symbol,

      name: response.name,

      exchange: response.exchange,

      assetClass: response.class,

      tradable: response.tradable,

      fractionable: response.fractionable,

      shortable: response.shortable,

      easyToBorrow: response.easy_to_borrow,

      status: response.status,
    };
  }
}
