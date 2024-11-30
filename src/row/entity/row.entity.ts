import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'rows',
  timestamps: true,
  createdAt: 'created_at', 
  updatedAt: 'updated_at',
})
export class Row extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number
    
    @ApiProperty({ example: 1, description: "number of row in a google sheet"})
    @Unique
    @Column({
        type: DataType.INTEGER,
    })
    index: number

    @ApiProperty({ example: ["hello", "world", "1"], description: "columns of the current row"})
    @Column({
        type: DataType.ARRAY(DataType.STRING),
    })
    cols: string[]
}
