import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(dto: any): Promise<Order> {
    // 1. Create a new instance of the Order entity
    const newOrder = this.orderRepository.create(dto as object);

    // 2. Persist to PostgreSQL (UUID is generated here if DB-side)
    return await this.orderRepository.createAndSave(newOrder);
  }

  // Retrieve a single order by its UUID
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