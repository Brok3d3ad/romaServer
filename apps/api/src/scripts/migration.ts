import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../app/users/entities/user.entity';
import { CreateUsersTable1703261000000 } from '../migrations/1703261000000-CreateUsersTable';

// Load environment variables
config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'nest_db',
  entities: [User],
  migrations: [CreateUsersTable1703261000000],
  migrationsTableName: 'migrations',
  migrationsRun: true,
});

async function runMigrations() {
  try {
    await AppDataSource.initialize();
    console.log('Running migrations...');
    
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      await AppDataSource.runMigrations();
      await queryRunner.commitTransaction();
      console.log('Migrations completed successfully');
    } catch (err) {
      console.error('Error during migration:', err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
    process.exit(0);
  }
}

runMigrations(); 