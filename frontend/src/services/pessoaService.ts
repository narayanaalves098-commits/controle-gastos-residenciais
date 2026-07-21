import axios from "axios";
import API_URL from "./api";
import type { Pessoa } from "../types/Pessoa";
import type { ResumoPessoa } from "../types/ResumoPessoa";

export async function listarPessoas(): Promise<Pessoa[]> {
  const resposta = await axios.get<Pessoa[]>(`${API_URL}/pessoa`);
  return resposta.data;
}

export async function cadastrarPessoa(
  nome: string,
  idade: number
): Promise<Pessoa> {
  const resposta = await axios.post<Pessoa>(`${API_URL}/pessoa`, {
    nome,
    idade
  });

  return resposta.data;
}

 export async function excluirPessoa(id: number): Promise<void> {
  await axios.delete(`${API_URL}/pessoa/${id}`);
}

export async function buscarResumoGeral() {
  const resposta = await axios.get(`${API_URL}/pessoa/resumo-geral`);
  return resposta.data;
}

export async function buscarResumoPessoa(
  id: number
): Promise<ResumoPessoa> {
  const resposta = await axios.get<ResumoPessoa>(
    `${API_URL}/pessoa/${id}/resumo`
  );

  return resposta.data;
}
