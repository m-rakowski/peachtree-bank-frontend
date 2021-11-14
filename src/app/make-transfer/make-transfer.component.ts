import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReviewTransferModalComponent } from '../review-transfer-modal/review-transfer-modal.component';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss'],
})
export class MakeTransferComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private matDialog: MatDialog) {
    this.formGroup = new FormGroup({
      fromAccount: new FormControl(),
      toAccount: new FormControl(),
      //TODO b. It should not allow amount below the total balance of -€500
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
    });
  }

  ngOnInit(): void {}

  submit(): void {
    this.matDialog.open(ReviewTransferModalComponent, {
      data: this.formGroup.value,
    });
  }
}
