import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AccountAmountCurrency } from './account-amount-currency';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  getAccount(): Observable<AccountAmountCurrency> {
    return this.httpClient.get<AccountAmountCurrency>('/api/account');
  }

  send(account: AccountAmountCurrency): Observable<any> {
    return this.getAccount().pipe(
      switchMap((val) =>
        this.httpClient.put('/api/account', {
          amount: val.amount - account.amount,
          currencyCode: val.currencyCode,
        })
      )
    );
  }
}
