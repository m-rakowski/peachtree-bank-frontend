import { AccountService } from './account.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockedBackendService } from './mocked-backend.service';
import { TestScheduler } from 'rxjs/testing';
import { AccountAmountCurrency } from '../models/account-amount-currency';
import { of } from 'rxjs';

describe('AccountService', () => {
  let serviceUnderTest: AccountService;
  let dependencySpy: jasmine.SpyObj<MockedBackendService>;
  const stubValue: AccountAmountCurrency = {
    amount: 0.01,
    currencyCode: 'EUR',
  };
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: MockedBackendService,
          useValue: jasmine.createSpyObj('MockedBackendService', [
            'getAccount',
          ]),
        },
      ],
    });
    serviceUnderTest = TestBed.inject(AccountService);
    dependencySpy = TestBed.inject(
      MockedBackendService
    ) as jasmine.SpyObj<MockedBackendService>;

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('getAccount() should return stubValue', () => {
    dependencySpy.getAccount.and.returnValue(of(stubValue));
    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '(a|)';
      const expectedValuesEmitted = { a: stubValue };

      expectObservable(serviceUnderTest.getAccount()).toBe(
        expectedMarble,
        expectedValuesEmitted
      );
    });
  });
});
