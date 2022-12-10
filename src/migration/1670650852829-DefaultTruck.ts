import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultTruck1670650852829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("INSERT INTO truck VALUES (1, 1, 1, 2022, 1, 1)");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM truck WHERE id=1");
  }
}
