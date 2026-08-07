import { Injectable } from '@nestjs/common';

import type { PrismaService } from '../../../common/database/prisma.service.js';

import type { RiskConfigurationEntity } from '../entities/risk-configuration.entity.js';
import type { RiskConfigurationRepository } from '../interfaces/risk-configuration-repository.interface.js';

@Injectable()
export class PrismaRiskConfigurationRepository implements RiskConfigurationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(): Promise<RiskConfigurationEntity | null> {
    return await this.prismaService.riskConfiguration.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(
    configuration: RiskConfigurationEntity,
  ): Promise<RiskConfigurationEntity> {
    return await this.prismaService.riskConfiguration.create({
      data: {
        id: configuration.id,

        maxDailyLoss: configuration.maxDailyLoss,

        maxTotalExposure: configuration.maxTotalExposure,

        maxOpenPositions: configuration.maxOpenPositions,
      },
    });
  }

  async update(
    id: string,
    data: Partial<RiskConfigurationEntity>,
  ): Promise<RiskConfigurationEntity> {
    return await this.prismaService.riskConfiguration.update({
      where: {
        id,
      },

      data,
    });
  }
}
