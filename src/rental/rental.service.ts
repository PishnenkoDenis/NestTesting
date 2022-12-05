import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class RentalService {
  checkRentalDate(periodEnd: string) {
    const now = moment();
    const end = moment(periodEnd);
    const diff = now.diff(end, 'days');

    return diff > 3;
  }

  checkWeekdays(dateStr: string) {
    const day = moment(dateStr).day();

    if (day === 0 || day === 6) return false;
    else return true;
  }
}
