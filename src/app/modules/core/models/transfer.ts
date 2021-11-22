import { AccountAmountCurrency } from './account-amount-currency';

export interface TransferDto {
  toAccount: string;
  amount: AccountAmountCurrency;
}
