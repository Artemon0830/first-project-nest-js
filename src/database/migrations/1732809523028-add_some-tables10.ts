import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeTables101732809523028 implements MigrationInterface {
    name = 'AddSomeTables101732809523028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "make" TO "brand"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "brand" TO "make"`);
    }

}
