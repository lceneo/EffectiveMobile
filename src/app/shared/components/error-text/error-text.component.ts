import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationErrors} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-error-text',
  standalone: true,
  imports: [CommonModule, MatInputModule],
  templateUrl: './error-text.component.html',
  styleUrls: ['./error-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorTextComponent {

  @Input() set errors (errors: ValidationErrors) {
    this.errorsText = '';
    Object.entries(errors).forEach(([key, error]) => {
      switch (key){
        case 'required':
          this.errorsText += 'errors.required';
          break;
        case 'minlength':
          this.errorsText += `errors.minLength`
          break;
        case 'maxlength':
          this.errorsText += `errors.maxlength`
          break;
        case 'pattern':
          this.errorsText += `errors.pattern`
          break;
      }
    })
  }

  protected errorsText: string = '';
}
