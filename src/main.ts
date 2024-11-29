import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingHttpInterceptor } from './log/logging-http.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new LoggingHttpInterceptor(new Reflector()));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
