import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingHttpInterceptor } from './log/logging-http.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: '*',  // Allow any origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: '*',
    });

    app.useGlobalInterceptors(new LoggingHttpInterceptor(new Reflector()));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
