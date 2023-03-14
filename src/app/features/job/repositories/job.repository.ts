import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { UserModel } from "../../../models/user.model";
import { JobModel } from "../../../models/job.model";
import { JobEntity } from "../../../shared/entities/job.entity";

export class JobRepository {
    private repository =
        DatabaseConnection.connection.getRepository(JobEntity);

    public async create(job: JobModel) {
        const jobEntity = this.repository.create({
            id: job.id,
            description: job.description,
            dtLimite: job.dtLimite,
            indAtivo: job.indAtivo,
            idRecruiter: job.recruiter.id,
            maxCandidates: job.maxCandidates,
        });

        await this.repository.save(jobEntity);

        const createdJob = await this.repository.findOneBy({
            id: job.id,
        });

        return this.mapEntityToModel(createdJob!);
    }

    public async find(id: string) {
        const result = await this.repository.findOne({
            relations: {
                candidaturas: true,
            },
            where: {
                id,
            },
        });

        if (!result) {
            return null;
        }

        return this.mapEntityToModel(result);
    }

    private mapEntityToModel(jobEntity: JobEntity) {
        const recruiter = UserModel.create(
            jobEntity.recruiter.id,
            jobEntity.recruiter.nome,
            jobEntity.recruiter.username,
            jobEntity.recruiter.tipo,
            jobEntity.recruiter.senha,
            jobEntity.recruiter.company
        );

        const job = JobModel.create(
            jobEntity.id,
            jobEntity.description,
            jobEntity.recruiter.company,
            jobEntity.dtLimite,
            jobEntity.indAtivo,
            recruiter,
            jobEntity.maxCandidates
        );

        return job;
    }
}
