import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeTables161733089864328 implements MigrationInterface {
    name = 'AddSomeTables161733089864328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deviceId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deviceId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'admin'`);
    }

}
