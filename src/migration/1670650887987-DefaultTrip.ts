import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultTrip1670650887987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO trip VALUES (1, 'Kitchener', 'Waterloo', 1, 1, 1 )"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM trip WHERE id=1");
  }
}
