import { forwardRef, Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { RentalModule } from 'src/rental/rental.module';
import { ReportService } from './report.service';

@Module({
  imports: [DbModule, forwardRef(() => RentalModule)],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
