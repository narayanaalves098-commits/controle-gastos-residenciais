# 💰 Controle de Gastos Residenciais

Sistema web desenvolvido para gerenciamento de gastos residenciais, permitindo o cadastro de pessoas e de transações financeiras (receitas e despesas), com cálculo automático de saldos individuais e geral.

---

## 🚀 Tecnologias Utilizadas

### Backend
- ASP.NET Core Web API
- C#
- Entity Framework Core
- SQLite

### Frontend
- React
- TypeScript
- Vite
- Axios

---

## 📋 Funcionalidades

### 👤 Pessoas
- Cadastro de pessoas
- Listagem de pessoas
- Exclusão de pessoas
- Exclusão automática das transações vinculadas à pessoa

### 💵 Transações
- Cadastro de receitas e despesas
- Descrição da transação
- Data da transação
- Listagem de transações
- Exclusão de transações

### 📊 Resumos Financeiros
- Resumo financeiro geral
- Resumo financeiro por pessoa
- Cálculo automático do saldo (Receitas - Despesas)

---

## ✅ Regras de Negócio

- Não permite cadastrar valores menores ou iguais a zero.
- Apenas os tipos **Receita** e **Despesa** são aceitos.
- Pessoas menores de 18 anos podem cadastrar apenas despesas.
- A descrição da transação é obrigatória.
- Os dados permanecem salvos utilizando SQLite.

---

## 🗄️ Banco de Dados

O projeto utiliza **SQLite** juntamente com o **Entity Framework Core** para persistência dos dados.

---

## ▶️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/narayanaalves098-commits/controle-gastos-residenciais
```

---

### 2. Backend

Entre na pasta:

```bash
cd backend
```

Restaure os pacotes:

```bash
dotnet restore
```

Atualize o banco de dados:

```bash
dotnet ef database update
```

Execute a API:

```bash
dotnet run
```

A API ficará disponível em:

```
http://localhost:5295
```

---

### 3. Frontend

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

O projeto será iniciado em:

```
http://localhost:5173
```

---

## 📂 Estrutura do Projeto

```
ControleGastosResidenciais
│
├── backend
│   ├── Controllers
│   ├── Data
│   ├── DTOs
│   ├── Migrations
│   ├── Models
│   └── Program.cs
│
└── frontend
    ├── src
    │   ├── services
    │   ├── types
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

---

## 📷 Funcionalidades Implementadas

✔ Cadastro de pessoas

✔ Cadastro de receitas

✔ Cadastro de despesas

✔ Exclusão de pessoas

✔ Exclusão de transações

✔ Resumo financeiro geral

✔ Resumo financeiro por pessoa

✔ Persistência em banco SQLite

✔ Validações de regras de negócio

---

## 👩‍💻 Desenvolvido por

**Narayana Alves**

Projeto desenvolvido como desafio técnico utilizando ASP.NET Core, React e TypeScript.
