import { Inject } from '@nestjs/common';
import { CONFIG } from './config.constant';

export const InjectConfig = () => Inject(CONFIG);
