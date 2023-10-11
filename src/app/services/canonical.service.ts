import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, Renderer2 } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class CanonicalService {
	constructor(@Inject(DOCUMENT) private _document: Document) {}

	update(renderer2: Renderer2) {
		const linkTag = this._document.querySelector('link[rel="canonical"]');
		const url = this._document.defaultView?.window.location.href as string;

		if (!linkTag) {
			let link = renderer2.createElement("link");
			link.rel = `canonical`;
			link.href = url;
			renderer2.appendChild(this._document.head, link);
			return;
		}
	}

	remove() {
		const linkTag = this._document.querySelector('link[rel="canonical"]');
		if (linkTag) linkTag?.remove();
	}
}
