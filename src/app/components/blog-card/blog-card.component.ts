import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/interfaces/blog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit{
  @Input() blog!: Blog;
  public baseUrl: string = environment.baseUrl;

  constructor () {}

  ngOnInit():void {}

}
