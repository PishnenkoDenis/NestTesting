import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  readonly userId: number;

  @ApiProperty({ example: 1, description: 'Car ID' })
  readonly carId: number;

  @ApiProperty({
    example: new Date(),
    description: 'Start rental period',
  })
  readonly rentalStart: string;

  @ApiProperty({
    example: new Date(new Date().setDate(new Date().getDate() + 15)),
    description: 'End rental period',
  })
  readonly rentalEnd: string;
}
