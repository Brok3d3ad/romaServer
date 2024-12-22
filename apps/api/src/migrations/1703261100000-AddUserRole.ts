import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRole1703261100000 implements MigrationInterface {
  name = 'AddUserRole1703261100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN "role" character varying NOT NULL DEFAULT 'user'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN "role"
    `);
  }
} 