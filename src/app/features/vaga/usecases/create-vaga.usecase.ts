import { UserRepository } from "../../user/repositories/user.repository";
import { VagaModel } from '../../../models/vaga.model'
import { VagaRepository } from "../repositories/vaga.repository";

interface CreateVagaDTO {
  descricao: string;
  empresa: string;
  dtLimite: Date;
  indAtivo: boolean;
  maxCandidates?: number;
  idRecrutador: string;
}

export class CreateVagaUseCase {
  public async execute(data: CreateVagaDTO) {
    const usuarioRepository = new UserRepository();
    const usuarioResult = await usuarioRepository.get(data.idRecrutador);

    if(!usuarioResult) {
      return null
    }

    const vaga = new VagaModel(
      data.descricao,
      data.empresa,
      data.dtLimite,
      data.indAtivo,
      usuarioResult,
      data.maxCandidates
    )

    const repository = new VagaRepository();
    const result = await repository.create(vaga);

    return result.toJson();
    
  }
}