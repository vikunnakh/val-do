import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Youtube } from "../interfaces/youtube";

@Injectable({
	providedIn: "root",
})
export class CommonService {
	constructor(private _http: HttpClient) {}

	getYoutubeStats(): Observable<Youtube> {
		return this._http
			.get<Youtube>(`https://www.googleapis.com/youtube/v3/channels`, {
				params: {
					key: environment.youtubeApiKey,
					id: environment.youtubeChannelId,
					part: "statistics",
				},
			})
			.pipe(map((res: any) => res["items"][0]["statistics"]));
	}
}
