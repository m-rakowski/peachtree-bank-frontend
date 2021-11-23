import { Injectable } from '@angular/core';
import { Transfer } from '../../../../mock-data/transfer.model';
import { Observable } from 'rxjs';
import { TransferDto } from '../models/transfer';
import { MockedBackendService } from './mocked-backend.service';
import { AccountAmountCurrency } from '../models/account-amount-currency';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(private mockedBackendService: MockedBackendService) {}

  getAll(): Observable<Transfer[]> {
    return this.mockedBackendService.getAllTransfers();
  }

  executeTransfer(
    value: TransferDto
  ): Observable<{ transfer: Transfer; account: AccountAmountCurrency }> {
    return this.mockedBackendService.postTransfer(value);
  }
}
