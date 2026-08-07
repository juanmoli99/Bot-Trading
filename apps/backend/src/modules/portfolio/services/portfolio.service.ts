import { Injectable } from '@nestjs/common';

import { GetAlpacaAccountUseCase } from '../../alpaca/use-cases/get-alpaca-account.use-case.js';
import { GetAlpacaPositionsUseCase } from '../../alpaca/use-cases/get-alpaca-positions.use-case.js';

import { EquityHistoryService } from '../../equity-history/services/equity-history.service.js';

import type { PortfolioSummaryEntity } from '../entities/portfolio-summary.entity.js';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly getAlpacaAccountUseCase: GetAlpacaAccountUseCase,

    private readonly getAlpacaPositionsUseCase: GetAlpacaPositionsUseCase,

    private readonly equityHistoryService: EquityHistoryService,
  ) {}

  async getSummary(): Promise<PortfolioSummaryEntity> {
    const account = await this.getAlpacaAccountUseCase.execute();

    const positions = await this.getAlpacaPositionsUseCase.execute();

    const environment = 'PAPER';

    const dailyProfitLoss = await this.equityHistoryService.calculateDailyPnL(
      account.equity,
      environment,
    );

    await this.equityHistoryService.saveSnapshot(account.equity, environment);

    const totalExposure = positions.reduce((total, position) => {
      return total + Number(position.market_value);
    }, 0);

    return {
      equity: account.equity,

      dailyProfitLoss,

      totalExposure: totalExposure.toString(),

      openPositions: positions.length,

      updatedAt: new Date(),
    };
  }
}
