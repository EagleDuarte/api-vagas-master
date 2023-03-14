import { NextFunction, Request, Response } from "express";

export const checkLoginCandidateMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userHeader = req.headers["user"];

        if (!userHeader) {
            return res.status(401).send({
                ok: false,
                message: "Token not provided, you are not logged.",
            });
        }

        const user = JSON.parse(userHeader.toString());

        if (user.tipo !== "C") {
            return res.status(403).send({
                ok: false,
                message: "This user must be a candidate!",
            });
        }

        req.body = {
            ...req.body,
            idCandidate: user.id,
        };

        return next();
    } catch (error: any) {
        return res.status(401).send({
            ok: false,
            message: "Invalid token, you are not logged.",
        });
    }
};
