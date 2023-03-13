import { CandidacyModel } from "../../../models/candidacy.model";
import { CandidacyRepository } from "../../candidacy/repositories/candidacy.repository";
import { UserRepository } from "../../user/repositories/user.repository";
import { VagaRepository } from "../repositories/vaga.repository";

interface AplicarVagaDTO {
    idCandidate: string;
    idVaga: string;
    indSucesso: boolean;
}

export class AplicarVagaUseCase {
    public async execute(data: AplicarVagaDTO) {
        const vagaRepository = new VagaRepository();
        const userRepository = new UserRepository();

        // Verifica usuario
        const candidate = await userRepository.get(data.idCandidate);
        if (!candidate) {
            return null;
        }

        // Verifica vaga
        const vaga = await vagaRepository.find(data.idVaga);
        if (!vaga) {
            return null;
        }

        const CandidacyRepository = new CandidacyRepository();

        // Verificar se usuario ja esta na vaga
        const usuarioVaga = await CandidacyRepository.get(
            data.idCandidate,
            data.idVaga
        );
        if (usuarioVaga) {
            throw new Error("candidate já está aplicado nesta vaga");
        }

        // Valida se vaga está ativa
        if (!vaga.indAtivo) {
            throw new Error("A vaga não está ativa");
        }

        // Verifica se a data limite da vaga já foi alcançada
        if (vaga.dtLimite < new Date()) {
            throw new Error(
                "A vaga não está mais aceitando candidaturas devido ao prazo"
            );
        }

        const candidacy = new CandidacyModel(
            candidate,
            vaga,
            data.indSucesso,
            new Date()
        );

        const result = await CandidacyRepository.create(candidacy);

        return result.toJson();
    }
}
