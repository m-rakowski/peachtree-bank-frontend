import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ReviewTransferModalComponent} from '../review-transfer-modal/review-transfer-modal.component';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss'],
})
export class MakeTransferComponent implements OnInit {
  formGroup: FormGroup;

  fromAccount: FormControl;
  toAccount: FormControl;
  amount: FormControl;
  currency: FormControl;

  constructor(private matDialog: MatDialog) {
    this.fromAccount = new FormControl('My Personal Account: XXXX €');
    this.fromAccount.disable();
    this.toAccount = new FormControl();
    this.amount = new FormControl(null, [Validators.required, Validators.min(0)]);
    this.currency = new FormControl('EUR');

    this.formGroup = new FormGroup({
      fromAccount: this.fromAccount,
      toAccount: this.toAccount,
      //TODO b. It should not allow amount below the total balance of -€500
      amount: this.amount,
      currency: this.currency
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.formGroup.valid) {
      this.matDialog.open(ReviewTransferModalComponent, {
        data: this.formGroup.value,
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
