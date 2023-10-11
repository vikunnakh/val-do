import { Component, OnInit } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { Challenge } from 'src/app/interfaces/challange';
import { ChallangesService } from 'src/app/services/challanges.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-challange',
  templateUrl: './challange.component.html',
  styleUrls: ['./challange.component.scss']
})
export class ChallangeComponent implements OnInit {
  public challenges$!: Observable<Challenge[]>;

	constructor(private _challengesService: ChallangesService, private _loadingService: LoadingService) {}

	ngOnInit(): void {
		this._loadingService.start();
		this.challenges$ = this._challengesService.getChallenges().pipe(finalize(() => this._loadingService.end()));
	}
}
