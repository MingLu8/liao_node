import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionStorageService } from "./common/persistence/transaction-storage.service";
import { TransactionMiddleware } from "./common/middleware/transaction.middleware";
import { OrderModule } from "./modules/orders/order.module";
import { envValidationSchema } from './config/env.validation';
import { APP_FILTER } from '@nestjs/core';
import { ProblemDetailFilter } from './common/filters/problem-detail.filter';

@Module({
  imports: [
   ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema, // Approach 1: Validates on boot
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    OrderModule,
  ],
  providers: [
    TransactionStorageService,
    {
      provide: APP_FILTER,
      useClass: ProblemDetailFilter,
    },],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes({ path: "*", method: RequestMethod.POST });
  }
}
