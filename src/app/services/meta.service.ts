import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private _title: Title,
    private _meta: Meta,
    private _router: Router
  ) { }
  update(title: string, description: any, img?: string) {
		/* page title */
		this._title.setTitle(title);
		/* meta tags */
		this._meta.updateTag({
			name: "description",
			content: `${description.replace(/(<([^>]+)>)/gi, "").slice(0, 145)}...`,
		});
		this._meta.updateTag({ name: "author", content: `Val Do` });
		/* open graph */
		this._meta.updateTag({ name: "og:title", content: title });
		this._meta.updateTag({
			name: "og:description",
			content: `${description.replace(/(<([^>]+)>)/gi, "").slice(0, 145)}...`,
		});
		this._meta.updateTag({
			name: "og:url",
			content: `${environment.baseUrl}/${this._router.url.slice(1)}`,
		});
		this._meta.updateTag({
			name: "og:image",
			content: img || `${environment.baseUrl}/assets/social.jpg`,
		});
		this._meta.updateTag({
			name: "image",
			property: "og:image",
			content: img || `${environment.baseUrl}/assets/social.jpg`,
		});

		/* twitter */
		this._meta.updateTag({
			name: "twitter:card",
			content: "summary_large_image",
		});
		this._meta.updateTag({ name: "twitter:site", content: "@va1_do" });
		this._meta.updateTag({ name: "twitter:creator", content: "@va1_do" });
		this._meta.updateTag({ name: "twitter:title", content: title });
		this._meta.updateTag({
			name: "twitter:description",
			content: `${description.replace(/(<([^>]+)>)/gi, "").slice(0, 145)}...`,
		});
		this._meta.updateTag({
			name: "twitter:url",
			content: `${environment.baseUrl}/${this._router.url.slice(1)}`,
		});
		this._meta.updateTag({
			name: "twitter:image",
			content: img || `${environment.baseUrl}/assets/social.jpg`,
		});
	}
}
