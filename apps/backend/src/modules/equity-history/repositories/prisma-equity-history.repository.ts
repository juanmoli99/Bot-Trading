import { Injectable } from '@nestjs/common';

import type { PrismaService } from '../../../common/database/prisma.service.js';

import type { EquitySnapshotEntity } from '../entities/equity-snapshot.entity.js';
import type { EquityHistoryRepository } from '../interfaces/equity-history-repository.interface.js';

@Injectable()
export class PrismaEquityHistoryRepository implements EquityHistoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(snapshot: EquitySnapshotEntity): Promise<EquitySnapshotEntity> {
    return await this.prismaService.equityHistory.create({
      data: {
        id: snapshot.id,

        equity: snapshot.equity,

        environment: snapshot.environment,
      },
    });
  }

  async findLatestByEnvironment(
    environment: string,
  ): Promise<EquitySnapshotEntity | null> {
    return await this.prismaService.equityHistory.findFirst({
      where: {
        environment,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findTodayByEnvironment(
    environment: string,
  ): Promise<EquitySnapshotEntity[]> {
    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);

    return await this.prismaService.equityHistory.findMany({
      where: {
        environment,

        createdAt: {
          gte: startOfDay,
        },
      },

      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
