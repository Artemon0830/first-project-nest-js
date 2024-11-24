import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeTables11732456794024 implements MigrationInterface {
    name = 'AddSomeTables11732456794024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follow_base" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_a7dc56e7668c341cea4c9bf46fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follow_premium" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_de74afbcf53d083f0363429cec1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "list_id" uuid NOT NULL, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lists" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "model" text NOT NULL, "make" text NOT NULL, "year" integer NOT NULL, "price" integer NOT NULL, "mileage" integer NOT NULL, "image" text NOT NULL, "description" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_268b525e9a6dd04d0685cb2aaaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "age" integer NOT NULL, "phone" text NOT NULL, "role" "public"."users_role_enum" NOT NULL, "password" text NOT NULL, "address" text array, "deviceId" text NOT NULL, "status" "public"."users_status_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "follow_base" ADD CONSTRAINT "FK_8e3938894e723472a2009ec480a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_premium" ADD CONSTRAINT "FK_7c05ccf3f5a57015a5611b0d66d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_68efd848f1947316a5e93b0c772" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_f01581ed98cd99b38495bcdd16b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_f01581ed98cd99b38495bcdd16b"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_68efd848f1947316a5e93b0c772"`);
        await queryRunner.query(`ALTER TABLE "follow_premium" DROP CONSTRAINT "FK_7c05ccf3f5a57015a5611b0d66d"`);
        await queryRunner.query(`ALTER TABLE "follow_base" DROP CONSTRAINT "FK_8e3938894e723472a2009ec480a"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "lists"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "follow_premium"`);
        await queryRunner.query(`DROP TABLE "follow_base"`);
    }

}
