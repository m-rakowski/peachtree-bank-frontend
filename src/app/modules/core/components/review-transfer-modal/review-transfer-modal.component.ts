import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransferDto } from '../../models/transfer';
import { TransferService } from '../../services/transfer.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-review-transfer-modal',
  templateUrl: './review-transfer-modal.component.html',
  styleUrls: ['./review-transfer-modal.component.scss'],
})
export class ReviewTransferModalComponent {
  constructor(
    private itemService: TransferService,
    private accountService: AccountService,
    private dialogRef: MatDialogRef<ReviewTransferModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransferDto
  ) {}

  submit() {
    this.dialogRef.close(true);
  }
}
