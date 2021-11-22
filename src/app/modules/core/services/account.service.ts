import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountAmountCurrency } from '../models/account-amount-currency';
import { MockedBackendService } from './mocked-backend.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private mockedBackendService: MockedBackendService) {}
  getAccount(): Observable<AccountAmountCurrency> {
    return this.mockedBackendService.getAccount();
  }
}
