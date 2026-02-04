import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }
    
  async createAndSave(orderData: Partial<Order>): Promise<Order> {
    const order = this.create(orderData);
    return await this.save(order);
  }
  
  async findByReference(reference: string): Promise<Order | null> {
    return this.findOne({ where: { reference } });
  }
}