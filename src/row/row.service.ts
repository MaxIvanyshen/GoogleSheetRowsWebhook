import { Injectable } from '@nestjs/common';
import { RowRepository } from './row.repository';
import { Row } from './entity/row.entity';

@Injectable()
export class RowService {
    
    constructor( private repo: RowRepository ) {}

    async findAll(): Promise<Row[]> {
       return this.repo.findAll(); 
    }

    async findById(id: number): Promise<Row | null> {
        return this.repo.findById(id);
    }

    async save(row: Row): Promise<void> {
        await this.repo.save(row);
    }
}
