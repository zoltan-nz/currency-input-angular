import { TestBed } from '@angular/core/testing';
import { CurrencyFormatterService } from './currency-formatter.service';

describe('CurrencyFormatterService', () => {
  let service: CurrencyFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const plainValueTestCases: [
    newPlainValue: null | undefined | string,
    expectedPlainValue: string,
    expectedFormattedValue: string,
  ][] = [
    [null, '', ''],
    [undefined, '', ''],
    ['', '', ''],
    ['0', '0', '0.00'],
    ['0.0', '0.0', '0.00'],
    ['0.00', '0.00', '0.00'],
    ['1', '1', '1.00'],
    ['.1', '.1', '0.10'],
    ['1234567', '1234567', '1,234,567.00'],
    ['1234567.8', '1234567.8', '1,234,567.80'],
    ['1234567.89', '1234567.89', '1,234,567.89'],
    ['1234567.896', '1234567.896', '1,234,567.90'],
    ['1234567.894', '1234567.894', '1,234,567.89'],
  ];

  plainValueTestCases.forEach(([newPlainValue, expectedPlainValue, expectedFormattedValue]) => {
    it(`set #plainValue ${newPlainValue}, expected plainValue: ${expectedFormattedValue}, expected formattedValue ${expectedFormattedValue}`, () => {
      service.plainValue = newPlainValue;
      expect(service.plainValue).toEqual(expectedPlainValue);
      expect(service.formattedValue).toEqual(expectedFormattedValue);
    });
  });

  const formattedValueTestCases: [
    newFormattedValue: null | undefined | string,
    expectedPlainValue: string,
    expectedFormattedValue: string,
  ][] = [
    [null, '', ''],
    [undefined, '', ''],
    ['', '', ''],
    ['0', '0.00', '0.00'],
    ['0.0', '0.00', '0.00'],
    ['0.00', '0.00', '0.00'],
    ['.1', '0.10', '0.10'],
    ['1', '1.00', '1.00'],
    ['1234567', '1234567.00', '1,234,567.00'],
    ['1234567.8', '1234567.80', '1,234,567.80'],
    ['1234567.89', '1234567.89', '1,234,567.89'],
    ['1234567.896', '1234567.89', '1,234,567.89'],
    ['1234567.894', '1234567.89', '1,234,567.89'],
    ['$1,234,567.894', '1234567.89', '1,234,567.89'],
    ['NZD   $    1,234,567.894', '1234567.89', '1,234,567.89'],
    ['Some text -$    1, 2, 3 , 4 , 5 , 6 , 7.894', '1234567.89', '1,234,567.89'],
    ['-$1,234,567.894', '1234567.89', '1,234,567.89'],
    ['-$1.234.567.894', '1.23', '1.23'],
    ['no any number at all', '', ''],
    ['<img src="cute-cat.jpg">', '', ''],
  ];

  formattedValueTestCases.forEach(([newFormattedValue, expectedPlainValue, expectedFormattedValue]) => {
    it(`set #formattedValue ${newFormattedValue}, expected plainValue: ${expectedPlainValue}, expected formattedValue ${expectedFormattedValue}`, () => {
      service.formattedValue = newFormattedValue;
      expect(service.plainValue).toEqual(expectedPlainValue);
      expect(service.formattedValue).toEqual(expectedFormattedValue);
    });
  });
});
