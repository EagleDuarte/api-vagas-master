import { Request, Response } from "express";
import { AplicarVagaUseCase } from "../usecases/aplicar-vaga.usecase";
import { CreateVagaUseCase } from "../usecases/create-vaga.usecase";

export class VagaController {
    public async create(req: Request, res: Response) {
        try {
            const {
                descricao,
                empresa,
                dtLimite,
                indAtivo,
                maxCandidates,
                idRecrutador,
            } = req.body;

            const usecase = new CreateVagaUseCase();
            const result = await usecase.execute({
                descricao,
                empresa,
                dtLimite,
                indAtivo,
                maxCandidates,
                idRecrutador,
            });

            if (!result) {
                res.status(404).send({
                    ok: false,
                    message: "O recrutador não existe",
                });
            }

            return res.status(201).send({
                ok: true,
                message: "Vaga criada com sucesso",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async apply(req: Request, res: Response) {
        try {
            const { idCandidate, indSucesso } = req.body;
            const { idVaga } = req.params;

            const usecase = new AplicarVagaUseCase();
            const result = await usecase.execute({
                idCandidate,
                idVaga,
                indSucesso,
            });

            if (!result) {
                return res.status(404).send({
                    ok: false,
                    message: "usuario/vaga nao encontrado",
                });
            }

            return res.status(201).send({
                ok: true,
                message: "candidatura feita com sucesso",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
