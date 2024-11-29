import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeTables31732540958287 implements MigrationInterface {
    name = 'AddSomeTables31732540958287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted"`);
    }

}
