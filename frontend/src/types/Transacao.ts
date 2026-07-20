export interface Transacao {
  id: number;
  valor: number;
  tipo: string;
  data: string;
  pessoaId: number;
  pessoaNome: string;
}