import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaCandidacy1669942236629 implements MigrationInterface {
    name = 'CriarTabelaCandidacy1669942236629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vagas"."candidacy" ("id_candidato" character varying NOT NULL, "id_vaga" character varying NOT NULL, "id_sucesso" boolean NOT NULL, "dtcandidacy" TIMESTAMP NOT NULL, CONSTRAINT "PK_0a32fc2fe99e9cfc824b3e43cca" PRIMARY KEY ("id_candidato", "id_vaga"))`);
        await queryRunner.query(`ALTER TABLE "vagas"."candidacy" ADD CONSTRAINT "FK_db83601857842a7e02b444ecfaa" FOREIGN KEY ("id_candidato") REFERENCES "vagas"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vagas"."candidacy" ADD CONSTRAINT "FK_4c44c1d870db92366bea2f0569f" FOREIGN KEY ("id_vaga") REFERENCES "vagas"."vaga"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vagas"."candidacy" DROP CONSTRAINT "FK_4c44c1d870db92366bea2f0569f"`);
        await queryRunner.query(`ALTER TABLE "vagas"."candidacy" DROP CONSTRAINT "FK_db83601857842a7e02b444ecfaa"`);
        await queryRunner.query(`DROP TABLE "vagas"."candidacy"`);
    }

}
