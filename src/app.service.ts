// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }

import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './drizzle/drizzle.entity';
// import { DrizzleService } from './drizzle/drizzle.provider';
// import { DrizzleAsyncProvider } from './drizzle/drizzle.provider';

@Injectable()
export class AppService {
    // constructor(private db: DrizzleService) {}
    // constructor(
    //     @Inject('DrizzlePoolProvider')
    //     private db: NodePgDatabase<typeof schema>,
    // ) {}
    // async getFirstRole() {
    //     const existingUserRole = await this.db.query.user_role.findFirst({});
    //     return existingUserRole;
    // }
    // async postUsers() {
    //     await this.db.insert(schema.users).values({
    //         username:
    //     })
    // }
}
