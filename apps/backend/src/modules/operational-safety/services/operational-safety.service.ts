import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import type { OperationalSafetyEntity } from '../entities/operational-safety.entity.js';
import type { OperationalSafetyRepository } from '../interfaces/operational-safety-repository.interface.js';

@Injectable()
export class OperationalSafetyService {
  constructor(
    private readonly operationalSafetyRepository: OperationalSafetyRepository,
  ) {}

  async getState(): Promise<OperationalSafetyEntity> {
    const state = await this.operationalSafetyRepository.find();

    if (state) {
      return state;
    }

    return await this.operationalSafetyRepository.create({
      id: randomUUID(),

      tradingEnabled: false,

      killSwitchActive: true,

      reason: 'Initial safety state',

      environment: 'PAPER',

      liveTradingAllowed: false,

      createdAt: new Date(),

      updatedAt: new Date(),
    });
  }

  async enableTrading(environment: string): Promise<OperationalSafetyEntity> {
    const state = await this.getState();

    if (environment === 'LIVE' && !state.liveTradingAllowed) {
      throw new Error('Live trading is not authorized');
    }

    return await this.operationalSafetyRepository.update(state.id, {
      tradingEnabled: true,

      killSwitchActive: false,

      reason: null,

      environment,

      updatedAt: new Date(),
    });
  }

  async setEnvironment(environment: string): Promise<OperationalSafetyEntity> {
    const state = await this.getState();

    return await this.operationalSafetyRepository.update(state.id, {
      environment,

      tradingEnabled: false,

      reason: `Environment changed to ${environment}`,

      updatedAt: new Date(),
    });
  }

  async authorizeLiveTrading(): Promise<OperationalSafetyEntity> {
    const state = await this.getState();

    return await this.operationalSafetyRepository.update(state.id, {
      liveTradingAllowed: true,

      updatedAt: new Date(),
    });
  }

  async revokeLiveTrading(): Promise<OperationalSafetyEntity> {
    const state = await this.getState();

    return await this.operationalSafetyRepository.update(state.id, {
      liveTradingAllowed: false,

      tradingEnabled: false,

      reason: 'Live trading authorization revoked',

      updatedAt: new Date(),
    });
  }

  async disableTrading(reason: string): Promise<OperationalSafetyEntity> {
    const state = await this.getState();

    return await this.operationalSafetyRepository.update(state.id, {
      tradingEnabled: false,

      reason,

      updatedAt: new Date(),
    });
  }

  async activateKillSwitch(reason: string): Promise<OperationalSafetyEntity> {
    const state = await this.getState();

    return await this.operationalSafetyRepository.update(state.id, {
      killSwitchActive: true,

      tradingEnabled: false,

      reason,

      updatedAt: new Date(),
    });
  }

  async deactivateKillSwitch(): Promise<OperationalSafetyEntity> {
    const state = await this.getState();

    return await this.operationalSafetyRepository.update(state.id, {
      killSwitchActive: false,

      updatedAt: new Date(),
    });
  }

  async canTrade(): Promise<boolean> {
    const state = await this.getState();

    if (!state.tradingEnabled || state.killSwitchActive) {
      return false;
    }

    if (state.environment === 'LIVE' && !state.liveTradingAllowed) {
      return false;
    }

    return true;
  }
}
