import { Test } from '@nestjs/testing';

import { PrismaService } from '../../common/database/prisma.service.js';

import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        HealthService,
        {
          provide: PrismaService,
          useValue: {
            $queryRaw: (): Promise<void> => Promise.resolve(),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should return health status', async () => {
    const response = await controller.check();

    expect(response.status).toBe('ok');
    expect(response.database).toBe('ok');
  });
});
