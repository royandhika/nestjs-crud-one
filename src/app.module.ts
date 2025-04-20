import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { LoggerModule } from './logger/logger.module';

@Module({
    imports: [
        LoggerModule,
        ConfigModule.forRoot({ isGlobal: true }),
        DrizzleModule,
        UserModule,
        SessionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
