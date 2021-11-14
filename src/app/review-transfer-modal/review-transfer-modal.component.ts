import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransferDto } from '../make-transfer/transfer.model';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-review-transfer-modal',
  templateUrl: './review-transfer-modal.component.html',
  styleUrls: ['./review-transfer-modal.component.scss'],
})
export class ReviewTransferModalComponent implements OnInit {
  constructor(
    private itemService: TransferService,
    @Inject(MAT_DIALOG_DATA) public data: TransferDto
  ) {}

  ngOnInit(): void {}

  submit() {
    this.itemService.send(this.data).subscribe();
  }
}
