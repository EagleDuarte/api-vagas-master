import { NextFunction, Request, Response } from "express";

export const loginValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, senha } = req.body;

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

        next();
    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
};
