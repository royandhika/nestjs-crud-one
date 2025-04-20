import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenService } from './access-token.service';
import { RefreshTokenService } from './refresh-token.service';

@Module({
    imports: [JwtModule],
    providers: [AccessTokenService, RefreshTokenService],
    exports: [AccessTokenService, RefreshTokenService],
})
export class JwtTokenModule {}
