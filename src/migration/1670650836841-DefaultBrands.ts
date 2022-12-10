import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultBrands1670650836841 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("INSERT INTO brand VALUES (1, 'BMW')");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM brand WHERE id=1");
  }
}
