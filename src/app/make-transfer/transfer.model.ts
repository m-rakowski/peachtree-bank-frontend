import {AccountAmountCurrency} from "../account-amount-currency";

export interface TransferDto {
  fromAccount: string;
  toAccount: string;
  account: AccountAmountCurrency;
}
