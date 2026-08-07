import { Module, type Provider } from '@nestjs/common';

import { PrismaOperationalSafetyAuditRepository } from './audit/repositories/prisma-operational-safety-audit.repository.js';
import { OperationalSafetyAuditService } from './audit/services/operational-safety-audit.service.js';

import { PrismaOperationalSafetyRepository } from './repositories/prisma-operational-safety.repository.js';

import { ActivateKillSwitchUseCase } from './use-cases/activate-kill-switch.use-case.js';
import { DeactivateKillSwitchUseCase } from './use-cases/deactivate-kill-switch.use-case.js';

import { OperationalSafetyService } from './services/operational-safety.service.js';

const operationalSafetyProviders: Provider[] = [
  OperationalSafetyService,

  OperationalSafetyAuditService,

  ActivateKillSwitchUseCase,

  DeactivateKillSwitchUseCase,

  {
    provide: 'OperationalSafetyRepository',

    useClass: PrismaOperationalSafetyRepository,
  },

  {
    provide: 'OperationalSafetyAuditRepository',

    useClass: PrismaOperationalSafetyAuditRepository,
  },
];

@Module({
  providers: operationalSafetyProviders,

  exports: [
    OperationalSafetyService,

    OperationalSafetyAuditService,

    ActivateKillSwitchUseCase,

    DeactivateKillSwitchUseCase,
  ],
})
export class OperationalSafetyModule {}
