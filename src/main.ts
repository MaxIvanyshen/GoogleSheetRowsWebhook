import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingHttpInterceptor } from './log/logging-http.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
    .setTitle('Viso Test Task')
    .setDescription('The API description for a backend test task at Viso')
    .setVersion('1.0')
    .addTag('viso')
    .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    app.useWebSocketAdapter(new IoAdapter(app));
    app.enableCors();

    app.useGlobalInterceptors(new LoggingHttpInterceptor(new Reflector()));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
