import { createAction, props, union } from '@ngrx/store';
import { Transfer } from '../../../mock-data/transfer.model';
import { TransferDto } from '../../modules/core/models/transfer';
import { AccountAmountCurrency } from '../../modules/core/models/account-amount-currency';

export const executeTransferAction = createAction(
  '[Transfer] executeTransferAction',
  props<{ transferDto: TransferDto }>()
);
export const executeTransferSuccessAction = createAction(
  '[Transfer] executeTransferSuccessAction',
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
  executeTransferAction,
  executeTransferSuccessAction,
  loadAllTransfersAction,
  loadAllTransfersSuccessAction,
});
export type TransferActionsUnion = typeof all;
