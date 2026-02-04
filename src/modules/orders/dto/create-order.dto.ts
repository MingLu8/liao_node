import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { IsNotZero } from 'src/common/validators/is-not-zero.validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The business reference for the order',
    example: 'ORD-2026-001',
  })
  @IsString()
  @IsNotEmpty()
  reference: string;

  @ApiProperty({
    description: 'The total amount of the order',
    example: 150.50,
  })
  @IsNotZero()
  amount: number;
}