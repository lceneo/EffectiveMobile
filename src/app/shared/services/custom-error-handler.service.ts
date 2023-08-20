import {ErrorHandler, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService implements ErrorHandler {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  handleError(error: Error): void {
    this.snackBar.open(error.message, 'Закрыть', { duration: 1500 });
  }
}
