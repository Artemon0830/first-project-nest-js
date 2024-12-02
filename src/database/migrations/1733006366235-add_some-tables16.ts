import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeTables161733006366235 implements MigrationInterface {
    name = 'AddSomeTables161733006366235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "image" TO "photoCar"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "photoCar" TO "image"`);
    }

}
