import { Module } from '@nestjs/common';
import { RentalModule } from 'src/rental/rental.module';
import { AutoController } from './auto.controller';
import { AutoService } from './auto.service';

@Module({
  imports: [RentalModule],
  controllers: [AutoController],
  providers: [AutoService],
})
export class AutoModule {}
