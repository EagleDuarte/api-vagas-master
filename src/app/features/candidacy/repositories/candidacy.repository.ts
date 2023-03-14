import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { CandidacyModel } from "../../../models/candidacy.model";
import { UserModel } from "../../../models/user.model";
import { JobModel } from "../../../models/job.model";
import { CandidacyEntity } from "../../../shared/entities/candidacy.entity";

export class CandidacyRepository {
    private repository =
        DatabaseConnection.connection.getRepository(CandidacyEntity);

    public async create(candidacy: CandidacyModel) {
        const CandidacyEntity = this.repository.create({
            idCandidate: candidacy.candidate.id,
            idJob: candidacy.job.id,
            indSucesso: candidacy.indSucesso,
            dtCandidacy: candidacy.dtCandidacy,
        });

        await this.repository.save(CandidacyEntity);

        const result = await this.repository.findOneBy({
            idCandidate: candidacy.candidate.id,
            idJob: candidacy.job.id,
        });

        return this.mapEntityToModel(result!);
    }

    public async get(idCandidate: string, idJob: string) {
        const result = await this.repository.findOneBy({
            idCandidate,
            idJob,
        });

        if (!result) {
            return null;
        }

        return this.mapEntityToModel(result);
    }

    private mapEntityToModel(entity: CandidacyEntity) {
        const candidate = UserModel.create(
            entity.candidate.id,
            entity.candidate.nome,
            entity.candidate.username,
            entity.candidate.tipo,
            entity.candidate.senha,
            entity.candidate.company
        );

        const recruiterjob = UserModel.create(
            entity.job.recruiter.id,
            entity.job.recruiter.nome,
            entity.job.recruiter.username,
            entity.job.recruiter.tipo,
            entity.job.recruiter.senha,
            entity.job.recruiter.company
        );

        const job = JobModel.create(
            entity.job.id,
            entity.job.description,
            entity.job.recruiter.company,
            entity.job.dtLimite,
            entity.job.indAtivo,
            recruiterjob,
            entity.job.maxCandidates
        );

        return new CandidacyModel(
            candidate,
            job,
            entity.indSucesso,
            entity.dtCandidacy
        );
    }
}