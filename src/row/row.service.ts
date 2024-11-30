import { Injectable } from '@nestjs/common';
import { RowRepository } from './row.repository';
import { Row } from './entity/row.entity';

@Injectable()
export class RowService {

    private changes: Row[] = [];
    
    constructor( private repo: RowRepository ) {}

    async findAll(): Promise<Row[]> {
       return this.repo.findAll(); 
    }

    async findById(id: number): Promise<Row | null> {
        return this.repo.findById(id);
    }

    async save(row: Row): Promise<void> {
        this.changes.push(row);
        await this.repo.save(row);
    }

    async getChanges(): Promise<Row[]> {
        return this.changes;
    }

    async getNumberOfChanges(): Promise<number> {
        return this.changes.length;
    }

    async clearChanges(): Promise<void> {
        this.changes = [];
    }
}
