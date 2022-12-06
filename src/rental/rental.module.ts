import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { RatesModule } from 'src/rates/rates.module';

@Module({
  imports: [DbModule, RatesModule],
  providers: [RentalService],
  exports: [RentalService],
  controllers: [RentalController],
})
export class RentalModule {}
