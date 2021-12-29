import {MigrationInterface, QueryRunner} from "typeorm";

export class FixPriceCollum1640803852657 implements MigrationInterface {
    name = 'FixPriceCollum1640803852657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist_item" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" ADD "price" real NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist_item" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "wishlist_item" ADD "price" integer NOT NULL`);
    }

}
