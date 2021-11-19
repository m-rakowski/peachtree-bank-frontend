import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReviewTransferModalComponent } from '../review-transfer-modal/review-transfer-modal.component';
import { filter, switchMap } from 'rxjs';
import { GlobalStateService } from '../../services/global-state.service';

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
          this.formGroup.get('amount.amount')?.patchValue(0);
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
        amount: new FormControl(0),
        currencyCode: new FormControl('EUR'),
      }),
      toAccount: new FormControl(null, [Validators.required]),
      amount: new FormGroup({
        amount: new FormControl(0, [
          Validators.required,
          Validators.min(0.01),
          //TODO     b. It should not allow amount below the total balance of -€500
        ]),
        currencyCode: new FormControl('EUR'),
      }),
    });

    this.formGroup.get('fromAccount')?.disable();
  }
}
