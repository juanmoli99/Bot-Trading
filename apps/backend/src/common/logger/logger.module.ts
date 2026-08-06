import { Module } from '@nestjs/common';

import { loggerConfig } from './logger.config.js';

@Module({
  imports: [loggerConfig],
})
export class LoggerModule {}
