import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review } from 'src/app/interfaces/review';

@Component({
  selector: 'app-full-review-dialog',
  templateUrl: './full-review-dialog.component.html',
  styleUrls: ['./full-review-dialog.component.scss']
})
export class FullReviewDialogComponent implements OnInit {
  constructor(
    private _matDialogRef: MatDialogRef<FullReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public review: Review
  ) {}

  ngOnInit(): void {
    
  }

  close() {
    this._matDialogRef.close();
  }

}
