import { Controller, Get, Post, Body, Param, ParseUUIDPipe, UseInterceptors } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  @UseInterceptors(LoggingInterceptor)
  async create(@Body() dto: CreateOrderDto) { return this.orderService.create(dto); }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.orderService.findOne(id);
  }
}
