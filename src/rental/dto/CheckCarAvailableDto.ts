import { ApiProperty } from '@nestjs/swagger';

export class CheckCarAvailableDto {
  @ApiProperty({
    example: new Date(),
    description: 'Car ID',
  })
  readonly startDate: string;

  @ApiProperty({
    example: new Date(new Date().setDate(new Date().getDate() + 15)),
    description: 'Rental start date',
  })
  readonly endDate: string;
}
