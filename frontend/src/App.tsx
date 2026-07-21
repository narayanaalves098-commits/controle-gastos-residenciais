import { useEffect, useState } from "react";
import type { Pessoa } from "./types/Pessoa";
import type { ResumoGeral } from "./types/ResumoGeral";
import type { ResumoPessoa } from "./types/ResumoPessoa";
import { AxiosError } from "axios";
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
  const [descricao, setDescricao] = useState("");

  // Carrega os dados iniciais da aplicação ao abrir a página.
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

  // Atualiza o resumo financeiro geral.
  async function atualizarResumoGeral() {
    const dados = await buscarResumoGeral();
    setResumoGeral(dados);
  }

  // Atualiza o resumo financeiro de cada pessoa cadastrada.
  async function atualizarResumosPessoas(listaPessoas: Pessoa[]) {
    const resumos = await Promise.all(
      listaPessoas.map((pessoa) => buscarResumoPessoa(pessoa.id)),
    );

    setResumosPessoas(resumos);
  }

  // Realiza o cadastro de uma nova pessoa.
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

  // Realiza o cadastro de uma nova transação e atualiza os dados da tela.
  async function salvarTransacao() {
    if (
      valor === "" ||
      valor <= 0 ||
      descricao.trim() === "" ||
      data === "" ||
      pessoaId === 0
    ) {
      alert("Preencha todos os dados da transação.");
      return;
    }

    try {
      await cadastrarTransacao(valor, tipo, data, descricao, pessoaId);

      const transacoesAtualizadas = await listarTransacoes();
      setTransacoes(transacoesAtualizadas);

      const pessoasAtualizadas = await listarPessoas();
      setPessoas(pessoasAtualizadas);

      await atualizarResumosPessoas(pessoasAtualizadas);
      await atualizarResumoGeral();

      setValor("");
      setDescricao("");
      setTipo("Despesa");
      setData("");
      setPessoaId(0);

      alert("Transação cadastrada com sucesso!");
    } catch (erro) {
      const error = erro as AxiosError<string>;

      alert(error.response?.data || "Erro ao cadastrar a transação.");
    }
  }

  // Remove uma transação cadastrada.
  async function removerTransacao(id: number) {
    await excluirTransacao(id);

    const transacoesAtualizadas = await listarTransacoes();
    setTransacoes(transacoesAtualizadas);

    const pessoasAtualizadas = await listarPessoas();
    setPessoas(pessoasAtualizadas);

    await atualizarResumosPessoas(pessoasAtualizadas);
    await atualizarResumoGeral();
  }

  // Remove uma pessoa e suas transações vinculadas.
  async function removerPessoa(id: number) {
    await excluirPessoa(id);

    // Atualiza a lista de pessoas após a exclusão.
  const pessoasAtualizadas = await listarPessoas();
  setPessoas(pessoasAtualizadas);

  // Atualiza a lista porque as transações da pessoa também são excluídas.
  const transacoesAtualizadas = await listarTransacoes();
  setTransacoes(transacoesAtualizadas);

  await atualizarResumosPessoas(pessoasAtualizadas);
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

      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
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
            <p>
              {transacao.pessoaNome} - {transacao.tipo}
            </p>

            {transacao.descricao && <p>Descrição: {transacao.descricao}</p>}

            <p>Data: {new Date(transacao.data).toLocaleDateString("pt-BR")}</p>

            <p>Valor: R$ {transacao.valor}</p>

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
