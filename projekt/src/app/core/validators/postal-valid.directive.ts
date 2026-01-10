import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPostalValid]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PostalValidator,
    multi: true
  }]
})
export class PostalValidator implements Validator{

  public validate(control: AbstractControl): ValidationErrors | null {
    if (control.value){
      const valid = new RegExp("^[0-9]{2}-[0-9]{3}$").test(control.value as string);
      
return valid? null: {postalInvalid: true};
    }

    return null;
  }

}
