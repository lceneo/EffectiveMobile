import {ErrorHandler, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService implements ErrorHandler {

  constructor(
    private snackBar: MatSnackBar,
    private translateS: TranslateService
  ) { }

  handleError(error: Error): void {
    this.snackBar.open(error.message, this.translateS.instant('snackBar.close'), { duration: 1500 });
  }
}
