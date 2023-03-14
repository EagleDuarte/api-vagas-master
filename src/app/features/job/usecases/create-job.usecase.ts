import { UserRepository } from "../../user/repositories/user.repository";
import { JobModel } from '../../../models/job.model'
import { JobRepository } from "../repositories/job.repository";

interface CreateJobTDO {
  description: string;
  company: string;
  dtLimite: Date;
  indAtivo: boolean;
  maxCandidates?: number;
  idRecruiter: string;
}

export class CreateJobUseCase {
  public async execute(data: CreateJobTDO) {
    const userRepository = new UserRepository();
    const usuarioResult = await userRepository.get(data.idRecruiter);

    if(!usuarioResult) {
      return null
    }

    const job = new JobModel(
      data.description,
      data.company,
      data.dtLimite,
      data.indAtivo,
      usuarioResult,
      data.maxCandidates
    )

    const repository = new JobRepository();
    const result = await repository.create(job);

    return result.toJson();
    
  }
}