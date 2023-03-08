import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appFieldValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: FieldValidatorDirective,
    multi: true
  }]

})
export class FieldValidatorDirective implements Validator {
  validate(name: AbstractControl): { [key: string]: any } | null {
    if (name.value && name.value.length != 10) {
      return { 'NamefieldEmpty': true };
    }
    return null;
  }
}