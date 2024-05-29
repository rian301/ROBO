import { Injectable } from '@angular/core';
import { CotoveloEstado } from '../enums/cotovelo-estado';
import { PulsoEstado } from '../enums/pulso-estado';
import { RotacaoCabeca } from '../enums/rotacao-cabeca';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Robo } from '../interfaces/robo';
import { InclinacaoCabeca } from '../enums/inclinacao-cabeca';

@Injectable({
  providedIn: 'root'
})
export class RobotStateService {
  private readonly urlApi = `${environment.urlApi}/api/robo`;
  public $temErro = new BehaviorSubject<boolean>(false);

  bracoEsquerdo = {
    cotovelo: CotoveloEstado.EmRepouso,
    pulso: PulsoEstado.EmRepouso
  };

  bracoDireito = {
    cotovelo: CotoveloEstado.EmRepouso,
    pulso: PulsoEstado.EmRepouso
  };

  cabeca = {
    rotacao: RotacaoCabeca.EmRepouso,
    inclinacao: InclinacaoCabeca.EmRepouso
  };

  constructor(private http: HttpClient) { }

  atualizaEstadoCompleto(): Observable<Robo> {
    return this.http.get<Robo>(`${this.urlApi}/robo`);
  }

  resetaEstados(): Observable<Robo> {
    return this.http.post<Robo>(`${this.urlApi}/reset`, null);
  }

  atualizaEstadoBracoEsquerdo(robo: Robo) {
    this.bracoEsquerdo = robo.bracoEsquerdo;
    return this.http.post<Robo>(`${this.urlApi}/bracoesquerdo`, this.bracoEsquerdo);
  }

  atualizaEstadoBracoDireito(robo: Robo) {
    this.bracoDireito = robo.bracoDireito;
    return this.http.post<Robo>(`${this.urlApi}/bracodireito`, this.bracoDireito);
  }

  atualizaEstadocabeca(robo: Robo) {
    this.cabeca = robo.cabeca;
    return this.http.post<Robo>(`${this.urlApi}/cabeca`, this.cabeca);
  }
}
