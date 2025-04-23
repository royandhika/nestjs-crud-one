// src/logger/logger.providers.ts
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';
import * as pc from 'picocolors';

const customPrintf = winston.format.printf(({ level, message, timestamp, context }) => {
    return `${pc.gray(`${timestamp}`)} [${pc.bold(level)}] \n[${pc.bold(`${context}`)}] ${message}\n`;
});

export const winstonProvider = WinstonModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.colorize(),
            customPrintf,
        ),
        level: configService.get<string>('LOG_LEVEL'),
        transports: [new winston.transports.Console()],
    }),
});
