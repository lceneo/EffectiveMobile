import { Component } from '@angular/core';
import {PreviousRouteService} from "./shared/services/previous-route.service";
import {AuthorizationService} from "./shared/services/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private previousRouteS: PreviousRouteService,
    private authS: AuthorizationService,
    private router: Router
  ) {}

  protected isAuthorized$ = this.authS.isAuthorized$;

  protected unauthorize(){
    this.authS.signOut();
    this.router.navigate(['authorization'], {relativeTo: null});
  }
}
