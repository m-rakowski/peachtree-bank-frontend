import { createAction, props, union } from '@ngrx/store';
import { Transfer } from '../../../mock-data/transfer.model';
import { TransferDto } from '../../modules/core/models/transfer';
import { AccountAmountCurrency } from '../../modules/core/models/account-amount-currency';

export const addTransferAction = createAction(
  '[Transfer] addTransferAction',
  props<{ transferDto: TransferDto }>()
);
export const addTransferSuccessAction = createAction(
  '[Transfer] addTransferSuccessAction',
  props<{ transfer: Transfer; account: AccountAmountCurrency }>()
);
export const loadAllTransfersAction = createAction(
  '[Transfer] loadAllTransfersAction'
);
export const loadAllTransfersSuccessAction = createAction(
  '[Transfer] loadAllTransfersSuccessAction',
  props<{
    transfers: Transfer[];
    account: AccountAmountCurrency;
  }>()
);
const all = union({
  addTransferAction,
  addTransferSuccessAction,
  loadAllTransfersAction,
  loadAllTransfersSuccessAction,
});
export type TransferActionsUnion = typeof all;
