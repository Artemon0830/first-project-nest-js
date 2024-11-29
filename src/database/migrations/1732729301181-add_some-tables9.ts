import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeTables91732729301181 implements MigrationInterface {
    name = 'AddSomeTables91732729301181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_68efd848f1947316a5e93b0c772"`);
        await queryRunner.query(`CREATE TABLE "cars" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "producer" text NOT NULL, "model" text NOT NULL, "make" text NOT NULL, "year" integer NOT NULL, "price" integer NOT NULL, "mileage" integer NOT NULL, "image" text NOT NULL, "description" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cars"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_68efd848f1947316a5e93b0c772" FOREIGN KEY ("list_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_68efd848f1947316a5e93b0c772"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cars" text array`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_68efd848f1947316a5e93b0c772" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
