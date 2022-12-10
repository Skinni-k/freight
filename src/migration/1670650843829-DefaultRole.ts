import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultRole1670650843829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO role VALUES (1, 'mechanic', 'mechanic', 1)"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM role WHERE id=1");
  }
}
