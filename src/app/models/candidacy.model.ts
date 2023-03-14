import { CandidateModel } from "./candidate.model";
import { JobModel } from "./job.model";

export class CandidacyModel {
    constructor(
        private _candidate: CandidateModel,
        private _job: JobModel,
        private _indSucesso: boolean,
        private _dtCandidacy: Date
    ) {}

    public get candidate() {
        return this._candidate;
    }

    public get job() {
        return this._job;
    }

    public get indSucesso() {
        return this._indSucesso;
    }

    public get dtCandidacy() {
        return this._dtCandidacy;
    }

    public toJson() {
        return {
            candidate: this._candidate.toJson(),
            job: this._job.toJson(),
            indSucesso: this._indSucesso,
            dtCandidacy: this._dtCandidacy,
        };
    }
}
