import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Transfer } from '../../../../mock-data/transfer.model';
import { AccountAmountCurrency } from '../models/account-amount-currency';
import { TransferDto } from '../models/transfer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { transactions } from '../../../../mock-data/transactions';

@Injectable({
  providedIn: 'root',
})
export class MockedBackendService {
  constructor(private httpClient: HttpClient) {}
  private _transfers: Transfer[] = [];

  get transfers(): Observable<Transfer[]> {
    return of(this._transfers);
  }

  private _account: AccountAmountCurrency = {
    amount: 1234.56,
    currencyCode: 'EUR',
  };

  getAccount(): Observable<AccountAmountCurrency> {
    return of(this._account);
  }

  getAllTransfers(): Observable<Transfer[]> {
    return of(this._transfers);
  }

  postTransfer(
    value: TransferDto
  ): Observable<{ transfer: Transfer; account: AccountAmountCurrency }> {
    const newTransfer: Transfer = {
      dates: {
        valueDate: new Date().getTime(),
      },
      categoryCode: '#fbbb1b',
      transaction: {
        type: 'Online Transfer',
        creditDebitIndicator: 'indicator',
        amountCurrency: {
          amount: -1 * value.amount.amount,
          currencyCode: value.amount.currencyCode,
        },
      },
      merchant: {
        name: value.toAccount,
        accountNumber: 'my account number',
      },
    };

    this._transfers = [...this._transfers, newTransfer];

    this._account = {
      ...this._account,
      amount: this._account.amount - value.amount.amount,
    };

    return of({ transfer: newTransfer, account: this._account });
  }

  initDb(): Promise<any> {
    return this.httpClient
      .get<Transfer[]>('/api/transfers')
      .toPromise()
      .then((transfers) => {
        if (transfers) {
          this._transfers = transfers;
        }
      })
      .catch((err) => {
        this._transfers = transactions;
      });
  }
}
