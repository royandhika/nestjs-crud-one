import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const winstonLogger = app.get(WINSTON_MODULE_NEST_PROVIDER);
    app.useLogger(winstonLogger);

    app.setGlobalPrefix('api');

    app.useGlobalPipes(new ValidationPipe());

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT');
    await app.listen(port ?? 3000);
}
bootstrap();
