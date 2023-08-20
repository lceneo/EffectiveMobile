import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";


export interface IAuthorizationCredentials {
  login: string,
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public isAuthorized$ = new BehaviorSubject(!!this.getSavedCredentials());
  constructor() { }

  login(credentials: IAuthorizationCredentials) {
    const savedCredentials = this.getSavedCredentials();
     if (savedCredentials && JSON.stringify(savedCredentials) === JSON.stringify(credentials)) {
       this.isAuthorized$.next(true);
       return true;
     } else {
       throw new Error('Аккаунт не найден');
     }
  }

  registrate(credentials: IAuthorizationCredentials) {
    localStorage.setItem('savedCredentials', JSON.stringify(credentials));
  }

  private getSavedCredentials(){
    const credentials = localStorage.getItem('savedCredentials');
    return credentials ? JSON.parse(credentials) : null;
  }
}
