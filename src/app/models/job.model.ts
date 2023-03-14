import { v4 as idJob } from "uuid";
import { UserModel } from "./user.model";

export class JobModel {
    private _id: string;

    constructor(
        private _description: string,
        private _company: string,
        private _dtLimite: Date,
        private _indAtivo: boolean,
        private _recruiter: UserModel,
        private _maxCandidates?: number
    ) {
        this._id = idJob();
    }

    public get id() {
        return this._id;
    }

    public get description() {
        return this._description;
    }

    public set description(description: string) {
        this._description = description;
    }

    public get company() {
        return this._company;
    }

    public set company(company: string) {
        this._company = company;
    }

    public get dtLimite() {
        return this._dtLimite;
    }

    public set dtLimite(dtLimite: Date) {
        this._dtLimite = dtLimite;
    }

    public get indAtivo() {
        return this._indAtivo;
    }

    public set indAtivo(indAtivo: boolean) {
        this._indAtivo = indAtivo;
    }

    public get maxCandidates(): number | undefined {
        return this._maxCandidates;
    }

    public set maxCandidates(maxCandidates: number | undefined) {
        this._maxCandidates = maxCandidates;
    }

    public get recruiter() {
        return this._recruiter;
    }

    public set recruiter(recruiter: UserModel) {
        this._recruiter = recruiter;
    }

    public toJson() {
        return {
            id: this._id,
            description: this.description,
            company: this.company,
            dtLimite: this.dtLimite,
            indAtivo: this.indAtivo,
            maxCandidates: this.maxCandidates,
            recruiter: this.recruiter.toJson(),
        };
    }

    public static create(
        id: string,
        description: string,
        company: string,
        dtLimite: Date,
        indAtivo: boolean,
        recruiter: UserModel,
        maxCandidates?: number
    ) {
        const job = new JobModel(
            description,
            company,
            dtLimite,
            indAtivo,
            recruiter,
            maxCandidates
        );
        job._id = id;

        return job;
    }
}
