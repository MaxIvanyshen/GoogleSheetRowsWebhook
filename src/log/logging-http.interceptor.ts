import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class LoggingHttpInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingHttpInterceptor.name);

  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();
    const logHttp = this.reflector.get<boolean>('logHttp', handler);

    if (logHttp) {
      const request = context.switchToHttp().getRequest();
      this.logger.log(`HTTP Request: ${request.method} ${request.url}`);
      this.logger.log(`Request body: ${JSON.stringify(request.body)}`);

      return next.handle().pipe(
        tap((response) => {
            this.logger.log(`HTTP Response: ${JSON.stringify(response)}`);
        }),
      );
    }

    return next.handle();
  }
}

