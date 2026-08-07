import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import type { OperationalSafetyAuditEntity } from '../entities/operational-safety-audit.entity.js';
import type { OperationalSafetyAuditRepository } from '../interfaces/operational-safety-audit-repository.interface.js';

@Injectable()
export class OperationalSafetyAuditService {
  constructor(
    private readonly operationalSafetyAuditRepository: OperationalSafetyAuditRepository,
  ) {}

  async register(data: {
    action: string;

    previousState: string;

    newState: string;

    reason?: string | null;
  }): Promise<OperationalSafetyAuditEntity> {
    const audit: OperationalSafetyAuditEntity = {
      id: randomUUID(),

      action: data.action,

      previousState: data.previousState,

      newState: data.newState,

      reason: data.reason ?? null,

      createdAt: new Date(),
    };

    return await this.operationalSafetyAuditRepository.create(audit);
  }

  async findAll(): Promise<OperationalSafetyAuditEntity[]> {
    return await this.operationalSafetyAuditRepository.findAll();
  }
}
