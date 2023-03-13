import { Router, Express } from "express";
import { candidateRoutes } from "../../app/features/candidate/routes/candidate.routes";
import { loginRoutes } from "../../app/features/login/routes/login.routes";
import { recrutadorRoutes } from "../../app/features/recrutador/routes/recrutador.routes";
import { vagaRoutes } from "../../app/features/vaga/routes/vaga.routes";

export const createRoutes = (app: Express) => {
    app.get("/", (req, res) => {
        return res.status(200).send({
            ok: true,
            message: "Alright, everything is working!",
        });
    });

    app.use("/recrutador", recrutadorRoutes());
    app.use("/auth", loginRoutes());
    app.use("/candidate", candidateRoutes());
    app.use("/vaga", vagaRoutes());
};
