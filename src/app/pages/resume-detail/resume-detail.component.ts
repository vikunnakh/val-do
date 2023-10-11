import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Cv } from 'src/app/interfaces/cv';
import { CvService } from 'src/app/services/cv.service';
import { MetaService } from 'src/app/services/meta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resume-detail',
  templateUrl: './resume-detail.component.html',
  styleUrls: ['./resume-detail.component.scss']
})
export class ResumeDetailComponent {
  public cv$!: Observable<Cv>;
  public baseUrl: string = environment.baseUrl;

  constructor(
    private _cvService: CvService,
    private _route: ActivatedRoute,
    private _metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.cv$ = this._route.params.pipe(
      switchMap((params: any) => this._cvService.getCv(params['id']).pipe(
        tap((data) => {
          this._metaService.update(`${data.role} | val-do.com`, data.about)
        })
      ))
    )
  }
}
