import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { RowModule } from 'src/row/row.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { WebhookService } from './webhook.service';
import { GoogleApiModule } from 'src/google-api/google-api.module';
import { WebsocketGateway } from './websocket.gateway';

@Module({
    imports: [RowModule, MailerModule, GoogleApiModule],
    controllers: [WebhookController],
    providers: [WebhookService, WebsocketGateway]
})
export class WebhookModule {}
