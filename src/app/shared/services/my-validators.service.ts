import { Injectable } from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MyValidatorsService {
  constructor() { }

   sameValues(secondControl: AbstractControl) {
    return (control: AbstractControl) => {
      return secondControl.touched && control.value !== secondControl.value ? { mismatchedPasswords: true} : null;
    }
  }
}
