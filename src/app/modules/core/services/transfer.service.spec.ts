import { TransferService } from './transfer.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockedBackendService } from './mocked-backend.service';
import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';
import { Transfer } from '../../../../mock-data/transfer.model';
import { transactions } from '../../../../mock-data/transactions';
import { AccountAmountCurrency } from '../models/account-amount-currency';

describe('TransferService', () => {
  let serviceUnderTest: TransferService;
  let dependencySpy: jasmine.SpyObj<MockedBackendService>;
  const getAllTransfersResponse: Transfer[] = transactions;
  const postTransferResponse: {
    transfer: Transfer;
    account: AccountAmountCurrency;
  } = {
    account: {
      amount: 150.0,
      currencyCode: 'EUR',
    },
    transfer: transactions[0],
  };
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MockedBackendService,
          useValue: jasmine.createSpyObj('MockedBackendService', [
            'getAllTransfers',
            'postTransfer',
          ]),
        },
      ],
    });
    serviceUnderTest = TestBed.inject(TransferService);
    dependencySpy = TestBed.inject(
      MockedBackendService
    ) as jasmine.SpyObj<MockedBackendService>;

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('getAll() should return getAllTransfersResponse', () => {
    dependencySpy.getAllTransfers.and.returnValue(of(getAllTransfersResponse));
    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '(a|)';
      const expectedValuesEmitted = { a: getAllTransfersResponse };

      expectObservable(serviceUnderTest.getAll()).toBe(
        expectedMarble,
        expectedValuesEmitted
      );
    });
  });

  it('executeTransfer() should return postTransferResponse when executing a transaction', () => {
    dependencySpy.postTransfer.and.returnValue(of(postTransferResponse));
    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '(a|)';
      const expectedValuesEmitted = { a: postTransferResponse };

      expectObservable(
        serviceUnderTest.executeTransfer({
          amount: {
            amount: 50.0,
            currencyCode: 'EUR',
          },
          toAccount: 'Coca-Cola Inc.',
        })
      ).toBe(expectedMarble, expectedValuesEmitted);
    });
  });
});
