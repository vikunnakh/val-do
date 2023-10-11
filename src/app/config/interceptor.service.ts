import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
	constructor() {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem(`token`);
		if (token) {
			request = request.clone({
				headers: request.headers.set("x-auth-token", token),
			});
		}

		request = request.clone({
			headers: request.headers.set("Accept", "application/json"),
		});

		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				/* if (event instanceof HttpResponse) {
        } */
				return event;
			})
		);
	}
}