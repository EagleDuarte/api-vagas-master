import { Request, Response } from "express";
import { CreateCandidateUseCase } from "../usecases/create-candidate.usecase";
import { ListCandidateUseCase } from "../usecases/list-candidate.usecase";

export class CandidateController {
    public async create(req: Request, res: Response) {
        try {
            const { nome, username, senha } = req.body

            const usecase = new CreateCandidateUseCase();
            const result = await usecase.execute({
                nome,
                username,
                senha
            });

            return res.status(201).send({
                ok: true,
                message: "Candidate created sucessfuly!",
                data: result
            });

        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async list(req: Request, res: Response) {

        try {

            const usecase = new ListCandidateUseCase();
            const result = await usecase.execute();

            return res.status(200).send({
                ok: true,
                message: 'Listing all our candidates...',
                data: result
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: error.toString()
            })

        }

    }
}