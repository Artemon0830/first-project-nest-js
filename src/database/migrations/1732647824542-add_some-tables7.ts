import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeTables71732647824542 implements MigrationInterface {
    name = 'AddSomeTables71732647824542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow_premium" DROP CONSTRAINT "FK_7c05ccf3f5a57015a5611b0d66d"`);
        await queryRunner.query(`ALTER TABLE "follow_premium" RENAME COLUMN "user_id" TO "following_id"`);
        await queryRunner.query(`ALTER TABLE "lists" ADD "producer" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "follow_premium" ADD CONSTRAINT "FK_64b64ffd76f2dc7c483d43ae9e1" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow_premium" DROP CONSTRAINT "FK_64b64ffd76f2dc7c483d43ae9e1"`);
        await queryRunner.query(`ALTER TABLE "lists" DROP COLUMN "producer"`);
        await queryRunner.query(`ALTER TABLE "follow_premium" RENAME COLUMN "following_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "follow_premium" ADD CONSTRAINT "FK_7c05ccf3f5a57015a5611b0d66d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
