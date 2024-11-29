import { Controller, Get, Inject, NotFoundException, Param } from '@nestjs/common';
import { Row } from './entity/row.entity';
import { RowService } from './row.service';
import { LogHttp } from 'src/log/log-http.decorator';

@Controller('row')
export class RowController {

    constructor(@Inject() private service: RowService) {
    }

    @LogHttp()
    @Get()
    async getAllRows(): Promise<Row[]> {
        return await this.service.findAll(); 
    }

    @LogHttp()
    @Get('/:id')
    async getRowById(@Param('id') id: number): Promise<Row> {
        const found = await this.service.findById(id); 
        if(!found) {
            throw new NotFoundException("could not find row with this id");
        }
        return found;
    }
}
