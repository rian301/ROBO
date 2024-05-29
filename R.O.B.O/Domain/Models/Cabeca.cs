namespace Domain.Models
{
    public class Cabeca
    {
        public string Rotacao { get; set; }    // -90º, -45º, 0º, 45º, 90º
        public string Inclinacao { get; set; } // "Para Cima", "Em Repouso", "Para Baixo"
    }
}
