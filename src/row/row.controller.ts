import { Controller, Get, Inject, NotFoundException, Param } from '@nestjs/common';
import { Row } from './entity/row.entity';
import { RowService } from './row.service';
import { LogHttp } from 'src/log/log-http.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('row')
export class RowController {

    constructor(@Inject() private service: RowService) {
    }

    @ApiOperation({ summary: 'get all rows saved in database' })
    @ApiResponse({
        status: 200,
        description: 'successfull',
    })
    @ApiResponse({
        status: 500,
        description: 'faced some issues while getting all the rows',
    })
    @LogHttp()
    @Get()
    async getAllRows(): Promise<Row[]> {
        return await this.service.findAll(); 
    }

    @ApiOperation({ summary: 'get a row saved in database by id' })
    @ApiResponse({
        status: 200,
        description: 'successfull',
    })
    @ApiResponse({
        status: 500,
        description: 'faced some issues while getting the row',
    })
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
