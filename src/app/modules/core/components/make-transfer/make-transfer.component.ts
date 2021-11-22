import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReviewTransferModalComponent } from '../review-transfer-modal/review-transfer-modal.component';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import {
  conditionalValidator,
  notEnoughBalanceValidator,
} from './transfer-amount-validator';
import {
  selectAccount,
  selectTransfers,
} from '../../../../store/selectors/transfer.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/model/app-state';
import { addTransferAction } from '../../../../store/actions/transfer.actions';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss'],
})
export class MakeTransferComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private store: Store<AppState>, private matDialog: MatDialog) {
    this.setUpForm();
  }

  private onDestroySubject = new Subject();

  ngOnInit(): void {
    this.store
      .select(selectAccount)
      .pipe(takeUntil(this.onDestroySubject))
      .subscribe((value) => {
        this.formGroup.get('fromAccount')?.patchValue(value);
      });
  }

  submit(): void {
    if (this.formGroup.valid) {
      this.matDialog
        .open(ReviewTransferModalComponent, {
          data: this.formGroup.getRawValue(),
        })
        .afterClosed()
        .pipe(filter(Boolean))
        .subscribe(() => {
          this.store.dispatch(
            addTransferAction({ transferDto: this.formGroup.value })
          );
          // @ts-ignore
          this.formGroup.get('toAccount').reset();
          // @ts-ignore
          this.formGroup.get('amount.amount')?.patchValue(0.01);
          // @ts-ignore
          this.formGroup.get('amount.currencyCode')?.patchValue('EUR');
        });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  private setUpForm(): void {
    this.formGroup = new FormGroup({
      fromAccount: new FormGroup({
        amount: new FormControl(0.01),
        currencyCode: new FormControl('EUR'),
      }),
      toAccount: new FormControl(null, [Validators.required]),
      amount: new FormGroup({
        amount: new FormControl(0.01, [
          Validators.required,
          Validators.min(0.01),

          // TODO: fix conditional validation
          // conditionalValidator(
          //   () => this.formGroup.get('fromAccount.amount').value < 500,
          //   Validators.compose([notEnoughBalanceValidator()])
          // ),
        ]),
        currencyCode: new FormControl('EUR'),
      }),
    });

    this.formGroup.get('fromAccount')?.disable();
    // @ts-ignore
    this.formGroup.get('fromAccount').valueChanges.subscribe((value) => {
      // @ts-ignore
      this.formGroup.get('amount').updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next(null);
  }
}
