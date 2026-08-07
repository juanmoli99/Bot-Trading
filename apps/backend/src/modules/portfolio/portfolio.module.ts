import { Module } from '@nestjs/common';

import { AlpacaModule } from '../alpaca/alpaca.module.js';

import { PortfolioService } from './services/portfolio.service.js';

@Module({
  imports: [AlpacaModule],

  providers: [PortfolioService],

  exports: [PortfolioService],
})
export class PortfolioModule {}
