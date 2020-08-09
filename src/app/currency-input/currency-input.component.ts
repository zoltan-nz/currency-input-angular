import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFormControlClass } from '../abstract-form-control-class/abstract-form-control.class';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true,
    },
  ],
})
export class CurrencyInputComponent extends AbstractFormControlClass implements OnInit {
  @Input() name = '';
  @Input() label = '';

  id = '';

  constructor() {
    super();
  }

  get showError(): boolean {
    return this.form.invalid && (this.form.dirty || this.form.touched);
  }

  ngOnInit(): void {
    this.id = `${this.name}-currency-input`;
  }
}
