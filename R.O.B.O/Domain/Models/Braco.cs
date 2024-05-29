namespace Domain.Models
{
    public class Braco
    {
        public string Cotovelo { get; set; } // 1: Em Repouso, 2: Levemente Contraído, 3: Contraído, 4: Fortemente Contraído
        public string Pulso { get; set; }    // 1: -90º, 2: -45º, 3: Em Repouso, 4: 45º, 5: 90º, 6: 135º, 7: 180º
    }
}
