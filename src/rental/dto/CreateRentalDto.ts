import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto {
  @ApiProperty({ example: '1', description: 'User ID' })
  readonly user_id: number;

  @ApiProperty({ example: '1', description: 'Car ID' })
  readonly car_id: number;

  @ApiProperty({ example: '2022-10-22', description: 'Rental start date' })
  readonly rental_start: string;

  @ApiProperty({ example: '2022-10-08', description: 'Rental end date' })
  readonly rental_end: string;
}
