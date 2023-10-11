import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { TagsService } from 'src/app/services/tags.service';
import { AddTagDialogComponent } from '../../dialogs/add-tag-dialog/add-tag-dialog.component';
import { EditTagDialogComponent } from '../../dialogs/edit-tag-dialog/edit-tag-dialog.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  public $tags!: Observable<any>;

  constructor(
    private _tagsService: TagsService,
    private _matDialog: MatDialog,
    private _title: Title
  ) {}

  ngOnInit(): void {
    this._title.setTitle(`თეგების რედაქტირება`);
		this.$tags = this._tagsService.getTags();
  }

  addTag() {
    const addDialog = this._matDialog.open(AddTagDialogComponent, {
      width: '440px',
      disableClose: true
    });
    addDialog.afterClosed().subscribe((res) => {
      if (res) {
        this.$tags = this._tagsService.getTags();
        return;
      }
    })
  }

  editTag(id: string, tagName: string) {
    const dialog = this._matDialog.open(EditTagDialogComponent, {
      width: '440px',
      disableClose: true,
      data: {
        id,
        tagName
      }
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) this.$tags = this._tagsService.getTags();
    })
  }

  deleteTags(id: string) {
		const dialog = this._matDialog.open(ConfirmationDialogComponent, {
			width: `440px`,
			data: {
				descr: `დარწმუნებული ხართ რომ გსურთ წაშლა?`,
			},
		});

		dialog.afterClosed().subscribe((res) => {
			if (res) {
				this._tagsService.deleteTag(id).subscribe(
					() => {
						this.$tags = this._tagsService.getTags();
					},
					(err) => {
						console.log(err.error);
					}
				);
			}
		});
	}
}
