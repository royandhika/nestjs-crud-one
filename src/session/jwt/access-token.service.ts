import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessTokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async sign(payload: JwtPayload): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_ACCESS'),
            expiresIn: '1d',
        });
    }

    async verify(token: string): Promise<JwtPayload> {
        return this.jwtService.verifyAsync(token, {
            secret: this.configService.get<string>('JWT_ACCESS'),
        });
    }
}
