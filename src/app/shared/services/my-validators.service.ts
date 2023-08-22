import { Injectable } from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {map, of, startWith, take, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MyValidatorsService {
  constructor() { }

   sameValues$(secondControl: AbstractControl) {
    return (control: AbstractControl) => {
      return !secondControl.touched ? of(null) : secondControl.valueChanges
        .pipe(
          startWith(secondControl.value),
          map(sControlValue => sControlValue !== control.value ? { mismatchedPasswords: true} : null),
          take(1)
        );
    }
  }
}
