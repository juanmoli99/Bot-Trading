import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common/database/prisma.service.js';

@Injectable()
export class HealthService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkDatabase(): Promise<{
    database: string;
  }> {
    await this.prismaService.$queryRaw`SELECT 1`;

    return {
      database: 'ok',
    };
  }
}
