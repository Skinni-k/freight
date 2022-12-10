import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultShipment1670650883234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO shipment VALUES (1, 1, 1, 'Kitchener', 'Waterloo', 1)"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM shipment WHERE id=1");
  }
}
