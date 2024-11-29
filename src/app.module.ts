import { Module } from '@nestjs/common';
import { RowModule } from './row/row.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Row } from './row/entity/row.entity';
import { ConfigModule } from '@nestjs/config';
import { WebhookModule } from './webhook/webhook.module';
import { MailerModule } from './mailer/mailer.module';
import { GoogleApiModule } from './google-api/google-api.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.local', '.env.prod'],
            isGlobal: true,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT!,
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            models: [Row],
            autoLoadModels: true,
            synchronize: true,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        }),
        RowModule,
        WebhookModule,
        MailerModule,
        GoogleApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
