import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CurrencyFormatterService } from './currency-formatter.service';
import { CurrencyKeydownService } from './currency-keydown.service';

@Directive({
  selector: '[appCurrencyFormat]',
})
export class CurrencyFormatDirective implements OnInit {
  private readonly el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    private ngControl: NgControl,
    private currencyFormatterService: CurrencyFormatterService,
    private currencyKeydownService: CurrencyKeydownService,
    private renderer2: Renderer2,
  ) {
    this.el = elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.currencyFormatterService.formattedValue = this.ngControl.value;
    this.renderNativeValue(this.currencyFormatterService.formattedValue);
  }

  @HostListener('focus')
  onFocus(): void {
    this.currencyFormatterService.formattedValue = this.el.value;
    this.renderNativeValue(this.currencyFormatterService.plainValue);
  }

  @HostListener('blur')
  onBlur(): void {
    this.currencyFormatterService.formattedValue = this.el.value;

    // Send up the plain value to the host control because the main form doesn't need formatted amount value.
    this.ngControl.control?.setValue(this.currencyFormatterService.plainValue);
    this.renderNativeValue(this.currencyFormatterService.formattedValue);
  }

  @HostListener('keydown', ['$event'])
  onKeydown($event: KeyboardEvent): boolean {
    return this.currencyKeydownService.isKeypressAllowed($event);
  }

  @HostListener('paste', ['$event'])
  onPaste($event: ClipboardEvent): void {
    $event.preventDefault();

    // Browser compatibility. IE11 uses window global object. The standard is using event.
    // @ts-ignore
    // tslint:disable:no-string-literal
    const clipboardData: DataTransfer | null = window['clipboardData'] ? window['clipboardData'] : $event.clipboardData;
    this.currencyFormatterService.formattedValue = clipboardData?.getData('text');

    this.renderNativeValue(this.currencyFormatterService.plainValue);
  }

  private renderNativeValue(value: any): void {
    this.renderer2.setProperty(this.el, 'value', value);
  }
}
