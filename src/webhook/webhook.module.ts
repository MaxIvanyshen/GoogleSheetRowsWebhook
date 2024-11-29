import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { RowModule } from 'src/row/row.module';

@Module({
    imports: [RowModule],
    controllers: [WebhookController]
})
export class WebhookModule {}
