import { Module } from '@nestjs/common';

import { OperationalSafetyModule } from '../operational-safety/operational-safety.module.js';

import { PreTradeCheckService } from './services/pre-trade-check.service.js';

@Module({
  imports: [OperationalSafetyModule],

  providers: [PreTradeCheckService],

  exports: [PreTradeCheckService],
})
export class PreTradeChecksModule {}
