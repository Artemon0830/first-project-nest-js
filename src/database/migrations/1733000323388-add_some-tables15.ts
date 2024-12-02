import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeTables151733000323388 implements MigrationInterface {
    name = 'AddSomeTables151733000323388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "updated"`);
        await queryRunner.query(`CREATE TYPE "public"."cars_currency_enum" AS ENUM('USD', 'EUR', 'UAH')`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "currency" "public"."cars_currency_enum" NOT NULL DEFAULT 'USD'`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "image" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "currency"`);
        await queryRunner.query(`DROP TYPE "public"."cars_currency_enum"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
