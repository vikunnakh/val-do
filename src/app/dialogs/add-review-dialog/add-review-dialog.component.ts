import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review } from 'src/app/interfaces/review';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.scss']
})
export class AddReviewDialogComponent implements OnInit {
  stars: string[] = ["⭐️⭐️⭐️⭐️⭐️", "⭐️⭐️⭐️⭐️", "⭐️⭐️⭐️", "⭐️⭐️", "⭐️"];
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _reviewsService: ReviewsService,
    private _matDialog: MatDialog,
    private _matDialogRef: MatDialogRef<AddReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public review: Review

  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      description: new FormControl('', [Validators.required]),
      star: new FormControl(undefined, [Validators.required])
    });

    if (this.review) {
      this.form.patchValue(this.review);
    }
  }

  submit(): void {
    this.form.disable();

    const dialog = (descr: string) => 
      this._matDialog.open(ConfirmationDialogComponent, {
        width: '440px',
        data: {descr}
      });

    if (this.review) {
      this._reviewsService.editReviews({ id: this.review._id, ...this.form.value }).subscribe(
        () => {
          this._matDialogRef.close(true);
          dialog('შეფასება წარმატებით შეიცვალა, მოდერაციის გავლის შემდგომ გამოჩნდება ვებ-გვერდზე')
        },
        (err) => {
          this._matDialogRef.close();
          dialog(err.error);
        }
      );
      return;
    }

    this._reviewsService.addReviews(this.form.value).subscribe(
      () => {
        this._matDialogRef.close(true);
        dialog('შეფასება წარმატებით დაემატა, მოდერაციის გავლის შემდგომ გამოჩნდება ვებ-გვერდზე');
      },
      (err) => {
        this._matDialogRef.close();
        dialog(err.error);
      }
    )
  } 

  close():void {
    this._matDialogRef.close();
  }
}
