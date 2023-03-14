import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewFileToTest implements MigrationInterface {
    name = 'CreateNewFileToTest'

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
