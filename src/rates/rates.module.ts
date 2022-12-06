import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { RatesService } from './rates.service';

@Module({
  imports: [DbModule],
  providers: [RatesService],
  exports: [RatesService],
})
export class RatesModule {}
