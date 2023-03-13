import { UsuarioModel } from "./usuario.model";

export class CandidateModel extends UsuarioModel {
  constructor(
    nome: string,
    username: string,
    senha: string
  ) {
    super(nome, username, senha, 'C');
  }
}