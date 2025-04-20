import { Module, Global } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from 'src/logger/logger.config';

@Global()
@Module({
    imports: [WinstonModule.forRoot(winstonOptions)],
    exports: [WinstonModule],
})
export class LoggerModule {}
