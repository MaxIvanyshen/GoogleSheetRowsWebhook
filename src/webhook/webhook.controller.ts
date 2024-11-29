import { BadRequestException, Body, Controller, HttpStatus, InternalServerErrorException, Post } from '@nestjs/common';
import { LogHttp } from 'src/log/log-http.decorator';
import { Row } from 'src/row/entity/row.entity';
import { RowService } from 'src/row/row.service';

@Controller('webhook')
export class WebhookController {

    constructor( private readonly rowService: RowService ) {}

    @LogHttp()
    @Post()
    async change(@Body() body: Row): Promise<void> {
        if(!body) {
            throw new BadRequestException("Request body is empty");
        }
        await this.rowService.save(body);
    }
}

