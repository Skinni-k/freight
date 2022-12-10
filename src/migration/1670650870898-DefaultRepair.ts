import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultRepair1670650870898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("INSERT INTO repair VALUES (1, 1, 1, 1)");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM repair WHERE id=1");
  }
}
