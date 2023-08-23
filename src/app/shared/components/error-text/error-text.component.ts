import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationErrors} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {GetErrorTranslationsPipe} from "./get-error-translations.pipe";
import {TranslateService} from "@ngx-translate/core";
import {takeUntil, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-error-text',
  standalone: true,
  imports: [CommonModule, MatInputModule, GetErrorTranslationsPipe],
  templateUrl: './error-text.component.html',
  styleUrls: ['./error-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorTextComponent implements OnInit{

  constructor(
    private translateS: TranslateService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) {
  }
  ngOnInit(): void {
    this.translateS.onLangChange.pipe(
      tap(() => this.cdr.markForCheck()),
      takeUntilDestroyed(this.destroyRef)
    )
      .subscribe(() => this.errorsText = [...this.errorsText]);
  }
  @Input() set errors (errors: ValidationErrors) {
    this.errorsText = [];
    Object.entries(errors).forEach(([key, error]) => {
      switch (key){
        case 'required':
          this.errorsText.push({translationPath: 'errors.required'});
          break;
        case 'minlength':
          this.errorsText.push({translationPath: `errors.minLength`, params: {
            requiredLength: error.requiredLength,
            actualLength: error.actualLength
          }});
          break;
        case 'maxlength':
          this.errorsText.push({translationPath:`errors.maxLength`, params: {
              requiredLength: error.requiredLength,
              actualLength: error.actualLength
            }});
          break;
        case 'pattern':
          this.errorsText.push({translationPath:`errors.pattern`, params: {
              requiredPattern: error.requiredPattern
            }})
          break;
        case 'mismatchedPasswords':
          this.errorsText.push({translationPath:`errors.mismatchedPasswords`});
          break;
      }
    })
  }

  protected errorsText: IErrorInst[] = [];
}

export interface IErrorInst {
  translationPath: string;
  params?: {
    [p: string] : any
  }
}
