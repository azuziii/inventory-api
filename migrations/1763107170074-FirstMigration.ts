import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1763107170074 implements MigrationInterface {
    name = 'FirstMigration1763107170074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Customer" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "address" text NOT NULL, "city" text NOT NULL, "country" text NOT NULL, "ice" text NOT NULL, "contact_name" text NOT NULL DEFAULT '', "contact_phone" text NOT NULL DEFAULT '', "contact_email" text NOT NULL DEFAULT '', CONSTRAINT "PK_60596e16740e1fa20dbf0154ec7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ_customer_ice" ON "Customer" ("ice") `);
        await queryRunner.query(`CREATE TABLE "product" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "code" text NOT NULL, "price" double precision NOT NULL DEFAULT '0', "isSample" boolean NOT NULL DEFAULT false, "customer_id" uuid NOT NULL, CONSTRAINT "UQ_product_customer_name" UNIQUE ("customer_id", "name"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_name" text NOT NULL, "product_price" double precision NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "total_shipped" integer NOT NULL DEFAULT '0', "product_id" uuid NOT NULL, "order_id" uuid NOT NULL, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_number" text NOT NULL, "order_date" TIMESTAMP NOT NULL, "order_year" text NOT NULL, "customer_id" uuid NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ_ORDER_NUMBER_YEAR" ON "order" ("order_year", "order_number") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_product_customer" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_PRODUCT_ORDER_ITEM" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_ORDER" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_CUSTOMER" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_CUSTOMER"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_ORDER"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_PRODUCT_ORDER_ITEM"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_product_customer"`);
        await queryRunner.query(`DROP INDEX "public"."UQ_ORDER_NUMBER_YEAR"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP INDEX "public"."UQ_customer_ice"`);
        await queryRunner.query(`DROP TABLE "Customer"`);
    }

}
