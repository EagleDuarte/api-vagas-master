import { CandidacyModel } from "../../../models/candidacy.model";
import { CandidacyRepository } from "../../candidacy/repositories/candidacy.repository";
import { UserRepository } from "../../user/repositories/user.repository";
import { JobRepository } from "../repositories/job.repository";

interface ApplyJobDTO {
    idCandidate: string;
    idJob: string;
    indSucesso: boolean;
}

export class ApplyJobUseCase {
    public async execute(data: ApplyJobDTO) {
        const jobRepository = new JobRepository();
        const userRepository = new UserRepository();

        const candidate = await userRepository.get(data.idCandidate);
        if (!candidate) {
            return null;
        }

        const job = await jobRepository.find(data.idJob);
        if (!job) {
            return null;
        }

        const candidacyRepository = new CandidacyRepository();

        const userJob = await candidacyRepository.get(
            data.idCandidate,
            data.idJob
        );
        if (userJob) {
            throw new Error("This candidate is already applying for this job.");
        }

        if (!job.indAtivo) {
            throw new Error("This job is not available.");
        }

        if (job.dtLimite < new Date()) {
            throw new Error(
                "This job is not aceppting candidacies anymore."
            );
        }

        const candidacy = new CandidacyModel(
            candidate,
            job,
            data.indSucesso,
            new Date()
        );

        const result = await candidacyRepository.create(candidacy);

        return result.toJson();
    }
}