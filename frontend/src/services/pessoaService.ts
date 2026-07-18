import axios from "axios";
import API_URL from "./api";
import type { Pessoa } from "../types/Pessoa";

export async function listarPessoas(): Promise<Pessoa[]> {
  const resposta = await axios.get<Pessoa[]>(`${API_URL}/pessoa`);
  return resposta.data;
}