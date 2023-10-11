import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Cv } from "src/app/interfaces/cv";
import { CvService } from "src/app/services/cv.service";
import { MetaService } from "src/app/services/meta.service";

@Component({
	selector: "app-resume",
	templateUrl: "./resume.component.html",
	styleUrls: ["./resume.component.scss"],
})
export class ResumeComponent implements OnInit {
	data$!: Observable<Cv[]>;

	constructor(private _cvService: CvService, private _metaService: MetaService) {}

	ngOnInit(): void {
		this._metaService.update(`დეველოპერების ვაკანსიები | val-do.com`, `დეველოპერების ვაკანსიები`);
		this.data$ = this._cvService.getAllCv();
	}
}
