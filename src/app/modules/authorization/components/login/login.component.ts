import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthorizationService, IAuthorizationCredentials} from "../../../../shared/services/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../authorization.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent{

  constructor(
    private authS: AuthorizationService,
    private router: Router
  ) {}
  protected form = new FormGroup({
    login: new FormControl('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    password: new FormControl('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')])
  });

  protected login() {
    if (this.authS.login(this.form.value as IAuthorizationCredentials)) {
      console.log(this.router.routerState.root)
      this.router.navigate(['main'], {relativeTo: null})
    }
  }
}
