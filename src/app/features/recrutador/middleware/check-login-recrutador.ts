import { NextFunction, Request, Response } from "express";

export const checkLoginRecrutadorMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userHeader = req.headers["user"];

        if (!userHeader) {
            return res.status(401).send({
                ok: false,
                message: "token não foi informado, faça o seu login",
            });
        }

        const user = JSON.parse(userHeader.toString());

        if (user.tipo !== "R") {
            return res.status(403).send({
                ok: false,
                message: "usuario deve ser recrutador",
            });
        }

        req.body = {
            ...req.body,
            idRecrutador: user.id,
        };

        return next();
    } catch (error: any) {
        return res.status(401).send({
            ok: false,
            message: "token invalido, faça o seu login",
        });
    }
};
