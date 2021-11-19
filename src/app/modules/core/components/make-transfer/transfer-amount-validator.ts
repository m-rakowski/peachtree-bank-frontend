import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function conditionalValidator(
  predicate: () => boolean,
  validator: any
): any {
  return (formControl: FormControl) => {
    if (!formControl.parent) {
      return null;
    }
    if (predicate()) {
      return validator(formControl);
    }
    return null;
  };
}

export function notEnoughBalanceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return { notEnoughBalance: { value: control.value } };
  };
}
