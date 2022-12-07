import { forwardRef, Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { RatesModule } from 'src/rates/rates.module';
import { ReportModule } from 'src/report/report.module';

@Module({
  imports: [DbModule, RatesModule, forwardRef(() => ReportModule)],
  providers: [RentalService],
  exports: [RentalService],
  controllers: [RentalController],
})
export class RentalModule {}
