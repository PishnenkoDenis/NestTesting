import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRentalDto } from './dto/CreateRentalDto';
import { RentalService } from './rental.service';

@Controller('rental')
export class RentalController {
  constructor(private rentalService: RentalService) {}

  @ApiOperation({ summary: 'Receiving a car by id' })
  @ApiResponse({ status: 200 })
  @Get('/:id')
  async getCar(@Param('id') id: number) {
    const rentalCheck = await this.rentalService.checkAvailableCar(id);

    return { isCarAvailable: rentalCheck };
  }

  @ApiOperation({ summary: 'Rental request' })
  @ApiResponse({ status: 200 })
  @Post()
  makeRent(@Body() dto: CreateRentalDto) {
    return this.rentalService.createRent(dto);
  }
}
