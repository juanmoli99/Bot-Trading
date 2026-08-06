import { LoggerModule } from 'nestjs-pino';

export const loggerConfig = LoggerModule.forRoot({
  pinoHttp: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  },
});
