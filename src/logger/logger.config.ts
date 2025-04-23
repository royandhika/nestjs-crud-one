import * as winston from 'winston';
import * as pc from 'picocolors';

const customPrintf = winston.format.printf(({ level, message, timestamp, context }) => {
    return `${pc.gray(`${timestamp}`)} [${pc.bold(level)}] \n[${pc.bold(`${context}`)}] ${message}\n`;
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
