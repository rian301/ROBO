// Controlador da API
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

[ApiController]
[Route("api/robo")]
public class RoboController : ControllerBase
{
    private static Braco bracoEsquerdo = new Braco { Cotovelo = "Em Repouso", Pulso = "Em Repouso" }; // Estado inicial do braço esquerdo
    private static Braco bracoDireito = new Braco { Cotovelo = "Em Repouso", Pulso = "Em Repouso" }; // Estado inicial do braço direito
    private static Cabeca cabeca = new Cabeca { Rotacao = "Em Repouso", Inclinacao = "Em Repouso" }; // Estado inicial da cabeça
    private Robo robo = new Robo { Cabeca = cabeca, BracoDireito = bracoDireito, BracoEsquerdo = bracoEsquerdo };

    // Endpoint para obter o estado atual do braço esquerdo
    [HttpGet("robo")]
    public ActionResult<Robo> GetEstadoBracoEsquerdo()
    {
        var robo = new Robo
        {
            Cabeca = cabeca,
            BracoDireito = bracoDireito,
            BracoEsquerdo = bracoEsquerdo
        };
        return robo;
    }

    // Endpoint para enviar um comando para controlar o braço esquerdo
    [HttpPost("bracoesquerdo")]
    public IActionResult ControlarBracoEsquerdo(Braco braco)
    {
        // Só poderá mover o Pulso se o Cotovelo estiver Fortemente Contraído
        robo.BracoEsquerdo.Cotovelo = braco.Cotovelo;

        if (braco.Cotovelo != "Fortemente Contraído" && braco.Pulso != "Em Repouso")
        {
            return BadRequest("Movimento inválido para o braço esquerdo. Certifique-se de seguir a progressão de estados.");
        }
        else if (braco.Cotovelo == "Fortemente Contraído")
        {
            robo.BracoEsquerdo.Pulso = braco.Pulso;
            return StatusCode(200);
        }
        else
        {
            return StatusCode(200);
        }
    }

    // Endpoint para enviar um comando para controlar o braço direito
    [HttpPost("bracodireito")]
    public IActionResult ControlarBracoDireito(Braco braco)
    {
        // Só poderá mover o Pulso se o Cotovelo estiver Fortemente Contraído
        robo.BracoDireito.Cotovelo = braco.Cotovelo;

        if (braco.Cotovelo != "Fortemente Contraído" && braco.Pulso != "Em Repouso")
        {
            robo.BracoDireito.Cotovelo = braco.Cotovelo;
            return BadRequest("Movimento inválido para o braço direito. Certifique-se de seguir a progressão de estados.");
        }
        else if (braco.Cotovelo == "Fortemente Contraído")
        {
            robo.BracoDireito.Pulso = braco.Pulso;
            return StatusCode(200);
        }
        else
        {
            return StatusCode(200);
        }
    }

    // Endpoint para enviar um comando para controlar a cabeça
    [HttpPost("cabeca")]
    public IActionResult ControlarCabeca(Cabeca cabeca)
    {
        // Só pode rotacionar a cabeça caso a inclinação não esteja Para Baixo
        if (cabeca.Inclinacao != "Para Baixo")
        {
            robo.Cabeca.Rotacao = cabeca.Rotacao;
            return StatusCode(200);
        }
        else if (cabeca.Inclinacao == "Para Baixo" && cabeca.Rotacao == "Em Repouso")
        {
            robo.Cabeca.Inclinacao = cabeca.Inclinacao;
            return StatusCode(200);
        }
        else
        {
            return BadRequest("A cabeça não pode ser rotacionada para baixo quando já está inclinada para baixo.");
        }
    }

    // Endpoint para resetar os comandos
    [HttpPost("reset")]
    public ActionResult<Robo> Reset()
    {
        Braco bracoEsquerdoReset = new Braco { Cotovelo = "Em Repouso", Pulso = "Em Repouso" };
        Braco bracoDireitoReset = new Braco { Cotovelo = "Em Repouso", Pulso = "Em Repouso" };
        Cabeca cabecaReset = new Cabeca { Rotacao = "Em Repouso", Inclinacao = "Em Repouso" };
        Robo roboReset = new Robo { Cabeca = cabecaReset, BracoDireito = bracoDireitoReset, BracoEsquerdo = bracoEsquerdoReset };

        return roboReset;
    }
}
