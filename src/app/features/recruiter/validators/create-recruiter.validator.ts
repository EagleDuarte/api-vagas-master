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
                message: "Name not provided.",
            });
        }
        if (!username) {
            return res.status(400).send({
                ok: false,
                message: "Username not provided.",
            });
        }
        if (!senha) {
            return res.status(400).send({
                ok: false,
                message: "Password not provided.",
            });
        }
        if (!company) {
            return res.status(400).send({
                ok: false,
                message: "Company not provided.",
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
