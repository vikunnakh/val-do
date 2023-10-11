import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import * as Prism from "prismjs";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/match-braces/prism-match-braces";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-scss";
import "prismjs/plugins/inline-color/prism-inline-color";
import "prismjs/plugins/show-language/prism-show-language";
@Injectable()
export class HighLightService {
	constructor(@Inject(PLATFORM_ID) private _platformId: Object) {}

	highlightAll() {
		if (isPlatformBrowser(this._platformId)) {
			setTimeout(() => {
				Prism.highlightAll();
			}, 0);
		}
	}
}
