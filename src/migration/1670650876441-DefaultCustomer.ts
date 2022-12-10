import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultCustomer1670650876441 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO customer VALUES (1, 'Kevin', 'Waterloo', 1234567890, 0987654321)"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM customer WHERE id=1");
  }
}
