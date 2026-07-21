using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Dtos;
using backend.Models;


namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacaoController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransacaoController(AppDbContext context)
    {
        _context = context;
    }

    // Cadastra uma nova transação validando as regras de negócio.
    [HttpPost]
    public IActionResult CriarTransacao(TransacaoCreateDto dados)
    {
        
        // Verifica se a pessoa informada existe.
        var pessoa = _context.Pessoas.Find(dados.PessoaId);

        if (pessoa == null)
        {
            return NotFound("Pessoa não encontrada.");
        }

        // Não permite cadastrar valores menores ou iguais a zero.
        if (dados.Valor <= 0)
        {
            return BadRequest("O valor deve ser maior que zero.");
        }

        // A descrição da transação é obrigatória.
        if (string.IsNullOrWhiteSpace(dados.Descricao))
{
    return BadRequest("A descrição é obrigatória.");
}

        // Aceita apenas os tipos Receita e Despesa.
        if (dados.Tipo.ToLower() != "receita" &&
    dados.Tipo.ToLower() != "despesa")
        {
            return BadRequest("O tipo deve ser Receita ou Despesa.");
        }
        
        // Menores de idade podem cadastrar apenas despesas.
        if (pessoa.Idade < 18 && dados.Tipo.ToLower() == "receita")
        {
            return BadRequest("Menores de 18 anos só podem cadastrar despesas.");
        }

        var transacao = new Transacao
        {
            Valor = dados.Valor,
            Tipo = dados.Tipo,
            Data = dados.Data,
            Descricao = dados.Descricao,
            PessoaId = dados.PessoaId
        };

        _context.Transacoes.Add(transacao);
        _context.SaveChanges();

        return Ok(new
        {
            transacao.Id,
            transacao.Valor,
            transacao.Tipo,
            transacao.Data,
            transacao.Descricao,
            transacao.PessoaId
        });

    }

    // Lista todas as transações cadastradas.
    [HttpGet]
    public IActionResult ListarTransacoes()
    {
        var transacoes = _context.Transacoes
            .Include(t => t.Pessoa)
            .Select(t => new
            {
                t.Id,
                t.Valor,
                t.Tipo,
                t.Data,
                t.Descricao,
                t.PessoaId,
                PessoaNome = t.Pessoa != null ? t.Pessoa.Nome : null
            })
            .ToList();

        return Ok(transacoes);
    }

    // Exclui uma transação pelo ID.
    [HttpDelete("{id}")]
    public IActionResult ExcluirTransacao(int id)
    {
        var transacao = _context.Transacoes.Find(id);

        if (transacao == null)
        {
            return NotFound("Transação não encontrada.");
        }

        _context.Transacoes.Remove(transacao);
        _context.SaveChanges();

        return NoContent();
    }

}