import type { OperationalSafetyAuditEntity } from '../entities/operational-safety-audit.entity.js';

export interface OperationalSafetyAuditRepository {
  create(
    audit: OperationalSafetyAuditEntity,
  ): Promise<OperationalSafetyAuditEntity>;

  findAll(): Promise<OperationalSafetyAuditEntity[]>;
}
