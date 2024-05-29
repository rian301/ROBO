import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { RobotStateService } from '../services/robot-state.service';
import { BlinkService } from '../services/blink.service';

@Component({
    selector: 'app-robot-display',
    templateUrl: './robot-display.component.html',
    styleUrls: ['./robot-display.component.css']
})
export class RobotDisplayComponent implements OnInit, AfterViewInit {
    constructor(
        public robotStateService: RobotStateService,
        private blinkService: BlinkService,
        private elRef: ElementRef
    ) { }
    erro: boolean = false;
    estiloBracoEsquerdo: any = {};
    estiloBracoDireito: any = {};
    estiloCabeca: any = {};
    estiloPulsoEsquerdo: any = {};
    estiloPulsoDireito: any = {};

    ngOnInit() {
        this.robotStateService.$temErro.subscribe((valor: boolean) => {
            this.erro = valor;
            this.getClass();
        })
    }

    ngAfterViewInit(): void {
        const leftEye = this.elRef.nativeElement.querySelector('.olho.esquerdo') as HTMLElement;
        const rightEye = this.elRef.nativeElement.querySelector('.olho.direito') as HTMLElement;
        this.blinkService.startBlinking(leftEye, rightEye);
    }

    getClass() {
        this.estiloCabeca = [
            this.robotStateService.cabeca.rotacao === 'Rotação -90°' ? 'rotacao-menor-90' : '',
            this.robotStateService.cabeca.rotacao === 'Rotação -45°' ? 'rotacao-menor-45' : '',
            this.robotStateService.cabeca.rotacao === 'Rotação 45°' ? 'rotacao-45' : '',
            this.robotStateService.cabeca.rotacao === 'Rotação 90°' ? 'rotacao-90' : '',
            this.robotStateService.cabeca.inclinacao === 'Para Cima' ? 'inclinacao-cima' : '',
            this.robotStateService.cabeca.inclinacao === 'Para Baixo' ? 'inclinacao-baixo' : ''
        ]

        this.estiloBracoEsquerdo = [
            this.robotStateService.bracoEsquerdo.cotovelo === 'Levemente Contraído' ? 'cotovelo-esquerdo-levemente-contraido' : '',
            this.robotStateService.bracoEsquerdo.cotovelo === 'Contraído' ? 'cotovelo-esquerdo-contraido' : '',
            this.robotStateService.bracoEsquerdo.cotovelo === 'Fortemente Contraído' ? 'cotovelo-esquerdo-fortemente-contraido' : ''
        ]

        this.estiloBracoDireito = [
            this.robotStateService.bracoDireito.cotovelo === 'Levemente Contraído' ? 'cotovelo-direito-levemente-contraido' : '',
            this.robotStateService.bracoDireito.cotovelo === 'Contraído' ? 'cotovelo-direito-contraido' : '',
            this.robotStateService.bracoDireito.cotovelo === 'Fortemente Contraído' ? 'cotovelo-direito-fortemente-contraido' : ''
        ]

        this.estiloPulsoEsquerdo = [
            this.robotStateService.bracoEsquerdo.pulso === 'Rotação -90°' ? 'pulso-rotacao-menor-90' : '',
            this.robotStateService.bracoEsquerdo.pulso === 'Rotação -45°' ? 'pulso-rotacao-menor-45' : '',
            this.robotStateService.bracoEsquerdo.pulso === 'Rotação 45°' ? 'pulso-rotacao-45' : '',
            this.robotStateService.bracoEsquerdo.pulso === 'Rotação 90°' ? 'pulso-rotacao-90' : '',
            this.robotStateService.bracoEsquerdo.pulso === 'Rotação 135°' ? 'pulso-rotacao-135' : '',
            this.robotStateService.bracoEsquerdo.pulso === 'Rotação 180°' ? 'pulso-rotacao-180' : ''
        ]

        this.estiloPulsoDireito = [
            this.robotStateService.bracoDireito.pulso === 'Rotação -90°' ? 'pulso-rotacao-menor-90' : '',
            this.robotStateService.bracoDireito.pulso === 'Rotação -45°' ? 'pulso-rotacao-menor-45' : '',
            this.robotStateService.bracoDireito.pulso === 'Rotação 45°' ? 'pulso-rotacao-45' : '',
            this.robotStateService.bracoDireito.pulso === 'Rotação 90°' ? 'pulso-rotacao-90' : '',
            this.robotStateService.bracoDireito.pulso === 'Rotação 135°' ? 'pulso-rotacao-135' : '',
            this.robotStateService.bracoDireito.pulso === 'Rotação 180°' ? 'pulso-rotacao-180' : ''
        ]
    }
}
