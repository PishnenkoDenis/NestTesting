import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { DB_CONNECTION } from 'src/constants';
import { MS_AT_DAYS } from 'src/constants/global';
import { RatesService } from 'src/rates/rates.service';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class RentalService {
  constructor(
    @Inject(DB_CONNECTION) private dbConnection: any,
    private ratesService: RatesService,
    @Inject(forwardRef(() => ReportService))
    private reportService: ReportService,
  ) {}

  async checkAvailableCar({
    id,
    startDate,
    endDate,
  }: {
    id: number;
    startDate: Date;
    endDate: Date;
  }): Promise<boolean> {
    const car = await this.dbConnection.query(
      `SELECT rental_end
       FROM booking
       WHERE car_id = $1
        AND (
          $2 BETWEEN rental_start - interval '3 day' AND rental_end + interval '3 day'
          OR $3 BETWEEN rental_start - interval '3 day' AND rental_end + interval '3 day'
          )`,
      [id, startDate, endDate],
    );

    return !car.rows?.length;
  }

  async createRental({
    userId,
    carId,
    rentalStart,
    rentalEnd,
  }: {
    userId: number;
    carId: number;
    rentalStart: Date;
    rentalEnd: Date;
  }) {
    const startIsNotWeekend = this.checkWeekdays(rentalStart);
    const endIsNotWeekend = this.checkWeekdays(rentalEnd);

    if (!startIsNotWeekend || !endIsNotWeekend) {
      throw new BadRequestException('Rental is possible only on weekdays');
    }

    const isAvailable = await this.checkAvailableCar({
      id: carId,
      startDate: rentalStart,
      endDate: rentalEnd,
    });

    if (!isAvailable) {
      throw new BadRequestException('Car is not available');
    }

    const price = await this.calculateRental(rentalStart, rentalEnd);

    await this.dbConnection.query(
      `INSERT INTO booking (user_id, car_id, rental_start, rental_end, price) VALUES($1, $2, $3, $4, $5)`,
      [userId, carId, rentalStart, rentalEnd, price],
    );
  }

  async calculateRental(start: Date, end: Date) {
    const discounts = await this.ratesService.getRates();

    const days = this.getPeriod(start, end);
    let sum = 0;

    for (let dayNumber = 1; dayNumber <= days; dayNumber += 1) {
      const discount = discounts.find(
        (item) => item.startDate <= dayNumber && dayNumber <= item.endDate,
      );

      if (discount) {
        const percent = discount?.percent || 0;
        const percentPrice = (discount.price * percent) / 100;
        const resultPrice = discount.price - percentPrice;
        sum = sum + resultPrice;
      } else {
        sum += 1000;
      }
    }

    return sum;
  }

  checkWeekdays(date: Date) {
    const day = date.getDay();

    return day !== 0 && day !== 6;
  }

  getPeriod(start: Date, end: Date) {
    const differentMS = end.valueOf() - start.valueOf();
    const differntDays = Math.ceil(
      parseFloat((differentMS / MS_AT_DAYS).toFixed(3)),
    );

    return differntDays;
  }

  async createReportForCar(carId: number) {
    const percent = await this.reportService.getRentalPercentForCar(carId);

    return {
      carId,
      percent: `${percent}%`,
    };
  }

  async createSummaryReportForCars() {
    return await this.reportService.getRentalSummary();
  }
}
