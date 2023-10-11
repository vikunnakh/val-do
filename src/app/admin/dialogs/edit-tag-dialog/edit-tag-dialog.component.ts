import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-edit-tag-dialog',
  templateUrl: './edit-tag-dialog.component.html',
  styleUrls: ['./edit-tag-dialog.component.scss']
})
export class EditTagDialogComponent {
  public tag: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(255),
    Validators.minLength(2)
  ]);

  constructor(
    private _tagsService: TagsService,
    private _matDialogRef: MatDialogRef<EditTagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.tag.setValue(this.data.tagName);
  }

  close() {
    this._matDialogRef.close(false);
  }

  edit() {
    const obj: any = {
      id: this.data.id,
      title: this.tag.value
    };
    this._tagsService.editTag(obj).subscribe(
      (res) => {
        this._matDialogRef.close(true);
      },
      (err) => {
        console.log(err.error);
      }
    )
  }

}
