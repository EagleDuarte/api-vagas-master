import { CandidateModel } from "../../../models/candidate.model";
import { UsuarioModel } from "../../../models/usuario.model";
import { UserRepository } from "../../user/repositories/user.repository";

interface CreateCandidateDTO {
  nome: string;
  username: string;
  senha: string;
}

export class CreateCandidateUseCase {
  public async execute(data: CreateCandidateDTO) {
    const candidate = new CandidateModel(
      data.nome,
      data.username,
      data.senha,
    )

    const repository = new UserRepository();
    const result = await repository.create(candidate);

    return result.toJson();
  }
}