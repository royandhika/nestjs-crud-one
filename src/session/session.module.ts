import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { SessionRepository } from './session.repository';
import { UserModule } from 'src/user/user.module';
import { JwtTokenModule } from './jwt/jwt.module';

@Module({
    imports: [UserModule, JwtTokenModule],
    controllers: [SessionController],
    providers: [SessionService, SessionRepository],
    exports: [SessionService],
})
export class SessionModule {}
