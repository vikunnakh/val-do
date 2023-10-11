import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BlogRoutingModule } from "./blog-routing.module";
import { BlogDetailComponent } from "../../pages/blog-detail/blog-detail.component";
import { BlogListComponent } from "../../pages/blog-list/blog-list.component";
import { MatCardModule } from "@angular/material/card";
import { SharedModule } from "src/app/shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { HighLightService } from "src/app/services/highlight.service";

console.info("blog module loaded...");
@NgModule({
	declarations: [BlogDetailComponent, BlogListComponent],
	imports: [
		MatCardModule, 
		MatButtonModule, 
		CommonModule, 
		BlogRoutingModule, 
		SharedModule
	],
	providers: [
		HighLightService
	]
})
export class BlogModule {}