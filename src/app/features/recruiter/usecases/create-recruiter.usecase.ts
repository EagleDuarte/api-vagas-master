import { RecruiterModel } from "../../../models/recruiter.model";
import { UserRepository } from "../../user/repositories/user.repository";

interface CreateRecruiterDTO {
    nome: string;
    userName: string;
    senha: string;
    company: string;
}

export class CreateRecruiterUseCase {
    public async execute(data: CreateRecruiterDTO) {
        const recruiter = new RecruiterModel(
            data.nome,
            data.userName,
            data.senha,
            data.company
        );

        const repository = new UserRepository();
        const result = await repository.create(recruiter);

        return result.toJson();
    }
}
