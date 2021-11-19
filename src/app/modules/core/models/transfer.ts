import { AccountAmountCurrency } from './account-amount-currency';

export interface TransferDto {
  fromAccount: AccountAmountCurrency;
  toAccount: string;
  amount: AccountAmountCurrency;
}
