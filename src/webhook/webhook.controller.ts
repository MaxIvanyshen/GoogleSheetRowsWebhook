import { BadRequestException, Body, Controller, Inject, Post } from '@nestjs/common';
import { LogHttp } from 'src/log/log-http.decorator';
import { Row } from 'src/row/entity/row.entity';
import { RowService } from 'src/row/row.service';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {

    constructor(
        @Inject()
        private service: WebhookService
    ) {}

    @LogHttp()
    @Post()
    async change(@Body() body: Row): Promise<void> {
        await this.service.triggerChange(body);
    }
}

