namespace backend.Dtos;

public class TransacaoCreateDto
{
    public decimal Valor { get; set; }

    public string Tipo { get; set; } = string.Empty;

    public DateTime Data { get; set; }

    public int PessoaId { get; set; }
}