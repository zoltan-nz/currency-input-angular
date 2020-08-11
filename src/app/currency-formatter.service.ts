import { Injectable } from '@angular/core';

const nativeNumberFormatter = new Intl.NumberFormat('en-NZ', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

@Injectable({
  providedIn: 'root',
})
export class CurrencyFormatterService {
  private localPlainValue: string | undefined | null = '';
  private localFormattedValue: string | undefined | null = '';

  constructor() {}

  get plainValue(): string | undefined | null {
    return this.localPlainValue;
  }

  set plainValue(value: string | undefined | null) {
    const proposedFormattedValue = nativeNumberFormatter.format(parseFloat(value as string));

    if (proposedFormattedValue === 'NaN') {
      this.localPlainValue = '';
      this.localFormattedValue = '';
    } else {
      this.localPlainValue = value;
      this.localFormattedValue = proposedFormattedValue;
    }
  }

  get formattedValue(): string | undefined | null {
    return this.localFormattedValue;
  }

  set formattedValue(formattedValue: string | undefined | null) {
    const onlyNumbersAndDot = formattedValue?.toString().replace(/[^0-9.]+/g, '');
    const parsedValues = onlyNumbersAndDot?.match(/(\d*).?(\d?\d?)/);

    if (!parsedValues) {
      this.plainValue = '';
      return;
    }

    const [_, integerPart, decimalPart] = parsedValues;
    this.plainValue = Number(`${integerPart}.${decimalPart}`).toFixed(2);
  }
}
