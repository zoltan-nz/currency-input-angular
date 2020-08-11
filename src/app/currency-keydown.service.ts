import { Injectable } from '@angular/core';
import { KeyboardEventFilterService } from './keyboard-event-filter.service';

const INTEGER_LENGTH_LIMIT = 13;
const DECIMAL_LENGTH_LIMIT = 2;

@Injectable({
  providedIn: 'root',
})
export class CurrencyKeydownService extends KeyboardEventFilterService {
  constructor() {
    super();
  }

  private static isDotAllowedOnCursorPlace(value: string, selectionEnd: number | null): boolean {
    if (selectionEnd === null) {
      selectionEnd = 0;
    }
    return value.length - 2 <= selectionEnd;
  }

  private static isTheFirstDot(value: string): boolean {
    return !/\./.test(value);
  }

  private static splitIntegerDecimal(value: string): string[] {
    return value.split('.');
  }

  private static isInputEmpty(value: string): boolean {
    return !value;
  }

  private static isTextSelected(selectionStart: number | null, selectionEnd: number | null): boolean {
    return selectionStart !== selectionEnd;
  }

  private static isLessThanIntegerMaxLength(value: string): boolean {
    const [integerPart, decimalPart] = CurrencyKeydownService.splitIntegerDecimal(value);
    return integerPart === undefined || integerPart?.length < INTEGER_LENGTH_LIMIT;
  }

  private static isDecimal(value: string, selectionEnd: number | null): boolean {
    const [integerPart, decimalPart] = CurrencyKeydownService.splitIntegerDecimal(value);
    if (selectionEnd === null) {
      selectionEnd = 0;
    }
    return decimalPart !== undefined && integerPart?.length < selectionEnd;
  }

  private static isLessThanDecimalMaxLength(value: string): boolean {
    const [integerPart, decimalPart] = CurrencyKeydownService.splitIntegerDecimal(value);
    return decimalPart === undefined || decimalPart?.length < DECIMAL_LENGTH_LIMIT;
  }

  private static isDotSelectedForOverwrite(
    value: string,
    selectionStart: number | null,
    selectionEnd: number | null,
  ): boolean {
    return (
      CurrencyKeydownService.isTextSelected(selectionStart, selectionEnd) &&
      CurrencyKeydownService.isDotAllowedOnCursorPlace(value, selectionEnd)
    );
  }

  private static processDigit($event: KeyboardEvent): boolean {
    const target: HTMLInputElement = $event.target as HTMLInputElement;
    const { value, selectionStart, selectionEnd } = target;

    if (CurrencyKeydownService.isInputEmpty(value)) {
      return true;
    }
    if (CurrencyKeydownService.isTextSelected(selectionStart, selectionEnd)) {
      return true;
    }
    if (CurrencyKeydownService.isDecimal(value, selectionEnd)) {
      return CurrencyKeydownService.isLessThanDecimalMaxLength(value);
    }
    return CurrencyKeydownService.isLessThanIntegerMaxLength(value);
  }

  private static isDot(key: string): boolean {
    return /\./.test(key);
  }

  private static processDot($event: KeyboardEvent): boolean {
    const target: HTMLInputElement = $event.target as HTMLInputElement;
    const { value, selectionStart, selectionEnd } = target;

    if (CurrencyKeydownService.isInputEmpty(value)) {
      return true;
    }
    if (CurrencyKeydownService.isDotSelectedForOverwrite(value, selectionStart, selectionEnd)) {
      return true;
    }
    if (CurrencyKeydownService.isDotAllowedOnCursorPlace(value, selectionEnd)) {
      return CurrencyKeydownService.isTheFirstDot(value);
    }

    return false;
  }

  public isKeypressAllowed($event: KeyboardEvent): boolean {
    const key = $event.key;

    if (CurrencyKeydownService.isDot(key)) {
      return CurrencyKeydownService.processDot($event);
    }
    if (this.isNumberKey($event)) {
      return CurrencyKeydownService.processDigit($event);
    }

    if (this.isKeyComboAllowed($event)) {
      return true;
    }
    return this.isNavigationKey($event);
  }
}
