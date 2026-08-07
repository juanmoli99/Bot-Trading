import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import type { EquitySnapshotEntity } from '../entities/equity-snapshot.entity.js';
import type { EquityHistoryRepository } from '../interfaces/equity-history-repository.interface.js';

@Injectable()
export class EquityHistoryService {
  constructor(
    private readonly equityHistoryRepository: EquityHistoryRepository,
  ) {}

  async saveSnapshot(
    equity: string,
    environment: string,
  ): Promise<EquitySnapshotEntity> {
    return await this.equityHistoryRepository.create({
      id: randomUUID(),

      equity,

      environment,

      createdAt: new Date(),
    });
  }

  async getDailyStartingEquity(environment: string): Promise<string> {
    const snapshots =
      await this.equityHistoryRepository.findTodayByEnvironment(environment);

    const firstSnapshot = snapshots[0];

    if (!firstSnapshot) {
      return '0';
    }

    return firstSnapshot.equity;
  }

  async calculateDailyPnL(
    currentEquity: string,
    environment: string,
  ): Promise<string> {
    const startingEquity = await this.getDailyStartingEquity(environment);

    return (Number(currentEquity) - Number(startingEquity)).toString();
  }
}
