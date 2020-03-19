import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 7080,
  username: 'db_user',
  password: 'pass',
  database: 'taskmanagement',
  // entities: [__dirname + '../**/*.entity.ts'], // not supported by wepack below alternative
  autoLoadEntities: true,
  synchronize: true,
}
