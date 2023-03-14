import { NextFunction, Request, Response } from "express";
import { JwtHelper } from "../../../shared/util/jwt.helper";

export const checkLoginMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).send({
                ok: false,
                message: "Token not provided, you are not logged.",
            });
        }

        // verificar se o token é válido
        const valid: any = JwtHelper.verificarToken(token);

        req.headers["user"] = JSON.stringify(valid);

        console.log(req.headers["user"]);

        return next();
    } catch (error: any) {
        return res.status(401).send({
            ok: false,
            message: "Invalid token, you are not logged.",
        });
    }
};
