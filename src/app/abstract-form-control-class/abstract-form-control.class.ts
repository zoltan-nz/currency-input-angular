import { AbstractControl, ControlValueAccessor, FormControl, ValidationErrors, Validator } from '@angular/forms';

export abstract class AbstractFormControlClass implements ControlValueAccessor, Validator {
  form: FormControl = new FormControl('');
  isDisabled = false;
  value: any;

  protected constructor() {}

  onValidatorChange: (..._: any[]) => any = () => {};

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  writeValue(value: any): void {
    this.form.setValue(value);
  }
}
