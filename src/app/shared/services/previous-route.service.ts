import { Injectable } from '@angular/core';
import {Router, RoutesRecognized} from "@angular/router";
import {BehaviorSubject, filter, pairwise} from "rxjs";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {

  // save the previous route
  public previousRoutePath = new BehaviorSubject<string>('');

  constructor(
    private router: Router,
    private location: Location
  ) {

    this.previousRoutePath.next(this.location.path());

    // no sense in unsubscribing cause this subscription needs to be alive for the whole app lifecycle
    this.router.events.pipe(
      filter(e => e instanceof RoutesRecognized),
      pairwise(),
    )
      .subscribe((event: any[]) => {
        this.previousRoutePath.next(event[0].urlAfterRedirects);
      });
  }

  getPreviousRoute(){
    return this.previousRoutePath.value;
  }
}
