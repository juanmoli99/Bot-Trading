import { Controller, Get } from '@nestjs/common';

import { HealthService } from './health.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async check(): Promise<{
    status: string;
    timestamp: string;
    database: string;
  }> {
    const database = await this.healthService.checkDatabase();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      ...database,
    };
  }
}
