import { Component, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Blog } from 'src/app/interfaces/blog';
import { AdminService } from 'src/app/services/admin.service';
import { BlogService } from 'src/app/services/blog.service';
import { CanonicalService } from 'src/app/services/canonical.service';
import { HighLightService } from 'src/app/services/highlight.service';
import { MetaService } from 'src/app/services/meta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent {
	baseUrl = environment.baseUrl;
	blog$!: Observable<Blog>;

	jsonLD: any;

	constructor(
		private _route: ActivatedRoute,
		private _metaService: MetaService,
		private _blogService: BlogService,
		private _matDialog: MatDialog,
		private _router: Router,
		private _highlightService: HighLightService,
		public adminService: AdminService,
		private _renderer2: Renderer2,
		private _canonicalService: CanonicalService
	) {}

	ngOnInit(): void {
		this._canonicalService.update(this._renderer2);

		this.blog$ = this._route.params.pipe(
			switchMap((params) => {
				return this._blogService.getBlog(params["id"]).pipe(
					tap((blog) => {
						this.jsonLD = {
							"@context": "https://schema.org",
							"@type": "NewsArticle",
							headline: blog.title,
							image: [`${this.baseUrl}/${blog.image}`],
							author: [
								{
									"@type": "Person",
									name: "Val Do",
									url: "https://twitter.com/va1_do",
								},
							],
						};
						this._metaService.update(blog.title, blog.description, `${this.baseUrl}/${blog.image}`);
						this._highlightService.highlightAll();
					})
				);
			})
		);
	}

	ngAfterViewInit(): void {
		this._highlightService.highlightAll();
	}

	ngOnDestroy(): void {
		this._canonicalService.remove();
	}

	delete() {
		const dialog = this._matDialog.open(ConfirmationDialogComponent, {
			data: {
				descr: `დარწმუნებული ხარ, რომ გსურს ბლოგის წაშლა?`,
			},
		});

		dialog.afterClosed().subscribe((res) => {
			if (res) {
				this._blogService
					.delete(this._route.snapshot.params["id"])
					.subscribe(() => this._router.navigateByUrl(`/blog/list`));
			}
		});
	}
}