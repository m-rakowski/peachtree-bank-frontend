import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export function BalanceHasToBeSufficientValidator(
  formControl: AbstractControl
) {
  if (!formControl.parent) {
    return null;
  }

  // @ts-ignore
  if (formControl.parent.get('balanceAmount').value <= 500) {
    return notEnoughBalanceValidator;
  }
  return null;
}

export function notEnoughBalanceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return { notEnoughBalance: { value: control.value } };
  };
}
