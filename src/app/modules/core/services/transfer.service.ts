import { Injectable } from '@angular/core';
import { Transfer } from '../../../../mock-data/transfer.model';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TransferDto } from '../models/transfer';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Transfer[]> {
    return this.httpClient.get<Transfer[]>('/api/transactions').pipe(
      map((items) =>
        items.sort(
          (a, b) =>
            new Date(b.dates.valueDate).getTime() -
            new Date(a.dates.valueDate).getTime()
        )
      ),
      catchError((err) => {
        console.error(err);
        return this.getFromMock();
      })
    );
  }

  send(value: TransferDto): Observable<any> {
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

    return this.httpClient.post('/api/transfers', newTransfer);
  }

  private getFromMock(): Observable<Transfer[]> {
    return this.httpClient.get<Transfer[]>('/api/transfers');
  }
}
