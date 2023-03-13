import { Request, Response, Router } from "express";
import { checkLoginMiddleware } from "../../login/middleware/check-login.middleware";
import { RecrutadorController } from "../controllers/recrutador.controller";
import { checkLoginRecrutadorMiddleware } from "../middleware/check-login-recrutador";
import { checkDuplicateRecrutadorValidator } from "../validators/check-duplicate-recrutador.validator";
import { createRecrutadorValidator } from "../validators/create-recrutador.validator";

export const recrutadorRoutes = () => {
    const router = Router();

    router.post(
        "/",
        [createRecrutadorValidator, checkDuplicateRecrutadorValidator],
        new RecrutadorController().create
    );

    router.post(
        "/vaga",
        [checkLoginMiddleware, checkLoginRecrutadorMiddleware],
        (req: Request, res: Response) => {
            return res.send({
                ok: true,
                message: "vaga criada",
            });
        }
    );

    router.get(
        "/",
        new RecrutadorController().list
    );

    return router;
};
