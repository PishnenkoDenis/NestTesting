import { Module } from '@nestjs/common';
import { DB_CONNECTION } from '../constants';
import { Pool } from 'pg';

const dbProvider = {
  provide: DB_CONNECTION,
  useValue: new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.PORT),
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
