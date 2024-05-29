import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) { }

  showError(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['error-snackbar']
    });
  }
}
