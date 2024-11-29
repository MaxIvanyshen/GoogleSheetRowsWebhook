import { InjectModel } from "@nestjs/sequelize";
import { Row } from "./entity/row.entity";
import { InternalServerErrorException } from "@nestjs/common";

export class RowRepository {

    constructor(
        @InjectModel(Row) private readonly rowModel: typeof Row,
    ) {}

    async findAll(): Promise<Row[]> {
        return this.rowModel.findAll();
    }

    async findById(id: number): Promise<Row | null> {
        return this.rowModel.findByPk(id);
    }

    async save(row: Row): Promise<void> {
        try {
            await this.rowModel.upsert(
                { 
                    index: row.index,
                    cols: row.cols,
                },
                {
                    returning: true
                }
            );
        } catch(e: any) {
            throw new InternalServerErrorException("could not save row with index: " + row.index);
        }
    }
}
