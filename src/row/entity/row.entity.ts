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
    
    @Unique
    @Column({
        type: DataType.INTEGER,
    })
    index: number

    @Column({
        type: DataType.ARRAY(DataType.STRING),
    })
    cols: string[]
}
