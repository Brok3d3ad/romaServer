import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from '../app/users/entities/user.entity';
import { CreateUsersTable1703261000000 } from '../migrations/1703261000000-CreateUsersTable';

export default registerAs('database', (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'nest_db',
  entities: [User],
  migrations: [CreateUsersTable1703261000000],
  migrationsRun: false,
  synchronize: true,
  logging: true,
})); 