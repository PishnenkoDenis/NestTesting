import { Inject, Injectable } from '@nestjs/common';
import { DB_CONNECTION } from 'src/constants';

@Injectable()
export class RatesService {
  constructor(@Inject(DB_CONNECTION) private dbConnection: any) {}

  async getRates() {
    const { rows } = await this.dbConnection.query(
      'SELECT r.id AS "rateId",  name, price, percent, start_date AS "startDate", end_date AS "endDate" FROM rates r LEFT JOIN rate_discounts rd ON rd.rate_id = r.id',
    );

    return rows;
  }
}
