import { Injectable } from '@angular/core';

export const navigationKeys = [
  'Backspace',
  'Delete',
  'Tab',
  'Escape',
  'Enter',
  'Home',
  'End',
  'ArrowLeft',
  'ArrowRight',
  'Clear',
  'Copy',
  'Paste',
];

enum KEY_COMBO_PARAMS {
  key = 'key',
  ctrlKey = 'ctrlKey',
  metaKey = 'metaKey',
}

export type KeyCombo = {
  [KEY_COMBO_PARAMS.key]: string;
  [KEY_COMBO_PARAMS.ctrlKey]?: boolean;
  [KEY_COMBO_PARAMS.metaKey]?: boolean;
};

export const keyCombinations: KeyCombo[] = [
  { key: 'a', ctrlKey: true }, // Allow: Ctrl+A
  { key: 'c', ctrlKey: true }, // Allow: Ctrl+C
  { key: 'v', ctrlKey: true }, // Allow: Ctrl+V
  { key: 'x', ctrlKey: true }, // Allow: Ctrl+X
  { key: 'a', metaKey: true }, // Allow: Cmd+A (Mac)
  { key: 'c', metaKey: true }, // Allow: Cmd+C (Mac)
  { key: 'v', metaKey: true }, // Allow: Cmd+V (Mac)
  { key: 'x', metaKey: true }, // Allow: Cmd+X (Mac)
];

@Injectable({
  providedIn: 'root',
})
export class KeyboardEventFilterService {
  private navigationKeys = navigationKeys;
  private keyCombinations = keyCombinations;

  constructor() {}

  isNavigationKey(e: KeyboardEvent): boolean {
    return this.navigationKeys.includes(e.key);
  }

  isKeyComboAllowed(e: KeyboardEvent): boolean {
    return this.keyCombinations.some(keyCombo =>
      Object.keys(keyCombo).every(
        keyComboParam => keyCombo[keyComboParam as KEY_COMBO_PARAMS] === e[keyComboParam as KEY_COMBO_PARAMS],
      ),
    );
  }

  isNumberKey(e: KeyboardEvent): boolean {
    return e.key.trim() !== '' && !isNaN(Number(e.key));
  }
}
