import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LogHttp } from 'src/log/log-http.decorator';
import { Row } from 'src/row/entity/row.entity';
import { WebhookService } from './webhook.service';
import { WebsocketGateway } from './websocket.gateway';

@Controller('webhook')
export class WebhookController {

    constructor(
        @Inject()
        private service: WebhookService,
        private websocketGateway: WebsocketGateway
    ) {}

    @LogHttp()
    @Post()
    async change(@Body() body: Row): Promise<void> {
        await this.service.triggerChange(body);
        this.websocketGateway.sendMessageToClients('Hello from Webhook Controller!');
    }
}

