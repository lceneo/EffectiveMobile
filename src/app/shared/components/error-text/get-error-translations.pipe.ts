import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {IErrorInst} from "./error-text.component";

@Pipe({
  name: 'getErrorTranslations',
  standalone: true
})
export class GetErrorTranslationsPipe implements PipeTransform {

  constructor(
    private translateS: TranslateService
  ) {
  }
  transform(errorNames: IErrorInst[]): string {
    return errorNames.map(err => this.translateS.instant(err.translationPath, err.params))
      .reduce((acc: string, err) => acc += err + ' ;', '').slice(0, -1);
  }
}
