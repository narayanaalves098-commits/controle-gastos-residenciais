using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Dtos;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    private static readonly List<Pessoa> pessoas = new()
    {
        new Pessoa
        {
            Id = 1,
            Nome = "Narayana",
            Idade = 24
        },
        new Pessoa
        {
            Id = 2,
            Nome = "João",
            Idade = 17
        }
    };

    [HttpGet]
    public IActionResult ListarPessoas()
    {
        return Ok(pessoas);
    }

    [HttpPost]
    public IActionResult CriarPessoa(PessoaCreateDto dados)
    {
        var novaPessoa = new Pessoa
        {
            Id = pessoas.Count + 1,
            Nome = dados.Nome,
            Idade = dados.Idade
        };

        pessoas.Add(novaPessoa);

        return CreatedAtAction(
            nameof(ListarPessoas),
            new { id = novaPessoa.Id },
            novaPessoa
        );
    }

    [HttpDelete("{id}")]
public IActionResult ExcluirPessoa(int id)
{
    var pessoa = pessoas.FirstOrDefault(p => p.Id == id);

    if (pessoa == null)
    {
        return NotFound("Pessoa não encontrada.");
    }

    pessoas.Remove(pessoa);

    return NoContent();
}
}

