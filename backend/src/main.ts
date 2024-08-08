import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: 'http://18.207.190.176:6171',
        credentials: true, // Allow credentials (cookies)
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // Allowed methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    });
    app.use(cookieParser());

    // Swagger
    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Backend')
        .setDescription('The API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
    await app.listen(8000);
    console.log(`App is listening on http://localhost:8000/`);
    // Example of sending an email using AWS SES
}
bootstrap();
