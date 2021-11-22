import { createReducer, on } from '@ngrx/store';
import {
  executeTransferSuccessAction,
  loadAllTransfersSuccessAction,
} from '../actions/transfer.actions';
import { AccountAmountCurrency } from '../../modules/core/models/account-amount-currency';
import { Transfer } from '../../../mock-data/transfer.model';

export const initialState: TransfersState = {
  account: {
    amount: 0,
    currencyCode: 'EUR',
  },
  transfers: [],
};

export interface TransfersState {
  transfers: Transfer[];
  account: AccountAmountCurrency;
}

export const transfersReducers = createReducer<TransfersState>(
  initialState,
  on(executeTransferSuccessAction, (state, action) => {
    return {
      ...state,
      transfers: [...state.transfers, action.transfer],
      account: action.account,
    };
  }),
  on(loadAllTransfersSuccessAction, (state, action) => {
    const newState = {
      ...state,
      transfers: [...state.transfers, ...action.transfers],
      account: action.account,
    };
    return newState;
  })
);
