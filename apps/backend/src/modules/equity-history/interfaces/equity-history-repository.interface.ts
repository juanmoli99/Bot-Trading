import type { EquitySnapshotEntity } from '../entities/equity-snapshot.entity.js';

export interface EquityHistoryRepository {
  create(snapshot: EquitySnapshotEntity): Promise<EquitySnapshotEntity>;

  findLatestByEnvironment(
    environment: string,
  ): Promise<EquitySnapshotEntity | null>;

  findTodayByEnvironment(environment: string): Promise<EquitySnapshotEntity[]>;
}
