import { Module, Global } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonProvider } from './logger.provider';

@Global()
@Module({
    imports: [winstonProvider],
    exports: [WinstonModule],
})
export class LoggerModule {}
