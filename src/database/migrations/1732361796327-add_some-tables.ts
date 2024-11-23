import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeTables1732361796327 implements MigrationInterface {
    name = 'AddSomeTables1732361796327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follow_base" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_a7dc56e7668c341cea4c9bf46fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follow_premium" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_de74afbcf53d083f0363429cec1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "article_id" uuid NOT NULL, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "list" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "model" text NOT NULL, "make" text NOT NULL, "year" integer NOT NULL, "price" integer NOT NULL, "mileage" integer NOT NULL, "image" text NOT NULL, "description" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "manager" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ban" boolean NOT NULL, CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('base', 'premium')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "age" integer NOT NULL, "role" "public"."user_role_enum" NOT NULL, "password" text NOT NULL, "address" text, "status" "public"."user_status_enum" NOT NULL, "manager_id" character varying NOT NULL, "manager" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "follow_base" ADD CONSTRAINT "FK_8e3938894e723472a2009ec480a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_premium" ADD CONSTRAINT "FK_7c05ccf3f5a57015a5611b0d66d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_b2ca4afd6cb49fa0f22f83bce59" FOREIGN KEY ("article_id") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "FK_a842f768ec87a346b0ee61fabba" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_be69547d3b5c71b5ffa7ec845d9" FOREIGN KEY ("manager") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_be69547d3b5c71b5ffa7ec845d9"`);
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "FK_a842f768ec87a346b0ee61fabba"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_b2ca4afd6cb49fa0f22f83bce59"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4"`);
        await queryRunner.query(`ALTER TABLE "follow_premium" DROP CONSTRAINT "FK_7c05ccf3f5a57015a5611b0d66d"`);
        await queryRunner.query(`ALTER TABLE "follow_base" DROP CONSTRAINT "FK_8e3938894e723472a2009ec480a"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "manager"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "follow_premium"`);
        await queryRunner.query(`DROP TABLE "follow_base"`);
    }

}
