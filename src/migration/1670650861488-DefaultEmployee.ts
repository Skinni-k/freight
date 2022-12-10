import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultEmployee1670650861488 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO employee VALUES (1, 'Andy', 'Chow', 'Manager', 1)"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM employee WHERE id=1");
  }
}
