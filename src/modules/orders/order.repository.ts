import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }
    
  async createAndSave(orderData: Partial<Order>): Promise<Order> {
    // 1. Create the instance (maps plain object to Order class)
    const order = this.create(orderData);

    // 2. Perform any custom logic (e.g., setting a default status)
    // if (!order.status) {
    //   order.status = 'PENDING';
    // }

    // 3. Save to PostgreSQL
    return await this.save(order);
  }
  // Add your custom logic here
  async findByReference(reference: string): Promise<Order | null> {
    return this.findOne({ where: { reference } });
  }
}