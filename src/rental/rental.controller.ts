import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckCarAvailableDto } from './dto/CheckCarAvailableDto';
import { CreateRentalDto } from './dto/CreateRentalDto';
import { RentalService } from './rental.service';

@ApiTags('Rental')
@Controller('rental')
export class RentalController {
  constructor(private rentalService: RentalService) {}

  @ApiOperation({ summary: 'Rental request' })
  @ApiResponse({ status: 200 })
  @Post()
  async makeRent(@Body() dto: CreateRentalDto) {
    const rentalStart = new Date(dto.rentalStart);
    const rentalEnd = new Date(dto.rentalEnd);

    if (rentalStart >= rentalEnd) {
      throw new BadRequestException('Invalid dates');
    }

    const differntDays = this.rentalService.getPeriod(rentalStart, rentalEnd);

    if (differntDays > 30) {
      throw new BadRequestException(
        'Limit exceeded. Rental period can not be longer than 30 days',
      );
    }

    await this.rentalService.createRental({
      ...dto,
      rentalEnd,
      rentalStart,
    });

    return { statusCode: HttpStatus.CREATED };
  }

  @ApiOperation({ summary: 'Calc price' })
  @ApiResponse({ status: 200 })
  @Get('price')
  async calcRent(
    @Query('rentalStart') rentalStartS: string,
    @Query('rentalEnd') rentalEndS: string,
  ) {
    const rentalStart = new Date(rentalStartS);
    const rentalEnd = new Date(rentalEndS);

    if (rentalStart >= rentalEnd) {
      throw new BadRequestException('Invalid dates');
    }

    const differntDays = this.rentalService.getPeriod(rentalStart, rentalEnd);

    if (differntDays > 30) {
      throw new BadRequestException(
        'Limit exceeded. Rental period can not be longer than 30 days',
      );
    }

    const price = await this.rentalService.calculateRental(
      rentalStart,
      rentalEnd,
    );

    return { statusCode: HttpStatus.CREATED, price };
  }

  @ApiOperation({ summary: 'Create report for certain car' })
  @ApiResponse({ status: 200 })
  @Get('report/:carId')
  async createReport(@Param('carId', ParseIntPipe) carId: number) {
    const report = await this.rentalService.createReportForCar(carId);

    return { statusCode: HttpStatus.OK, report };
  }

  @ApiOperation({ summary: 'Create summary report for cars' })
  @ApiResponse({ status: 200 })
  @Get('report')
  async createSummaryReport() {
    const report = await this.rentalService.createSummaryReportForCars();

    return { statusCode: HttpStatus.OK, report };
  }

  @ApiOperation({ summary: 'Check car available' })
  @ApiResponse({ status: 200 })
  @Get('/:id')
  async getCar(
    @Param('id', ParseIntPipe) id: number,
    @Query() dto: CheckCarAvailableDto,
  ) {
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    if (startDate >= endDate) {
      throw new BadRequestException('Invalid dates');
    }

    const differntDays = this.rentalService.getPeriod(startDate, endDate);

    if (differntDays > 30) {
      throw new BadRequestException(
        'Limit exceeded. Rental period can not be longer than 30 days',
      );
    }

    const rentalCheck = await this.rentalService.checkAvailableCar({
      id,
      startDate,
      endDate,
    });

    return { isCarAvailable: rentalCheck };
  }
}
