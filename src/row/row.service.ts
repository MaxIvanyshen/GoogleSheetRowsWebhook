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

    getChanges(): Row[] {
        return this.changes;
    }

    getNumberOfChanges(): number {
        return this.changes.length;
    }

    clearChanges(): void {
        this.changes = [];
    }
}
