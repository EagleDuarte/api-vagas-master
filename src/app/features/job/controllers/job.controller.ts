import { Request, Response } from "express";
import { ApplyJobUseCase } from "../usecases/apply-job.usecase";
import { CreateJobUseCase } from "../usecases/create-job.usecase";

export class JobController {
    public async create(req: Request, res: Response) {
        try {
            const {
                description,
                company,
                dtLimite,
                indAtivo,
                maxCandidates,
                idRecruiter,
            } = req.body;

            const usecase = new CreateJobUseCase();
            const result = await usecase.execute({
                description,
                company,
                dtLimite,
                indAtivo,
                maxCandidates,
                idRecruiter,
            });

            if (!result) {
                res.status(404).send({
                    ok: false,
                    message: "This recruiter doesn't exists.",
                });
            }

            return res.status(201).send({
                ok: true,
                message: "Job created sucesfully.",
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
            const { idJob } = req.params;

            const usecase = new ApplyJobUseCase();
            const result = await usecase.execute({
                idCandidate,
                idJob,
                indSucesso,
            });

            if (!result) {
                return res.status(404).send({
                    ok: false,
                    message: "Sorry, user/job wasn't found.",
                });
            }

            return res.status(201).send({
                ok: true,
                message: "Candidacy created sucesfully.",
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
