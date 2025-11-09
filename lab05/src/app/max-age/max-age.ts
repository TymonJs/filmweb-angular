import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMaxAge]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaxAge,
    multi: true
  }]
})
export class MaxAge implements Validator{

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value){
      const allowed = new Date().getFullYear() - 100;
      const actual = +control.value
      return actual>=allowed? null: {tooOld: true}
    }

    return null;
  }

}
