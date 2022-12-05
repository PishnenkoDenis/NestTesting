import { ApiProperty } from '@nestjs/swagger';

export class CreateRentDto {
  @ApiProperty({ example: '1', description: 'Car ID' })
  readonly id: number;

  @ApiProperty({ example: '22', description: 'Rental period' })
  readonly period: number;

  @ApiProperty({ example: '22-10-2022', description: 'Rental start date' })
  readonly rental_start: string;
}
