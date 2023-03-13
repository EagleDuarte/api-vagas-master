
import { Request, Response } from "express";
import { CreateRecrutadorUseCase } from "../usecases/create-recrutador.usecase";
import { ListRecrutadorUseCase } from "../usecases/list-recrutador.usecase";

export class RecrutadorController {
    public async create(req: Request, res: Response) {
        try {
            const { nome, username, senha, empresa } = req.body;

            // .. validações dos campos

            const usecase = new CreateRecrutadorUseCase();
            const result = await usecase.execute({
                nome,
                userName: username,
                senha,
                empresa,
            });

            return res.status(200).send({
                ok: true,
                message: "Recrutador criado com sucesso",
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
            const usecase = new ListRecrutadorUseCase();
            const result = await usecase.execute();
    
    
            return res.status(200).send({
                ok: true,
                message: "Recrutadores listados com sucesso.",
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
