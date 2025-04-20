import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PostSessionDto } from './session.dto';
import * as bcrypt from 'bcrypt';
import { SessionRepository } from './session.repository';
import { UserRepository } from 'src/user/user.repository';
import { AccessTokenService } from './jwt/access-token.service';
import { RefreshTokenService } from './jwt/refresh-token.service';
import { PostSessionResponse } from './session.interface';

@Injectable()
export class SessionService {
    constructor(
        private readonly sessionRepository: SessionRepository,
        private readonly userRepository: UserRepository,
        private readonly jwtAccess: AccessTokenService,
        private readonly jwtRefresh: RefreshTokenService,
    ) {}

    async postSession(request: PostSessionDto): Promise<PostSessionResponse> {
        // Cek user ada ga
        const existedUsername = await this.userRepository.getUserByUsername({
            username: request.username,
        });
        if (!existedUsername) throw new UnauthorizedException(`Username doesn't exist`);

        // Cek password
        const isValidPassword = await bcrypt.compare(request.password, existedUsername.password);
        if (!isValidPassword) throw new UnauthorizedException('Username or password wrong');

        // Sign token
        const refreshToken = await this.jwtRefresh.sign({
            userId: existedUsername.id,
            username: existedUsername.username,
        });
        const accessToken = await this.jwtAccess.sign({
            userId: existedUsername.id,
            username: existedUsername.username,
        });

        // Construct body
        const postSessionRequest = {
            userId: existedUsername.id,
            refreshToken: refreshToken,
            userAgent: 'dummy',
            ipAddress: 'dummy',
        };

        // Write db
        await this.sessionRepository.postSession(postSessionRequest);

        // Response
        const response = {
            id: existedUsername.id,
            username: existedUsername.username,
            refreshToken: refreshToken,
            accessToken: accessToken,
        };
        return response;
    }
}
