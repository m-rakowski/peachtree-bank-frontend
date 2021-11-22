import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TransferActionsUnion } from '../actions/transfer.actions';
import { forkJoin, of } from 'rxjs';
import { TransferService } from '../../modules/core/services/transfer.service';
import { AccountService } from '../../modules/core/services/account.service';

@Injectable()
export class TransferEffects {
  executeTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Transfer] executeTransferAction'),
      mergeMap((action) => {
        return this.transferService.executeTransfer(action.transferDto).pipe(
          map((addedTransfer) => {
            return {
              type: '[Transfer] executeTransferSuccessAction',
              transfer: addedTransfer.transfer,
              account: addedTransfer.account,
            };
          })
        );
      })
    )
  );
  loadAllTransfers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Transfer] loadAllTransfersAction'),
      mergeMap(() => {
        return forkJoin([
          this.transferService.getAll(),
          this.accountService.getAccount(),
        ]).pipe(
          map(([transfers, account]) => ({
            type: '[Transfer] loadAllTransfersSuccessAction',
            transfers: transfers,
            account: account,
          })),
          catchError(() =>
            of({ type: '[Transfer] loadAllTransfersErrorAction' })
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions<TransferActionsUnion>,
    private transferService: TransferService,
    private accountService: AccountService
  ) {}
}
