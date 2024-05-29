import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BlinkService {

    constructor() { }

    startBlinking(leftEye: HTMLElement, rightEye: HTMLElement): void {
        const blink = () => {
            leftEye.classList.add('piscar');
            rightEye.classList.add('piscar');

            setTimeout(() => {
                leftEye.classList.remove('piscar');
                rightEye.classList.remove('piscar');
            }, 200);

            const nextBlink = Math.random() * 4000 + 1000;
            setTimeout(blink, nextBlink);
        };

        blink();
    }
}
