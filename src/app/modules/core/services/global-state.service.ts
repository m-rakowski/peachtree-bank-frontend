import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { AccountAmountCurrency } from '../models/account-amount-currency';
import { Transfer } from '../../../../mock-data/transfer.model';
import { TransferService } from './transfer.service';
import { AccountService } from './account.service';
import { TransferDto } from '../models/transfer';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  constructor(
    private transferService: TransferService,
    private accountService: AccountService
  ) {}

  private _transfers: BehaviorSubject<Transfer[]> = new BehaviorSubject([]);

  get transfers(): Observable<Transfer[]> {
    return this._transfers.asObservable();
  }

  private _account: BehaviorSubject<AccountAmountCurrency> =
    new BehaviorSubject({
      amount: 0,
      currencyCode: 'EUR',
    });

  get account(): Observable<AccountAmountCurrency> {
    return this._account.asObservable();
  }

  setAccount(value: AccountAmountCurrency) {
    this._account.next(value);
  }

  setTransfers(value: Transfer[]) {
    this._transfers.next(value);
  }

  sendTransfer(value: TransferDto): Observable<any> {
    return this.transferService
      .send(value)
      .pipe(switchMap(() => this.updateTransfers()));
  }

  sendAccount(account: AccountAmountCurrency): Observable<any> {
    return this.accountService
      .send(account)
      .pipe(switchMap(() => this.updateAccount()));
  }

  updateTransfers(): Observable<any> {
    return this.transferService
      .getAll()
      .pipe(tap((transfers) => this._transfers.next(transfers)));
  }

  updateAccount(): Observable<any> {
    return this.accountService
      .getAccount()
      .pipe(tap((account) => this._account.next(account)));
  }
}
