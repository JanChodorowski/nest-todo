import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 7080,
  username: 'db_user',
  password: 'pass',
  database: 'taskmanagement',
  synchronize: true,
  entities: ["dist/**/*.entity{.ts,.js}"],
}
