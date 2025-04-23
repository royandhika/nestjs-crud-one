import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as entity from './drizzle.entity';
import { ConfigService } from '@nestjs/config';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';
import * as pc from 'picocolors';

export const DrizzleDBProvider = 'DrizzleDBProvider';

export const drizzleProvider = [
    {
        provide: DrizzleDBProvider,
        inject: [ConfigService, WINSTON_MODULE_NEST_PROVIDER],
        useFactory: (configService: ConfigService, logger: LoggerService) => {
            const connectionString = configService.get<string>('DATABASE_URL');
            const pool = new Pool({
                connectionString,
            });

            return drizzle(pool, {
                schema: entity,
                casing: 'snake_case',
                logger: {
                    logQuery: (query: string, params: unknown[]) => {
                        logger.debug?.(
                            `${pc.gray('query:')} ${query} ${pc.gray('param:')} ${JSON.stringify(params)}`,
                            'Drizzle',
                        );
                    },
                },
            }) as NodePgDatabase<typeof entity>;
        },
    },
];
