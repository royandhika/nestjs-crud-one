import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as entity from 'src/drizzle/drizzle.entity';
import {
    GetUserByEmailInput,
    GetUserByUsernameInput,
    GetUserOutput,
    PostUserInput,
    PostUserOutput,
} from './user.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DrizzleDBProvider } from 'src/drizzle/drizzle.provider';
import { eq } from 'drizzle-orm';

@Injectable()
// export class UserRepository implements IUserRepository {
export class UserRepository {
    constructor(
        @Inject(DrizzleDBProvider)
        private readonly db: NodePgDatabase<typeof entity>,
    ) {}

    async getUserByEmail(input: GetUserByEmailInput): Promise<GetUserOutput> {
        const [existedUser] = await this.db
            .select({
                id: entity.users.id,
                username: entity.users.username,
                email: entity.users.email,
                password: entity.users.password,
            })
            .from(entity.users)
            .where(eq(entity.users.email, input.email));

        return existedUser ?? null;
    }

    async getUserByUsername(input: GetUserByUsernameInput): Promise<GetUserOutput> {
        const [existedUser] = await this.db
            .select({
                id: entity.users.id,
                username: entity.users.username,
                email: entity.users.email,
                password: entity.users.password,
            })
            .from(entity.users)
            .where(eq(entity.users.username, input.username));

        return existedUser ?? null;
    }

    async postUser(input: PostUserInput): Promise<PostUserOutput> {
        const [createdUser] = await this.db
            .insert(entity.users)
            .values({
                username: input.username,
                email: input.email,
                password: input.hashedPassword,
            })
            .returning({ id: entity.users.id });

        await this.db.insert(entity.userProfiles).values({
            userId: createdUser.id,
        });

        return {
            id: createdUser.id,
            username: input.username,
            email: input.email,
        };
    }
}
