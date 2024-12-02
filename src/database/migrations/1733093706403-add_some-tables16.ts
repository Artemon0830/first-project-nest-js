import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeTables161733093706403 implements MigrationInterface {
    name = 'AddSomeTables161733093706403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "failedLogin" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isBanned" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isBanned"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "failedLogin"`);
    }

}
