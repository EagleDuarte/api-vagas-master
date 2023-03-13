import { UsuarioModel } from "./usuario.model";

export class RecrutadorModel extends UsuarioModel {
    constructor(
        nome: string,
        userName: string,
        senha: string,
        empresa: string
    ) {
        super(nome, userName, senha, "R", empresa);
    }
}
