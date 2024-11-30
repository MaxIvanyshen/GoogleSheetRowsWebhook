import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LogHttp } from 'src/log/log-http.decorator';
import { Row } from 'src/row/entity/row.entity';
import { WebhookService } from './webhook.service';
import { WebsocketGateway } from './websocket.gateway';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('webhook')
export class WebhookController {

    constructor(
        @Inject()
        private service: WebhookService,
        private websocketGateway: WebsocketGateway
    ) {}

    @ApiOperation({ summary: 'save data about a row' })
    @ApiResponse({
        status: 201,
        description: 'the data about the row has been successfully saved',
    })
    @ApiResponse({
        status: 400,
        description: 'request body is empty or the data is invalid',
    })
    @LogHttp()
    @Post()
    async change(@Body() body: Row): Promise<void> {
        await this.service.triggerChange(body);
        this.websocketGateway.sendMessageToClients('Hello from Webhook Controller!');
    }
}

