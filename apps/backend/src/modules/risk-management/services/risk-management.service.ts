import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import { PortfolioService } from '../../portfolio/services/portfolio.service.js';

import type { RiskConfigurationEntity } from '../entities/risk-configuration.entity.js';
import type { RiskConfigurationRepository } from '../interfaces/risk-configuration-repository.interface.js';

@Injectable()
export class RiskManagementService {
  constructor(
    private readonly riskConfigurationRepository: RiskConfigurationRepository,

    private readonly portfolioService: PortfolioService,
  ) {}

  async getConfiguration(): Promise<RiskConfigurationEntity> {
    const configuration = await this.riskConfigurationRepository.find();

    if (configuration) {
      return configuration;
    }

    return await this.riskConfigurationRepository.create({
      id: randomUUID(),

      maxDailyLoss: '0',

      maxTotalExposure: '0',

      maxOpenPositions: 0,

      createdAt: new Date(),

      updatedAt: new Date(),
    });
  }

  async validateDailyLoss(): Promise<boolean> {
    const configuration = await this.getConfiguration();

    const portfolio = await this.portfolioService.getSummary();

    return (
      Number(portfolio.dailyProfitLoss) >= Number(configuration.maxDailyLoss)
    );
  }

  async validateExposure(): Promise<boolean> {
    const configuration = await this.getConfiguration();

    const portfolio = await this.portfolioService.getSummary();

    return (
      Number(portfolio.totalExposure) <= Number(configuration.maxTotalExposure)
    );
  }

  async validateOpenPositions(): Promise<boolean> {
    const configuration = await this.getConfiguration();

    const portfolio = await this.portfolioService.getSummary();

    return portfolio.openPositions <= configuration.maxOpenPositions;
  }
}
