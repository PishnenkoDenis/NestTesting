import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { RentalModule } from './rental/rental.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '/.env',
      isGlobal: true,
    }),
    DbModule,
    RentalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
