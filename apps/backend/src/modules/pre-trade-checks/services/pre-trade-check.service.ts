import { Injectable } from '@nestjs/common';

import type { PreTradeCheckResultEntity } from '../entities/pre-trade-check-result.entity.js';
import type { PreTradeOrder } from '../interfaces/pre-trade-order.interface.js';

import { OperationalSafetyService } from '../../operational-safety/services/operational-safety.service.js';
import { RiskManagementService } from '../../risk-management/services/risk-management.service.js';

@Injectable()
export class PreTradeCheckService {
  constructor(
    private readonly operationalSafetyService: OperationalSafetyService,

    private readonly riskManagementService: RiskManagementService,
  ) {}

  async canExecuteOrder(
    order: PreTradeOrder,
  ): Promise<PreTradeCheckResultEntity> {
    const reasons: string[] = [];

    const canTrade = await this.operationalSafetyService.canTrade();

    if (!canTrade) {
      reasons.push('Trading is disabled by operational safety');
    }

    if (!order.symbol) {
      reasons.push('Symbol is required');
    }

    if (!order.qty && !order.notional) {
      reasons.push('Order requires qty or notional');
    }

    if (order.qty && Number(order.qty) <= 0) {
      reasons.push('Quantity must be greater than zero');
    }

    if (order.notional && Number(order.notional) <= 0) {
      reasons.push('Notional must be greater than zero');
    }

    const dailyLossAllowed =
      await this.riskManagementService.validateDailyLoss();

    if (!dailyLossAllowed) {
      reasons.push('Daily loss limit exceeded');
    }

    const exposureAllowed = await this.riskManagementService.validateExposure();

    if (!exposureAllowed) {
      reasons.push('Exposure limit exceeded');
    }

    const positionsAllowed =
      await this.riskManagementService.validateOpenPositions();

    if (!positionsAllowed) {
      reasons.push('Open positions limit exceeded');
    }

    return {
      allowed: reasons.length === 0,

      reasons,
    };
  }
}
