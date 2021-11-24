import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-custom-currency-input',
  templateUrl: './custom-currency-input.component.html',
  styleUrls: ['./custom-currency-input.component.scss'],
})
export class CustomCurrencyInputComponent {
  @Input() amountControl: FormControl;
  @Input() currencyControl: FormControl;
  @Input() placeholder: string = '';
  @Input() fieldName: string;
  @Input() fieldTitle: string;

  currencyCodes = ['EUR'];
  getCurrencySymbol = getCurrencySymbol;
}
