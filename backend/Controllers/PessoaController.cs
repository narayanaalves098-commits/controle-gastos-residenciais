using Microsoft.AspNetCore.Mvc;
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
}

