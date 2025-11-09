import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appCapitalized]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: Capitalized,
    multi: true
  }]
})
export class Capitalized implements Validator{

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value){
      const valid = new RegExp("^[A-Z][a-z]*$").test(control.value)
      return valid? null: {notCapitalized: true};
    }
    return null
  }

}
