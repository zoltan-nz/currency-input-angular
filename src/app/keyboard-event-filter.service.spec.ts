import { TestBed } from '@angular/core/testing';

import { KeyboardEventFilterService, KeyCombo } from './keyboard-event-filter.service';

describe('KeyboardEventFilterService', () => {
  let service: KeyboardEventFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardEventFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const windowsKeyCombosTestCases: [KeyCombo, boolean][] = [
    [{ key: 'a', ctrlKey: true }, true], // Allow: Ctrl+A
    [{ key: 'c', ctrlKey: true }, true], // Allow: Ctrl+C
    [{ key: 'v', ctrlKey: true }, true], // Allow: Ctrl+V
    [{ key: 'x', ctrlKey: true }, true], // Allow: Ctrl+X
    [{ key: 'z', ctrlKey: true }, false],
  ];

  windowsKeyCombosTestCases.forEach(test => {
    const [{ key, ctrlKey }, expected] = test;
    it(`should return ${expected} with Windows key combinations: ${key}, ${ctrlKey}`, () => {
      const keyboardEvent = new KeyboardEvent('keydown', { key, ctrlKey });
      expect(service.isKeyComboAllowed(keyboardEvent)).toBe(expected);
    });
  });

  const macKeyCombosTestCases: [KeyCombo, boolean][] = [
    [{ key: 'a', metaKey: true }, true], // Allow: Cmd+A (Mac)
    [{ key: 'c', metaKey: true }, true], // Allow: Cmd+C (Mac)
    [{ key: 'v', metaKey: true }, true], // Allow: Cmd+V (Mac)
    [{ key: 'x', metaKey: true }, true], // Allow: Cmd+X (Mac)
  ];

  macKeyCombosTestCases.forEach(([{ key, metaKey }, expected]) =>
    it(`should return ${expected} with Mac key combinations: ${key}, ${metaKey}`, () => {
      const keyboardEvent = new KeyboardEvent('keydown', { key, metaKey });
      expect(service.isKeyComboAllowed(keyboardEvent)).toBe(expected);
    }),
  );

  const numberKeyTestCases: [string, boolean][] = [
    ['0', true],
    ['1', true],
    ['2', true],
    ['3', true],
    ['4', true],
    ['5', true],
    ['6', true],
    ['7', true],
    ['8', true],
    ['9', true],
    ['a', false],
    ['b', false],
    ['c', false],
    ['d', false],
    ['e', false],
    ['f', false],
    ['+', false],
    ['-', false],
    ['*', false],
    ['/', false],
    ['=', false],
    [' ', false],
  ];

  numberKeyTestCases.forEach(([key, expected]) =>
    it(`should return ${expected} for ${key}`, () => {
      const keyboardEvent = new KeyboardEvent('keydown', { key });
      expect(service.isNumberKey(keyboardEvent)).toBe(expected);
    }),
  );
});
