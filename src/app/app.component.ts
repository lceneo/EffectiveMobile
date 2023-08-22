import { Component } from '@angular/core';
import {PreviousRouteService} from "./shared/services/previous-route.service";
import {AuthorizationService} from "./shared/services/authorization.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private previousRouteS: PreviousRouteService,
    private translateS: TranslateService,
    private authS: AuthorizationService,
    private router: Router
  ) {
    translateS.addLangs(['en', 'ru']);
  }

  protected isAuthorized$ = this.authS.isAuthorized$;

  protected unauthorize(){
    this.authS.signOut();
    this.router.navigate(['authorization'], {relativeTo: null});
  }
}
