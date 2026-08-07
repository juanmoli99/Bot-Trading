import { Injectable } from '@nestjs/common';

import type { PrismaService } from '../../../common/database/prisma.service.js';

import type { OperationalSafetyEntity } from '../entities/operational-safety.entity.js';
import type { OperationalSafetyRepository } from '../interfaces/operational-safety-repository.interface.js';

@Injectable()
export class PrismaOperationalSafetyRepository implements OperationalSafetyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(): Promise<OperationalSafetyEntity | null> {
    return await this.prismaService.operationalSafetyState.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(
    state: OperationalSafetyEntity,
  ): Promise<OperationalSafetyEntity> {
    return await this.prismaService.operationalSafetyState.create({
      data: {
        id: state.id,

        tradingEnabled: state.tradingEnabled,

        killSwitchActive: state.killSwitchActive,

        reason: state.reason,

        environment: state.environment,
      },
    });
  }

  async update(
    id: string,
    data: Partial<OperationalSafetyEntity>,
  ): Promise<OperationalSafetyEntity> {
    return await this.prismaService.operationalSafetyState.update({
      where: {
        id,
      },

      data,
    });
  }
}
