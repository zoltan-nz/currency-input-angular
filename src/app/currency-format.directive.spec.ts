import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from 'protractor';
import { CurrencyFormatDirective } from './currency-format.directive';
import { CurrencyFormatterService } from './currency-formatter.service';
import { CurrencyKeydownService } from './currency-keydown.service';

@Component({
  template: `<input type="text" appCurrencyFormat />`,
})
class TestComponent {}

describe('CurrencyFormatDirective ', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CurrencyFormatDirective, TestComponent],
      providers: [CurrencyFormatterService, CurrencyKeydownService],
    }).createComponent(TestComponent);

    des = fixture.debugElement.queryAll(By.directive(CurrencyFormatDirective));
  });

  it('should work', () => {
    expect(des.length).toBe(1);
  });

  pending('should change formatted value to plain value in input box when focused');

  pending('should change plain value to formatted value in input box when blur');
});
