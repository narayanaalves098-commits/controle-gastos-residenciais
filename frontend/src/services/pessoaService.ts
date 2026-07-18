import axios from "axios";
import API_URL from "./api";
import type { Pessoa } from "../types/Pessoa";

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