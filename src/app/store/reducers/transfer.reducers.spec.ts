import {
  initialState,
  transfersReducers,
  TransfersState,
} from './transfer.reducers';
import {
  executeTransferSuccessAction,
  loadAllTransfersSuccessAction,
} from '../actions/transfer.actions';
import { transactions } from '../../../mock-data/transactions';
import { accountMock } from '../../../mock-data/account-mock';

describe('TransfersReducers', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'nonexistent',
      };

      const state = transfersReducers(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('executeTransferActionSuccess', () => {
    it('should make sure that when the action is dispatched a reducer catches it and reconfigures the state', () => {
      const initialState: TransfersState = {
        account: accountMock,
        transfers: transactions,
      };
      const newState: TransfersState = {
        account: accountMock,
        transfers: [...transactions, transactions[0]],
      };

      const action = executeTransferSuccessAction({
        transfer: transactions[0],
        account: accountMock,
      });

      const state = transfersReducers(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
  describe('loadAllTransfersSuccessAction', () => {
    it('state empty, then load transfers', () => {
      const initialState: TransfersState = {
        account: {
          amount: 0,
          currencyCode: 'EUR',
        },
        transfers: [],
      };
      const newState: TransfersState = {
        account: accountMock,
        transfers: transactions,
      };

      const action = loadAllTransfersSuccessAction({
        account: accountMock,
        transfers: transactions,
      });

      const state = transfersReducers(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
    it('state not empty, then load transfers', () => {
      const initialState: TransfersState = {
        account: {
          amount: 0,
          currencyCode: 'EUR',
        },
        transfers: transactions,
      };
      const newState: TransfersState = {
        account: accountMock,
        transfers: transactions,
      };

      const action = loadAllTransfersSuccessAction({
        account: accountMock,
        transfers: transactions,
      });

      const state = transfersReducers(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
