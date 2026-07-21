import { useEffect, useState } from "react";
import type { Pessoa } from "./types/Pessoa";
import type { ResumoGeral } from "./types/ResumoGeral";
import type { ResumoPessoa } from "./types/ResumoPessoa";
import {
  listarPessoas,
  cadastrarPessoa,
  excluirPessoa,
  buscarResumoGeral,
  buscarResumoPessoa,
} from "./services/pessoaService";
import type { Transacao } from "./types/Transacao";
import {
  listarTransacoes,
  cadastrarTransacao,
  excluirTransacao,
} from "./services/transacaoService";

function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number | "">("");
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [valor, setValor] = useState<number | "">("");
  const [tipo, setTipo] = useState("Despesa");
  const [data, setData] = useState("");
  const [pessoaId, setPessoaId] = useState(0);
  const [resumoGeral, setResumoGeral] = useState<ResumoGeral | null>(null);
  const [resumosPessoas, setResumosPessoas] = useState<ResumoPessoa[]>([]);

  useEffect(() => {
    async function carregarPessoas() {
      const dados = await listarPessoas();
      setPessoas(dados);
      await atualizarResumosPessoas(dados);
    }
    async function carregarTransacoes() {
      const dados = await listarTransacoes();
      setTransacoes(dados);
    }

    async function carregarResumoGeral() {
      const dados = await buscarResumoGeral();
      setResumoGeral(dados);
    }

    carregarPessoas();
    carregarTransacoes();
    carregarResumoGeral();
  }, []);

  async function atualizarResumoGeral() {
    const dados = await buscarResumoGeral();
    setResumoGeral(dados);
  }

  async function atualizarResumosPessoas(listaPessoas: Pessoa[]) {
    const resumos = await Promise.all(
      listaPessoas.map((pessoa) => buscarResumoPessoa(pessoa.id)),
    );

    setResumosPessoas(resumos);
  }
  async function salvarPessoa() {
    if (nome.trim() === "" || idade === "") {
      alert("Preencha o nome e a idade.");
      return;
    }

    await cadastrarPessoa(nome, idade);

    const dados = await listarPessoas();
    setPessoas(dados);
    await atualizarResumosPessoas(dados);
    await atualizarResumoGeral();

    setNome("");
    setIdade("");
  }

  async function salvarTransacao() {
    if (valor === "" || valor <= 0 || data === "" || pessoaId === 0) {
      alert("Preencha todos os dados da transação.");
      return;
    }

    await cadastrarTransacao(valor, tipo, data, pessoaId);

    const transacoesAtualizadas = await listarTransacoes();
    setTransacoes(transacoesAtualizadas);

    const pessoasAtualizadas = await listarPessoas();
    setPessoas(pessoasAtualizadas);

    await atualizarResumosPessoas(pessoasAtualizadas);
    await atualizarResumoGeral();

    setValor("");
    setTipo("Despesa");
    setData("");
    setPessoaId(0);
  }

  async function removerTransacao(id: number) {
    await excluirTransacao(id);

    const transacoesAtualizadas = await listarTransacoes();
    setTransacoes(transacoesAtualizadas);

    const pessoasAtualizadas = await listarPessoas();
    setPessoas(pessoasAtualizadas);

    await atualizarResumosPessoas(pessoasAtualizadas);
    await atualizarResumoGeral();
  }

  async function removerPessoa(id: number) {
    await excluirPessoa(id);

    const dados = await listarPessoas();
    setPessoas(dados);
    await atualizarResumosPessoas(dados);
    await atualizarResumoGeral();
  }

  return (
    <div>
      <h1>Controle de Gastos Residenciais</h1>

      <h2>Resumo Geral</h2>

      {resumoGeral && (
        <div>
          <p>Total de receitas: R$ {resumoGeral.totalReceitas}</p>
          <p>Total de despesas: R$ {resumoGeral.totalDespesas}</p>
          <p>Saldo: R$ {resumoGeral.saldo}</p>
        </div>
      )}

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
        onChange={(e) =>
          setIdade(e.target.value === "" ? "" : Number(e.target.value))
        }
      />

      <button onClick={salvarPessoa}>Cadastrar</button>

      <h2>Lista de Pessoas</h2>

      <ul>
  {pessoas.map((pessoa) => {
   const resumo = resumosPessoas.find(
  (item) => item.nome === pessoa.nome,
);

    return (
      <li key={pessoa.id}>
        <p>
          {pessoa.nome} - {pessoa.idade} anos
        </p>

        {resumo && (
          <div>
            <p>Receitas: R$ {resumo.totalReceitas}</p>
            <p>Despesas: R$ {resumo.totalDespesas}</p>
            <p>Saldo: R$ {resumo.saldo}</p>
          </div>
        )}

        <button onClick={() => removerPessoa(pessoa.id)}>Excluir</button>
      </li>
    );
  })}
</ul>

      <h2>Cadastrar Transação</h2>

      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) =>
          setValor(e.target.value === "" ? "" : Number(e.target.value))
        }
      />

      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="Despesa">Despesa</option>
        <option value="Receita">Receita</option>
      </select>

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <select
        value={pessoaId}
        onChange={(e) => setPessoaId(Number(e.target.value))}
      >
        <option value={0}>Selecione uma pessoa</option>

        {pessoas.map((pessoa) => (
          <option key={pessoa.id} value={pessoa.id}>
            {pessoa.nome}
          </option>
        ))}
      </select>

      <button onClick={salvarTransacao}>Cadastrar Transação</button>

      <h2>Lista de Transações</h2>

      <ul>
        {transacoes.map((transacao) => (
          <li key={transacao.id}>
            {transacao.pessoaNome} - {transacao.tipo} - R$ {transacao.valor}
            <button onClick={() => removerTransacao(transacao.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
