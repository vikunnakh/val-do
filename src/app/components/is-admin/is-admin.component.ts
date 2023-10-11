import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-is-admin',
  templateUrl: './is-admin.component.html',
  styleUrls: ['./is-admin.component.scss']
})
export class IsAdminComponent implements OnInit {
  @Input() id!: string | any;

	constructor(private _matDialog: MatDialog, private _coursesService: CoursesService, private _router: Router) {}

	ngOnInit(): void {}

	delete() {
		const dialog = this._matDialog.open(ConfirmationDialogComponent, {
			width: `400px`,
			data: {
				descr: `დარწმუნებული ხართ, რომ გსურთ წაშლა?`,
			},
		});

		dialog.afterClosed().subscribe((res) => {
			if (res === true) {
				this._coursesService.deleteCourse(this.id).subscribe(
					() => this._router.navigateByUrl(`/categories`),
					(err) => console.log(err.error)
				);
			}
		});
	}

}
