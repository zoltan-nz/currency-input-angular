import { TestBed } from '@angular/core/testing';

import { CurrencyKeydownService } from './currency-keydown.service';

// key | value | selectionStart | selectionEnd
type KeyDownEventParams = [key: string, value: string, selectionStart: number, selectionEnd: number];
type KeyDownEventTestCase = [keyDownEvent: KeyDownEventParams, expected: boolean];

const createKeyDownEvent = (keyDownEventParams: KeyDownEventParams) => {
  const [key, valueOfInputField, selectionStart, selectionEnd] = keyDownEventParams;
  const keyDownEvent = new KeyboardEvent('keydown', { key });

  const target: HTMLInputElement = document.createElement('input');
  target.value = valueOfInputField;
  target.selectionStart = selectionStart;
  target.selectionEnd = selectionEnd;

  // @ts-ignore
  spyOn<KeyboardEvent>(keyDownEvent, 'target').and.returnValue(target);
  return keyDownEvent;
};

// key | value | selectionStart | selectionEnd | allowed
const testCases: KeyDownEventTestCase[] = [
  [['.', '', 0, 0], true],
  [['Tab', '', 0, 0], true],
  [['a', '', 0, 0], false],
  [['1', '', 0, 0], true],
  [[',', '', 0, 0], false],

  // Only one decimal point
  [['.', '.', 1, 1], false],
  [['.', '1234.2', 6, 6], false],

  // Decimal point can inserted or overwritten with selection
  [['.', '1234567', 1, 1], false],
  [['.', '1234567', 4, 4], false],
  [['.', '1234567', 0, 4], false],
  [['.', '1234567', 5, 5], true],
  [['.', '1234567', 6, 6], true],
  [['.', '1234567', 3, 5], true],
  [['.', '1234567', 0, 7], true],
  [['.', '1234567', 0, 7], true],

  // No more than two decimals
  [['2', '12.34', 5, 5], false],
  [['2', '12.34', 2, 2], true],
  [['3', '12.34', 3, 5], true],

  // Max length
  [['2', '1234567890123', 3, 3], false],
  [['2', '123456789012', 3, 3], true],
  [['.', '1234567890123', 11, 11], true],
  [['.', '1234567890123', 13, 13], true],
  [['4', '1234567890123.', 14, 14], true],
  [['4', '1234567890123.4', 15, 15], true],
  [['4', '1234567890123.44', 16, 16], false],
];

describe('CurrencyKeydownService', () => {
  let service: CurrencyKeydownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyKeydownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow copy paste', () => {
    const keydown = createKeyDownEvent(['v', '', 0, 0]);
    // @ts-ignore
    spyOn<KeyboardEvent>(keydown, 'ctrlKey').and.returnValue(true);
    // @ts-ignore
    spyOn<KeyboardEvent>(keydown, 'metaKey').and.returnValue(true);
    expect(service.isKeypressAllowed(keydown)).toBeTruthy();
  });

  testCases.forEach(([[key, value, selectionStart, selectionEnd], allowed]) => {
    it(`key: ${key}, inputValue: ${value}, selectionStart: ${selectionStart}, selectionEnd: ${selectionEnd}, allowed: ${allowed}`, () => {
      const keyDown = createKeyDownEvent([key, value, selectionStart, selectionEnd]);
      expect(service.isKeypressAllowed(keyDown)).toEqual(allowed);
    });
  });
});
