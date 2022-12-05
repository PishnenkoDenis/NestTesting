import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AutoService } from './auto.service';
import { CreateRentDto } from './dto/CreateRentDto';

@ApiTags('autos')
@Controller('auto')
export class AutoController {
  constructor(private autoService: AutoService) {}

  @ApiOperation({ summary: 'Receiving available cars' })
  @Get()
  getCars() {
    return this.autoService.getAllAvailableCars();
  }

  @ApiOperation({ summary: 'Receiving a car by id' })
  @Get('/:id')
  getCar(@Param('id') id: number) {
    return this.autoService.getOneCar(id);
  }

  @Post()
  makeRent(@Body() dto: CreateRentDto) {
    return this.autoService.createRent(dto);
  }
}
