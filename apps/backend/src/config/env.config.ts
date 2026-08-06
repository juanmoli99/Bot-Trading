import { registerAs } from '@nestjs/config';

import { validateEnv } from './env.validation.js';

export default registerAs('env', () => validateEnv(process.env));
