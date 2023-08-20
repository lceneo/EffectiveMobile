import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {AuthorizationService, IAuthorizationCredentials} from "../../../../shared/services/authorization.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, RouterState} from "@angular/router";
import {MyValidatorsService} from "../../../../shared/services/my-validators.service";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../../authorization.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit{

  constructor(
    private authS: AuthorizationService,
    private validatorS: MyValidatorsService,
    private destroyRef: DestroyRef,
    private router: Router
  ) {}

  protected form = new FormGroup({
    login: new FormControl('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    password: new FormControl('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z0-9]+$')]),
    repeatPassword: new FormControl('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')])
  });

  ngOnInit(): void {
    // cannot add sameValuesControl before initialisation of other controls
    this.form.controls['password'].addValidators(this.validatorS.sameValues(this.form.controls['repeatPassword']));
    this.form.controls['repeatPassword'].addValidators(this.validatorS.sameValues(this.form.controls['password']));
    this.form.updateValueAndValidity();
    merge(
      this.form.controls['password'].valueChanges,
      this.form.controls['repeatPassword'].valueChanges
    )
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
      });
  }

  protected registrate() {
    this.authS.registrate({login: this.form.controls['login'].value as string, password: this.form.controls['password'].value as string});
    this.router.navigate(['../', 'authorization', 'login']);
  }
}
