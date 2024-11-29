import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeTables51732560386888 implements MigrationInterface {
    name = 'AddSomeTables51732560386888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow_premium" RENAME COLUMN "created" TO "createdPremiumAt"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "status" TO "isPremium"`);
        await queryRunner.query(`ALTER TYPE "public"."users_status_enum" RENAME TO "users_ispremium_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isPremium"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isPremium" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isPremium"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isPremium" "public"."users_ispremium_enum" NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."users_ispremium_enum" RENAME TO "users_status_enum"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "isPremium" TO "status"`);
        await queryRunner.query(`ALTER TABLE "follow_premium" RENAME COLUMN "createdPremiumAt" TO "created"`);
    }

}
