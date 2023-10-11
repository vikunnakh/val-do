import { Component, Input } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() data!: Category;
  public baseUrl: string = environment.baseUrl
}
