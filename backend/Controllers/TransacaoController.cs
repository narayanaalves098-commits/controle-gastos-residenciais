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

    [HttpPost]
    public IActionResult CriarTransacao(TransacaoCreateDto dados)
    {
        var pessoa = _context.Pessoas.Find(dados.PessoaId);

        if (pessoa == null)
        {
            return NotFound("Pessoa não encontrada.");
        }

        if (pessoa.Idade < 18 && dados.Tipo.ToLower() == "receita")
        {
            return BadRequest("Menores de 18 anos só podem cadastrar despesas.");
        }

        var transacao = new Transacao
        {
            Valor = dados.Valor,
            Tipo = dados.Tipo,
            Data = dados.Data,
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
            transacao.PessoaId
        });

    }

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
            t.PessoaId,
            PessoaNome = t.Pessoa != null ? t.Pessoa.Nome : null
        })
        .ToList();

    return Ok(transacoes);
}

}