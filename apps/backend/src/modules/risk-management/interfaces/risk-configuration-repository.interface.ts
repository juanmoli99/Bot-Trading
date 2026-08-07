import type { RiskConfigurationEntity } from '../entities/risk-configuration.entity.js';

export interface RiskConfigurationRepository {
  find(): Promise<RiskConfigurationEntity | null>;

  create(
    configuration: RiskConfigurationEntity,
  ): Promise<RiskConfigurationEntity>;

  update(
    id: string,
    data: Partial<RiskConfigurationEntity>,
  ): Promise<RiskConfigurationEntity>;
}
