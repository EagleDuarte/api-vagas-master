import { Router, Request, Response } from "express";
import { candidateRoutes } from "../../app/features/candidate/routes/candidate.routes";
import { loginRoutes } from "../../app/features/login/routes/login.routes";
import { recruiterRoutes } from "../../app/features/recruiter/routes/recruiter.routes";
import { jobRoutes } from "../../app/features/job/routes/job.routes";

export const createRoutes = (app: Router) => {
    app.get("/", (_req: Request, res: Response) => {
        return res.status(200).send({
            ok: true,
            message: "Alright, everything is working!",
        });
    });

    app.use("/recruiter", recruiterRoutes());
    app.use("/auth", loginRoutes());
    app.use("/candidate", candidateRoutes());
    app.use("/job", jobRoutes());
};





