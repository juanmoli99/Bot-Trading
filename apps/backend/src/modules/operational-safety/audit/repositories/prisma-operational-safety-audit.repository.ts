import { Injectable } from '@nestjs/common';

import type { PrismaService } from '../../../../common/database/prisma.service.js';

import type { OperationalSafetyAuditEntity } from '../entities/operational-safety-audit.entity.js';
import type { OperationalSafetyAuditRepository } from '../interfaces/operational-safety-audit-repository.interface.js';

@Injectable()
export class PrismaOperationalSafetyAuditRepository implements OperationalSafetyAuditRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    audit: OperationalSafetyAuditEntity,
  ): Promise<OperationalSafetyAuditEntity> {
    return await this.prismaService.operationalSafetyAudit.create({
      data: {
        id: audit.id,

        action: audit.action,

        previousState: audit.previousState,

        newState: audit.newState,

        reason: audit.reason,
      },
    });
  }

  async findAll(): Promise<OperationalSafetyAuditEntity[]> {
    return await this.prismaService.operationalSafetyAudit.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
