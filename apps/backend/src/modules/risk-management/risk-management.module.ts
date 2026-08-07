import { Module, type Provider } from '@nestjs/common';

import { PrismaRiskConfigurationRepository } from './repositories/prisma-risk-configuration.repository.js';
import { RiskManagementService } from './services/risk-management.service.js';

const riskManagementProviders: Provider[] = [
  RiskManagementService,

  {
    provide: 'RiskConfigurationRepository',

    useClass: PrismaRiskConfigurationRepository,
  },
];

@Module({
  providers: riskManagementProviders,

  exports: [RiskManagementService],
})
export class RiskManagementModule {}
