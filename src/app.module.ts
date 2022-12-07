import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { RentalModule } from './rental/rental.module';
import { RatesModule } from './rates/rates.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '/.env',
      isGlobal: true,
    }),
    DbModule,
    RentalModule,
    RatesModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
