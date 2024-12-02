import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeTables161733065132424 implements MigrationInterface {
    name = 'AddSomeTables161733065132424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user', 'manager')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'admin'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'admin'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum_old" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`);
    }

}
