import { Request, Response } from "express";
import { LoginUseCase } from "../usecases/login.usecase";

export class LoginController {
    public async login(req: Request, res: Response) {
        try {
            const { username, senha } = req.body;

            const usecase = new LoginUseCase();
            const result = await usecase.execute({ username, senha });

            if (!result) {
                res.status(401).send({
                    ok: false,
                    message:
                        "Login error, verify your username and password.",
                });
            }

            return res.status(200).send({
                ok: true,
                message: "Login done sucessfuly.",
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
