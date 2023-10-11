import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Title } from "@angular/platform-browser";
import { finalize, Observable } from "rxjs";
import { ConfirmationDialogComponent } from "src/app/dialogs/confirmation-dialog/confirmation-dialog.component";
import { Category } from "src/app/interfaces/category";
import { CategoriesService } from "src/app/services/categories.service";
import { LoadingService } from "src/app/services/loading.service";
import { environment } from "src/environments/environment";
import { AddEditCategoriesComponent } from "../../dialogs/add-edit-categories/add-edit-categories.component";

@Component({
	selector: "app-categories",
	templateUrl: "./categories.component.html",
	styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
	public baseUrl: string = environment.baseUrl;
	public categories$!: Observable<Category[]>;

	constructor(
		private _matDialog: MatDialog,
		private _categoriesServices: CategoriesService,
		private _loadingService: LoadingService,
		private _title: Title
	) {}

	ngOnInit(): void {
		this._loadingService.start();
		this._title.setTitle(`კატეგორიების მართვა`);
		this.initCategories();
	}

	initCategories() {
		this.categories$ = this._categoriesServices.getCategories().pipe(finalize(() => this._loadingService.end()));
	}

	dialog(mode: string, id?: string) {
		const dialog = this._matDialog.open(AddEditCategoriesComponent, {
			width: `720px`,
			data: { mode, id },
		});

		dialog.afterClosed().subscribe((res) => (res == true ? this.initCategories() : null));
	}

	delete(id: string) {
		const dialog = this._matDialog.open(ConfirmationDialogComponent, {
			width: `420px`,
			data: {
				descr: `ნამდვილად გსურთ კატეგორიის წაშა?`,
			},
		});

		dialog.afterClosed().subscribe((res) =>
			res == true
				? this._categoriesServices
						.deleteCategory(id)
						.pipe(finalize(() => this.initCategories()))
						.subscribe()
				: null
		);
	}
}
