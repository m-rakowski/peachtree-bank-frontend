export interface Dates {
  valueDate: number | string;
}

export interface AmountCurrency {
  amount: number;
  currencyCode: string;
}

export interface Transaction {
  amountCurrency: AmountCurrency;
  type: string;
  creditDebitIndicator: string;
}

export interface Merchant {
  name: string;
  accountNumber: string;
}

export interface Transfer {
  categoryCode: string;
  dates: Dates;
  transaction: Transaction;
  merchant: Merchant;
}
