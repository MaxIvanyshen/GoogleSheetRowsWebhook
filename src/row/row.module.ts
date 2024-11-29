import { Module } from '@nestjs/common';
import { RowService } from './row.service';
import { RowController } from './row.controller';
import { RowRepository } from './row.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Row } from './entity/row.entity';

@Module({
  imports: [SequelizeModule.forFeature([Row])],
  controllers: [RowController],
  providers: [RowService, RowRepository],
  exports: [RowService],
})
export class RowModule {}
