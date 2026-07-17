using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Dtos;
using backend.Data;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    private readonly AppDbContext _context;

    public PessoaController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult ListarPessoas()
    {
        var pessoas = _context.Pessoas.ToList();

        return Ok(pessoas);
    }

    [HttpPost]
    public IActionResult CriarPessoa(PessoaCreateDto dados)
    {
        var novaPessoa = new Pessoa
        {
            Nome = dados.Nome,
            Idade = dados.Idade
        };

        _context.Pessoas.Add(novaPessoa);
        _context.SaveChanges();

        return CreatedAtAction(
            nameof(ListarPessoas),
            new { id = novaPessoa.Id },
            novaPessoa
        );
    }

    [HttpDelete("{id}")]
    public IActionResult ExcluirPessoa(int id)
    {
        var pessoa = _context.Pessoas.Find(id);

        if (pessoa == null)
        {
            return NotFound("Pessoa não encontrada.");
        }

        _context.Pessoas.Remove(pessoa);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpGet("{id}/resumo")]
    public IActionResult ResumoPessoa(int id)
    {
        var pessoa = _context.Pessoas
            .Include(p => p.Transacoes)
            .FirstOrDefault(p => p.Id == id);

        if (pessoa == null)
        {
            return NotFound("Pessoa não encontrada.");
        }

        var resumo = new ResumoPessoaDto
        {
            Nome = pessoa.Nome,
            TotalReceitas = pessoa.Transacoes
                .Where(t => t.Tipo.ToLower() == "receita")
                .Sum(t => t.Valor),

            TotalDespesas = pessoa.Transacoes
                .Where(t => t.Tipo.ToLower() == "despesa")
                .Sum(t => t.Valor)
        };

        resumo.Saldo = resumo.TotalReceitas - resumo.TotalDespesas;

        return Ok(resumo);
    }
}

