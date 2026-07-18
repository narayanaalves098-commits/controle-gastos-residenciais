import { useEffect, useState } from "react";
import type { Pessoa } from "./types/Pessoa";
import {
  listarPessoas,
  cadastrarPessoa,
  excluirPessoa,
} from "./services/pessoaService";


function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);

  useEffect(() => {
    async function carregarPessoas() {
      const dados = await listarPessoas();
      setPessoas(dados);
    }

    carregarPessoas();
  }, []);

  async function salvarPessoa() {
  await cadastrarPessoa(nome, idade);

  const dados = await listarPessoas();
  setPessoas(dados);

  setNome("");
  setIdade(0);
}

async function removerPessoa(id: number) {
  await excluirPessoa(id);

  const dados = await listarPessoas();
  setPessoas(dados);
}

  return (
    <div>
      <h1>Controle de Gastos Residenciais</h1>

      <h2>Cadastrar Pessoa</h2>

<input
  type="text"
  placeholder="Nome"
  value={nome}
  onChange={(e) => setNome(e.target.value)}
/>

<input
  type="number"
  placeholder="Idade"
  value={idade}
  onChange={(e) => setIdade(Number(e.target.value))}
/>

<button onClick={salvarPessoa}>
  Cadastrar
</button>

      <h2>Lista de Pessoas</h2>

      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>
  {pessoa.nome} - {pessoa.idade} anos

  <button onClick={() => removerPessoa(pessoa.id)}>
    Excluir
  </button>
</li>
        ))}
      </ul>
    </div>
  );
  
}



export default App;