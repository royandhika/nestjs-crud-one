import * as winston from 'winston';
import chalk from 'chalk';

const customPrintf = winston.format.printf(({ level, message, timestamp, context }) => {
    return `${chalk.gray(`[${timestamp}]`)} [${level}]: ${chalk.gray(`[${context}]`)} ${message}`;
});

export const winstonOptions: winston.LoggerOptions = {
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.colorize(),
        customPrintf,
    ),
    level: 'debug',
    transports: [new winston.transports.Console()],
};
