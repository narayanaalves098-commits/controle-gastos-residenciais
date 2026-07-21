namespace backend.Models;

public class Transacao
{
    public int Id { get; set; }

    public decimal Valor { get; set; }

    public string Tipo { get; set; } = string.Empty;

    public DateTime Data { get; set; }

    public string Descricao { get; set; } = string.Empty;

    public int PessoaId { get; set; }

    public Pessoa? Pessoa { get; set; }
}