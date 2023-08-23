import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";


export interface IAuthorizationCredentials {
  login: string,
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public isAuthorized$ = new BehaviorSubject(!!this.isLoggedIn());
  constructor(
    private translateS: TranslateService
  ) { }

  login(credentials: IAuthorizationCredentials) {
    const savedCredentials = this.getSavedCredentials();
     if (savedCredentials && credentials.login in savedCredentials && savedCredentials[credentials.login] === credentials.password) {
       localStorage.setItem('isLoggedIn', 'true');
       this.isAuthorized$.next(true);
       return true;
     } else {
       throw new Error(this.translateS.instant('errors.accountNotFound'));
     }
  }

  registrate(credentials: IAuthorizationCredentials) {
    const savedCredentials = localStorage.getItem('savedCredentials');
    const savedCredentialsMap: {[login: string]: string} = savedCredentials ? JSON.parse(savedCredentials) : {};
    if (credentials.login in savedCredentialsMap) {
      throw new Error(this.translateS.instant('errors.existingAccount'));
    } else {
      savedCredentialsMap[credentials.login] = credentials.password;
    }
    localStorage.setItem('savedCredentials', JSON.stringify(savedCredentialsMap));
  }

  signOut() {
    localStorage.removeItem('isLoggedIn');
    this.isAuthorized$.next(false);
  }

  private getSavedCredentials() : {[login: string]: string} | null {
    const credentials = localStorage.getItem('savedCredentials');
    return credentials ? JSON.parse(credentials) : null;
  }

  private isLoggedIn(){
    const isLogged = localStorage.getItem('isLoggedIn');
    return isLogged ? JSON.parse(isLogged) : false;
  }
}
