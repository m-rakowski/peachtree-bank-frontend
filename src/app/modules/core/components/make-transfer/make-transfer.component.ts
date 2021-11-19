import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReviewTransferModalComponent } from '../review-transfer-modal/review-transfer-modal.component';
import { filter, switchMap } from 'rxjs';
import { GlobalStateService } from '../../services/global-state.service';
import {
  conditionalValidator,
  notEnoughBalanceValidator,
} from './transfer-amount-validator';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss'],
})
export class MakeTransferComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private matDialog: MatDialog,
    private globalStateService: GlobalStateService
  ) {
    this.setUpForm();
  }

  ngOnInit(): void {
    this.globalStateService.account.subscribe((value) => {
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
        .pipe(
          filter(Boolean),
          switchMap(() =>
            this.globalStateService.sendTransfer(this.formGroup.value)
          ),
          switchMap(() =>
            this.globalStateService.sendAccount(
              this.formGroup.get('amount')?.value
            )
          )
        )
        .subscribe(() => {
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
}
