import { Injectable } from '@angular/core';
import { Transfer } from '../mock-data/transfer.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TransferDto } from './make-transfer/transfer.model';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  transfers: Transfer[] = [];

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Transfer[]> {
    return this.httpClient
      .get<Transfer[]>('/api/transfers')
      .pipe(
        map((items) =>
          items.sort(
            (a, b) =>
              new Date(b.dates.valueDate).getTime() -
              new Date(a.dates.valueDate).getTime()
          )
        )
      );
  }

  send(value: TransferDto) {
    const newTransfer: Transfer = {
      dates: {
        valueDate: new Date().getTime(),
      },
      categoryCode: '#fbbb1b',
      transaction: {
        type: 'type',
        creditDebitIndicator: 'indicator',
        amountCurrency: {
          amount: value.amount,
          currencyCode: 'EUR',
        },
      },
      merchant: {
        name: 'me',
        accountNumber: 'my account number',
      },
    };

    return this.httpClient.post('/api/transfers', newTransfer);
  }
}
