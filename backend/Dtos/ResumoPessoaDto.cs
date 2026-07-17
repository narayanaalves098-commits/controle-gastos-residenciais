namespace backend.Dtos;

public class ResumoPessoaDto
{
    public string Nome { get; set; } = string.Empty;

    public decimal TotalReceitas { get; set; }

    public decimal TotalDespesas { get; set; }

    public decimal Saldo { get; set; }
}