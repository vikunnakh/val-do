import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrowserStateInterceptorService implements HttpInterceptor {
	constructor(private transferState: TransferState, @Inject(PLATFORM_ID) private platformId: any) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const key = makeStateKey(`${req.url}`);

		if (isPlatformBrowser(this.platformId)) {
			const cachedResponse = this.transferState.get(key, null);
			if (cachedResponse) {
				this.transferState.remove(key);
				return of(new HttpResponse(cachedResponse));
			}
			return next.handle(req);
		}
		if (isPlatformServer(this.platformId)) {
			return next.handle(req).pipe(
				tap((req) => {
					const request: any = req;
					this.transferState.set(key, request);
				})
			);
		}

		return next.handle(req);
	}
}
