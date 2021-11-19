import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {getCurrencySymbol} from "@angular/common";

@Component({
  selector: 'app-custom-currency-input',
  templateUrl: './custom-currency-input.component.html',
  styleUrls: ['./custom-currency-input.component.scss']
})
export class CustomCurrencyInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() currencyControl: FormControl;
  @Input() placeholder: string = '';
  @Input() fieldName: string;
  @Input() fieldTitle: string;
  currencyCodes = ['EUR'];

  constructor() {
  }

  ngOnInit(): void {
  }

  getCurrencySymbol = getCurrencySymbol;
}
