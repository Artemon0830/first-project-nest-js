import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeTables81732724652934 implements MigrationInterface {
    name = 'AddSomeTables81732724652934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "cars" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cars"`);
    }

}
