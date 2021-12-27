import {MigrationInterface, QueryRunner} from "typeorm";

export class createNewTables1640635619929 implements MigrationInterface {
    name = 'createNewTables1640635619929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wishlist_item" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "image" character varying NOT NULL, "brand" character varying NOT NULL, "product_id" character varying NOT NULL, "title" character varying NOT NULL, "wishlist_id" integer NOT NULL, CONSTRAINT "PK_dc473007d691690801365193b72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wishlist" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "image" character varying NOT NULL, "brand" character varying NOT NULL, "product_id" character varying NOT NULL, "title" character varying NOT NULL, "customer_id" integer NOT NULL, CONSTRAINT "REL_bf352c755492e9c5b14f36dbaa" UNIQUE ("customer_id"), CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "wishlist_id" integer, CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" ADD CONSTRAINT "FK_ac00077fd9942e77c6ad2b5bf71" FOREIGN KEY ("wishlist_id") REFERENCES "wishlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_bf352c755492e9c5b14f36dbaa3" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_ed96aa1b01b069d615fab00fb18" FOREIGN KEY ("wishlist_id") REFERENCES "wishlist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_ed96aa1b01b069d615fab00fb18"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_bf352c755492e9c5b14f36dbaa3"`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" DROP CONSTRAINT "FK_ac00077fd9942e77c6ad2b5bf71"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "wishlist"`);
        await queryRunner.query(`DROP TABLE "wishlist_item"`);
    }

}
