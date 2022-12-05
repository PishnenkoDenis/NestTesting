import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DB_CONNECTION } from 'src/constants';
import { RentalService } from 'src/rental/rental.service';
import { CreateRentDto } from './dto/CreateRentDto';
import { IAuto } from './IAuto';

@Injectable()
export class AutoService {
  constructor(
    @Inject(DB_CONNECTION) private dbConnection: any,
    private rentalService: RentalService,
  ) {}

  async getAllAvailableCars(): Promise<IAuto[]> {
    const cars = await this.dbConnection.query(
      'SELECT * FROM autos WHERE availability = true',
    );
    return cars.row;
  }

  async getOneCar(id: number): Promise<IAuto> {
    const car = await this.dbConnection.query(
      `SELECT * FROM autos WHERE id = ${id}`,
    );
    return car.row;
  }

  async createRent(dto: CreateRentDto) {
    const car = await this.getOneCar(dto.id);

    const rentalDate = this.rentalService.checkRentalDate(car.period_end);

    if (!rentalDate) {
      throw new HttpException(
        'Less than three days have passed since the last day of the rental',
        HttpStatus.FORBIDDEN,
      );
    }

    const checkedDate = this.rentalService.checkWeekdays(dto.rental_start);

    if (!checkedDate) {
      throw new HttpException(
        'Rental is possible only on weekdays',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
