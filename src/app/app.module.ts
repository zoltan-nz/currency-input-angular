import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CurrencyFormatDirective } from './currency-format.directive';
import { CurrencyInputComponent } from './currency-input.component';

@NgModule({
  declarations: [AppComponent, CurrencyInputComponent, CurrencyFormatDirective],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
