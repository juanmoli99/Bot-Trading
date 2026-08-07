import { Controller, Get } from '@nestjs/common';

import type { AlpacaHealthService } from '../services/alpaca-health.service.js';

@Controller('alpaca')
export class AlpacaHealthController {
  constructor(private readonly alpacaHealthService: AlpacaHealthService) {}

  @Get('health')
  async checkHealth(): Promise<{
    connected: boolean;
  }> {
    return await this.alpacaHealthService.checkConnection();
  }
}
