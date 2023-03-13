import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { CandidacyModel } from "../../../models/candidacy.model";
import { UsuarioModel } from "../../../models/usuario.model";
import { VagaModel } from "../../../models/vaga.model";
import { CandidacyEntity } from "../../../shared/entities/candidacy.entity";

export class CandidacyRepository {
    private repository =
        DatabaseConnection.connection.getRepository(CandidacyEntity);

    public async create(candidacy: CandidacyModel) {
        const CandidacyEntity = this.repository.create({
            idCandidate: candidacy.candidate.id,
            idVaga: candidacy.vaga.id,
            indSucesso: candidacy.indSucesso,
            dtCandidacy: candidacy.dtCandidacy,
        });

        await this.repository.save(CandidacyEntity);

        const result = await this.repository.findOneBy({
            idCandidate: candidacy.candidate.id,
            idVaga: candidacy.vaga.id,
        });

        return this.mapEntityToModel(result!);
    }

    public async get(idCandidate: string, idVaga: string) {
        const result = await this.repository.findOneBy({
            idCandidate,
            idVaga,
        });

        if (!result) {
            return null;
        }

        return this.mapEntityToModel(result);
    }

    private mapEntityToModel(entity: CandidacyEntity) {
        const candidate = UsuarioModel.create(
            entity.candidate.id,
            entity.candidate.nome,
            entity.candidate.username,
            entity.candidate.tipo,
            entity.candidate.senha,
            entity.candidate.empresa
        );

        const recrutadorVaga = UsuarioModel.create(
            entity.vaga.recrutador.id,
            entity.vaga.recrutador.nome,
            entity.vaga.recrutador.username,
            entity.vaga.recrutador.tipo,
            entity.vaga.recrutador.senha,
            entity.vaga.recrutador.empresa
        );

        const vaga = VagaModel.create(
            entity.vaga.id,
            entity.vaga.descricao,
            entity.vaga.recrutador.empresa,
            entity.vaga.dtLimite,
            entity.vaga.indAtivo,
            recrutadorVaga,
            entity.vaga.maxCandidates
        );

        return new CandidacyModel(
            candidate,
            vaga,
            entity.indSucesso,
            entity.dtCandidacy
        );
    }
}