import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Challenge } from 'src/app/interfaces/challange';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-challange-card',
  templateUrl: './challange-card.component.html',
  styleUrls: ['./challange-card.component.scss']
})
export class ChallangeCardComponent {
  @Input() challenge!: Challenge;
	public baseUrl: string = environment.baseUrl;

	constructor(private _title: Title) {}

	ngOnInit(): void {
		this._title.setTitle(`გამოწვევები`);
	}

}
