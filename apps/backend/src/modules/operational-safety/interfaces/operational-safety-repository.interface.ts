import type { OperationalSafetyEntity } from '../entities/operational-safety.entity.js';

export interface OperationalSafetyRepository {
  find(): Promise<OperationalSafetyEntity | null>;

  create(state: OperationalSafetyEntity): Promise<OperationalSafetyEntity>;

  update(
    id: string,
    data: Partial<OperationalSafetyEntity>,
  ): Promise<OperationalSafetyEntity>;
}
