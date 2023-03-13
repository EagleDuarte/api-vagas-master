import { Router } from "express";
import { checkLoginCandidateMiddleware } from "../../candidate/middlewares/check-login-candidate";
import { checkLoginMiddleware } from "../../login/middleware/check-login.middleware";
import { checkLoginRecrutadorMiddleware } from "../../recrutador/middleware/check-login-recrutador";
import { VagaController } from "../controllers/vaga.controller";

export const vagaRoutes = () => {
    const router = Router();

    router.post(
        "/",
        [checkLoginMiddleware, checkLoginRecrutadorMiddleware],
        new VagaController().create
    );

    router.post(
        "/apply/:idVaga",
        [checkLoginMiddleware, checkLoginCandidateMiddleware],
        new VagaController().apply
    );

    return router;
};
