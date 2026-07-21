import axios from "axios";
import API_URL from "./api";
import type { Transacao } from "../types/Transacao";

export async function listarTransacoes(): Promise<Transacao[]> {
  const resposta = await axios.get<Transacao[]>(`${API_URL}/transacao`);
  return resposta.data;
}

export async function cadastrarTransacao(
  valor: number,
  tipo: string,
  data: string,
  pessoaId: number
): Promise<Transacao> {
  const resposta = await axios.post<Transacao>(`${API_URL}/transacao`, {
    valor,
    tipo,
    data,
    pessoaId,
  });

  return resposta.data;
}

export async function excluirTransacao(id: number): Promise<void> {
  await axios.delete(`${API_URL}/transacao/${id}`);
}