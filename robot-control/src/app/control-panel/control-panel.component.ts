import { Component, Inject, OnInit } from '@angular/core';
import { CotoveloEstado } from '../enums/cotovelo-estado';
import { PulsoEstado } from '../enums/pulso-estado';
import { RotacaoCabeca } from '../enums/rotacao-cabeca';
import { RobotStateService } from '../services/robot-state.service';
import { take, tap } from 'rxjs';
import { Robo } from '../interfaces/robo';
import { InclinacaoCabeca } from '../enums/inclinacao-cabeca';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  cotoveloEstados = CotoveloEstado;
  pulsoEstados = PulsoEstado;
  rotacaoCabeca = RotacaoCabeca;
  inclinacaoCabeca = InclinacaoCabeca;
  robo!: Robo;

  constructor(
    @Inject(RobotStateService) private robotStateService: RobotStateService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.atualizaEstadoCompleto();
  }

  private atualizaEstadoCompleto() {
    this.robotStateService.atualizaEstadoCompleto()
      .subscribe(data => {
        this.robo = data;
      })
  }

  private resetaEstados() {
    this.robotStateService.resetaEstados()
      .subscribe(data => {
        this.robo = data;
      })
  }

  private atualizaEstadoBracoEsquerdo() {
    this.robotStateService.atualizaEstadoBracoEsquerdo(this.robo)
      .subscribe({
        next: () => {
          this.robotStateService.$temErro.next(false);
          this.atualizaEstadoCompleto();
        },
        error: (erro) => {
          this.robotStateService.$temErro.next(true);
          this.notificationService.showError(erro.error);
          this.resetaEstados();
        }
      })
  }

  private atualizaEstadoBracoDireito() {
    this.robotStateService.atualizaEstadoBracoDireito(this.robo)
      .subscribe({
        next: () => {
          this.robotStateService.$temErro.next(false);
          this.atualizaEstadoCompleto();
        },
        error: (erro) => {
          this.robotStateService.$temErro.next(true);
          this.notificationService.showError(erro.error);
          this.resetaEstados();
        }
      })
  }

  private atualizaEstadoCabeca() {
    this.robotStateService.atualizaEstadocabeca(this.robo)
      .subscribe({
        next: () => {
          this.robotStateService.$temErro.next(false);
          this.atualizaEstadoCompleto();
        },
        error: (erro) => {
          this.robotStateService.$temErro.next(true);
          this.notificationService.showError(erro.error);
          this.resetaEstados();
        }
      })
  }

  movimentoBracoEsquerdo() {
    this.atualizaEstadoBracoEsquerdo();
  }

  movimentoBracoDireito() {
    this.atualizaEstadoBracoDireito();
  }

  movimentoCabeca() {
    this.atualizaEstadoCabeca();
  }

}
