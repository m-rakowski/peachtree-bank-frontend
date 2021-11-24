import { AppState } from '../model/app-state';
import { selectAccount, selectTransfers } from './transfer.selectors';
import { accountMock } from '../../../mock-data/account-mock';

describe('TransferSelectors', () => {
  describe('selectTransfers', () => {
    it('should return sorted transfers as an array', () => {
      const appState: AppState = {
        transfersFeature: {
          transfers: transfers,
          account: accountMock,
        },
      };
      expect(selectTransfers(appState)).toEqual(sortedTransfers);
    });
  });
  describe('selectAccount', () => {
    it('should return account', () => {
      const appState: AppState = {
        transfersFeature: {
          transfers: transfers,
          account: accountMock,
        },
      };
      expect(selectAccount(appState)).toEqual(accountMock);
    });
  });
});

const t1 = {
  categoryCode: '#12a580',
  dates: {
    valueDate: 2,
  },
  transaction: {
    amountCurrency: {
      amount: 5000,
      currencyCode: 'EUR',
    },
    type: 'Salaries',
    creditDebitIndicator: 'CRDT',
  },
  merchant: {
    name: 'Backbase',
    accountNumber: 'SI64397745065188826',
  },
};
const t2 = {
  categoryCode: '#12a580',
  dates: {
    valueDate: 1,
  },
  transaction: {
    amountCurrency: {
      amount: 5000,
      currencyCode: 'EUR',
    },
    type: 'Salaries',
    creditDebitIndicator: 'CRDT',
  },
  merchant: {
    name: 'Backbase',
    accountNumber: 'SI64397745065188826',
  },
};
const t3 = {
  categoryCode: '#12a580',
  dates: {
    valueDate: 3,
  },
  transaction: {
    amountCurrency: {
      amount: 5000,
      currencyCode: 'EUR',
    },
    type: 'Salaries',
    creditDebitIndicator: 'CRDT',
  },
  merchant: {
    name: 'Backbase',
    accountNumber: 'SI64397745065188826',
  },
};
const transfers = [t1, t2, t3];
const sortedTransfers = [t3, t1, t2];
