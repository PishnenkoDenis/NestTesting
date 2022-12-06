import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { RentalModule } from './rental/rental.module';
import { RatesModule } from './rates/rates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '/.env',
      isGlobal: true,
    }),
    DbModule,
    RentalModule,
    RatesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
