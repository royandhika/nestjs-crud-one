import { Global, Module } from '@nestjs/common';
import { DrizzleDBProvider, drizzleProvider } from './drizzle.provider';

@Global()
@Module({
    providers: [...drizzleProvider],
    exports: [DrizzleDBProvider],
})
export class DrizzleModule {}
