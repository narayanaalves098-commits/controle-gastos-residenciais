using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    [HttpGet]
    public IActionResult ListarPessoas()
    {
        var pessoas = new List<Pessoa>()
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

        return Ok(pessoas);
    }
}