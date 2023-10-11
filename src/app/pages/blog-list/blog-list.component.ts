import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
	baseUrl = environment.baseUrl;
	blogs$!: Observable<Blog[]>;

	constructor(private _blogService: BlogService) {}

	ngOnInit(): void {
		this.blogs$ = this._blogService.getBlogs();
	}
}
