import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, mergeMap, Observable } from 'rxjs';
import { Blog } from '../../../interfaces/blog';
import { BlogService } from '../../../services/blog.service';
import { LoadingService } from '../../../services/loading.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  form!: FormGroup;
  selectedImage: any;
  isEditMode: boolean = false;




  constructor(
    private _fb: FormBuilder,
    private _blogService: BlogService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _courseService: CourseService,
    private _loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this._route.snapshot.queryParams["id"] ? (this.isEditMode = true) : (this.isEditMode = false);

    this.form = this._fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(``, [Validators.required]),
			image: new FormControl(``, [Validators.required])
    });

    if (this.isEditMode) {
			this._blogService.getBlog(this._route.snapshot.queryParams["id"]).subscribe((blog) => {
				delete blog._id;
				this.form.setValue(blog);
			});
		}
  }

  // სურათის არჩევა
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedImage = file;
    }
  }

  // ახალი კურსის დამატება
  submit() {
    if (!this.isEditMode) {
      this._loadingService.start();
      this._courseService.uploadImage(this.selectedImage).pipe(
        mergeMap((img: any) => {
          this.form.get('image')!.patchValue(img['path']);
          return this._blogService.addBlog(this.form.value);
        }),
        finalize(() => {
          this._loadingService.end();
        })
      )
      .subscribe(
        (res: any) => {
          this._router.navigateByUrl(`blog/blog-detail/${res['_id']}`);
        },
        (err) => {
          console.log(err.error);
        }
      );
      return;
    }


    // რედაქტირება
    if(this.selectedImage) {
      this._courseService.uploadImage(this.selectedImage).pipe(
        finalize(() => {
          this._router.navigateByUrl(`/blog/blog-list`);
        }),
        mergeMap((res: any) => {
          this.form.get(`image`)?.patchValue(res[`path`]);
          return this._blogService.editBlog(this._route.snapshot.queryParams['id'], this.form.value);
        })
      ).subscribe();
    }
    else {
      this._blogService.editBlog(this._route.snapshot.queryParams['id'], this.form.value).pipe(
        finalize(() => {
          this._router.navigateByUrl(`blog/blog-detail/${this._route.snapshot.queryParams['id']}`);
        })
      ).subscribe();
    }
  }

}
