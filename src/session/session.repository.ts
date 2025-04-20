import { Inject, Injectable } from '@nestjs/common';
import { DrizzleDBProvider } from 'src/drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PostSessionRequest } from './session.interface';
import * as entity from 'src/drizzle/drizzle.entity';

@Injectable()
// export class SessionRepository implements ISessionRepository {
export class SessionRepository {
    constructor(
        @Inject(DrizzleDBProvider)
        private readonly db: NodePgDatabase<typeof entity>,
    ) {}

    async postSession(input: PostSessionRequest) {
        await this.db.insert(entity.sessions).values({
            userId: input.userId,
            refreshToken: input.refreshToken,
            userAgent: input.userAgent,
            ipAddress: input.ipAddress,
            isActive: 1,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        });
    }
}
