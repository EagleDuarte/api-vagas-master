import { NextFunction, Request, Response } from "express";
import { GetRecrutadorUseCase } from "../usecases/get-recrutador.usecase";

export const checkDuplicateRecrutadorValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username } = req.body;

        const usecase = new GetRecrutadorUseCase();
        const result = await usecase.execute(username);

        if (result) {
            return res.status(400).send({
                ok: false,
                message: "recrutador já existe",
            });
        }

        next();
    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
};
