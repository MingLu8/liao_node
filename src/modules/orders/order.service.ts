import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(dto: any): Promise<Order> {
    const newOrder = this.orderRepository.create(dto as object);
    return await this.orderRepository.createAndSave(newOrder);
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    
    return order;
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }
}