import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddShipment1764768315867 implements MigrationInterface {
  name = 'AddShipment1764768315867';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."shipment_shipment_type_enum" AS ENUM('Outbound', 'Return')`,
    );
    await queryRunner.query(
      `CREATE TABLE "shipment" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "delivery_date" TIMESTAMP NOT NULL, "shipment_year" text NOT NULL, "shipment_number" text NOT NULL, "shipment_type" "public"."shipment_shipment_type_enum" NOT NULL DEFAULT 'Outbound', "customer_id" uuid NOT NULL, CONSTRAINT "PK_f51f635db95c534ca206bf7a0a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_SHIPMENT_NUMBER_YEAR" ON "shipment" ("shipment_year", "shipment_number") `,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment" ADD CONSTRAINT "FK_SHIPMENT_CUSTOMER" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shipment" DROP CONSTRAINT "FK_SHIPMENT_CUSTOMER"`,
    );
    await queryRunner.query(`DROP INDEX "public"."UQ_SHIPMENT_NUMBER_YEAR"`);
    await queryRunner.query(`DROP TABLE "shipment"`);
    await queryRunner.query(`DROP TYPE "public"."shipment_shipment_type_enum"`);
  }
}
