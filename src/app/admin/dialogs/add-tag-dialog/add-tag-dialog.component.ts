import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-add-tag-dialog',
  templateUrl: './add-tag-dialog.component.html',
  styleUrls: ['./add-tag-dialog.component.scss']
})
export class AddTagDialogComponent {
  public tag: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(2),
    Validators.minLength(255)
  ]);

  constructor(
    private _tagsService: TagsService,
    private _matDialogRef: MatDialogRef<AddTagDialogComponent>
  ) {}

  ngOnInit(): void {}

  addTag() {
    this._tagsService.addTag(this.tag.value).pipe(
      finalize(() => {
        this._matDialogRef.close(true);
      })
    ).subscribe();
  }

  close() {
    this._matDialogRef.close(false);
  }

}
