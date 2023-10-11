import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent implements OnInit {
	public categories$!: Observable<Category[]>;

	constructor(private _categoriesService: CategoriesService, private _title: Title) {}

	ngOnInit(): void {
		this._title.setTitle(`🤖 კატეგორიები`);
		this.categories$ = this._categoriesService.getCategories();
	}
}