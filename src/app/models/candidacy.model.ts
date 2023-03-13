import { CandidateModel } from "./candidate.model";
import { VagaModel } from "./vaga.model";

export class CandidacyModel {
    constructor(
        private _candidate: CandidateModel,
        private _vaga: VagaModel,
        private _indSucesso: boolean,
        private _dtCandidacy: Date
    ) {}

    public get candidate() {
        return this._candidate;
    }

    public get vaga() {
        return this._vaga;
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
            vaga: this._vaga.toJson(),
            indSucesso: this._indSucesso,
            dtCandidacy: this._dtCandidacy,
        };
    }
}
