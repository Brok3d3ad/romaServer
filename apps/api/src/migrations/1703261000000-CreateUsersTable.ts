import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1703261000000 implements MigrationInterface {
  name = 'CreateUsersTable1703261000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "firstName" character varying,
        "lastName" character varying,
        "isActive" boolean NOT NULL DEFAULT true,
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
} 