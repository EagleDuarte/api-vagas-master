import { UserModel } from "./user.model";

export class RecruiterModel extends UserModel {
    constructor(
        nome: string,
        userName: string,
        senha: string,
        company: string
    ) {
        super(nome, userName, senha, "R", company);
    }
}
