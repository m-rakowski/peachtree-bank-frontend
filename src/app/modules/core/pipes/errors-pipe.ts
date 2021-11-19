import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorsPipe',
})
export class ErrorsPipe implements PipeTransform {
  errorTranslations = new Map<string, string>();

  constructor() {
    this.errorTranslations.set('required', 'This field is required');
    this.errorTranslations.set('min', 'Value has to be greater than 0');
    this.errorTranslations.set('pattern', 'Incorrect number');
  }

  transform(
    errorsObject: { [error: string]: boolean },
    ...args: unknown[]
  ): unknown {
    return Object.keys(errorsObject)
      .map((error) => this.translateError(error))
      .join('\n');
  }

  private translateError(error: string): string {
    return this.errorTranslations.get(error) || error;
  }
}
