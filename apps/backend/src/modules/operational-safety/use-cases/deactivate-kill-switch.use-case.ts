import { Injectable } from '@nestjs/common';

import { OperationalSafetyAuditService } from '../audit/services/operational-safety-audit.service.js';
import { OperationalSafetyService } from '../services/operational-safety.service.js';

import type { OperationalSafetyEntity } from '../entities/operational-safety.entity.js';

@Injectable()
export class DeactivateKillSwitchUseCase {
  constructor(
    private readonly operationalSafetyService: OperationalSafetyService,

    private readonly operationalSafetyAuditService: OperationalSafetyAuditService,
  ) {}

  async execute(): Promise<OperationalSafetyEntity> {
    const previousState = await this.operationalSafetyService.getState();

    const newState = await this.operationalSafetyService.deactivateKillSwitch();

    await this.operationalSafetyAuditService.register({
      action: 'DEACTIVATE_KILL_SWITCH',

      previousState: JSON.stringify(previousState),

      newState: JSON.stringify(newState),
    });

    return newState;
  }
}
