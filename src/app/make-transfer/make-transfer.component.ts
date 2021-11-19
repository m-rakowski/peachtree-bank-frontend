import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReviewTransferModalComponent } from '../review-transfer-modal/review-transfer-modal.component';
import { getCurrencySymbol } from '@angular/common';
import { AccountAmountCurrency } from '../account-amount-currency';
import { filter, switchMap } from 'rxjs';
import { GlobalStateService } from '../global-state.service';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss'],
})
export class MakeTransferComponent implements OnInit {
  myPersonalAccount: AccountAmountCurrency = {
    amount: 0,
    currencyCode: 'EUR',
  };

  formGroup: FormGroup;
  fromAccount: FormControl;
  toAccount: FormControl;
  amount: FormControl;
  currencyCode: FormControl;

  constructor(
    private matDialog: MatDialog,
    private globalStateService: GlobalStateService
  ) {
    this.setUpForm();
    this.globalStateService.account.subscribe((value) => {
      this.myPersonalAccount = value;
      this.fromAccount.patchValue(
        this.fromAccountDisplayedText(this.myPersonalAccount)
      );
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.formGroup.valid) {
      this.matDialog
        .open(ReviewTransferModalComponent, {
          data: this.formGroup.value,
        })
        .afterClosed()
        .pipe(
          filter(Boolean),
          switchMap(() =>
            this.globalStateService.sendTransfer(this.formGroup.value)
          ),
          switchMap(() =>
            this.globalStateService.sendAccount(
              this.formGroup.get('account')?.value
            )
          )
        )
        .subscribe(() => {
          this.amount.reset();
        });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  private fromAccountDisplayedText(account: AccountAmountCurrency): string {
    return (
      'My Personal Account: ' +
      getCurrencySymbol(account.currencyCode, 'narrow') +
      account.amount.toFixed(2)
    );
  }

  private setUpForm(): void {
    this.fromAccount = new FormControl(
      this.fromAccountDisplayedText(this.myPersonalAccount)
    );
    this.fromAccount.disable();
    this.toAccount = new FormControl();
    this.amount = new FormControl(null, [
      Validators.required,
      Validators.min(0),
    ]);
    this.currencyCode = new FormControl('EUR');

    this.formGroup = new FormGroup({
      fromAccount: this.fromAccount,
      toAccount: this.toAccount,
      //TODO b. It should not allow amount below the total balance of -€500
      account: new FormGroup({
        amount: this.amount,
        currencyCode: this.currencyCode,
      }),
    });
  }
}
