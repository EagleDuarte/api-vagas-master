import { RecrutadorModel } from "../../../models/recrutador.model";
import { UserRepository } from "../../user/repositories/user.repository";

interface CreateRecrutadorDTO {
    nome: string;
    userName: string;
    senha: string;
    empresa: string;
}

export class CreateRecrutadorUseCase {
    public async execute(data: CreateRecrutadorDTO) {
        const recrutador = new RecrutadorModel(
            data.nome,
            data.userName,
            data.senha,
            data.empresa
        );

        const repository = new UserRepository();
        const result = await repository.create(recrutador);

        return result.toJson();
    }
}
