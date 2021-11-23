import { AsFormControlPipe } from './as-form-control.pipe';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

describe('AsFormControlPipe', () => {
  it('should have return type of FormControl', () => {
    const pipe = new AsFormControlPipe();

    const formGroup = new FormGroup({
      control: new FormControl(),
    });

    expect(
      pipe.transform(formGroup.get('control') as AbstractControl)
    ).toBeInstanceOf(FormControl);
  });
});
