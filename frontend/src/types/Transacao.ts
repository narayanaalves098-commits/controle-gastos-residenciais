export interface Transacao {
  id: number;
  valor: number;
  tipo: string;
  data: string;
  descricao: string;
  pessoaId: number;
  pessoaNome: string;
}