import { ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthorizationService} from "./services/authorization.service";

export const authGuard = (route: ActivatedRouteSnapshot, activatedRoute: RouterStateSnapshot) => {
  // second check for case when user clears his localStorage
  const isAuthorized = inject(AuthorizationService).isAuthorized$.value;
  const router = inject(Router);
  if (/authorization/.test(activatedRoute.url)) {
      if (isAuthorized) { router.navigate(['main', 'posts'], {relativeTo: null}); return false; }
      else { return  true; }
      } else if (/main/.test(activatedRoute.url)) {
      if (isAuthorized) { return  true; }
      else { router.navigate(['authorization'], {relativeTo: null}); return  false}
    }
  return true;
}
