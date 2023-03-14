import { NextFunction, Request, Response } from "express";

export const createRecruiterValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { nome, username, senha, company } = req.body;

        if (!nome) {
            return res.status(400).send({
                ok: false,
                message: "nome não foi informado",
            });
        }
        if (!username) {
            return res.status(400).send({
                ok: false,
                message: "username não foi informado",
            });
        }
        if (!senha) {
            return res.status(400).send({
                ok: false,
                message: "senha não foi informado",
            });
        }
        if (!company) {
            return res.status(400).send({
                ok: false,
                message: "company não foi informado",
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
