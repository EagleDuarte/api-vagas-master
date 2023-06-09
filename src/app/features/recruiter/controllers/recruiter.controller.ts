
import { Request, Response } from "express";
import { CreateRecruiterUseCase } from "../usecases/create-recruiter.usecase";
import { RecruiterUseCaseList  } from "../usecases/list-recruiter.usecase";

export class RecruiterController {
    public async create(req: Request, res: Response) {
        try {
            const { nome, username, senha, company } = req.body;

            const usecase = new CreateRecruiterUseCase();
            const result = await usecase.execute({
                nome,
                userName: username,
                senha,
                company,
            });

            return res.status(200).send({
                ok: true,
                message: "Recruiter created sucesfully.",
                data: result,
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
            const usecase = new RecruiterUseCaseList ();
            const result = await usecase.execute();
    
    
            return res.status(200).send({
                ok: true,
                message: "Recruiters listed sucesfully.",
                data: result,
            })
        } catch(error: any){
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
   
    }

    public update() {}
}
