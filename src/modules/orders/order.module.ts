import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';
import { TransactionStorageService } from '../../common/persistence/transaction-storage.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    OrderRepository,
    OrderService, 
    TransactionStorageService // Add this line here
  ],
})
export class OrderModule {}