import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeTables121732986534901 implements MigrationInterface {
    name = 'AddSomeTables121732986534901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "image" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
    }

}
