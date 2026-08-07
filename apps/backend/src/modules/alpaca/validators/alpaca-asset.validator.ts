import type { AlpacaAsset } from '../interfaces/alpaca-asset.interface.js';

export class AlpacaAssetValidator {
  static validate(
    asset: AlpacaAsset,
    options?: {
      requiresFractional?: boolean;

      requiresShort?: boolean;
    },
  ): void {
    if (asset.status !== 'active') {
      throw new Error(`Asset ${asset.symbol} is not active`);
    }

    if (!asset.tradable) {
      throw new Error(`Asset ${asset.symbol} is not tradable`);
    }

    if (options?.requiresFractional && !asset.fractionable) {
      throw new Error(
        `Asset ${asset.symbol} does not support fractional trading`,
      );
    }

    if (options?.requiresShort) {
      if (!asset.shortable) {
        throw new Error(`Asset ${asset.symbol} does not support short selling`);
      }

      if (!asset.easyToBorrow) {
        throw new Error(`Asset ${asset.symbol} is not easy to borrow`);
      }
    }
  }
}
