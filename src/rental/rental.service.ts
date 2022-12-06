import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DB_CONNECTION } from 'src/constants';
import { CreateRentalDto } from './dto/CreateRentalDto';

@Injectable()
export class RentalService {
  constructor(@Inject(DB_CONNECTION) private dbConnection: any) {}

  async checkAvailableCar(id: number): Promise<boolean> {
    const car = await this.dbConnection.query(
      `SELECT * FROM booking WHERE car_id = ${id}`,
    );
    return !car && true;
  }

  async createRent(dto: CreateRentalDto) {
    // const car = await this.dbConnection.query(
    //   `SELECT * FROM booking WHERE car_id = ${dto.car_id}`,
    // );

    this.checkRequest(dto.rental_start, dto.rental_end);
    return true;
  }

  checkRentalDate(periodEnd: string, customerDate: string) {
    const start = new Date(customerDate).getDate();
    const end = new Date(periodEnd).getDate();

    return start - end > 3;
  }

  checkWeekdays(dateStr: string) {
    const day = new Date(dateStr).getDay();

    if (day === 0 || day === 6) return false;
    else return true;
  }

  checkPeriod(start: string, end: string) {
    const dateStart = new Date(start).getDate();
    const dateEnd = new Date(end).getDate();

    const monthStart = new Date(start).getMonth();
    const monthEnd = new Date(end).getMonth();

    if (monthStart === monthEnd) return dateEnd - dateStart <= 30;
    else {
      const yearStart = new Date(start).getFullYear();
      const daysAmount = new Date(yearStart, monthStart + 1, 0).getDate();
      return daysAmount - dateStart + dateEnd <= 30;
    }
  }

  checkRequest(startDate: string, endDate: string) {
    // const rentalDate = this.checkRentalDate(periodEnd, startDate);

    // if (!rentalDate) {
    //   throw new HttpException(
    //     'Less than three days have passed since the last day of the rental',
    //     HttpStatus.FORBIDDEN,
    //   );
    // }

    const checkedDate = this.checkWeekdays(startDate);

    if (!checkedDate) {
      throw new HttpException(
        'Rental is possible only on weekdays',
        HttpStatus.FORBIDDEN,
      );
    }

    const receivedPeriod = this.checkPeriod(startDate, endDate);

    if (!receivedPeriod) {
      throw new HttpException(
        'Rental period can not be longer than 30 days',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
