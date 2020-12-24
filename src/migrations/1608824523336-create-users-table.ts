import {MigrationInterface, QueryRunner} from "typeorm";

export class createUsersTable1608824523336 implements MigrationInterface {
    name = 'createUsersTable1608824523336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_450a05c0c4de5b75ac8d34835b" ON "users" ("password") `);
        await queryRunner.query(`CREATE TABLE "subs" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "title" character varying, "description" text, "imageUrn" character varying, "bannerUrn" character varying, "username" character varying, CONSTRAINT "PK_c2311ff9e741af88151e0aa2299" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "identifier" character varying NOT NULL, "title" character varying, "slug" character varying NOT NULL, "body" text, "subName" character varying NOT NULL, "username" character varying, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subs" ADD CONSTRAINT "FK_4520ae7b26f68a13ec3e96dbbba" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_57e75616264342b9a2637cfbfb9" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_80b7dc4bd7a74e1c851f52445ec" FOREIGN KEY ("subName") REFERENCES "subs"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_80b7dc4bd7a74e1c851f52445ec"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_57e75616264342b9a2637cfbfb9"`);
        await queryRunner.query(`ALTER TABLE "subs" DROP CONSTRAINT "FK_4520ae7b26f68a13ec3e96dbbba"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "subs"`);
        await queryRunner.query(`DROP INDEX "IDX_450a05c0c4de5b75ac8d34835b"`);
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
