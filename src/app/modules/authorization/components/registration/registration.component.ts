import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import {AuthorizationService} from "../../../../shared/services/authorization.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MyValidatorsService} from "../../../../shared/services/my-validators.service";
import {combineLatest, filter} from "rxjs";
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
    private route: ActivatedRoute,
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
    // asyncValidators only work with finite observables, so I've made a custom realisation
    combineLatest([
      this.form.controls['password'].valueChanges,
      this.form.controls['repeatPassword'].valueChanges
    ]).pipe(
      filter(() => !!this.form.controls['password'].value && !!this.form.controls['repeatPassword'].value),
      takeUntilDestroyed(this.destroyRef)
    )
      .subscribe(([fCurrent, sCurrent]) => {
        if (fCurrent !== sCurrent) {
          this.form.controls['password'].setErrors({...this.form.controls['password'].errors, mismatchedPasswords: true});
          this.form.controls['repeatPassword'].setErrors({...this.form.controls['repeatPassword'].errors, mismatchedPasswords: true});
        } else {
          const fNewErrors = {...this.form.controls['password'].errors};
          if (this.form.controls['password'].hasError('mismatchedPasswords')) { delete fNewErrors['mismatchedPasswords']; }
          const sNewErrors = {...this.form.controls['repeatPassword'].errors};
          if (this.form.controls['repeatPassword'].hasError('mismatchedPasswords')) { delete sNewErrors['mismatchedPasswords']; }
          this.form.controls['password'].setErrors(Object.keys(fNewErrors).length ? fNewErrors : null);
          this.form.controls['repeatPassword'].setErrors(Object.keys(sNewErrors).length ? sNewErrors : null);
          this.form.updateValueAndValidity();
        }
      })
    // this.form.updateValueAndValidity();
  }

  protected registrate() {
    this.authS.registrate({login: this.form.controls['login'].value as string, password: this.form.controls['password'].value as string});
    this.router.navigate(['../', 'login'], {relativeTo: this.route});
  }
}
