import { useEffect, useState } from "react";
import type { Pessoa } from "./types/Pessoa";
import { listarPessoas } from "./services/pessoaService";

function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  useEffect(() => {
    async function carregarPessoas() {
      const dados = await listarPessoas();
      setPessoas(dados);
    }

    carregarPessoas();
  }, []);

  return (
    <div>
      <h1>Controle de Gastos Residenciais</h1>

      <h2>Lista de Pessoas</h2>

      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>
            {pessoa.nome} - {pessoa.idade} anos
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;