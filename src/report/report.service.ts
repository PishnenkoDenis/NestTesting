import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DB_CONNECTION } from 'src/constants';
import { RentalService } from 'src/rental/rental.service';

@Injectable()
export class ReportService {
  constructor(
    @Inject(DB_CONNECTION) private dbConnection: any,
    @Inject(forwardRef(() => RentalService))
    private rentalService: RentalService,
  ) {}

  daysInMonth() {
    const date = new Date();
    return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
  }

  daysQuantity = this.daysInMonth();

  calculatePercentage(list: Array<object>) {
    const sum = list.reduce(
      (total: number, current: { start: any; end: any }) => {
        const { start, end } = current;
        const currentMonth = new Date().getMonth();

        if (
          start.getMonth() === end.getMonth() &&
          start.getMonth() === currentMonth
        ) {
          const period = this.rentalService.getPeriod(start, end);
          return total + period;
        }

        if (
          start.getMonth() !== end.getMonth() &&
          start.getMonth() === currentMonth
        ) {
          const currentPeriod = this.daysQuantity - start.getDate();

          return total + currentPeriod;
        }
        return total;
      },
      0,
    );

    const percent = ((sum / this.daysQuantity) * 100).toFixed(2);

    return percent;
  }

  async getRentalPercentForCar(carId: number) {
    const { rows } = await this.dbConnection.query(
      'SELECT rental_start AS "start", rental_end AS "end" FROM booking WHERE car_id = $1',
      [carId],
    );

    return this.calculatePercentage(rows);
  }

  async getRentalSummary() {
    const { rows } = await this.dbConnection.query(
      'SELECT car_id AS "carId", rental_start AS "start", rental_end AS "end" FROM booking',
    );

    const summary = rows.reduce((obj, { carId, start, end }) => {
      const key = carId;

      if (!obj.hasOwnProperty(key)) obj[key] = [];

      obj[key].push({ start, end });

      return obj;
    }, {});

    const rentalSummary = [];

    for (const key in summary) {
      const percent = this.calculatePercentage(summary[key]);

      rentalSummary.push({ carId: Number(key), percent: `${percent}%` });
    }

    return rentalSummary;
  }
}
